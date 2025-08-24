"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './ChatInterface.module.css';
import type { ChatChoice } from './types';
import { SmartInputBar } from './SmartInputBar';
import ChatMessages from './ChatMessages';
// Removed: import { useCalculator } from '../../contexts/CalculatorContext';
// Removed: import Step1SelectType from '../calculator/steps/Step1SelectType';
// Removed: import { InputBarController } from '../InputBar';

interface ChatInterfaceProps {
  onClose?: () => void;
  closeIcon?: React.ReactNode;
  activeScreen?: ChatChoice | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  onClose, 
  closeIcon, 
  activeScreen
}) => {
  const searchParams = useSearchParams();

  // Reset Chat Handler - clears session and redirects to fresh chat
  const handleResetChat = () => {
    const sessionId = searchParams.get('sessionId');
    
    // Clear the saved session from localStorage
    if (sessionId) {
      localStorage.removeItem(`chat-session-${sessionId}`);
    }
    
    // Redirect to fresh chat page (no URL parameters)
    window.location.href = '/mint-intelligent-chat';
  };

  // Example onSend handler (replace with your actual logic)
  const handleSend = (message: string) => {
    // TODO: Connect to chat state/controller
  };

  return (
    <div className={styles.chatContainer}>
      <header className={styles.chatHeader}>
        <span className={styles.headerTitle}>Mint</span>
        <div className={styles.headerButtons}>
          <button
            className={styles.resetButton}
            onClick={handleResetChat}
            aria-label="Reset chat"
            title="Reset chat"
            type="button"
          >
            ↻
          </button>
          {onClose && closeIcon && (
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close chat"
              type="button"
            >
              {closeIcon}
            </button>
          )}
        </div>
      </header>
      <div className={styles.chatContent}>
        <ChatMessages />
      </div>
      <div className={styles.inputBarWrapper}>
        <SmartInputBar />
      </div>
    </div>
  );
};

export default ChatInterface; 