import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo, useRef } from 'react';
import { useWelcomeScript } from '../hooks/useWelcomeScript';
import { useGPTIntegration } from '../hooks/useGPTIntegration';
import { useConversationalForm, Message, TextMessage, ComponentMessage } from '../hooks/useConversationalForm';
import { useCalculator } from './CalculatorContext';
import CompareOfferStepper from '../components/calculator/CompareOfferStepper';
import { useFormStepSnapshot } from '../hooks/useFormStepSnapshot';

// Unique ID generator to prevent duplicate keys
let messageCounter = 0;
const generateUniqueId = () => {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
};

// ============================================================================
// CONTEXT DEFINITION
// ============================================================================

interface ChatContextType {
  // Core message state
  visibleMessages: Message[];
  setVisibleMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  
  // Chat functionality
  sendMessage: (text: string) => Promise<void>;
  isTyping: boolean;
  isLoading: boolean;
  
  // Form interactions
  startConversationalForm: () => void;
  handleTypeSelection: (type: 'guaranteed' | 'life-contingent' | 'dont-know') => void;
  
  // Utility functions
  logUserChoiceAsMessage: (text: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// ============================================================================
// PROVIDER IMPLEMENTATION
// ============================================================================

interface ChatProviderProps {
  children: ReactNode;
  visibleMessages: Message[];
  setVisibleMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  logUserChoiceAsMessage: (text: string) => void;
  sessionId: string;
}

export const ChatProvider = ({ children, visibleMessages, setVisibleMessages, logUserChoiceAsMessage, sessionId }: ChatProviderProps) => {
  // State for messages that will be used in useConversationalForm
  const [isTyping, setIsTyping] = useState(false);

  // 🎬 Connect to Calculator Context to monitor flow state
  const { currentStep, triggerReprompt, handleFlowSelect } = useCalculator();

  // Use the simplified conversational form hook
  const { startConversationalForm, handleTypeSelection, advanceConversation } = useConversationalForm({
    setVisibleMessages,
    sessionId
  });

  // Handle choice from ChatbotMenu
  const handleInitialChoice = useCallback(async (choiceText: string) => {
    switch (choiceText) {
              case 'Compare An Offer':
        await advanceConversation({
          userMessageText: choiceText,
          botConfirmationText: "Great, I can help you compare your offer. First, how would you like to provide the details of the offer you already have?"
        });
        handleFlowSelect('compare-offer');
        break;
      default:
        console.log('Unhandled choice:', choiceText);
    }
  }, [handleFlowSelect, advanceConversation]);

  // Initialize welcome script with the startConversationalForm function
  // 🎯 CRITICAL FIX: Pass existing visibleMessages to prevent overwriting restored sessions
  const welcomeScript = useWelcomeScript({
    onCalculate: startConversationalForm,
    onChoice: handleInitialChoice,
    initialMessages: visibleMessages // Pass restored messages to prevent welcome script overwrite
  });

  React.useEffect(() => {
    setVisibleMessages(welcomeScript.visibleMessages);
  }, [welcomeScript.visibleMessages]);

  React.useEffect(() => {
    setIsTyping(welcomeScript.isTyping);
  }, [welcomeScript.isTyping]);

  // 🎯 Add calculation link to chat when LCP flow is activated (no duplicate message - useConversationalForm handles this)
  const addedLCPLinkRef = useRef(false);
  React.useEffect(() => {
    if (currentStep && currentStep.startsWith('lcp_') && !addedLCPLinkRef.current) {
      // Create a serializable component message for the calculation link
      const calculationLinkMessage: ComponentMessage = {
        id: generateUniqueId(),
        type: 'component',
        componentType: 'CalculationLink',
        componentData: {
          text: 'Start Your Calculation →',
          href: `/calculations/lcp?sessionId=${sessionId}`,
          style: {
            display: 'inline-block',
            maxWidth: '280px',
            width: '100%',
            padding: '16px 24px',
            background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            color: '#047857',
            border: '2px solid #059669',
            borderRadius: '14px',
            textAlign: 'center',
            margin: '8px auto',
            cursor: 'pointer',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '0.95rem',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.15)',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
          }
        }
      };

      // Only add the calculation link (useConversationalForm already added the response message)
      setVisibleMessages(prev => [...prev, calculationLinkMessage]);

      addedLCPLinkRef.current = true;
    }
  }, [currentStep, setVisibleMessages, sessionId]);

  // 🎯 Add calculation link to chat when Guaranteed flow is activated
  const addedGuaranteedLinkRef = useRef(false);
  React.useEffect(() => {
    if (currentStep && ['mode', 'amount', 'increase', 'dates', 'review', 'offer'].includes(currentStep) && !addedGuaranteedLinkRef.current) {
      // Add bot message first
      const botMessage: TextMessage = {
        id: generateUniqueId(),
        type: 'text',
        text: "Perfect! Guaranteed Payments. Let's get your exact payout value — quick and simple. 🔒",
        sender: 'bot'
      };

      // Create a serializable component message for the calculation link
      const calculationLinkMessage: ComponentMessage = {
        id: generateUniqueId(),
        type: 'component',
        componentType: 'CalculationLink',
        componentData: {
          text: 'Start Your Calculation →',
          href: `/calculations/guaranteed?sessionId=${sessionId}`,
          style: {
            display: 'inline-block',
            maxWidth: '280px',
            width: '100%',
            padding: '16px 24px',
            background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            color: '#047857',
            border: '2px solid #059669',
            borderRadius: '14px',
            textAlign: 'center',
            margin: '8px auto',
            cursor: 'pointer',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '0.95rem',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.15)',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
          }
        }
      };

      // Add both messages to chat
      setVisibleMessages(prev => [...prev, 
        botMessage,
        calculationLinkMessage
      ]);

      addedGuaranteedLinkRef.current = true;
    }
  }, [currentStep, setVisibleMessages, sessionId]);

