/**
 * RealtimeQueueManager - Handles all real-time queue operations
 *
 * Separated from main RealtimeManager for better organization and debugging.
 * Uses the orchestra pattern for clean separation of concerns.
 */

import {
  ref,
  push,
  set,
  get,
  update,
  onValue
} from 'firebase/database';
import type { Database, DataSnapshot } from 'firebase/database';

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
export interface ChatQueue {
  waitingUsers: string[];
  availableSpecialists: string[];
  averageWaitTime: number;
  queueLength: number;
}

/**
 * RealtimeQueueManager - Specialized manager for real-time queue operations
 */
export class RealtimeQueueManager {
  private db: any;

  constructor() {
    this.db = getRtdb();
  }

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

    console.log(`[RealtimeQueueManager] Added session ${sessionId} to queue`);
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

    console.log(`[RealtimeQueueManager] Removed session ${sessionId} from queue`);
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

  /**
   * Listen for queue updates
   */
  onQueueUpdate(callback: (queue: ChatQueue) => void): () => void {
    const queueRef = ref(this.db, 'chat-queue');

    const unsubscribe = onValue(queueRef, (snapshot: DataSnapshot) => {
      if (snapshot.exists()) {
        const queue = snapshot.val() as ChatQueue;
        callback(queue);
      }
    });

    return unsubscribe;
  }
}

// Export singleton instance
let realtimeQueueManagerInstance: RealtimeQueueManager | null = null;
export const realtimeQueueManager = (() => {
  if (typeof window === 'undefined') {
    return new Proxy({} as RealtimeQueueManager, {
      get() {
        throw new Error('RealtimeQueueManager can only be used on the client side');
      }
    });
  }
  if (!realtimeQueueManagerInstance) {
    realtimeQueueManagerInstance = new RealtimeQueueManager();
  }
  return realtimeQueueManagerInstance;
})();
