/**
 * Chat Context - Orchestra Pattern (Refactored)
 * 
 * Clean, maintainable chat context with proper separation of concerns
 */

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useWelcomeScript } from '../../hooks/useWelcomeScript';
import { useGPTIntegration } from '../../hooks/useGPTIntegration';
import { useConversationalForm, FileMessage } from '../../hooks/useConversationalForm';
import { useCalculator } from '../CalculatorContext';
import { useFormStepSnapshot } from '../../hooks/useFormStepSnapshot';
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
  sessionId 
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

  // Handle initial choices
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

  // Welcome script integration
  const welcomeScript = useWelcomeScript({
    onCalculate: startConversationalForm,
    onChoice: handleInitialChoice,
    initialMessages: visibleMessages
  });

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
    await messageOrchestrator.processMessage(message);
  }, [messageOrchestrator]);

  // Flow state helpers
  const isGuaranteedFlowActive = currentStep && ['mode', 'amount', 'increase', 'dates', 'review', 'offer'].includes(currentStep);
  const isCompareOfferFlowActive = currentStep && currentStep.startsWith('compare-offer');

  // Context value
  const value: ChatContextType = useMemo(() => ({
    visibleMessages,
    setVisibleMessages,
    sendMessage,
    isTyping,
    isLoading,
    startConversationalForm,
    handleTypeSelection,
    logUserChoiceAsMessage,
  }), [visibleMessages, sendMessage, isTyping, isLoading, startConversationalForm, handleTypeSelection, logUserChoiceAsMessage]);

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
