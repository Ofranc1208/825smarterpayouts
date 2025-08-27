/**
 * Memory Tracker
 * 
 * Manages memory usage monitoring and tracking
 * 
 * @module useMemoryTracker
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useCallback, useEffect, useRef } from 'react';

interface MemoryTrackerConfig {
  enabled: boolean;
  debug: boolean;
  onMemoryUpdate: (memoryUsage: number) => void;
  trackingInterval?: number; // in milliseconds
}

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

/**
 * Hook for managing memory usage tracking
 */
export function useMemoryTracker({ 
  enabled, 
  debug, 
  onMemoryUpdate, 
  trackingInterval = 30000 
}: MemoryTrackerConfig) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const memoryHistory = useRef<{ timestamp: number; usage: number }[]>([]);

  /**
   * Debug logging for memory events
   */
  const debugLog = useCallback((event: string, data: any) => {
    if (debug) {
      console.log(`[Navigation Performance - Memory Tracker] ${event}:`, data);
    }
  }, [debug]);

  /**
   * Get current memory usage
   */
  const getCurrentMemoryUsage = useCallback((): number => {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return 0;
    }

    try {
      const memInfo = (performance as any).memory as MemoryInfo;
      if (memInfo && typeof memInfo.usedJSHeapSize === 'number') {
        const memoryUsage = memInfo.usedJSHeapSize / 1024 / 1024; // Convert to MB
        return memoryUsage;
      }
    } catch (error) {
      debugLog('Memory Access Error', error);
    }

    return 0;
  }, [debugLog]);

  /**
   * Track memory usage and store in history
   */
  const trackMemory = useCallback(() => {
    const memoryUsage = getCurrentMemoryUsage();
    
    if (memoryUsage > 0) {
      // Store in history
      const timestamp = Date.now();
      memoryHistory.current.push({ timestamp, usage: memoryUsage });
      
      // Keep only last 100 measurements to prevent memory leaks
      if (memoryHistory.current.length > 100) {
        memoryHistory.current = memoryHistory.current.slice(-100);
      }

      // Call the callback to update parent state
      onMemoryUpdate(memoryUsage);

      debugLog('Memory Tracked', { 
        memoryUsage: `${memoryUsage.toFixed(2)}MB`, 
        timestamp,
        historyLength: memoryHistory.current.length
      });

      // Memory alerts
      if (memoryUsage > 100) {
        console.warn(`High memory usage detected: ${memoryUsage.toFixed(2)}MB`);
      } else if (memoryUsage > 50) {
        console.info(`Moderate memory usage: ${memoryUsage.toFixed(2)}MB`);
      }
    }
  }, [getCurrentMemoryUsage, onMemoryUpdate, debugLog]);

  /**
   * Initialize memory tracking
   */
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Initial measurement
    trackMemory();

    // Set up interval tracking
    intervalRef.current = setInterval(trackMemory, trackingInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, trackingInterval, trackMemory]);

  /**
   * Get memory usage statistics
   */
  const getMemoryStats = useCallback(() => {
    const history = memoryHistory.current;
    
    if (history.length === 0) {
      return {
        current: 0,
        average: 0,
        peak: 0,
        minimum: 0,
        trend: 'stable' as 'increasing' | 'decreasing' | 'stable',
        measurements: 0
      };
    }

    const usages = history.map(entry => entry.usage);
    const current = usages[usages.length - 1];
    const average = usages.reduce((sum, usage) => sum + usage, 0) / usages.length;
    const peak = Math.max(...usages);
    const minimum = Math.min(...usages);

    // Determine trend (compare last 10 measurements with previous 10)
    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (history.length >= 20) {
      const recent = usages.slice(-10);
      const previous = usages.slice(-20, -10);
      const recentAvg = recent.reduce((sum, usage) => sum + usage, 0) / recent.length;
      const previousAvg = previous.reduce((sum, usage) => sum + usage, 0) / previous.length;
      
      const difference = recentAvg - previousAvg;
      if (difference > 5) trend = 'increasing';
      else if (difference < -5) trend = 'decreasing';
    }

    return {
      current,
      average,
      peak,
      minimum,
      trend,
      measurements: history.length
    };
  }, []);

  /**
   * Get detailed memory information
   */
  const getDetailedMemoryInfo = useCallback(() => {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return null;
    }

    try {
      const memInfo = (performance as any).memory as MemoryInfo;
      if (memInfo) {
        return {
          usedJSHeapSize: memInfo.usedJSHeapSize,
          totalJSHeapSize: memInfo.totalJSHeapSize,
          jsHeapSizeLimit: memInfo.jsHeapSizeLimit,
          usedMB: memInfo.usedJSHeapSize / 1024 / 1024,
          totalMB: memInfo.totalJSHeapSize / 1024 / 1024,
          limitMB: memInfo.jsHeapSizeLimit / 1024 / 1024,
          usagePercentage: (memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100
        };
      }
    } catch (error) {
      debugLog('Detailed Memory Info Error', error);
    }

    return null;
  }, [debugLog]);

  /**
   * Clear memory history
   */
  const clearMemoryHistory = useCallback(() => {
    memoryHistory.current = [];
    debugLog('Memory History Cleared', {});
  }, [debugLog]);

  /**
   * Force garbage collection (if available)
   */
  const forceGarbageCollection = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).gc) {
      try {
        (window as any).gc();
        debugLog('Garbage Collection Forced', {});
        
        // Track memory after GC
        setTimeout(trackMemory, 100);
      } catch (error) {
        debugLog('Garbage Collection Failed', error);
      }
    } else {
      debugLog('Garbage Collection Not Available', {});
    }
  }, [debugLog, trackMemory]);

  /**
   * Check if memory API is supported
   */
  const isMemoryAPISupported = useCallback(() => {
    return typeof window !== 'undefined' && 
           'performance' in window && 
           'memory' in (performance as any);
  }, []);

  /**
   * Get memory usage recommendations
   */
  const getMemoryRecommendations = useCallback(() => {
    const stats = getMemoryStats();
    const recommendations: string[] = [];

    if (stats.current > 100) {
      recommendations.push('Memory usage is very high. Consider optimizing component lifecycle.');
    } else if (stats.current > 50) {
      recommendations.push('Memory usage is moderate. Monitor for potential leaks.');
    }

    if (stats.trend === 'increasing') {
      recommendations.push('Memory usage is trending upward. Check for memory leaks.');
    }

    if (stats.peak > stats.average * 2) {
      recommendations.push('Memory spikes detected. Investigate peak usage scenarios.');
    }

    return recommendations;
  }, [getMemoryStats]);

  return {
    getCurrentMemoryUsage,
    trackMemory,
    getMemoryStats,
    getDetailedMemoryInfo,
    clearMemoryHistory,
    forceGarbageCollection,
    isMemoryAPISupported,
    getMemoryRecommendations
  };
}
