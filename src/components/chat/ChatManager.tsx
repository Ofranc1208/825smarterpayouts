"use client";
import React, { useState, useEffect } from 'react';
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

  const handleStartChat = (choice: ChatChoice) => {
    setActiveScreen(choice);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setActiveScreen(null);
  };

  return (
    <>
      <WelcomeScreen onStartChat={handleStartChat} />

      {/* Chat Modal Overlay */}
      <div className={`${styles.chatModalOverlay} ${isChatOpen ? styles.open : ''}`}>
        <div className={styles.chatModalContainer}>
          {isChatOpen && (
            <ChatController 
              onClose={handleCloseChat} 
              closeIcon={closeIcon} 
              activeScreen={activeScreen} 
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatManager; 