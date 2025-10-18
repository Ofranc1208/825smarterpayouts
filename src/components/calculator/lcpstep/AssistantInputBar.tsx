"use client";

import React, { useState } from 'react';
import { useAssistant } from '../../../contexts/AssistantContext';
import styles from '../../chat/SmartInputBar/SmartInputBar.module.css'; // Reuse existing styles

// Adapter component that reuses SmartInputBar's logic and styling
export const AssistantInputBar = () => {
  const [text, setText] = useState('');
  const { sendMessage, isTyping } = useAssistant();

  const handleSend = () => {
    if (text.trim() && !isTyping) {
      sendMessage(text);
      setText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={{
      padding: '16px 20px',
      borderTop: '1px solid #e0e0e0',
      backgroundColor: '#ffffff',
      flexShrink: 0
    }}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.inputField}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isTyping}
        />
        <button
          className={styles.sendButton}
          onClick={handleSend}
          disabled={isTyping || !text.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}; 