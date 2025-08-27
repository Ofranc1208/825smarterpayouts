/**
 * Bundle Analyzer Orchestrator - Advanced Optimization
 * 
 * Main orchestrator that coordinates bundle analysis, scoring, and reporting
 * 
 * @module BundleAnalyzerOrchestrator
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Modular Edition
 */

import { track } from '@vercel/analytics';
import { BundleMetricsCollector } from './BundleMetricsCollector';
import { OptimizationScorer } from './OptimizationScorer';
import { BundleReportGenerator } from './BundleReportGenerator';
import type { BundleMetrics } from '../BundleAnalyzer';

export interface OptimizationConfig {
  enableTreeShaking: boolean;
  enableCodeSplitting: boolean;
  enableCompression: boolean;
  targetBundleSize: number; // in KB
  enableAnalytics: boolean;
}

/**
 * Bundle Analyzer Orchestrator
 * 
 * Coordinates all bundle analysis functionality using modular services
 */
export class BundleAnalyzerOrchestrator {
  private config: OptimizationConfig;
  private metricsCollector: BundleMetricsCollector;
  private optimizationScorer: OptimizationScorer;
  private reportGenerator: BundleReportGenerator;
  private lastMetrics: BundleMetrics;

  constructor(config: Partial<OptimizationConfig> = {}) {
    this.config = {
      enableTreeShaking: true,
      enableCodeSplitting: true,
      enableCompression: true,
      targetBundleSize: 50, // 50KB target
      enableAnalytics: true,
      ...config
    };

    // Initialize services
    this.metricsCollector = new BundleMetricsCollector();
    this.optimizationScorer = new OptimizationScorer({
      targetBundleSize: this.config.targetBundleSize,
      enableTreeShaking: this.config.enableTreeShaking
    });
    this.reportGenerator = new BundleReportGenerator();

    this.lastMetrics = {
      totalSize: 0,
      gzippedSize: 0,
      treeShakenSize: 0,
      unusedExports: [],
      heavyDependencies: [],
      optimizationScore: 0,
      recommendations: []
    };
  }

  /**
   * Analyze current bundle and provide optimization insights
   */
  async analyzeBundleSize(): Promise<BundleMetrics> {
    try {
      // Collect bundle data
      const bundleData = await this.metricsCollector.collectBundleData();
      
      // Calculate optimization score and recommendations
      const optimization = this.optimizationScorer.calculateOptimization(bundleData);
      
      // Create final metrics
      this.lastMetrics = {
        totalSize: bundleData.totalSize,
        gzippedSize: bundleData.gzippedSize,
        treeShakenSize: bundleData.treeShakenSize,
        unusedExports: bundleData.unusedExports,
        heavyDependencies: bundleData.heavyDependencies,
        optimizationScore: optimization.score,
        recommendations: optimization.recommendations
      };

      // Track bundle metrics
      if (this.config.enableAnalytics) {
        this.trackBundleMetrics();
      }

      return this.lastMetrics;
    } catch (error) {
      console.error('Bundle analysis failed:', error);
      throw error;
    }
  }

  /**
   * Generate comprehensive bundle report
   */
  async generateReport(format: 'markdown' | 'json' | 'html' = 'markdown'): Promise<string> {
    // Ensure we have fresh data
    await this.analyzeBundleSize();
    
    // Collect data again for report
    const bundleData = await this.metricsCollector.collectBundleData();
    const optimization = this.optimizationScorer.calculateOptimization(bundleData);
    
    // Update report generator format
    this.reportGenerator.updateConfig({ format });
    
    // Generate and format report
    const report = this.reportGenerator.generateReport(bundleData, optimization);
    return this.reportGenerator.formatReport(report);
  }

  /**
   * Get webpack optimization configuration
   */
  getWebpackOptimizations(): Record<string, any> {
    return {
      optimization: {
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            navigation: {
              name: 'navigation',
              test: /[\\/]Navigation[\\/]/,
              priority: 10,
              reuseExistingChunk: true
            }
          }
        }
      },
      resolve: {
        alias: {
          '@navigation': './src/components/Navigation'
        }
      }
    };
  }

  /**
   * Track bundle metrics to analytics
   */
  private trackBundleMetrics(): void {
    track('navigation_bundle_analysis', {
      total_size: this.lastMetrics.totalSize,
      gzipped_size: this.lastMetrics.gzippedSize,
      optimization_score: this.lastMetrics.optimizationScore,
      unused_exports_count: this.lastMetrics.unusedExports.length,
      heavy_dependencies_count: this.lastMetrics.heavyDependencies.length,
      timestamp: Date.now()
    });
  }

  /**
   * Add custom component size
   */
  addComponentSize(component: string, size: number): void {
    this.metricsCollector.addComponentSize(component, size);
  }

  /**
   * Update optimization configuration
   */
  updateConfig(config: Partial<OptimizationConfig>): void {
    this.config = { ...this.config, ...config };
    
    // Update scorer configuration
    this.optimizationScorer.updateConfig({
      targetBundleSize: this.config.targetBundleSize,
      enableTreeShaking: this.config.enableTreeShaking
    });
  }

  /**
   * Get current configuration
   */
  getConfig(): OptimizationConfig {
    return { ...this.config };
  }

  /**
   * Get last analysis results
   */
  getLastMetrics(): BundleMetrics {
    return { ...this.lastMetrics };
  }

  /**
   * Get component sizes
   */
  getComponentSizes(): Record<string, number> {
    return this.metricsCollector.getComponentSizes();
  }
}

export default BundleAnalyzerOrchestrator;
