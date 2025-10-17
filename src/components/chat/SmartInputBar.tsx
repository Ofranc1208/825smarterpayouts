"use client";

import React, { useState } from 'react';
import { useChat } from '../../contexts/ChatContext';
import styles from './SmartInputBar.module.css';

/**
 * Smart input bar component for chat messaging interface
 *
 * Features:
 * - Real-time message input with Enter key support
 * - Send button with hover animations and disabled states
 * - Loading state handling during message processing
 * - Responsive flexbox layout with proper spacing
 * - Focus states with brand color highlighting
 * - CSS modules for proper styling architecture
 *
 * @component
 * @example
 * // Basic usage in chat interface
 * <SmartInputBar />
 *
 * // Automatically integrates with ChatContext for:
 * // - sendMessage function
 * // - isLoading state management
 * // - Message state persistence
 */
export const SmartInputBar = () => {
  // Local state for input text management
  const [text, setText] = useState('');

  // Chat context integration for message handling
  const { sendMessage, isLoading } = useChat();

  /**
   * Handles message sending with validation
   * Only sends non-empty, trimmed messages when not loading
   */
  const handleSend = () => {
    if (text.trim() && !isLoading) {
      sendMessage(text);
      setText(''); // Clear input after sending
    }
  };

  /**
   * Handles Enter key press for quick message sending
   * Provides keyboard accessibility for better UX
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        className={styles.inputField}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        disabled={isLoading}
        data-testid="chat-input"
      />
      <button
        className={styles.sendButton}
        onClick={handleSend}
        disabled={isLoading || !text.trim()}
        data-testid="send-button"
      >
        Send
      </button>
    </div>
  );
}; 