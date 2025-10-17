// System Types - Assistant Context Architecture
// ============================================

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  step?: string;
  flowType?: AssistantFlowType;
}

export type AssistantFlowType = 'guaranteed' | 'lcp' | null;
export type AssistantStep = string | null;

export interface AssistantContextType {
  isOpen: boolean;
  openAssistant: () => void;
  closeAssistant: () => void;
  messages: AssistantMessage[];
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
  sendMessage: (text: string) => void;
  addWelcomeMessage: () => void;
  addTestMessage: () => void;
  testErrorHandling: () => void;
  currentStep: AssistantStep;
  setCurrentStep: (step: AssistantStep) => void;
  flowType: AssistantFlowType;
  setFlowType: (flow: AssistantFlowType) => void;
  clearMessages: () => void;
}

export interface AssistantState {
  isOpen: boolean;
  messages: AssistantMessage[];
  isTyping: boolean;
  currentStep: AssistantStep;
  flowType: AssistantFlowType;
}

export interface AssistantActions {
  openAssistant: () => void;
  closeAssistant: () => void;
  setIsTyping: (isTyping: boolean) => void;
  sendMessage: (text: string) => Promise<void>;
  addWelcomeMessage: () => void;
  addTestMessage: () => void;
  testErrorHandling: () => void;
  setCurrentStep: (step: AssistantStep) => void;
  setFlowType: (flow: AssistantFlowType) => void;
  clearMessages: () => void;
}
