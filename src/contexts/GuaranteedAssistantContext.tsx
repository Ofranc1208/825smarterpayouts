"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  GuaranteedOrchestrator,
  GuaranteedAssistantContextType,
  GuaranteedAssistantState,
  GuaranteedAssistantStep
} from './guaranteed-system';
import { useCalculator } from './CalculatorContext';
import { convertToSelfContainedFormData } from '../components/calculator/guaranteedstep/utils/typeUtils';

// ============================================================================
// CONTEXT CREATION
// ============================================================================

const GuaranteedAssistantContext = createContext<GuaranteedAssistantContextType | undefined>(undefined);

// ============================================================================
// HOOK TO USE CONTEXT
// ============================================================================

export const useGuaranteedAssistant = (): GuaranteedAssistantContextType => {
  const context = useContext(GuaranteedAssistantContext);
  if (!context) {
    throw new Error('useGuaranteedAssistant must be used within a GuaranteedAssistantProvider');
  }
  return context;
};

// ============================================================================
// PROVIDER PROPS
// ============================================================================

interface GuaranteedAssistantProviderProps {
  children: ReactNode;
  sessionId?: string; // Optional - will read from URL if not provided
}

// ============================================================================
// PROVIDER COMPONENT - ORCHESTRATED
// ============================================================================

export const GuaranteedAssistantProvider: React.FC<GuaranteedAssistantProviderProps> = ({ 
  children, 
  sessionId: propSessionId
}) => {
  // 🔧 Get sessionId from URL like LCP does, use prop as fallback
  const getSessionId = (): string => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('sessionId') || propSessionId || 'default';
    }
    return propSessionId || 'default';
  };
  
  const sessionId = getSessionId();
  
  // Connect to CalculatorContext for form data awareness
  const { formData } = useCalculator();
  
  // Memoize the guaranteed form data to prevent unnecessary re-renders
  const guaranteedFormData = React.useMemo(() => {
    return convertToSelfContainedFormData(formData?.guaranteedData || {});
  }, [formData?.guaranteedData]);

  // Initialize state using orchestrator
  const initialState = GuaranteedOrchestrator.initializeState(sessionId, guaranteedFormData);
  
  const [isOpen, setIsOpen] = useState(initialState.isOpen);
  const [messages, setMessages] = useState(initialState.messages);
  const [isTyping, setIsTyping] = useState(initialState.isTyping);
  const [currentStep, setCurrentStepState] = useState<GuaranteedAssistantStep>(initialState.currentStep);

  // State update helper
  const updateState = (updates: Partial<GuaranteedAssistantState>) => {
    if (updates.isOpen !== undefined) setIsOpen(updates.isOpen);
    if (updates.messages !== undefined) setMessages(updates.messages);
    if (updates.isTyping !== undefined) setIsTyping(updates.isTyping);
    if (updates.currentStep !== undefined) setCurrentStepState(updates.currentStep);
  };

  // Create orchestrated actions with current state getter
  const getState = (): GuaranteedAssistantState => ({
    isOpen,
    messages,
    isTyping,
    currentStep,
    formData: guaranteedFormData,
    sessionId
  });

  const actions = GuaranteedOrchestrator.createActions(getState, updateState);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue: GuaranteedAssistantContextType = React.useMemo(() => ({
    // State
    isOpen,
    messages,
    isTyping,
    currentStep,
    formData: guaranteedFormData,
    sessionId,
    // Actions
    ...actions
  }), [
    isOpen,
    messages,
    isTyping,
    currentStep,
    guaranteedFormData,
    sessionId,
    actions
  ]);

  return (
    <GuaranteedAssistantContext.Provider value={contextValue}>
      {children}
    </GuaranteedAssistantContext.Provider>
  );
};

export default GuaranteedAssistantContext;
