/**
 * A/B Test Manager - Test Lifecycle Management
 * 
 * Manages the complete lifecycle of A/B tests including creation,
 * validation, activation, monitoring, and termination.
 * 
 * @module ABTestManager
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import type { ABTest, ABTestResult, ABTestConfig } from './types';
import { generateTestId, validateABTest, ABTestStorage, DateUtils } from './ABTestUtils';
import { StatisticalAnalyzer } from './StatisticalAnalyzer';
import { UserAssignmentEngine } from './UserAssignmentEngine';

export class ABTestManager {
  private tests: Map<string, ABTest> = new Map();
  private results: ABTestResult[] = [];
  private storage: ABTestStorage;
  private statisticalAnalyzer: StatisticalAnalyzer;
  private assignmentEngine: UserAssignmentEngine;
  private config: ABTestConfig;

  constructor(config: Partial<ABTestConfig> = {}) {
    this.config = {
      enableAnalytics: true,
      storagePrefix: 'navigation-ab',
      defaultConfidenceLevel: 0.95,
      defaultMinimumSampleSize: 1000,
      ...config
    };

    this.storage = new ABTestStorage(this.config.storagePrefix);
    this.statisticalAnalyzer = new StatisticalAnalyzer(this.config.defaultConfidenceLevel);
    this.assignmentEngine = new UserAssignmentEngine(this.config.storagePrefix);

    this.loadTests();
    this.loadResults();
  }

  /**
   * Load tests from storage
   */
  private loadTests(): void {
    const savedTests = this.storage.loadTests();
    for (const test of savedTests) {
      // Convert date strings back to Date objects
      test.startDate = new Date(test.startDate);
      if (test.endDate) {
        test.endDate = new Date(test.endDate);
      }
      this.tests.set(test.id, test);
    }
  }

  /**
   * Load results from storage
   */
  private loadResults(): void {
    this.results = this.storage.loadResults();
  }

  /**
   * Save tests to storage
   */
  private saveTests(): void {
    const testsArray = Array.from(this.tests.values());
    this.storage.saveTests(testsArray);
  }

  /**
   * Save results to storage
   */
  private saveResults(): void {
    this.storage.saveResults(this.results);
  }

  /**
   * Create new A/B test
   */
  createTest(testData: Omit<ABTest, 'id'>): { success: boolean; testId?: string; errors?: string[] } {
    // Validate test configuration
    const validation = validateABTest(testData);
    if (!validation.valid) {
      return { success: false, errors: validation.errors };
    }

    // Check for duplicate test names
    const existingTest = Array.from(this.tests.values()).find(t => t.name === testData.name);
    if (existingTest) {
      return { success: false, errors: ['Test name already exists'] };
    }

    // Create test with generated ID
    const testId = generateTestId();
    const test: ABTest = {
      ...testData,
      id: testId,
      // Set defaults if not provided
      minimumSampleSize: testData.minimumSampleSize || this.config.defaultMinimumSampleSize,
      confidenceLevel: testData.confidenceLevel || this.config.defaultConfidenceLevel
    };

    // Store test
    this.tests.set(testId, test);
    this.saveTests();

    return { success: true, testId };
  }

  /**
   * Get test by ID
   */
  getTest(testId: string): ABTest | null {
    return this.tests.get(testId) || null;
  }

  /**
   * Get all tests
   */
  getAllTests(): ABTest[] {
    return Array.from(this.tests.values());
  }

  /**
   * Get active tests
   */
  getActiveTests(): ABTest[] {
    return Array.from(this.tests.values()).filter(test => 
      test.isActive && DateUtils.isWithinRange(test.startDate, test.endDate)
    );
  }

  /**
   * Update test configuration
   */
  updateTest(testId: string, updates: Partial<ABTest>): { success: boolean; errors?: string[] } {
    const test = this.tests.get(testId);
    if (!test) {
      return { success: false, errors: ['Test not found'] };
    }

    // Create updated test
    const updatedTest = { ...test, ...updates };

    // Validate updated test
    const validation = validateABTest(updatedTest);
    if (!validation.valid) {
      return { success: false, errors: validation.errors };
    }

    // Update test
    this.tests.set(testId, updatedTest);
    this.saveTests();

    return { success: true };
  }

  /**
   * Start test
   */
  startTest(testId: string): { success: boolean; errors?: string[] } {
    const test = this.tests.get(testId);
    if (!test) {
      return { success: false, errors: ['Test not found'] };
    }

    if (test.isActive) {
      return { success: false, errors: ['Test is already active'] };
    }

    // Update test status
    const updatedTest = {
      ...test,
      isActive: true,
      startDate: new Date()
    };

    this.tests.set(testId, updatedTest);
    this.saveTests();

    return { success: true };
  }

  /**
   * Stop test
   */
  stopTest(testId: string, reason?: string): { success: boolean; errors?: string[] } {
    const test = this.tests.get(testId);
    if (!test) {
      return { success: false, errors: ['Test not found'] };
    }

    if (!test.isActive) {
      return { success: false, errors: ['Test is not active'] };
    }

    // Update test status
    const updatedTest = {
      ...test,
      isActive: false,
      endDate: new Date()
    };

    this.tests.set(testId, updatedTest);
    this.saveTests();

    return { success: true };
  }

  /**
   * Delete test
   */
  deleteTest(testId: string): { success: boolean; errors?: string[] } {
    const test = this.tests.get(testId);
    if (!test) {
      return { success: false, errors: ['Test not found'] };
    }

    if (test.isActive) {
      return { success: false, errors: ['Cannot delete active test. Stop it first.'] };
    }

    // Remove test and related data
    this.tests.delete(testId);
    this.results = this.results.filter(r => r.testId !== testId);
    this.assignmentEngine.clearTestAssignments(testId);

    this.saveTests();
    this.saveResults();

    return { success: true };
  }

  /**
   * Record test result
   */
  recordResult(result: Omit<ABTestResult, 'timestamp'>): { success: boolean; errors?: string[] } {
    const test = this.tests.get(result.testId);
    if (!test) {
      return { success: false, errors: ['Test not found'] };
    }

    if (!test.isActive) {
      return { success: false, errors: ['Test is not active'] };
    }

    // Add timestamp and store result
    const fullResult: ABTestResult = {
      ...result,
      timestamp: Date.now()
    };

    this.results.push(fullResult);
    this.saveResults();

    return { success: true };
  }

  /**
   * Get test results
   */
  getTestResults(testId: string): ABTestResult[] {
    return this.results.filter(r => r.testId === testId);
  }

  /**
   * Get test analysis
   */
  getTestAnalysis(testId: string) {
    const test = this.tests.get(testId);
    if (!test) return null;

    const results = this.getTestResults(testId);
    const stats = this.statisticalAnalyzer.analyzeTest(test, results);
    const report = this.statisticalAnalyzer.generateReport(test, results);
    const assignmentStats = this.assignmentEngine.getAssignmentStats(testId);
    const balanceScore = this.assignmentEngine.calculateBalanceScore(test);

    return {
      test,
      stats,
      report,
      assignmentStats,
      balanceScore,
      totalResults: results.length
    };
  }

  /**
   * Get test dashboard data
   */
  getTestDashboard(testId: string) {
    const analysis = this.getTestAnalysis(testId);
    if (!analysis) return null;

    const { test, stats, assignmentStats } = analysis;

    // Calculate progress
    const totalSamples = stats.reduce((sum, s) => sum + s.sampleSize, 0);
    const progress = Math.min(100, (totalSamples / test.minimumSampleSize) * 100);

    // Determine test status
    let status: 'draft' | 'running' | 'completed' | 'stopped' = 'draft';
    if (test.isActive && DateUtils.isWithinRange(test.startDate, test.endDate)) {
      status = 'running';
    } else if (test.endDate && DateUtils.isPast(test.endDate)) {
      status = 'completed';
    } else if (!test.isActive && test.startDate) {
      status = 'stopped';
    }

    // Find leading variant
    const leadingVariant = stats.reduce((leader, current) => 
      current.conversionRate > leader.conversionRate ? current : leader
    );

    return {
      testId: test.id,
      name: test.name,
      status,
      progress,
      totalSamples,
      targetSamples: test.minimumSampleSize,
      leadingVariant: leadingVariant.variant,
      leadingConversionRate: leadingVariant.conversionRate,
      isSignificant: leadingVariant.isStatisticallySignificant,
      startDate: test.startDate,
      endDate: test.endDate,
      variants: stats.map(s => ({
        id: s.variant,
        name: test.variants.find(v => v.id === s.variant)?.name || s.variant,
        sampleSize: s.sampleSize,
        conversionRate: s.conversionRate,
        isSignificant: s.isStatisticallySignificant
      }))
    };
  }

  /**
   * Auto-stop tests that meet criteria
   */
  autoStopTests(): { stopped: string[]; reasons: Record<string, string> } {
    const stopped: string[] = [];
    const reasons: Record<string, string> = {};

    for (const test of this.getActiveTests()) {
      const analysis = this.getTestAnalysis(test.id);
      if (!analysis) continue;

      let shouldStop = false;
      let reason = '';

      // Check if test has reached end date
      if (test.endDate && DateUtils.isPast(test.endDate)) {
        shouldStop = true;
        reason = 'Test reached end date';
      }

      // Check if test has clear winner with sufficient confidence
      const significantVariants = analysis.stats.filter(s => s.isStatisticallySignificant);
      if (significantVariants.length > 0) {
        const totalSamples = analysis.stats.reduce((sum, s) => sum + s.sampleSize, 0);
        if (totalSamples >= test.minimumSampleSize * 1.5) { // 150% of minimum
          shouldStop = true;
          reason = 'Clear winner detected with sufficient confidence';
        }
      }

      if (shouldStop) {
        this.stopTest(test.id, reason);
        stopped.push(test.id);
        reasons[test.id] = reason;
      }
    }

    return { stopped, reasons };
  }

  /**
   * Get test recommendations
   */
  getTestRecommendations(testId: string): string[] {
    const analysis = this.getTestAnalysis(testId);
    if (!analysis) return ['Test not found'];

    const recommendations: string[] = [];
    const { test, stats, assignmentStats, balanceScore } = analysis;

    // Sample size recommendations
    const totalSamples = stats.reduce((sum, s) => sum + s.sampleSize, 0);
    if (totalSamples < test.minimumSampleSize) {
      const remaining = test.minimumSampleSize - totalSamples;
      recommendations.push(`Need ${remaining} more samples to reach minimum sample size`);
    }

    // Balance recommendations
    if (balanceScore.score < 0.9) {
      recommendations.push('Assignment distribution is unbalanced - consider adjusting traffic allocation');
    }

    // Statistical significance recommendations
    const significantVariants = stats.filter(s => s.isStatisticallySignificant);
    if (significantVariants.length === 0 && totalSamples >= test.minimumSampleSize) {
      recommendations.push('No statistically significant results yet - consider running test longer');
    }

    // Winner recommendations
    if (significantVariants.length > 0) {
      const winner = significantVariants.reduce((best, current) => 
        current.conversionRate > best.conversionRate ? current : best
      );
      recommendations.push(`Variant "${winner.variant}" is performing best - consider implementing as default`);
    }

    return recommendations;
  }

  /**
   * Export test data
   */
  exportTestData(testId?: string): {
    tests: ABTest[];
    results: ABTestResult[];
    assignments: any[];
  } {
    const tests = testId ? [this.getTest(testId)].filter(Boolean) as ABTest[] : this.getAllTests();
    const results = testId ? this.getTestResults(testId) : this.results;
    const assignments = this.assignmentEngine.exportAssignments(testId);

    return { tests, results, assignments };
  }

  /**
   * Clear all test data
   */
  clearAllData(): void {
    this.tests.clear();
    this.results = [];
    this.storage.clearAll();
  }
}

export default ABTestManager;
