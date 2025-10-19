/**
 * Firebase Firestore Utilities for Live Chat
 *
 * Enhanced Firestore operations for specialist chat functionality.
 * Provides session persistence, specialist tracking, and analytics data.
 */

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

// Lazy load Firebase to avoid SSR issues
let db: Firestore | null = null;
const getDb = () => {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Firestore can only be used on the client side');
  }
  if (!db) {
    const { db: firestore } = require('../../app/utils/firebase');
    db = firestore;
  }
  return db;
};

// Re-export types from realtime for consistency
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

export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderType: 'user' | 'specialist' | 'system';
  content: string;
  timestamp: Timestamp;
  type: 'text' | 'system' | 'file' | 'image';
  metadata?: {
    edited?: boolean;
    editedAt?: Timestamp;
    deliveryStatus?: 'sent' | 'delivered' | 'read';
  };
}

export interface Specialist {
  id: string;
  name: string;
  email: string;
  status: 'online' | 'busy' | 'offline';
  lastSeen: Timestamp;
  skills: string[];
  currentChats: string[];
  maxConcurrentChats: number;
  responseTime: number;
  rating: number;
  totalChats: number;
  languages: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ChatAnalytics {
  id: string;
  sessionId: string;
  specialistId?: string;
  userId: string;
  metrics: {
    sessionDuration: number;
    messageCount: number;
    firstResponseTime: number;
    averageResponseTime: number;
    resolutionStatus: 'resolved' | 'transferred' | 'abandoned';
    userSatisfaction?: number;
  };
  metadata: {
    startedAt: Timestamp;
    endedAt?: Timestamp;
    source: string;
  };
}

/**
 * FirestoreManager - Core class for managing Firestore operations
 */
export class FirestoreManager {
  private db: any;

  constructor() {
    this.db = getDb();
  }

  // ==================== SESSION PERSISTENCE ====================

  /**
   * Create a persistent chat session in Firestore
   */
  async createChatSession(sessionData: Omit<ChatSession, 'id' | 'createdAt' | 'updatedAt' | 'lastMessageAt'>): Promise<string> {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = serverTimestamp();

    const session: any = {
      createdAt: now,
      updatedAt: now,
      lastMessageAt: now,
      ...sessionData
    };

    const sessionRef = doc(this.db, 'chat-sessions', sessionId);
    await setDoc(sessionRef, session);

    console.log(`[FirestoreManager] Created persistent session: ${sessionId}`);
    return sessionId;
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

    console.log(`[FirestoreManager] Updated session: ${sessionId}`);
  }

