"use client";
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useGuaranteedFlow } from '../hooks/useGuaranteedFlow';
// LCP flow is now self-contained in lcpstep/hooks/useLCPFlow.ts
import { 
  CalculatorFormData, 
  GuaranteedFormData, 
  LCPFormData, 
  LCPCalculationResult, 
  GuaranteedCalculationResult,
  LCPPaymentData,
  LCPDetailsData,
  LCPProfileData,
  LCPLifestyleData,
  LCPHealthData,
  GuaranteedReviewData,
  CalculatorStep,
  GuaranteedStep,
  LCPStep,
  CompareOfferStep,
  CalculationError
} from '../types';

// ============================================================================
// CONTEXT INTERFACE
// ============================================================================

// ============================================================================
// CONTEXT INTERFACE
// ============================================================================

export interface CalculatorContextType {
  // State
  currentStep: CalculatorStep | null;
  formData: CalculatorFormData;
  
  // Step Management
  startCalculator: () => void;
  handleFlowSelect: (flow: 'guaranteed' | 'lcp' | 'compare-offer') => void;
  goToNextStep: (step: CalculatorStep) => void;
  updateFormData: (data: Partial<CalculatorFormData>) => void;
  
  // Guaranteed Flow Handlers
  handleGuaranteedModeSelect: (mode: string) => void;
  handleIncreaseSelect: (rate: number) => void;
  handleAmountNext: () => void;
  handleDatesNext: () => void;
  handleReviewCalculate: () => void;
  
  // LCP Flow Handlers
  handleLcpPaymentNext: (data: LCPPaymentData) => void;
  handleLcpDetailsNext: (data: LCPDetailsData) => void;
  handleLcpProfileNext: (data: LCPProfileData) => void;
  handleLcpLifestyleNext: (data: LCPLifestyleData) => void;
  handleLcpHealthNext: (data: LCPHealthData) => void;
  
  // LCP Calculation Results
  lcpResult: LCPCalculationResult | null;
  lcpError: CalculationError | undefined;
  lcpShowResults: boolean;
  handleLcpCalculate: (data: Partial<LCPFormData>) => void;
  handleLcpBackToReview: () => void;

  // Reprompt signal
  repromptCounter: number;
  triggerReprompt: () => void;
}

// ============================================================================
// CONTEXT CREATION
// ============================================================================

export const CalculatorContext = createContext<CalculatorContextType | null>(null);

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

interface CalculatorProviderProps {
  children: ReactNode;
  logUserChoiceAsMessage: (text: string) => void;
}

