/**
 * Assignment Manager - Handles Specialist Assignment Logic
 * 
 * Manages finding, assigning, and removing specialists from sessions.
 */

import { firestoreManager } from '../../../lib/firebase/firestore';
import { realtimeManager } from '../../../lib/firebase/realtime';

export class AssignmentManager {
  private firestoreManager = firestoreManager;
  private realtimeManager = realtimeManager;

  /**
   * Find best available specialist for a session
   */
  async findBestSpecialist(sessionPriority: 'low' | 'medium' | 'high' = 'medium'): Promise<any | null> {
    try {
      const availableSpecialists = await this.realtimeManager.getAvailableSpecialists();

      if (availableSpecialists.length === 0) {
        console.log('[AssignmentManager] No specialists available');
        return null;
      }

      // Sort by:
      // 1. Availability (online and not at capacity)
      // 2. Response time (faster is better)
      // 3. Rating (higher is better)
      // 4. Current chat load (lower is better)
      const sortedSpecialists = availableSpecialists.sort((a, b) => {
        // Primary: Response time (lower is better)
        if (a.responseTime !== b.responseTime) {
          return a.responseTime - b.responseTime;
        }

        // Secondary: Rating (higher is better)
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }

        // Tertiary: Current chat load (lower is better)
        return a.currentChats.length - b.currentChats.length;
      });

      console.log(`[AssignmentManager] Found best specialist: ${sortedSpecialists[0].id}`);
      return sortedSpecialists[0];

    } catch (error) {
      console.error('[AssignmentManager] Error finding best specialist:', error);
      return null;
    }
  }

  /**
   * Assign specialist to session
   */
  async assignSpecialistToSession(sessionId: string, priority: 'low' | 'medium' | 'high' = 'medium'): Promise<string | null> {
    try {
      const specialist = await this.findBestSpecialist(priority);
      if (!specialist) return null;

      // Assign in both databases
      await this.firestoreManager.updateChatSession(sessionId, {
        specialistId: specialist.id,
        status: 'active'
      });

      await this.realtimeManager.assignSpecialist(sessionId, specialist.id);

      // Remove from queue
      await this.realtimeManager.removeFromQueue(sessionId);

      console.log(`[AssignmentManager] Assigned specialist ${specialist.id} to session ${sessionId}`);
      return specialist.id;

    } catch (error) {
      console.error('[AssignmentManager] Error assigning specialist:', error);
      return null;
    }
  }

  /**
   * Remove specialist from session
   */
  async removeSpecialistFromSession(sessionId: string, specialistId: string): Promise<void> {
    try {
      await this.firestoreManager.updateChatSession(sessionId, {
        specialistId: undefined,
        status: 'waiting'
      });

      await this.realtimeManager.removeSpecialistFromSession(sessionId, specialistId);

      console.log(`[AssignmentManager] Removed specialist ${specialistId} from session ${sessionId}`);
    } catch (error) {
      console.error('[AssignmentManager] Error removing specialist from session:', error);
    }
  }
}

