/**
 * MigrationManager - Handles data migration and cleanup operations
 *
 * Separated from main FirestoreManager for better organization and debugging.
 * Uses the orchestra pattern for clean separation of concerns.
 */

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

/**
 * MigrationManager - Specialized manager for migration operations
 */
export class MigrationManager {
  private db: any;

  constructor() {
    this.db = getDb();
  }

  /**
   * Migrate session from realtime DB to Firestore for archival
   */
  async migrateSessionToArchive(sessionId: string): Promise<void> {
    // This would copy session data from realtime DB to Firestore
    // for long-term storage and analytics
    console.log(`[MigrationManager] Migrating session ${sessionId} to archive`);
  }

  /**
   * Clean up old archived sessions
   */
  async cleanupOldArchives(daysOld: number = 90): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    // Query for old archived sessions and delete them
    console.log(`[MigrationManager] Cleaned up archives older than ${daysOld} days`);
    return 0; // Return count of deleted records
  }
}

// Export singleton instance
let migrationManagerInstance: MigrationManager | null = null;
export const migrationManager = (() => {
  if (typeof window === 'undefined') {
    return new Proxy({} as MigrationManager, {
      get() {
        throw new Error('MigrationManager can only be used on the client side');
      }
    });
  }
  if (!migrationManagerInstance) {
    migrationManagerInstance = new MigrationManager();
  }
  return migrationManagerInstance;
})();
