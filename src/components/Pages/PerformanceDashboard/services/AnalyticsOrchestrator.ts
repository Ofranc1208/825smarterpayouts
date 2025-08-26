/**
 * Analytics Orchestrator
 * 
 * Main orchestrator service that coordinates all performance monitoring services.
 * Uses smaller focused modules for service coordination, configuration, and data aggregation.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { 
  RealMetrics, 
  RealPageData, 
  VisitorData, 
  SystemHealthStatus, 
  TimeRange,
  AnalyticsConfig 
} from './types';
import { serviceCoordinator } from './orchestrator/core/ServiceCoordinator';
import { configManager } from './orchestrator/config/ConfigManager';
import { dataAggregator } from './orchestrator/data/DataAggregator';

export class AnalyticsOrchestrator {
  /**
   * Initialize all analytics services
   */
  async initialize(config?: Partial<AnalyticsConfig>): Promise<void> {
    // Update configuration if provided
    if (config) {
      configManager.updateConfig(config);
    }

    // Get environment-specific config
    const finalConfig = configManager.getEnvironmentConfig();
    
    // Initialize services through coordinator
    await serviceCoordinator.initialize(finalConfig);
  }

  /**
   * Get comprehensive performance metrics
   */
  async getRealMetrics(timeRange: TimeRange = '24h'): Promise<RealMetrics> {
    return dataAggregator.getRealMetrics(timeRange);
  }

  /**
   * Get real page performance data
   */
  async getRealPageData(timeRange: TimeRange = '24h'): Promise<RealPageData[]> {
    return dataAggregator.getRealPageData(timeRange);
  }

  /**
   * Get real visitor data
   */
  async getRealVisitorData(timeRange: TimeRange = '24h'): Promise<VisitorData> {
    return dataAggregator.getRealVisitorData(timeRange);
  }

  /**
   * Get system health status
   */
  async getSystemHealth(): Promise<SystemHealthStatus> {
    return dataAggregator.getSystemHealth();
  }

  /**
   * Get complete dashboard summary
   */
  async getDashboardSummary(timeRange: TimeRange = '24h') {
    return dataAggregator.getDashboardSummary(timeRange);
  }

  /**
   * Track a Web Vital metric
   */
  trackWebVital(metric: any): void {
    serviceCoordinator.trackWebVital(metric);
  }

  /**
   * Track a page view
   */
  trackPageView(data: any): void {
    serviceCoordinator.trackPageView(data);
  }

  /**
   * Get analytics configuration
   */
  getConfig(): AnalyticsConfig {
    return configManager.getConfig();
  }

  /**
   * Update analytics configuration
   */
  updateConfig(newConfig: Partial<AnalyticsConfig>): void {
    configManager.updateConfig(newConfig);
  }

  /**
   * Check if orchestrator is initialized
   */
  isReady(): boolean {
    return serviceCoordinator.areServicesReady();
  }

  /**
   * Get service health status
   */
  getServiceStatus(): Record<string, boolean> {
    return serviceCoordinator.getServiceStatus();
  }

  /**
   * Perform comprehensive health check
   */
  async performHealthCheck() {
    return serviceCoordinator.performHealthCheck();
  }

  /**
   * Clear all stored data across services
   */
  clearAllData(): void {
    serviceCoordinator.clearAllData();
    dataAggregator.clearCache();
  }

  /**
   * Get performance insights
   */
  async getPerformanceInsights(timeRange: TimeRange = '24h') {
    const summary = await this.getDashboardSummary(timeRange);
    
    return {
      dataQuality: summary.dataQuality,
      lastUpdate: summary.lastUpdate,
      serviceHealth: await this.performHealthCheck(),
      cacheStats: dataAggregator.getCacheStats()
    };
  }
}

// Export singleton instance
export const analyticsOrchestrator = new AnalyticsOrchestrator();