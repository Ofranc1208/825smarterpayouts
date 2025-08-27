/**
 * Navigation Metrics Collector
 * 
 * Collects and manages navigation metrics and dashboard integration
 * 
 * @module useNavigationMetricsCollector
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useCallback, useEffect } from 'react';
import { navigationDashboardIntegration } from '../../services/NavigationDashboardIntegration';

interface MetricsCollectorConfig {
  analytics: any;
  performance: any;
  accessibility: any;
  enableDashboardIntegration: boolean;
}

/**
 * Hook for collecting navigation metrics
 */
export function useNavigationMetricsCollector({ 
  analytics, 
  performance, 
  accessibility, 
  enableDashboardIntegration 
}: MetricsCollectorConfig) {

  // Sync data with dashboard integration
  useEffect(() => {
    if (!enableDashboardIntegration) return;

    const interval = setInterval(() => {
      // Update dashboard with current metrics
      if (analytics.getAnalyticsSummary) {
        const analyticsSummary = analytics.getAnalyticsSummary();
        navigationDashboardIntegration.updateAnalytics(analyticsSummary.events || []);
      }

      if (performance.metrics) {
        navigationDashboardIntegration.updatePerformance(performance.metrics);
      }

      if (accessibility.getAccessibilityReport) {
        const accessibilityReport = accessibility.getAccessibilityReport();
        navigationDashboardIntegration.updateAccessibility({
          score: accessibilityReport.score,
          lastAudit: accessibilityReport.lastAudit || null,
          compliance: accessibilityReport.compliance
        });
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [analytics, performance, accessibility, enableDashboardIntegration]);

  /**
   * Get comprehensive navigation metrics
   */
  const getNavigationMetrics = useCallback(() => {
    return {
      analytics: analytics.getAnalyticsSummary ? analytics.getAnalyticsSummary() : null,
      performance: {
        current: performance.metrics,
        average: performance.getAverageMetrics(),
        score: performance.getPerformanceScore ? performance.getPerformanceScore() : 0
      },
      accessibility: accessibility.getAccessibilityReport(),
      dashboard: enableDashboardIntegration ? 
        navigationDashboardIntegration.getNavigationSummary() : null
    };
  }, [analytics, performance, accessibility, enableDashboardIntegration]);

  /**
   * Reset all navigation metrics
   */
  const resetNavigationMetrics = useCallback(() => {
    performance.resetMetrics();
    // Note: Analytics and accessibility don't typically need resetting
    
    if (enableDashboardIntegration) {
      // Dashboard integration will pick up the reset metrics automatically
    }
  }, [performance, enableDashboardIntegration]);

  return {
    getNavigationMetrics,
    resetNavigationMetrics
  };
}