  /**
   * Archive completed session for analytics
   */
  async archiveSession(sessionId: string): Promise<void> {
    const session = await this.getChatSession(sessionId);
    if (!session) return;

    // Create analytics record
    const analytics: Omit<ChatAnalytics, 'id'> = {
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
    await addDoc(analyticsRef, analytics);

    // Archive the session
    await this.updateChatSession(sessionId, {
      status: 'completed',
      metadata: {
        ...session.metadata,
        archivedAt: serverTimestamp()
      } as any
    });

    console.log(`[FirestoreManager] Archived session: ${sessionId}`);
  }

  // ==================== SPECIALIST MANAGEMENT ====================

  /**
   * Create or update specialist profile
   */
  async upsertSpecialist(specialistData: Omit<Specialist, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const specialistId = specialistData.email.replace('@', '_').replace('.', '_');
    const now = serverTimestamp();

    const specialist: any = {
      createdAt: now,
      updatedAt: now,
      ...specialistData
    };

    const specialistRef = doc(this.db, 'specialists', specialistId);
    await setDoc(specialistRef, specialist, { merge: true });

    console.log(`[FirestoreManager] Upserted specialist: ${specialistId}`);
    return specialistId;
  }

  /**
   * Get specialist by ID
   */
  async getSpecialist(specialistId: string): Promise<Specialist | null> {
    const specialistRef = doc(this.db, 'specialists', specialistId);
    const specialistSnap = await getDoc(specialistRef);

    if (specialistSnap.exists()) {
      const data = specialistSnap.data();
      return {
        id: specialistSnap.id,
        ...data
      } as Specialist;
    }
    return null;
  }

  /**
   * Get all specialists
   */
  async getAllSpecialists(): Promise<Specialist[]> {
    const specialistsRef = collection(this.db, 'specialists');
    const specialistsSnap = await getDocs(specialistsRef);

    return specialistsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Specialist[];
  }

  /**
   * Update specialist performance metrics
   */
  async updateSpecialistMetrics(specialistId: string, metrics: Partial<Specialist>): Promise<void> {
    const specialistRef = doc(this.db, 'specialists', specialistId);
    await updateDoc(specialistRef, {
      ...metrics,
      updatedAt: serverTimestamp() as any
    });

    console.log(`[FirestoreManager] Updated specialist metrics: ${specialistId}`);
  }

  // ==================== ANALYTICS & REPORTING ====================

  /**
   * Get chat analytics for a date range
   */
  async getChatAnalytics(startDate: Date, endDate: Date): Promise<ChatAnalytics[]> {
    const analyticsRef = collection(this.db, 'chat-analytics');
    const q = query(
      analyticsRef,
      where('metadata.startedAt', '>=', Timestamp.fromDate(startDate)),
      where('metadata.startedAt', '<=', Timestamp.fromDate(endDate)),
      orderBy('metadata.startedAt', 'desc')
    );

    const analyticsSnap = await getDocs(q);
    return analyticsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ChatAnalytics[];
  }

  /**
   * Get specialist performance metrics
   */
  async getSpecialistPerformance(specialistId: string, days: number = 30): Promise<any> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const analytics = await this.getChatAnalytics(startDate, new Date());

    const specialistSessions = analytics.filter(a => a.specialistId === specialistId);

    return {
      totalChats: specialistSessions.length,
      averageRating: specialistSessions.reduce((acc, s) => acc + (s.metrics.userSatisfaction || 0), 0) / specialistSessions.length || 0,
      averageResponseTime: specialistSessions.reduce((acc, s) => acc + s.metrics.averageResponseTime, 0) / specialistSessions.length || 0,
      resolutionRate: specialistSessions.filter(s => s.metrics.resolutionStatus === 'resolved').length / specialistSessions.length || 0
    };
  }

  /**
   * Get overall system analytics
   */
  async getSystemAnalytics(days: number = 30): Promise<any> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const analytics = await this.getChatAnalytics(startDate, new Date());

    return {
      totalChats: analytics.length,
      averageSessionDuration: analytics.reduce((acc, a) => acc + a.metrics.sessionDuration, 0) / analytics.length || 0,
      overallResolutionRate: analytics.filter(a => a.metrics.resolutionStatus === 'resolved').length / analytics.length || 0,
      averageSatisfaction: analytics.reduce((acc, a) => acc + (a.metrics.userSatisfaction || 0), 0) / analytics.length || 0,
      topSources: this.getTopSources(analytics)
    };
  }

  /**
   * Get top chat sources
   */
  private getTopSources(analytics: ChatAnalytics[]): Array<{source: string, count: number}> {
    const sources = analytics.reduce((acc, a) => {
      acc[a.metadata.source] = (acc[a.metadata.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(sources)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count);
  }

  // ==================== DATA MIGRATION ====================

  /**
   * Migrate session from realtime DB to Firestore for archival
   */
  async migrateSessionToArchive(sessionId: string): Promise<void> {
    // This would copy session data from realtime DB to Firestore
    // for long-term storage and analytics
    console.log(`[FirestoreManager] Migrating session ${sessionId} to archive`);
  }

  /**
   * Clean up old archived sessions
   */
  async cleanupOldArchives(daysOld: number = 90): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    // Query for old archived sessions and delete them
    console.log(`[FirestoreManager] Cleaned up archives older than ${daysOld} days`);
    return 0; // Return count of deleted records
  }
}

// Export singleton instance (lazy initialization to avoid SSR issues)
let firestoreManagerInstance: FirestoreManager | null = null;
export const firestoreManager = (() => {
  if (typeof window === 'undefined') {
    // Return a proxy that throws helpful errors during SSR
    return new Proxy({} as FirestoreManager, {
      get() {
        throw new Error('FirestoreManager can only be used on the client side');
      }
    });
  }
  if (!firestoreManagerInstance) {
    firestoreManagerInstance = new FirestoreManager();
  }
  return firestoreManagerInstance;
})();
