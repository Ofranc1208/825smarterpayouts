/**
 * Metrics Collector - Perfection Suite Metrics
 * 
 * Handles collection and calculation of all perfection metrics
 * from various navigation system components.
 * 
 * @module MetricsCollector
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Modular Edition
 */

import type { PerfectionMetrics, ComponentInstances, ScoreWeights } from './types';

export class MetricsCollector {
  private components: ComponentInstances;
  private scoreWeights: ScoreWeights;

  constructor(components: ComponentInstances) {
    this.components = components;
    this.scoreWeights = {
      bundleOptimization: 0.2,
      offline: 0.15,
      abTesting: 0.1,
      analytics: 0.15,
      performance: 0.25,
      caching: 0.15
    };
  }

  /**
   * Collect all perfection metrics
   */
  async collectMetrics(): Promise<PerfectionMetrics> {
    const bundleMetrics = await this.collectBundleMetrics();
    const cacheStats = this.collectCacheStats();
    const performanceReport = this.collectPerformanceMetrics();
    const analyticsStats = this.collectAnalyticsStats();
    const offlineReadiness = this.collectOfflineStatus();

    const metrics: PerfectionMetrics = {
      bundleOptimizationScore: bundleMetrics.optimizationScore,
      offlineReadiness,
      activeABTests: 0, // Would be populated from A/B testing system
      analyticsInsights: analyticsStats.insights,
      performanceScore: performanceReport.score,
      cacheHitRate: cacheStats.hitRate * 100,
      overallPerfectionScore: 0, // Calculated below
      lastUpdated: Date.now()
    };

    // Calculate overall perfection score
    metrics.overallPerfectionScore = this.calculateOverallScore(metrics);

    return metrics;
  }

  /**
   * Collect bundle optimization metrics
   */
  private async collectBundleMetrics(): Promise<{ optimizationScore: number }> {
    try {
      return await this.components.bundleAnalyzer.analyzeBundleSize();
    } catch (error) {
      console.warn('Failed to collect bundle metrics:', error);
      return { optimizationScore: 0 };
    }
  }

  /**
   * Collect cache statistics
   */
  private collectCacheStats(): { hitRate: number } {
    try {
      return this.components.smartCache.getStats();
    } catch (error) {
      console.warn('Failed to collect cache stats:', error);
      return { hitRate: 0 };
    }
  }

  /**
   * Collect performance metrics
   */
  private collectPerformanceMetrics(): { score: number } {
    try {
      return this.components.performanceEnforcer.checkBudgets();
    } catch (error) {
      console.warn('Failed to collect performance metrics:', error);
      return { score: 0 };
    }
  }

  /**
   * Collect analytics statistics
   */
  private collectAnalyticsStats(): { insights: number } {
    // Simplified analytics after cleanup
    return { insights: 0 };
  }

  /**
   * Collect offline readiness status
   */
  private collectOfflineStatus(): boolean {
    try {
      return this.components.serviceWorker.isOfflineReady();
    } catch (error) {
      console.warn('Failed to collect offline status:', error);
      return false;
    }
  }

  /**
   * Calculate overall perfection score
   */
  private calculateOverallScore(metrics: PerfectionMetrics): number {
    let score = 0;
    
    score += metrics.bundleOptimizationScore * this.scoreWeights.bundleOptimization;
    score += (metrics.offlineReadiness ? 100 : 0) * this.scoreWeights.offline;
    score += Math.min(100, metrics.activeABTests * 20) * this.scoreWeights.abTesting;
    score += Math.min(100, metrics.analyticsInsights * 10) * this.scoreWeights.analytics;
    score += metrics.performanceScore * this.scoreWeights.performance;
    score += metrics.cacheHitRate * this.scoreWeights.caching;

    return Math.round(score);
  }

  /**
   * Update score weights
   */
  updateScoreWeights(newWeights: Partial<ScoreWeights>): void {
    this.scoreWeights = { ...this.scoreWeights, ...newWeights };
  }

  /**
   * Get current score weights
   */
  getScoreWeights(): ScoreWeights {
    return { ...this.scoreWeights };
  }

  /**
   * Get metrics breakdown
   */
  getMetricsBreakdown(metrics: PerfectionMetrics): {
    component: string;
    score: number;
    weight: number;
    contribution: number;
  }[] {
    return [
      {
        component: 'Bundle Optimization',
        score: metrics.bundleOptimizationScore,
        weight: this.scoreWeights.bundleOptimization,
        contribution: metrics.bundleOptimizationScore * this.scoreWeights.bundleOptimization
      },
      {
        component: 'Offline Support',
        score: metrics.offlineReadiness ? 100 : 0,
        weight: this.scoreWeights.offline,
        contribution: (metrics.offlineReadiness ? 100 : 0) * this.scoreWeights.offline
      },
      {
        component: 'A/B Testing',
        score: Math.min(100, metrics.activeABTests * 20),
        weight: this.scoreWeights.abTesting,
        contribution: Math.min(100, metrics.activeABTests * 20) * this.scoreWeights.abTesting
      },
      {
        component: 'Analytics',
        score: Math.min(100, metrics.analyticsInsights * 10),
        weight: this.scoreWeights.analytics,
        contribution: Math.min(100, metrics.analyticsInsights * 10) * this.scoreWeights.analytics
      },
      {
        component: 'Performance',
        score: metrics.performanceScore,
        weight: this.scoreWeights.performance,
        contribution: metrics.performanceScore * this.scoreWeights.performance
      },
      {
        component: 'Caching',
        score: metrics.cacheHitRate,
        weight: this.scoreWeights.caching,
        contribution: metrics.cacheHitRate * this.scoreWeights.caching
      }
    ];
  }
}

export default MetricsCollector;
