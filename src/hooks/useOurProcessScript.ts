/**
 * useOurProcessScript - Custom Hook for "Our Process" Flow
 * 
 * Similar pattern to useWelcomeScript - manages the sequential display
 * of process steps without component-based typing indicators.
 */

import { useState, useCallback } from 'react';
import React from 'react';
import { Message, TextMessage, ComponentMessage } from './useConversationalForm';
import ContactOptions from '../components/chat/ContactOptions';

interface UseOurProcessScriptProps {
  setVisibleMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
}

// Unique ID generator
let messageCounter = 0;
const generateUniqueId = () => {
  messageCounter += 1;
  return `process-${Date.now()}-${messageCounter}`;
};

export const useOurProcessScript = ({ 
  setVisibleMessages, 
  setIsTyping 
}: UseOurProcessScriptProps) => {
  
  const [isRunning, setIsRunning] = useState(false);

  const runOurProcessFlow = useCallback(async () => {
    if (isRunning) return; // Prevent multiple runs
    setIsRunning(true);

    // Define all messages in the flow
    const processMessages: Message[] = [
      {
        id: generateUniqueId(),
        type: 'text',
        text: 'Our Process',
        sender: 'user',
      },
      {
        id: generateUniqueId(),
        type: 'text',
        text: "Sure! Here's our process in simpler terms:",
        sender: 'bot',
      },
      {
        id: generateUniqueId(),
        type: 'text',
        text: "Step 1: Use our AI calculator to get an instant quote without sharing any personal info.",
        sender: 'bot',
      },
      {
        id: generateUniqueId(),
        type: 'text',
        text: "Step 2: Review our clear terms with no hidden fees, and discuss everything with your dedicated specialist.",
        sender: 'bot',
      },
      {
        id: generateUniqueId(),
        type: 'text',
        text: "Step 3: Our legal team takes care of all the necessary court filings and keeps you updated.",
        sender: 'bot',
      },
      {
        id: generateUniqueId(),
        type: 'text',
        text: "Step 4: Once approved, you'll receive your money quickly, usually within 2-5 business days via secure transfer or certified check.",
        sender: 'bot',
      },
      {
        id: generateUniqueId(),
        type: 'text',
        text: "Ready to get started? Here's how to reach us:",
        sender: 'bot',
      },
    ];

    let isMounted = true;

    // Reveal messages sequentially with typing indicators
    for (let i = 0; i < processMessages.length; i++) {
      if (!isMounted) break;
      
      // Show typing indicator
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!isMounted) break;
      
      // Hide typing and show message
      setIsTyping(false);
      setVisibleMessages(prev => [...prev, processMessages[i]]);
      
      // Small delay between messages for readability
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Finally, add the ContactOptions component
    if (isMounted) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const contactOptionsMessage: ComponentMessage = {
        id: generateUniqueId(),
        type: 'component',
        component: React.createElement(ContactOptions),
      };
      setVisibleMessages(prev => [...prev, contactOptionsMessage]);
    }

    setIsRunning(false);

    return () => {
      isMounted = false;
    };
  }, [setVisibleMessages, setIsTyping, isRunning]);

  return {
    runOurProcessFlow,
    isRunning
  };
};

