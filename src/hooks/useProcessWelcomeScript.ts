import React, { useState, useEffect } from 'react';
import { Message } from './useConversationalForm';
import { ProcessMenu } from '../components/chat/ProcessChat';

interface UseProcessWelcomeScriptProps {
  onTopicClick: (topic: string) => void;
  initialMessages?: Message[];
}

// Unique ID generator to prevent duplicate keys
let messageCounter = 0;
const generateUniqueId = () => {
  messageCounter += 1;
  return `process-welcome-${messageCounter}`;
};

export const useProcessWelcomeScript = ({ onTopicClick, initialMessages }: UseProcessWelcomeScriptProps) => {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>(initialMessages || []);
  const [isTyping, setIsTyping] = useState(false);

  // Process welcome script with unique IDs
  const PROCESS_WELCOME_SCRIPT: Message[] = [
    {
      id: generateUniqueId(),
      type: 'text',
      text: "Hi! I'm here to help you understand structured settlements and our process.",
      sender: 'bot',
    },
    {
      id: generateUniqueId(),
      type: 'text',
      text: "What would you like to learn about?",
      sender: 'bot',
    },
    {
      id: generateUniqueId(),
      type: 'component',
      component: React.createElement(ProcessMenu, {
        onTopicClick
      }),
    },
  ];

  // Animated reveal of welcome script - ONLY for new conversations
  useEffect(() => {
    // Skip welcome animation if we have existing messages (restored session)
    if (initialMessages && initialMessages.length > 0) {
      return;
    }

    let isMounted = true;
    const reveal = async () => {
      for (let i = 0; i < PROCESS_WELCOME_SCRIPT.length; i++) {
        setIsTyping(true);
        await new Promise(res => setTimeout(res, 1500));
        if (!isMounted) return;
        setIsTyping(false);
        setVisibleMessages(prev => [...prev, PROCESS_WELCOME_SCRIPT[i]]);
      }
    };
    reveal();
    return () => { isMounted = false; };
  }, []); // Empty dependency array - run only once

  return {
    visibleMessages,
    setVisibleMessages,
    isTyping,
    setIsTyping,
  };
};
