/**
 * MessagePersistenceManager - Handles localStorage operations for chat messages
 * 
 * Separated from AppProviders for better organization and testability.
 * Uses the orchestra pattern for clean separation of concerns.
 */

import { Message } from '../../../hooks/useConversationalForm';

export class MessagePersistenceManager {
  private static instance: MessagePersistenceManager | null = null;

  // Singleton pattern for consistent message persistence
  static getInstance(): MessagePersistenceManager {
    if (!MessagePersistenceManager.instance) {
      MessagePersistenceManager.instance = new MessagePersistenceManager();
    }
    return MessagePersistenceManager.instance;
  }

  /**
   * Generate storage key for a session
   */
  private getStorageKey(sessionId: string): string {
    return `chat-session-${sessionId}`;
  }

  /**
   * Load messages from localStorage for a given session
   */
  loadMessages(sessionId: string): Message[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const storageKey = this.getStorageKey(sessionId);
      const savedMessages = localStorage.getItem(storageKey);
      
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        return parsedMessages;
      }
    } catch (error) {
      console.error('[MessagePersistenceManager] Failed to load messages:', error);
    }
    
    return [];
  }

  /**
   * Save messages to localStorage for a given session
   */
  saveMessages(sessionId: string, messages: Message[]): void {
    if (typeof window === 'undefined' || !sessionId || messages.length === 0) return;
    
    try {
      // Filter out only legacy JSX components that can't be serialized
      const serializableMessages = messages.map(msg => {
        if (msg.type === 'component' && msg.component && !msg.componentType) {
          // Legacy JSX component - skip it
          return null;
        }
        if (msg.type === 'component' && msg.componentType) {
          // New serializable component - save without the JSX component prop
          return {
            id: msg.id,
            type: msg.type,
            componentType: msg.componentType,
            componentData: msg.componentData
          };
        }
        // Text message - save as-is
        return msg;
      }).filter(Boolean); // Remove null entries
      
      const storageKey = this.getStorageKey(sessionId);
      localStorage.setItem(storageKey, JSON.stringify(serializableMessages));
    } catch (error) {
      console.error('[MessagePersistenceManager] Failed to save messages:', error);
    }
  }

  /**
   * Clear messages for a given session
   */
  clearMessages(sessionId: string): void {
    if (typeof window === 'undefined' || !sessionId) return;
    
    try {
      const storageKey = this.getStorageKey(sessionId);
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('[MessagePersistenceManager] Failed to clear messages:', error);
    }
  }

  /**
   * Get all stored session keys (for cleanup/debugging)
   */
  getAllSessionKeys(): string[] {
    if (typeof window === 'undefined') return [];
    
    const sessionKeys: string[] = [];
    
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('chat-session-')) {
          sessionKeys.push(key);
        }
      }
    } catch (error) {
      console.error('[MessagePersistenceManager] Failed to get session keys:', error);
    }
    
    return sessionKeys;
  }
}

// Export singleton instance
export const messagePersistenceManager = MessagePersistenceManager.getInstance();
