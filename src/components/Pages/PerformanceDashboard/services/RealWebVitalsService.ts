/**
 * Real Web Vitals Service - No Fake Data
 * 
 * Integrates with actual browser Performance API and web-vitals library
 * to provide REAL performance metrics, not simulated data.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export interface RealMetric {
  name: string;
  value: number;
  unit: string;
  change: number;
  status: 'good' | 'needs-improvement' | 'poor';
  icon: string;
  timestamp: number;
}

interface RealWebVitalsData {
  fcp: RealMetric | null;
  lcp: RealMetric | null;
  cls: RealMetric | null;
  fid: RealMetric | null;
  ttfb: RealMetric | null;
}

export class RealWebVitalsService {
  private metrics: RealWebVitalsData = {
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null
  };

  private listeners: Array<(metrics: RealWebVitalsData) => void> = [];

  /**
   * Initialize real Web Vitals tracking
   */
  async initialize(): Promise<void> {
    if (typeof window === 'undefined') {
      console.warn('RealWebVitalsService: Not in browser environment');
      return;
    }

    console.log('🚀 Initializing REAL Web Vitals tracking...');

    // Track First Contentful Paint
    getCLS((metric) => {
      this.metrics.cls = {
        name: 'Cumulative Layout Shift',
        value: Math.round(metric.value * 1000) / 1000,
        unit: '',
        change: 0, // Cannot calculate change from single measurement
        status: this.getMetricStatus('CLS', metric.value),
        icon: '📐',
        timestamp: Date.now()
      };
      this.notifyListeners();
    });

    // Track First Input Delay
    getFID((metric) => {
      this.metrics.fid = {
        name: 'First Input Delay',
        value: Math.round(metric.value),
        unit: 'ms',
        change: 0, // Cannot calculate change from single measurement
        status: this.getMetricStatus('FID', metric.value),
        icon: '👆',
        timestamp: Date.now()
      };
      this.notifyListeners();
    });

    // Track First Contentful Paint
    getFCP((metric) => {
      this.metrics.fcp = {
        name: 'First Contentful Paint',
        value: Math.round(metric.value),
        unit: 'ms',
        change: 0, // Cannot calculate change from single measurement
        status: this.getMetricStatus('FCP', metric.value),
        icon: '🎨',
        timestamp: Date.now()
      };
      this.notifyListeners();
    });

    // Track Largest Contentful Paint
    getLCP((metric) => {
      this.metrics.lcp = {
        name: 'Largest Contentful Paint',
        value: Math.round(metric.value),
        unit: 'ms',
        change: 0, // Cannot calculate change from single measurement
        status: this.getMetricStatus('LCP', metric.value),
        icon: '🖼️',
        timestamp: Date.now()
      };
      this.notifyListeners();
    });

    // Track Time to First Byte
    getTTFB((metric) => {
      this.metrics.ttfb = {
        name: 'Time to First Byte',
        value: Math.round(metric.value),
        unit: 'ms',
        change: 0, // Cannot calculate change from single measurement
        status: this.getMetricStatus('TTFB', metric.value),
        icon: '⚡',
        timestamp: Date.now()
      };
      this.notifyListeners();
    });

    console.log('✅ Real Web Vitals tracking initialized');
  }

  /**
   * Get current real metrics
   */
  getCurrentMetrics(): RealWebVitalsData {
    return { ...this.metrics };
  }

  /**
   * Subscribe to metric updates
   */
  subscribe(callback: (metrics: RealWebVitalsData) => void): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Get additional browser performance metrics
   */
  getBrowserMetrics() {
    if (typeof window === 'undefined' || !window.performance) {
      return null;
    }

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');

    if (!navigation) return null;

    return {
      domContentLoaded: {
        name: 'DOM Content Loaded',
        value: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
        unit: 'ms',
        change: 0, // Cannot calculate change from single measurement
        status: this.getMetricStatus('DOM', navigation.domContentLoadedEventEnd - navigation.fetchStart),
        icon: '🏗️',
        timestamp: Date.now()
      },
      pageLoad: {
        name: 'Page Load Complete',
        value: Math.round(navigation.loadEventEnd - navigation.fetchStart),
        unit: 'ms',
        change: 0, // Cannot calculate change from single measurement
        status: this.getMetricStatus('LOAD', navigation.loadEventEnd - navigation.fetchStart),
        icon: '🚀',
        timestamp: Date.now()
      },
      firstPaint: paint.find(p => p.name === 'first-paint') ? {
        name: 'First Paint',
        value: Math.round(paint.find(p => p.name === 'first-paint')!.startTime),
        unit: 'ms',
        change: 0, // Cannot calculate change from single measurement
        status: this.getMetricStatus('FP', paint.find(p => p.name === 'first-paint')!.startTime),
        icon: '🎨',
        timestamp: Date.now()
      } : null
    };
  }

  /**
   * Get memory usage (if available)
   */
  getMemoryMetrics() {
    if (typeof window === 'undefined' || !(performance as any).memory) {
      return null;
    }

    const memory = (performance as any).memory;
    return {
      usedJSHeapSize: {
        name: 'Used JS Heap Size',
        value: Math.round(memory.usedJSHeapSize / 1024 / 1024 * 100) / 100,
        unit: 'MB',
        change: 0, // Cannot calculate change from single measurement
        status: 'good' as const,
        icon: '🧠',
        timestamp: Date.now()
      },
      totalJSHeapSize: {
        name: 'Total JS Heap Size',
        value: Math.round(memory.totalJSHeapSize / 1024 / 1024 * 100) / 100,
        unit: 'MB',
        change: 0, // Cannot calculate change from single measurement
        status: 'good' as const,
        icon: '💾',
        timestamp: Date.now()
      }
    };
  }

  /**
   * Determine metric status based on Web Vitals thresholds
   */
  private getMetricStatus(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      TTFB: { good: 800, poor: 1800 },
      DOM: { good: 1500, poor: 3000 },
      LOAD: { good: 3000, poor: 5000 },
      FP: { good: 1000, poor: 2000 }
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Notify all listeners of metric updates
   */
  private notifyListeners(): void {
    this.listeners.forEach(callback => callback(this.getCurrentMetrics()));
  }
}

// Export singleton instance
export const realWebVitalsService = new RealWebVitalsService();
