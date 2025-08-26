/**
 * Web Vitals Metrics Calculator
 * 
 * Handles calculations and analysis of Web Vitals data.
 * Converts raw data into meaningful metrics with status and changes.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { WebVitalEntry, MetricData } from '../../types';

export class MetricsCalculator {
  /**
   * Calculate metric data from raw entries
   */
  calculateMetricData(
    entries: WebVitalEntry[], 
    metricName: string, 
    unit: string, 
    icon: string
  ): MetricData {
    if (entries.length === 0) {
      return this.getDefaultMetric(metricName, unit, icon);
    }

    const values = entries.map(e => e.value);
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    
    return {
      name: this.getMetricDisplayName(metricName),
      value: Math.round(average * 100) / 100,
      unit,
      change: this.calculateChange(entries),
      status: this.getMetricStatus(metricName, average),
      icon
    };
  }

  /**
   * Calculate percentage change over time
   */
  calculateChange(entries: WebVitalEntry[]): number {
    if (entries.length < 2) return 0;
    
    const recent = entries.slice(-10);
    const older = entries.slice(-20, -10);
    
    if (older.length === 0) return 0;
    
    const recentAvg = recent.reduce((a, b) => a + b.value, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b.value, 0) / older.length;
    
    return Math.round(((recentAvg - olderAvg) / olderAvg) * 100);
  }

  /**
   * Determine metric status based on thresholds
   */
  getMetricStatus(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      CLS: { good: 0.1, poor: 0.25 },
      FID: { good: 100, poor: 300 },
      TTFB: { good: 600, poor: 1500 }
    };

    const threshold = thresholds[metricName as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Get display name for metric
   */
  getMetricDisplayName(metricName: string): string {
    const names = {
      FCP: 'First Contentful Paint',
      LCP: 'Largest Contentful Paint',
      CLS: 'Cumulative Layout Shift',
      FID: 'First Input Delay',
      TTFB: 'Time to First Byte'
    };
    return names[metricName as keyof typeof names] || metricName;
  }

  /**
   * Get default metric when no data available
   */
  getDefaultMetric(name: string, unit: string, icon: string): MetricData {
    const defaults = {
      FCP: 800,
      LCP: 1200,
      CLS: 0.05,
      FID: 50,
      TTFB: 200
    };

    return {
      name: this.getMetricDisplayName(name),
      value: defaults[name as keyof typeof defaults] || 0,
      unit,
      change: 0,
      status: 'good',
      icon
    };
  }

  /**
   * Calculate percentiles for a set of values
   */
  calculatePercentiles(values: number[]): {
    p50: number;
    p75: number;
    p90: number;
    p95: number;
  } {
    if (values.length === 0) {
      return { p50: 0, p75: 0, p90: 0, p95: 0 };
    }

    const sorted = [...values].sort((a, b) => a - b);
    
    return {
      p50: this.getPercentile(sorted, 50),
      p75: this.getPercentile(sorted, 75),
      p90: this.getPercentile(sorted, 90),
      p95: this.getPercentile(sorted, 95)
    };
  }

  /**
   * Get specific percentile value
   */
  private getPercentile(sortedValues: number[], percentile: number): number {
    const index = Math.ceil((percentile / 100) * sortedValues.length) - 1;
    return sortedValues[Math.max(0, index)] || 0;
  }
}

// Export singleton instance
export const metricsCalculator = new MetricsCalculator();
