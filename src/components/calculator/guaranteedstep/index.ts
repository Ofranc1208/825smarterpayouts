// ============================================================================
// 🎯 GUARANTEED STEP - BARREL EXPORTS
// ============================================================================
// Central export file for the self-contained Guaranteed Payment Calculator

// Main Components
export { default as GuaranteedStepper } from './GuaranteedStepper';
export { default as GuaranteedStepContainer } from './GuaranteedStepContainer';
export { default as GuaranteedAssistantPanel } from './GuaranteedAssistantPanel';
export { GuaranteedAssistantInputBar } from './GuaranteedAssistantInputBar';

// Step Components
export { default as GuaranteedPaymentOverview } from './GuaranteedPaymentOverview';
export { default as GuaranteedPaymentAmountOverview } from './GuaranteedPaymentAmountOverview';
export { default as GuaranteedLumpSumAmountOverview } from './GuaranteedLumpSumAmountOverview';
export { default as GuaranteedReview } from './GuaranteedReview';
export { default as GuaranteedOffer } from './GuaranteedOffer';

// Shared Components
export { default as GuaranteedCalculationLink } from './shared/GuaranteedCalculationLink';

// Hooks
export { useGuaranteedStorage } from './hooks/useGuaranteedStorage';

// Types
export type {
  GuaranteedFormData,
  GuaranteedMessage,
  GuaranteedCalculationResult,
  GuaranteedStep,
  LumpSumPayment,
  GuaranteedValidationError,
  GuaranteedStepProps,
  GuaranteedOfferProps,
  // Aliases for convenience
  FormData,
  Message,
  CalculationResult,
  Step
} from './utils/guaranteedTypes';

// Prompts and Utilities
export {
  generateContextualResponse,
  generateHandoffSummary,
  STEP_GUIDANCE_PROMPTS,
  GUARANTEED_ASSISTANT_SYSTEM_PROMPT
} from './utils/guaranteedPrompts';
