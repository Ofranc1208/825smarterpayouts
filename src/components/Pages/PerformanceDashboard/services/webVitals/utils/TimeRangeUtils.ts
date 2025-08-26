/**
 * Time Range Utilities
 * 
 * Utility functions for handling time ranges and filtering data.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { TimeRange } from '../../types';

export class TimeRangeUtils {
  /**
   * Convert time range string to milliseconds
   */
  static getTimeRangeMs(timeRange: TimeRange): number {
    const ranges = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    };
    return ranges[timeRange] || ranges['24h'];
  }

  /**
   * Check if timestamp is within time range
   */
  static isWithinTimeRange(timestamp: number, timeRange: TimeRange): boolean {
    const now = Date.now();
    const rangeMs = this.getTimeRangeMs(timeRange);
    return (now - timestamp) < rangeMs;
  }

  /**
   * Get start timestamp for time range
   */
  static getStartTimestamp(timeRange: TimeRange): number {
    const now = Date.now();
    const rangeMs = this.getTimeRangeMs(timeRange);
    return now - rangeMs;
  }

  /**
   * Format time range for display
   */
  static formatTimeRange(timeRange: TimeRange): string {
    const formats = {
      '1h': 'Last Hour',
      '24h': 'Last 24 Hours',
      '7d': 'Last 7 Days',
      '30d': 'Last 30 Days'
    };
    return formats[timeRange] || 'Last 24 Hours';
  }

  /**
   * Get appropriate bucket size for time range
   */
  static getBucketSize(timeRange: TimeRange): number {
    const buckets = {
      '1h': 5 * 60 * 1000,      // 5 minutes
      '24h': 60 * 60 * 1000,    // 1 hour
      '7d': 6 * 60 * 60 * 1000, // 6 hours
      '30d': 24 * 60 * 60 * 1000 // 1 day
    };
    return buckets[timeRange] || buckets['24h'];
  }
}
