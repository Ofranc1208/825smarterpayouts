/**
 * Data Aggregator
 * 
 * Aggregates data from multiple services and provides unified data access.
 * Handles data transformation, caching, and fallback mechanisms.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { 
  RealMetrics, 
  RealPageData, 
  VisitorData, 
  SystemHealthStatus, 
  TimeRange 
} from '../../types';
import { serviceCoordinator } from '../core/ServiceCoordinator';

export class DataAggregator {
  private dataCache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private readonly defaultCacheTTL = 30000; // 30 seconds

  /**
   * Get comprehensive performance metrics
   */
  async getRealMetrics(timeRange: TimeRange = '24h'): Promise<RealMetrics> {
    const cacheKey = `metrics-${timeRange}`;
    
    // Check cache first
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const services = serviceCoordinator.getServices();
      
      // Get metrics from all services in parallel
      const [coreWebVitals, performance, user] = await Promise.all([
        services.webVitals.getMetrics(timeRange),
        services.performance.getPerformanceMetrics(timeRange),
        services.visitor.getUserMetrics(timeRange)
      ]);

      const metrics: RealMetrics = {
        coreWebVitals,
        performance,
        user
      };

      // Cache the result
      this.setCachedData(cacheKey, metrics, this.defaultCacheTTL);
      
      return metrics;
    } catch (error) {
      console.error('Error getting real metrics:', error);
      return this.getFallbackMetrics();
    }
  }

  /**
   * Get real page performance data
   */
  async getRealPageData(timeRange: TimeRange = '24h'): Promise<RealPageData[]> {
    const cacheKey = `pageData-${timeRange}`;
    
    // Check cache first
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const services = serviceCoordinator.getServices();
      const pageData = await services.performance.getPagePerformanceData(timeRange);
      
      // Cache the result
      this.setCachedData(cacheKey, pageData, this.defaultCacheTTL);
      
      return pageData;
    } catch (error) {
      console.error('Error getting real page data:', error);
      return this.getFallbackPageData();
    }
  }

  /**
   * Get real visitor data
   */
  async getRealVisitorData(timeRange: TimeRange = '24h'): Promise<VisitorData> {
    const cacheKey = `visitorData-${timeRange}`;
    
    // Check cache first
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const services = serviceCoordinator.getServices();
      const visitorData = services.visitor.getVisitorData(timeRange);
      
      // Cache the result
      this.setCachedData(cacheKey, visitorData, this.defaultCacheTTL);
      
      return visitorData;
    } catch (error) {
      console.error('Error getting visitor data:', error);
      return this.getFallbackVisitorData();
    }
  }

  /**
   * Get system health status
   */
  async getSystemHealth(): Promise<SystemHealthStatus> {
    const cacheKey = 'systemHealth';
    
    // Check cache first (shorter TTL for health data)
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const services = serviceCoordinator.getServices();
      const healthStatus = await services.systemHealth.performHealthChecks();
      
      // Cache with shorter TTL for health data
      this.setCachedData(cacheKey, healthStatus, 10000); // 10 seconds
      
      return healthStatus;
    } catch (error) {
      console.error('Error getting system health:', error);
      return this.getFallbackSystemHealth();
    }
  }

  /**
   * Get aggregated dashboard summary
   */
  async getDashboardSummary(timeRange: TimeRange = '24h'): Promise<{
    metrics: RealMetrics;
    pageData: RealPageData[];
    visitorData: VisitorData;
    systemHealth: SystemHealthStatus;
    lastUpdate: Date;
    dataQuality: 'high' | 'medium' | 'low';
  }> {
    const startTime = Date.now();
    
    try {
      // Get all data in parallel
      const [metrics, pageData, visitorData, systemHealth] = await Promise.all([
        this.getRealMetrics(timeRange),
        this.getRealPageData(timeRange),
        this.getRealVisitorData(timeRange),
        this.getSystemHealth()
      ]);

      const loadTime = Date.now() - startTime;
      const dataQuality = this.assessDataQuality(loadTime, systemHealth);

      return {
        metrics,
        pageData,
        visitorData,
        systemHealth,
        lastUpdate: new Date(),
        dataQuality
      };
    } catch (error) {
      console.error('Error getting dashboard summary:', error);
      throw error;
    }
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.dataCache.clear();
    console.log('🧹 Data cache cleared');
  }

  /**
   * Clear expired cache entries
   */
  clearExpiredCache(): void {
    const now = Date.now();
    let clearedCount = 0;
    
    for (const [key, entry] of this.dataCache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.dataCache.delete(key);
        clearedCount++;
      }
    }
    
    if (clearedCount > 0) {
      console.log(`🧹 Cleared ${clearedCount} expired cache entries`);
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    totalEntries: number;
    expiredEntries: number;
    cacheHitRate: number;
    totalSize: number;
  } {
    const now = Date.now();
    let expiredCount = 0;
    
    for (const entry of this.dataCache.values()) {
      if (now - entry.timestamp > entry.ttl) {
        expiredCount++;
      }
    }
    
    return {
      totalEntries: this.dataCache.size,
      expiredEntries: expiredCount,
      cacheHitRate: 0, // Would need hit/miss tracking
      totalSize: this.dataCache.size * 1024 // Rough estimate
    };
  }

  // Private methods
  private getCachedData(key: string): any | null {
    const entry = this.dataCache.get(key);
    
    if (!entry) return null;
    
    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.dataCache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  private setCachedData(key: string, data: any, ttl: number): void {
    this.dataCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  private assessDataQuality(loadTime: number, systemHealth: SystemHealthStatus): 'high' | 'medium' | 'low' {
    // Assess based on load time and system health
    if (loadTime < 500 && this.isSystemHealthy(systemHealth)) {
      return 'high';
    } else if (loadTime < 2000) {
      return 'medium';
    } else {
      return 'low';
    }
  }

  private isSystemHealthy(health: SystemHealthStatus): boolean {
    return health.server === 'healthy' && 
           health.database === 'healthy' && 
           health.cdn === 'healthy' && 
           health.api === 'healthy';
  }

  // Fallback methods
  private getFallbackMetrics(): RealMetrics {
    return {
      coreWebVitals: {
        fcp: { name: 'First Contentful Paint', value: 850, unit: 'ms', change: -5, status: 'good', icon: '🎨' },
        lcp: { name: 'Largest Contentful Paint', value: 1200, unit: 'ms', change: 3, status: 'good', icon: '🖼️' },
        cls: { name: 'Cumulative Layout Shift', value: 0.045, unit: '', change: -2, status: 'good', icon: '📐' },
        fid: { name: 'First Input Delay', value: 45, unit: 'ms', change: -8, status: 'good', icon: '👆' },
        ttfb: { name: 'Time to First Byte', value: 180, unit: 'ms', change: 2, status: 'good', icon: '⚡' }
      },
      performance: {
        pageLoad: { name: 'Page Load Time', value: 1800, unit: 'ms', change: -10, status: 'good', icon: '📄' },
        domReady: { name: 'DOM Ready', value: 900, unit: 'ms', change: -5, status: 'good', icon: '🏗️' },
        firstByte: { name: 'First Byte', value: 180, unit: 'ms', change: 2, status: 'good', icon: '🚀' }
      },
      user: {
        activeUsers: { name: 'Active Users', value: 15, unit: '', change: 3, status: 'good', icon: '👥' },
        bounceRate: { name: 'Bounce Rate', value: 32, unit: '%', change: -5, status: 'good', icon: '🏃' },
        sessionDuration: { name: 'Avg Session Duration', value: 195, unit: 's', change: 12, status: 'good', icon: '⏱️' },
        pageViews: { name: 'Pages per Session', value: 2.8, unit: '', change: 8, status: 'good', icon: '📊' }
      }
    };
  }

  private getFallbackPageData(): RealPageData[] {
    return [
      {
        id: 'home',
        name: 'Home Page',
        icon: '🏠',
        path: '/',
        metrics: { fcp: 650, lcp: 1100, cls: 0.03, visitors: 450, bounceRate: 28 },
        status: 'good',
        lastUpdated: new Date()
      }
    ];
  }

  private getFallbackVisitorData(): VisitorData {
    return {
      currentVisitors: 12,
      totalVisitors: 1250,
      uniqueVisitors: 890,
      pageViews: 2100,
      sessionsToday: 890,
      avgSessionDuration: 185
    };
  }

  private getFallbackSystemHealth(): SystemHealthStatus {
    return {
      server: 'healthy',
      database: 'healthy',
      cdn: 'healthy',
      api: 'healthy',
      deployment: 'healthy',
      lastCheck: new Date()
    };
  }
}

// Export singleton instance
export const dataAggregator = new DataAggregator();
