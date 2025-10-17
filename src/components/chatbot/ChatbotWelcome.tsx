import React, { useEffect, useState } from 'react';
import styles from './ChatbotWelcome.module.css';
import ChatBubble from '../chat/ChatBubble';
import ChatbotTyping from './ChatbotTyping';
import ChatbotMenu from './ChatbotMenu';

interface ChatbotWelcomeProps {
  onCalculate: () => void;
}

// Define the sequence of steps
const SEQUENCE = [
  { type: 'typing' },
  { type: 'message', content: "Hi 👋 I'm Mint — the industry’s first AI-powered structured settlement assistant" },
  { type: 'typing' },
  { type: 'message', content: 'Just so you know, no personal information is needed to get started.' },
  { type: 'typing' },
  { type: 'message', content: 'Would you like to get a new quote?' },
  { type: 'typing' },
  { type: 'menu' },
] as const;

type Step = typeof SEQUENCE[number];

const FIRST_TYPING_DELAY = 250; // Reduced for first typing
const TYPING_DELAY = 1000;
const MESSAGE_DELAY = 1200;
const MENU_DELAY = 700;

const ChatbotWelcome: React.FC<ChatbotWelcomeProps> = ({ onCalculate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setCurrentStep(0);
    setIsTyping(false);
    const revealSequence = async () => {
      for (let i = 0; i < SEQUENCE.length; i++) {
        if (!isMounted) break;
        if (SEQUENCE[i].type === 'typing') {
          setIsTyping(true);
          await new Promise((res) => setTimeout(res, i === 0 ? FIRST_TYPING_DELAY : TYPING_DELAY));
        } else if (SEQUENCE[i].type === 'message') {
          setIsTyping(false);
          setCurrentStep((prev) => prev + 1);
          await new Promise((res) => setTimeout(res, MESSAGE_DELAY));
        } else if (SEQUENCE[i].type === 'menu') {
          setIsTyping(false);
          setCurrentStep((prev) => prev + 1);
          await new Promise((res) => setTimeout(res, MENU_DELAY));
        }
        // After each step, increment currentStep if not typing
        if (SEQUENCE[i].type !== 'typing') {
          setCurrentStep((prev) => prev + 1);
        }
      }
      setIsTyping(false);
    };
    revealSequence();
    return () => {
      isMounted = false;
    };
  }, []);

  // Gather all previous messages with proper styling
  const visibleMessages = [];
  for (let i = 0; i < currentStep; i++) {
    const step = SEQUENCE[i];
    if (step?.type === 'message') {
      visibleMessages.push(
        <div key={i} className={styles.bubble} style={{ animationDelay: `${i * 0.1}s` }}>
          <ChatBubble sender="bot">
            {step.content}
          </ChatBubble>
        </div>
      );
    } else if (step?.type === 'menu') {
      visibleMessages.push(
        <div key={i} className={styles.menuWrapper} style={{ animationDelay: `${i * 0.1}s` }}>
          <ChatbotMenu onCalculate={onCalculate} onChoice={() => {}} />
        </div>
      );
    }
  }

  // Show typing indicator if isTyping is true
  return (
    <div className={styles.chatContainer}>
      {visibleMessages}
      {isTyping && <ChatbotTyping key={currentStep} />}
    </div>
  );
};

export default ChatbotWelcome; 