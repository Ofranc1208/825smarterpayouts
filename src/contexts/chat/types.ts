/**
 * Chat Context Types - Orchestra Pattern
 * 
 * Centralized type definitions for the chat system
 */

import { ReactNode } from 'react';
import { Message, TextMessage, FileMessage } from '../../hooks/useConversationalForm';
import type { SpecialistProfile } from '../../../services/chat';

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

  // Live chat specific (optional for backward compatibility)
  liveChatMode?: boolean;
  specialist?: SpecialistProfile | null;
  liveChatStatus?: 'disconnected' | 'connecting' | 'connected' | 'error';
  endLiveChat?: () => Promise<void>;
}

export interface ChatProviderProps {
  children: ReactNode;
  visibleMessages: Message[];
  setVisibleMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  logUserChoiceAsMessage: (text: string) => void;
  sessionId: string;
  mode?: 'calculate' | 'specialist'; // Chat mode: regular or specialist
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
