/**
 * Queue Manager - Handles Queue Operations
 * 
 * Manages queue status and real-time queue updates.
 */

import { realtimeManager } from '../../../lib/firebase/realtime';

export class QueueManager {
  private realtimeManager = realtimeManager;

  /**
   * Get current queue status
   */
  async getQueueStatus(): Promise<{ length: number; averageWaitTime: number }> {
    const length = await this.realtimeManager.getQueueLength();
    const averageWaitTime = await this.realtimeManager.calculateAverageWaitTime();

    return {
      length,
      averageWaitTime
    };
  }

  /**
   * Listen for queue updates
   */
  onQueueUpdate(callback: (queue: { length: number; averageWaitTime: number }) => void): () => void {
    return this.realtimeManager.onQueueUpdate((queue) => {
      callback({
        length: queue.queueLength,
        averageWaitTime: queue.averageWaitTime
      });
    });
  }
}

