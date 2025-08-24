'use client';

import React, { useState, useEffect } from 'react';
import styles from './ChatRouter.module.css';
import WelcomeScreen from '../../src/components/chat/WelcomeScreen';

const ChatRouter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState('initial');

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('openChatWidget', handleOpenChat);
    return () => {
      window.removeEventListener('openChatWidget', handleOpenChat);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  if (activeView === 'initial') {
    return <WelcomeScreen onStartChat={() => {}} />;
  }

  return <div />;
};

export default ChatRouter; 