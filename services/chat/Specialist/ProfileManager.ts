/**
 * Profile Manager - Handles Specialist Profile Operations
 * 
 * Manages specialist profile creation, retrieval, and updates.
 */

import { firestoreManager } from '../../../lib/firebase/firestore';
import { realtimeManager } from '../../../lib/firebase/realtime';
import type { SpecialistProfile } from '../SpecialistService';

export class ProfileManager {
  private firestoreManager = firestoreManager;
  private realtimeManager = realtimeManager;

  /**
   * Helper function to safely convert timestamps
   */
  private toDate(timestamp: any): Date {
    if (!timestamp) return new Date();
    if (timestamp instanceof Date) return timestamp;
    if (typeof timestamp === 'number') return new Date(timestamp);
    if (timestamp.toDate && typeof timestamp.toDate === 'function') return timestamp.toDate();
    if (timestamp.seconds) return new Date(timestamp.seconds * 1000);
    return new Date();
  }

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

      console.log(`[ProfileManager] Upserted specialist: ${specialistId}`);
      return specialistId;

    } catch (error) {
      console.error('[ProfileManager] Error upserting specialist:', error);
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
          lastSeen: this.toDate(specialist.lastSeen),
          skills: specialist.skills,
          currentChats: specialist.currentChats,
          maxConcurrentChats: specialist.maxConcurrentChats,
          responseTime: specialist.responseTime,
          rating: specialist.rating,
          totalChats: specialist.totalChats,
          languages: specialist.languages,
          createdAt: this.toDate((specialist as any).createdAt),
          updatedAt: this.toDate((specialist as any).updatedAt),
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
      console.error('[ProfileManager] Error getting specialist:', error);
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
        lastSeen: this.toDate(specialist.lastSeen),
        skills: specialist.skills,
        currentChats: specialist.currentChats,
        maxConcurrentChats: specialist.maxConcurrentChats,
        responseTime: specialist.responseTime,
        rating: specialist.rating,
        totalChats: specialist.totalChats,
        languages: specialist.languages,
        createdAt: this.toDate((specialist as any).createdAt),
        updatedAt: this.toDate((specialist as any).updatedAt),
        // Additional SpecialistProfile fields with defaults
        timezone: 'UTC',
        workingHours: { start: '09:00', end: '17:00', days: [] },
        specializations: [],
        averageRating: specialist.rating,
        totalReviews: 0
      }));
    } catch (error) {
      console.error('[ProfileManager] Error getting all specialists:', error);
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

      console.log(`[ProfileManager] Updated specialist ${specialistId} status to ${status}`);
    } catch (error) {
      console.error('[ProfileManager] Error updating specialist status:', error);
    }
  }
}

