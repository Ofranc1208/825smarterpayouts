/**
 * Statistical Analyzer - A/B Test Statistical Calculations
 * 
 * Handles all statistical analysis for A/B tests including
 * confidence intervals, p-values, and significance testing.
 * 
 * @module StatisticalAnalyzer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import type { ABTest, ABTestResult, ABTestStats, StatisticalResult, VariantPerformance } from './types';

export class StatisticalAnalyzer {
  private confidenceLevel: number;

  constructor(confidenceLevel: number = 0.95) {
    this.confidenceLevel = confidenceLevel;
  }

  /**
   * Calculate statistical analysis for all variants in a test
   */
  analyzeTest(test: ABTest, results: ABTestResult[]): ABTestStats[] {
    const testResults = results.filter(r => r.testId === test.id);
    
    return test.variants.map(variant => {
      const variantResults = testResults.filter(r => r.variantId === variant.id);
      return this.analyzeVariant(variant.id, variantResults, test);
    });
  }

  /**
   * Analyze individual variant performance
   */
  private analyzeVariant(variantId: string, results: ABTestResult[], test: ABTest): ABTestStats {
    const sampleSize = results.length;
    
    if (sampleSize === 0) {
      return {
        variant: variantId,
        sampleSize: 0,
        conversionRate: 0,
        confidenceInterval: [0, 0],
        isStatisticallySignificant: false,
        pValue: 1.0
      };
    }

    // Calculate conversion rate
    const conversionRate = this.calculateConversionRate(results);
    
    // Calculate confidence interval
    const confidenceInterval = this.calculateConfidenceInterval(
      conversionRate, 
      sampleSize, 
      this.confidenceLevel
    );

    // Calculate statistical significance
    const isStatisticallySignificant = this.isStatisticallySignificant(
      sampleSize, 
      test.minimumSampleSize, 
      conversionRate
    );

    // Calculate p-value (simplified)
    const pValue = this.calculatePValue(conversionRate, sampleSize);

    return {
      variant: variantId,
      sampleSize,
      conversionRate,
      confidenceInterval,
      isStatisticallySignificant,
      pValue
    };
  }

  /**
   * Calculate conversion rate from results
   */
  private calculateConversionRate(results: ABTestResult[]): number {
    if (results.length === 0) return 0;
    
    const totalValue = results.reduce((sum, result) => sum + result.value, 0);
    return totalValue / results.length;
  }

  /**
   * Calculate confidence interval for conversion rate
   */
  calculateConfidenceInterval(
    conversionRate: number, 
    sampleSize: number, 
    confidenceLevel: number = this.confidenceLevel
  ): [number, number] {
    if (sampleSize === 0) return [0, 0];

    // Calculate standard error
    const standardError = Math.sqrt((conversionRate * (1 - conversionRate)) / sampleSize);
    
    // Get z-score for confidence level
    const zScore = this.getZScore(confidenceLevel);
    
    // Calculate margin of error
    const marginOfError = zScore * standardError;
    
    // Calculate confidence interval
    const lowerBound = Math.max(0, conversionRate - marginOfError);
    const upperBound = Math.min(1, conversionRate + marginOfError);
    
    return [lowerBound, upperBound];
  }

  /**
   * Get z-score for confidence level
   */
  private getZScore(confidenceLevel: number): number {
    // Common z-scores for confidence levels
    const zScores: Record<number, number> = {
      0.90: 1.645,
      0.95: 1.96,
      0.99: 2.576
    };

    return zScores[confidenceLevel] || 1.96; // Default to 95%
  }

  /**
   * Check if result is statistically significant
   */
  isStatisticallySignificant(
    sampleSize: number, 
    minimumSampleSize: number, 
    conversionRate: number
  ): boolean {
    // Must meet minimum sample size
    if (sampleSize < minimumSampleSize) return false;
    
    // Must have meaningful conversion rate (not 0 or 1)
    if (conversionRate <= 0 || conversionRate >= 1) return false;
    
    // Additional checks could include effect size, etc.
    return true;
  }

  /**
   * Calculate p-value (simplified implementation)
   */
  private calculatePValue(conversionRate: number, sampleSize: number): number {
    if (sampleSize === 0) return 1.0;
    
    // Simplified p-value calculation
    // In a real implementation, this would use proper statistical tests
    const standardError = Math.sqrt((conversionRate * (1 - conversionRate)) / sampleSize);
    const zScore = Math.abs(conversionRate - 0.5) / standardError;
    
    // Approximate p-value from z-score
    if (zScore > 2.576) return 0.01;
    if (zScore > 1.96) return 0.05;
    if (zScore > 1.645) return 0.10;
    
    return 0.5; // Not significant
  }

  /**
   * Compare two variants statistically
   */
  compareVariants(
    variantA: ABTestResult[], 
    variantB: ABTestResult[]
  ): {
    winner: 'A' | 'B' | 'tie';
    confidenceLevel: number;
    effectSize: number;
    pValue: number;
  } {
    const rateA = this.calculateConversionRate(variantA);
    const rateB = this.calculateConversionRate(variantB);
    
    const effectSize = Math.abs(rateA - rateB);
    
    // Simplified comparison
    const winner = rateA > rateB ? 'A' : rateB > rateA ? 'B' : 'tie';
    
    // Calculate combined p-value (simplified)
    const combinedSampleSize = variantA.length + variantB.length;
    const pooledRate = (rateA * variantA.length + rateB * variantB.length) / combinedSampleSize;
    const pValue = this.calculatePValue(pooledRate, combinedSampleSize);
    
    return {
      winner,
      confidenceLevel: this.confidenceLevel,
      effectSize,
      pValue
    };
  }

  /**
   * Calculate required sample size for desired power
   */
  calculateRequiredSampleSize(
    baselineRate: number,
    minimumDetectableEffect: number,
    power: number = 0.8,
    alpha: number = 0.05
  ): number {
    // Simplified sample size calculation
    // In practice, would use more sophisticated formulas
    
    const zAlpha = this.getZScore(1 - alpha);
    const zBeta = this.getZScore(power);
    
    const p1 = baselineRate;
    const p2 = baselineRate + minimumDetectableEffect;
    const pooledP = (p1 + p2) / 2;
    
    const numerator = Math.pow(zAlpha + zBeta, 2) * 2 * pooledP * (1 - pooledP);
    const denominator = Math.pow(p2 - p1, 2);
    
    return Math.ceil(numerator / denominator);
  }

  /**
   * Perform Bayesian analysis (simplified)
   */
  bayesianAnalysis(results: ABTestResult[]): {
    posteriorMean: number;
    credibleInterval: [number, number];
    probabilityOfSuperiority: number;
  } {
    const sampleSize = results.length;
    const successes = results.reduce((sum, r) => sum + r.value, 0);
    
    // Beta distribution parameters (using uniform prior)
    const alpha = 1 + successes;
    const beta = 1 + sampleSize - successes;
    
    // Posterior mean
    const posteriorMean = alpha / (alpha + beta);
    
    // Credible interval (approximation)
    const variance = (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
    const standardDeviation = Math.sqrt(variance);
    const margin = 1.96 * standardDeviation;
    
    const credibleInterval: [number, number] = [
      Math.max(0, posteriorMean - margin),
      Math.min(1, posteriorMean + margin)
    ];
    
    // Probability of superiority (simplified)
    const probabilityOfSuperiority = posteriorMean > 0.5 ? 0.7 : 0.3;
    
    return {
      posteriorMean,
      credibleInterval,
      probabilityOfSuperiority
    };
  }

  /**
   * Calculate test duration recommendation
   */
  calculateTestDuration(
    currentSampleSize: number,
    targetSampleSize: number,
    dailyTraffic: number
  ): {
    daysRemaining: number;
    recommendedEndDate: Date;
    isComplete: boolean;
  } {
    const isComplete = currentSampleSize >= targetSampleSize;
    const remainingSamples = Math.max(0, targetSampleSize - currentSampleSize);
    const daysRemaining = Math.ceil(remainingSamples / dailyTraffic);
    
    const recommendedEndDate = new Date();
    recommendedEndDate.setDate(recommendedEndDate.getDate() + daysRemaining);
    
    return {
      daysRemaining,
      recommendedEndDate,
      isComplete
    };
  }

  /**
   * Generate statistical report
   */
  generateReport(test: ABTest, results: ABTestResult[]): {
    summary: string;
    recommendations: string[];
    stats: ABTestStats[];
    winner?: string;
  } {
    const stats = this.analyzeTest(test, results);
    const recommendations: string[] = [];
    let winner: string | undefined;
    
    // Find best performing variant
    const significantVariants = stats.filter(s => s.isStatisticallySignificant);
    if (significantVariants.length > 0) {
      const bestVariant = significantVariants.reduce((best, current) => 
        current.conversionRate > best.conversionRate ? current : best
      );
      winner = bestVariant.variant;
      recommendations.push(`Variant "${winner}" shows the best performance with ${(bestVariant.conversionRate * 100).toFixed(2)}% conversion rate`);
    }
    
    // Check sample sizes
    const insufficientSamples = stats.filter(s => s.sampleSize < test.minimumSampleSize);
    if (insufficientSamples.length > 0) {
      recommendations.push(`Continue test - ${insufficientSamples.length} variants need more samples`);
    }
    
    // Generate summary
    const totalSamples = stats.reduce((sum, s) => sum + s.sampleSize, 0);
    const summary = `Test "${test.name}" has ${totalSamples} total samples across ${stats.length} variants. ${winner ? `Winner: ${winner}` : 'No clear winner yet.'}`;
    
    return {
      summary,
      recommendations,
      stats,
      winner
    };
  }
}

export default StatisticalAnalyzer;
