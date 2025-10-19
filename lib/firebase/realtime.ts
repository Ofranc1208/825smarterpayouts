/**
 * Firebase Realtime Database Utilities for Live Chat
 *
 * Provides real-time messaging capabilities for specialist chat functionality.
 * Handles message synchronization, session management, and specialist tracking.
 */

import {
  ref,
  push,
  set,
  get,
  onValue,
  off,
  query,
  orderByChild,
  limitToLast,
  update
} from 'firebase/database';
import type { DatabaseReference, Database } from 'firebase/database';

// Lazy load Firebase to avoid SSR issues
let rtdb: Database | null = null;
const getRtdb = () => {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Realtime Database can only be used on the client side');
  }
  if (!rtdb) {
    const { rtdb: db } = require('../../app/utils/firebase');
    rtdb = db;
  }
  return rtdb;
};

// Types for live chat functionality
export interface ChatSession {
  id: string;
  userId: string;
  specialistId?: string;
  status: 'waiting' | 'active' | 'completed' | 'transferred';
  createdAt: number;
  updatedAt: number;
  lastMessageAt: number;
  userInfo: {
    name?: string;
    email?: string;
    phone?: string;
    initialIntent: string;
  };
  context: {
    botTranscript: any[];
    settlementInfo?: any;
    priority: 'low' | 'medium' | 'high';
  };
  metadata: {
    source: 'specialist_button' | 'direct_url';
    userAgent: string;
    ipAddress?: string;
  };
}

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

export interface Specialist {
  id: string;
  name: string;
  email: string;
  status: 'online' | 'busy' | 'offline';
  lastSeen: number;
  skills: string[];
  currentChats: string[];
  maxConcurrentChats: number;
  responseTime: number;
  rating: number;
  totalChats: number;
  languages: string[];
}

export interface ChatQueue {
  waitingUsers: string[];
  availableSpecialists: string[];
  averageWaitTime: number;
  queueLength: number;
}

/**
 * RealtimeManager - Core class for managing real-time database operations
 */
export class RealtimeManager {
  private db: any;

  constructor() {
    this.db = getRtdb();
  }

  // ==================== SESSION MANAGEMENT ====================

  /**
   * Create a new chat session
   */
  async createChatSession(sessionData: Omit<ChatSession, 'id' | 'createdAt' | 'updatedAt' | 'lastMessageAt'>): Promise<string> {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = Date.now();

    const session: ChatSession = {
      ...sessionData,
      id: sessionId,
      createdAt: now,
      updatedAt: now,
      lastMessageAt: now
    };

    const sessionRef = ref(this.db, `chat-sessions/${sessionId}`);
    await set(sessionRef, session);

    console.log(`[RealtimeManager] Created chat session: ${sessionId}`);
    return sessionId;
  }

  /**
   * Get a chat session by ID
   */
  async getChatSession(sessionId: string): Promise<ChatSession | null> {
    const sessionRef = ref(this.db, `chat-sessions/${sessionId}`);
    const snapshot = await get(sessionRef);

    if (snapshot.exists()) {
      return snapshot.val() as ChatSession;
    }
    return null;
  }

  /**
   * Update chat session
   */
  async updateChatSession(sessionId: string, updates: Partial<ChatSession>): Promise<void> {
    const sessionRef = ref(this.db, `chat-sessions/${sessionId}`);
    const updatesWithTimestamp = {
      ...updates,
      updatedAt: Date.now()
    };

    await update(sessionRef, updatesWithTimestamp);
    console.log(`[RealtimeManager] Updated chat session: ${sessionId}`);
  }

  /**
   * Close chat session
   */
  async closeChatSession(sessionId: string, reason: string): Promise<void> {
    await this.updateChatSession(sessionId, {
      status: 'completed',
      metadata: { closedReason: reason, closedAt: Date.now() } as any
    });
  }

  // ==================== MESSAGE MANAGEMENT ====================

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
    await this.updateChatSession(sessionId, {
      lastMessageAt: now
    });

    console.log(`[RealtimeManager] Sent message: ${messageId} in session: ${sessionId}`);
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

  // ==================== SPECIALIST MANAGEMENT ====================

  /**
   * Update specialist status
   */
  async updateSpecialistStatus(specialistId: string, status: Specialist['status']): Promise<void> {
    const specialistRef = ref(this.db, `specialists/${specialistId}`);
    await update(specialistRef, {
      status,
      lastSeen: Date.now()
    });

    console.log(`[RealtimeManager] Updated specialist ${specialistId} status to ${status}`);
  }

  /**
   * Get available specialists
   */
  async getAvailableSpecialists(): Promise<Specialist[]> {
    const specialistsRef = ref(this.db, 'specialists');
    const snapshot = await get(specialistsRef);

    if (snapshot.exists()) {
      const specialistsData = snapshot.val();
      const specialists = Object.values(specialistsData) as Specialist[];
      return specialists.filter(s => s.status === 'online' && s.currentChats.length < s.maxConcurrentChats);
    }
    return [];
  }

