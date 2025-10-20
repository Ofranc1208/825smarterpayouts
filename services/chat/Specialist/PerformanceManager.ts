/**
 * Performance Manager - Handles Specialist Performance Tracking
 * 
 * Manages performance metrics, analytics, and reporting.
 */

import { firestoreManager } from '../../../lib/firebase/firestore';
import type { SpecialistProfile } from '../SpecialistService';

export class PerformanceManager {
  private firestoreManager = firestoreManager;

  /**
   * Update specialist performance metrics after chat completion
   */
  async updateSpecialistPerformance(
    specialistId: string, 
    specialistProfile: SpecialistProfile,
    sessionMetrics: {
      responseTime: number;
      sessionDuration: number;
      userSatisfaction?: number;
    }
  ): Promise<void> {
    try {
      const currentTotalChats = specialistProfile.totalChats || 0;
      const currentRating = specialistProfile.rating || 0;

      // Calculate new averages
      const newTotalChats = currentTotalChats + 1;
      const newRating = ((currentRating * currentTotalChats) + (sessionMetrics.userSatisfaction || 0)) / newTotalChats;
      const newResponseTime = ((specialistProfile.responseTime * currentTotalChats) + sessionMetrics.responseTime) / newTotalChats;

      await this.firestoreManager.updateSpecialistMetrics(specialistId, {
        totalChats: newTotalChats,
        rating: Math.round(newRating * 100) / 100, // Round to 2 decimal places
        responseTime: Math.round(newResponseTime)
      });

      console.log(`[PerformanceManager] Updated performance for specialist ${specialistId}`);
    } catch (error) {
      console.error('[PerformanceManager] Error updating specialist performance:', error);
    }
  }

  /**
   * Get specialist performance analytics
   */
  async getSpecialistAnalytics(specialistId: string, days: number = 30): Promise<any> {
    try {
      return await this.firestoreManager.getSpecialistPerformance(specialistId, days);
    } catch (error) {
      console.error('[PerformanceManager] Error getting specialist analytics:', error);
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
      console.error('[PerformanceManager] Error getting system analytics:', error);
      return null;
    }
  }
}

