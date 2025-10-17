"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../../contexts/ChatContext';
import styles from './SmartInputBar.module.css';

/**
 * Smart input bar component for chat messaging interface - Mobile-First Edition
 *
 * Features:
 * - Mobile-first responsive design with dynamic positioning
 * - Keyboard-aware behavior for optimal mobile experience
 * - Enhanced touch targets (44px minimum) for accessibility
 * - Real-time message input with Enter key support
 * - Send button with hover animations and disabled states
 * - Loading state handling during message processing
 * - Safe area support for modern mobile devices
 * - Auto-focus management and viewport handling
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
  const [isMobile, setIsMobile] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  
  // Refs for DOM manipulation
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Chat context integration for message handling
  const { sendMessage, isLoading } = useChat();

  // Detect mobile device and keyboard visibility
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    const handleResize = () => {
      checkMobile();
      
      // Detect keyboard visibility on mobile
      if (isMobile) {
        const viewport = window.visualViewport;
        if (viewport) {
          const keyboardVisible = viewport.height < window.innerHeight * 0.75;
          setIsKeyboardVisible(keyboardVisible);
        }
      }
    };

    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, [isMobile]);

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

  // Dynamic class names based on device and state
  const containerClasses = [
    styles.inputContainer,
    isMobile ? styles.mobileContainer : styles.desktopContainer,
    isKeyboardVisible ? styles.keyboardVisible : '',
    isLoading ? styles.loading : ''
  ].filter(Boolean).join(' ');

  const inputClasses = [
    styles.inputField,
    isMobile ? styles.mobileInput : styles.desktopInput
  ].filter(Boolean).join(' ');

  const buttonClasses = [
    styles.sendButton,
    isMobile ? styles.mobileButton : styles.desktopButton
  ].filter(Boolean).join(' ');

  return (
    <div 
      ref={containerRef}
      className={containerClasses}
      data-mobile={isMobile}
      data-keyboard-visible={isKeyboardVisible}
    >
      <input
        ref={inputRef}
        type="text"
        className={inputClasses}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        disabled={isLoading}
        data-testid="chat-input"
        // Mobile-specific attributes
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="sentences"
        spellCheck="true"
      />
      <button
        className={buttonClasses}
        onClick={handleSend}
        disabled={isLoading || !text.trim()}
        data-testid="send-button"
        aria-label="Send message"
      >
        {isLoading ? '...' : 'Send'}
      </button>
    </div>
  );
}; 