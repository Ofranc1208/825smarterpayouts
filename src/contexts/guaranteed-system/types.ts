/**
 * 🎯 GUARANTEED ASSISTANT SYSTEM - TYPE DEFINITIONS
 * 
 * Centralized type definitions for the Guaranteed Assistant orchestrator system.
 * Mirrors the LCP system architecture for consistency.
 */

import { GuaranteedMessage, GuaranteedFormData } from '../../components/calculator/guaranteedstep/utils/guaranteedTypes';

// ============================================================================
// MESSAGE TYPES
// ============================================================================

export type GuaranteedAssistantMessage = GuaranteedMessage;

// ============================================================================
// STEP TYPES
// ============================================================================

export type GuaranteedAssistantStep = 
  | 'mode'
  | 'amount'
  | 'review'
  | 'offer'
  | null;

// ============================================================================
// STATE INTERFACE
// ============================================================================

export interface GuaranteedAssistantState {
  isOpen: boolean;
  messages: GuaranteedAssistantMessage[];
  isTyping: boolean;
  currentStep: GuaranteedAssistantStep;
  formData: GuaranteedFormData;
  sessionId: string;
}

// ============================================================================
// ACTIONS INTERFACE
// ============================================================================

export interface GuaranteedAssistantActions {
  openAssistant: () => void;
  closeAssistant: () => void;
  sendMessage: (text: string) => Promise<void>;
  sendContextualMessage: (text: string) => Promise<void>;
  addUserChoice: (choice: string, step?: string) => void;
  setCurrentStep: (step: GuaranteedAssistantStep) => void;
  clearMessages: () => void;
  getStepGuidance: () => string;
  getSummaryForHandoff: () => string;
  showWelcomeMessage: () => void;
  addBotMessage: (text: string) => void;
  addErrorMessage: (errorText?: string) => void;
  testErrorHandling: () => void;
  handoffToMainChat: () => void;
}

// ============================================================================
// CONTEXT TYPE
// ============================================================================

export interface GuaranteedAssistantContextType extends GuaranteedAssistantState, GuaranteedAssistantActions {}

// ============================================================================
// METADATA EXTENSION
// ============================================================================

/**
 * Extended metadata for Guaranteed messages
 * Adds isError and isBotMessage flags
 */
export interface GuaranteedMessageMetadata {
  step?: string;
  calculationData?: any;
  formData?: any;
  contextAware?: boolean;
  isWelcome?: boolean;
  isHandoff?: boolean;
  chunkType?: string;
  isError?: boolean;
  isBotMessage?: boolean;
}

