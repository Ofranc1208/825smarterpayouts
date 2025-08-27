/**
 * Performance Analyzer
 * 
 * Analyzes performance metrics, generates scores, and provides recommendations
 * 
 * @module usePerformanceAnalyzer
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useCallback, useRef } from 'react';
import type { NavigationPerformanceMetrics } from '../../types';

interface PerformanceAnalyzerConfig {
  metrics: NavigationPerformanceMetrics;
  debug: boolean;
}

interface PerformanceThresholds {
  renderTime: { good: number; poor: number };
  interactionTime: { good: number; poor: number };
  dropdownOpenTime: { good: number; poor: number };
  mobileMenuToggleTime: { good: number; poor: number };
  memoryUsage: { good: number; poor: number };
  errorCount: { good: number; poor: number };
}

/**
 * Hook for analyzing performance metrics and generating insights
 */
export function usePerformanceAnalyzer({ metrics, debug }: PerformanceAnalyzerConfig) {
  const metricsHistory = useRef<NavigationPerformanceMetrics[]>([]);

  /**
   * Performance thresholds for scoring
   */
  const thresholds: PerformanceThresholds = {
    renderTime: { good: 500, poor: 1000 },
    interactionTime: { good: 50, poor: 100 },
    dropdownOpenTime: { good: 100, poor: 200 },
    mobileMenuToggleTime: { good: 75, poor: 150 },
    memoryUsage: { good: 25, poor: 50 },
    errorCount: { good: 0, poor: 1 }
  };

  /**
   * Debug logging for analyzer events
   */
  const debugLog = useCallback((event: string, data: any) => {
    if (debug) {
      console.log(`[Navigation Performance - Analyzer] ${event}:`, data);
    }
  }, [debug]);

  /**
   * Add metrics to history for trend analysis
   */
  const addToHistory = useCallback((newMetrics: NavigationPerformanceMetrics) => {
    metricsHistory.current.push(newMetrics);
    
    // Keep only last 100 measurements
    if (metricsHistory.current.length > 100) {
      metricsHistory.current = metricsHistory.current.slice(-100);
    }

    debugLog('Metrics Added to History', { 
      newMetrics, 
      historyLength: metricsHistory.current.length 
    });
  }, [debugLog]);

  /**
   * Get average metrics over time
   */
  const getAverageMetrics = useCallback((): NavigationPerformanceMetrics => {
    const history = metricsHistory.current;
    if (history.length === 0) return metrics;

    const averages = history.reduce((acc, metric) => ({
      renderTime: acc.renderTime + metric.renderTime,
      interactionTime: acc.interactionTime + metric.interactionTime,
      dropdownOpenTime: acc.dropdownOpenTime + metric.dropdownOpenTime,
      mobileMenuToggleTime: acc.mobileMenuToggleTime + metric.mobileMenuToggleTime,
      memoryUsage: (acc.memoryUsage || 0) + (metric.memoryUsage || 0),
      errorCount: acc.errorCount + metric.errorCount,
      accessibilityScore: (acc.accessibilityScore || 0) + (metric.accessibilityScore || 0)
    }), {
      renderTime: 0,
      interactionTime: 0,
      dropdownOpenTime: 0,
      mobileMenuToggleTime: 0,
      memoryUsage: 0,
      errorCount: 0,
      accessibilityScore: 0
    });

    const count = history.length;
    const result = {
      renderTime: averages.renderTime / count,
      interactionTime: averages.interactionTime / count,
      dropdownOpenTime: averages.dropdownOpenTime / count,
      mobileMenuToggleTime: averages.mobileMenuToggleTime / count,
      memoryUsage: (averages.memoryUsage || 0) / count,
      errorCount: averages.errorCount / count,
      accessibilityScore: (averages.accessibilityScore || 0) / count
    };

    debugLog('Average Metrics Calculated', { result, sampleSize: count });
    return result;
  }, [metrics, debugLog]);

  /**
   * Calculate performance score for a specific metric
   */
  const calculateMetricScore = useCallback((
    value: number, 
    metricName: keyof PerformanceThresholds
  ): number => {
    const threshold = thresholds[metricName];
    
    if (value <= threshold.good) return 100;
    if (value >= threshold.poor) return 0;
    
    // Linear interpolation between good and poor
    const range = threshold.poor - threshold.good;
    const position = value - threshold.good;
    const score = 100 - (position / range) * 100;
    
    return Math.max(0, Math.min(100, score));
  }, []);

  /**
   * Get performance score (0-100)
   */
  const getPerformanceScore = useCallback((): number => {
    const current = metrics;
    
    // Calculate individual metric scores
    const scores = {
      renderTime: calculateMetricScore(current.renderTime, 'renderTime'),
      interactionTime: calculateMetricScore(current.interactionTime, 'interactionTime'),
      dropdownOpenTime: calculateMetricScore(current.dropdownOpenTime, 'dropdownOpenTime'),
      mobileMenuToggleTime: calculateMetricScore(current.mobileMenuToggleTime, 'mobileMenuToggleTime'),
      memoryUsage: calculateMetricScore(current.memoryUsage || 0, 'memoryUsage'),
      errorCount: calculateMetricScore(current.errorCount, 'errorCount')
    };

    // Weighted average (some metrics are more important)
    const weights = {
      renderTime: 0.25,      // 25% - Critical for user experience
      interactionTime: 0.25, // 25% - Critical for responsiveness
      dropdownOpenTime: 0.15, // 15% - Important for UX
      mobileMenuToggleTime: 0.15, // 15% - Important for mobile UX
      memoryUsage: 0.10,     // 10% - Important for stability
      errorCount: 0.10       // 10% - Important for reliability
    };

    const weightedScore = Object.entries(scores).reduce((total, [metric, score]) => {
      const weight = weights[metric as keyof typeof weights];
      return total + (score * weight);
    }, 0);

    const finalScore = Math.round(weightedScore);
    
    debugLog('Performance Score Calculated', { 
      scores, 
      weights, 
      weightedScore, 
      finalScore,
      metrics: current 
    });

    return finalScore;
  }, [metrics, calculateMetricScore, debugLog]);

  /**
   * Get performance grade (A-F)
   */
  const getPerformanceGrade = useCallback((): string => {
    const score = getPerformanceScore();
    
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }, [getPerformanceScore]);

  /**
   * Get performance recommendations
   */
  const getPerformanceRecommendations = useCallback((): string[] => {
    const recommendations: string[] = [];
    const current = metrics;

    if (current.renderTime > thresholds.renderTime.poor) {
      recommendations.push('Consider lazy loading navigation components to improve render time');
    } else if (current.renderTime > thresholds.renderTime.good) {
      recommendations.push('Optimize navigation component rendering for better performance');
    }
    
    if (current.interactionTime > thresholds.interactionTime.poor) {
      recommendations.push('Optimize event handlers for faster interactions');
    } else if (current.interactionTime > thresholds.interactionTime.good) {
      recommendations.push('Review event handler performance for potential optimizations');
    }
    
    if (current.dropdownOpenTime > thresholds.dropdownOpenTime.poor) {
      recommendations.push('Reduce dropdown animation complexity or duration');
    } else if (current.dropdownOpenTime > thresholds.dropdownOpenTime.good) {
      recommendations.push('Consider optimizing dropdown animations');
    }
    
    if (current.mobileMenuToggleTime > thresholds.mobileMenuToggleTime.poor) {
      recommendations.push('Optimize mobile menu animations for better performance');
    } else if (current.mobileMenuToggleTime > thresholds.mobileMenuToggleTime.good) {
      recommendations.push('Review mobile menu animation performance');
    }
    
    if (current.memoryUsage && current.memoryUsage > thresholds.memoryUsage.poor) {
      recommendations.push('Check for memory leaks in navigation components');
    } else if (current.memoryUsage && current.memoryUsage > thresholds.memoryUsage.good) {
      recommendations.push('Monitor memory usage for potential optimizations');
    }
    
    if (current.errorCount > thresholds.errorCount.poor) {
      recommendations.push('Fix navigation errors to improve reliability and performance');
    } else if (current.errorCount > thresholds.errorCount.good) {
      recommendations.push('Investigate and resolve navigation errors');
    }

    // General recommendations based on overall score
    const score = getPerformanceScore();
    if (score < 70) {
      recommendations.push('Consider implementing performance monitoring and alerting');
      recommendations.push('Review navigation architecture for performance bottlenecks');
    }

    debugLog('Performance Recommendations Generated', { 
      recommendations, 
      metrics: current, 
      score 
    });

    return recommendations;
  }, [metrics, getPerformanceScore, debugLog]);

  /**
   * Get detailed performance analysis
   */
  const getDetailedAnalysis = useCallback(() => {
    const current = metrics;
    const average = getAverageMetrics();
    const score = getPerformanceScore();
    const grade = getPerformanceGrade();
    const recommendations = getPerformanceRecommendations();

    const analysis = {
      current,
      average,
      score,
      grade,
      recommendations,
      thresholds,
      metricScores: {
        renderTime: calculateMetricScore(current.renderTime, 'renderTime'),
        interactionTime: calculateMetricScore(current.interactionTime, 'interactionTime'),
        dropdownOpenTime: calculateMetricScore(current.dropdownOpenTime, 'dropdownOpenTime'),
        mobileMenuToggleTime: calculateMetricScore(current.mobileMenuToggleTime, 'mobileMenuToggleTime'),
        memoryUsage: calculateMetricScore(current.memoryUsage || 0, 'memoryUsage'),
        errorCount: calculateMetricScore(current.errorCount, 'errorCount')
      },
      trends: {
        historyLength: metricsHistory.current.length,
        hasHistory: metricsHistory.current.length > 1
      }
    };

    debugLog('Detailed Analysis Generated', analysis);
    return analysis;
  }, [metrics, getAverageMetrics, getPerformanceScore, getPerformanceGrade, getPerformanceRecommendations, calculateMetricScore, debugLog]);

  /**
   * Reset metrics history
   */
  const resetHistory = useCallback(() => {
    metricsHistory.current = [];
    debugLog('Metrics History Reset', {});
  }, [debugLog]);

  /**
   * Export performance data
   */
  const exportPerformanceData = useCallback(() => {
    return {
      currentMetrics: metrics,
      history: metricsHistory.current.slice(), // Return a copy
      analysis: getDetailedAnalysis(),
      exportedAt: new Date().toISOString()
    };
  }, [metrics, getDetailedAnalysis]);

  return {
    addToHistory,
    getAverageMetrics,
    getPerformanceScore,
    getPerformanceGrade,
    getPerformanceRecommendations,
    getDetailedAnalysis,
    resetHistory,
    exportPerformanceData
  };
}
