/**
 * Web Vitals Core Tracker
 * 
 * Handles the core tracking functionality for Web Vitals metrics.
 * Integrates with the web-vitals library and manages data collection.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { WebVitalEntry } from '../../types';

export class WebVitalsTracker {
  private webVitalsData: Map<string, WebVitalEntry[]> = new Map();
  private isInitialized = false;
  private maxEntries = 1000;

  /**
   * Initialize Web Vitals tracking
   */
  async initialize(): Promise<void> {
    if (this.isInitialized || typeof window === 'undefined') return;

    try {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
      
      const handleMetric = (metric: any) => {
        this.trackWebVital({
          name: metric.name,
          value: metric.value,
          id: metric.id,
          delta: metric.delta,
          rating: metric.rating,
          timestamp: Date.now(),
          url: window.location.href
        });
      };

      getCLS(handleMetric);
      getFID(handleMetric);
      getFCP(handleMetric);
      getLCP(handleMetric);
      getTTFB(handleMetric);

      this.isInitialized = true;
      console.log('✅ Web Vitals tracking initialized');
    } catch (error) {
      console.error('❌ Failed to initialize Web Vitals:', error);
    }
  }

  /**
   * Track a Web Vital metric
   */
  trackWebVital(entry: WebVitalEntry): void {
    const metricName = entry.name;
    if (!this.webVitalsData.has(metricName)) {
      this.webVitalsData.set(metricName, []);
    }
    
    const metrics = this.webVitalsData.get(metricName)!;
    metrics.push(entry);

    // Keep only last maxEntries per metric
    if (metrics.length > this.maxEntries) {
      this.webVitalsData.set(metricName, metrics.slice(-this.maxEntries));
    }
  }

  /**
   * Get raw data for a metric
   */
  getMetricData(metricName: string): WebVitalEntry[] {
    return this.webVitalsData.get(metricName) || [];
  }

  /**
   * Get filtered data for a time range
   */
  getFilteredData(metricName: string, timeRangeMs: number): WebVitalEntry[] {
    const now = Date.now();
    const metrics = this.webVitalsData.get(metricName) || [];
    return metrics.filter(m => now - m.timestamp < timeRangeMs);
  }

  /**
   * Get all tracked metrics data
   */
  getAllData(): Map<string, WebVitalEntry[]> {
    return new Map(this.webVitalsData);
  }

  /**
   * Clear all stored data
   */
  clearData(): void {
    this.webVitalsData.clear();
  }

  /**
   * Check if tracker is initialized
   */
  isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Set maximum entries per metric
   */
  setMaxEntries(max: number): void {
    this.maxEntries = max;
  }
}

// Export singleton instance
export const webVitalsTracker = new WebVitalsTracker();
