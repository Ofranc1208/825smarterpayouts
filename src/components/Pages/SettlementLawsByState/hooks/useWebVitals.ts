// Settlement Laws by State - Web Vitals Hook
// Following enterprise patterns - comprehensive performance monitoring

import { useEffect, useCallback } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
}

interface UseWebVitalsOptions {
  reportAllChanges?: boolean;
  enableLogging?: boolean;
}

/**
 * useWebVitals Hook
 * 
 * Enterprise-grade Web Vitals monitoring hook for Settlement Laws by State page.
 * Tracks all Core Web Vitals (LCP, FID, CLS, FCP, TTFB) and reports to Performance Dashboard.
 * 
 * @param options - Web Vitals configuration options
 */
export function useWebVitals(options: UseWebVitalsOptions = {}) {
  const { reportAllChanges = true, enableLogging = process.env.NODE_ENV === 'development' } = options;

  /**
   * Report Web Vital metric to Performance Dashboard and analytics
   */
  const reportWebVital = useCallback((metric: WebVitalsMetric) => {
    if (enableLogging) {
      console.log(`🚀 [SettlementLawsByState] ${metric.name}:`, metric.value);
    }

    // Report to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: 'Settlement Laws by State',
        value: Math.round(metric.value),
        custom_map: {
          metric_id: metric.id,
          metric_value: metric.value,
          metric_delta: metric.delta
        }
      });
    }

    // Report to Performance Dashboard
    try {
      if (typeof window !== 'undefined' && (window as any).PerformanceDashboard) {
        (window as any).PerformanceDashboard.reportEvent({
          type: 'webVital',
          component: 'SettlementLawsByState',
          data: {
            name: metric.name,
            value: metric.value,
            id: metric.id,
            delta: metric.delta,
            rating: getVitalRating(metric.name, metric.value)
          },
          timestamp: Date.now()
        });
      }

      // Fallback: Store in sessionStorage
      const existingEvents = JSON.parse(
        window.sessionStorage.getItem('performance-dashboard-events') || '[]'
      );
      
      existingEvents.push({
        type: 'webVital',
        component: 'SettlementLawsByState',
        data: {
          name: metric.name,
          value: metric.value,
          id: metric.id,
          delta: metric.delta,
          rating: getVitalRating(metric.name, metric.value)
        },
        timestamp: Date.now()
      });

      // Keep only last 50 Web Vitals events
      if (existingEvents.length > 50) {
        existingEvents.splice(0, existingEvents.length - 50);
      }

      window.sessionStorage.setItem(
        'performance-dashboard-events',
        JSON.stringify(existingEvents)
      );
    } catch (error) {
      console.warn('Failed to report Web Vital to Performance Dashboard:', error);
    }
  }, [enableLogging]);

  /**
   * Get rating for Web Vital metric
   */
  const getVitalRating = useCallback((name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    switch (name) {
      case 'LCP':
        return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
      case 'FID':
        return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
      case 'CLS':
        return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
      case 'FCP':
        return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
      case 'TTFB':
        return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
      default:
        return 'good';
    }
  }, []);

  /**
   * Initialize Web Vitals monitoring
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Dynamic import of web-vitals library
    const initWebVitals = async () => {
      try {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');

        // Track Cumulative Layout Shift
        getCLS(reportWebVital, reportAllChanges);

        // Track First Input Delay
        getFID(reportWebVital, reportAllChanges);

        // Track First Contentful Paint
        getFCP(reportWebVital, reportAllChanges);

        // Track Largest Contentful Paint
        getLCP(reportWebVital, reportAllChanges);

        // Track Time to First Byte
        getTTFB(reportWebVital, reportAllChanges);

        if (enableLogging) {
          console.log('🚀 [SettlementLawsByState] Web Vitals monitoring initialized');
        }
      } catch (error) {
        console.warn('Failed to initialize Web Vitals:', error);
        
        // Fallback: Use Performance Observer API
        initPerformanceObserver();
      }
    };

    /**
     * Fallback performance monitoring using Performance Observer
     */
    const initPerformanceObserver = () => {
      if (!window.PerformanceObserver) return;

      try {
        // Observe paint metrics
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              reportWebVital({
                name: 'FCP',
                value: entry.startTime,
                id: 'fcp-fallback',
                delta: entry.startTime
              });
            }
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });

        // Observe LCP
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          reportWebVital({
            name: 'LCP',
            value: lastEntry.startTime,
            id: 'lcp-fallback',
            delta: lastEntry.startTime
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Observe layout shifts
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          if (clsValue > 0) {
            reportWebVital({
              name: 'CLS',
              value: clsValue,
              id: 'cls-fallback',
              delta: clsValue
            });
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

      } catch (error) {
        console.warn('Performance Observer fallback failed:', error);
      }
    };

    initWebVitals();
  }, [reportWebVital, reportAllChanges, enableLogging]);

  return {
    reportWebVital,
    getVitalRating
  };
}
