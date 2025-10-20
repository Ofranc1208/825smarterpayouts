/**
 * RealtimeMessageManager - Handles all real-time message operations
 *
 * Separated from main RealtimeManager for better organization and debugging.
 * Uses the orchestra pattern for clean separation of concerns.
 */

import {
  ref,
  set,
  get,
  onValue,
  query,
  orderByChild,
  limitToLast,
  update
} from 'firebase/database';
import type { Database } from 'firebase/database';

// Lazy load Firebase to avoid SSR issues
let rtdb: Database | null = null;
const getRtdb = () => {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Realtime Database can only be used on the client side');
  }
  if (!rtdb) {
    const { rtdb: db } = require('../../../app/utils/firebase');
    rtdb = db;
  }
  return rtdb;
};

// Re-export types for consistency
export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderType: 'user' | 'specialist' | 'system';
  content: string;
  timestamp: number;
  type: 'text' | 'system' | 'file' | 'image';
  metadata?: {
    edited?: boolean;
    editedAt?: number;
    deliveryStatus?: 'sent' | 'delivered' | 'read';
  };
}

/**
 * RealtimeMessageManager - Specialized manager for real-time message operations
 */
export class RealtimeMessageManager {
  private db: any;

  constructor() {
    this.db = getRtdb();
  }

  /**
   * Send a message to a chat session
   */
  async sendMessage(sessionId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<string> {
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = Date.now();

    const fullMessage: ChatMessage = {
      id: messageId,
      timestamp: now,
      ...message
    };

    // Add message to session
    const messageRef = ref(this.db, `chat-sessions/${sessionId}/messages/${messageId}`);
    await set(messageRef, fullMessage);

    // Update session's last message timestamp
    const sessionRef = ref(this.db, `chat-sessions/${sessionId}`);
    await update(sessionRef, {
      lastMessageAt: now
    });

    console.log(`[RealtimeMessageManager] Sent message: ${messageId} in session: ${sessionId}`);
    return messageId;
  }

  /**
   * Listen for new messages in a session
   */
  onMessages(sessionId: string, callback: (messages: ChatMessage[]) => void): () => void {
    const messagesRef = ref(this.db, `chat-sessions/${sessionId}/messages`);
    const messagesQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(50));

    const unsubscribe = onValue(messagesQuery, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const messages = Object.values(messagesData) as ChatMessage[];
        messages.sort((a, b) => a.timestamp - b.timestamp);
        callback(messages);
      } else {
        callback([]);
      }
    });

    return unsubscribe;
  }

  /**
   * Get recent messages for a session
   */
  async getRecentMessages(sessionId: string, limit: number = 50): Promise<ChatMessage[]> {
    const messagesRef = ref(this.db, `chat-sessions/${sessionId}/messages`);
    const messagesQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(limit));

    const snapshot = await get(messagesQuery);
    if (snapshot.exists()) {
      const messagesData = snapshot.val();
      const messages = Object.values(messagesData) as ChatMessage[];
      return messages.sort((a, b) => a.timestamp - b.timestamp);
    }
    return [];
  }
}

// Export singleton instance
let realtimeMessageManagerInstance: RealtimeMessageManager | null = null;
export const realtimeMessageManager = (() => {
  if (typeof window === 'undefined') {
    return new Proxy({} as RealtimeMessageManager, {
      get() {
        throw new Error('RealtimeMessageManager can only be used on the client side');
      }
    });
  }
  if (!realtimeMessageManagerInstance) {
    realtimeMessageManagerInstance = new RealtimeMessageManager();
  }
  return realtimeMessageManagerInstance;
})();
