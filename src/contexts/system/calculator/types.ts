// Calculator System Types
// ======================

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
} from '../../../types';

export type FlowType = 'guaranteed' | 'lcp' | 'compare-offer';

export interface CalculatorContextType {
  // State
  currentStep: CalculatorStep | null;
  formData: CalculatorFormData;
  
  // Step Management
  startCalculator: () => void;
  handleFlowSelect: (flow: FlowType) => void;
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

export interface CalculatorState {
  currentStep: CalculatorStep | null;
  formData: CalculatorFormData;
  lcpResult: LCPCalculationResult | null;
  lcpError: CalculationError | undefined;
  lcpShowResults: boolean;
  repromptCounter: number;
}

export interface CalculatorActions {
  startCalculator: () => void;
  handleFlowSelect: (flow: FlowType) => void;
  goToNextStep: (step: CalculatorStep) => void;
  updateFormData: (data: Partial<CalculatorFormData>) => void;
  handleGuaranteedModeSelect: (mode: string) => void;
  handleIncreaseSelect: (rate: number) => void;
  handleAmountNext: () => void;
  handleDatesNext: () => void;
  handleReviewCalculate: () => void;
  handleLcpPaymentNext: (data: LCPPaymentData) => void;
  handleLcpDetailsNext: (data: LCPDetailsData) => void;
  handleLcpProfileNext: (data: LCPProfileData) => void;
  handleLcpLifestyleNext: (data: LCPLifestyleData) => void;
  handleLcpHealthNext: (data: LCPHealthData) => void;
  handleLcpCalculate: (data: Partial<LCPFormData>) => void;
  handleLcpBackToReview: () => void;
  triggerReprompt: () => void;
}

export interface FlowHandler {
  canHandle(step: CalculatorStep): boolean;
  handleStep(step: CalculatorStep, data?: any): void;
  updateFormData(data: any): void;
  getFormData(): any;
}
