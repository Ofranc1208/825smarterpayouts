/**
 * Availability Manager - Handles Specialist Availability & Capacity
 * 
 * Manages specialist status filtering, capacity calculations, and utilization metrics.
 */

import type { SpecialistProfile } from '../SpecialistService';

export class AvailabilityManager {
  /**
   * Get specialists by status
   */
  getSpecialistsByStatus(allSpecialists: SpecialistProfile[], status: 'online' | 'busy' | 'offline'): SpecialistProfile[] {
    return allSpecialists.filter(specialist => specialist.status === status);
  }

  /**
   * Get online specialists count
   */
  getOnlineSpecialistsCount(allSpecialists: SpecialistProfile[]): number {
    return this.getSpecialistsByStatus(allSpecialists, 'online').length;
  }

  /**
   * Get busy specialists count
   */
  getBusySpecialistsCount(allSpecialists: SpecialistProfile[]): number {
    return this.getSpecialistsByStatus(allSpecialists, 'busy').length;
  }

  /**
   * Calculate current capacity utilization
   */
  getCapacityUtilization(allSpecialists: SpecialistProfile[]): { 
    percentage: number; 
    available: number; 
    total: number 
  } {
    try {
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
      console.error('[AvailabilityManager] Error calculating capacity utilization:', error);
      return { percentage: 0, available: 0, total: 0 };
    }
  }
}

