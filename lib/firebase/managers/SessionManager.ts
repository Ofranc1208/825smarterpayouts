/**
 * SessionManager - Handles all chat session operations
 *
 * Separated from main FirestoreManager for better organization and debugging.
 * Uses the orchestra pattern for clean separation of concerns.
 */

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
  serverTimestamp,
  addDoc
} from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

// Lazy load Firebase to avoid SSR issues
let db: Firestore | null = null;
const getDb = () => {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Firestore can only be used on the client side');
  }
  if (!db) {
    const { db: firestore } = require('../../../app/utils/firebase');
    db = firestore;
  }
  return db;
};

// Re-export types for consistency
export interface ChatSession {
  id: string;
  userId: string;
  specialistId?: string;
  status: 'waiting' | 'active' | 'completed' | 'transferred';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastMessageAt: Timestamp;
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
    closedReason?: string;
    closedAt?: Timestamp;
  };
}

/**
 * SessionManager - Specialized manager for chat session operations
 */
export class SessionManager {
  private db: any;

  constructor() {
    this.db = getDb();
  }

  /**
   * Create a persistent chat session in Firestore
   * Uses Firestore auto-generated ID as the single source of truth
   */
  async createChatSession(sessionData: Omit<ChatSession, 'id' | 'createdAt' | 'updatedAt' | 'lastMessageAt'>): Promise<string> {
    try {
      const now = serverTimestamp();

      console.log('[SessionManager] 📝 Creating session with Firestore auto-ID...');
      console.log('[SessionManager] 📝 Session data:', sessionData);

      const session: any = {
        createdAt: now,
        updatedAt: now,
        lastMessageAt: now,
        ...sessionData
      };

      // Use Firestore's auto-generated ID
      const sessionsRef = collection(this.db, 'chat-sessions');
      const docRef = await addDoc(sessionsRef, session);
      const sessionId = docRef.id;

      console.log(`[SessionManager] ✅ Created persistent session with Firestore ID: ${sessionId}`);
      return sessionId;
    } catch (error) {
      console.error('[SessionManager] ❌ Error creating session:', error);
      console.error('[SessionManager] ❌ Error details:', error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  /**
   * Get a chat session from Firestore
   */
  async getChatSession(sessionId: string): Promise<ChatSession | null> {
    const sessionRef = doc(this.db, 'chat-sessions', sessionId);
    const sessionSnap = await getDoc(sessionRef);

    if (sessionSnap.exists()) {
      const data = sessionSnap.data();
      return {
        id: sessionSnap.id,
        ...data
      } as ChatSession;
    }
    return null;
  }

  /**
   * Update chat session in Firestore
   */
  async updateChatSession(sessionId: string, updates: Partial<ChatSession>): Promise<void> {
    const sessionRef = doc(this.db, 'chat-sessions', sessionId);
    await updateDoc(sessionRef, {
      ...updates,
      updatedAt: serverTimestamp() as any
    });

    console.log(`[SessionManager] Updated session: ${sessionId}`);
  }

  /**
   * Upsert a chat session document by ID (create if missing, merge if exists)
   * Useful when a session originates in Realtime DB and must be reflected in Firestore
   */
  async upsertChatSession(sessionId: string, sessionData: Partial<ChatSession>): Promise<void> {
    const sessionRef = doc(this.db, 'chat-sessions', sessionId);
    const payload: any = {
      // Ensure timestamps exist; createdAt preserved if provided
      createdAt: (sessionData as any)?.createdAt || (serverTimestamp() as any),
      updatedAt: serverTimestamp() as any,
      lastMessageAt: (sessionData as any)?.lastMessageAt || (serverTimestamp() as any),
      // Merge the rest of the provided fields
      ...sessionData
    };

    await setDoc(sessionRef, payload, { merge: true });
    console.log(`[SessionManager] Upserted session: ${sessionId}`);
  }

  /**
   * Archive completed session for analytics
   */
  async archiveSession(sessionId: string): Promise<void> {
    const session = await this.getChatSession(sessionId);
    if (!session) return;

    // Create analytics record
    const analytics: Omit<any, 'id'> = {
      sessionId,
      specialistId: session.specialistId,
      userId: session.userId,
      metrics: {
        sessionDuration: 0, // Will be calculated from timestamps
        messageCount: 0, // Will be calculated from message count
        firstResponseTime: 0,
        averageResponseTime: 0,
        resolutionStatus: 'resolved'
      },
      metadata: {
        startedAt: session.createdAt,
        endedAt: serverTimestamp() as any,
        source: session.metadata.source
      }
    };

    // Add to analytics collection
    const analyticsRef = collection(this.db, 'chat-analytics');
    await import('firebase/firestore').then(({ addDoc }) => addDoc(analyticsRef, analytics));

    // Archive the session
    await this.updateChatSession(sessionId, {
      status: 'completed',
      metadata: {
        ...session.metadata,
        archivedAt: serverTimestamp()
      } as any
    });

    console.log(`[SessionManager] Archived session: ${sessionId}`);
  }
}

// Export singleton instance
let sessionManagerInstance: SessionManager | null = null;
export const sessionManager = (() => {
  if (typeof window === 'undefined') {
    return new Proxy({} as SessionManager, {
      get() {
        throw new Error('SessionManager can only be used on the client side');
      }
    });
  }
  if (!sessionManagerInstance) {
    sessionManagerInstance = new SessionManager();
  }
  return sessionManagerInstance;
})();
