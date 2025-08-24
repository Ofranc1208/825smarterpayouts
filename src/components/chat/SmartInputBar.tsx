"use client";

import React, { useState } from 'react';
import { useChat } from '../../contexts/ChatContext';

/**
 * Smart input bar component for chat messaging interface
 * 
 * Features:
 * - Real-time message input with Enter key support
 * - Send button with hover animations and disabled states
 * - Loading state handling during message processing
 * - Responsive flexbox layout with proper spacing
 * - Focus states with brand color highlighting
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

  // Container styles - flexbox layout with proper spacing
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    padding: '16px',
    borderTop: '1px solid #e0e0e0',
    backgroundColor: '#ffffff',
    gap: '12px'
  };

  // Input field styles with focus and disabled states
  const inputStyles: React.CSSProperties = {
    flexGrow: 1,
    border: '1px solid #e0e0e0',
    borderRadius: '20px',
    padding: '12px 16px',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: isLoading ? '#f2f2f2' : '#f8f9fa',
    cursor: isLoading ? 'not-allowed' : 'text'
  };

  // Focus styles for input field (applied via onFocus/onBlur)
  const inputFocusStyles: React.CSSProperties = {
    ...inputStyles,
    borderColor: '#09b44d',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 0 3px rgba(9, 180, 77, 0.1)'
  };

  // Send button styles with conditional disabled state
  const buttonStyles: React.CSSProperties = {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '20px',
    backgroundColor: (isLoading || !text.trim()) ? '#a5d8b9' : '#09b44d',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: (isLoading || !text.trim()) ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '80px'
  };

  // Hover styles for send button (applied via onMouseEnter/onMouseLeave)
  const buttonHoverStyles: React.CSSProperties = {
    ...buttonStyles,
    backgroundColor: '#07923d',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(9, 180, 77, 0.3)'
  };

  // State management for input focus and button hover
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <div style={containerStyles}>
      <input
        type="text"
        style={isInputFocused ? inputFocusStyles : inputStyles}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        placeholder="Type your message..."
        disabled={isLoading}
      />
      <button
        style={isButtonHovered && !isLoading && text.trim() ? buttonHoverStyles : buttonStyles}
        onClick={handleSend}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        disabled={isLoading || !text.trim()}
      >
        Send
      </button>
    </div>
  );
}; 