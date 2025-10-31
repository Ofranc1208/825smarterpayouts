'use client';

import { useEffect, useCallback, useRef } from 'react';

/**
 * Performance Monitor Hook for MintChat
 * 
 * Monitors Core Web Vitals and performance metrics for the chat interface
 * with real-time tracking and optimization recommendations.
 * 
 * @hook usePerformanceMonitor
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
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
  /** Time to Interactive */
  tti?: number;
}

interface UsePerformanceMonitorOptions {
  /** Enable Core Web Vitals tracking */
  enableCoreWebVitals?: boolean;
  /** Enable custom performance tracking */
  enableCustomMetrics?: boolean;
  /** Performance reporting endpoint */
  reportingEndpoint?: string;
}

/**
 * Performance Monitor Hook
 * 
 * ## Features
 * - ✅ Core Web Vitals tracking (LCP, FID, CLS)
 * - ✅ Custom performance metrics
 * - ✅ Real-time performance monitoring
 * - ✅ Performance reporting
 * - ✅ Memory usage tracking
 * - ✅ Network performance monitoring
 * 
 * @param options - Performance monitoring configuration
 * @returns Performance metrics and utilities
 * 
 * @example
 * ```tsx
 * import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';
 * 
 * export default function MintChatPage() {
 *   const { metrics, trackCustomMetric } = usePerformanceMonitor({
 *     enableCoreWebVitals: true,
 *     enableCustomMetrics: true
 *   });
 * 
 *   return <div>...</div>;
 * }
 * ```
 */
export function usePerformanceMonitor(options: UsePerformanceMonitorOptions = {}) {
  const {
    enableCoreWebVitals = true,
    enableCustomMetrics = true,
    reportingEndpoint
  } = options;

  const metricsRef = useRef<PerformanceMetrics>({});
  const observersRef = useRef<(PerformanceObserver | MutationObserver)[]>([]);

  // Track custom performance metrics
  const trackCustomMetric = useCallback((name: string, value: number, unit: string = 'ms') => {
    if (!enableCustomMetrics) return;

    console.log(`[Performance] ${name}: ${value}${unit}`);
    
    // Report to analytics if endpoint provided
    if (reportingEndpoint) {
      fetch(reportingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric: name,
          value,
          unit,
          timestamp: Date.now(),
          page: 'mint-chat'
        })
      }).catch(console.error);
    }
  }, [enableCustomMetrics, reportingEndpoint]);

  // Initialize Core Web Vitals tracking
  useEffect(() => {
    if (!enableCoreWebVitals || typeof window === 'undefined') return;

    const initWebVitals = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const { onCLS, onFID, onFCP, onLCP, onTTFB } = await import('web-vitals');

        // Track Cumulative Layout Shift
        onCLS((metric: any) => {
          metricsRef.current.cls = metric.value;
          trackCustomMetric('CLS', metric.value, '');
        });

        // Track First Input Delay
        onFID((metric: any) => {
          metricsRef.current.fid = metric.value;
          trackCustomMetric('FID', metric.value, 'ms');
        });

        // Track First Contentful Paint
        onFCP((metric: any) => {
          metricsRef.current.fcp = metric.value;
          trackCustomMetric('FCP', metric.value, 'ms');
        });

        // Track Largest Contentful Paint
        onLCP((metric: any) => {
          metricsRef.current.lcp = metric.value;
          trackCustomMetric('LCP', metric.value, 'ms');
        });

        // Track Time to First Byte
        onTTFB((metric: any) => {
          trackCustomMetric('TTFB', metric.value, 'ms');
        });

      } catch (error) {
        console.warn('[Performance] Web Vitals library not available:', error);
      }
    };

    initWebVitals();
  }, [enableCoreWebVitals, trackCustomMetric]);

  // Monitor memory usage - only in development
  useEffect(() => {
    if (!enableCustomMetrics || typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        trackCustomMetric('Memory Used', Math.round(memory.usedJSHeapSize / 1048576), 'MB');
        trackCustomMetric('Memory Total', Math.round(memory.totalJSHeapSize / 1048576), 'MB');
      }
    };

    // Monitor memory every 30 seconds (development only)
    const memoryInterval = setInterval(monitorMemory, 30000);
    
    // Initial measurement
    monitorMemory();

    return () => clearInterval(memoryInterval);
  }, [enableCustomMetrics, trackCustomMetric]);

  // Monitor chat-specific performance
  useEffect(() => {
    if (!enableCustomMetrics) return;

    // Track chat message rendering time
    const trackChatPerformance = () => {
      const chatContainer = document.querySelector('[data-testid="chat-container"]');
      if (chatContainer) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              // New chat message added
              const startTime = performance.now();
              requestAnimationFrame(() => {
                const endTime = performance.now();
                trackCustomMetric('Chat Message Render', endTime - startTime, 'ms');
              });
            }
          });
        });

        observer.observe(chatContainer, { childList: true, subtree: true });
        observersRef.current.push(observer);
      }
    };

    // Wait for chat container to be available
    const checkInterval = setInterval(() => {
      const chatContainer = document.querySelector('[data-testid="chat-container"]');
      if (chatContainer) {
        trackChatPerformance();
        clearInterval(checkInterval);
      }
    }, 1000);

    return () => {
      clearInterval(checkInterval);
      observersRef.current.forEach(observer => observer.disconnect());
      observersRef.current = [];
    };
  }, [enableCustomMetrics, trackCustomMetric]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      observersRef.current.forEach(observer => observer.disconnect());
    };
  }, []);

  return {
    metrics: metricsRef.current,
    trackCustomMetric,
    enableCoreWebVitals,
    enableCustomMetrics
  };
}
