/**
 * Visitor Tracking Service
 * 
 * Main service that orchestrates visitor tracking and analytics.
 * Uses smaller focused modules for tracking, session management, and calculations.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { PageViewEntry, VisitorData, UserMetrics, TimeRange } from '../types';
import { pageViewTracker } from './core/PageViewTracker';
import { visitorAnalytics } from './calculators/VisitorAnalytics';
import { TimeRangeUtils } from '../webVitals/utils/TimeRangeUtils';

export class VisitorTrackingService {
  /**
   * Initialize visitor tracking
   */
  initialize(): void {
    pageViewTracker.initialize();
  }

  /**
   * Track a page view
   */
  trackPageView(data: Partial<PageViewEntry>): void {
    pageViewTracker.trackPageView(data);
  }

  /**
   * Get visitor data for a time range
   */
  getVisitorData(timeRange: TimeRange): VisitorData {
    const timeRangeMs = TimeRangeUtils.getTimeRangeMs(timeRange);
    const pageViews = pageViewTracker.getAllPageViews();
    return visitorAnalytics.calculateVisitorData(pageViews, timeRangeMs);
  }

  /**
   * Get user metrics
   */
  async getUserMetrics(timeRange: TimeRange): Promise<UserMetrics> {
    const timeRangeMs = TimeRangeUtils.getTimeRangeMs(timeRange);
    const pageViews = pageViewTracker.getAllPageViews();
    return visitorAnalytics.calculateUserMetrics(pageViews, timeRangeMs);
  }

  /**
   * Get page views for a specific page
   */
  getPageViews(path: string, timeRange: TimeRange): PageViewEntry[] {
    const timeRangeMs = TimeRangeUtils.getTimeRangeMs(timeRange);
    return pageViewTracker.getPageViews(path, timeRangeMs);
  }

  /**
   * Get bounce rate for a specific page
   */
  getPageBounceRate(path: string): number {
    const pageViews = pageViewTracker.getAllPageViews();
    return visitorAnalytics.calculatePageBounceRate(path, pageViews);
  }

  /**
   * Get top pages analytics
   */
  getTopPages(limit: number = 10) {
    const pageViews = pageViewTracker.getAllPageViews();
    return visitorAnalytics.getTopPages(pageViews, limit);
  }

  /**
   * Get engagement score
   */
  getEngagementScore(): number {
    const pageViews = pageViewTracker.getAllPageViews();
    return visitorAnalytics.calculateEngagementScore(pageViews);
  }

  /**
   * Get all page view data
   */
  getAllPageViews(): PageViewEntry[] {
    return pageViewTracker.getAllPageViews();
  }

  /**
   * Clear all stored data
   */
  clearData(): void {
    pageViewTracker.clearData();
  }
}

// Export singleton instance
export const visitorTrackingService = new VisitorTrackingService();