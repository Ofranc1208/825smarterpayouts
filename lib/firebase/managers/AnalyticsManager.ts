/**
 * AnalyticsManager - Handles all analytics and reporting operations
 *
 * Separated from main FirestoreManager for better organization and debugging.
 * Uses the orchestra pattern for clean separation of concerns.
 */

import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp
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
 * AnalyticsManager - Specialized manager for analytics operations
 */
export class AnalyticsManager {
  private db: any;

  constructor() {
    this.db = getDb();
  }

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
}

// Export singleton instance
let analyticsManagerInstance: AnalyticsManager | null = null;
export const analyticsManager = (() => {
  if (typeof window === 'undefined') {
    return new Proxy({} as AnalyticsManager, {
      get() {
        throw new Error('AnalyticsManager can only be used on the client side');
      }
    });
  }
  if (!analyticsManagerInstance) {
    analyticsManagerInstance = new AnalyticsManager();
  }
  return analyticsManagerInstance;
})();
