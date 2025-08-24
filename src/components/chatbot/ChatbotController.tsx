import React from 'react';
import ChatbotWelcome from './ChatbotWelcome';

interface ChatbotControllerProps {
  onCalculate: () => void;
}

const ChatbotController: React.FC<ChatbotControllerProps> = ({ onCalculate }) => {
  // In the future, you can add logic here to switch between flows (welcome, calculator, etc.)
  return <ChatbotWelcome onCalculate={onCalculate} />;
};

export default ChatbotController; 