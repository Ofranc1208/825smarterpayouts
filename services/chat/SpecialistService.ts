/**
 * Specialist Service - Management of Settlement Specialists
 *
 * Orchestrates specialist operations using the Orchestra Pattern.
 * Delegates specific operations to specialized managers.
 * 
 * Architecture: Orchestra Pattern
 * - ProfileManager: Handles profile CRUD operations
 * - AssignmentManager: Handles specialist assignment logic
 * - PerformanceManager: Handles metrics and analytics
 * - AvailabilityManager: Handles status and capacity
 */

import { ProfileManager, AssignmentManager, PerformanceManager, AvailabilityManager } from './Specialist';

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
 * SpecialistService - Orchestrator for Specialist Operations
 * 
 * Delegates operations to specialized managers following the Orchestra Pattern.
 */
export class SpecialistService {
  private profileManager = new ProfileManager();
  private assignmentManager = new AssignmentManager();
  private performanceManager = new PerformanceManager();
  private availabilityManager = new AvailabilityManager();

  // ==================== SPECIALIST PROFILE MANAGEMENT ====================

  /**
   * Create or update specialist profile
   */
  async upsertSpecialist(specialistData: Omit<SpecialistProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return this.profileManager.upsertSpecialist(specialistData);
  }

  /**
   * Get specialist profile by ID
   */
  async getSpecialist(specialistId: string): Promise<SpecialistProfile | null> {
    return this.profileManager.getSpecialist(specialistId);
  }

  /**
   * Get all specialists
   */
  async getAllSpecialists(): Promise<SpecialistProfile[]> {
    return this.profileManager.getAllSpecialists();
  }

  /**
   * Update specialist status
   */
  async updateSpecialistStatus(specialistId: string, status: 'online' | 'busy' | 'offline'): Promise<void> {
    return this.profileManager.updateSpecialistStatus(specialistId, status);
  }

  // ==================== SPECIALIST ASSIGNMENT ====================

  /**
   * Find best available specialist for a session
   */
  async findBestSpecialist(sessionPriority: 'low' | 'medium' | 'high' = 'medium'): Promise<any | null> {
    return this.assignmentManager.findBestSpecialist(sessionPriority);
  }

  /**
   * Assign specialist to session
   */
  async assignSpecialistToSession(sessionId: string, priority: 'low' | 'medium' | 'high' = 'medium'): Promise<string | null> {
    return this.assignmentManager.assignSpecialistToSession(sessionId, priority);
  }

  /**
   * Remove specialist from session
   */
  async removeSpecialistFromSession(sessionId: string, specialistId: string): Promise<void> {
    return this.assignmentManager.removeSpecialistFromSession(sessionId, specialistId);
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
    const specialist = await this.getSpecialist(specialistId);
    if (!specialist) return;
    
    return this.performanceManager.updateSpecialistPerformance(specialistId, specialist, sessionMetrics);
  }

  /**
   * Get specialist performance analytics
   */
  async getSpecialistAnalytics(specialistId: string, days: number = 30): Promise<any> {
    return this.performanceManager.getSpecialistAnalytics(specialistId, days);
  }

  /**
   * Get system-wide specialist analytics
   */
  async getSystemAnalytics(days: number = 30): Promise<any> {
    return this.performanceManager.getSystemAnalytics(days);
  }

  // ==================== AVAILABILITY MANAGEMENT ====================

  /**
   * Get specialists by status
   */
  async getSpecialistsByStatus(status: 'online' | 'busy' | 'offline'): Promise<SpecialistProfile[]> {
    const allSpecialists = await this.getAllSpecialists();
    return this.availabilityManager.getSpecialistsByStatus(allSpecialists, status);
  }

  /**
   * Get online specialists count
   */
  async getOnlineSpecialistsCount(): Promise<number> {
    const allSpecialists = await this.getAllSpecialists();
    return this.availabilityManager.getOnlineSpecialistsCount(allSpecialists);
  }

  /**
   * Get busy specialists count
   */
  async getBusySpecialistsCount(): Promise<number> {
    const allSpecialists = await this.getAllSpecialists();
    return this.availabilityManager.getBusySpecialistsCount(allSpecialists);
  }

  /**
   * Calculate current capacity utilization
   */
  async getCapacityUtilization(): Promise<{ percentage: number; available: number; total: number }> {
    const allSpecialists = await this.getAllSpecialists();
    return this.availabilityManager.getCapacityUtilization(allSpecialists);
  }
}

// Export singleton instance
export const specialistService = new SpecialistService();
