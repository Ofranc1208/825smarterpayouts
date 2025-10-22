"use client";

import React, { useState } from 'react';
import { useGuaranteedAssistant } from '../../../contexts/GuaranteedAssistantContext';
import styles from './GuaranteedAssistantInputBar.module.css';

// Guaranteed-specific input bar component with modern styling
export const GuaranteedAssistantInputBar = () => {
  const [text, setText] = useState('');
  const { sendContextualMessage, isTyping } = useGuaranteedAssistant();

  const handleSend = () => {
    if (text.trim() && !isTyping) {
      console.log('[GuaranteedAssistantInputBar] 🎯 Sending contextual message:', text);
      sendContextualMessage(text);
      setText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.inputBarContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.inputField}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          disabled={isTyping}
        />
        <button
          className={`${styles.sendButton} ${text.trim() ? styles.sendButtonActive : ''}`}
          onClick={handleSend}
          disabled={isTyping || !text.trim()}
          aria-label="Send message"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m22 2-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};
