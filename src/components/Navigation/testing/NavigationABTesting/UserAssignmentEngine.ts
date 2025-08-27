/**
 * User Assignment Engine - Variant Assignment Logic
 * 
 * Handles consistent user-to-variant assignment with support for
 * weighted distribution, sticky assignments, and traffic allocation.
 * 
 * @module UserAssignmentEngine
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import type { ABTest, ABTestVariant, UserAssignment } from './types';
import { getUserId, getUserRandomNumber, ABTestStorage } from './ABTestUtils';

export class UserAssignmentEngine {
  private storage: ABTestStorage;
  private assignments: Map<string, string> = new Map();

  constructor(storagePrefix: string = 'navigation-ab') {
    this.storage = new ABTestStorage(storagePrefix);
    this.loadAssignments();
  }

  /**
   * Load existing assignments from storage
   */
  private loadAssignments(): void {
    const savedAssignments = this.storage.loadAssignments();
    this.assignments = new Map(Object.entries(savedAssignments));
  }

  /**
   * Save assignments to storage
   */
  private saveAssignments(): void {
    const assignmentsObj = Object.fromEntries(this.assignments);
    this.storage.saveAssignments(assignmentsObj);
  }

  /**
   * Get variant assignment for user
   */
  getAssignment(test: ABTest, userId?: string): ABTestVariant | null {
    if (!test.isActive) return null;

    const actualUserId = userId || getUserId();
    const assignmentKey = `${test.id}-${actualUserId}`;

    // Check for existing assignment
    const existingVariantId = this.assignments.get(assignmentKey);
    if (existingVariantId) {
      const variant = test.variants.find(v => v.id === existingVariantId);
      if (variant) return variant;
    }

    // Create new assignment
    const variant = this.assignUserToVariant(test, actualUserId);
    if (variant) {
      this.assignments.set(assignmentKey, variant.id);
      this.saveAssignments();
    }

    return variant;
  }

  /**
   * Assign user to variant based on weights and constraints
   */
  private assignUserToVariant(test: ABTest, userId: string): ABTestVariant | null {
    // Validate test configuration
    if (!this.validateTestWeights(test)) {
      console.warn(`Invalid weights for test ${test.id}`);
      return null;
    }

    // Check if test is within date range
    if (!this.isTestActive(test)) {
      return null;
    }

    // Get consistent random number for user
    const randomNumber = getUserRandomNumber(userId, test.id);

    // Assign based on weighted distribution
    return this.selectVariantByWeight(test.variants, randomNumber);
  }

  /**
   * Select variant based on weighted distribution
   */
  private selectVariantByWeight(variants: ABTestVariant[], randomNumber: number): ABTestVariant {
    let cumulativeWeight = 0;
    
    for (const variant of variants) {
      cumulativeWeight += variant.weight;
      if (randomNumber <= cumulativeWeight) {
        return variant;
      }
    }
    
    // Fallback to first variant
    return variants[0];
  }

  /**
   * Validate test weights sum to 100
   */
  private validateTestWeights(test: ABTest): boolean {
    const totalWeight = test.variants.reduce((sum, variant) => sum + variant.weight, 0);
    return Math.abs(totalWeight - 100) < 0.01; // Allow for floating point precision
  }

  /**
   * Check if test is currently active
   */
  private isTestActive(test: ABTest): boolean {
    const now = new Date();
    const startDate = new Date(test.startDate);
    const endDate = test.endDate ? new Date(test.endDate) : null;

    if (now < startDate) return false;
    if (endDate && now > endDate) return false;

    return test.isActive;
  }

  /**
   * Force assignment for specific user (for testing/debugging)
   */
  forceAssignment(testId: string, userId: string, variantId: string): boolean {
    const assignmentKey = `${testId}-${userId}`;
    this.assignments.set(assignmentKey, variantId);
    this.saveAssignments();
    return true;
  }

  /**
   * Remove assignment for user
   */
  removeAssignment(testId: string, userId: string): boolean {
    const assignmentKey = `${testId}-${userId}`;
    const removed = this.assignments.delete(assignmentKey);
    if (removed) {
      this.saveAssignments();
    }
    return removed;
  }

  /**
   * Get all assignments for a test
   */
  getTestAssignments(testId: string): UserAssignment[] {
    const assignments: UserAssignment[] = [];
    
    for (const [key, variantId] of this.assignments) {
      if (key.startsWith(`${testId}-`)) {
        const userId = key.substring(`${testId}-`.length);
        assignments.push({
          testId,
          userId,
          variantId,
          timestamp: Date.now() // Approximate, real implementation would store this
        });
      }
    }
    
    return assignments;
  }

  /**
   * Get assignment distribution for test
   */
  getAssignmentDistribution(testId: string): Record<string, number> {
    const assignments = this.getTestAssignments(testId);
    const distribution: Record<string, number> = {};
    
    for (const assignment of assignments) {
      distribution[assignment.variantId] = (distribution[assignment.variantId] || 0) + 1;
    }
    
    return distribution;
  }

  /**
   * Calculate assignment balance score (how close to target weights)
   */
  calculateBalanceScore(test: ABTest): {
    score: number; // 0-1, where 1 is perfectly balanced
    deviations: Record<string, number>;
    recommendations: string[];
  } {
    const assignments = this.getTestAssignments(test.id);
    const totalAssignments = assignments.length;
    
    if (totalAssignments === 0) {
      return {
        score: 1,
        deviations: {},
        recommendations: ['No assignments yet']
      };
    }

    const distribution = this.getAssignmentDistribution(test.id);
    const deviations: Record<string, number> = {};
    let totalDeviation = 0;

    for (const variant of test.variants) {
      const actualCount = distribution[variant.id] || 0;
      const actualPercentage = (actualCount / totalAssignments) * 100;
      const expectedPercentage = variant.weight;
      const deviation = Math.abs(actualPercentage - expectedPercentage);
      
      deviations[variant.id] = deviation;
      totalDeviation += deviation;
    }

    const averageDeviation = totalDeviation / test.variants.length;
    const score = Math.max(0, 1 - (averageDeviation / 50)); // Normalize to 0-1

    const recommendations: string[] = [];
    if (score < 0.9) {
      recommendations.push('Assignment distribution is unbalanced');
    }
    if (totalAssignments < 100) {
      recommendations.push('Need more assignments for reliable distribution');
    }

    return {
      score,
      deviations,
      recommendations
    };
  }

  /**
   * Migrate users between variants (for test adjustments)
   */
  migrateAssignments(
    testId: string, 
    fromVariantId: string, 
    toVariantId: string, 
    percentage: number = 100
  ): {
    migrated: number;
    total: number;
  } {
    const assignments = this.getTestAssignments(testId);
    const targetAssignments = assignments.filter(a => a.variantId === fromVariantId);
    const migrateCount = Math.ceil((targetAssignments.length * percentage) / 100);
    
    let migrated = 0;
    for (let i = 0; i < migrateCount && i < targetAssignments.length; i++) {
      const assignment = targetAssignments[i];
      const assignmentKey = `${testId}-${assignment.userId}`;
      this.assignments.set(assignmentKey, toVariantId);
      migrated++;
    }

    if (migrated > 0) {
      this.saveAssignments();
    }

    return {
      migrated,
      total: targetAssignments.length
    };
  }

  /**
   * Clear all assignments for a test
   */
  clearTestAssignments(testId: string): number {
    let cleared = 0;
    
    for (const key of this.assignments.keys()) {
      if (key.startsWith(`${testId}-`)) {
        this.assignments.delete(key);
        cleared++;
      }
    }

    if (cleared > 0) {
      this.saveAssignments();
    }

    return cleared;
  }

  /**
   * Get assignment statistics
   */
  getAssignmentStats(testId: string): {
    totalAssignments: number;
    variantDistribution: Record<string, { count: number; percentage: number }>;
    uniqueUsers: number;
    assignmentRate: number; // assignments per day (approximate)
  } {
    const assignments = this.getTestAssignments(testId);
    const distribution = this.getAssignmentDistribution(testId);
    
    const variantDistribution: Record<string, { count: number; percentage: number }> = {};
    for (const [variantId, count] of Object.entries(distribution)) {
      variantDistribution[variantId] = {
        count,
        percentage: assignments.length > 0 ? (count / assignments.length) * 100 : 0
      };
    }

    // Calculate assignment rate (simplified - assumes even distribution over time)
    const assignmentRate = assignments.length / Math.max(1, 7); // Assume 7 days for now

    return {
      totalAssignments: assignments.length,
      variantDistribution,
      uniqueUsers: assignments.length, // Each assignment is one user
      assignmentRate
    };
  }

  /**
   * Export assignments for analysis
   */
  exportAssignments(testId?: string): UserAssignment[] {
    if (testId) {
      return this.getTestAssignments(testId);
    }

    const allAssignments: UserAssignment[] = [];
    for (const [key, variantId] of this.assignments) {
      const [testIdPart, userId] = key.split('-', 2);
      if (testIdPart && userId) {
        allAssignments.push({
          testId: testIdPart,
          userId,
          variantId,
          timestamp: Date.now()
        });
      }
    }

    return allAssignments;
  }
}

export default UserAssignmentEngine;
