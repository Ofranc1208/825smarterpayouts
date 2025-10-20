"use client";

import React, { useRef, useEffect, useState } from 'react';
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
 * Contains complex scroll behavior and user interaction detection
 */
const GuaranteedMessageContainer: React.FC<GuaranteedMessageContainerProps> = ({
  messages,
  isTyping,
  isLoading = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Improved auto-scroll implementation with user interaction detection
  useEffect(() => {
    if (containerRef.current && !isHovered) {
      // Check if user is near the bottom before auto-scrolling
      const container = containerRef.current;
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50;

      // Only auto-scroll if user is near the bottom (hasn't manually scrolled up)
      if (isNearBottom) {
        // Small delay to ensure DOM updates are complete
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
        }, 150);
      }
    }
  }, [messages, isTyping, isHovered]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          sender={message.sender === 'assistant' ? 'bot' : (message.sender as 'user' | 'system')}
        >
          {message.text}
        </ChatBubble>
      ))}
      {isTyping && <ChatbotTyping />}
    </div>
  );
};

export default GuaranteedMessageContainer;
