/**
 * A/B Test Utilities - Helper Functions
 * 
 * Utility functions for A/B testing including ID generation,
 * hashing, storage management, and data validation.
 * 
 * @module ABTestUtils
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

/**
 * Generate unique user ID
 */
export function getUserId(): string {
  if (typeof window === 'undefined') return 'server_user';
  
  let userId = localStorage.getItem('navigation-user-id');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('navigation-user-id', userId);
  }
  return userId;
}

/**
 * Generate unique session ID
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server_session';
  
  let sessionId = sessionStorage.getItem('navigation-session-id');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('navigation-session-id', sessionId);
  }
  return sessionId;
}

/**
 * Generate unique test ID
 */
export function generateTestId(): string {
  return 'test_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Hash string to consistent number
 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Generate consistent random number for user
 */
export function getUserRandomNumber(userId: string, testId: string): number {
  const hash = hashString(userId + testId);
  return (hash % 100) + 1; // 1-100
}

/**
 * Validate A/B test configuration
 */
export function validateABTest(test: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!test.name || typeof test.name !== 'string') {
    errors.push('Test name is required and must be a string');
  }

  if (!test.variants || !Array.isArray(test.variants) || test.variants.length < 2) {
    errors.push('Test must have at least 2 variants');
  }

  if (test.variants) {
    const totalWeight = test.variants.reduce((sum: number, v: any) => sum + (v.weight || 0), 0);
    if (Math.abs(totalWeight - 100) > 0.01) {
      errors.push('Variant weights must sum to 100');
    }

    const variantIds = test.variants.map((v: any) => v.id);
    const uniqueIds = new Set(variantIds);
    if (uniqueIds.size !== variantIds.length) {
      errors.push('Variant IDs must be unique');
    }
  }

  if (test.minimumSampleSize && (typeof test.minimumSampleSize !== 'number' || test.minimumSampleSize < 1)) {
    errors.push('Minimum sample size must be a positive number');
  }

  if (test.confidenceLevel && (typeof test.confidenceLevel !== 'number' || test.confidenceLevel <= 0 || test.confidenceLevel >= 1)) {
    errors.push('Confidence level must be between 0 and 1');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Storage helper for A/B tests
 */
export class ABTestStorage {
  private prefix: string;

  constructor(prefix: string = 'navigation-ab') {
    this.prefix = prefix;
  }

  /**
   * Save tests to localStorage
   */
  saveTests(tests: any[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(`${this.prefix}-tests`, JSON.stringify(tests));
    } catch (error) {
      console.error('Failed to save A/B tests:', error);
    }
  }

  /**
   * Load tests from localStorage
   */
  loadTests(): any[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const saved = localStorage.getItem(`${this.prefix}-tests`);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load A/B tests:', error);
      return [];
    }
  }

  /**
   * Save user assignments
   */
  saveAssignments(assignments: Record<string, string>): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(`${this.prefix}-assignments`, JSON.stringify(assignments));
    } catch (error) {
      console.error('Failed to save A/B test assignments:', error);
    }
  }

  /**
   * Load user assignments
   */
  loadAssignments(): Record<string, string> {
    if (typeof window === 'undefined') return {};
    
    try {
      const saved = localStorage.getItem(`${this.prefix}-assignments`);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Failed to load A/B test assignments:', error);
      return {};
    }
  }

  /**
   * Save test results
   */
  saveResults(results: any[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(`${this.prefix}-results`, JSON.stringify(results));
    } catch (error) {
      console.error('Failed to save A/B test results:', error);
    }
  }

  /**
   * Load test results
   */
  loadResults(): any[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const saved = localStorage.getItem(`${this.prefix}-results`);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load A/B test results:', error);
      return [];
    }
  }

  /**
   * Clear all A/B test data
   */
  clearAll(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(`${this.prefix}-tests`);
      localStorage.removeItem(`${this.prefix}-assignments`);
      localStorage.removeItem(`${this.prefix}-results`);
    } catch (error) {
      console.error('Failed to clear A/B test data:', error);
    }
  }
}

/**
 * Date utility functions
 */
export class DateUtils {
  /**
   * Check if date is in the past
   */
  static isPast(date: Date): boolean {
    return date.getTime() < Date.now();
  }

  /**
   * Check if date is in the future
   */
  static isFuture(date: Date): boolean {
    return date.getTime() > Date.now();
  }

  /**
   * Check if current time is within date range
   */
  static isWithinRange(startDate: Date, endDate?: Date): boolean {
    const now = Date.now();
    const start = startDate.getTime();
    const end = endDate ? endDate.getTime() : Infinity;
    
    return now >= start && now <= end;
  }

  /**
   * Format date for display
   */
  static formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

/**
 * Performance measurement utilities
 */
export class PerformanceUtils {
  private static measurements: Map<string, number> = new Map();

  /**
   * Start performance measurement
   */
  static startMeasurement(key: string): void {
    this.measurements.set(key, performance.now());
  }

  /**
   * End performance measurement and return duration
   */
  static endMeasurement(key: string): number {
    const start = this.measurements.get(key);
    if (!start) return 0;
    
    const duration = performance.now() - start;
    this.measurements.delete(key);
    return duration;
  }

  /**
   * Measure function execution time
   */
  static async measureAsync<T>(
    key: string, 
    fn: () => Promise<T>
  ): Promise<{ result: T; duration: number }> {
    this.startMeasurement(key);
    const result = await fn();
    const duration = this.endMeasurement(key);
    
    return { result, duration };
  }
}

export default {
  getUserId,
  getSessionId,
  generateTestId,
  hashString,
  getUserRandomNumber,
  validateABTest,
  ABTestStorage,
  DateUtils,
  PerformanceUtils
};
