/**
 * Chat Context - Orchestra Pattern (Refactored)
 * 
 * Clean, maintainable chat context with proper separation of concerns
 */

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useWelcomeScript } from '../../hooks/useWelcomeScript';
import { useSpecialistWelcomeScript } from '../../hooks/useSpecialistWelcomeScript';
import { useGPTIntegration } from '../../hooks/useGPTIntegration';
import { useConversationalForm, FileMessage } from '../../hooks/useConversationalForm';
import { useCalculator } from '../CalculatorContext';
import { useFormStepSnapshot } from '../../hooks/useFormStepSnapshot';
import { useLiveChat } from '../../hooks/useLiveChat';
import CompareOfferStepper from '../../components/calculator/CompareOfferStepper';

// Orchestra Pattern Imports
import { ChatContextType, ChatProviderProps } from './types';
import { MessageOrchestrator } from './MessageOrchestrator';
import { CalculationLinkManager } from './CalculationLinkManager';
import type { LiveChatMessage, SpecialistProfile } from '../../../services/chat';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ 
  children, 
  visibleMessages, 
  setVisibleMessages, 
  logUserChoiceAsMessage, 
  sessionId,
  mode = 'calculate' // Default to regular calculate mode
}: ChatProviderProps) => {
  // State management
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [liveChatMode, setLiveChatMode] = useState(false);
  const [specialist, setSpecialist] = useState<SpecialistProfile | null>(null);

  // Context dependencies
  const { currentStep, triggerReprompt, handleFlowSelect } = useCalculator();
  const { processMessageWithGPT, fetchIntent } = useGPTIntegration({ visibleMessages });
  const snapshot = useFormStepSnapshot();

  // Conversational form integration
  const { startConversationalForm, handleTypeSelection, advanceConversation } = useConversationalForm({
    setVisibleMessages,
    sessionId
  });

  // Orchestra Pattern - Initialize orchestrators
  const messageOrchestrator = useMemo(() => {
    return new MessageOrchestrator({
      visibleMessages,
      setVisibleMessages,
      setIsTyping,
      setIsLoading,
      processMessageWithGPT,
      fetchIntent,
      snapshot,
      currentStep,
      triggerReprompt
    });
  }, [visibleMessages, setVisibleMessages, processMessageWithGPT, fetchIntent, snapshot, currentStep, triggerReprompt]);

  const calculationLinkManager = useMemo(() => {
    return new CalculationLinkManager(setVisibleMessages, sessionId);
  }, [setVisibleMessages, sessionId]);

  // Handle initial choices (for regular mode)
  const handleInitialChoice = useCallback(async (choiceText: string) => {
    switch (choiceText) {
      case 'Compare An Offer':
        await advanceConversation({
          userMessageText: choiceText,
          botConfirmationText: "Great, I can help you compare your offer. First, how would you like to provide the details of the offer you already have?"
        });
        handleFlowSelect('compare-offer');
        break;
      default:
        console.log('Unhandled choice:', choiceText);
    }
  }, [handleFlowSelect, advanceConversation]);

  // Live Chat Integration
  const liveChat = useLiveChat({
    sessionId,
    userId: sessionId, // Using sessionId as userId for now
    userInfo: {},
    onMessage: (message: LiveChatMessage) => {
      console.log('[ChatContext] 📨 Live chat message received:', message);
      
      // Convert LiveChatMessage to chat bubble format
      setVisibleMessages(prev => [...prev, {
        id: message.id,
        type: 'text',
        text: message.content,
        sender: message.senderType === 'user' ? 'user' : 'bot',
        timestamp: message.timestamp
      }]);
    },
    onSpecialistAssigned: (assignedSpecialist: SpecialistProfile) => {
      console.log('[ChatContext] 👤 Specialist assigned:', assignedSpecialist);
      setSpecialist(assignedSpecialist);
      
      // Add system message about specialist
      setVisibleMessages(prev => [...prev, {
        id: `specialist-assigned-${Date.now()}`,
        type: 'text',
        text: `✅ Connected to ${assignedSpecialist.name}. How can I help you today?`,
        sender: 'bot'
      }]);
    },
    onSessionEnd: () => {
      console.log('[ChatContext] 🛑 Live chat session ended');
      setLiveChatMode(false);
      setSpecialist(null);
      
      // Add system message about session end
      setVisibleMessages(prev => [...prev, {
        id: `session-ended-${Date.now()}`,
        type: 'text',
        text: 'Chat session ended. Thank you for contacting us!',
        sender: 'bot'
      }]);
    }
  });

  // Handle specialist choices (for specialist mode)
  const handleSpecialistChoice = useCallback(async (choice: 'live_chat' | 'sms' | 'phone_call' | 'appointment') => {
    console.log('[ChatContext] Specialist choice selected:', choice);
    
    if (choice === 'live_chat') {
      // Log user's choice
      logUserChoiceAsMessage('💬 Live Chat');
      
      // Add connecting message
      setVisibleMessages(prev => [...prev, {
        id: `connecting-${Date.now()}`,
        type: 'text',
        text: '🔄 Connecting you to a specialist...',
        sender: 'bot'
      }]);
      
      // Activate live chat mode
      setLiveChatMode(true);
      
      // Initialize live chat
      await liveChat.initializeLiveChat();
    } else {
      // For other options, just log for now
      logUserChoiceAsMessage(`Selected: ${choice}`);
    }
  }, [logUserChoiceAsMessage, liveChat, setVisibleMessages]);

  // Welcome script integration - use appropriate script based on mode
  const regularWelcomeScript = useWelcomeScript({
    onCalculate: startConversationalForm,
    onChoice: handleInitialChoice,
    initialMessages: visibleMessages
  });

  const specialistWelcomeScript = useSpecialistWelcomeScript({
    onChoice: handleSpecialistChoice,
    initialMessages: visibleMessages
  });

  // Select the appropriate welcome script based on mode
  const welcomeScript = mode === 'specialist' ? specialistWelcomeScript : regularWelcomeScript;

  // Sync welcome script state
  useEffect(() => {
    setVisibleMessages(welcomeScript.visibleMessages);
  }, [welcomeScript.visibleMessages, setVisibleMessages]);

  useEffect(() => {
    setIsTyping(welcomeScript.isTyping);
  }, [welcomeScript.isTyping]);

  // Handle calculation link management
  useEffect(() => {
    calculationLinkManager.handleLCPFlow(currentStep);
  }, [currentStep, calculationLinkManager]);

  useEffect(() => {
    calculationLinkManager.handleGuaranteedFlow(currentStep);
  }, [currentStep, calculationLinkManager]);

  // Main message processing function
  const sendMessage = useCallback(async (message: string | FileMessage) => {
    // If in live chat mode, send to specialist instead of bot
    if (liveChatMode && typeof message === 'string') {
      console.log('[ChatContext] 📤 Sending message to specialist:', message);
      
      // Add user message to chat immediately
      setVisibleMessages(prev => [...prev, {
        id: `user-${Date.now()}`,
        type: 'text',
        text: message,
        sender: 'user'
      }]);
      
      // Send to specialist via live chat service
      await liveChat.sendLiveMessage(message);
    } else {
      // Regular bot message processing
      await messageOrchestrator.processMessage(message);
    }
  }, [messageOrchestrator, liveChatMode, liveChat, setVisibleMessages]);

  // Flow state helpers
  const isGuaranteedFlowActive = currentStep && ['mode', 'amount', 'increase', 'dates', 'review', 'offer'].includes(currentStep);
  const isCompareOfferFlowActive = currentStep && currentStep.startsWith('compare-offer');

  // Context value
  const value: ChatContextType = useMemo(() => ({
    visibleMessages,
    setVisibleMessages,
    sendMessage,
    isTyping: isTyping || liveChat.isSpecialistTyping, // Show typing if bot or specialist is typing
    isLoading,
    startConversationalForm,
    handleTypeSelection,
    logUserChoiceAsMessage,
    // Live chat specific
    liveChatMode,
    specialist,
    liveChatStatus: liveChat.connectionStatus,
    endLiveChat: liveChat.endLiveChat
  }), [
    visibleMessages, 
    sendMessage, 
    isTyping, 
    isLoading, 
    startConversationalForm, 
    handleTypeSelection, 
    logUserChoiceAsMessage,
    liveChatMode,
    specialist,
    liveChat.connectionStatus,
    liveChat.endLiveChat,
    liveChat.isSpecialistTyping
  ]);

  return (
    <ChatContext.Provider value={value}>
      {children}
      {/* Compare Offer Stepper manages conversation flow when active */}
      {isCompareOfferFlowActive && (
        <CompareOfferStepper 
          visibleMessages={visibleMessages}
          setVisibleMessages={setVisibleMessages}
        />
      )}
    </ChatContext.Provider>
  );
};
