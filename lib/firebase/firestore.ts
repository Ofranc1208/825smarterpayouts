/**
 * Firebase Firestore Utilities for Live Chat - Orchestra Pattern
 *
 * Refactored using orchestra pattern for better organization and debugging.
 * The main FirestoreManager now orchestrates specialized managers for different concerns.
 */

// Re-export types for consistency and import managers
import { sessionManager, type ChatSession } from './managers/SessionManager';
import { specialistManager, type Specialist } from './managers/SpecialistManager';
import { analyticsManager, type ChatAnalytics } from './managers/AnalyticsManager';
import { migrationManager } from './managers/MigrationManager';

// Re-export types for consistency
export type { ChatSession, Specialist, ChatAnalytics };

// Re-export message type from realtime for consistency
export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderType: 'user' | 'specialist' | 'system';
  content: string;
  timestamp: any; // Timestamp from firestore
  type: 'text' | 'system' | 'file' | 'image';
  metadata?: {
    edited?: boolean;
    editedAt?: any; // Timestamp
    deliveryStatus?: 'sent' | 'delivered' | 'read';
  };
}

/**
 * FirestoreManager - Core orchestrator for Firestore operations
 *
 * Now uses orchestra pattern to delegate to specialized managers:
 * - SessionManager: Chat session operations
 * - SpecialistManager: Specialist operations
 * - AnalyticsManager: Analytics and reporting
 * - MigrationManager: Data migration tasks
 */
export class FirestoreManager {
  // ==================== SESSION PERSISTENCE ====================

  /**
   * Create a persistent chat session in Firestore
   */
  async createChatSession(sessionData: Omit<ChatSession, 'id' | 'createdAt' | 'updatedAt' | 'lastMessageAt'>): Promise<string> {
    return sessionManager.createChatSession(sessionData);
  }

  /**
   * Get a chat session from Firestore
   */
  async getChatSession(sessionId: string): Promise<ChatSession | null> {
    return sessionManager.getChatSession(sessionId);
  }

  /**
   * Update chat session in Firestore
   */
  async updateChatSession(sessionId: string, updates: Partial<ChatSession>): Promise<void> {
    return sessionManager.updateChatSession(sessionId, updates);
  }

  /**
   * Upsert a chat session document by ID (create if missing, merge if exists)
   */
  async upsertChatSession(sessionId: string, sessionData: Partial<ChatSession>): Promise<void> {
    return sessionManager.upsertChatSession(sessionId, sessionData);
  }

  /**
   * Archive completed session for analytics
   */
  async archiveSession(sessionId: string): Promise<void> {
    return sessionManager.archiveSession(sessionId);
  }

  // ==================== SPECIALIST MANAGEMENT ====================

  /**
   * Create or update specialist profile
   */
  async upsertSpecialist(specialistData: Omit<Specialist, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return specialistManager.upsertSpecialist(specialistData);
  }

  /**
   * Get specialist by ID
   */
  async getSpecialist(specialistId: string): Promise<Specialist | null> {
    return specialistManager.getSpecialist(specialistId);
  }

  /**
   * Get all specialists
   */
  async getAllSpecialists(): Promise<Specialist[]> {
    return specialistManager.getAllSpecialists();
  }

  /**
   * Update specialist performance metrics
   */
  async updateSpecialistMetrics(specialistId: string, metrics: Partial<Specialist>): Promise<void> {
    return specialistManager.updateSpecialistMetrics(specialistId, metrics);
  }

  // ==================== ANALYTICS & REPORTING ====================

  /**
   * Get chat analytics for a date range
   */
  async getChatAnalytics(startDate: Date, endDate: Date): Promise<ChatAnalytics[]> {
    return analyticsManager.getChatAnalytics(startDate, endDate);
  }

  /**
   * Get specialist performance metrics
   */
  async getSpecialistPerformance(specialistId: string, days: number = 30): Promise<any> {
    return analyticsManager.getSpecialistPerformance(specialistId, days);
  }

  /**
   * Get overall system analytics
   */
  async getSystemAnalytics(days: number = 30): Promise<any> {
    return analyticsManager.getSystemAnalytics(days);
  }

  // ==================== DATA MIGRATION ====================

  /**
   * Migrate session from realtime DB to Firestore for archival
   */
  async migrateSessionToArchive(sessionId: string): Promise<void> {
    return migrationManager.migrateSessionToArchive(sessionId);
  }

  /**
   * Clean up old archived sessions
   */
  async cleanupOldArchives(daysOld: number = 90): Promise<number> {
    return migrationManager.cleanupOldArchives(daysOld);
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
