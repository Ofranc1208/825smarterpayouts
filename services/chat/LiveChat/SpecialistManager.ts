/**
 * Specialist Manager - Handles Specialist Operations
 * 
 * Manages specialist status, retrieval, and real-time updates.
 */

import { realtimeManager } from '../../../lib/firebase/realtime';
import { firestoreManager } from '../../../lib/firebase/firestore';
import type { Specialist } from '../../../lib/firebase/firestore';

export class SpecialistManager {
  private realtimeManager = realtimeManager;
  private firestoreManager = firestoreManager;

  /**
   * Update specialist status
   */
  async updateSpecialistStatus(specialistId: string, status: 'online' | 'busy' | 'offline'): Promise<void> {
    await this.realtimeManager.updateSpecialistStatus(specialistId, status);
  }

  /**
   * Get specialist information
   */
  async getSpecialist(specialistId: string): Promise<Specialist | null> {
    return await this.firestoreManager.getSpecialist(specialistId);
  }

  /**
   * Get all specialists
   */
  async getAllSpecialists(): Promise<Specialist[]> {
    return await this.firestoreManager.getAllSpecialists();
  }

  /**
   * Listen for specialist status changes
   */
  onSpecialistStatusChange(specialistId: string, callback: (specialist: any) => void): () => void {
    return this.realtimeManager.onSpecialistStatusChange(specialistId, callback);
  }
}

