// Settlement Law Federal - Web Vitals Tracker Module
// Following enterprise patterns - Web Vitals specific tracking

import { PERFORMANCE_THRESHOLDS, FEATURE_FLAGS } from '../constants';
import { SettlementLawAnalytics } from '../analytics';

/**
 * Web Vitals Tracker Module
 * Handles Core Web Vitals tracking and reporting
 */
export class WebVitalsTracker {
  private static webVitalsMetrics: Map<string, number> = new Map();

  /**
   * Initialize Web Vitals tracking
   */
  static async initializeWebVitals() {
    if (!FEATURE_FLAGS.enableWebVitals || typeof window === 'undefined') {
      return;
    }

    try {
      // Dynamic import to avoid blocking initial load
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');

      // Track Core Web Vitals
      getCLS((metric) => {
        this.webVitalsMetrics.set('cls', metric.value);
        this.reportWebVital('CLS', metric.value, PERFORMANCE_THRESHOLDS.cls);
      });

      getFID((metric) => {
        this.webVitalsMetrics.set('fid', metric.value);
        this.reportWebVital('FID', metric.value, PERFORMANCE_THRESHOLDS.fid);
      });

      getFCP((metric) => {
        this.webVitalsMetrics.set('fcp', metric.value);
        this.reportWebVital('FCP', metric.value, PERFORMANCE_THRESHOLDS.fcp);
      });

      getLCP((metric) => {
        this.webVitalsMetrics.set('lcp', metric.value);
        this.reportWebVital('LCP', metric.value, PERFORMANCE_THRESHOLDS.lcp);
      });

      getTTFB((metric) => {
        this.webVitalsMetrics.set('ttfb', metric.value);
        this.reportWebVital('TTFB', metric.value, PERFORMANCE_THRESHOLDS.ttfb);
      });

      if (FEATURE_FLAGS.enableVerboseLogging) {
        console.log('⚡ Web Vitals tracking initialized for Settlement Law Federal');
      }
    } catch (error) {
      console.warn('Failed to initialize Web Vitals:', error);
    }
  }

  /**
   * Report Web Vital metric
   */
  private static reportWebVital(name: string, value: number, threshold: number) {
    const isGood = value <= threshold;
    const status = isGood ? '✅' : '⚠️';
    
    if (FEATURE_FLAGS.enableVerboseLogging) {
      console.log(`${status} ${name}: ${value.toFixed(2)}ms (threshold: ${threshold}ms)`);
    }

    // Report to analytics
    const metrics: Record<string, number> = {};
    metrics[name.toLowerCase()] = value;
    SettlementLawAnalytics.trackPerformance(metrics);
  }

  /**
   * Get Web Vitals metrics
   */
  static getWebVitalsMetrics(): Record<string, number> {
    const metrics: Record<string, number> = {};
    this.webVitalsMetrics.forEach((value, key) => {
      metrics[key] = value;
    });
    return metrics;
  }

  /**
   * Get Web Vitals score
   */
  static getWebVitalsScore(): number {
    const metrics = this.getWebVitalsMetrics();
    let score = 100;
    let penalties = 0;

    // Calculate penalties for each metric
    if (metrics.lcp > PERFORMANCE_THRESHOLDS.lcp) {
      penalties += 20;
    }
    if (metrics.fid > PERFORMANCE_THRESHOLDS.fid) {
      penalties += 20;
    }
    if (metrics.cls > PERFORMANCE_THRESHOLDS.cls) {
      penalties += 20;
    }
    if (metrics.fcp > PERFORMANCE_THRESHOLDS.fcp) {
      penalties += 20;
    }
    if (metrics.ttfb > PERFORMANCE_THRESHOLDS.ttfb) {
      penalties += 20;
    }

    return Math.max(0, score - penalties);
  }

  /**
   * Clear Web Vitals metrics
   */
  static clearWebVitals() {
    this.webVitalsMetrics.clear();
  }

  /**
   * Get Web Vitals summary for dashboard
   */
  static getWebVitalsSummary(): {
    lcp: { value: number; status: 'good' | 'needs-improvement' | 'poor' };
    fid: { value: number; status: 'good' | 'needs-improvement' | 'poor' };
    cls: { value: number; status: 'good' | 'needs-improvement' | 'poor' };
    fcp: { value: number; status: 'good' | 'needs-improvement' | 'poor' };
    ttfb: { value: number; status: 'good' | 'needs-improvement' | 'poor' };
    overallScore: number;
  } {
    const metrics = this.getWebVitalsMetrics();
    
    const getStatus = (value: number, goodThreshold: number, poorThreshold: number): 'good' | 'needs-improvement' | 'poor' => {
      if (value <= goodThreshold) return 'good';
      if (value <= poorThreshold) return 'needs-improvement';
      return 'poor';
    };

    return {
      lcp: {
        value: metrics.lcp || 0,
        status: getStatus(metrics.lcp || 0, 2500, 4000)
      },
      fid: {
        value: metrics.fid || 0,
        status: getStatus(metrics.fid || 0, 100, 300)
      },
      cls: {
        value: metrics.cls || 0,
        status: getStatus(metrics.cls || 0, 0.1, 0.25)
      },
      fcp: {
        value: metrics.fcp || 0,
        status: getStatus(metrics.fcp || 0, 1800, 3000)
      },
      ttfb: {
        value: metrics.ttfb || 0,
        status: getStatus(metrics.ttfb || 0, 800, 1800)
      },
      overallScore: this.getWebVitalsScore()
    };
  }
}
