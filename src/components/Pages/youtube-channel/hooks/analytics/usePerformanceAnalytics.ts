'use client';

import { useCallback, useEffect } from 'react';

/**
 * Performance analytics tracking
 * Monitors Core Web Vitals, loading times, and performance metrics
 */
export function usePerformanceAnalytics() {
  // Track Core Web Vitals
  const trackWebVitals = useCallback((metric: any) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true
      });
    }
  }, []);

  // Track page load performance
  const trackPageLoad = useCallback(() => {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation && (window as any).gtag) {
        (window as any).gtag('event', 'page_load_time', {
          event_category: 'Performance',
          value: Math.round(navigation.loadEventEnd - navigation.fetchStart),
          non_interaction: true
        });

        (window as any).gtag('event', 'dom_content_loaded', {
          event_category: 'Performance',
          value: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
          non_interaction: true
        });
      }
    }
  }, []);

  // Track resource loading times
  const trackResourceLoad = useCallback((resourceType: string, duration: number) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'resource_load_time', {
        event_category: 'Performance',
        event_label: resourceType,
        value: Math.round(duration),
        non_interaction: true
      });
    }
  }, []);

  // Track JavaScript errors
  const trackJSError = useCallback((error: Error, errorInfo?: any) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        error_stack: error.stack?.substring(0, 500) // Limit stack trace length
      });
    }
  }, []);

  // Setup performance monitoring
  useEffect(() => {
    // Track page load when component mounts
    trackPageLoad();

    // Setup error tracking
    const handleError = (event: ErrorEvent) => {
      trackJSError(new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackJSError(new Error(`Unhandled Promise Rejection: ${event.reason}`));
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [trackPageLoad, trackJSError]);

  return {
    trackWebVitals,
    trackPageLoad,
    trackResourceLoad,
    trackJSError
  };
}
