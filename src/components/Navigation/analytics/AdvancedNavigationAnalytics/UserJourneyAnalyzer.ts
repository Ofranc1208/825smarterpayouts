/**
 * User Journey Analyzer - Journey Tracking and Pattern Analysis
 * 
 * Handles user journey tracking, pattern detection, and behavioral
 * analysis for navigation optimization insights.
 * 
 * @module UserJourneyAnalyzer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import type { UserJourneyStep, NavigationInsight, JourneyPattern, AdvancedAnalyticsConfig } from './types';

export class UserJourneyAnalyzer {
  private userJourneys: Map<string, UserJourneyStep[]> = new Map();
  private config: AdvancedAnalyticsConfig;
  private sessionId: string;

  constructor(config: AdvancedAnalyticsConfig, sessionId: string) {
    this.config = config;
    this.sessionId = sessionId;
  }

  /**
   * Add journey step
   */
  addJourneyStep(step: UserJourneyStep): void {
    if (!this.config.enableUserJourneys) return;

    let journey = this.userJourneys.get(this.sessionId);
    if (!journey) {
      journey = [];
      this.userJourneys.set(this.sessionId, journey);
    }

    journey.push(step);

    // Clean up old sessions
    this.cleanupOldSessions();
  }

  /**
   * Analyze individual journey step for real-time insights
   */
  analyzeJourneyStep(step: UserJourneyStep, journey: UserJourneyStep[]): NavigationInsight[] {
    const insights: NavigationInsight[] = [];

    // Detect confusion patterns
    if (journey.length >= 3) {
      const confusionInsight = this.detectConfusionPattern(step, journey);
      if (confusionInsight) {
        insights.push(confusionInsight);
      }
    }

    // Detect drop-off points
    const dropOffInsight = this.detectDropOffPoint(step, journey);
    if (dropOffInsight) {
      insights.push(dropOffInsight);
    }

    // Detect rapid interactions (potential frustration)
    const frustrationInsight = this.detectFrustrationPattern(step, journey);
    if (frustrationInsight) {
      insights.push(frustrationInsight);
    }

    return insights;
  }

  /**
   * Detect confusion patterns in user behavior
   */
  private detectConfusionPattern(step: UserJourneyStep, journey: UserJourneyStep[]): NavigationInsight | null {
    const recentSteps = journey.slice(-3);
    const isBackAndForth = recentSteps.every((s, i) => 
      i === 0 || s.element !== recentSteps[i - 1].element
    );

    if (isBackAndForth) {
      return {
        type: 'confusion_area',
        description: `User showing confusion pattern around ${step.element}`,
        confidence: 0.7,
        impact: 'medium',
        recommendation: 'Consider improving navigation clarity or adding tooltips',
        data: { steps: recentSteps, element: step.element }
      };
    }

    return null;
  }

  /**
   * Detect drop-off points
   */
  private detectDropOffPoint(step: UserJourneyStep, journey: UserJourneyStep[]): NavigationInsight | null {
    if (journey.length < 2) return null;

    const timeSinceLastAction = step.timestamp - journey[journey.length - 2].timestamp;
    
    if (timeSinceLastAction > 30000) { // 30 seconds
      return {
        type: 'drop_off_point',
        description: `Potential drop-off point at ${step.element}`,
        confidence: 0.6,
        impact: 'high',
        recommendation: 'Investigate user experience at this navigation point',
        data: { element: step.element, delay: timeSinceLastAction }
      };
    }

    return null;
  }

  /**
   * Detect frustration patterns (rapid repeated interactions)
   */
  private detectFrustrationPattern(step: UserJourneyStep, journey: UserJourneyStep[]): NavigationInsight | null {
    if (journey.length < 5) return null;

    const recentSteps = journey.slice(-5);
    const sameElementSteps = recentSteps.filter(s => s.element === step.element);
    
    if (sameElementSteps.length >= 3) {
      const timeSpan = recentSteps[recentSteps.length - 1].timestamp - recentSteps[0].timestamp;
      
      if (timeSpan < 10000) { // 10 seconds
        return {
          type: 'confusion_area',
          description: `Potential frustration detected with ${step.element}`,
          confidence: 0.8,
          impact: 'high',
          recommendation: 'Element may not be working as expected or is confusing to users',
          data: { element: step.element, interactions: sameElementSteps.length, timeSpan }
        };
      }
    }

    return null;
  }

  /**
   * Analyze all user journeys for patterns
   */
  analyzeAllJourneys(): NavigationInsight[] {
    const insights: NavigationInsight[] = [];
    const allJourneys = Array.from(this.userJourneys.values());

    // Find popular paths
    const popularPaths = this.findPopularPaths(allJourneys);
    popularPaths.forEach(pattern => {
      insights.push({
        type: 'popular_path',
        description: `Popular navigation path: ${pattern.path}`,
        confidence: pattern.confidence,
        impact: 'medium',
        recommendation: 'Consider optimizing this popular path for better performance',
        data: pattern
      });
    });

    // Find common exit points
    const exitPoints = this.findCommonExitPoints(allJourneys);
    exitPoints.forEach(exitPoint => {
      insights.push({
        type: 'drop_off_point',
        description: `Common exit point: ${exitPoint.element}`,
        confidence: exitPoint.confidence,
        impact: 'high',
        recommendation: 'Investigate why users commonly leave at this point',
        data: exitPoint
      });
    });

    return insights;
  }

  /**
   * Find popular navigation paths
   */
  private findPopularPaths(journeys: UserJourneyStep[][]): JourneyPattern[] {
    const pathCounts: Map<string, number> = new Map();
    
    journeys.forEach(journey => {
      for (let i = 0; i < journey.length - 1; i++) {
        const path = `${journey[i].element} -> ${journey[i + 1].element}`;
        pathCounts.set(path, (pathCounts.get(path) || 0) + 1);
      }
    });

    return Array.from(pathCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([path, count]) => ({
        path,
        count,
        percentage: (count / journeys.length) * 100,
        confidence: Math.min(0.9, count / journeys.length)
      }));
  }

  /**
   * Find common exit points
   */
  private findCommonExitPoints(journeys: UserJourneyStep[][]): Array<{
    element: string;
    count: number;
    percentage: number;
    confidence: number;
  }> {
    const exitCounts: Map<string, number> = new Map();
    
    journeys.forEach(journey => {
      if (journey.length > 0) {
        const lastElement = journey[journey.length - 1].element;
        exitCounts.set(lastElement, (exitCounts.get(lastElement) || 0) + 1);
      }
    });

    return Array.from(exitCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .filter(([, count]) => count > 1) // Only show if multiple users exit here
      .map(([element, count]) => ({
        element,
        count,
        percentage: (count / journeys.length) * 100,
        confidence: Math.min(0.8, count / journeys.length)
      }));
  }

  /**
   * Get journey statistics
   */
  getJourneyStats(): {
    totalJourneys: number;
    averageJourneyLength: number;
    totalSteps: number;
    mostActiveElements: Array<{ element: string; interactions: number }>;
    sessionDuration: number;
  } {
    const allJourneys = Array.from(this.userJourneys.values());
    const totalSteps = allJourneys.reduce((sum, journey) => sum + journey.length, 0);
    
    // Count interactions by element
    const elementCounts: Map<string, number> = new Map();
    allJourneys.forEach(journey => {
      journey.forEach(step => {
        elementCounts.set(step.element, (elementCounts.get(step.element) || 0) + 1);
      });
    });

    const mostActiveElements = Array.from(elementCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([element, interactions]) => ({ element, interactions }));

    // Calculate session duration
    const currentJourney = this.userJourneys.get(this.sessionId) || [];
    const sessionDuration = currentJourney.length > 0 ? 
      currentJourney[currentJourney.length - 1].timestamp - currentJourney[0].timestamp : 0;

    return {
      totalJourneys: allJourneys.length,
      averageJourneyLength: allJourneys.length > 0 ? totalSteps / allJourneys.length : 0,
      totalSteps,
      mostActiveElements,
      sessionDuration
    };
  }

  /**
   * Get journey for specific session
   */
  getJourney(sessionId: string): UserJourneyStep[] {
    return this.userJourneys.get(sessionId) || [];
  }

  /**
   * Get current session journey
   */
  getCurrentJourney(): UserJourneyStep[] {
    return this.getJourney(this.sessionId);
  }

  /**
   * Get all journeys
   */
  getAllJourneys(): Map<string, UserJourneyStep[]> {
    return new Map(this.userJourneys);
  }

  /**
   * Set journeys data (for loading from storage)
   */
  setJourneys(journeys: Map<string, UserJourneyStep[]>): void {
    this.userJourneys = journeys;
  }

  /**
   * Clean up old sessions
   */
  private cleanupOldSessions(): void {
    const cutoffTime = Date.now() - this.config.journeySessionTimeout;
    
    Array.from(this.userJourneys.entries()).forEach(([sessionId, journey]) => {
      if (journey.length > 0) {
        const lastActivity = journey[journey.length - 1].timestamp;
        if (lastActivity < cutoffTime) {
          this.userJourneys.delete(sessionId);
        }
      }
    });
  }

  /**
   * Clear all journey data
   */
  clearAllData(): void {
    this.userJourneys.clear();
  }

  /**
   * Get journey data for time range
   */
  getJourneysForTimeRange(startTime: number, endTime: number): Map<string, UserJourneyStep[]> {
    const filteredJourneys = new Map<string, UserJourneyStep[]>();
    
    Array.from(this.userJourneys.entries()).forEach(([sessionId, journey]) => {
      const filteredSteps = journey.filter((step: any) => 
        step.timestamp >= startTime && step.timestamp <= endTime
      );
      
      if (filteredSteps.length > 0) {
        filteredJourneys.set(sessionId, filteredSteps);
      }
    });
    
    return filteredJourneys;
  }

  /**
   * Find journeys containing specific element
   */
  findJourneysWithElement(element: string): Map<string, UserJourneyStep[]> {
    const matchingJourneys = new Map<string, UserJourneyStep[]>();
    
    Array.from(this.userJourneys.entries()).forEach(([sessionId, journey]) => {
      if (journey.some((step: any) => step.element === element)) {
        matchingJourneys.set(sessionId, journey);
      }
    });
    
    return matchingJourneys;
  }

  /**
   * Calculate conversion funnel
   */
  calculateConversionFunnel(steps: string[]): Array<{
    step: string;
    users: number;
    conversionRate: number;
  }> {
    const allJourneys = Array.from(this.userJourneys.values());
    const funnel: Array<{ step: string; users: number; conversionRate: number }> = [];
    
    let previousUsers = allJourneys.length;
    
    steps.forEach((step, index) => {
      const usersAtStep = allJourneys.filter(journey => 
        journey.some(journeyStep => journeyStep.element === step)
      ).length;
      
      const conversionRate = index === 0 ? 100 : (usersAtStep / previousUsers) * 100;
      
      funnel.push({
        step,
        users: usersAtStep,
        conversionRate
      });
      
      previousUsers = usersAtStep;
    });
    
    return funnel;
  }

  /**
   * Update session ID
   */
  updateSessionId(newSessionId: string): void {
    this.sessionId = newSessionId;
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<AdvancedAnalyticsConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

export default UserJourneyAnalyzer;
