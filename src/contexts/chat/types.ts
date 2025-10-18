/**
 * Chat Context Types - Orchestra Pattern
 * 
 * Centralized type definitions for the chat system
 */

import { ReactNode } from 'react';
import { Message, TextMessage, FileMessage } from '../../hooks/useConversationalForm';

export interface ChatContextType {
  // Core message state
  visibleMessages: Message[];
  setVisibleMessages: React.Dispatch<React.SetStateAction<Message[]>>;

  // Chat functionality
  sendMessage: (message: string | FileMessage) => Promise<void>;
  isTyping: boolean;
  isLoading: boolean;

  // Form interactions
  startConversationalForm: () => void;
  handleTypeSelection: (type: 'guaranteed' | 'life-contingent' | 'dont-know') => void;

  // Utility functions
  logUserChoiceAsMessage: (text: string) => void;
}

export interface ChatProviderProps {
  children: ReactNode;
  visibleMessages: Message[];
  setVisibleMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  logUserChoiceAsMessage: (text: string) => void;
  sessionId: string;
}

export interface MessageProcessorConfig {
  visibleMessages: Message[];
  setVisibleMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsTyping: (typing: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  processMessageWithGPT: any;
  fetchIntent: any;
  snapshot: any;
  currentStep: string | null;
  triggerReprompt: any;
}
