// Settlement Law Federal - Performance Utilities Main Orchestrator
// Following enterprise patterns - clean orchestrator under 100 lines

import { PerformanceMonitor } from './performance/PerformanceMonitor';
import { WebVitalsTracker } from './performance/WebVitalsTracker';
import { MemoryMonitor } from './performance/MemoryMonitor';
import { ResourceOptimizer } from './performance/ResourceOptimizer';
import { FEATURE_FLAGS } from './constants';

/**
 * Settlement Law Performance Utilities - Main Orchestrator
 * 
 * Provides comprehensive performance optimization by composing focused modules.
 * Replaces the previous 419-line monolithic implementation with modular architecture.
 */
export class SettlementLawPerformance {
  /**
   * Initialize all performance monitoring systems
   */
  static initializePerformanceMonitoring() {
    if (!FEATURE_FLAGS.enablePerformanceMonitoring || typeof window === 'undefined') {
      return;
    }

    // Initialize core performance monitoring
    PerformanceMonitor.initializePerformanceMonitoring();

    // Initialize Web Vitals tracking
    if (FEATURE_FLAGS.enableWebVitals) {
      WebVitalsTracker.initializeWebVitals();
    }

    // Initialize memory monitoring
    MemoryMonitor.initializeMemoryMonitoring();

    // Initialize resource optimization
    ResourceOptimizer.preloadCriticalResources();
    ResourceOptimizer.optimizeImages();
    ResourceOptimizer.monitorResourcePerformance();

    if (FEATURE_FLAGS.enableVerboseLogging) {
      console.log('⚡ Settlement Law Performance: All systems initialized');
    }
  }

  /**
   * Get comprehensive performance metrics
   */
  static getPerformanceMetrics(): Record<string, number> {
    return {
      ...PerformanceMonitor.getPerformanceMetrics(),
      ...WebVitalsTracker.getWebVitalsMetrics()
    };
  }

  /**
   * Get overall performance score
   */
  static getPerformanceScore(): number {
    const coreScore = PerformanceMonitor.getPerformanceScore();
    const webVitalsScore = WebVitalsTracker.getWebVitalsScore();
    
    // Weighted average: 60% core performance, 40% Web Vitals
    return Math.round((coreScore * 0.6) + (webVitalsScore * 0.4));
  }

  /**
   * Get memory health status
   */
  static getMemoryHealth() {
    return {
      status: MemoryMonitor.getMemoryHealthStatus(),
      metrics: MemoryMonitor.getMemoryMetrics()
    };
  }

  /**
   * Optimize performance
   */
  static optimizePerformance() {
    // Optimize memory usage
    MemoryMonitor.optimizeMemory();
    
    // Optimize resources
    ResourceOptimizer.cleanupUnusedResources();
    ResourceOptimizer.optimizeCSSDelivery();
    ResourceOptimizer.optimizeThirdPartyScripts();
    
    if (FEATURE_FLAGS.enableVerboseLogging) {
      console.log('🚀 Settlement Law Performance: Optimization complete');
    }
  }

  /**
   * Cleanup all performance monitoring
   */
  static cleanup() {
    MemoryMonitor.cleanup();
    ResourceOptimizer.cleanup();
    PerformanceMonitor.clearMetrics();
    WebVitalsTracker.clearWebVitals();
  }
}

// Export individual modules for direct access if needed
export * from './performance';