/**
 * Specialist Service - Management of Settlement Specialists
 *
 * Handles specialist profiles, availability, performance tracking,
 * and assignment logic for live chat functionality.
 */

import { firestoreManager, type Specialist } from '../../lib/firebase/firestore';
import { realtimeManager } from '../../lib/firebase/realtime';

export interface SpecialistProfile {
  id: string;
  name: string;
  email: string;
  status: 'online' | 'busy' | 'offline';
  lastSeen: Date;
  skills: string[];
  currentChats: string[];
  maxConcurrentChats: number;
  responseTime: number;
  rating: number;
  totalChats: number;
  languages: string[];
  createdAt: Date;
  updatedAt: Date;
  // Additional profile information
  bio?: string;
  certifications?: string[];
  timezone: string;
  workingHours: {
    start: string; // "09:00"
    end: string;   // "17:00"
    days: string[]; // ["monday", "tuesday", ...]
  };
  specializations: string[]; // Settlement types they handle
  averageRating: number;
  totalReviews: number;
}

export interface SpecialistAssignment {
  specialistId: string;
  sessionId: string;
  assignedAt: Date;
  priority: 'low' | 'medium' | 'high';
  estimatedWaitTime: number;
}

/**
 * SpecialistService - Core service for specialist management
 */
export class SpecialistService {
  private firestoreManager = firestoreManager;
  private realtimeManager = realtimeManager;

  // ==================== SPECIALIST PROFILE MANAGEMENT ====================

