import React, { useState, useEffect } from 'react';
import { Message } from './useConversationalForm';
import { SpecialistMenu } from '../components/chat/SpecialistChat';

interface UseSpecialistWelcomeScriptProps {
  onChoice: (choice: 'live_chat' | 'sms' | 'phone_call' | 'appointment') => void;
  initialMessages?: Message[];
}

// Unique ID generator to prevent duplicate keys
let messageCounter = 0;
const generateUniqueId = () => {
  messageCounter += 1;
  return `specialist-welcome-${messageCounter}`;
};

export const useSpecialistWelcomeScript = ({ onChoice, initialMessages }: UseSpecialistWelcomeScriptProps) => {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>(initialMessages || []);
  const [isTyping, setIsTyping] = useState(false);

  // Specialist welcome script with unique IDs
  const SPECIALIST_WELCOME_SCRIPT: Message[] = [
    {
      id: generateUniqueId(),
      type: 'text',
      text: "Hi 👋 I'm Mint. Let me connect you with our settlement specialists.",
      sender: 'bot',
    },
    {
      id: generateUniqueId(),
      type: 'text',
      text: 'How would you like to connect with our team?',
      sender: 'bot',
    },
    {
      id: generateUniqueId(),
      type: 'component',
      component: React.createElement(SpecialistMenu, {
        onChoice
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
      for (let i = 0; i < SPECIALIST_WELCOME_SCRIPT.length; i++) {
        setIsTyping(true);
        await new Promise(res => setTimeout(res, 1500));
        if (!isMounted) return;
        setIsTyping(false);
        setVisibleMessages(prev => [...prev, SPECIALIST_WELCOME_SCRIPT[i]]);
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

