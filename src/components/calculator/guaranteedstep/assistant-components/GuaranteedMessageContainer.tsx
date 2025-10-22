"use client";

import React, { useRef, useEffect } from 'react';
import ChatBubble from '../../../chat/ChatBubble';
import ChatbotTyping from '../../../chatbot/ChatbotTyping';
import styles from './GuaranteedMessageContainer.module.css';

export interface GuaranteedMessage {
  id: string;
  sender: 'system' | 'user' | 'assistant';
  text: string;
}

export interface GuaranteedMessageContainerProps {
  messages: GuaranteedMessage[];
  isTyping: boolean;
  isLoading?: boolean;
}

/**
 * GuaranteedMessageContainer - Handles message display with auto-scroll functionality
 * The actual scrolling container is the parent div in GuaranteedAssistantPanel
 */
const GuaranteedMessageContainer: React.FC<GuaranteedMessageContainerProps> = ({
  messages,
  isTyping,
  isLoading = false
}) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive or typing status changes
  useEffect(() => {
    // Scroll the end marker into view, which will scroll the parent container
    if (endOfMessagesRef.current) {
      setTimeout(() => {
        endOfMessagesRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        });
      }, 100);
    }
  }, [messages, isTyping]);

  return (
    <div className={styles.container}>
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          sender={message.sender === 'assistant' ? 'bot' : (message.sender as 'user' | 'system')}
        >
          {message.text}
        </ChatBubble>
      ))}
      {isTyping && <ChatbotTyping />}
      {/* Invisible marker at the end for auto-scroll */}
      <div ref={endOfMessagesRef} style={{ height: '1px' }} />
    </div>
  );
};

export default GuaranteedMessageContainer;
