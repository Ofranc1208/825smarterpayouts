"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import WelcomeScreen from './WelcomeScreen';
import ChatController from './ChatController';
import { closeIcon } from './icons';
import styles from './ChatManager.module.css';
import type { ChatChoice } from './types';

const ChatManager: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState<ChatChoice | null>(null);
  const searchParams = useSearchParams();

  // Check for chat=open query parameter and auto-open chat
  useEffect(() => {
    const chatParam = searchParams.get('chat');
    if (chatParam === 'open') {
      setIsChatOpen(true);
      setActiveScreen('calculate'); // Set to calculate screen since user is returning from calculator
    }
  }, [searchParams]);

  // Prevent body scroll when modal is open (safe, non-jumpy)
  useEffect(() => {
    if (isChatOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isChatOpen]);

  // Ensure portal only runs on client
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleStartChat = (choice: ChatChoice) => {
    console.log('[ChatManager] Button clicked! Opening modal with choice:', choice);
    setActiveScreen(choice);
    setIsChatOpen(true);
    console.log('[ChatManager] Modal should now be open. isChatOpen will be:', true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setActiveScreen(null);
  };

  // Prepare modal content for portal
  const modalContent = (
    <div 
      className={`${styles.chatModalOverlay} ${isChatOpen ? styles.open : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCloseChat();
      }}
    >
      <div className={styles.chatModalContainer}>
        {/* Close button */}
        <button
          onClick={handleCloseChat}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1001,
            fontSize: '18px',
            color: '#666'
          }}
          aria-label="Close chat"
        >
          ✕
        </button>

        {isChatOpen && (
          <ChatController 
            onClose={handleCloseChat} 
            closeIcon={closeIcon} 
            activeScreen={activeScreen} 
          />
        )}
      </div>
    </div>
  );

  return (
    <>
      <WelcomeScreen onStartChat={handleStartChat} />
      {isMounted && isChatOpen && createPortal(modalContent, document.body)}
    </>
  );
};

export default ChatManager; 