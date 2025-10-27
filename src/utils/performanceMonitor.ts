  /**
   * Performance Monitor - Enterprise Grade
   * 
   * Comprehensive performance monitoring system for tracking Core Web Vitals,
   * custom metrics, and performance analytics across the SmarterPayouts application.
   * 
   * @module PerformanceMonitor
   * @author SmarterPayouts Team
   * @since 2024
   * @version 2.0.0
   */
  
  import { onCLS, onFID, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';
  
  // Global type declarations for external libraries
  declare global {
    const Sentry: {
      captureException: (error: Error, context?: any) => void;
    };
  }

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  id?: string;
  navigationType?: string;
}

export interface PerformanceConfig {
  enableCoreWebVitals: boolean;
  enableCustomMetrics: boolean;
  enableRealTimeMonitoring: boolean;
  enablePerformanceBudget: boolean;
  enableErrorTracking: boolean;
  performanceBudget: {
    LCP: number; // 2.5s
    FID: number; // 100ms
    CLS: number; // 0.1
    FCP: number; // 1.8s
    TTFB: number; // 800ms
  };
}

export interface CustomMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private config: PerformanceConfig;
  private metrics: Map<string, PerformanceMetric> = new Map();
  private customMetrics: CustomMetric[] = [];
  private observers: Set<(metric: PerformanceMetric) => void> = new Set();
  private performanceBudget: PerformanceConfig['performanceBudget'];

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = {
      enableCoreWebVitals: true,
      enableCustomMetrics: true,
      enableRealTimeMonitoring: true,
      enablePerformanceBudget: true,
      enableErrorTracking: true,
      performanceBudget: {
        LCP: 2500,
        FID: 100,
        CLS: 0.1,
        FCP: 1800,
        TTFB: 800,
      },
      ...config,
    };

    this.performanceBudget = this.config.performanceBudget;
    this.initialize();
  }

  /**
   * Initialize performance monitoring
   */
  private initialize(): void {
    // Only initialize in browser environment
    if (typeof window === 'undefined') {
      console.log('PerformanceMonitor: Skipping initialization (server-side)');
      return;
    }

    if (this.config.enableCoreWebVitals) {
      this.initializeCoreWebVitals();
    }

    if (this.config.enableRealTimeMonitoring) {
      this.initializeRealTimeMonitoring();
    }

    if (this.config.enablePerformanceBudget) {
      this.initializePerformanceBudget();
    }

    // Report initial performance data
    this.reportInitialPerformance();
  }

  /**
   * Initialize Core Web Vitals monitoring
   */
  private initializeCoreWebVitals(): void {
    // Largest Contentful Paint (LCP)
    onLCP((metric: any) => {
      this.trackMetric('LCP', metric.value, this.getRating(metric.value, this.performanceBudget.LCP));
    });

    // First Input Delay (FID)
    onFID((metric: any) => {
      this.trackMetric('FID', metric.value, this.getRating(metric.value, this.performanceBudget.FID));
    });

    // Cumulative Layout Shift (CLS)
    onCLS((metric: any) => {
      this.trackMetric('CLS', metric.value, this.getRating(metric.value, this.performanceBudget.CLS));
    });

    // First Contentful Paint (FCP)
    onFCP((metric: any) => {
      this.trackMetric('FCP', metric.value, this.getRating(metric.value, this.performanceBudget.FCP));
    });

    // Time to First Byte (TTFB)
    onTTFB((metric: any) => {
      this.trackMetric('TTFB', metric.value, this.getRating(metric.value, this.performanceBudget.TTFB));
    });
  }

  /**
   * Initialize real-time performance monitoring
   */
  private initializeRealTimeMonitoring(): void {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Tasks longer than 50ms
            this.trackCustomMetric('LongTask', entry.duration, 'ms', {
              startTime: entry.startTime,
              name: entry.name,
              entryType: entry.entryType,
            });
          }
        }
      });

      try {
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.warn('Long task monitoring not supported:', e);
      }

           // Monitor layout shifts
       const layoutShiftObserver = new PerformanceObserver((list) => {
         for (const entry of list.getEntries()) {
           const layoutShiftEntry = entry as any; // Type assertion for layout-shift entries
           if (layoutShiftEntry.hadRecentInput) continue;
           
           this.trackCustomMetric('LayoutShift', layoutShiftEntry.value, 'score', {
             sources: layoutShiftEntry.sources,
             startTime: layoutShiftEntry.startTime,
           });
         }
       });

      try {
        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('Layout shift monitoring not supported:', e);
      }
    }
  }

  /**
   * Initialize performance budget monitoring
   */
  private initializePerformanceBudget(): void {
    // Monitor performance budget violations
    this.observers.add((metric) => {
      if (metric.rating === 'poor') {
        this.reportPerformanceBudgetViolation(metric);
      }
    });
  }

  /**
   * Track a performance metric
   */
  private trackMetric(name: string, value: number, rating: PerformanceMetric['rating']): void {
    const metric: PerformanceMetric = {
      name,
      value,
      rating,
      id: `${name}-${Date.now()}`,
      navigationType: this.getNavigationType(),
    };

    this.metrics.set(metric.id!, metric);
    this.notifyObservers(metric);
    this.sendToAnalytics(metric);
  }

  /**
   * Track a custom performance metric
   */
  public trackCustomMetric(
    name: string,
    value: number,
    unit: string,
    metadata?: Record<string, any>
  ): void {
    const metric: CustomMetric = {
      name,
      value,
      unit,
      timestamp: Date.now(),
      metadata,
    };

    this.customMetrics.push(metric);
    this.sendCustomMetricToAnalytics(metric);
  }

  /**
   * Get performance rating based on thresholds
   */
  private getRating(value: number, threshold: number): PerformanceMetric['rating'] {
    if (value <= threshold) return 'good';
    if (value <= threshold * 1.5) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Get navigation type
   */
  private getNavigationType(): string {
    if (typeof window === 'undefined' || typeof performance === 'undefined') {
      return 'unknown';
    }
    if ('navigation' in performance) {
      return (performance as any).navigation.type;
    }
    return 'unknown';
  }

  /**
   * Report initial performance data
   */
  private reportInitialPerformance(): void {
    // Only run in browser
    if (typeof window === 'undefined' || typeof performance === 'undefined') return;
    
    // Report navigation timing
    if ('navigation' in performance) {
      const nav = (performance as any).navigation;
      this.trackCustomMetric('NavigationStart', nav.startTime, 'ms');
      this.trackCustomMetric('NavigationEnd', nav.loadEventEnd - nav.loadEventStart, 'ms');
    }

    // Report resource timing
    if ('getEntriesByType' in performance) {
      const resources = performance.getEntriesByType('resource');
      resources.forEach((resource: any) => {
        this.trackCustomMetric('ResourceLoad', resource.duration, 'ms', {
          name: resource.name,
          initiatorType: resource.initiatorType,
        });
      });
    }
  }

  /**
   * Report performance budget violation
   */
  private reportPerformanceBudgetViolation(metric: PerformanceMetric): void {
    console.warn(`Performance budget violated: ${metric.name} = ${metric.value} (${metric.rating})`);
    
    // Send to error tracking service
    if (this.config.enableErrorTracking) {
      this.sendErrorToTracking({
        type: 'performance_budget_violation',
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
      });
    }
  }

  /**
   * Add performance observer
   */
  public addObserver(callback: (metric: PerformanceMetric) => void): () => void {
    this.observers.add(callback);
    
    return () => {
      this.observers.delete(callback);
    };
  }

  /**
   * Notify all observers
   */
  private notifyObservers(metric: PerformanceMetric): void {
    this.observers.forEach(callback => {
      try {
        callback(metric);
      } catch (error) {
        console.error('Error in performance observer:', error);
      }
    });
  }

  /**
   * Send metric to analytics
   */
  private sendToAnalytics(metric: PerformanceMetric): void {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Google Analytics 4
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'performance_metric', {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_rating: metric.rating,
        navigation_type: metric.navigationType,
      } as any);
    }

    // Custom analytics endpoint
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'performance_metric',
          data: metric,
          timestamp: Date.now(),
        }),
      }).catch(console.error);
    }
  }

  /**
   * Send custom metric to analytics
   */
  private sendCustomMetricToAnalytics(metric: CustomMetric): void {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'custom_performance_metric', {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_unit: metric.unit,
        metadata: metric.metadata,
      } as any);
    }
  }

  /**
   * Send error to tracking service
   */
  private sendErrorToTracking(error: any): void {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Sentry integration
    if (typeof Sentry !== 'undefined') {
      Sentry.captureException(new Error(`Performance: ${error.metric} = ${error.value}`), {
        tags: {
          type: 'performance',
          metric: error.metric,
          rating: error.rating,
        },
        extra: error,
      });
    }

    // Custom error endpoint
    if (process.env.NEXT_PUBLIC_ERROR_TRACKING_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ERROR_TRACKING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error),
      }).catch(console.error);
    }
  }

  /**
   * Get all performance metrics
   */
  public getMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Get custom metrics
   */
  public getCustomMetrics(): CustomMetric[] {
    return [...this.customMetrics];
  }

  /**
   * Get performance summary
   */
  public getPerformanceSummary(): {
    coreWebVitals: Record<string, PerformanceMetric>;
    customMetrics: CustomMetric[];
    overallScore: number;
  } {
    const coreWebVitals: Record<string, PerformanceMetric> = {};
    
    // Get latest Core Web Vitals
    ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'].forEach(name => {
      const metrics = this.getMetrics().filter(m => m.name === name);
      if (metrics.length > 0) {
        coreWebVitals[name] = metrics[metrics.length - 1];
      }
    });

         // Calculate overall score
     const scores = Object.values(coreWebVitals).map(metric => {
       switch (metric.rating) {
         case 'good': return 100;
         case 'needs-improvement': return 50;
         case 'poor': return 0;
         default: return 0;
       }
     });
 
     const overallScore = scores.length > 0 ? scores.reduce((a: number, b: number) => a + b, 0) / scores.length : 0;

    return {
      coreWebVitals,
      customMetrics: this.getCustomMetrics(),
      overallScore: Math.round(overallScore),
    };
  }

  /**
   * Reset all metrics
   */
  public reset(): void {
    this.metrics.clear();
    this.customMetrics = [];
  }
}

 // Export singleton instance
 export const performanceMonitor = new PerformanceMonitor();
 
 // Export class for direct instantiation
 export { PerformanceMonitor };
