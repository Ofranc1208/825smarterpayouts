/**
 * Performance Service
 * 
 * Main service that orchestrates performance monitoring and analysis.
 * Uses smaller focused modules for navigation timing, resource tracking, and calculations.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { PerformanceMetrics, RealPageData, PageMetrics, TimeRange } from '../types';
import { navigationTimingTracker } from './core/NavigationTimingTracker';
import { resourceTimingTracker } from './core/ResourceTimingTracker';
import { performanceCalculator } from './calculators/PerformanceCalculator';

export class PerformanceService {
  /**
   * Initialize performance monitoring
   */
  initialize(): void {
    navigationTimingTracker.initialize();
    resourceTimingTracker.initialize();
    console.log('✅ Performance monitoring initialized');
  }

  /**
   * Get performance metrics
   */
  async getPerformanceMetrics(timeRange: TimeRange): Promise<PerformanceMetrics> {
    // Try to get real navigation metrics first
    const navigationMetrics = navigationTimingTracker.getNavigationMetrics();
    
    if (navigationMetrics) {
      return navigationMetrics;
    }

    // Fallback to default metrics
    return this.getFallbackPerformanceMetrics();
  }

  /**
   * Get page performance data
   */
  async getPagePerformanceData(timeRange: TimeRange): Promise<RealPageData[]> {
    return performanceCalculator.generatePagePerformanceData(timeRange);
  }

  /**
   * Get metrics for a specific page
   */
  async getPageMetrics(path: string, timeRange: TimeRange): Promise<PageMetrics> {
    return performanceCalculator.calculatePageMetrics(path, timeRange);
  }

  /**
   * Get resource performance data
   */
  getResourcePerformance() {
    return resourceTimingTracker.getResourcePerformance();
  }

  /**
   * Get resource performance summary
   */
  getResourceSummary() {
    return resourceTimingTracker.getResourceSummary();
  }

  /**
   * Get performance insights
   */
  async getPerformanceInsights(timeRange: TimeRange) {
    const metrics = await this.getPerformanceMetrics(timeRange);
    return performanceCalculator.getPerformanceInsights(metrics);
  }

  /**
   * Clear performance data
   */
  clearPerformanceData(): void {
    resourceTimingTracker.clearResourceTimings();
  }

  // Private fallback method
  private getFallbackPerformanceMetrics(): PerformanceMetrics {
    return {
      pageLoad: { 
        name: 'Page Load Time', 
        value: 1800, 
        unit: 'ms', 
        change: -10, 
        status: 'good', 
        icon: '📄' 
      },
      domReady: { 
        name: 'DOM Ready', 
        value: 900, 
        unit: 'ms', 
        change: -5, 
        status: 'good', 
        icon: '🏗️' 
      },
      firstByte: { 
        name: 'First Byte', 
        value: 180, 
        unit: 'ms', 
        change: 2, 
        status: 'good', 
        icon: '🚀' 
      }
    };
  }
}

// Export singleton instance
export const performanceService = new PerformanceService();