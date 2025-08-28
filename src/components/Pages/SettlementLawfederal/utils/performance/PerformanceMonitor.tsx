// Settlement Law Federal - Performance Monitor Module
// Following enterprise patterns - core performance monitoring logic

import { PERFORMANCE_THRESHOLDS, FEATURE_FLAGS } from '../constants';
import { SettlementLawAnalytics } from '../analytics';

/**
 * Performance Monitor Module
 * Handles core performance tracking and metrics collection
 */
export class PerformanceMonitor {
  private static performanceMetrics: Map<string, number> = new Map();

  /**
   * Initialize performance monitoring
   */
  static initializePerformanceMonitoring() {
    if (!FEATURE_FLAGS.enablePerformanceMonitoring || typeof window === 'undefined') {
      return;
    }

    // Track page load performance
    this.trackPageLoadMetrics();

    // Setup performance observer
    this.setupPerformanceObserver();

    if (FEATURE_FLAGS.enableVerboseLogging) {
      console.log('⚡ Performance monitoring initialized for Settlement Law Federal');
    }
  }

  /**
   * Track page load metrics
   */
  static trackPageLoadMetrics() {
    if (typeof window === 'undefined') return;

    const startTime = performance.now();

    // Track when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const domTime = performance.now() - startTime;
        this.performanceMetrics.set('domContentLoaded', domTime);
        
        if (FEATURE_FLAGS.enableVerboseLogging) {
          console.log(`⚡ Settlement Law DOM loaded in ${domTime.toFixed(2)}ms`);
        }
      });
    }

    // Track when page is fully loaded
    window.addEventListener('load', () => {
      const loadTime = performance.now() - startTime;
      this.performanceMetrics.set('pageLoadTime', loadTime);

      // Get navigation timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.performanceMetrics.set('firstByte', navigation.responseStart - navigation.fetchStart);
        this.performanceMetrics.set('domInteractive', navigation.domInteractive - navigation.fetchStart);
        this.performanceMetrics.set('domComplete', navigation.domComplete - navigation.fetchStart);
      }

      // Report metrics
      this.reportPerformanceMetrics();

      if (FEATURE_FLAGS.enableVerboseLogging) {
        console.log(`⚡ Settlement Law page loaded in ${loadTime.toFixed(2)}ms`);
      }
    });
  }

  /**
   * Setup performance observer for custom metrics
   */
  static setupPerformanceObserver() {
    if (typeof window === 'undefined' || !window.PerformanceObserver) {
      return;
    }

    try {
      // Observe paint metrics
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.performanceMetrics.set('fcp', entry.startTime);
          } else if (entry.name === 'largest-contentful-paint') {
            this.performanceMetrics.set('lcp', entry.startTime);
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });

      // Observe layout shifts
      const layoutShiftObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        if (clsValue > 0) {
          this.performanceMetrics.set('cls', clsValue);
        }
      });
      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });

      // Observe long tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(2)}ms`);
            SettlementLawAnalytics.trackError(
              `Long task detected: ${entry.duration.toFixed(2)}ms`,
              { component: 'PerformanceMonitor', severity: 'medium' }
            );
          }
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });

    } catch (error) {
      console.warn('Failed to setup performance observer:', error);
    }
  }

  /**
   * Report all performance metrics
   */
  private static reportPerformanceMetrics() {
    const metrics: Record<string, number> = {};
    
    this.performanceMetrics.forEach((value, key) => {
      metrics[key] = value;
    });

    // Calculate performance score
    const score = this.calculatePerformanceScore(metrics);
    metrics.performanceScore = score;

    // Report to analytics
    SettlementLawAnalytics.trackPerformance(metrics);

    if (FEATURE_FLAGS.enableVerboseLogging) {
      console.log('⚡ Settlement Law Performance Metrics:', {
        pageLoadTime: `${metrics.pageLoadTime?.toFixed(2)}ms`,
        domContentLoaded: `${metrics.domContentLoaded?.toFixed(2)}ms`,
        firstByte: `${metrics.firstByte?.toFixed(2)}ms`,
        performanceScore: `${score}/100`
      });
    }
  }

  /**
   * Calculate overall performance score
   */
  private static calculatePerformanceScore(metrics: Record<string, number>): number {
    let score = 100;
    let penalties = 0;

    // Page load time penalty
    if (metrics.pageLoadTime > PERFORMANCE_THRESHOLDS.pageLoadTime) {
      penalties += Math.min(30, (metrics.pageLoadTime - PERFORMANCE_THRESHOLDS.pageLoadTime) / 100);
    }

    // DOM content loaded penalty
    if (metrics.domContentLoaded > PERFORMANCE_THRESHOLDS.domContentLoaded) {
      penalties += Math.min(20, (metrics.domContentLoaded - PERFORMANCE_THRESHOLDS.domContentLoaded) / 50);
    }

    // First byte penalty
    if (metrics.firstByte > PERFORMANCE_THRESHOLDS.ttfb) {
      penalties += Math.min(15, (metrics.firstByte - PERFORMANCE_THRESHOLDS.ttfb) / 20);
    }

    // LCP penalty
    if (metrics.lcp > PERFORMANCE_THRESHOLDS.lcp) {
      penalties += Math.min(20, (metrics.lcp - PERFORMANCE_THRESHOLDS.lcp) / 100);
    }

    // FID penalty
    if (metrics.fid > PERFORMANCE_THRESHOLDS.fid) {
      penalties += Math.min(10, (metrics.fid - PERFORMANCE_THRESHOLDS.fid) / 10);
    }

    // CLS penalty
    if (metrics.cls > PERFORMANCE_THRESHOLDS.cls) {
      penalties += Math.min(15, (metrics.cls - PERFORMANCE_THRESHOLDS.cls) * 100);
    }

    return Math.max(0, Math.round(score - penalties));
  }

  /**
   * Get current performance metrics
   */
  static getPerformanceMetrics(): Record<string, number> {
    const metrics: Record<string, number> = {};
    this.performanceMetrics.forEach((value, key) => {
      metrics[key] = value;
    });
    return metrics;
  }

  /**
   * Get performance score
   */
  static getPerformanceScore(): number {
    const metrics = this.getPerformanceMetrics();
    return this.calculatePerformanceScore(metrics);
  }

  /**
   * Clear all metrics
   */
  static clearMetrics() {
    this.performanceMetrics.clear();
  }
}
