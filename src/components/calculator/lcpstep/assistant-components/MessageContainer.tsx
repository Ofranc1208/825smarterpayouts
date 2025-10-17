"use client";

import React, { useRef, useEffect, useState } from 'react';
import ChatBubble from '../../../chat/ChatBubble';
import ChatbotTyping from '../../../chatbot/ChatbotTyping';
import styles from './MessageContainer.module.css';

export interface Message {
  id: string;
  sender: 'system' | 'user' | 'bot';
  text: string;
}

export interface MessageContainerProps {
  messages: Message[];
  isTyping: boolean;
  isLoading?: boolean;
}

/**
 * MessageContainer - Handles message display with auto-scroll functionality
 * Contains complex scroll behavior and user interaction detection
 */
const MessageContainer: React.FC<MessageContainerProps> = ({
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
      style={{ height: '100%', overflow: 'visible' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {messages.map((message) => (
        <ChatBubble 
          key={message.id} 
          sender={message.sender}
        >
          {message.text}
        </ChatBubble>
      ))}
      {isTyping && <ChatbotTyping />}
    </div>
  );
};

export default MessageContainer;
