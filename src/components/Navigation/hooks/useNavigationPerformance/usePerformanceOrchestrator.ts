/**
 * Performance Orchestrator - Main Hook
 * 
 * Main orchestrator that combines all performance monitoring functionality
 * (Simplified version of the original useNavigationPerformance.ts)
 * 
 * @module usePerformanceOrchestrator
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useState, useCallback } from 'react';
import type { NavigationPerformanceMetrics, UseNavigationPerformance } from '../../types';
import { useWebVitalsManager } from './useWebVitalsManager';
import { useMetricsCollector } from './useMetricsCollector';
import { useMemoryTracker } from './useMemoryTracker';
import { usePerformanceAnalyzer } from './usePerformanceAnalyzer';

interface PerformanceConfig {
  enableCoreWebVitals?: boolean;
  enableCustomMetrics?: boolean;
  enableMemoryTracking?: boolean;
  sampleRate?: number;
  debug?: boolean;
}

/**
 * Main performance hook that orchestrates all performance monitoring functionality
 */
export function useNavigationPerformance(config: PerformanceConfig = {}): UseNavigationPerformance {
  const {
    enableCoreWebVitals = true,
    enableCustomMetrics = true,
    enableMemoryTracking = true,
    sampleRate = 1.0,
    debug = process.env.NODE_ENV === 'development'
  } = config;

  const [metrics, setMetrics] = useState<NavigationPerformanceMetrics>({
    renderTime: 0,
    interactionTime: 0,
    dropdownOpenTime: 0,
    mobileMenuToggleTime: 0,
    memoryUsage: 0,
    errorCount: 0,
    accessibilityScore: 0
  });

  // Initialize performance managers
  const webVitalsManager = useWebVitalsManager({
    enabled: enableCoreWebVitals,
    debug,
    onMetric: (metric, value) => recordMetric(metric, value)
  });

  const metricsCollector = useMetricsCollector({
    enabled: enableCustomMetrics,
    debug,
    onMetric: (metric, value) => recordMetric(metric, value)
  });

  const memoryTracker = useMemoryTracker({
    enabled: enableMemoryTracking,
    debug,
    onMemoryUpdate: (memoryUsage) => recordMetric('memoryUsage', memoryUsage)
  });

  const performanceAnalyzer = usePerformanceAnalyzer({
    metrics,
    debug
  });

  /**
   * Record a performance metric
   */
  const recordMetric = useCallback((metric: keyof NavigationPerformanceMetrics, value: number) => {
    // Apply sampling rate
    if (Math.random() > sampleRate) return;

    setMetrics(prevMetrics => {
      const newMetrics = {
        ...prevMetrics,
        [metric]: value
      };

      if (debug) {
        console.log(`[Navigation Performance] Metric Recorded:`, { metric, value, newMetrics });
      }

      return newMetrics;
    });

    // Performance alerts for critical metrics
    if (metric === 'renderTime' && value > 1000) {
      console.warn(`Navigation render time is high: ${value}ms`);
    }
    
    if (metric === 'interactionTime' && value > 100) {
      console.warn(`Navigation interaction time is high: ${value}ms`);
    }
    
    if (metric === 'memoryUsage' && value > 50) {
      console.warn(`Navigation memory usage is high: ${value}MB`);
    }
  }, [sampleRate, debug]);

  /**
   * Start a performance timer
   */
  const startTimer = useCallback((operation: string): (() => void) => {
    return metricsCollector.startTimer(operation);
  }, [metricsCollector]);

  /**
   * Reset all metrics
   */
  const resetMetrics = useCallback(() => {
    setMetrics({
      renderTime: 0,
      interactionTime: 0,
      dropdownOpenTime: 0,
      mobileMenuToggleTime: 0,
      memoryUsage: 0,
      errorCount: 0,
      accessibilityScore: 0
    });
    
    metricsCollector.resetTimers();
    performanceAnalyzer.resetHistory();
    
    if (debug) {
      console.log('[Navigation Performance] Metrics Reset');
    }
  }, [metricsCollector, performanceAnalyzer, debug]);

  return {
    metrics,
    startTimer,
    recordMetric,
    getAverageMetrics: performanceAnalyzer.getAverageMetrics,
    resetMetrics,
    getPerformanceScore: performanceAnalyzer.getPerformanceScore,
    getPerformanceRecommendations: performanceAnalyzer.getPerformanceRecommendations
  } as UseNavigationPerformance & { 
    getPerformanceScore: () => number;
    getPerformanceRecommendations: () => string[];
  };
}
