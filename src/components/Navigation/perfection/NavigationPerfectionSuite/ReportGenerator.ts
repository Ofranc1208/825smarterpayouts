/**
 * Report Generator - Perfection Suite Reports
 * 
 * Handles generation of recommendations, achievements, next steps,
 * and comprehensive perfection reports.
 * 
 * @module ReportGenerator
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Modular Edition
 */

import { track } from '@vercel/analytics';
import type { PerfectionMetrics, PerfectionReport } from './types';

export class ReportGenerator {
  private enableAnalytics: boolean;

  constructor(enableAnalytics: boolean = true) {
    this.enableAnalytics = enableAnalytics;
  }

  /**
   * Generate comprehensive perfection report
   */
  generateReport(metrics: PerfectionMetrics): PerfectionReport {
    const recommendations = this.generateRecommendations(metrics);
    const achievements = this.identifyAchievements(metrics);
    const nextSteps = this.suggestNextSteps(metrics);

    const report: PerfectionReport = {
      metrics,
      recommendations,
      achievements,
      nextSteps,
      timestamp: Date.now()
    };

    // Track report generation
    if (this.enableAnalytics) {
      track('navigation_perfection_report_generated', {
        overall_score: metrics.overallPerfectionScore,
        achievements_count: achievements.length,
        recommendations_count: recommendations.length,
        timestamp: Date.now()
      });
    }

    return report;
  }

  /**
   * Generate recommendations based on metrics
   */
  generateRecommendations(metrics: PerfectionMetrics): string[] {
    const recommendations: string[] = [];

    if (metrics.bundleOptimizationScore < 90) {
      recommendations.push('🎯 Optimize bundle size with advanced tree-shaking');
    }

    if (!metrics.offlineReadiness) {
      recommendations.push('📱 Enable offline support for better user experience');
    }

    if (metrics.activeABTests < 2) {
      recommendations.push('🧪 Implement A/B tests for navigation optimization');
    }

    if (metrics.analyticsInsights < 5) {
      recommendations.push('📊 Enable advanced analytics for deeper insights');
    }

    if (metrics.performanceScore < 95) {
      recommendations.push('⚡ Address performance budget violations');
    }

    if (metrics.cacheHitRate < 85) {
      recommendations.push('🗄️ Optimize caching strategy for better hit rates');
    }

    if (metrics.overallPerfectionScore >= 95) {
      recommendations.push('🏆 Congratulations! You have achieved navigation perfection!');
    }

    return recommendations;
  }

  /**
   * Identify achievements based on metrics
   */
  identifyAchievements(metrics: PerfectionMetrics): string[] {
    const achievements: string[] = [];

    if (metrics.bundleOptimizationScore >= 95) {
      achievements.push('🎯 Bundle Optimization Master');
    }

    if (metrics.offlineReadiness) {
      achievements.push('📱 Offline Navigation Champion');
    }

    if (metrics.performanceScore >= 95) {
      achievements.push('⚡ Performance Excellence');
    }

    if (metrics.cacheHitRate >= 90) {
      achievements.push('🗄️ Caching Virtuoso');
    }

    if (metrics.overallPerfectionScore >= 98) {
      achievements.push('🏆 Navigation Perfection Achieved');
    }

    if (metrics.overallPerfectionScore >= 90) {
      achievements.push('🌟 Enterprise-Grade Navigation');
    }

    if (metrics.activeABTests >= 3) {
      achievements.push('🧪 A/B Testing Expert');
    }

    return achievements;
  }

  /**
   * Suggest next steps based on metrics
   */
  suggestNextSteps(metrics: PerfectionMetrics): string[] {
    const nextSteps: string[] = [];

    if (metrics.overallPerfectionScore < 95) {
      nextSteps.push('Focus on addressing the lowest scoring areas first');
    }

    if (metrics.activeABTests === 0) {
      nextSteps.push('Set up your first A/B test for navigation layout');
    }

    if (metrics.analyticsInsights < 3) {
      nextSteps.push('Enable heatmap tracking to understand user behavior');
    }

    if (metrics.bundleOptimizationScore < 85) {
      nextSteps.push('Run bundle analysis to identify optimization opportunities');
    }

    if (metrics.performanceScore < 90) {
      nextSteps.push('Review and tighten performance budgets');
    }

    if (metrics.cacheHitRate < 80) {
      nextSteps.push('Analyze cache patterns and optimize preloading strategy');
    }

    // Always include these general recommendations
    nextSteps.push('Monitor performance metrics daily');
    nextSteps.push('Review and update performance budgets monthly');

    return nextSteps;
  }

