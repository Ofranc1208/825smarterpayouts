/**
 * Optimization Scorer
 * 
 * Calculates optimization scores and generates recommendations
 * 
 * @module OptimizationScorer
 * @author SmarterPayouts Team
 * @since 2024
 */

import type { BundleData } from './BundleMetricsCollector';

export interface OptimizationResult {
  score: number;
  recommendations: string[];
  breakdown: {
    bundleSizeScore: number;
    unusedExportsScore: number;
    dependenciesScore: number;
    compressionScore: number;
  };
}

export interface ScoringConfig {
  targetBundleSize: number;
  enableTreeShaking: boolean;
  maxUnusedExports: number;
  maxHeavyDependencies: number;
}

/**
 * Optimization Scorer
 */
export class OptimizationScorer {
  private config: ScoringConfig;

  constructor(config: Partial<ScoringConfig> = {}) {
    this.config = {
      targetBundleSize: 50, // 50KB target
      enableTreeShaking: true,
      maxUnusedExports: 3,
      maxHeavyDependencies: 3,
      ...config
    };
  }

  /**
   * Calculate optimization score and generate recommendations
   */
  calculateOptimization(data: BundleData): OptimizationResult {
    const breakdown = {
      bundleSizeScore: this.calculateBundleSizeScore(data),
      unusedExportsScore: this.calculateUnusedExportsScore(data),
      dependenciesScore: this.calculateDependenciesScore(data),
      compressionScore: this.calculateCompressionScore(data)
    };

    const score = Math.round(
      (breakdown.bundleSizeScore + 
       breakdown.unusedExportsScore + 
       breakdown.dependenciesScore + 
       breakdown.compressionScore) / 4
    );

    const recommendations = this.generateRecommendations(data, breakdown);

    return {
      score: Math.max(0, Math.min(100, score)),
      recommendations,
      breakdown
    };
  }

  /**
   * Calculate bundle size score
   */
  private calculateBundleSizeScore(data: BundleData): number {
    let score = 100;

    if (data.totalSize > this.config.targetBundleSize) {
      const excess = data.totalSize - this.config.targetBundleSize;
      const penalty = Math.min(50, excess * 2);
      score -= penalty;
    }

    return Math.max(0, score);
  }

  /**
   * Calculate unused exports score
   */
  private calculateUnusedExportsScore(data: BundleData): number {
    let score = 100;

    if (data.unusedExports.length > this.config.maxUnusedExports) {
      const excess = data.unusedExports.length - this.config.maxUnusedExports;
      const penalty = Math.min(30, excess * 10);
      score -= penalty;
    }

    return Math.max(0, score);
  }

  /**
   * Calculate dependencies score
   */
  private calculateDependenciesScore(data: BundleData): number {
    let score = 100;

    if (data.heavyDependencies.length > this.config.maxHeavyDependencies) {
      const excess = data.heavyDependencies.length - this.config.maxHeavyDependencies;
      const penalty = Math.min(25, excess * 8);
      score -= penalty;
    }

    return Math.max(0, score);
  }

  /**
   * Calculate compression score
   */
  private calculateCompressionScore(data: BundleData): number {
    let score = 100;

    if (data.totalSize > 0) {
      const compressionRatio = data.gzippedSize / data.totalSize;
      
      if (compressionRatio > 0.5) {
        score -= 20; // Poor compression
      } else if (compressionRatio < 0.3) {
        score += 10; // Excellent compression
      }
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Generate optimization recommendations
   */
  private generateRecommendations(data: BundleData, breakdown: OptimizationResult['breakdown']): string[] {
    const recommendations: string[] = [];

    // Bundle size recommendations
    if (breakdown.bundleSizeScore < 80) {
      recommendations.push(`Bundle size (${data.totalSize}KB) exceeds target (${this.config.targetBundleSize}KB). Consider code splitting.`);
    }

    // Unused exports recommendations
    if (breakdown.unusedExportsScore < 80 && data.unusedExports.length > 0) {
      recommendations.push(`Remove ${data.unusedExports.length} unused exports to reduce bundle size.`);
    }

    // Heavy dependencies recommendations
    if (breakdown.dependenciesScore < 80 && data.heavyDependencies.length > 0) {
      const heaviest = data.heavyDependencies[0];
      recommendations.push(`Consider lazy loading heavy component: ${heaviest.name} (${heaviest.size}KB)`);
    }

    // Tree-shaking recommendations
    if (this.config.enableTreeShaking && data.treeShakenSize < data.totalSize) {
      const savings = data.totalSize - data.treeShakenSize;
      if (savings > 5) {
        recommendations.push(`Enable tree-shaking to save ${savings}KB (${Math.round(savings/data.totalSize*100)}%)`);
      }
    }

    // Compression recommendations
    if (breakdown.compressionScore < 80) {
      const compressionRatio = data.gzippedSize / data.totalSize;
      if (compressionRatio > 0.4) {
        recommendations.push('Consider enabling better compression or removing redundant code.');
      }
    }

    // Success message
    if (recommendations.length === 0) {
      recommendations.push('Bundle is well optimized! 🎉');
    }

    return recommendations;
  }

  /**
   * Update scoring configuration
   */
  updateConfig(config: Partial<ScoringConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration
   */
  getConfig(): ScoringConfig {
    return { ...this.config };
  }
}

export default OptimizationScorer;
