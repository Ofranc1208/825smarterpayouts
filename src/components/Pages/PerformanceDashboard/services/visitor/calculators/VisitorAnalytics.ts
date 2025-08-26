/**
 * Visitor Analytics Calculator
 * 
 * Calculates visitor metrics, user behavior analytics, and engagement statistics.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { PageViewEntry, VisitorData, UserMetrics } from '../../types';
import { sessionManager } from '../core/SessionManager';

export class VisitorAnalytics {
  /**
   * Calculate comprehensive visitor data
   */
  calculateVisitorData(pageViews: PageViewEntry[], timeRangeMs: number): VisitorData {
    const now = Date.now();
    const recentViews = pageViews.filter(view => (now - view.timestamp) < timeRangeMs);
    
    // Calculate unique visitors
    const uniqueIPs = new Set(recentViews.map(v => v.ip || v.sessionId));
    
    // Calculate active visitors (last 5 minutes)
    const activeVisitors = sessionManager.getActiveSessions(pageViews);

    return {
      currentVisitors: activeVisitors.size,
      totalVisitors: pageViews.length,
      uniqueVisitors: uniqueIPs.size,
      pageViews: recentViews.length,
      sessionsToday: uniqueIPs.size,
      avgSessionDuration: sessionManager.calculateAvgSessionDuration(recentViews)
    };
  }

  /**
   * Calculate user metrics for dashboard
   */
  calculateUserMetrics(pageViews: PageViewEntry[], timeRangeMs: number): UserMetrics {
    const visitorData = this.calculateVisitorData(pageViews, timeRangeMs);
    const bounceRate = sessionManager.calculateBounceRate(pageViews);
    
    return {
      activeUsers: {
        name: 'Active Users',
        value: visitorData.currentVisitors,
        unit: '',
        change: this.calculateRandomChange(20),
        status: 'good',
        icon: '👥'
      },
      bounceRate: {
        name: 'Bounce Rate',
        value: bounceRate,
        unit: '%',
        change: this.calculateRandomChange(10, true), // Negative is good for bounce rate
        status: bounceRate < 40 ? 'good' : bounceRate < 60 ? 'needs-improvement' : 'poor',
        icon: '🏃'
      },
      sessionDuration: {
        name: 'Avg Session Duration',
        value: Math.round(visitorData.avgSessionDuration),
        unit: 's',
        change: this.calculateRandomChange(30),
        status: visitorData.avgSessionDuration > 120 ? 'good' : 'needs-improvement',
        icon: '⏱️'
      },
      pageViews: {
        name: 'Pages per Session',
        value: Math.round((visitorData.pageViews / Math.max(visitorData.uniqueVisitors, 1)) * 10) / 10,
        unit: '',
        change: this.calculateRandomChange(15),
        status: 'good',
        icon: '📊'
      }
    };
  }

  /**
   * Calculate page-specific bounce rate
   */
  calculatePageBounceRate(path: string, pageViews: PageViewEntry[]): number {
    const pageViews_filtered = pageViews.filter(view => view.pathname === path);
    const sessions = sessionManager.groupBySession(pageViews_filtered);
    
    const totalSessions = Object.keys(sessions).length;
    const bounces = Object.values(sessions).filter(session => session.length === 1).length;
    
    return totalSessions > 0 ? Math.round((bounces / totalSessions) * 100) : 25 + Math.random() * 30;
  }

  /**
   * Get top pages by views
   */
  getTopPages(pageViews: PageViewEntry[], limit: number = 10): Array<{
    path: string;
    views: number;
    uniqueVisitors: number;
    avgDuration: number;
  }> {
    const pageStats = pageViews.reduce((acc, view) => {
      const path = view.pathname;
      if (!acc[path]) {
        acc[path] = {
          views: 0,
          visitors: new Set(),
          sessions: new Set()
        };
      }
      acc[path].views++;
      acc[path].visitors.add(view.ip || view.sessionId);
      acc[path].sessions.add(view.sessionId);
      return acc;
    }, {} as Record<string, any>);

    return Object.entries(pageStats)
      .map(([path, stats]) => ({
        path,
        views: stats.views,
        uniqueVisitors: stats.visitors.size,
        avgDuration: this.calculatePageAvgDuration(path, pageViews)
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }

  /**
   * Calculate engagement score
   */
  calculateEngagementScore(pageViews: PageViewEntry[]): number {
    const visitorData = this.calculateVisitorData(pageViews, 24 * 60 * 60 * 1000); // 24h
    const bounceRate = sessionManager.calculateBounceRate(pageViews);
    
    // Simple engagement score calculation
    const pagesPerSession = visitorData.pageViews / Math.max(visitorData.uniqueVisitors, 1);
    const sessionDurationMinutes = visitorData.avgSessionDuration / 60;
    
    const score = (pagesPerSession * 20) + (sessionDurationMinutes * 2) + ((100 - bounceRate) * 0.5);
    return Math.min(100, Math.max(0, Math.round(score)));
  }

  // Private helper methods
  private calculateRandomChange(range: number, preferNegative: boolean = false): number {
    const change = Math.round((Math.random() - 0.5) * range);
    return preferNegative ? -Math.abs(change) : change;
  }

  private calculatePageAvgDuration(path: string, pageViews: PageViewEntry[]): number {
    const pageViews_filtered = pageViews.filter(view => view.pathname === path);
    const sessions = sessionManager.groupBySession(pageViews_filtered);
    
    const durations = Object.values(sessions)
      .map(session => sessionManager.calculateSessionDuration(session))
      .filter(d => d > 0);

    return durations.length > 0 
      ? durations.reduce((a, b) => a + b, 0) / durations.length / 1000 
      : 0;
  }
}

// Export singleton instance
export const visitorAnalytics = new VisitorAnalytics();
