/**
 * RealtimeSessionManager - Handles all real-time session operations
 *
 * Separated from main RealtimeManager for better organization and debugging.
 * Uses the orchestra pattern for clean separation of concerns.
 */

import {
  ref,
  set,
  get,
  update,
  onValue
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

/**
 * RealtimeSessionManager - Specialized manager for real-time session operations
 */
export class RealtimeSessionManager {
  private db: any;

  constructor() {
    this.db = getRtdb();
  }

  /**
   * Create a new chat session
   */
  async createChatSession(sessionData: Omit<ChatSession, 'createdAt' | 'updatedAt' | 'lastMessageAt'> & { id?: string }): Promise<string> {
    // Use provided ID or generate a new one
    const sessionId = sessionData.id || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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

    console.log(`[RealtimeSessionManager] Created chat session: ${sessionId}`);
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
    console.log(`[RealtimeSessionManager] Updated chat session: ${sessionId}`);
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
   * Listen for all sessions updates (for specialist dashboard)
   */
  onSessionsUpdate(callback: (sessions: Record<string, ChatSession>) => void): () => void {
    const sessionsRef = ref(this.db, 'chat-sessions');

    const unsubscribe = onValue(sessionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const sessions = snapshot.val() as Record<string, ChatSession>;
        callback(sessions);
      } else {
        callback({});
      }
    });

    return unsubscribe;
  }
}

// Export singleton instance
let realtimeSessionManagerInstance: RealtimeSessionManager | null = null;
export const realtimeSessionManager = (() => {
  if (typeof window === 'undefined') {
    return new Proxy({} as RealtimeSessionManager, {
      get() {
        throw new Error('RealtimeSessionManager can only be used on the client side');
      }
    });
  }
  if (!realtimeSessionManagerInstance) {
    realtimeSessionManagerInstance = new RealtimeSessionManager();
  }
  return realtimeSessionManagerInstance;
})();
