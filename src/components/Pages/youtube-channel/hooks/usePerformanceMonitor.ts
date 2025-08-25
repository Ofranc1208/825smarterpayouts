'use client';

import { useEffect, useCallback, useRef } from 'react';

/**
 * Performance Monitor Hook for YouTube Channel
 * 
 * Monitors Core Web Vitals and performance metrics for the YouTube Channel page.
 * Provides real-time performance tracking and optimization insights.
 * 
 * @hook usePerformanceMonitor
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Enterprise Edition
 */

interface PerformanceMetrics {
  /** First Contentful Paint */
  fcp?: number;
  /** Largest Contentful Paint */
  lcp?: number;
  /** First Input Delay */
  fid?: number;
  /** Cumulative Layout Shift */
  cls?: number;
  /** Time to First Byte */
  ttfb?: number;
  /** Page load time */
  loadTime?: number;
  /** Component mount time */
  mountTime?: number;
}

interface UsePerformanceMonitorOptions {
  /** Enable Core Web Vitals monitoring */
  enableWebVitals?: boolean;
  /** Enable custom metrics */
  enableCustomMetrics?: boolean;
  /** Enable performance logging */
  enableLogging?: boolean;
  /** Component name for tracking */
  componentName?: string;
}

/**
 * Performance Monitor Hook
 * 
 * ## Features
 * - ✅ Core Web Vitals monitoring (FCP, LCP, FID, CLS, TTFB)
 * - ✅ Custom performance metrics
 * - ✅ Real-time performance tracking
 * - ✅ Performance optimization insights
 * - ✅ Analytics integration
 * 
 * ## Metrics Tracked
 * - **FCP**: First Contentful Paint
 * - **LCP**: Largest Contentful Paint  
 * - **FID**: First Input Delay
 * - **CLS**: Cumulative Layout Shift
 * - **TTFB**: Time to First Byte
 * - **Load Time**: Complete page load
 * - **Mount Time**: Component mount duration
 * 
 * @param options - Configuration options
 * @returns Performance metrics and utilities
 * 
 * @example
 * ```tsx
 * const { metrics, measureCustom } = usePerformanceMonitor({
 *   componentName: 'YouTubeChannelPage',
 *   enableWebVitals: true
 * });
 * 
 * // Measure custom operation
 * measureCustom('videoLoad', async () => {
 *   await loadVideos();
 * });
 * ```
 */
