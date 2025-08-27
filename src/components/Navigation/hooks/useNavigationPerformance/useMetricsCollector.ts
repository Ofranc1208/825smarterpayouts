/**
 * Metrics Collector
 * 
 * Manages custom performance metrics collection and timing
 * 
 * @module useMetricsCollector
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useCallback, useRef, useEffect } from 'react';
import type { NavigationPerformanceMetrics } from '../../types';

interface MetricsCollectorConfig {
  enabled: boolean;
  debug: boolean;
  onMetric: (metric: keyof NavigationPerformanceMetrics, value: number) => void;
}

/**
 * Hook for managing custom metrics collection
 */
export function useMetricsCollector({ enabled, debug, onMetric }: MetricsCollectorConfig) {
  const timers = useRef<Map<string, number>>(new Map());
  const performanceObserver = useRef<PerformanceObserver | null>(null);

  /**
   * Debug logging for metrics events
   */
  const debugLog = useCallback((event: string, data: any) => {
    if (debug) {
      console.log(`[Navigation Performance - Metrics Collector] ${event}:`, data);
    }
  }, [debug]);

  /**
   * Initialize Performance Observer for navigation timing
   */
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    try {
      performanceObserver.current = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            const renderTime = navEntry.loadEventEnd - (navEntry.fetchStart || 0);
            onMetric('renderTime', renderTime);
            debugLog('Navigation Timing', { renderTime, entry: navEntry });
          }
          
          if (entry.entryType === 'measure' && entry.name.startsWith('nav-')) {
            const metricName = entry.name.replace('nav-', '') as keyof NavigationPerformanceMetrics;
            onMetric(metricName, entry.duration);
            debugLog('Custom Measure', { name: entry.name, duration: entry.duration });
          }

          if (entry.entryType === 'paint') {
            debugLog('Paint Timing', { name: entry.name, startTime: entry.startTime });
            if (entry.name === 'first-contentful-paint') {
              onMetric('renderTime', entry.startTime);
            }
          }
        });
      });

      performanceObserver.current.observe({ 
        entryTypes: ['navigation', 'measure', 'paint'] 
      });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }

    return () => {
      if (performanceObserver.current) {
        performanceObserver.current.disconnect();
      }
    };
  }, [enabled, debugLog, onMetric]);

  /**
   * Start a performance timer
   */
  const startTimer = useCallback((operation: string): (() => void) => {
    const startTime = performance.now();
    const timerId = `${operation}_${Date.now()}`;
    timers.current.set(timerId, startTime);

    debugLog('Timer Started', { operation, timerId, startTime });

    // Create performance mark for Performance API
    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        performance.mark(`nav-${operation}-start`);
      } catch (error) {
        // Ignore performance API errors
      }
    }

    // Return a function to end the timer
    return () => {
      const endTime = performance.now();
      const startTime = timers.current.get(timerId);
      
      if (startTime !== undefined) {
        const duration = endTime - startTime;
        timers.current.delete(timerId);
        
        // Map operation to metric
        const metricMap: Record<string, keyof NavigationPerformanceMetrics> = {
          'dropdown-open': 'dropdownOpenTime',
          'mobile-menu-toggle': 'mobileMenuToggleTime',
          'render': 'renderTime',
          'interaction': 'interactionTime'
        };

        const metricName = metricMap[operation];
        if (metricName) {
          onMetric(metricName, duration);
        }

        // Create performance mark for Performance API
        if (typeof window !== 'undefined' && 'performance' in window) {
          try {
            performance.mark(`nav-${operation}-end`);
            performance.measure(`nav-${operation}`, `nav-${operation}-start`, `nav-${operation}-end`);
          } catch (error) {
            // Ignore performance API errors
          }
        }

        debugLog('Timer Ended', { operation, timerId, duration });
        return duration;
      }
      return 0;
    };
  }, [debugLog, onMetric]);

  /**
   * Record a custom metric directly
   */
  const recordCustomMetric = useCallback((name: string, value: number, unit: string = 'ms') => {
    if (!enabled) return;

    // Create a performance measure for this custom metric
    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        performance.mark(`nav-custom-${name}`);
        // Store the value in a way that can be retrieved later
        (window as any).__navCustomMetrics = (window as any).__navCustomMetrics || {};
        (window as any).__navCustomMetrics[name] = { value, unit, timestamp: Date.now() };
      } catch (error) {
        // Ignore performance API errors
      }
    }

    debugLog('Custom Metric Recorded', { name, value, unit });
  }, [enabled, debugLog]);

  /**
   * Get all active timers
   */
  const getActiveTimers = useCallback(() => {
    return Array.from(timers.current.keys());
  }, []);

  /**
   * Reset all timers
   */
  const resetTimers = useCallback(() => {
    timers.current.clear();
    debugLog('Timers Reset', {});
  }, [debugLog]);

  /**
   * Get performance marks and measures
   */
  const getPerformanceEntries = useCallback(() => {
    if (typeof window === 'undefined' || !('performance' in window)) return [];

    try {
      const marks = performance.getEntriesByType('mark').filter(entry => 
        entry.name.startsWith('nav-')
      );
      
      const measures = performance.getEntriesByType('measure').filter(entry => 
        entry.name.startsWith('nav-')
      );

      return { marks, measures };
    } catch (error) {
      console.warn('Failed to get performance entries:', error);
      return { marks: [], measures: [] };
    }
  }, []);

  /**
   * Clear all performance entries
   */
  const clearPerformanceEntries = useCallback(() => {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    try {
      // Clear navigation-related marks and measures
      const marks = performance.getEntriesByType('mark');
      const measures = performance.getEntriesByType('measure');

      marks.forEach(mark => {
        if (mark.name.startsWith('nav-')) {
          performance.clearMarks(mark.name);
        }
      });

      measures.forEach(measure => {
        if (measure.name.startsWith('nav-')) {
          performance.clearMeasures(measure.name);
        }
      });

      debugLog('Performance Entries Cleared', {});
    } catch (error) {
      console.warn('Failed to clear performance entries:', error);
    }
  }, [debugLog]);

  return {
    startTimer,
    recordCustomMetric,
    getActiveTimers,
    resetTimers,
    getPerformanceEntries,
    clearPerformanceEntries
  };
}
