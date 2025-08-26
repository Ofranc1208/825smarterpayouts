/**
 * Web Vitals Service
 * 
 * Main service that orchestrates Web Vitals tracking and analysis.
 * Uses smaller focused modules for tracking, calculations, and utilities.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { CoreWebVitalsMetrics, TimeRange } from '../types';
import { webVitalsTracker } from './core/WebVitalsTracker';
import { metricsCalculator } from './calculators/MetricsCalculator';
import { TimeRangeUtils } from './utils/TimeRangeUtils';

export class WebVitalsService {
  /**
   * Initialize Web Vitals tracking
   */
  async initialize(): Promise<void> {
    return webVitalsTracker.initialize();
  }

  /**
   * Track a Web Vital metric
   */
  trackWebVital(entry: any): void {
    webVitalsTracker.trackWebVital(entry);
  }

  /**
   * Get Core Web Vitals metrics for a time range
   */
  async getMetrics(timeRange: TimeRange): Promise<CoreWebVitalsMetrics> {
    const timeRangeMs = TimeRangeUtils.getTimeRangeMs(timeRange);

    const getMetricData = (metricName: string, unit: string, icon: string) => {
      const entries = webVitalsTracker.getFilteredData(metricName, timeRangeMs);
      return metricsCalculator.calculateMetricData(entries, metricName, unit, icon);
    };

    return {
      fcp: getMetricData('FCP', 'ms', '🎨'),
      lcp: getMetricData('LCP', 'ms', '🖼️'),
      cls: getMetricData('CLS', '', '📐'),
      fid: getMetricData('FID', 'ms', '👆'),
      ttfb: getMetricData('TTFB', 'ms', '⚡')
    };
  }

  /**
   * Get Web Vitals data for a specific page
   */
  getPageWebVitals(path: string, timeRange: TimeRange): Record<string, number> {
    const timeRangeMs = TimeRangeUtils.getTimeRangeMs(timeRange);
    const allData = webVitalsTracker.getAllData();

    return Array.from(allData.entries()).reduce((acc, [metric, data]) => {
      const pageData = data.filter(d => 
        d.url && d.url.includes(path) && 
        TimeRangeUtils.isWithinTimeRange(d.timestamp, timeRange)
      );
      
      if (pageData.length > 0) {
        const values = pageData.map(d => d.value);
        acc[metric] = values.reduce((a, b) => a + b, 0) / values.length;
      }
      
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Get detailed analytics for a metric
   */
  getMetricAnalytics(metricName: string, timeRange: TimeRange) {
    const entries = webVitalsTracker.getFilteredData(
      metricName, 
      TimeRangeUtils.getTimeRangeMs(timeRange)
    );
    
    const values = entries.map(e => e.value);
    const percentiles = metricsCalculator.calculatePercentiles(values);
    
    return {
      count: entries.length,
      average: values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0,
      ...percentiles,
      status: values.length > 0 ? metricsCalculator.getMetricStatus(metricName, percentiles.p75) : 'good'
    };
  }

  /**
   * Clear all stored data
   */
  clearData(): void {
    webVitalsTracker.clearData();
  }

  /**
   * Check if service is ready
   */
  isReady(): boolean {
    return webVitalsTracker.isReady();
  }
}

// Export singleton instance
export const webVitalsService = new WebVitalsService();