  const isGuaranteedFlowActive = currentStep && ['mode', 'amount', 'increase', 'dates', 'review', 'offer'].includes(currentStep);
  const isCompareOfferFlowActive = currentStep && currentStep.startsWith('compare-offer');

  // GPT integration hook
  const { processMessageWithGPT, fetchIntent } = useGPTIntegration({ visibleMessages });

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // New: use the form step snapshot for context
  const snapshot = useFormStepSnapshot();

  // Refactored sendMessage using AI-powered intent classification
  const sendMessage = useCallback(async (text: string) => {
    const newUserMessage: TextMessage = {
      id: generateUniqueId(),
      type: 'text',
      text: text,
      sender: 'user',
    };
    setVisibleMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);
    setIsLoading(true);

    try {
      const intentResult = snapshot ? await fetchIntent(snapshot, text) : { intent: 'AMBIGUOUS', value: text };
      switch (intentResult.intent) {
        case 'FORM_ANSWER':
          // Let the stepper components handle the form logic as before
          break;
        case 'ASK_QUESTION': {
          let botMsgId = generateUniqueId();
          let isFirstChunk = true;
          await processMessageWithGPT({
            userMessage: newUserMessage,
            onStream: (partialText) => {
              if (isFirstChunk) {
                setIsTyping(false);
                setVisibleMessages(prev => [
                  ...prev,
                  { id: botMsgId, type: 'text', text: partialText, sender: 'bot' }
                ]);
                isFirstChunk = false;
              } else {
                setVisibleMessages(prev2 => prev2.map(m => m.id === botMsgId ? { ...m, text: partialText } : m));
              }
            },
            onComplete: () => {
              setIsTyping(false);
              setIsLoading(false);
            },
            setVisibleMessages,
            currentStep,
            triggerReprompt
          });
          return;
        }
        case 'SPEAK_TO_AGENT': {
          setVisibleMessages(prev => [
            ...prev,
            {
              id: generateUniqueId(),
              type: 'text',
              text: 'One moment, I will find a payment specialist to assist you.',
              sender: 'bot',
            }
          ]);
          break;
        }
        case 'AMBIGUOUS':
        default: {
          let botMsgId = generateUniqueId();
          let isFirstChunk = true;
          await processMessageWithGPT({
            userMessage: {
              id: generateUniqueId(),
              type: 'text',
              text: "I'm not quite sure I understand. Could you please rephrase?",
              sender: 'user',
            },
            onStream: (partialText) => {
              if (isFirstChunk) {
                setIsTyping(false);
                setVisibleMessages(prev => [
                  ...prev,
                  { id: botMsgId, type: 'text', text: partialText, sender: 'bot' }
                ]);
                isFirstChunk = false;
              } else {
                setVisibleMessages(prev2 => prev2.map(m => m.id === botMsgId ? { ...m, text: partialText } : m));
              }
            },
            onComplete: () => {
              setIsTyping(false);
              setIsLoading(false);
            },
            setVisibleMessages,
            currentStep,
            triggerReprompt
          });
          return;
        }
      }
    } catch (err) {
      console.error('[ChatContext] Error processing message:', err);
      const errorResponse: TextMessage = {
        id: generateUniqueId(),
        type: 'text',
        text: 'Sorry, there was an error processing your message.',
        sender: 'bot',
      };
      setVisibleMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  }, [setVisibleMessages, processMessageWithGPT, fetchIntent, snapshot, currentStep, triggerReprompt]);

  // Memoize the context value to prevent unnecessary re-renders
  // setVisibleMessages, logUserChoiceAsMessage, startConversationalForm, and handleTypeSelection are assumed stable (from props/hooks)
  const value: ChatContextType = useMemo(() => ({
    visibleMessages,
    setVisibleMessages,
    sendMessage,
    isTyping,
    isLoading,
    startConversationalForm,
    handleTypeSelection,
    logUserChoiceAsMessage,
  }), [visibleMessages, sendMessage, isTyping, isLoading]);

  return (
    <ChatContext.Provider value={value}>
      {children}
      {/* 🎬 DIRECTOR: Compare Offer Stepper manages conversation flow when active */}
      {isCompareOfferFlowActive && (
        <CompareOfferStepper 
          visibleMessages={visibleMessages}
          setVisibleMessages={setVisibleMessages}
        />
      )}
    </ChatContext.Provider>
  );
}; 