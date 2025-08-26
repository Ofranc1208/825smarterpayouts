/**
 * Session Manager
 * 
 * Handles user session management and tracking.
 * Manages session IDs, storage, and session-related calculations.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { PageViewEntry } from '../../types';

export class SessionManager {
  private sessionKey = 'analytics-session-id';

  /**
   * Get or create session ID
   */
  getSessionId(): string {
    if (typeof window !== 'undefined') {
      let sessionId = sessionStorage.getItem(this.sessionKey);
      if (!sessionId) {
        sessionId = this.generateSessionId();
        sessionStorage.setItem(this.sessionKey, sessionId);
      }
      return sessionId;
    }
    return 'server-session';
  }

  /**
   * Generate new session ID
   */
  generateSessionId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Clear current session
   */
  clearSession(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(this.sessionKey);
    }
  }

  /**
   * Group page views by session
   */
  groupBySession(pageViews: PageViewEntry[]): Record<string, PageViewEntry[]> {
    return pageViews.reduce((acc, view) => {
      const sessionId = view.sessionId || view.ip || 'unknown';
      if (!acc[sessionId]) acc[sessionId] = [];
      acc[sessionId].push(view);
      return acc;
    }, {} as Record<string, PageViewEntry[]>);
  }

  /**
   * Calculate session duration
   */
  calculateSessionDuration(sessionViews: PageViewEntry[]): number {
    if (sessionViews.length < 2) return 0;
    
    const sorted = sessionViews.sort((a, b) => a.timestamp - b.timestamp);
    return sorted[sorted.length - 1].timestamp - sorted[0].timestamp;
  }

  /**
   * Calculate average session duration
   */
  calculateAvgSessionDuration(pageViews: PageViewEntry[]): number {
    const sessions = this.groupBySession(pageViews);
    const durations = Object.values(sessions)
      .map(session => this.calculateSessionDuration(session))
      .filter(d => d > 0);

    return durations.length > 0 
      ? durations.reduce((a, b) => a + b, 0) / durations.length / 1000 
      : 180;
  }

  /**
   * Calculate bounce rate
   */
  calculateBounceRate(pageViews: PageViewEntry[]): number {
    const sessions = this.groupBySession(pageViews);
    const totalSessions = Object.keys(sessions).length;
    const bounces = Object.values(sessions).filter(session => session.length === 1).length;
    
    return totalSessions > 0 ? Math.round((bounces / totalSessions) * 100) : 0;
  }

  /**
   * Get active sessions (within time threshold)
   */
  getActiveSessions(pageViews: PageViewEntry[], thresholdMs: number = 5 * 60 * 1000): Set<string> {
    const now = Date.now();
    const recentViews = pageViews.filter(view => (now - view.timestamp) < thresholdMs);
    return new Set(recentViews.map(v => v.sessionId || v.ip || 'unknown'));
  }
}

// Export singleton instance
export const sessionManager = new SessionManager();
