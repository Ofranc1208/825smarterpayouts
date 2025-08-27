/**
 * Web Vitals Manager
 * 
 * Manages Core Web Vitals tracking (LCP, FID, CLS, FCP, TTFB)
 * 
 * @module useWebVitalsManager
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useEffect, useCallback } from 'react';
import type { NavigationPerformanceMetrics } from '../../types';

interface WebVitalsConfig {
  enabled: boolean;
  debug: boolean;
  onMetric: (metric: keyof NavigationPerformanceMetrics, value: number) => void;
}

/**
 * Hook for managing Core Web Vitals tracking
 */
export function useWebVitalsManager({ enabled, debug, onMetric }: WebVitalsConfig) {
  
  /**
   * Debug logging for Web Vitals events
   */
  const debugLog = useCallback((event: string, data: any) => {
    if (debug) {
      console.log(`[Navigation Performance - Web Vitals] ${event}:`, data);
    }
  }, [debug]);

  /**
   * Initialize Core Web Vitals tracking
   */
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Import web-vitals dynamically to avoid SSR issues
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Cumulative Layout Shift
      getCLS((metric) => {
        debugLog('CLS', metric);
        onMetric('renderTime', metric.value);
      });

      // First Input Delay
      getFID((metric) => {
        debugLog('FID', metric);
        onMetric('interactionTime', metric.value);
      });

      // First Contentful Paint
      getFCP((metric) => {
        debugLog('FCP', metric);
        // FCP affects render time perception
        onMetric('renderTime', metric.value);
      });

      // Largest Contentful Paint
      getLCP((metric) => {
        debugLog('LCP', metric);
        // LCP is a key loading performance metric
        onMetric('renderTime', metric.value);
      });

      // Time to First Byte
      getTTFB((metric) => {
        debugLog('TTFB', metric);
        // TTFB affects overall render time
        onMetric('renderTime', metric.value);
      });
    }).catch((error) => {
      console.warn('Failed to load web-vitals:', error);
    });
  }, [enabled, debugLog, onMetric]);

  /**
   * Get Web Vitals configuration
   */
  const getWebVitalsConfig = useCallback(() => {
    return {
      enabled,
      debug,
      supportedMetrics: ['CLS', 'FID', 'FCP', 'LCP', 'TTFB']
    };
  }, [enabled, debug]);

  /**
   * Check if Web Vitals is supported
   */
  const isWebVitalsSupported = useCallback(() => {
    return typeof window !== 'undefined' && 'performance' in window;
  }, []);

  /**
   * Manually trigger Web Vitals collection
   */
  const collectWebVitals = useCallback(async () => {
    if (!enabled || typeof window === 'undefined') return;

    try {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
      
      // Force collection of current metrics
      getCLS((metric) => {
        debugLog('Manual CLS Collection', metric);
        onMetric('renderTime', metric.value);
      }, { reportAllChanges: true });

      getFID((metric) => {
        debugLog('Manual FID Collection', metric);
        onMetric('interactionTime', metric.value);
      });

      getFCP((metric) => {
        debugLog('Manual FCP Collection', metric);
        onMetric('renderTime', metric.value);
      });

      getLCP((metric) => {
        debugLog('Manual LCP Collection', metric);
        onMetric('renderTime', metric.value);
      }, { reportAllChanges: true });

      getTTFB((metric) => {
        debugLog('Manual TTFB Collection', metric);
        onMetric('renderTime', metric.value);
      });
    } catch (error) {
      console.warn('Failed to manually collect Web Vitals:', error);
    }
  }, [enabled, debugLog, onMetric]);

  return {
    getWebVitalsConfig,
    isWebVitalsSupported,
    collectWebVitals
  };
}
