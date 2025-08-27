/**
 * Metrics Tracker - Service Worker Performance Metrics
 * 
 * Tracks and manages performance metrics for the Navigation Service Worker
 * including cache hit rates, response times, and usage statistics.
 * 
 * @module MetricsTracker
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import { track } from '@vercel/analytics';
import type { OfflineConfig, CacheMetrics } from './types';

export class MetricsTracker {
  private config: OfflineConfig;
  private metrics: CacheMetrics;
  private startTime: number;

  constructor(config: OfflineConfig) {
    this.config = config;
    this.startTime = Date.now();
    this.metrics = {
      hitRate: 0,
      missRate: 0,
      totalRequests: 0,
      cacheSize: 0,
      lastUpdated: Date.now()
    };
  }

  /**
   * Update cache metrics
   */
  updateMetrics(type: 'hit' | 'miss'): void {
    this.metrics.totalRequests++;
    
    if (type === 'hit') {
      this.metrics.hitRate = (this.metrics.hitRate * (this.metrics.totalRequests - 1) + 1) / this.metrics.totalRequests;
    } else {
      this.metrics.missRate = (this.metrics.missRate * (this.metrics.totalRequests - 1) + 1) / this.metrics.totalRequests;
    }

    this.metrics.lastUpdated = Date.now();

    // Send metrics to analytics if enabled
    if (this.config.enableAnalytics && this.metrics.totalRequests % 10 === 0) {
      this.reportMetrics();
    }
  }

  /**
   * Update cache size metric
   */
  async updateCacheSize(): Promise<void> {
    if (typeof window === 'undefined' || !('caches' in window)) return;

    try {
      const cacheNames = await caches.keys();
      const navigationCaches = cacheNames.filter(name => name.startsWith('navigation-'));
      
      let totalSize = 0;
      
      for (const cacheName of navigationCaches) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        
        // Estimate cache size (rough calculation)
        totalSize += keys.length * 1024; // Assume 1KB per cached item on average
      }

      this.metrics.cacheSize = totalSize;
      this.metrics.lastUpdated = Date.now();
    } catch (error) {
      console.error('Failed to update cache size metrics:', error);
    }
  }

  /**
   * Get current metrics
   */
  getMetrics(): CacheMetrics {
    return { ...this.metrics };
  }

  /**
   * Get detailed performance report
   */
  getPerformanceReport(): {
    metrics: CacheMetrics;
    uptime: number;
    efficiency: number;
    recommendations: string[];
  } {
    const uptime = Date.now() - this.startTime;
    const efficiency = this.metrics.totalRequests > 0 ? this.metrics.hitRate * 100 : 0;
    
    const recommendations: string[] = [];
    
    if (efficiency < 50) {
      recommendations.push('Consider adjusting cache strategy to improve hit rate');
    }
    
    if (this.metrics.cacheSize > 50 * 1024 * 1024) { // 50MB
      recommendations.push('Cache size is large, consider implementing cache cleanup');
    }
    
    if (this.metrics.totalRequests > 1000 && this.metrics.hitRate < 0.7) {
      recommendations.push('Low cache hit rate detected, review caching strategy');
    }

    return {
      metrics: this.getMetrics(),
      uptime,
      efficiency,
      recommendations
    };
  }

  /**
   * Report metrics to analytics
   */
  private reportMetrics(): void {
    if (!this.config.enableAnalytics) return;

    try {
      track('navigation_sw_metrics', {
        hit_rate: Math.round(this.metrics.hitRate * 100) / 100,
        miss_rate: Math.round(this.metrics.missRate * 100) / 100,
        total_requests: this.metrics.totalRequests,
        cache_size_kb: Math.round(this.metrics.cacheSize / 1024),
        uptime_minutes: Math.round((Date.now() - this.startTime) / 60000),
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Failed to report metrics to analytics:', error);
    }
  }

  /**
   * Reset metrics (for testing/debugging)
   */
  resetMetrics(): void {
    this.metrics = {
      hitRate: 0,
      missRate: 0,
      totalRequests: 0,
      cacheSize: 0,
      lastUpdated: Date.now()
    };
    this.startTime = Date.now();
    
    console.log('Service Worker metrics reset');
  }

  /**
   * Track specific navigation event
   */
  trackNavigationEvent(eventType: string, data: Record<string, any> = {}): void {
    if (!this.config.enableAnalytics) return;

    try {
      track(`navigation_sw_${eventType}`, {
        ...data,
        hit_rate: Math.round(this.metrics.hitRate * 100) / 100,
        total_requests: this.metrics.totalRequests,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Failed to track navigation event:', error);
    }
  }

  /**
   * Generate metrics collection script for service worker
   */
  generateMetricsScript(): string {
    return `
// Metrics tracking in service worker
let swMetrics = {
  hits: 0,
  misses: 0,
  totalRequests: 0,
  startTime: Date.now()
};

function updateSWMetrics(type) {
  swMetrics.totalRequests++;
  if (type === 'hit') {
    swMetrics.hits++;
  } else {
    swMetrics.misses++;
  }
  
  // Report metrics every 50 requests
  if (swMetrics.totalRequests % 50 === 0) {
    postMessage({
      type: 'METRICS_UPDATE',
      data: {
        hitRate: swMetrics.hits / swMetrics.totalRequests,
        missRate: swMetrics.misses / swMetrics.totalRequests,
        totalRequests: swMetrics.totalRequests,
        uptime: Date.now() - swMetrics.startTime
      }
    });
  }
}

// Update postMessage calls to include metrics
function postMessage(message) {
  if (message.type === 'CACHE_HIT') {
    updateSWMetrics('hit');
  } else if (message.type === 'CACHE_MISS') {
    updateSWMetrics('miss');
  }
  
  self.clients.matchAll().then(clients => {
    clients.forEach(client => client.postMessage(message));
  });
}`.trim();
  }

  /**
   * Handle metrics update from service worker
   */
  handleMetricsUpdate(data: any): void {
    if (data.hitRate !== undefined) {
      this.metrics.hitRate = data.hitRate;
    }
    if (data.missRate !== undefined) {
      this.metrics.missRate = data.missRate;
    }
    if (data.totalRequests !== undefined) {
      this.metrics.totalRequests = data.totalRequests;
    }
    
    this.metrics.lastUpdated = Date.now();
    
    console.log('Metrics updated from service worker:', data);
  }
}

export default MetricsTracker;
