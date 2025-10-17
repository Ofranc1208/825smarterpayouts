// Assistant Storage Service - Handles localStorage operations
// =========================================================

import { AssistantMessage } from './types';

export class AssistantStorageService {
  private static getSessionId(): string {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('sessionId') || 'default';
    }
    return 'default';
  }

  private static getStorageKey(): string {
    const sessionId = this.getSessionId();
    return `assistant-messages-${sessionId}`;
  }

  /**
   * Save messages to localStorage
   */
  static saveMessages(messages: AssistantMessage[]): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return; // Skip if localStorage not available (SSR)
      }
      
      const key = this.getStorageKey();
      localStorage.setItem(key, JSON.stringify(messages));
      console.log('[AssistantStorage] Saved messages to localStorage:', key);
    } catch (error) {
      console.warn('[AssistantStorage] Failed to save messages:', error);
    }
  }

  /**
   * Load messages from localStorage
   */
  static loadMessages(): AssistantMessage[] {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return []; // Return empty array for SSR
      }
      
      const key = this.getStorageKey();
      const saved = localStorage.getItem(key);
      
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log('[AssistantStorage] Loaded messages from localStorage:', key);
          return parsed;
        }
      }
    } catch (error) {
      console.warn('[AssistantStorage] Failed to load messages:', error);
    }
    
    return [];
  }

  /**
   * Clear messages from localStorage
   */
  static clearMessages(): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }
      
      const key = this.getStorageKey();
      localStorage.removeItem(key);
      console.log('[AssistantStorage] Cleared messages from localStorage:', key);
    } catch (error) {
      console.warn('[AssistantStorage] Failed to clear messages:', error);
    }
  }

  /**
   * Get current session ID
   */
  static getCurrentSessionId(): string {
    return this.getSessionId();
  }
}
