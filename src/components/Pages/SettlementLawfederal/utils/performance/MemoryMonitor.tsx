// Settlement Law Federal - Memory Monitor Module
// Following enterprise patterns - memory usage monitoring

import { FEATURE_FLAGS } from '../constants';
import { SettlementLawAnalytics } from '../analytics';

/**
 * Memory Monitor Module
 * Handles memory usage tracking and optimization
 */
export class MemoryMonitor {
  private static memoryMetrics: Map<string, number> = new Map();
  private static monitoringInterval: NodeJS.Timeout | null = null;

  /**
   * Initialize memory monitoring
   */
  static initializeMemoryMonitoring() {
    if (!FEATURE_FLAGS.enablePerformanceMonitoring || typeof window === 'undefined') {
      return;
    }

    // Start memory monitoring
    this.startMemoryMonitoring();

    if (FEATURE_FLAGS.enableVerboseLogging) {
      console.log('💾 Memory monitoring initialized for Settlement Law Federal');
    }
  }

  /**
   * Start continuous memory monitoring
   */
  private static startMemoryMonitoring() {
    if (typeof window === 'undefined' || !(window.performance as any).memory) {
      return;
    }

    const checkMemory = () => {
      const memory = (window.performance as any).memory;
      const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
      const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
      const limitMB = Math.round(memory.jsHeapSizeLimit / 1048576);

      this.memoryMetrics.set('memoryUsed', usedMB);
      this.memoryMetrics.set('memoryTotal', totalMB);
      this.memoryMetrics.set('memoryLimit', limitMB);

      // Warn if memory usage is high
      const usagePercent = (usedMB / limitMB) * 100;
      if (usagePercent > 80) {
        console.warn(`⚠️ High memory usage: ${usagePercent.toFixed(1)}% (${usedMB}MB / ${limitMB}MB)`);
        SettlementLawAnalytics.trackError(
          `High memory usage: ${usagePercent.toFixed(1)}%`,
          { component: 'MemoryMonitor', severity: 'medium' }
        );
      }

      if (FEATURE_FLAGS.enableVerboseLogging) {
        console.log(`💾 Memory: ${usedMB}MB / ${limitMB}MB (${usagePercent.toFixed(1)}%)`);
      }
    };

    // Check memory every 30 seconds
    this.monitoringInterval = setInterval(checkMemory, 30000);
    
    // Initial check after 5 seconds
    setTimeout(checkMemory, 5000);
  }

  /**
   * Get current memory metrics
   */
  static getMemoryMetrics(): {
    usedMB: number;
    totalMB: number;
    limitMB: number;
    usagePercent: number;
  } {
    const usedMB = this.memoryMetrics.get('memoryUsed') || 0;
    const totalMB = this.memoryMetrics.get('memoryTotal') || 0;
    const limitMB = this.memoryMetrics.get('memoryLimit') || 0;
    const usagePercent = limitMB > 0 ? (usedMB / limitMB) * 100 : 0;

    return {
      usedMB,
      totalMB,
      limitMB,
      usagePercent
    };
  }

  /**
   * Get memory health status
   */
  static getMemoryHealthStatus(): 'good' | 'warning' | 'critical' {
    const { usagePercent } = this.getMemoryMetrics();
    
    if (usagePercent < 60) return 'good';
    if (usagePercent < 80) return 'warning';
    return 'critical';
  }

  /**
   * Force garbage collection (if available)
   */
  static forceGarbageCollection() {
    if (typeof window !== 'undefined' && (window as any).gc) {
      try {
        (window as any).gc();
        if (FEATURE_FLAGS.enableVerboseLogging) {
          console.log('🗑️ Forced garbage collection');
        }
      } catch (error) {
        console.warn('Failed to force garbage collection:', error);
      }
    }
  }

  /**
   * Optimize memory usage
   */
  static optimizeMemory() {
    // Clear any cached data that's no longer needed
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        // Clear old performance events (keep only last 50)
        const events = JSON.parse(
          window.sessionStorage.getItem('performance-dashboard-events') || '[]'
        );
        
        if (events.length > 50) {
          const recentEvents = events.slice(-50);
          window.sessionStorage.setItem(
            'performance-dashboard-events',
            JSON.stringify(recentEvents)
          );
          
          if (FEATURE_FLAGS.enableVerboseLogging) {
            console.log(`🧹 Cleaned up ${events.length - 50} old performance events`);
          }
        }
      } catch (error) {
        console.warn('Failed to optimize session storage:', error);
      }
    }

    // Force garbage collection if available
    this.forceGarbageCollection();

    // Clear old metrics
    this.clearOldMetrics();
  }

  /**
   * Clear old metrics to free memory
   */
  private static clearOldMetrics() {
    // Keep only essential metrics
    const essentialMetrics = ['memoryUsed', 'memoryTotal', 'memoryLimit'];
    const currentMetrics = new Map<string, number>();
    
    essentialMetrics.forEach(key => {
      const value = this.memoryMetrics.get(key);
      if (value !== undefined) {
        currentMetrics.set(key, value);
      }
    });
    
    this.memoryMetrics = currentMetrics;
  }

  /**
   * Stop memory monitoring
   */
  static stopMemoryMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }

  /**
   * Cleanup all memory monitoring
   */
  static cleanup() {
    this.stopMemoryMonitoring();
    this.memoryMetrics.clear();
  }
}
