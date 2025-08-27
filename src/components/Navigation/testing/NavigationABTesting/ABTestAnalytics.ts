/**
 * A/B Test Analytics - Analytics Integration
 * 
 * Handles all analytics tracking for A/B tests including
 * Vercel Analytics integration and custom event tracking.
 * 
 * @module ABTestAnalytics
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import { track } from '@vercel/analytics';
import type { ABTest, ABTestResult, ABTestVariant } from './types';

export class ABTestAnalytics {
  private enableAnalytics: boolean;
  private eventQueue: any[] = [];
  private batchSize: number = 10;
  private flushInterval: number = 5000; // 5 seconds

  constructor(enableAnalytics: boolean = true) {
    this.enableAnalytics = enableAnalytics;
    
    if (this.enableAnalytics) {
      this.startBatchProcessor();
    }
  }

  /**
   * Start batch processor for analytics events
   */
  private startBatchProcessor(): void {
    if (typeof window === 'undefined') return;

    setInterval(() => {
      this.flushEventQueue();
    }, this.flushInterval);
  }

  /**
   * Flush queued events to analytics
   */
  private flushEventQueue(): void {
    if (this.eventQueue.length === 0) return;

    const eventsToFlush = this.eventQueue.splice(0, this.batchSize);
    
    for (const event of eventsToFlush) {
      try {
        track(event.name, event.properties);
      } catch (error) {
        console.error('Failed to track analytics event:', error);
      }
    }
  }

  /**
   * Queue analytics event
   */
  private queueEvent(name: string, properties: Record<string, any>): void {
    if (!this.enableAnalytics) return;

    this.eventQueue.push({
      name,
      properties: {
        ...properties,
        timestamp: Date.now()
      }
    });

    // Flush immediately if queue is full
    if (this.eventQueue.length >= this.batchSize) {
      this.flushEventQueue();
    }
  }

  /**
   * Track test creation
   */
  trackTestCreated(test: ABTest): void {
    this.queueEvent('navigation_ab_test_created', {
      test_id: test.id,
      test_name: test.name,
      variants_count: test.variants.length,
      target_metric: test.target_metric || test.targetMetric,
      minimum_sample_size: test.minimumSampleSize,
      confidence_level: test.confidenceLevel
    });
  }

  /**
   * Track test started
   */
  trackTestStarted(test: ABTest): void {
    this.queueEvent('navigation_ab_test_started', {
      test_id: test.id,
      test_name: test.name,
      start_date: test.startDate.toISOString(),
      variants: test.variants.map(v => ({
        id: v.id,
        name: v.name,
        weight: v.weight
      }))
    });
  }

  /**
   * Track test stopped
   */
  trackTestStopped(test: ABTest, reason?: string): void {
    this.queueEvent('navigation_ab_test_stopped', {
      test_id: test.id,
      test_name: test.name,
      end_date: test.endDate?.toISOString() || new Date().toISOString(),
      reason: reason || 'manual_stop',
      duration_days: test.endDate && test.startDate ? 
        Math.ceil((test.endDate.getTime() - test.startDate.getTime()) / (1000 * 60 * 60 * 24)) : 0
    });
  }

  /**
   * Track user assignment to variant
   */
  trackAssignment(test: ABTest, variant: ABTestVariant, userId: string): void {
    this.queueEvent('navigation_ab_assignment', {
      test_id: test.id,
      test_name: test.name,
      variant_id: variant.id,
      variant_name: variant.name,
      user_id: userId,
      variant_weight: variant.weight
    });
  }

  /**
   * Track conversion event
   */
  trackConversion(result: ABTestResult): void {
    this.queueEvent('navigation_ab_conversion', {
      test_id: result.testId,
      variant_id: result.variantId,
      metric: result.metric,
      value: result.value,
      user_id: result.userId || 'anonymous',
      session_id: result.sessionId || 'unknown'
    });
  }

  /**
   * Track test winner declaration
   */
  trackWinnerDeclared(test: ABTest, winnerVariant: ABTestVariant, stats: any): void {
    this.queueEvent('navigation_ab_winner_declared', {
      test_id: test.id,
      test_name: test.name,
      winner_variant_id: winnerVariant.id,
      winner_variant_name: winnerVariant.name,
      conversion_rate: stats.conversionRate,
      sample_size: stats.sampleSize,
      confidence_level: test.confidenceLevel,
      p_value: stats.pValue
    });
  }

  /**
   * Track test analysis request
   */
  trackAnalysisRequest(testId: string, analysisType: string): void {
    this.queueEvent('navigation_ab_analysis_requested', {
      test_id: testId,
      analysis_type: analysisType
    });
  }

  /**
   * Track test configuration change
   */
  trackConfigurationChange(testId: string, changes: Record<string, any>): void {
    this.queueEvent('navigation_ab_config_changed', {
      test_id: testId,
      changes: Object.keys(changes),
      change_count: Object.keys(changes).length
    });
  }

  /**
   * Track test error
   */
  trackError(testId: string, errorType: string, errorMessage: string): void {
    this.queueEvent('navigation_ab_error', {
      test_id: testId,
      error_type: errorType,
      error_message: errorMessage
    });
  }

  /**
   * Track performance metrics
   */
  trackPerformance(testId: string, metrics: {
    assignmentTime?: number;
    renderTime?: number;
    interactionTime?: number;
  }): void {
    this.queueEvent('navigation_ab_performance', {
      test_id: testId,
      assignment_time_ms: metrics.assignmentTime,
      render_time_ms: metrics.renderTime,
      interaction_time_ms: metrics.interactionTime
    });
  }

  /**
   * Track user behavior in test
   */
  trackUserBehavior(testId: string, variantId: string, behavior: {
    action: string;
    element?: string;
    value?: number;
    metadata?: Record<string, any>;
  }): void {
    this.queueEvent('navigation_ab_user_behavior', {
      test_id: testId,
      variant_id: variantId,
      action: behavior.action,
      element: behavior.element,
      value: behavior.value,
      metadata: behavior.metadata
    });
  }

  /**
   * Track test milestone
   */
  trackMilestone(testId: string, milestone: string, data?: Record<string, any>): void {
    this.queueEvent('navigation_ab_milestone', {
      test_id: testId,
      milestone,
      ...data
    });
  }

  /**
   * Generate analytics report
   */
  generateAnalyticsReport(testId: string, results: ABTestResult[]): {
    totalEvents: number;
    conversionsByVariant: Record<string, number>;
    averageValue: number;
    uniqueUsers: number;
    sessionCount: number;
    timeRange: { start: number; end: number };
  } {
    const testResults = results.filter(r => r.testId === testId);
    
    const conversionsByVariant: Record<string, number> = {};
    const uniqueUsers = new Set<string>();
    const sessions = new Set<string>();
    let totalValue = 0;
    let minTime = Infinity;
    let maxTime = 0;

    for (const result of testResults) {
      conversionsByVariant[result.variantId] = (conversionsByVariant[result.variantId] || 0) + 1;
      totalValue += result.value;
      
      if (result.userId) uniqueUsers.add(result.userId);
      if (result.sessionId) sessions.add(result.sessionId);
      
      minTime = Math.min(minTime, result.timestamp);
      maxTime = Math.max(maxTime, result.timestamp);
    }

    return {
      totalEvents: testResults.length,
      conversionsByVariant,
      averageValue: testResults.length > 0 ? totalValue / testResults.length : 0,
      uniqueUsers: uniqueUsers.size,
      sessionCount: sessions.size,
      timeRange: {
        start: minTime === Infinity ? 0 : minTime,
        end: maxTime
      }
    };
  }

  /**
   * Track custom event with test context
   */
  trackCustomEvent(
    eventName: string, 
    testId: string, 
    variantId: string, 
    properties: Record<string, any> = {}
  ): void {
    this.queueEvent(`navigation_ab_custom_${eventName}`, {
      test_id: testId,
      variant_id: variantId,
      ...properties
    });
  }

  /**
   * Set up automatic page view tracking for test variants
   */
  setupPageViewTracking(testId: string, variantId: string): void {
    if (typeof window === 'undefined') return;

    // Track initial page view
    this.trackCustomEvent('page_view', testId, variantId, {
      url: window.location.href,
      referrer: document.referrer,
      user_agent: navigator.userAgent
    });

    // Track page visibility changes
    const handleVisibilityChange = () => {
      this.trackCustomEvent('visibility_change', testId, variantId, {
        hidden: document.hidden,
        visibility_state: document.visibilityState
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }

  /**
   * Enable/disable analytics
   */
  setAnalyticsEnabled(enabled: boolean): void {
    this.enableAnalytics = enabled;
    
    if (!enabled) {
      this.eventQueue = []; // Clear queue
    }
  }

  /**
   * Get analytics status
   */
  getAnalyticsStatus(): {
    enabled: boolean;
    queueSize: number;
    batchSize: number;
    flushInterval: number;
  } {
    return {
      enabled: this.enableAnalytics,
      queueSize: this.eventQueue.length,
      batchSize: this.batchSize,
      flushInterval: this.flushInterval
    };
  }

  /**
   * Force flush all queued events
   */
  forceFlush(): void {
    while (this.eventQueue.length > 0) {
      this.flushEventQueue();
    }
  }

  /**
   * Clear event queue
   */
  clearQueue(): void {
    this.eventQueue = [];
  }
}

export default ABTestAnalytics;
