/**
 * Insight Generator - Predictive Analytics and Insights
 * 
 * Generates actionable insights from analytics data including
 * predictive analytics, optimization opportunities, and recommendations.
 * 
 * @module InsightGenerator
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import { track } from '@vercel/analytics';
import type { NavigationInsight, HeatmapVisualizationPoint, UserJourneyStep, AdvancedAnalyticsConfig, InsightGenerationConfig } from './types';
import type { HeatmapTracker } from './HeatmapTracker';
import type { UserJourneyAnalyzer } from './UserJourneyAnalyzer';

export class InsightGenerator {
  private config: AdvancedAnalyticsConfig;
  private insightConfig: InsightGenerationConfig;
  private insights: NavigationInsight[] = [];
  private heatmapTracker: HeatmapTracker;
  private journeyAnalyzer: UserJourneyAnalyzer;

  constructor(
    config: AdvancedAnalyticsConfig,
    heatmapTracker: HeatmapTracker,
    journeyAnalyzer: UserJourneyAnalyzer
  ) {
    this.config = config;
    this.heatmapTracker = heatmapTracker;
    this.journeyAnalyzer = journeyAnalyzer;
    
    this.insightConfig = {
      confusionPatternThreshold: 3,
      dropOffTimeThreshold: 30000, // 30 seconds
      highIntensityThreshold: 10,
      popularPathMinCount: 5,
      realTimeAnalysisInterval: 60000 // 1 minute
    };
  }

  /**
   * Generate all insights from current data
   */
  generateAllInsights(): NavigationInsight[] {
    const insights: NavigationInsight[] = [];

    if (this.config.enablePredictiveAnalytics) {
      // Heatmap-based insights
      insights.push(...this.generateHeatmapInsights());
      
      // Journey-based insights
      insights.push(...this.generateJourneyInsights());
      
      // Predictive insights
      insights.push(...this.generatePredictiveInsights());
      
      // Performance insights
      insights.push(...this.generatePerformanceInsights());
    }

    // Store new insights
    insights.forEach(insight => this.addInsight(insight));

    return insights;
  }

  /**
   * Generate insights from heatmap data
   */
  private generateHeatmapInsights(): NavigationInsight[] {
    const insights: NavigationInsight[] = [];
    
    // Find high-intensity areas without navigation elements
    const unusedAreas = this.heatmapTracker.findUnusedNavigationAreas();
    
    unusedAreas.forEach(area => {
      if (area.intensity >= this.insightConfig.highIntensityThreshold) {
        insights.push({
          type: 'optimization_opportunity',
          description: `High user interest area at (${area.x}, ${area.y}) without navigation element`,
          confidence: Math.min(0.9, area.intensity / 50),
          impact: 'high',
          recommendation: 'Consider adding navigation element or call-to-action in this area',
          data: { x: area.x, y: area.y, intensity: area.intensity }
        });
      }
    });

    // Analyze heatmap patterns
    const heatmapStats = this.heatmapTracker.getHeatmapStats();
    
    // Low interaction areas
    if (heatmapStats.totalClicks < heatmapStats.totalMoves * 0.1) {
      insights.push({
        type: 'optimization_opportunity',
        description: 'Low click-to-movement ratio detected',
        confidence: 0.7,
        impact: 'medium',
        recommendation: 'Users are moving mouse but not clicking - consider improving call-to-action visibility',
        data: { 
          clickRatio: heatmapStats.totalClicks / heatmapStats.totalMoves,
          totalClicks: heatmapStats.totalClicks,
          totalMoves: heatmapStats.totalMoves
        }
      });
    }

    return insights;
  }

  /**
   * Generate insights from user journey data
   */
  private generateJourneyInsights(): NavigationInsight[] {
    const insights: NavigationInsight[] = [];
    
    // Get journey analysis
    const journeyInsights = this.journeyAnalyzer.analyzeAllJourneys();
    insights.push(...journeyInsights);

    // Analyze journey statistics
    const journeyStats = this.journeyAnalyzer.getJourneyStats();
    
    // Short session detection
    if (journeyStats.averageJourneyLength < 3) {
      insights.push({
        type: 'drop_off_point',
        description: 'Users have very short navigation sessions',
        confidence: 0.8,
        impact: 'high',
        recommendation: 'Investigate why users are not exploring navigation deeply',
        data: { averageLength: journeyStats.averageJourneyLength }
      });
    }

    // High bounce rate on specific elements
    journeyStats.mostActiveElements.forEach((element, index) => {
      if (index === 0 && element.interactions > journeyStats.totalSteps * 0.3) {
        insights.push({
          type: 'confusion_area',
          description: `Element "${element.element}" receives disproportionate attention`,
          confidence: 0.7,
          impact: 'medium',
          recommendation: 'This element may be confusing or users expect different behavior',
          data: element
        });
      }
    });

    return insights;
  }

  /**
   * Generate predictive insights
   */
  private generatePredictiveInsights(): NavigationInsight[] {
    const insights: NavigationInsight[] = [];
    
    // Predict user behavior based on patterns
    const currentJourney = this.journeyAnalyzer.getCurrentJourney();
    
    if (currentJourney.length >= 2) {
      const predictions = this.predictNextUserAction(currentJourney);
      
      predictions.forEach(prediction => {
        if (prediction.confidence > 0.6) {
          insights.push({
            type: 'optimization_opportunity',
            description: `User likely to interact with "${prediction.element}" next`,
            confidence: prediction.confidence,
            impact: 'medium',
            recommendation: 'Consider preloading or highlighting this element',
            data: prediction
          });
        }
      });
    }

    // Predict drop-off risk
    const dropOffRisk = this.calculateDropOffRisk(currentJourney);
    if (dropOffRisk > 0.7) {
      insights.push({
        type: 'drop_off_point',
        description: 'High risk of user dropping off based on current behavior pattern',
        confidence: dropOffRisk,
        impact: 'high',
        recommendation: 'Consider showing engagement prompts or simplifying navigation',
        data: { risk: dropOffRisk, journeyLength: currentJourney.length }
      });
    }

    return insights;
  }

  /**
   * Generate performance insights
   */
  private generatePerformanceInsights(): NavigationInsight[] {
    const insights: NavigationInsight[] = [];
    
    const heatmapStats = this.heatmapTracker.getHeatmapStats();
    const journeyStats = this.journeyAnalyzer.getJourneyStats();
    
    // Performance bottlenecks
    if (journeyStats.sessionDuration > 0) {
      const actionsPerMinute = (journeyStats.totalSteps / journeyStats.sessionDuration) * 60000;
      
      if (actionsPerMinute < 2) {
        insights.push({
          type: 'optimization_opportunity',
          description: 'Low user interaction rate detected',
          confidence: 0.6,
          impact: 'medium',
          recommendation: 'Navigation may be too complex or slow to respond',
          data: { 
            actionsPerMinute,
            sessionDuration: journeyStats.sessionDuration,
            totalSteps: journeyStats.totalSteps
          }
        });
      }
    }

    // Data quality insights
    const dataQuality = this.assessDataQuality();
    if (dataQuality.score < 0.7) {
      insights.push({
        type: 'optimization_opportunity',
        description: 'Analytics data quality could be improved',
        confidence: 0.8,
        impact: 'low',
        recommendation: dataQuality.recommendation,
        data: dataQuality
      });
    }

    return insights;
  }

  /**
   * Predict next user action based on journey patterns
   */
  private predictNextUserAction(currentJourney: UserJourneyStep[]): Array<{
    element: string;
    confidence: number;
    reasoning: string;
  }> {
    const predictions: Array<{ element: string; confidence: number; reasoning: string }> = [];
    
    // Analyze patterns from all journeys
    const allJourneys = Array.from(this.journeyAnalyzer.getAllJourneys().values());
    const lastElement = currentJourney[currentJourney.length - 1].element;
    
    // Find common next steps after current element
    const nextStepCounts: Map<string, number> = new Map();
    let totalTransitions = 0;
    
    allJourneys.forEach(journey => {
      for (let i = 0; i < journey.length - 1; i++) {
        if (journey[i].element === lastElement) {
          const nextElement = journey[i + 1].element;
          nextStepCounts.set(nextElement, (nextStepCounts.get(nextElement) || 0) + 1);
          totalTransitions++;
        }
      }
    });
    
    // Convert to predictions
    Array.from(nextStepCounts.entries()).forEach(([element, count]) => {
      const confidence = count / totalTransitions;
      if (confidence > 0.1) { // Only include if >10% probability
        predictions.push({
          element,
          confidence,
          reasoning: `${Math.round(confidence * 100)}% of users go to ${element} after ${lastElement}`
        });
      }
    });
    
    return predictions.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
  }

  /**
   * Calculate drop-off risk based on current journey
   */
  private calculateDropOffRisk(journey: UserJourneyStep[]): number {
    if (journey.length === 0) return 0;
    
    let risk = 0;
    
    // Time-based risk
    const lastAction = journey[journey.length - 1];
    const timeSinceLastAction = Date.now() - lastAction.timestamp;
    if (timeSinceLastAction > 20000) risk += 0.3; // 20 seconds
    if (timeSinceLastAction > 60000) risk += 0.4; // 1 minute
    
    // Pattern-based risk
    if (journey.length > 5) {
      const recentSteps = journey.slice(-5);
      const uniqueElements = new Set(recentSteps.map(s => s.element));
      
      // Repetitive behavior indicates confusion
      if (uniqueElements.size < 3) risk += 0.3;
    }
    
    // Journey length risk
    if (journey.length > 20) risk += 0.2; // Very long sessions may indicate frustration
    if (journey.length < 2) risk += 0.4; // Very short sessions indicate quick exits
    
    return Math.min(1, risk);
  }

  /**
   * Assess data quality
   */
  private assessDataQuality(): {
    score: number;
    issues: string[];
    recommendation: string;
  } {
    const issues: string[] = [];
    let score = 1.0;
    
    const heatmapStats = this.heatmapTracker.getHeatmapStats();
    const journeyStats = this.journeyAnalyzer.getJourneyStats();
    
    // Check data volume
    if (heatmapStats.totalPoints < 100) {
      issues.push('Low heatmap data volume');
      score -= 0.2;
    }
    
    if (journeyStats.totalJourneys < 10) {
      issues.push('Low journey data volume');
      score -= 0.2;
    }
    
    // Check data recency
    const dataAge = Date.now() - heatmapStats.timeRange.end;
    if (dataAge > 24 * 60 * 60 * 1000) { // 24 hours
      issues.push('Data is not recent');
      score -= 0.3;
    }
    
    // Check data diversity
    if (heatmapStats.topElements.length < 3) {
      issues.push('Limited element interaction diversity');
      score -= 0.1;
    }
    
    const recommendation = issues.length > 0 
      ? `Improve data quality: ${issues.join(', ')}`
      : 'Data quality is good';
    
    return { score: Math.max(0, score), issues, recommendation };
  }

  /**
   * Add insight to collection
   */
  private addInsight(insight: NavigationInsight): void {
    // Check for duplicate insights
    const isDuplicate = this.insights.some(existing => 
      existing.type === insight.type &&
      existing.description === insight.description
    );
    
    if (!isDuplicate) {
      this.insights.push(insight);
      
      // Track to analytics
      if (this.config.enableAnalytics) {
        track('navigation_insight_generated', {
          type: insight.type,
          confidence: insight.confidence,
          impact: insight.impact,
          timestamp: Date.now()
        });
      }
    }
    
    // Limit insights to prevent memory issues
    if (this.insights.length > 100) {
      this.insights = this.insights.slice(-50);
    }
  }

  /**
   * Get all insights
   */
  getAllInsights(): NavigationInsight[] {
    return [...this.insights];
  }

  /**
   * Get insights by type
   */
  getInsightsByType(type: NavigationInsight['type']): NavigationInsight[] {
    return this.insights.filter(insight => insight.type === type);
  }

  /**
   * Get high-priority insights
   */
  getHighPriorityInsights(): NavigationInsight[] {
    return this.insights.filter(insight => 
      insight.impact === 'high' && insight.confidence > 0.7
    );
  }

  /**
   * Clear old insights
   */
  clearOldInsights(maxAge: number = 60 * 60 * 1000): number {
    const cutoffTime = Date.now() - maxAge;
    const initialLength = this.insights.length;
    
    // Note: We don't have timestamps on insights, so we'll clear the oldest ones
    if (this.insights.length > 50) {
      this.insights = this.insights.slice(-25);
    }
    
    return initialLength - this.insights.length;
  }

  /**
   * Clear all insights
   */
  clearAllInsights(): void {
    this.insights = [];
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<AdvancedAnalyticsConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Update insight generation configuration
   */
  updateInsightConfig(config: Partial<InsightGenerationConfig>): void {
    this.insightConfig = { ...this.insightConfig, ...config };
  }

  /**
   * Get insight statistics
   */
  getInsightStats(): {
    total: number;
    byType: Record<string, number>;
    byImpact: Record<string, number>;
    averageConfidence: number;
  } {
    const byType: Record<string, number> = {};
    const byImpact: Record<string, number> = {};
    let totalConfidence = 0;
    
    this.insights.forEach(insight => {
      byType[insight.type] = (byType[insight.type] || 0) + 1;
      byImpact[insight.impact] = (byImpact[insight.impact] || 0) + 1;
      totalConfidence += insight.confidence;
    });
    
    return {
      total: this.insights.length,
      byType,
      byImpact,
      averageConfidence: this.insights.length > 0 ? totalConfidence / this.insights.length : 0
    };
  }
}

export default InsightGenerator;