export function usePerformanceMonitor({
  enableWebVitals = true,
  enableCustomMetrics = true,
  enableLogging = process.env.NODE_ENV === 'development',
  componentName = 'YouTubeChannel'
}: UsePerformanceMonitorOptions = {}) {
  const metricsRef = useRef<PerformanceMetrics>({});
  const mountStartTime = useRef<number>(Date.now());

  /**
   * Log performance metric
   */
  const logMetric = useCallback((name: string, value: number, unit: string = 'ms') => {
    if (enableLogging) {
      console.log(`🚀 [${componentName}] ${name}: ${value.toFixed(2)}${unit}`);
    }

    // Send to analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'performance_metric', {
        event_category: 'Performance',
        event_label: `${componentName}_${name}`,
        value: Math.round(value),
        custom_map: {
          component: componentName,
          metric_name: name,
          metric_value: value,
          metric_unit: unit
        }
      });
    }
  }, [enableLogging, componentName]);

  /**
   * Measure Core Web Vitals
   */
  const measureWebVitals = useCallback(() => {
    if (!enableWebVitals || typeof window === 'undefined') return;

    // Use Web Vitals library if available, otherwise use Performance API
    if ('web-vitals' in window) {
      // If web-vitals library is loaded
      const webVitals = (window as any)['web-vitals'];
      
      webVitals.getFCP((metric: any) => {
        metricsRef.current.fcp = metric.value;
        logMetric('FCP', metric.value);
      });

      webVitals.getLCP((metric: any) => {
        metricsRef.current.lcp = metric.value;
        logMetric('LCP', metric.value);
      });

      webVitals.getFID((metric: any) => {
        metricsRef.current.fid = metric.value;
        logMetric('FID', metric.value);
      });

      webVitals.getCLS((metric: any) => {
        metricsRef.current.cls = metric.value;
        logMetric('CLS', metric.value, '');
      });

      webVitals.getTTFB((metric: any) => {
        metricsRef.current.ttfb = metric.value;
        logMetric('TTFB', metric.value);
      });
    } else {
      // Fallback to Performance API
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'paint') {
              if (entry.name === 'first-contentful-paint') {
                metricsRef.current.fcp = entry.startTime;
                logMetric('FCP', entry.startTime);
              }
            } else if (entry.entryType === 'largest-contentful-paint') {
              metricsRef.current.lcp = entry.startTime;
              logMetric('LCP', entry.startTime);
            } else if (entry.entryType === 'first-input') {
              const processingStart = (entry as any).processingStart;
              if (typeof processingStart === 'number') {
                metricsRef.current.fid = processingStart - entry.startTime;
                logMetric('FID', metricsRef.current.fid);
              }
            } else if (entry.entryType === 'layout-shift') {
              const hadRecentInput = (entry as any).hadRecentInput;
              const value = (entry as any).value;
              if (!hadRecentInput && typeof value === 'number') {
                metricsRef.current.cls = (metricsRef.current.cls || 0) + value;
                logMetric('CLS', metricsRef.current.cls, '');
              }
            }
          }
        });

        try {
          observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
        } catch (e) {
          // Some browsers might not support all entry types
          console.warn('Performance Observer not fully supported:', e);
        }
      }
    }
  }, [enableWebVitals, logMetric]);

  /**
   * Measure custom performance metric
   */
  const measureCustom = useCallback(async <T>(
    name: string,
    operation: () => Promise<T> | T
  ): Promise<T> => {
    if (!enableCustomMetrics) {
      return typeof operation === 'function' ? await operation() : operation;
    }

    const startTime = performance.now();
    
    try {
      const result = await operation();
      const duration = performance.now() - startTime;
      
      logMetric(`Custom_${name}`, duration);
      
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      logMetric(`Custom_${name}_Error`, duration);
      throw error;
    }
  }, [enableCustomMetrics, logMetric]);

  /**
   * Get current performance metrics
   */
  const getMetrics = useCallback((): PerformanceMetrics => {
    return { ...metricsRef.current };
  }, []);

  /**
   * Measure component mount time
   */
  useEffect(() => {
    const mountTime = Date.now() - mountStartTime.current;
    metricsRef.current.mountTime = mountTime;
    logMetric('ComponentMount', mountTime);
  }, [logMetric]);

  /**
   * Measure page load time
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const measureLoadTime = () => {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const navigation = navigationEntries[0] as PerformanceNavigationTiming;
        if (navigation.loadEventEnd && navigation.fetchStart) {
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          metricsRef.current.loadTime = loadTime;
          logMetric('PageLoad', loadTime);
        }

        if (navigation.responseStart && navigation.fetchStart) {
          const ttfb = navigation.responseStart - navigation.fetchStart;
          metricsRef.current.ttfb = ttfb;
          logMetric('TTFB', ttfb);
        }
      }
    };

    if (document.readyState === 'complete') {
      measureLoadTime();
    } else {
      const loadHandler = () => measureLoadTime();
      window.addEventListener('load', loadHandler);
      return () => window.removeEventListener('load', loadHandler);
    }
  }, [logMetric]);

  /**
   * Initialize Web Vitals monitoring
   */
  useEffect(() => {
    measureWebVitals();
  }, [measureWebVitals]);

  return {
    /** Current performance metrics */
    metrics: getMetrics(),
    /** Measure custom operation performance */
    measureCustom,
    /** Get current metrics snapshot */
    getMetrics,
    /** Log custom metric */
    logMetric
  };
}
