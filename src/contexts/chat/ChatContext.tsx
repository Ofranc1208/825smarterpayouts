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
import SMSModal from '../../components/chat/SMSModal';
import AppointmentModal from '../../components/chat/AppointmentModal';

// Orchestra Pattern Imports - Clean separation of concerns
import { ChatContextType, ChatProviderProps } from './types';
import { MessageOrchestrator } from './MessageOrchestrator';
import { CalculationLinkManager } from './CalculationLinkManager';
import {
  ChoiceHandler,
  ModalManager,
  ChatContextDependencies,
  ModalState
} from './ChatContext/index';

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
  // State management - Simplified with orchestrator pattern
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Modal state management - extracted to ModalManager
  const [modalState, setModalState] = useState<ModalState>({
    showSMSModal: false,
    showAppointmentModal: false
  });

  // Context dependencies
  const { currentStep, triggerReprompt, handleFlowSelect } = useCalculator();
  const { processMessageWithGPT, fetchIntent } = useGPTIntegration({ visibleMessages });
  const snapshot = useFormStepSnapshot();

  // Conversational form integration
  const { startConversationalForm, handleTypeSelection, advanceConversation } = useConversationalForm({
    setVisibleMessages,
    sessionId
  });

  // Live Chat Integration - Must be declared before being used
  const liveChatIntegration = useLiveChatIntegration({
    sessionId,
    setVisibleMessages
  });

  // Initialize modal manager first - needed by handleSpecialistChoice
  const modalManager = useMemo(() => new ModalManager(
    modalState,
    setModalState,
    logUserChoiceAsMessage
  ), [modalState, logUserChoiceAsMessage, setModalState]);

  // Handle specialist choices (for specialist mode) - Now all dependencies are available
  const handleSpecialistChoice = useCallback(async (choice: 'live_chat' | 'sms' | 'phone_call' | 'appointment') => {
    console.log('[ChatContext] Specialist choice selected:', choice);

    if (choice === 'live_chat') {
      // Log user's choice
      logUserChoiceAsMessage('💬 Live Chat');

      // Initialize live chat session
      await liveChatIntegration.initializeLiveChat();

      // Add queue component message with sessionId for real-time monitoring
      setVisibleMessages(prev => {
        const alreadyHasQueue = prev.some(m => (m as any).type === 'queue');
        if (alreadyHasQueue) return prev;
        return [...prev, {
          id: `queue-${Date.now()}`,
          type: 'queue' as any,
          text: '',
          sender: 'bot',
          sessionId: sessionId
        }];
      });

      // Activate live chat mode
      liveChatIntegration.activateLiveChatMode();
    } else if (choice === 'sms') {
      // Use modal manager for SMS
      modalManager.openSMSModal();
    } else if (choice === 'phone_call') {
      // Phone call through modal manager
      modalManager.handlePhoneCall();
    } else if (choice === 'appointment') {
      // Use modal manager for appointment
      modalManager.openAppointmentModal();
    }
  }, [logUserChoiceAsMessage, setVisibleMessages, liveChatIntegration, modalManager]);

  // Initialize choice handler - now handleSpecialistChoice is available
  const choiceHandler = useMemo(() => new ChoiceHandler({
    advanceConversation,
    setVisibleMessages,
    setIsTyping,
    startConversationalForm,
    handleSpecialistChoice
  }), [advanceConversation, setVisibleMessages, setIsTyping, startConversationalForm, handleSpecialistChoice]);

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

  // Handle initial choices (for regular mode) - Simplified with orchestrator
  const handleInitialChoice = useCallback(async (choiceText: string) => {
    await choiceHandler.handleChoice(choiceText);
  }, [choiceHandler]);

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

  // Wrapper for initializeLiveChat to match expected return type
  const wrappedInitializeLiveChat = useCallback(async (): Promise<void> => {
    await liveChatIntegration.initializeLiveChat();
  }, [liveChatIntegration]);

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
    initializeLiveChat: wrappedInitializeLiveChat
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
    wrappedInitializeLiveChat
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
      {/* SMS Modal - Managed by orchestrator */}
      <SMSModal
        isOpen={modalState.showSMSModal}
        onClose={() => modalManager.closeSMSModal()}
        phoneNumber="+15615831280"
      />

      {/* Appointment Modal - Managed by orchestrator */}
      <AppointmentModal
        isOpen={modalState.showAppointmentModal}
        onClose={() => modalManager.closeAppointmentModal()}
      />
    </ChatContext.Provider>
  );
};
