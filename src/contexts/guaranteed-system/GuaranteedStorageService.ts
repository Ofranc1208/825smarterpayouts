/**
 * 🗄️ GUARANTEED STORAGE SERVICE
 * 
 * Handles all storage operations for the Guaranteed Assistant.
 * Provides isolated storage for guaranteed calculator sessions.
 */

import { GuaranteedAssistantMessage } from './types';

export class GuaranteedStorageService {
  private static readonly STORAGE_PREFIX = 'guaranteed_assistant_';

  /**
   * Generate storage key for a session
   */
  static getStorageKey(sessionId: string): string {
    return `${this.STORAGE_PREFIX}${sessionId}`;
  }

  /**
   * Save messages to localStorage
   */
  static saveMessages(sessionId: string, messages: GuaranteedAssistantMessage[]): void {
    try {
      // Check if we're in the browser (client-side)
      if (typeof window === 'undefined') return;
      
      const storageKey = this.getStorageKey(sessionId);
      const serializedMessages = messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp instanceof Date ? msg.timestamp.toISOString() : msg.timestamp
      }));
      
      localStorage.setItem(storageKey, JSON.stringify(serializedMessages));
    } catch (error) {
      console.error('[GuaranteedStorageService] ❌ Error saving messages:', error);
    }
  }

  /**
   * Load messages from localStorage
   */
  static loadMessages(sessionId: string): GuaranteedAssistantMessage[] {
    try {
      // Check if we're in the browser (client-side)
      if (typeof window === 'undefined') return [];
      
      const storageKey = this.getStorageKey(sessionId);
      const stored = localStorage.getItem(storageKey);
      
      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);
      const messages = parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));

      return messages;
    } catch (error) {
      console.error('[GuaranteedStorageService] ❌ Error loading messages:', error);
      return [];
    }
  }

  /**
   * Clear messages for a session
   */
  static clearMessages(sessionId: string): void {
    try {
      // Check if we're in the browser (client-side)
      if (typeof window === 'undefined') return;
      
      const storageKey = this.getStorageKey(sessionId);
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('[GuaranteedStorageService] ❌ Error clearing messages:', error);
    }
  }

  /**
   * Check if there are stored messages for a session
   */
  static hasStoredMessages(sessionId: string): boolean {
    try {
      // Check if we're in the browser (client-side)
      if (typeof window === 'undefined') return false;
      
      const storageKey = this.getStorageKey(sessionId);
      return localStorage.getItem(storageKey) !== null;
    } catch (error) {
      console.error('[GuaranteedStorageService] ❌ Error checking stored messages:', error);
      return false;
    }
  }
}

