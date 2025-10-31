"use client";

import React, { createContext, useContext, ReactNode, useState, useCallback, useMemo } from 'react';
import { useGuaranteedFlow } from '../hooks/useGuaranteedFlow';
import { 
  CalculatorOrchestrator,
  CalculatorContextType,
  CalculatorState,
  FlowType,
  GuaranteedFlowHandler,
  LCPFlowHandler,
  CompareOfferFlowHandler
} from './system/calculator';
import { 
  LCPFormData, 
  LCPStep,
  CompareOfferStep
} from '../types';

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

// Export the context for direct access (needed by some hooks)
export { CalculatorContext };

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};

// ============================================================================
// PROVIDER IMPLEMENTATION - ORCHESTRATED
// ============================================================================

interface CalculatorProviderProps {
  children: ReactNode;
  logUserChoiceAsMessage: (text: string) => void;
}

export const CalculatorProvider: React.FC<CalculatorProviderProps> = ({ children, logUserChoiceAsMessage }) => {
  // Initialize state using orchestrator - only once
  const initialState = useMemo(() => CalculatorOrchestrator.initializeState(), []);
  
  // Use flow-specific hooks and state
  const guaranteedFlow = useGuaranteedFlow();
  const [lcpFormData, setLcpFormData] = useState<LCPFormData>({});
  const [lcpCurrentStep, setLcpCurrentStep] = useState<LCPStep | null>(null);
  const [compareOfferStep, setCompareOfferStep] = useState<CompareOfferStep | null>(null);
  const [repromptCounter, setRepromptCounter] = useState(initialState.repromptCounter);

  // Create flow handlers
  const flowHandlers = {
    guaranteed: new GuaranteedFlowHandler(guaranteedFlow, logUserChoiceAsMessage),
    lcp: new LCPFlowHandler(lcpFormData, lcpCurrentStep, setLcpFormData, setLcpCurrentStep, logUserChoiceAsMessage),
    compareOffer: new CompareOfferFlowHandler(compareOfferStep, setCompareOfferStep, logUserChoiceAsMessage)
  };

  // Get current state from orchestrator
  const orchestratorState = CalculatorOrchestrator.getCurrentState(flowHandlers);
  
  // State update helper
  const updateState = useCallback((updates: Partial<CalculatorState>) => {
    if (updates.repromptCounter !== undefined) {
      setRepromptCounter(updates.repromptCounter);
    }
  }, []);

  // Create orchestrated actions with current state getter
  const getState = useCallback((): CalculatorState => ({
    currentStep: orchestratorState.currentStep || null,
    formData: orchestratorState.formData || { guaranteedData: {}, lcpData: {} },
    lcpResult: null, // Handled by self-contained LCP system
    lcpError: undefined,
    lcpShowResults: false,
    repromptCounter
  }), [orchestratorState, repromptCounter]);

  const actions = CalculatorOrchestrator.createActions(
    getState,
    updateState,
    flowHandlers
  );

  // Create context value with orchestrated actions
  const contextValue: CalculatorContextType = {
    // State from orchestrator
    currentStep: orchestratorState.currentStep || null,
    formData: orchestratorState.formData || { guaranteedData: {}, lcpData: {} },
    
    // LCP Calculation Results (handled by self-contained LCP system)
    lcpResult: null,
    lcpError: undefined,
    lcpShowResults: false,
    
    // Reprompt signal
    repromptCounter,
    
    // All actions from orchestrator
    startCalculator: actions.startCalculator,
    handleFlowSelect: actions.handleFlowSelect,
    goToNextStep: actions.goToNextStep,
    updateFormData: actions.updateFormData,
    handleGuaranteedModeSelect: actions.handleGuaranteedModeSelect,
    handleIncreaseSelect: actions.handleIncreaseSelect,
    handleAmountNext: actions.handleAmountNext,
    handleDatesNext: actions.handleDatesNext,
    handleReviewCalculate: actions.handleReviewCalculate,
    handleLcpPaymentNext: actions.handleLcpPaymentNext,
    handleLcpDetailsNext: actions.handleLcpDetailsNext,
    handleLcpProfileNext: actions.handleLcpProfileNext,
    handleLcpLifestyleNext: actions.handleLcpLifestyleNext,
    handleLcpHealthNext: actions.handleLcpHealthNext,
    handleLcpCalculate: actions.handleLcpCalculate,
    handleLcpBackToReview: actions.handleLcpBackToReview,
    triggerReprompt: actions.triggerReprompt
  };

  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
}; 