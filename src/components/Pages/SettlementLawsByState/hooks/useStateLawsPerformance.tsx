// Performance monitoring hook
// Simple hook - under 50 lines per complexity rule

'use client';

import { useEffect, useCallback } from 'react';

export function useStateLawsPerformance() {
  // Monitor Core Web Vitals
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Track Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        if (window.gtag) {
          window.gtag('event', 'web_vital', {
            event_category: 'Performance',
            event_label: 'LCP',
            value: Math.round(lastEntry.startTime)
          });
        }
      });
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Fallback for browsers that don't support observer
      }

      return () => observer.disconnect();
    }
  }, []);

  // Track search performance
  const trackSearchPerformance = useCallback((searchTime: number, resultsCount: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: 'search_performance',
        value: searchTime,
        event_category: 'Performance',
        event_label: `Search Results: ${resultsCount}`
      });
    }
  }, []);

  // Track accordion render performance
  const trackAccordionPerformance = useCallback((renderTime: number, stateName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: 'accordion_render',
        value: renderTime,
        event_category: 'Performance',
        event_label: `State: ${stateName}`
      });
    }
  }, []);

  return {
    trackSearchPerformance,
    trackAccordionPerformance
  };
}
