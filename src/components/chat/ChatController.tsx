import React from 'react';
import ChatInterface from './ChatInterface';
import type { ChatChoice } from './types';
import { AppProviders } from '../providers/AppProviders';

interface ChatControllerProps {
  onClose?: () => void;
  closeIcon?: React.ReactNode;
  activeScreen?: ChatChoice | null;
}

const ChatController: React.FC<ChatControllerProps> = ({ onClose, closeIcon, activeScreen }) => {
  return (
    <AppProviders>
      <ChatInterface onClose={onClose} closeIcon={closeIcon} activeScreen={activeScreen} />
    </AppProviders>
  );
};

export default ChatController; 