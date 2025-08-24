'use client';

import { useState, useCallback } from 'react';
import { doc, setDoc, getDoc, collection, deleteDoc, addDoc } from 'firebase/firestore';

/**
 * Self-contained chat storage hook for Mint Chat
 * 
 * This hook manages all Firebase integration and message persistence
 * for the Mint chat system. It's completely independent and contains
 * all necessary interfaces and utilities.
 * 
 * @component MintChat
 * @author SmarterPayouts Team
 * @since 2024
 */

// Generic Message interface that can be used across different chat implementations
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: Date;
  type?: 'text' | 'file' | 'system';
  fileUrl?: string;
  // Allow for additional properties that specific implementations might need
  [key: string]: any;
}

interface StoredMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: string; // ISO string for storage
  type?: 'text' | 'file' | 'system';
  fileUrl?: string;
  [key: string]: any;
}

interface ChatTranscript {
  chatId: string;
  messages: StoredMessage[];
  lastUpdated: string; // ISO string for storage
  createdAt: string; // ISO string for storage
}

interface HandOffRequest {
  chatId: string;
  timestamp: string;
  transcript: StoredMessage[];
}

interface UseChatStorageReturn {
  saveMessages: (chatId: string, messages: ChatMessage[]) => Promise<void>;
  loadMessages: (chatId: string) => Promise<ChatMessage[]>;
  deleteChat: (chatId: string) => Promise<void>;
  logHandOffRequest: (data: { chatId: string; transcript: ChatMessage[] }) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

// Utility functions for message conversion
export const convertToStoredMessage = (message: ChatMessage): StoredMessage => {
  return {
    ...message,
    timestamp: message.timestamp instanceof Date ? message.timestamp.toISOString() : message.timestamp,
  };
};

export const convertToMessage = (storedMessage: StoredMessage): ChatMessage => {
  return {
    ...storedMessage,
    timestamp: new Date(storedMessage.timestamp),
  };
};

// Message filtering utilities
export const filterValidMessages = (messages: ChatMessage[]): ChatMessage[] => {
  return messages.filter(msg => msg.content && typeof msg.content === 'string' && msg.sender !== 'system');
};

export const deduplicateMessages = (messages: ChatMessage[]): ChatMessage[] => {
  const seen = new Set();
  return messages.filter(msg => {
    const content = msg.content.trim();
    if (seen.has(content)) return false;
    seen.add(content);
    return true;
  });
};

// OpenAI formatting utility
export const toOpenAIMessages = (
  systemMessage: { role: string; content: string }, 
  history: ChatMessage[], 
  latestUserMessage?: string
) => {
  const openAIMessages = [systemMessage];
  if (history && Array.isArray(history)) {
    const validMessages = deduplicateMessages(filterValidMessages(history));
    for (const msg of validMessages) {
      const content = msg.content.trim();
      if (msg.sender === 'user') {
        openAIMessages.push({ role: 'user', content });
      } else if (msg.sender === 'bot') {
        openAIMessages.push({ role: 'assistant', content });
      }
    }
  }
  if (latestUserMessage) {
    openAIMessages.push({ role: 'user', content: latestUserMessage.trim() });
  }
  return openAIMessages;
};

/**
 * Main chat storage hook for Mint Chat
 * 
 * Provides complete message persistence, Firebase integration,
 * and hand-off request logging functionality.
 * 
 * @returns {UseChatStorageReturn} All storage methods and state
 */
export function useChatStorage(): UseChatStorageReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // TEMPORARILY DISABLED: All storage functions neutralized for testing
  const logHandOffRequest = useCallback(async (data: { chatId: string; transcript: ChatMessage[] }): Promise<void> => {
    // Do nothing - storage disabled for testing
    console.log('[MintChat useChatStorage] Hand-off request logging disabled for testing:', data.chatId);
  }, []);

  const saveMessages = useCallback(async (chatId: string, messages: ChatMessage[]): Promise<void> => {
    // Do nothing - storage disabled for testing
    console.log('[MintChat useChatStorage] Message saving disabled for testing:', chatId, 'Message count:', messages.length);
  }, []);

  const loadMessages = useCallback(async (chatId: string): Promise<ChatMessage[]> => {
    // Return empty array - storage disabled for testing
    console.log('[MintChat useChatStorage] Message loading disabled for testing, returning empty array for chatId:', chatId);
    return [];
  }, []);

  const deleteChat = useCallback(async (chatId: string): Promise<void> => {
    // Do nothing - storage disabled for testing
    console.log('[MintChat useChatStorage] Chat deletion disabled for testing:', chatId);
  }, []);

  return {
    saveMessages,
    loadMessages,
    deleteChat,
    logHandOffRequest,
    isLoading,
    error,
    clearError
  };
}
