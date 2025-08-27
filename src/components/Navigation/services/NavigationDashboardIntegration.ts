/**
 * Navigation Dashboard Integration - Enterprise Edition
 * 
 * Integrates navigation analytics and performance metrics with the existing
 * Performance Dashboard system for comprehensive monitoring.
 * 
 * @module NavigationDashboardIntegration
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Enterprise Edition
 */

import { analyticsOrchestrator } from '../../Pages/PerformanceDashboard/services/AnalyticsOrchestrator';
import type { 
  NavigationDashboardMetrics,
  NavigationAnalyticsEvent,
  NavigationPerformanceMetrics
} from '../types';

interface NavigationMetricsData {
  analytics: NavigationAnalyticsEvent[];
  performance: NavigationPerformanceMetrics;
  accessibility: {
    score: number;
    lastAudit: Date | null;
    compliance: 'AA' | 'A' | 'Non-compliant';
  };
}

/**
 * Navigation Dashboard Integration Service
 * 
 * Provides seamless integration between navigation components and the
 * existing Performance Dashboard for unified monitoring and analytics.
 */
export class NavigationDashboardIntegration {
  private metricsCache: Map<string, any> = new Map();
  private updateInterval: NodeJS.Timeout | null = null;
  private isInitialized = false;

  /**
   * Initialize the navigation dashboard integration
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Ensure the analytics orchestrator is initialized
      await analyticsOrchestrator.initialize({
        enableNavigation: true,
        navigationSampling: 1.0,
        enableRealTimeNavigation: true
      });

      // Start periodic metrics collection
      this.startMetricsCollection();
      
      this.isInitialized = true;
      console.log('🧭 Navigation Dashboard Integration initialized');
    } catch (error) {
      console.error('Failed to initialize Navigation Dashboard Integration:', error);
      throw error;
    }
  }

  /**
   * Start collecting navigation metrics periodically
   */
  private startMetricsCollection(): void {
    // Update metrics every 30 seconds
    this.updateInterval = setInterval(() => {
      this.collectNavigationMetrics();
    }, 30000);

    // Initial collection
    this.collectNavigationMetrics();
  }

  /**
   * Collect current navigation metrics
   */
  private collectNavigationMetrics(): void {
    try {
      const navigationData = this.getNavigationMetricsFromDOM();
      
      // Cache the metrics
      this.metricsCache.set('navigation_current', {
        ...navigationData,
        timestamp: Date.now()
      });

      // Send to Performance Dashboard
      this.sendToPerformanceDashboard(navigationData);
    } catch (error) {
      console.error('Error collecting navigation metrics:', error);
    }
  }

  /**
   * Extract navigation metrics from DOM and stored data
   */
  private getNavigationMetricsFromDOM(): NavigationMetricsData {
    // Get navigation elements
    const navElements = document.querySelectorAll('nav, [role="navigation"]');
    const dropdowns = document.querySelectorAll('[aria-expanded]');
    const mobileMenus = document.querySelectorAll('[data-mobile-menu]');

    // Calculate basic metrics
    const totalNavElements = navElements.length;
    const activeDropdowns = Array.from(dropdowns).filter(
      el => el.getAttribute('aria-expanded') === 'true'
    ).length;

    // Get cached analytics data (would be populated by navigation hooks)
    const cachedAnalytics = this.metricsCache.get('navigation_analytics') || [];
    const cachedPerformance = this.metricsCache.get('navigation_performance') || {
      renderTime: 0,
      interactionTime: 0,
      dropdownOpenTime: 0,
      mobileMenuToggleTime: 0,
      memoryUsage: 0,
      errorCount: 0,
      accessibilityScore: 0
    };
    const cachedAccessibility = this.metricsCache.get('navigation_accessibility') || {
      score: 0,
      lastAudit: null,
      compliance: 'Non-compliant'
    };

    return {
      analytics: cachedAnalytics,
      performance: cachedPerformance,
      accessibility: cachedAccessibility
    };
  }

