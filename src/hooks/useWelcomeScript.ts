import React, { useState, useEffect } from 'react';
import { Message, TextMessage, ComponentMessage } from './useConversationalForm';
import ChatbotMenu from '../components/chatbot/ChatbotMenu';

interface UseWelcomeScriptProps {
  onCalculate: () => void;
  onChoice?: (choiceText: string) => void;
  initialMessages?: Message[]; // New: Accept existing messages to prevent overwrite
}

// Unique ID generator to prevent duplicate keys
let messageCounter = 0;
const generateUniqueId = () => {
  messageCounter += 1;
  return `welcome-${messageCounter}`;
};

export const useWelcomeScript = ({ onCalculate, onChoice, initialMessages }: UseWelcomeScriptProps) => {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>(initialMessages || []);
  const [isTyping, setIsTyping] = useState(false);

  // Centralized welcome script with unique IDs
  const FULL_WELCOME_SCRIPT: Message[] = [
    {
      id: generateUniqueId(),
      type: 'text',
      text: "Hi 👋 I’m Mint. Ready to skip the Sales Pitch and take control of your Structured Settlement Payments",
      sender: 'bot',
    },
    {
      id: generateUniqueId(),
      type: 'text',
      text: 'Let’s explore your settlement Early Payout Options.',
      sender: 'bot',
    },
    {
      id: generateUniqueId(),
      type: 'text',
      text: 'I can help you with these topics',
      sender: 'bot',
    },
    {
      id: generateUniqueId(),
      type: 'component',
      component: React.createElement(ChatbotMenu, { 
        onCalculate,
        onChoice: onChoice || (() => {}) 
      }),
    },
  ];

  // Animated reveal of welcome script - ONLY for new conversations
  useEffect(() => {
    // 🎯 CRITICAL FIX: Skip welcome animation if we have existing messages (restored session)
    if (initialMessages && initialMessages.length > 0) {
      return; // Don't show welcome script for restored sessions
    }

    let isMounted = true;
    const reveal = async () => {
      for (let i = 0; i < FULL_WELCOME_SCRIPT.length; i++) {
        setIsTyping(true);
        await new Promise(res => setTimeout(res, 1500));
        if (!isMounted) return;
        setIsTyping(false);
        setVisibleMessages(prev => [...prev, FULL_WELCOME_SCRIPT[i]]);
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