  /**
   * Generate priority-based action plan
   */
  generateActionPlan(metrics: PerfectionMetrics): {
    high: string[];
    medium: string[];
    low: string[];
  } {
    const high: string[] = [];
    const medium: string[] = [];
    const low: string[] = [];

    // High priority (critical issues)
    if (metrics.performanceScore < 80) {
      high.push('🚨 Critical: Address severe performance issues');
    }

    if (metrics.overallPerfectionScore < 70) {
      high.push('🚨 Critical: Overall system needs immediate attention');
    }

    // Medium priority (important improvements)
    if (metrics.bundleOptimizationScore < 85) {
      medium.push('📦 Important: Optimize bundle size');
    }

    if (!metrics.offlineReadiness) {
      medium.push('📱 Important: Implement offline support');
    }

    if (metrics.cacheHitRate < 75) {
      medium.push('🗄️ Important: Improve caching strategy');
    }

    // Low priority (nice to have)
    if (metrics.activeABTests < 2) {
      low.push('🧪 Enhancement: Add more A/B tests');
    }

    if (metrics.analyticsInsights < 5) {
      low.push('📊 Enhancement: Expand analytics insights');
    }

    return { high, medium, low };
  }

  /**
   * Generate executive summary
   */
  generateExecutiveSummary(metrics: PerfectionMetrics): {
    status: 'excellent' | 'good' | 'needs_improvement' | 'critical';
    summary: string;
    keyMetrics: { name: string; value: string; status: 'good' | 'warning' | 'critical' }[];
  } {
    const score = metrics.overallPerfectionScore;
    let status: 'excellent' | 'good' | 'needs_improvement' | 'critical';
    let summary: string;

    if (score >= 95) {
      status = 'excellent';
      summary = 'Navigation system is performing at excellence level with all key metrics meeting or exceeding targets.';
    } else if (score >= 85) {
      status = 'good';
      summary = 'Navigation system is performing well with minor areas for improvement.';
    } else if (score >= 70) {
      status = 'needs_improvement';
      summary = 'Navigation system requires attention in several key areas to reach optimal performance.';
    } else {
      status = 'critical';
      summary = 'Navigation system has critical issues that need immediate attention.';
    }

    const keyMetrics = [
      {
        name: 'Overall Score',
        value: `${score}/100`,
        status: score >= 90 ? 'good' : score >= 70 ? 'warning' : 'critical' as 'good' | 'warning' | 'critical'
      },
      {
        name: 'Performance',
        value: `${metrics.performanceScore}/100`,
        status: metrics.performanceScore >= 90 ? 'good' : metrics.performanceScore >= 70 ? 'warning' : 'critical' as 'good' | 'warning' | 'critical'
      },
      {
        name: 'Bundle Optimization',
        value: `${metrics.bundleOptimizationScore}/100`,
        status: metrics.bundleOptimizationScore >= 90 ? 'good' : metrics.bundleOptimizationScore >= 70 ? 'warning' : 'critical' as 'good' | 'warning' | 'critical'
      },
      {
        name: 'Cache Hit Rate',
        value: `${Math.round(metrics.cacheHitRate)}%`,
        status: metrics.cacheHitRate >= 85 ? 'good' : metrics.cacheHitRate >= 70 ? 'warning' : 'critical' as 'good' | 'warning' | 'critical'
      }
    ];

    return { status, summary, keyMetrics };
  }

  /**
   * Update analytics setting
   */
  setAnalyticsEnabled(enabled: boolean): void {
    this.enableAnalytics = enabled;
  }
}

export default ReportGenerator;
