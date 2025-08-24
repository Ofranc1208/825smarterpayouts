/**
 * Performance Monitor Hook
 * 
 * Enterprise-grade performance monitoring hook for tracking
 * component render times, memory usage, and performance metrics.
 * 
 * @module usePerformanceMonitor
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import React, { useEffect, useRef } from 'react';

/**
 * Performance metrics interface
 */
interface PerformanceMetrics {
  /** Component name for tracking */
  componentName: string;
  /** Render start time */
  renderStart: number;
  /** Render end time */
  renderEnd: number;
  /** Total render duration */
  renderDuration: number;
  /** Memory usage (if available) */
  memoryUsage?: number;
}

/**
 * Performance monitor options
 */
interface UsePerformanceMonitorOptions {
  /** Component name for identification */
  componentName: string;
  /** Whether to log metrics to console in development */
  logToConsole?: boolean;
  /** Custom callback for handling metrics */
  onMetrics?: (metrics: PerformanceMetrics) => void;
  /** Whether monitoring is enabled */
  enabled?: boolean;
}

/**
 * Custom hook for monitoring component performance
 * 
 * Tracks render times and provides enterprise-grade performance
 * monitoring capabilities for production applications.
 * 
 * @param {UsePerformanceMonitorOptions} options - Monitor configuration
 * @returns {Object} Performance monitoring utilities
 */
export function usePerformanceMonitor({
  componentName,
  logToConsole = process.env.NODE_ENV === 'development',
  onMetrics,
  enabled = true
}: UsePerformanceMonitorOptions) {
  const renderStartRef = useRef<number>();
  const metricsRef = useRef<PerformanceMetrics[]>([]);

  // Mark render start
  const markRenderStart = () => {
    if (!enabled) return;
    renderStartRef.current = performance.now();
  };

  // Mark render end and calculate metrics
  const markRenderEnd = () => {
    if (!enabled || !renderStartRef.current) return;

    const renderEnd = performance.now();
    const renderDuration = renderEnd - renderStartRef.current;
    
    const metrics: PerformanceMetrics = {
      componentName,
      renderStart: renderStartRef.current,
      renderEnd,
      renderDuration,
      memoryUsage: getMemoryUsage()
    };

    metricsRef.current.push(metrics);

    // Log to console in development
    if (logToConsole) {
      console.group(`🚀 Performance: ${componentName}`);
      console.log(`Render time: ${renderDuration.toFixed(2)}ms`);
      if (metrics.memoryUsage) {
        console.log(`Memory usage: ${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB`);
      }
      console.groupEnd();
    }

    // Call custom metrics handler
    if (onMetrics) {
      onMetrics(metrics);
    }

    // Reset for next render
    renderStartRef.current = undefined;
  };

  // Get memory usage if available
  const getMemoryUsage = (): number | undefined => {
    if ('memory' in performance) {
      return (performance as any).memory?.usedJSHeapSize;
    }
    return undefined;
  };

  // Get all collected metrics
  const getMetrics = () => metricsRef.current;

  // Clear collected metrics
  const clearMetrics = () => {
    metricsRef.current = [];
  };

  // Get average render time
  const getAverageRenderTime = () => {
    const metrics = metricsRef.current;
    if (metrics.length === 0) return 0;
    
    const totalTime = metrics.reduce((sum, metric) => sum + metric.renderDuration, 0);
    return totalTime / metrics.length;
  };

  // Automatically mark render start on mount
  useEffect(() => {
    markRenderStart();
  }, []);

  // Automatically mark render end after render
  useEffect(() => {
    markRenderEnd();
  });

  return {
    markRenderStart,
    markRenderEnd,
    getMetrics,
    clearMetrics,
    getAverageRenderTime,
    isEnabled: enabled
  };
}

/**
 * HOC for automatic performance monitoring
 * 
 * Wraps components with automatic performance tracking
 * for enterprise monitoring and optimization.
 * 
 * @param {React.ComponentType} Component - Component to monitor
 * @param {string} componentName - Name for tracking
 * @returns {React.ComponentType} Monitored component
 */
export function withPerformanceMonitor<T extends object>(
  Component: React.ComponentType<T>,
  componentName: string
) {
  return function MonitoredComponent(props: T) {
    const { markRenderStart, markRenderEnd } = usePerformanceMonitor({
      componentName,
      enabled: process.env.NODE_ENV !== 'test'
    });

    useEffect(() => {
      markRenderStart();
      return () => markRenderEnd();
    }, [markRenderStart, markRenderEnd]);

    return React.createElement(Component, props);
  };
}
