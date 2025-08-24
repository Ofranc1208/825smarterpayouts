"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useGuaranteedStorage } from '../components/calculator/guaranteedstep/hooks/useGuaranteedStorage';
import { GuaranteedMessage, GuaranteedFormData } from '../components/calculator/guaranteedstep/types/guaranteed.types';
import { convertToSelfContainedFormData } from '../components/calculator/guaranteedstep/utils/typeUtils';
import { useCalculator } from './CalculatorContext';
import { 
  generateContextualResponse, 
  generateHandoffSummary,
  STEP_GUIDANCE_PROMPTS,
  GUARANTEED_ASSISTANT_SYSTEM_PROMPT 
} from '../components/calculator/guaranteedstep/prompts/guaranteedStepPrompts';

// ============================================================================
// MESSAGE INTERFACE - Using isolated storage types
// ============================================================================

export type GuaranteedAssistantMessage = GuaranteedMessage;

// ============================================================================
// CONTEXT INTERFACE
// ============================================================================

interface GuaranteedAssistantContextType {
  isOpen: boolean;
  messages: GuaranteedAssistantMessage[];
  isTyping: boolean;
  currentStep: string | null;
  formData: GuaranteedFormData;
  openAssistant: () => void;
  closeAssistant: () => void;
  sendMessage: (text: string) => void;
  sendContextualMessage: (text: string) => void;
  addUserChoice: (choice: string, step?: string) => void;
  setCurrentStep: (step: string | null) => void;
  clearMessages: () => void;
  getStepGuidance: () => string;
  getSummaryForHandoff: () => string;
  showWelcomeMessage: () => void;
  handoffToMainChat: () => void;
}

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
// PROVIDER COMPONENT - With Isolated Storage
// ============================================================================

