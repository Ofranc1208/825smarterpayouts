"use client";

import React, { useEffect, useState } from 'react';
import { useAssistant } from '../../../contexts/AssistantContext';
import { AssistantBackdrop, AssistantHeader, MessageContainer } from './assistant-components';
import { AssistantInputBar } from './AssistantInputBar';
import styles from './AssistantPanel.module.css';

const AssistantPanel: React.FC = () => {
  const { isOpen, closeAssistant, messages, isTyping, setIsTyping, addWelcomeMessage } = useAssistant();
  const [isLoading, setIsLoading] = useState(true);
  const [hasShownInitialAnimation, setHasShownInitialAnimation] = useState(false);

  // Show loading state briefly when panel opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle initial animation sequence when panel opens for the first time
  useEffect(() => {
    if (isOpen && !hasShownInitialAnimation && messages.length === 0) {
      setHasShownInitialAnimation(true);
      
      // Step 1: Show typing animation
      setIsTyping(true);
      
      // Step 2: After 1.5 seconds, hide typing and add welcome message
      setTimeout(() => {
        setIsTyping(false);
        addWelcomeMessage();
      }, 1500);
    }
  }, [isOpen, hasShownInitialAnimation, messages.length, setIsTyping, addWelcomeMessage]);

  // Prevent body scroll when assistant panel is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Prevent body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
      
      return () => {
        // Restore body scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <AssistantBackdrop onClose={closeAssistant} />

      <div className={styles.panel}>
        {/* Header with original green styling */}
        <div className={styles.header}>
          <h3 className={styles.title}>Help Assistant</h3>
          <button
            className={styles.closeButton}
            onClick={closeAssistant}
            aria-label="Close assistant"
            type="button"
          >
            ×
          </button>
        </div>
        
        {/* Message Display Area */}
        <div className={styles.messagesContainer}>
          {isLoading ? (
            <div className={styles.loadingContainer}>
              Loading conversation...
            </div>
          ) : (
            <div className={styles.messagesWrapper}>
              <MessageContainer
                messages={messages}
                isTyping={isTyping}
                isLoading={false}
              />
            </div>
          )}
        </div>

        {/* Input Bar */}
        <AssistantInputBar />
      </div>
    </>
  );
};

export default AssistantPanel; 