  /**
   * Send navigation data to Performance Dashboard
   */
  private async sendToPerformanceDashboard(data: NavigationMetricsData): Promise<void> {
    try {
      // Create navigation-specific metrics for the dashboard
      const dashboardMetrics: NavigationDashboardMetrics = {
        totalClicks: data.analytics.filter(e => e.eventType === 'click').length,
        popularItems: this.calculatePopularItems(data.analytics),
        averageInteractionTime: data.performance.interactionTime,
        errorRate: data.performance.errorCount > 0 ? 
          data.performance.errorCount / Math.max(1, data.analytics.length) : 0,
        mobileUsagePercentage: this.calculateMobileUsage(data.analytics),
        accessibilityScore: data.accessibility.score,
        performanceScore: this.calculatePerformanceScore(data.performance),
        lastUpdated: Date.now()
      };

      // Store in cache for dashboard retrieval
      this.metricsCache.set('dashboard_metrics', dashboardMetrics);

      // Track navigation performance in the main analytics system
      if (analyticsOrchestrator.isReady()) {
        analyticsOrchestrator.trackPageView({
          page: 'navigation_metrics',
          metrics: dashboardMetrics,
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.error('Error sending navigation data to Performance Dashboard:', error);
    }
  }

  /**
   * Calculate popular navigation items
   */
  private calculatePopularItems(analytics: NavigationAnalyticsEvent[]): Array<{ item: string; clicks: number }> {
    const clickCounts: Record<string, number> = {};
    
    analytics
      .filter(event => event.eventType === 'click' && event.elementType === 'nav_item')
      .forEach(event => {
        const key = event.elementLabel;
        clickCounts[key] = (clickCounts[key] || 0) + 1;
      });

    return Object.entries(clickCounts)
      .map(([item, clicks]) => ({ item, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10);
  }

  /**
   * Calculate mobile usage percentage
   */
  private calculateMobileUsage(analytics: NavigationAnalyticsEvent[]): number {
    const mobileEvents = analytics.filter(event => 
      event.elementType === 'mobile_menu' || 
      event.elementId.includes('mobile')
    ).length;
    
    const totalEvents = analytics.length;
    return totalEvents > 0 ? (mobileEvents / totalEvents) * 100 : 0;
  }

  /**
   * Calculate overall performance score
   */
  private calculatePerformanceScore(performance: NavigationPerformanceMetrics): number {
    let score = 100;

    // Deduct points for poor performance
    if (performance.renderTime > 1000) score -= 20;
    if (performance.interactionTime > 100) score -= 15;
    if (performance.dropdownOpenTime > 200) score -= 10;
    if (performance.mobileMenuToggleTime > 150) score -= 10;
    if (performance.memoryUsage && performance.memoryUsage > 50) score -= 15;
    if (performance.errorCount > 0) score -= performance.errorCount * 5;

    return Math.max(0, score);
  }

  /**
   * Update navigation analytics data (called by navigation hooks)
   */
  updateAnalytics(analytics: NavigationAnalyticsEvent[]): void {
    this.metricsCache.set('navigation_analytics', analytics);
  }

  /**
   * Update navigation performance data (called by navigation hooks)
   */
  updatePerformance(performance: NavigationPerformanceMetrics): void {
    this.metricsCache.set('navigation_performance', performance);
  }

  /**
   * Update navigation accessibility data (called by navigation hooks)
   */
  updateAccessibility(accessibility: { score: number; lastAudit: Date | null; compliance: string }): void {
    this.metricsCache.set('navigation_accessibility', accessibility);
  }

  /**
   * Get navigation metrics for Performance Dashboard
   */
  getNavigationMetricsForDashboard(): NavigationDashboardMetrics | null {
    return this.metricsCache.get('dashboard_metrics') || null;
  }

  /**
   * Get navigation performance summary
   */
  getNavigationSummary(): {
    isHealthy: boolean;
    performanceScore: number;
    accessibilityScore: number;
    totalInteractions: number;
    errorRate: number;
    recommendations: string[];
  } {
    const metrics = this.metricsCache.get('dashboard_metrics');
    const performance = this.metricsCache.get('navigation_performance');
    
    if (!metrics || !performance) {
      return {
        isHealthy: false,
        performanceScore: 0,
        accessibilityScore: 0,
        totalInteractions: 0,
        errorRate: 0,
        recommendations: ['Navigation metrics not available']
      };
    }

    const recommendations: string[] = [];
    
    if (metrics.performanceScore < 80) {
      recommendations.push('Optimize navigation performance');
    }
    
    if (metrics.accessibilityScore < 90) {
      recommendations.push('Improve navigation accessibility');
    }
    
    if (metrics.errorRate > 0.05) {
      recommendations.push('Reduce navigation errors');
    }
    
    if (performance.memoryUsage > 50) {
      recommendations.push('Optimize navigation memory usage');
    }

    return {
      isHealthy: metrics.performanceScore > 70 && metrics.accessibilityScore > 80,
      performanceScore: metrics.performanceScore,
      accessibilityScore: metrics.accessibilityScore,
      totalInteractions: metrics.totalClicks,
      errorRate: metrics.errorRate,
      recommendations
    };
  }

  /**
   * Get navigation insights for dashboard
   */
  getNavigationInsights(): {
    topPerformingPages: string[];
    slowestInteractions: string[];
    accessibilityIssues: string[];
    usagePatterns: Record<string, number>;
  } {
    const analytics = this.metricsCache.get('navigation_analytics') || [];
    const performance = this.metricsCache.get('navigation_performance') || {};

    // Analyze usage patterns
    const usagePatterns: Record<string, number> = {};
    analytics.forEach((event: NavigationAnalyticsEvent) => {
      const hour = new Date(event.timestamp).getHours();
      usagePatterns[`${hour}:00`] = (usagePatterns[`${hour}:00`] || 0) + 1;
    });

    return {
      topPerformingPages: this.getTopPerformingPages(analytics),
      slowestInteractions: this.getSlowestInteractions(performance),
      accessibilityIssues: this.getAccessibilityIssues(),
      usagePatterns
    };
  }

  /**
   * Get top performing navigation pages
   */
  private getTopPerformingPages(analytics: NavigationAnalyticsEvent[]): string[] {
    const pagePerformance: Record<string, { clicks: number; errors: number }> = {};
    
    analytics.forEach(event => {
      if (event.metadata?.item_href) {
        const page = event.metadata.item_href;
        if (!pagePerformance[page]) {
          pagePerformance[page] = { clicks: 0, errors: 0 };
        }
        
        if (event.eventType === 'click') {
          pagePerformance[page].clicks++;
        } else if (event.eventType === 'error') {
          pagePerformance[page].errors++;
        }
      }
    });

    return Object.entries(pagePerformance)
      .map(([page, stats]) => ({
        page,
        score: stats.clicks - (stats.errors * 5) // Penalize errors heavily
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => item.page);
  }

  /**
   * Get slowest navigation interactions
   */
  private getSlowestInteractions(performance: NavigationPerformanceMetrics): string[] {
    const interactions = [];
    
    if (performance.dropdownOpenTime > 200) {
      interactions.push(`Dropdown opening: ${performance.dropdownOpenTime}ms`);
    }
    
    if (performance.mobileMenuToggleTime > 150) {
      interactions.push(`Mobile menu: ${performance.mobileMenuToggleTime}ms`);
    }
    
    if (performance.renderTime > 1000) {
      interactions.push(`Navigation render: ${performance.renderTime}ms`);
    }

    return interactions;
  }

  /**
   * Get accessibility issues
   */
  private getAccessibilityIssues(): string[] {
    const accessibility = this.metricsCache.get('navigation_accessibility');
    const issues = [];
    
    if (!accessibility || accessibility.score < 90) {
      issues.push('Navigation accessibility score below 90%');
    }
    
    if (!accessibility || accessibility.compliance !== 'AA') {
      issues.push('Navigation not WCAG 2.1 AA compliant');
    }

    // Check for common issues in DOM
    if (typeof window !== 'undefined') {
      const navElements = document.querySelectorAll('nav');
      if (navElements.length === 0) {
        issues.push('No navigation landmarks found');
      }
      
      const skipLinks = document.querySelectorAll('a[href^="#"]');
      if (skipLinks.length === 0) {
        issues.push('No skip to content links found');
      }
    }

    return issues;
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    
    this.metricsCache.clear();
    this.isInitialized = false;
  }
}

// Export singleton instance
export const navigationDashboardIntegration = new NavigationDashboardIntegration();