  /**
   * Create or update specialist profile
   */
  async upsertSpecialist(specialistData: Omit<SpecialistProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const specialistId = await this.firestoreManager.upsertSpecialist({
        name: specialistData.name,
        email: specialistData.email,
        status: specialistData.status,
        lastSeen: Date.now() as any,
        skills: specialistData.skills,
        currentChats: specialistData.currentChats,
        maxConcurrentChats: specialistData.maxConcurrentChats,
        responseTime: specialistData.responseTime,
        rating: specialistData.rating,
        totalChats: specialistData.totalChats,
        languages: specialistData.languages
      });

      // Also update in realtime database for live status
      await this.realtimeManager.updateSpecialistStatus(specialistId, specialistData.status);

      console.log(`[SpecialistService] Upserted specialist: ${specialistId}`);
      return specialistId;

    } catch (error) {
      console.error('[SpecialistService] Error upserting specialist:', error);
      throw new Error('Failed to create/update specialist profile');
    }
  }

  /**
   * Get specialist profile by ID
   */
  async getSpecialist(specialistId: string): Promise<SpecialistProfile | null> {
    try {
      const specialist = await this.firestoreManager.getSpecialist(specialistId);
      if (specialist) {
        return {
          id: specialist.id,
          name: specialist.name,
          email: specialist.email,
          status: specialist.status,
          lastSeen: specialist.lastSeen.toDate(),
          skills: specialist.skills,
          currentChats: specialist.currentChats,
          maxConcurrentChats: specialist.maxConcurrentChats,
          responseTime: specialist.responseTime,
          rating: specialist.rating,
          totalChats: specialist.totalChats,
          languages: specialist.languages,
          createdAt: specialist.createdAt.toDate(),
          updatedAt: specialist.updatedAt.toDate(),
          // Additional SpecialistProfile fields with defaults
          timezone: 'UTC',
          workingHours: { start: '09:00', end: '17:00', days: [] },
          specializations: [],
          averageRating: specialist.rating,
          totalReviews: 0
        };
      }
      return null;
    } catch (error) {
      console.error('[SpecialistService] Error getting specialist:', error);
      return null;
    }
  }

  /**
   * Get all specialists
   */
  async getAllSpecialists(): Promise<SpecialistProfile[]> {
    try {
      const specialists = await this.firestoreManager.getAllSpecialists();
      return specialists.map(specialist => ({
        id: specialist.id,
        name: specialist.name,
        email: specialist.email,
        status: specialist.status,
        lastSeen: specialist.lastSeen.toDate(),
        skills: specialist.skills,
        currentChats: specialist.currentChats,
        maxConcurrentChats: specialist.maxConcurrentChats,
        responseTime: specialist.responseTime,
        rating: specialist.rating,
        totalChats: specialist.totalChats,
        languages: specialist.languages,
        createdAt: specialist.createdAt.toDate(),
        updatedAt: specialist.updatedAt.toDate(),
        // Additional SpecialistProfile fields with defaults
        timezone: 'UTC',
        workingHours: { start: '09:00', end: '17:00', days: [] },
        specializations: [],
        averageRating: specialist.rating,
        totalReviews: 0
      }));
    } catch (error) {
      console.error('[SpecialistService] Error getting all specialists:', error);
      return [];
    }
  }

  /**
   * Update specialist status
   */
  async updateSpecialistStatus(specialistId: string, status: 'online' | 'busy' | 'offline'): Promise<void> {
    try {
      await this.firestoreManager.updateSpecialistMetrics(specialistId, {
        status,
        lastSeen: Date.now() as any
      });

      await this.realtimeManager.updateSpecialistStatus(specialistId, status);

      console.log(`[SpecialistService] Updated specialist ${specialistId} status to ${status}`);
    } catch (error) {
      console.error('[SpecialistService] Error updating specialist status:', error);
    }
  }

  // ==================== SPECIALIST ASSIGNMENT ====================

  /**
   * Find best available specialist for a session
   */
  async findBestSpecialist(sessionPriority: 'low' | 'medium' | 'high' = 'medium'): Promise<any | null> {
    try {
      const availableSpecialists = await this.realtimeManager.getAvailableSpecialists();

      if (availableSpecialists.length === 0) {
        console.log('[SpecialistService] No specialists available');
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

      console.log(`[SpecialistService] Found best specialist: ${sortedSpecialists[0].id}`);
      return sortedSpecialists[0];

    } catch (error) {
      console.error('[SpecialistService] Error finding best specialist:', error);
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

      console.log(`[SpecialistService] Assigned specialist ${specialist.id} to session ${sessionId}`);
      return specialist.id;

    } catch (error) {
      console.error('[SpecialistService] Error assigning specialist:', error);
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

      console.log(`[SpecialistService] Removed specialist ${specialistId} from session ${sessionId}`);
    } catch (error) {
      console.error('[SpecialistService] Error removing specialist from session:', error);
    }
  }

  // ==================== PERFORMANCE TRACKING ====================

  /**
   * Update specialist performance metrics after chat completion
   */
  async updateSpecialistPerformance(specialistId: string, sessionMetrics: {
    responseTime: number;
    sessionDuration: number;
    userSatisfaction?: number;
  }): Promise<void> {
    try {
      const specialist = await this.getSpecialist(specialistId);
      if (!specialist) return;

      const currentTotalChats = specialist.totalChats || 0;
      const currentRating = specialist.rating || 0;

      // Calculate new averages
      const newTotalChats = currentTotalChats + 1;
      const newRating = ((currentRating * currentTotalChats) + (sessionMetrics.userSatisfaction || 0)) / newTotalChats;
      const newResponseTime = ((specialist.responseTime * currentTotalChats) + sessionMetrics.responseTime) / newTotalChats;

      await this.firestoreManager.updateSpecialistMetrics(specialistId, {
        totalChats: newTotalChats,
        rating: Math.round(newRating * 100) / 100, // Round to 2 decimal places
        responseTime: Math.round(newResponseTime)
      });

      console.log(`[SpecialistService] Updated performance for specialist ${specialistId}`);
    } catch (error) {
      console.error('[SpecialistService] Error updating specialist performance:', error);
    }
  }

  /**
   * Get specialist performance analytics
   */
  async getSpecialistAnalytics(specialistId: string, days: number = 30): Promise<any> {
    try {
      return await this.firestoreManager.getSpecialistPerformance(specialistId, days);
    } catch (error) {
      console.error('[SpecialistService] Error getting specialist analytics:', error);
      return null;
    }
  }

  /**
   * Get system-wide specialist analytics
   */
  async getSystemAnalytics(days: number = 30): Promise<any> {
    try {
      return await this.firestoreManager.getSystemAnalytics(days);
    } catch (error) {
      console.error('[SpecialistService] Error getting system analytics:', error);
      return null;
    }
  }

  // ==================== AVAILABILITY MANAGEMENT ====================

  /**
   * Get specialists by status
   */
  async getSpecialistsByStatus(status: 'online' | 'busy' | 'offline'): Promise<SpecialistProfile[]> {
    try {
      const allSpecialists = await this.getAllSpecialists();
      return allSpecialists.filter(specialist => specialist.status === status);
    } catch (error) {
      console.error('[SpecialistService] Error getting specialists by status:', error);
      return [];
    }
  }

  /**
   * Get online specialists count
   */
  async getOnlineSpecialistsCount(): Promise<number> {
    try {
      const onlineSpecialists = await this.getSpecialistsByStatus('online');
      return onlineSpecialists.length;
    } catch (error) {
      console.error('[SpecialistService] Error getting online specialists count:', error);
      return 0;
    }
  }

  /**
   * Get busy specialists count
   */
  async getBusySpecialistsCount(): Promise<number> {
    try {
      const busySpecialists = await this.getSpecialistsByStatus('busy');
      return busySpecialists.length;
    } catch (error) {
      console.error('[SpecialistService] Error getting busy specialists count:', error);
      return 0;
    }
  }

  /**
   * Calculate current capacity utilization
   */
  async getCapacityUtilization(): Promise<{ percentage: number; available: number; total: number }> {
    try {
      const allSpecialists = await this.getAllSpecialists();
      const onlineSpecialists = allSpecialists.filter(s => s.status !== 'offline');

      const totalCapacity = onlineSpecialists.reduce((sum, s) => sum + s.maxConcurrentChats, 0);
      const currentLoad = onlineSpecialists.reduce((sum, s) => sum + s.currentChats.length, 0);
      const utilizationPercentage = totalCapacity > 0 ? (currentLoad / totalCapacity) * 100 : 0;

      return {
        percentage: Math.round(utilizationPercentage),
        available: totalCapacity - currentLoad,
        total: totalCapacity
      };
    } catch (error) {
      console.error('[SpecialistService] Error calculating capacity utilization:', error);
      return { percentage: 0, available: 0, total: 0 };
    }
  }
}

// Export singleton instance
export const specialistService = new SpecialistService();
