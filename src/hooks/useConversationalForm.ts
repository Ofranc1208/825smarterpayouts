import React, { useCallback } from 'react';
import { useCalculator } from '../contexts/CalculatorContext';
import Step1SelectType from '../components/calculator/steps/Step1SelectType';
import GuaranteedOffer from '../components/calculator/guaranteedstep/GuaranteedOffer';
import ChatbotTyping from '../components/chatbot/ChatbotTyping';
import { CalculationService } from '../services/calculationService';
import { GuaranteedReviewData, GuaranteedCalculationResult } from '../types';

// --- Message Type Definitions ---
interface BaseMessage {
  id: string;
}

export interface TextMessage extends BaseMessage {
  type: 'text';
  text: string;
  sender: 'user' | 'bot';
}

export interface ComponentMessage extends BaseMessage {
  type: 'component';
  component?: React.ReactNode; // Legacy support for existing JSX components
  componentType?: string;      // New: Serializable component type identifier
  componentData?: Record<string, any>; // New: Serializable component data
}

export type Message = TextMessage | ComponentMessage;

interface UseConversationalFormProps {
  setVisibleMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  sessionId?: string;
}

// Transition data interface for the generic conversation handler
interface ConversationTransition {
  userMessageText: string;
  botConfirmationText: string;
  nextStepComponent?: React.ReactNode;
}

// Unique ID generator to prevent duplicate keys
let messageCounter = 0;
const generateUniqueId = () => {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
};

