/**
 * Chat Context - Orchestra Pattern (Refactored)
 * 
 * Clean, maintainable chat context with proper separation of concerns
 */

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useGPTIntegration } from '../../hooks/useGPTIntegration';
import { useConversationalForm, FileMessage } from '../../hooks/useConversationalForm';
import { useCalculator } from '../CalculatorContext';
import { useFormStepSnapshot } from '../../hooks/useFormStepSnapshot';
import { useLiveChatIntegration } from '../../hooks/useLiveChatIntegration';
import { useWelcomeScriptManager } from '../../hooks/useWelcomeScriptManager';
import CompareOfferStepper from '../../components/calculator/CompareOfferStepper';

// Orchestra Pattern Imports
import { ChatContextType, ChatProviderProps } from './types';
import { MessageOrchestrator } from './MessageOrchestrator';
import { CalculationLinkManager } from './CalculationLinkManager';

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

  // Live Chat Integration (extracted to custom hook)
  const liveChatIntegration = useLiveChatIntegration({
    sessionId,
    setVisibleMessages
  });

  // Handle specialist choices (for specialist mode)
  const handleSpecialistChoice = useCallback(async (choice: 'live_chat' | 'sms' | 'phone_call' | 'appointment') => {
    console.log('[ChatContext] Specialist choice selected:', choice);
    
    if (choice === 'live_chat') {
      // Log user's choice
      logUserChoiceAsMessage('💬 Live Chat');
      
      // Initialize live chat session first to get sessionId
      const sessionId = await liveChatIntegration.initializeLiveChat();
      
      // Add queue component message with sessionId for real-time monitoring
      // Guard: ensure we only add ONE queue message
      setVisibleMessages(prev => {
        const alreadyHasQueue = prev.some(m => (m as any).type === 'queue');
        if (alreadyHasQueue) return prev;
        return [...prev, {
          id: `queue-${Date.now()}`,
          type: 'queue' as any, // Special type for queue component
          text: '', // Not used for queue type
          sender: 'bot',
          sessionId: sessionId // Pass sessionId for real-time monitoring
        }];
      });
      
      // Activate live chat mode
      liveChatIntegration.activateLiveChatMode();
    } else {
      // For other options, just log for now
      logUserChoiceAsMessage(`Selected: ${choice}`);
    }
  }, [logUserChoiceAsMessage, setVisibleMessages, liveChatIntegration]);

  // Welcome script management (extracted to custom hook)
  useWelcomeScriptManager({
    mode,
    visibleMessages,
    setVisibleMessages,
    setIsTyping,
    onCalculate: startConversationalForm,
    onInitialChoice: handleInitialChoice,
    onSpecialistChoice: handleSpecialistChoice
  });

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
    if (liveChatIntegration.liveChatMode && typeof message === 'string') {
      await liveChatIntegration.sendMessageToSpecialist(message);
    } else {
      // Regular bot message processing
      await messageOrchestrator.processMessage(message);
    }
  }, [messageOrchestrator, liveChatIntegration]);

  // Flow state helpers
  const isGuaranteedFlowActive = currentStep && ['mode', 'amount', 'increase', 'dates', 'review', 'offer'].includes(currentStep);
  const isCompareOfferFlowActive = currentStep && currentStep.startsWith('compare-offer');

  // Context value
  const value: ChatContextType = useMemo(() => ({
    visibleMessages,
    setVisibleMessages,
    sendMessage,
    isTyping: isTyping || liveChatIntegration.isSpecialistTyping, // Show typing if bot or specialist is typing
    isLoading,
    startConversationalForm,
    handleTypeSelection,
    logUserChoiceAsMessage,
    // Live chat specific
    liveChatMode: liveChatIntegration.liveChatMode,
    specialist: liveChatIntegration.specialist,
    liveChatStatus: liveChatIntegration.connectionStatus,
    endLiveChat: liveChatIntegration.endLiveChat,
    initializeLiveChat: liveChatIntegration.initializeLiveChat
  }), [
    visibleMessages, 
    sendMessage, 
    isTyping, 
    isLoading, 
    startConversationalForm, 
    handleTypeSelection, 
    logUserChoiceAsMessage,
    liveChatIntegration.liveChatMode,
    liveChatIntegration.specialist,
    liveChatIntegration.connectionStatus,
    liveChatIntegration.endLiveChat,
    liveChatIntegration.isSpecialistTyping,
    liveChatIntegration.initializeLiveChat
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