  /**
   * Assign specialist to chat session
   */
  async assignSpecialist(sessionId: string, specialistId: string): Promise<void> {
    // Update session
    await this.updateChatSession(sessionId, {
      specialistId,
      status: 'active'
    });

    // Update specialist's current chats
    const specialistRef = ref(this.db, `specialists/${specialistId}`);
    const specialistSnapshot = await get(specialistRef);

    if (specialistSnapshot.exists()) {
      const specialist = specialistSnapshot.val() as Specialist;
      const updatedChats = [...specialist.currentChats, sessionId];

      await update(specialistRef, {
        currentChats: updatedChats,
        status: updatedChats.length >= specialist.maxConcurrentChats ? 'busy' : 'online'
      });
    }

    console.log(`[RealtimeManager] Assigned specialist ${specialistId} to session ${sessionId}`);
  }

  /**
   * Remove specialist from chat session
   */
  async removeSpecialistFromSession(sessionId: string, specialistId: string): Promise<void> {
    // Update session
    await this.updateChatSession(sessionId, {
      specialistId: undefined,
      status: 'waiting'
    });

    // Update specialist's current chats
    const specialistRef = ref(this.db, `specialists/${specialistId}`);
    const specialistSnapshot = await get(specialistRef);

    if (specialistSnapshot.exists()) {
      const specialist = specialistSnapshot.val() as Specialist;
      const updatedChats = specialist.currentChats.filter(chatId => chatId !== sessionId);

      await update(specialistRef, {
        currentChats: updatedChats,
        status: updatedChats.length === 0 ? 'online' : 'online'
      });
    }

    console.log(`[RealtimeManager] Removed specialist ${specialistId} from session ${sessionId}`);
  }

  // ==================== QUEUE MANAGEMENT ====================

  /**
   * Add user to chat queue
   */
  async addToQueue(sessionId: string): Promise<void> {
    const queueRef = ref(this.db, 'chat-queue/waitingUsers');
    await push(queueRef, sessionId);

    // Update queue metadata
    const queueLength = await this.getQueueLength();
    await update(ref(this.db, 'chat-queue'), {
      queueLength: queueLength + 1,
      averageWaitTime: await this.calculateAverageWaitTime()
    });

    console.log(`[RealtimeManager] Added session ${sessionId} to queue`);
  }

  /**
   * Remove user from chat queue
   */
  async removeFromQueue(sessionId: string): Promise<void> {
    const queueRef = ref(this.db, 'chat-queue/waitingUsers');
    const snapshot = await get(queueRef);

    if (snapshot.exists()) {
      const waitingUsers = snapshot.val();
      const updatedUsers = Object.keys(waitingUsers).filter(key => waitingUsers[key] !== sessionId);

      await set(queueRef, updatedUsers.reduce((acc, key, index) => {
        acc[index] = updatedUsers[index];
        return acc;
      }, {} as any));

      // Update queue metadata
      const queueLength = await this.getQueueLength();
      await update(ref(this.db, 'chat-queue'), {
        queueLength: Math.max(0, queueLength - 1),
        averageWaitTime: await this.calculateAverageWaitTime()
      });
    }

    console.log(`[RealtimeManager] Removed session ${sessionId} from queue`);
  }

  /**
   * Get current queue length
   */
  async getQueueLength(): Promise<number> {
    const queueRef = ref(this.db, 'chat-queue/waitingUsers');
    const snapshot = await get(queueRef);

    if (snapshot.exists()) {
      const waitingUsers = snapshot.val();
      return Array.isArray(waitingUsers) ? waitingUsers.length : Object.keys(waitingUsers).length;
    }
    return 0;
  }

  /**
   * Calculate average wait time
   */
  async calculateAverageWaitTime(): Promise<number> {
    // This would be calculated based on historical data
    // For now, return a placeholder
    return 45; // 45 seconds average wait time
  }

  // ==================== REAL-TIME LISTENERS ====================

  /**
   * Listen for session updates
   */
  onSessionUpdate(sessionId: string, callback: (session: ChatSession) => void): () => void {
    const sessionRef = ref(this.db, `chat-sessions/${sessionId}`);

    const unsubscribe = onValue(sessionRef, (snapshot) => {
      if (snapshot.exists()) {
        const session = snapshot.val() as ChatSession;
        callback(session);
      }
    });

    return unsubscribe;
  }

  /**
   * Listen for specialist status changes
   */
  onSpecialistStatusChange(specialistId: string, callback: (specialist: Specialist) => void): () => void {
    const specialistRef = ref(this.db, `specialists/${specialistId}`);

    const unsubscribe = onValue(specialistRef, (snapshot) => {
      if (snapshot.exists()) {
        const specialist = snapshot.val() as Specialist;
        callback(specialist);
      }
    });

    return unsubscribe;
  }

  /**
   * Listen for queue updates
   */
  onQueueUpdate(callback: (queue: ChatQueue) => void): () => void {
    const queueRef = ref(this.db, 'chat-queue');

    const unsubscribe = onValue(queueRef, (snapshot) => {
      if (snapshot.exists()) {
        const queue = snapshot.val() as ChatQueue;
        callback(queue);
      }
    });

    return unsubscribe;
  }
}

// Export singleton instance (lazy initialization to avoid SSR issues)
let realtimeManagerInstance: RealtimeManager | null = null;
export const realtimeManager = (() => {
  if (typeof window === 'undefined') {
    // Return a proxy that throws helpful errors during SSR
    return new Proxy({} as RealtimeManager, {
      get() {
        throw new Error('RealtimeManager can only be used on the client side');
      }
    });
  }
  if (!realtimeManagerInstance) {
    realtimeManagerInstance = new RealtimeManager();
  }
  return realtimeManagerInstance;
})();
