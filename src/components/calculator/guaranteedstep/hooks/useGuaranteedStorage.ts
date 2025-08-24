"use client";

import { useState, useEffect, useCallback } from 'react';
import { GuaranteedMessage } from '../types/guaranteed.types';

// Generate unique ID for messages
const generateUniqueId = (): string => {
  return `guaranteed_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Completely isolated storage hook for Guaranteed Payment Calculator
 * Uses localStorage with guaranteed-specific namespacing
 * 
 * 2025 Best Practices Applied:
 * - Isolated namespace: "guaranteed_assistant_"
 * - Session-based storage keys
 * - Type-safe message handling
 * - Automatic persistence
 * - Memory-efficient loading
 */
export const useGuaranteedStorage = (sessionId: string = 'default') => {
  const [messages, setMessages] = useState<GuaranteedMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Storage key with guaranteed-specific namespace
  const getStorageKey = useCallback((): string => {
    return `guaranteed_assistant_${sessionId}`;
  }, [sessionId]);

  // Load messages from localStorage
  const loadMessages = useCallback((): GuaranteedMessage[] => {
    try {
      if (typeof window === 'undefined') {
        return [];
      }

      const storageKey = getStorageKey();
      const stored = localStorage.getItem(storageKey);
      
      console.log(`[useGuaranteedStorage] Loading messages for sessionId: ${sessionId}, key: ${storageKey}`);
      
      if (!stored) {
        console.log('[useGuaranteedStorage] No stored messages found');
        return [];
      }

      const parsed = JSON.parse(stored);
      const messages = Array.isArray(parsed) ? parsed : [];
      
      // Convert timestamp strings back to Date objects
      const messagesWithDates = messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));

      console.log(`[useGuaranteedStorage] Loaded ${messagesWithDates.length} messages`);
      return messagesWithDates;
    } catch (error) {
      console.error('[useGuaranteedStorage] Error loading messages:', error);
      return [];
    }
  }, [getStorageKey, sessionId]);

  // Save messages to localStorage
  const saveMessages = useCallback((messagesToSave: GuaranteedMessage[]): void => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(messagesToSave));
      
      console.log(`[useGuaranteedStorage] Saved ${messagesToSave.length} messages to ${storageKey}`);
    } catch (error) {
      console.error('[useGuaranteedStorage] Error saving messages:', error);
    }
  }, [getStorageKey]);

  // Add a new message
  const addMessage = useCallback((
    text: string, 
    type: GuaranteedMessage['type'] = 'text',
    sender: GuaranteedMessage['sender'] = 'user',
    metadata?: GuaranteedMessage['metadata']
  ): void => {
    const newMessage: GuaranteedMessage = {
      id: generateUniqueId(),
      type,
      text,
      sender,
      timestamp: new Date(),
      metadata
    };

    console.log('[useGuaranteedStorage] Adding message:', newMessage);

    setMessages(prev => {
      const updated = [...prev, newMessage];
      saveMessages(updated);
      return updated;
    });
  }, [saveMessages]);

  // Clear all messages
  const clearMessages = useCallback((): void => {
    console.log('[useGuaranteedStorage] Clearing all messages');
    setMessages([]);
    
    try {
      if (typeof window !== 'undefined') {
        const storageKey = getStorageKey();
        localStorage.removeItem(storageKey);
        console.log(`[useGuaranteedStorage] Cleared storage: ${storageKey}`);
      }
    } catch (error) {
      console.error('[useGuaranteedStorage] Error clearing storage:', error);
    }
  }, [getStorageKey]);

  // Initialize: Load messages on mount
  useEffect(() => {
    console.log(`[useGuaranteedStorage] Initializing for sessionId: ${sessionId}`);
    
    const loadedMessages = loadMessages();
    setMessages(loadedMessages);
    setIsLoading(false);
    
    console.log(`[useGuaranteedStorage] Initialization complete. Loaded ${loadedMessages.length} messages`);
  }, [loadMessages, sessionId]);

  // Auto-save when messages change (after initial load)
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      saveMessages(messages);
    }
  }, [messages, saveMessages, isLoading]);

  return {
    messages,
    isLoading,
    addMessage,
    clearMessages,
    sessionId,
    storageKey: getStorageKey()
  };
};

export default useGuaranteedStorage;
