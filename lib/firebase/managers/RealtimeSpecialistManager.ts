/**
 * RealtimeSpecialistManager - Handles all real-time specialist operations
 *
 * Separated from main RealtimeManager for better organization and debugging.
 * Uses the orchestra pattern for clean separation of concerns.
 */

import {
  ref,
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
export interface Specialist {
  id: string;
  name: string;
  email: string;
  status: 'online' | 'busy' | 'offline';
  lastSeen: number;
  skills: string[];
  currentChats: string[];
  maxConcurrentChats: number;
  responseTime: number;
  rating: number;
  totalChats: number;
  languages: string[];
}

/**
 * RealtimeSpecialistManager - Specialized manager for real-time specialist operations
 */
export class RealtimeSpecialistManager {
  private db: any;

  constructor() {
    this.db = getRtdb();
  }

  /**
   * Update specialist status
   */
  async updateSpecialistStatus(specialistId: string, status: Specialist['status']): Promise<void> {
    const specialistRef = ref(this.db, `specialists/${specialistId}`);
    await update(specialistRef, {
      status,
      lastSeen: Date.now()
    });

    console.log(`[RealtimeSpecialistManager] Updated specialist ${specialistId} status to ${status}`);
  }

  /**
   * Get available specialists
   */
  async getAvailableSpecialists(): Promise<Specialist[]> {
    const specialistsRef = ref(this.db, 'specialists');
    const snapshot = await get(specialistsRef);

    if (snapshot.exists()) {
      const specialistsData = snapshot.val();
      const specialists = Object.values(specialistsData) as Specialist[];
      return specialists.filter(s =>
        s.status === 'online' &&
        (s.currentChats || []).length < s.maxConcurrentChats
      );
    }
    return [];
  }

  /**
   * Assign specialist to chat session
   */
  async assignSpecialist(sessionId: string, specialistId: string): Promise<void> {
    // Update session
    const sessionRef = ref(this.db, `chat-sessions/${sessionId}`);
    await update(sessionRef, {
      specialistId,
      status: 'active'
    });

    // Update specialist's current chats
    const specialistRef = ref(this.db, `specialists/${specialistId}`);
    const specialistSnapshot = await get(specialistRef);

    if (specialistSnapshot.exists()) {
      const specialist = specialistSnapshot.val() as Specialist;
      // Ensure currentChats is an array (handle case where it might be null/undefined)
      const currentChats = Array.isArray(specialist.currentChats) ? specialist.currentChats : [];
      const updatedChats = [...currentChats, sessionId];

      await update(specialistRef, {
        currentChats: updatedChats,
        status: updatedChats.length >= specialist.maxConcurrentChats ? 'busy' : 'online'
      });
    }

    console.log(`[RealtimeSpecialistManager] Assigned specialist ${specialistId} to session ${sessionId}`);
  }

  /**
   * Remove specialist from chat session
   */
  async removeSpecialistFromSession(sessionId: string, specialistId: string): Promise<void> {
    // Update session - use null instead of undefined for Firebase
    const sessionRef = ref(this.db, `chat-sessions/${sessionId}`);
    await update(sessionRef, {
      specialistId: null,
      status: 'closed'
    });

    // Update specialist's current chats
    const specialistRef = ref(this.db, `specialists/${specialistId}`);
    const specialistSnapshot = await get(specialistRef);

    if (specialistSnapshot.exists()) {
      const specialist = specialistSnapshot.val() as Specialist;
      const updatedChats = specialist.currentChats.filter(chatId => chatId !== sessionId);

      await update(specialistRef, {
        currentChats: updatedChats,
        status: updatedChats.length === 0 ? 'online' : 'online'
      });
    }

    console.log(`[RealtimeSpecialistManager] Removed specialist ${specialistId} from session ${sessionId}`);
  }

  /**
   * Listen for specialist status changes
   */
  onSpecialistStatusChange(specialistId: string, callback: (specialist: Specialist) => void): () => void {
    const specialistRef = ref(this.db, `specialists/${specialistId}`);

    const unsubscribe = onValue(specialistRef, (snapshot) => {
      if (snapshot.exists()) {
        const specialist = snapshot.val() as Specialist;
        callback(specialist);
      }
    });

    return unsubscribe;
  }
}

// Export singleton instance
let realtimeSpecialistManagerInstance: RealtimeSpecialistManager | null = null;
export const realtimeSpecialistManager = (() => {
  if (typeof window === 'undefined') {
    return new Proxy({} as RealtimeSpecialistManager, {
      get() {
        throw new Error('RealtimeSpecialistManager can only be used on the client side');
      }
    });
  }
  if (!realtimeSpecialistManagerInstance) {
    realtimeSpecialistManagerInstance = new RealtimeSpecialistManager();
  }
  return realtimeSpecialistManagerInstance;
})();