export const useConversationalForm = ({ setVisibleMessages, sessionId }: UseConversationalFormProps) => {
  // Connect to CalculatorContext
  const { startCalculator, handleFlowSelect, formData, updateFormData, goToNextStep, triggerReprompt } = useCalculator();

  // 🎭 CORE "STAGE MANAGER" FUNCTION
  // Generic function to handle all conversational transitions
  const advanceConversation = useCallback(async (transition: ConversationTransition) => {
    const { userMessageText, botConfirmationText, nextStepComponent } = transition;

    // 1. First, add the typing indicator to show immediate bot reaction
    const typingMessage: ComponentMessage = {
      id: generateUniqueId(),
      type: 'component',
      component: React.createElement(ChatbotTyping),
    };
    setVisibleMessages(prev => [...prev, typingMessage]);

    // 2. Wait for realistic delay to simulate bot thinking
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 3. Single update: remove typing and add both user echo and bot confirmation
    const userMessage: TextMessage = {
      id: generateUniqueId(),
      type: 'text',
      text: userMessageText,
      sender: 'user',
    };
    
    const botConfirmation: TextMessage = {
      id: generateUniqueId(),
      type: 'text',
      text: botConfirmationText,
      sender: 'bot',
    };

    // Remove typing indicator and add user message + bot confirmation in one update
    setVisibleMessages(prev => [...prev.slice(0, -1), userMessage, botConfirmation]);

    // 4. NEW: Add delay before showing next component to allow user to read bot's response
    if (nextStepComponent) {
      // Wait for user to read bot's response before showing the next component
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const nextStepMessage: ComponentMessage = {
        id: generateUniqueId(),
        type: 'component',
        component: nextStepComponent,
      };
      setVisibleMessages(prev => [...prev, nextStepMessage]);
    }
  }, [setVisibleMessages]);

  // Enhanced function to handle user's type selection with natural conversational flow
  const handleTypeSelection = useCallback(async (type: 'guaranteed' | 'life-contingent' | 'dont-know') => {
    // Convert type to user-friendly text
    const userChoiceText = type === 'guaranteed' ? 'Guaranteed Payments' : 
                          type === 'life-contingent' ? 'Life-Contingent Payments' : 
                          'I don\'t know';
    
    // Determine confirmation text based on user's choice
    let confirmationText = '';
    if (type === 'guaranteed') {
      confirmationText = 'Perfect! You have guaranteed payments.';
    } else if (type === 'life-contingent') {
      confirmationText = 'Got it! You have life-contingent payments.';
    } else {
      confirmationText = 'Okay, no worries. I can still help you give me some details about your payments.';
    }

    // Use the generic advanceConversation function
    await advanceConversation({
      userMessageText: userChoiceText,
      botConfirmationText: confirmationText,
      // nextStepComponent will be handled by the Director (GuaranteedStepper)
    });

    // Update the flow state (this triggers the Director to take control)
    if (type === 'guaranteed') {
      // 🎯 NEW: Add navigation link for guaranteed flow instead of rendering component
      console.log('[useConversationalForm] 🔍 Creating guaranteed link with sessionId:', sessionId);
      const guaranteedLinkMessage: ComponentMessage = {
        id: generateUniqueId(),
        type: 'component',
        componentType: 'GuaranteedCalculationLink',
        componentData: {
          text: 'Start Guaranteed Calculation →',
          href: '/calculations/guaranteed',
          sessionId: sessionId // Pass sessionId for persistence
        }
      };
      setVisibleMessages(prev => [...prev, guaranteedLinkMessage]);
      
      // Don't trigger the old flow - let the link handle navigation
    } else if (type === 'life-contingent' || type === 'dont-know') {
      // Unified flow: both life-contingent and dont-know go to LCP flow
      handleFlowSelect('lcp');
    }
  }, [advanceConversation, handleFlowSelect, setVisibleMessages, sessionId]);

  // Function to start the conversational form flow
  const startConversationalForm = useCallback(async () => {
    // Add user's action to maintain conversational flow
    await advanceConversation({
      userMessageText: 'New Quote',
      botConfirmationText: 'Okay, great. What type of payments do you have?',
      nextStepComponent: React.createElement(Step1SelectType, { onSelectType: handleTypeSelection }),
    });

    // Initialize the calculator state
    startCalculator();
  }, [advanceConversation, handleTypeSelection, startCalculator]);

  // 🎯 FINAL STEP: Review Confirmation Handler
  const handleReviewConfirm = useCallback(async (reviewData: GuaranteedReviewData) => {
    // Extract and validate form data
    const { paymentAmount, startDate, endDate, paymentMode, annualIncrease } = reviewData;
    
    // Validate required data
    if (!paymentAmount || !startDate || !endDate || !paymentMode) {
      console.error('Missing required data for calculation:', { paymentAmount, startDate, endDate, paymentMode });
      return;
    }
    
    const amount = parseFloat(paymentAmount);
    if (!amount) {
      console.error('Invalid payment amount:', paymentAmount);
      return;
    }

    // Enhanced conversational pattern with longer delay
    // 1. Add user message echo first
    const userMessage: TextMessage = {
      id: generateUniqueId(),
      type: 'text',
      text: 'Yes, everything is correct. Calculate!',
      sender: 'user',
    };
    setVisibleMessages(prev => [...prev, userMessage]);

    // 2. Immediately show typing indicator
    const typingMessage: ComponentMessage = {
      id: generateUniqueId(),
      type: 'component',
      component: React.createElement(ChatbotTyping),
    };
    setVisibleMessages(prev => [...prev, typingMessage]);

    // 3. Wait longer delay for state consolidation and significance
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 4. Remove typing and add pre-calculation confirmation
    const botConfirmation: TextMessage = {
      id: generateUniqueId(),
      type: 'text',
      text: 'Congratulations! I\'m compiling the latest rates to calculate your final offer.',
      sender: 'bot',
    };
    setVisibleMessages(prev => [...prev.slice(0, -1), botConfirmation]);

    // 5. Perform the calculation with validated data
    // Use CalculationService for all business logic
    const calculationResult = CalculationService.calculateGuaranteed({
      paymentAmount,
      startDate,
      endDate,
      paymentMode,
      annualIncrease
    });

    // Update form data with calculation result
    updateFormData({ guaranteedData: { calculationResult } });

    // Advance to offer step
    goToNextStep('offer');

    // 6. Finally, add the offer component to show results
    const offerComponent = React.createElement(GuaranteedOffer, {
      calculationResult: {
        minOffer: calculationResult.minPayout,
        maxOffer: calculationResult.maxPayout
      },
      currentStep: 3,
      totalSteps: 3
    });

    setVisibleMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      type: 'component',
      component: offerComponent
    }]);
  }, [updateFormData, goToNextStep, setVisibleMessages]);

  return {
    startConversationalForm,
    advanceConversation, // Export the generic function for use by the Director
    handleTypeSelection,
    handleReviewConfirm, // Export the new review confirmation handler
    triggerReprompt,
  };
}; 