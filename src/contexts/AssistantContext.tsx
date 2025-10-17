"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  AssistantOrchestrator,
  AssistantMessage,
  AssistantContextType,
  AssistantFlowType,
  AssistantStep
} from './system';

// ============================================================================
// CONTEXT CREATION
// ============================================================================

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (context === undefined) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};

// ============================================================================
// PROVIDER IMPLEMENTATION - ORCHESTRATED
// ============================================================================

interface AssistantProviderProps {
  children: ReactNode;
}

export const AssistantProvider: React.FC<AssistantProviderProps> = ({ children }) => {
  // Initialize state using orchestrator
  const initialState = AssistantOrchestrator.initializeState();
  
  const [isOpen, setIsOpen] = useState(initialState.isOpen || false);
  const [messages, setMessages] = useState<AssistantMessage[]>(initialState.messages || []);
  const [isTyping, setIsTyping] = useState(initialState.isTyping || false);
  const [currentStep, setCurrentStep] = useState<AssistantStep>(initialState.currentStep || null);
  const [flowType, setFlowType] = useState<AssistantFlowType>(initialState.flowType || null);

  // State update helper
  const updateState = (updates: Partial<{
    isOpen: boolean;
    messages: AssistantMessage[];
    isTyping: boolean;
    currentStep: AssistantStep;
    flowType: AssistantFlowType;
  }>) => {
    if (updates.isOpen !== undefined) setIsOpen(updates.isOpen);
    if (updates.messages !== undefined) setMessages(updates.messages);
    if (updates.isTyping !== undefined) setIsTyping(updates.isTyping);
    if (updates.currentStep !== undefined) setCurrentStep(updates.currentStep);
    if (updates.flowType !== undefined) setFlowType(updates.flowType);
  };

  // Create orchestrated actions with current state getter
  const getState = () => ({ isOpen, messages, isTyping, currentStep, flowType });
  const actions = AssistantOrchestrator.createActions(
    getState,
    updateState
  );

  // Handle messages persistence
  useEffect(() => {
    AssistantOrchestrator.handleMessagesPersistence(messages);
  }, [messages]);

  // Create context value with orchestrated actions
  const contextValue: AssistantContextType = {
    isOpen,
    messages,
    isTyping,
    currentStep,
    flowType,
    openAssistant: actions.openAssistant,
    closeAssistant: actions.closeAssistant,
    setIsTyping: actions.setIsTyping,
    sendMessage: actions.sendMessage,
    addWelcomeMessage: actions.addWelcomeMessage,
    addTestMessage: actions.addTestMessage,
    testErrorHandling: actions.testErrorHandling,
    setCurrentStep: actions.setCurrentStep,
    setFlowType: actions.setFlowType,
    clearMessages: actions.clearMessages
  };

  return (
    <AssistantContext.Provider value={contextValue}>
      {children}
    </AssistantContext.Provider>
  );
}; 