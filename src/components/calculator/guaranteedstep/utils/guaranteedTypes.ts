// ============================================================================
// 🎯 GUARANTEED STEP - TYPE DEFINITIONS
// ============================================================================
// All type definitions for the self-contained Guaranteed Payment Calculator

/**
 * 💰 Guaranteed Payment Form Data Structure
 */
export interface GuaranteedFormData {
  // Payment Mode Selection
  paymentMode?: 'Monthly' | 'Quarterly' | 'Semiannually' | 'Annually' | 'Lump Sum';

  // Annual Increase
  annualIncrease?: number;

  // Regular Payment Details (for non-lump sum modes)
  paymentAmount?: string | number;
  startDate?: string;
  endDate?: string;

  // Lump Sum Payment Details
  payments?: LumpSumPayment[];
}

/**
 * 💸 Individual Lump Sum Payment
 */
export interface LumpSumPayment {
  id?: string;
  amount?: string | number;
  lumpSumDate?: string;
}

/**
 * 💬 Guaranteed Assistant Message Structure
 */
export interface GuaranteedMessage {
  id: string;
  type: 'text' | 'user_choice' | 'system';
  text: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: Date;
  metadata?: {
    step?: string;
    calculationData?: any;
    formData?: any;
    contextAware?: boolean;
    isWelcome?: boolean;
    isHandoff?: boolean;
    chunkType?: string;
  };
}

/**
 * 🎯 Calculation Result Structure
 */
export interface GuaranteedCalculationResult {
  isValid: boolean;
  result?: {
    minimumOffer: number;
    maximumOffer: number;
    calculation: {
      presentValue: number;
      totalPayments: number;
      paymentCount: number;
      averagePayment: number;
    };
  };
  error?: string;
}

/**
 * 📝 Form Validation Error
 */
export interface GuaranteedValidationError {
  field: string;
  message: string;
}

/**
 * 🎮 Step Navigation
 */
export type GuaranteedStep = 'mode' | 'amount' | 'lumpsum' | 'review' | 'offer';

/**
 * 🎭 Assistant Context State
 */
export interface GuaranteedAssistantState {
  isOpen: boolean;
  messages: GuaranteedMessage[];
  isTyping: boolean;
  currentStep: GuaranteedStep | null;
  formData: GuaranteedFormData;
}

/**
 * 💾 Storage Hook Configuration
 */
export interface GuaranteedStorageConfig {
  sessionId: string;
  storagePrefix: string;
  autoSave: boolean;
}

/**
 * 🔄 Form Navigation Actions
 */
export interface GuaranteedNavigationActions {
  goToNextStep: (step: GuaranteedStep) => void;
  goToPreviousStep: () => void;
  resetForm: () => void;
}

/**
 * 📊 Component Props Interfaces
 */
export interface GuaranteedStepProps {
  initialData?: GuaranteedFormData;
  onDataChange?: (data: GuaranteedFormData) => void;
  onNext?: (data: GuaranteedFormData) => void;
  onError?: (error: GuaranteedValidationError[]) => void;
}

export interface GuaranteedPaymentOverviewProps extends GuaranteedStepProps {
  // Specific props for payment overview step
}

export interface GuaranteedPaymentAmountOverviewProps extends GuaranteedStepProps {
  // Specific props for payment amount step
}

export interface GuaranteedLumpSumAmountOverviewProps extends GuaranteedStepProps {
  // Specific props for lump sum step
}

export interface GuaranteedReviewProps extends GuaranteedStepProps {
  onEdit?: (step: number) => void;
  error?: string;
}

export interface GuaranteedOfferProps {
  calculationResult?: GuaranteedCalculationResult;
  onBack?: () => void;
  onContinue?: () => void;
}

/**
 * 🎨 UI Component Props
 */
export interface GuaranteedAssistantPanelProps {
  // No specific props - uses context
}

export interface GuaranteedAssistantInputBarProps {
  // No specific props - uses context
}

export interface GuaranteedStepContainerProps {
  children: React.ReactNode;
  step?: GuaranteedStep;
  title?: string;
  subtitle?: string;
}

/**
 * 🔧 Utility Types
 */
export type GuaranteedFormField = keyof GuaranteedFormData;
export type GuaranteedMessageType = GuaranteedMessage['type'];
export type GuaranteedMessageSender = GuaranteedMessage['sender'];

/**
 * 🎯 Export all types for easy importing
 */
export type {
  // Main data types
  GuaranteedFormData as FormData,
  GuaranteedMessage as Message,
  GuaranteedCalculationResult as CalculationResult,

  // Component prop types
  GuaranteedStepProps as StepProps,
  GuaranteedOfferProps as OfferProps,

  // Navigation types
  GuaranteedStep as Step,
  GuaranteedNavigationActions as NavigationActions
};
