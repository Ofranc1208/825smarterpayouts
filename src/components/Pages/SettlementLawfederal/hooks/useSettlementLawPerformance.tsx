'use client';

import { useCallback, useEffect } from 'react';
import { PerformanceMetrics, UseSettlementLawPerformanceReturn } from '../types';

/**
 * Settlement Law Performance Hook
 * Following enterprise patterns from Home and CourtApproval pages
 * 
 * Monitors Core Web Vitals and performance metrics for the Settlement Law Federal page
 */
export default function useSettlementLawPerformance(): UseSettlementLawPerformanceReturn {
  const trackPageLoad = useCallback(() => {
    if (typeof window === 'undefined') return;

    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigationTiming) {
      const pageLoadTime = navigationTiming.loadEventEnd - navigationTiming.fetchStart;
      const domContentLoaded = navigationTiming.domContentLoadedEventEnd - navigationTiming.fetchStart;
      const firstByte = navigationTiming.responseStart - navigationTiming.fetchStart;

      // Track with analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', 'page_load_performance', {
          event_category: 'Settlement Law Federal Performance',
          event_label: 'Page Load Metrics',
          custom_parameter_1: pageLoadTime,
          custom_parameter_2: domContentLoaded,
          custom_parameter_3: firstByte
        });
      }

      // Development logging
      if (process.env.NODE_ENV === 'development') {
        console.log('⚡ Settlement Law Performance:', {
          pageLoadTime: `${pageLoadTime.toFixed(0)}ms`,
          domContentLoaded: `${domContentLoaded.toFixed(0)}ms`,
          firstByte: `${firstByte.toFixed(0)}ms`
        });
      }
    }
  }, []);

  const trackSectionLoad = useCallback((sectionName: string) => {
    if (typeof window === 'undefined') return;

    const startTime = performance.now();
    
    // Use requestIdleCallback for non-blocking measurement
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        const loadTime = performance.now() - startTime;
        
        if ((window as any).gtag) {
          (window as any).gtag('event', 'section_load_performance', {
            event_category: 'Settlement Law Federal Performance',
            event_label: `${sectionName} Section Load`,
            value: Math.round(loadTime)
          });
        }

        if (process.env.NODE_ENV === 'development') {
          console.log(`⚡ ${sectionName} Section Load: ${loadTime.toFixed(2)}ms`);
        }
      });
    }
  }, []);

  const trackResourceLoad = useCallback((resourceType: string) => {
    if (typeof window === 'undefined') return;

    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const recentResources = resourceEntries.filter(entry => 
      entry.name.includes(resourceType) && 
      entry.startTime > performance.now() - 5000 // Last 5 seconds
    );

    if (recentResources.length > 0) {
      const avgLoadTime = recentResources.reduce((sum, entry) => 
        sum + (entry.responseEnd - entry.startTime), 0
      ) / recentResources.length;

      if ((window as any).gtag) {
        (window as any).gtag('event', 'resource_load_performance', {
          event_category: 'Settlement Law Federal Performance',
          event_label: `${resourceType} Resource Load`,
          value: Math.round(avgLoadTime)
        });
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(`⚡ ${resourceType} Resource Load: ${avgLoadTime.toFixed(2)}ms`);
      }
    }
  }, []);

  const getPerformanceMetrics = useCallback((): PerformanceMetrics | null => {
    if (typeof window === 'undefined') return null;

    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (!navigationTiming) return null;

    return {
      fcp: 0, // Will be populated by web-vitals library
      lcp: 0, // Will be populated by web-vitals library
      cls: 0, // Will be populated by web-vitals library
      fid: 0, // Will be populated by web-vitals library
      ttfb: navigationTiming.responseStart - navigationTiming.fetchStart
    };
  }, []);

  const trackCoreWebVitals = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Dynamic import to avoid SSR issues
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS((metric) => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'web_vitals', {
            event_category: 'Settlement Law Federal Performance',
            event_label: 'CLS',
            value: Math.round(metric.value * 1000),
            custom_parameter: metric.rating
          });
        }
      });

      getFID((metric) => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'web_vitals', {
            event_category: 'Settlement Law Federal Performance',
            event_label: 'FID',
            value: Math.round(metric.value),
            custom_parameter: metric.rating
          });
        }
      });

      getFCP((metric) => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'web_vitals', {
            event_category: 'Settlement Law Federal Performance',
            event_label: 'FCP',
            value: Math.round(metric.value),
            custom_parameter: metric.rating
          });
        }
      });

      getLCP((metric) => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'web_vitals', {
            event_category: 'Settlement Law Federal Performance',
            event_label: 'LCP',
            value: Math.round(metric.value),
            custom_parameter: metric.rating
          });
        }
      });

      getTTFB((metric) => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'web_vitals', {
            event_category: 'Settlement Law Federal Performance',
            event_label: 'TTFB',
            value: Math.round(metric.value),
            custom_parameter: metric.rating
          });
        }
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('⚡ Core Web Vitals tracking initialized for Settlement Law Federal page');
      }
    }).catch((error) => {
      console.warn('Failed to load web-vitals library:', error);
    });
  }, []);

  // Initialize performance tracking on mount
  useEffect(() => {
    // Track initial page load
    trackPageLoad();
    
    // Initialize Core Web Vitals tracking
    trackCoreWebVitals();
    
    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        trackPageLoad();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [trackPageLoad, trackCoreWebVitals]);

  return {
    trackPageLoad,
    trackSectionLoad,
    trackResourceLoad,
    getPerformanceMetrics,
    trackCoreWebVitals
  };
}
