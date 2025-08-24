"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ============================================================================
// MESSAGE INTERFACE
// ============================================================================

interface AssistantMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  step?: string;
  flowType?: 'guaranteed' | 'lcp';
}

// ============================================================================
// CONTEXT INTERFACE
// ============================================================================

interface AssistantContextType {
  isOpen: boolean;
  openAssistant: () => void;
  closeAssistant: () => void;
  messages: AssistantMessage[];
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
  sendMessage: (text: string) => void;
  addWelcomeMessage: () => void;
  addTestMessage: () => void; // For testing
  testErrorHandling: () => void; // For testing error handling
  currentStep: string | null;
  setCurrentStep: (step: string | null) => void;
  flowType: 'guaranteed' | 'lcp' | null;
  setFlowType: (flow: 'guaranteed' | 'lcp' | null) => void;
}

// ============================================================================
// CONTEXT CREATION
// ============================================================================

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (context === undefined) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};

// ============================================================================
// PROVIDER IMPLEMENTATION
// ============================================================================

interface AssistantProviderProps {
  children: ReactNode;
}

export const AssistantProvider: React.FC<AssistantProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [flowType, setFlowType] = useState<'guaranteed' | 'lcp' | null>(null);

  // Get sessionId from URL for persistence
  const getSessionId = (): string => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('sessionId') || 'default';
    }
    return 'default';
  };

  // Save messages to localStorage
  const saveMessages = (messagesToSave: AssistantMessage[]) => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return; // Skip if localStorage not available (SSR)
      }
      
      const sessionId = getSessionId();
      const key = `assistant-messages-${sessionId}`;
      localStorage.setItem(key, JSON.stringify(messagesToSave));
    } catch (error) {
      console.warn('Failed to save assistant messages:', error);
    }
  };

  // Load messages from localStorage
  const loadMessages = (): AssistantMessage[] => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        // Return empty array for SSR - we'll add welcome message after typing animation
        return [];
      }
      
      const sessionId = getSessionId();
      const key = `assistant-messages-${sessionId}`;
      const saved = localStorage.getItem(key);
      
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate the parsed data
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn('Failed to load assistant messages:', error);
    }
    
    // Return empty array - we'll add welcome message after typing animation
    return [];
  };

  // Initialize messages from localStorage
  useEffect(() => {
    const savedMessages = loadMessages();
    setMessages(savedMessages);
  }, []);

  // Save messages whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(messages);
    }
  }, [messages]);

  const openAssistant = () => {
    setIsOpen(true);
  };

  const closeAssistant = () => {
    setIsOpen(false);
  };

  // Get context-aware bot response based on current step and flow type
  const getContextAwareResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (flowType === 'guaranteed') {
      switch (currentStep) {
        case 'mode':
          if (lowerText.includes('monthly') || lowerText.includes('month')) {
            return "Great! Monthly payments are very common. This means you receive a payment every month. What's your annual increase rate?";
          } else if (lowerText.includes('quarterly') || lowerText.includes('quarter')) {
            return "Perfect! Quarterly payments mean you receive payments every 3 months. What's your annual increase rate?";
          } else if (lowerText.includes('lump sum')) {
            return "Excellent! Lump sum payments are straightforward. Let's move to the next step.";
          }
          return "I can help you with payment modes. Do you receive payments monthly, quarterly, semiannually, annually, or as a lump sum?";
        
        case 'amount':
          if (lowerText.includes('amount') || lowerText.includes('payment')) {
            return "Please enter the amount you usually receive for each payment. Also, we'll need the start and end dates for the period you want to calculate.";
          }
          return "For the payment amount step, I need to know how much you usually receive and the date range you want to calculate.";
        
        case 'review':
          return "Please review all the information you've provided. Make sure the payment amount, dates, and mode are correct before calculating.";
        
        case 'offer':
          return "Congratulations! Your guaranteed payment calculation is complete. The results show your minimum and maximum payout offers.";
        
        default:
          return "I'm here to help you with your guaranteed payment calculation. What would you like to know?";
      }
    } else if (flowType === 'lcp') {
      switch (currentStep) {
        case 'lcp_payment':
          if (lowerText.includes('monthly') || lowerText.includes('month')) {
            return "Great! Monthly payments are common for life-contingent settlements. What's your annual increase rate?";
          } else if (lowerText.includes('lump sum')) {
            return "Perfect! Lump sum payments for life-contingent settlements have different calculation factors. Let's continue.";
          }
          return "For life-contingent payments, I need to know your payment frequency and annual increase rate. This affects your life expectancy calculations.";
        
        case 'lcp_profile':
          if (lowerText.includes('age') || lowerText.includes('gender')) {
            return "Your age and gender are important factors for life-contingent calculations as they affect life expectancy. What's your body frame size?";
          }
          return "For life-contingent payments, I need your age range, gender, and body frame size. These factors help calculate your life expectancy.";
        
        case 'lcp_health':
          if (lowerText.includes('smoke') || lowerText.includes('smoking')) {
            return "Smoking status is a critical factor for life-contingent calculations. What's your general health condition?";
          } else if (lowerText.includes('health') || lowerText.includes('condition')) {
            return "Your health condition affects life expectancy calculations. Do you have any cardiac conditions?";
          }
          return "For life-contingent payments, I need to know your smoking status, general health, and cardiac conditions. These significantly impact your life expectancy.";
        
        case 'lcp_details':
          if (lowerText.includes('date') || lowerText.includes('amount')) {
            return "Please provide the start and end dates for the payments you want to calculate, plus the payment amount.";
          }
          return "For the details step, I need the start date, end date, and payment amount for your life-contingent settlement.";
        
        case 'lcp_review':
          return "Please review all your information carefully. Life-contingent calculations are complex and depend on accurate health and profile data.";
        
        case 'lcp_results':
          return "Congratulations! Your life-contingent payment calculation is complete. The results show your minimum and maximum payout offers based on your health profile.";
        
        default:
          return "I'm here to help you with your life-contingent payment calculation. This process involves health and profile factors that affect your life expectancy. What would you like to know?";
      }
    }
    
    // Default response if no flow type is set
    return `I understand you said: "${userText.trim()}". I'm here to help you with this calculation step. What specific questions do you have?`;
  };

  // Send message function with error handling
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message immediately
    const userMessage: AssistantMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      step: currentStep || undefined,
      flowType: flowType || undefined
    };
    setMessages(prev => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Simulate AI response (will be replaced with real API later)
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate potential API error (1% chance for testing)
          if (Math.random() < 0.01) {
            reject(new Error('Simulated API error'));
          } else {
            resolve(true);
          }
        }, 1500);
      });

      const aiMessage: AssistantMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: getContextAwareResponse(text.trim()),
        step: currentStep || undefined,
        flowType: flowType || undefined
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Handle API errors gracefully
      console.error('Assistant API error:', error);
      
      const errorMessage: AssistantMessage = {
        id: `error-${Date.now()}`,
        sender: 'bot',
        text: "Sorry, I'm having trouble connecting. Please try again.",
        step: currentStep || undefined,
        flowType: flowType || undefined
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Test function to add messages (for development/testing)
  const addTestMessage = () => {
    const newMessage: AssistantMessage = {
      id: `test-${Date.now()}`,
      sender: 'user',
      text: 'This is a test message to see the conversation!',
      step: currentStep || undefined,
      flowType: flowType || undefined
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate bot response for testing
    setTimeout(() => {
      const botResponse: AssistantMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: 'Thanks for the test message! I can help you with any questions about this calculation step.',
        step: currentStep || undefined,
        flowType: flowType || undefined
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  // Test function to simulate API errors (for testing error handling)
  const testErrorHandling = () => {
    const testMessage: AssistantMessage = {
      id: `test-error-${Date.now()}`,
      sender: 'user',
      text: 'Test error handling',
      step: currentStep || undefined,
      flowType: flowType || undefined
    };
    setMessages(prev => [...prev, testMessage]);
    setIsTyping(true);
    
    // Simulate API error
    setTimeout(() => {
      const errorMessage: AssistantMessage = {
        id: `error-${Date.now()}`,
        sender: 'bot',
        text: "Sorry, I'm having trouble connecting. Please try again.",
        step: currentStep || undefined,
        flowType: flowType || undefined
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Add welcome message function for initial animation
  const addWelcomeMessage = () => {
    let welcomeText = 'Hello, Mint again. How can I help you with this step?';
    
    if (flowType === 'guaranteed') {
      welcomeText = "Hi! I'm your Guaranteed Payment Assistant. I can help you through each step of your guaranteed payment calculation. What would you like to know?";
    } else if (flowType === 'lcp') {
      welcomeText = "Hi! I'm your Life-Contingent Payment Assistant. I can help you through each step of your LCP calculation, including health and profile factors. What would you like to know?";
    }
    
    const welcomeMessage: AssistantMessage = {
      id: 'assistant-welcome',
      sender: 'bot',
      text: welcomeText,
      step: currentStep || undefined,
      flowType: flowType || undefined
    };
    setMessages(prev => [...prev, welcomeMessage]);
  };

  const value: AssistantContextType = {
    isOpen,
    openAssistant,
    closeAssistant,
    messages,
    isTyping,
    setIsTyping,
    sendMessage,
    addWelcomeMessage,
    addTestMessage,
    testErrorHandling,
    currentStep,
    setCurrentStep,
    flowType,
    setFlowType
  };

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  );
}; 