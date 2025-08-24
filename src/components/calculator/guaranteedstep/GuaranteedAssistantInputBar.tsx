"use client";

import React, { useState } from 'react';
import { useGuaranteedAssistant } from '../../../contexts/GuaranteedAssistantContext';
import styles from '../../chat/SmartInputBar.module.css'; // Reuse existing styles

// Guaranteed-specific input bar component
export const GuaranteedAssistantInputBar = () => {
  const [text, setText] = useState('');
  const { sendContextualMessage, isTyping, currentStep } = useGuaranteedAssistant();

  const handleSend = () => {
    if (text.trim() && !isTyping) {
      console.log('[GuaranteedAssistantInputBar] 🎯 Sending contextual message:', text, 'Step:', currentStep);
      sendContextualMessage(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        onKeyDown={handleKeyDown}
        placeholder={currentStep ? `Ask about this step...` : "Ask about guaranteed payments..."}
        disabled={isTyping}
      />
      <button
        className={styles.sendButton}
        onClick={handleSend}
        disabled={isTyping || !text.trim()}
      >
        {isTyping ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};
