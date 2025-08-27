/**
 * Navigation Health Monitor
 * 
 * Monitors navigation health status and provides recommendations
 * 
 * @module useNavigationHealthMonitor
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useCallback } from 'react';

interface HealthMonitorConfig {
  performance: any;
  accessibility: any;
}

/**
 * Hook for monitoring navigation health
 */
export function useNavigationHealthMonitor({ performance, accessibility }: HealthMonitorConfig) {
  
  /**
   * Get navigation health status
   */
  const getNavigationHealth = useCallback(() => {
    const performanceScore = performance.getPerformanceScore ? performance.getPerformanceScore() : 0;
    const accessibilityReport = accessibility.getAccessibilityReport();
    
    return {
      overall: performanceScore > 70 && accessibilityReport.score > 80 ? 'healthy' : 'needs-attention',
      performance: {
        score: performanceScore,
        status: performanceScore > 80 ? 'good' : performanceScore > 60 ? 'fair' : 'poor'
      },
      accessibility: {
        score: accessibilityReport.score,
        compliance: accessibilityReport.compliance,
        status: accessibilityReport.score > 90 ? 'excellent' : 
                accessibilityReport.score > 70 ? 'good' : 'needs-improvement'
      },
      recommendations: [
        ...(performance.getPerformanceRecommendations ? performance.getPerformanceRecommendations() : []),
        ...accessibilityReport.recommendations
      ]
    };
  }, [performance, accessibility]);

  return {
    getNavigationHealth
  };
}