export const CalculatorProvider: React.FC<CalculatorProviderProps> = ({ children, logUserChoiceAsMessage }) => {
  // Use flow-specific hooks
  const guaranteedFlow = useGuaranteedFlow();
  
  // LCP flow state - minimal implementation for navigation
  const [lcpFormData, setLcpFormData] = useState<LCPFormData>({});
  const [lcpCurrentStep, setLcpCurrentStep] = useState<LCPStep | null>(null);

  // New: reprompt signal state
  const [repromptCounter, setRepromptCounter] = useState(0);
  const triggerReprompt = () => setRepromptCounter(c => c + 1);

  // Compare offer flow state (simple state until we create a hook)
  const [compareOfferStep, setCompareOfferStep] = useState<CompareOfferStep | null>(null);

  // Determine current step and form data based on active flow
  // Prioritize compare offer, then LCP flow if it has a step, otherwise use guaranteed flow
  const currentStep = compareOfferStep || lcpCurrentStep || guaranteedFlow.currentStep;
  const formData: CalculatorFormData = {
    guaranteedData: guaranteedFlow.formData,
    lcpData: lcpFormData
  };

  // LCP calculation results - now handled by self-contained LCP system
  const lcpResult = null;
  const lcpError = undefined;
  const lcpShowResults = false;
  const handleLcpBackToReview = () => {};

  // ============================================================================
  // PURE STATE MANAGEMENT FUNCTIONS
  // ============================================================================

  // Start calculator - sets initial step to 'select_type'
  const startCalculator = () => {
    guaranteedFlow.startCalculator();
  };

  // Handle flow selection - routes to appropriate starting step
  const handleFlowSelect = (flow: 'guaranteed' | 'lcp' | 'compare-offer') => {
    if (flow === 'guaranteed') {
      guaranteedFlow.goToNextStep('mode');
    } else if (flow === 'lcp') {
      setLcpCurrentStep('lcp_payment');
    } else if (flow === 'compare-offer') {
      // Set the compare offer flow step directly
      // Since we don't have a specific hook yet, we'll use goToNextStep
      goToNextStep('compare-offer-choice');
    }
  };

  // Navigate to specific step
  const goToNextStep = (step: CalculatorStep) => {
    if (step.startsWith('lcp_')) {
      setLcpCurrentStep(step as LCPStep);
    } else if (step.startsWith('compare-offer')) {
      // Set the compare offer step state
      setCompareOfferStep(step as CompareOfferStep);
    } else {
      guaranteedFlow.goToNextStep(step as GuaranteedStep);
    }
  };

  // Update form data
  const updateFormData = (data: Partial<CalculatorFormData>) => {
    if (data.guaranteedData) {
      guaranteedFlow.updateFormData(data.guaranteedData);
    }
    if (data.lcpData) {
      // Update local LCP form data
      setLcpFormData(prev => ({ ...prev, ...data.lcpData }));
    }
  };

  // ============================================================================
  // GUARANTEED FLOW STATE HANDLERS
  // ============================================================================

  const handleGuaranteedModeSelect = (mode: string) => {
    const displayText = mode.charAt(0).toUpperCase() + mode.slice(1);
    logUserChoiceAsMessage(displayText);
    
    guaranteedFlow.handleModeSelect(mode);
  };

  const handleIncreaseSelect = (rate: number) => {
    logUserChoiceAsMessage(`${rate}% annual increase`);
    
    guaranteedFlow.handleIncreaseSelect(rate);
  };

  const handleAmountNext = () => {
    const amount = guaranteedFlow.formData.paymentAmount;
    if (amount) {
      logUserChoiceAsMessage(`Payment amount: $${amount}`);
    }
    
    guaranteedFlow.handleAmountNext();
  };

  const handleDatesNext = () => {
    const { startDate, endDate } = guaranteedFlow.formData;
    if (startDate && endDate) {
      logUserChoiceAsMessage(`Payment period: ${startDate} to ${endDate}`);
    }
    
    guaranteedFlow.handleDatesNext();
  };

  const handleReviewCalculate = () => {
    logUserChoiceAsMessage('Calculate my offer');
    
    guaranteedFlow.handleReviewCalculate();
  };

  // ============================================================================
  // LCP FLOW STATE HANDLERS
  // ============================================================================

  const handleLcpPaymentNext = (data: { paymentMode: string; amount: string }) => {
    logUserChoiceAsMessage(`${data.paymentMode}: $${data.amount}`);
  };

  const handleLcpDetailsNext = (data: LCPDetailsData) => {
    logUserChoiceAsMessage('Details provided');
  };

  const handleLcpProfileNext = (data: LCPProfileData) => {
    logUserChoiceAsMessage('Profile information provided');
  };

  const handleLcpLifestyleNext = (data: LCPLifestyleData) => {
    logUserChoiceAsMessage('Lifestyle information provided');
  };

  const handleLcpHealthNext = (data: LCPHealthData) => {
    logUserChoiceAsMessage('Health information provided');
  };

  const handleLcpCalculate = (data: Partial<LCPFormData>) => {
    logUserChoiceAsMessage('Calculate LCP offer');
  };

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================
  
  const value: CalculatorContextType = {
    // State
    currentStep,
    formData,
    
    // Step Management
    startCalculator,
    handleFlowSelect,
    goToNextStep,
    updateFormData,
    
    // Guaranteed Flow Handlers
    handleGuaranteedModeSelect,
    handleIncreaseSelect,
    handleAmountNext,
    handleDatesNext,
    handleReviewCalculate,
    
    // LCP Flow Handlers
    handleLcpPaymentNext,
    handleLcpDetailsNext,
    handleLcpProfileNext,
    handleLcpLifestyleNext,
    handleLcpHealthNext,
    
    // LCP Calculation Results
    lcpResult,
    lcpError,
    lcpShowResults,
    handleLcpCalculate,
    handleLcpBackToReview,

    // Reprompt signal
    repromptCounter,
    triggerReprompt,
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
};

// ============================================================================
// CUSTOM HOOK
// ============================================================================

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}; 