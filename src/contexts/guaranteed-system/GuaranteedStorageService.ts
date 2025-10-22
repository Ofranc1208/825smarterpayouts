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
      const storageKey = this.getStorageKey(sessionId);
      const serializedMessages = messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp instanceof Date ? msg.timestamp.toISOString() : msg.timestamp
      }));
      
      localStorage.setItem(storageKey, JSON.stringify(serializedMessages));
      console.log('[GuaranteedStorageService] 💾 Saved messages:', messages.length, 'to key:', storageKey);
    } catch (error) {
      console.error('[GuaranteedStorageService] ❌ Error saving messages:', error);
    }
  }

  /**
   * Load messages from localStorage
   */
  static loadMessages(sessionId: string): GuaranteedAssistantMessage[] {
    try {
      const storageKey = this.getStorageKey(sessionId);
      const stored = localStorage.getItem(storageKey);
      
      if (!stored) {
        console.log('[GuaranteedStorageService] 📭 No stored messages found for key:', storageKey);
        return [];
      }

      const parsed = JSON.parse(stored);
      const messages = parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));

      console.log('[GuaranteedStorageService] 📬 Loaded messages:', messages.length, 'from key:', storageKey);
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
      const storageKey = this.getStorageKey(sessionId);
      localStorage.removeItem(storageKey);
      console.log('[GuaranteedStorageService] 🗑️ Cleared messages for key:', storageKey);
    } catch (error) {
      console.error('[GuaranteedStorageService] ❌ Error clearing messages:', error);
    }
  }

  /**
   * Check if there are stored messages for a session
   */
  static hasStoredMessages(sessionId: string): boolean {
    try {
      const storageKey = this.getStorageKey(sessionId);
      return localStorage.getItem(storageKey) !== null;
    } catch (error) {
      console.error('[GuaranteedStorageService] ❌ Error checking stored messages:', error);
      return false;
    }
  }
}

