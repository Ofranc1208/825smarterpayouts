/**
 * Analytics Reporter
 * 
 * Generates analytics reports and summaries for Performance Dashboard integration
 * 
 * @module useAnalyticsReporter
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useCallback } from 'react';
import type { NavigationAnalyticsEvent } from '../../types';

interface AnalyticsReporterConfig {
  customEvents: () => NavigationAnalyticsEvent[];
}

/**
 * Hook for generating analytics reports
 */
export function useAnalyticsReporter({ customEvents }: AnalyticsReporterConfig) {

  /**
   * Get analytics summary for Performance Dashboard integration
   */
  const getAnalyticsSummary = useCallback(() => {
    const events = customEvents();
    const now = Date.now();
    const last24Hours = now - (24 * 60 * 60 * 1000);
    
    const recentEvents = events.filter(event => event.timestamp > last24Hours);
    const clickEvents = recentEvents.filter(event => event.eventType === 'click');
    const errorEvents = recentEvents.filter(event => event.eventType === 'error');
    
    const popularItems = clickEvents
      .filter(event => event.elementType === 'nav_item')
      .reduce((acc, event) => {
        const key = event.elementLabel;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return {
      totalEvents: recentEvents.length,
      totalClicks: clickEvents.length,
      totalErrors: errorEvents.length,
      errorRate: clickEvents.length > 0 ? errorEvents.length / clickEvents.length : 0,
      popularItems: Object.entries(popularItems)
        .map(([item, clicks]) => ({ item, clicks }))
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 10),
      sessionId: recentEvents.length > 0 ? recentEvents[0].sessionId : 'no_session',
      lastUpdated: now,
      events: recentEvents
    };
  }, [customEvents]);

  /**
   * Get detailed analytics report
   */
  const getDetailedReport = useCallback(() => {
    const events = customEvents();
    const now = Date.now();
    
    // Time-based analysis
    const last1Hour = now - (1 * 60 * 60 * 1000);
    const last24Hours = now - (24 * 60 * 60 * 1000);
    const last7Days = now - (7 * 24 * 60 * 60 * 1000);

    const hourlyEvents = events.filter(event => event.timestamp > last1Hour);
    const dailyEvents = events.filter(event => event.timestamp > last24Hours);
    const weeklyEvents = events.filter(event => event.timestamp > last7Days);

    // Event type analysis
    const eventTypeBreakdown = events.reduce((acc, event) => {
      acc[event.eventType] = (acc[event.eventType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Element type analysis
    const elementTypeBreakdown = events.reduce((acc, event) => {
      acc[event.elementType] = (acc[event.elementType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // User journey analysis
    const userJourney = events
      .filter(event => event.elementType === 'nav_item')
      .map(event => ({
        timestamp: event.timestamp,
        page: event.elementLabel,
        href: event.metadata?.item_href
      }))
      .sort((a, b) => a.timestamp - b.timestamp);

    return {
      timeRanges: {
        lastHour: {
          events: hourlyEvents.length,
          clicks: hourlyEvents.filter(e => e.eventType === 'click').length,
          errors: hourlyEvents.filter(e => e.eventType === 'error').length
        },
        last24Hours: {
          events: dailyEvents.length,
          clicks: dailyEvents.filter(e => e.eventType === 'click').length,
          errors: dailyEvents.filter(e => e.eventType === 'error').length
        },
        last7Days: {
          events: weeklyEvents.length,
          clicks: weeklyEvents.filter(e => e.eventType === 'click').length,
          errors: weeklyEvents.filter(e => e.eventType === 'error').length
        }
      },
      breakdown: {
        eventTypes: eventTypeBreakdown,
        elementTypes: elementTypeBreakdown
      },
      userJourney,
      totalEvents: events.length,
      generatedAt: now
    };
  }, [customEvents]);

  /**
   * Get performance insights
   */
  const getPerformanceInsights = useCallback(() => {
    const events = customEvents();
    const performanceEvents = events.filter(event => 
      event.elementId?.startsWith('performance_') || 
      event.metadata?.metric_name
    );

    const insights = {
      totalPerformanceEvents: performanceEvents.length,
      averageMetrics: {} as Record<string, number>,
      performanceAlerts: [] as string[],
      recommendations: [] as string[]
    };

    // Calculate average metrics
    const metricGroups = performanceEvents.reduce((acc, event) => {
      const metricName = event.metadata?.metric_name;
      if (metricName && typeof event.metadata?.metric_value === 'number') {
        if (!acc[metricName]) acc[metricName] = [];
        acc[metricName].push(event.metadata.metric_value);
      }
      return acc;
    }, {} as Record<string, number[]>);

    Object.entries(metricGroups).forEach(([metric, values]) => {
      const average = values.reduce((sum, val) => sum + val, 0) / values.length;
      insights.averageMetrics[metric] = average;

      // Generate alerts and recommendations
      if (metric === 'renderTime' && average > 1000) {
        insights.performanceAlerts.push(`High render time: ${average.toFixed(0)}ms`);
        insights.recommendations.push('Consider optimizing navigation rendering');
      }
      
      if (metric === 'interactionTime' && average > 100) {
        insights.performanceAlerts.push(`Slow interactions: ${average.toFixed(0)}ms`);
        insights.recommendations.push('Optimize event handlers for faster response');
      }
    });

    return insights;
  }, [customEvents]);

  /**
   * Export analytics data
   */
  const exportAnalyticsData = useCallback((format: 'json' | 'csv' = 'json') => {
    const events = customEvents();
    
    if (format === 'json') {
      return JSON.stringify(events, null, 2);
    }
    
    if (format === 'csv') {
      if (events.length === 0) return 'No data available';
      
      const headers = ['timestamp', 'eventType', 'elementType', 'elementId', 'elementLabel', 'sessionId'];
      const csvRows = [
        headers.join(','),
        ...events.map(event => [
          new Date(event.timestamp).toISOString(),
          event.eventType,
          event.elementType,
          event.elementId,
          `"${event.elementLabel}"`,
          event.sessionId
        ].join(','))
      ];
      
      return csvRows.join('\n');
    }
    
    return '';
  }, [customEvents]);

  return {
    getAnalyticsSummary,
    getDetailedReport,
    getPerformanceInsights,
    exportAnalyticsData
  };
}