export const GuaranteedAssistantProvider: React.FC<GuaranteedAssistantProviderProps> = ({ 
  children, 
  sessionId: propSessionId
}) => {
  // 🔧 FIX: Get sessionId from URL like LCP does, use prop as fallback
  const getSessionId = (): string => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('sessionId') || propSessionId || 'default';
    }
    return propSessionId || 'default';
  };
  
  const sessionId = getSessionId();
  console.log('[GuaranteedAssistantProvider] 🚀 Initializing with sessionId:', sessionId, 'propSessionId:', propSessionId);
  
  // Use completely isolated storage hook
  const { 
    messages, 
    isLoading, 
    addMessage, 
    clearMessages,
    storageKey 
  } = useGuaranteedStorage(sessionId);
  
  // Connect to CalculatorContext for form data awareness
  const { formData } = useCalculator();
  
  // Memoize the guaranteed form data to prevent unnecessary re-renders
  const guaranteedFormData = React.useMemo(() => {
    return convertToSelfContainedFormData(formData?.guaranteedData || {});
  }, [formData?.guaranteedData]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  console.log('[GuaranteedAssistantProvider] 📊 Storage initialized:', {
    sessionId,
    storageKey,
    messageCount: messages.length,
    isLoading
  });

  // ============================================================================
  // ASSISTANT ACTIONS
  // ============================================================================

  const openAssistant = useCallback(() => {
    console.log('[GuaranteedAssistant] 🎯 Opening assistant panel');
    setIsOpen(true);
  }, []);

  const closeAssistant = useCallback(() => {
    console.log('[GuaranteedAssistant] ❌ Closing assistant panel');
    setIsOpen(false);
  }, []);

  // ============================================================================
  // MESSAGE ACTIONS
  // ============================================================================

  // Legacy sendMessage for backward compatibility
  const sendMessage = useCallback((text: string) => {
    console.log('[GuaranteedAssistant] 💬 Sending basic message:', text);
    
    // Add user message
    addMessage(text, 'text', 'user', { step: currentStep || undefined });
    
    // Use contextual response
    setIsTyping(true);
    setTimeout(() => {
      const response = generateContextualResponse(text, currentStep || 'general', guaranteedFormData);
      addMessage(response, 'text', 'assistant', { step: currentStep || undefined });
      setIsTyping(false);
    }, 1500);
  }, [addMessage, currentStep, guaranteedFormData]);

  // Enhanced contextual message system
  const sendContextualMessage = useCallback((text: string) => {
    console.log('[GuaranteedAssistant] 🎯 Sending contextual message:', text, 'Step:', currentStep);
    
    // Add user message with context
    addMessage(text, 'text', 'user', { 
      step: currentStep || undefined,
      formData: guaranteedFormData 
    });
    
    // Generate contextual AI response
    setIsTyping(true);
    setTimeout(() => {
      const response = generateContextualResponse(text, currentStep || 'general', guaranteedFormData);
      
      addMessage(response, 'text', 'assistant', { 
        step: currentStep || undefined,
        formData: guaranteedFormData,
        contextAware: true
      });
      setIsTyping(false);
    }, 1200); // Slightly faster for better UX
  }, [addMessage, currentStep, guaranteedFormData]);

  const addUserChoice = useCallback((choice: string, step?: string) => {
    console.log('[GuaranteedAssistant] ✅ User choice:', choice, 'for step:', step);
    
    addMessage(
      `Selected: ${choice}`, 
      'user_choice', 
      'user', 
      { 
        step: step || currentStep || undefined,
        calculationData: { choice, step },
        formData: guaranteedFormData
      }
    );
  }, [addMessage, currentStep, guaranteedFormData]);

  // ============================================================================
  // CONTEXTUAL HELPER METHODS
  // ============================================================================

  const getStepGuidance = useCallback((): string => {
    if (!currentStep) return "Welcome! I'm here to help you through the guaranteed payment calculation process.";
    
    const stepKey = currentStep as keyof typeof STEP_GUIDANCE_PROMPTS;
    const stepPrompts = STEP_GUIDANCE_PROMPTS[stepKey];
    
    if (!stepPrompts) return "I'm here to help you with your guaranteed payment calculation.";
    
    // Return contextual help based on current step and form data
    if (typeof stepPrompts.contextualHelp === 'function') {
      return stepPrompts.contextualHelp(guaranteedFormData);
    } else if (typeof stepPrompts.welcome === 'function') {
      return stepPrompts.welcome(guaranteedFormData);
    } else if (typeof stepPrompts.welcome === 'string') {
      return stepPrompts.welcome;
    }
    
    return "I'm here to help you with your guaranteed payment calculation.";
  }, [currentStep, guaranteedFormData]);

  const getSummaryForHandoff = useCallback((): string => {
    return generateHandoffSummary(guaranteedFormData);
  }, [guaranteedFormData]);

  const showWelcomeMessage = useCallback(() => {
    if (!currentStep) return;
    
    console.log('[GuaranteedAssistant] 👋 Showing welcome message for step:', currentStep);
    
    const stepKey = currentStep as keyof typeof STEP_GUIDANCE_PROMPTS;
    const stepPrompts = STEP_GUIDANCE_PROMPTS[stepKey];
    
    if (!stepPrompts) return;
    
    let welcomeMessage = '';
    if (typeof stepPrompts.welcome === 'function') {
      welcomeMessage = stepPrompts.welcome(guaranteedFormData);
    } else if (typeof stepPrompts.welcome === 'string') {
      welcomeMessage = stepPrompts.welcome;
    }
    
    if (welcomeMessage) {
      addMessage(welcomeMessage, 'text', 'assistant', { 
        step: currentStep,
        formData: guaranteedFormData,
        isWelcome: true
      });
    }
  }, [currentStep, guaranteedFormData, addMessage]);

  const handoffToMainChat = useCallback(() => {
    console.log('[GuaranteedAssistant] 🔄 Initiating handoff to main chat');
    
    // Get the summary for handoff
    const summary = getSummaryForHandoff();
    
    // Store the handoff data in localStorage for the main chat to pick up
    const handoffData = {
      timestamp: new Date().toISOString(),
      summary: summary,
      fromStep: currentStep,
      formData: guaranteedFormData,
      completedFlow: 'guaranteed'
    };
    
    localStorage.setItem('chat_handoff_data', JSON.stringify(handoffData));
    
    // Add a farewell message
    addMessage(
      "Perfect! I'm transferring you to our main chat where Mint can help you with any additional questions or next steps. All your calculation details will be available there.", 
      'text', 
      'assistant', 
      { 
        step: currentStep || undefined,
        isHandoff: true
      }
    );
    
    // Close the assistant after a delay
    setTimeout(() => {
      closeAssistant();
      
      // Navigate to main chat with handoff parameter
      const currentUrl = new URL(window.location.href);
      const currentSessionId = currentUrl.searchParams.get('sessionId') || sessionId;
      console.log('[GuaranteedAssistant] 🔍 Handoff - currentSessionId:', currentSessionId, 'sessionId:', sessionId);
      
      // If we're not already on the main chat page, navigate there
      if (!window.location.pathname.includes('mint-intelligent-chat')) {
        // 🔧 FIX: Preserve sessionId in handoff navigation
        const handoffUrl = `/mint-intelligent-chat?sessionId=${currentSessionId}&handoff=guaranteed&chat=open`;
        console.log('[GuaranteedAssistant] 🔍 Handoff URL:', handoffUrl);
        window.location.href = handoffUrl;
      } else {
        // If we're already on the chat page, just trigger a reload with the parameters
        currentUrl.searchParams.set('sessionId', currentSessionId);
        currentUrl.searchParams.set('handoff', 'guaranteed');
        currentUrl.searchParams.set('chat', 'open');
        window.location.href = currentUrl.toString();
      }
    }, 2000);
  }, [getSummaryForHandoff, currentStep, guaranteedFormData, addMessage, closeAssistant, sessionId]);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue: GuaranteedAssistantContextType = React.useMemo(() => ({
    isOpen,
    messages,
    isTyping,
    currentStep,
    formData: guaranteedFormData,
    openAssistant,
    closeAssistant,
    sendMessage,
    sendContextualMessage,
    addUserChoice,
    setCurrentStep,
    clearMessages,
    getStepGuidance,
    getSummaryForHandoff,
    showWelcomeMessage,
    handoffToMainChat
  }), [
    isOpen,
    messages,
    isTyping,
    currentStep,
    guaranteedFormData,
    openAssistant,
    closeAssistant,
    sendMessage,
    sendContextualMessage,
    addUserChoice,
    setCurrentStep,
    clearMessages,
    getStepGuidance,
    getSummaryForHandoff,
    showWelcomeMessage,
    handoffToMainChat
  ]);

  console.log('[GuaranteedAssistantProvider] 🔄 Context value updated:', {
    isOpen,
    messageCount: messages.length,
    currentStep,
    isTyping
  });

  return (
    <GuaranteedAssistantContext.Provider value={contextValue}>
      {children}
    </GuaranteedAssistantContext.Provider>
  );
};

export default GuaranteedAssistantContext;