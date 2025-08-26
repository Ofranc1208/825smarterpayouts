/**
 * Page View Tracker
 * 
 * Handles page view tracking, navigation monitoring, and user interactions.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { PageViewEntry } from '../../types';
import { sessionManager } from './SessionManager';

export class PageViewTracker {
  private pageViewData: PageViewEntry[] = [];
  private maxEntries = 10000;
  private isInitialized = false;

  /**
   * Initialize page view tracking
   */
  initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    // Track initial page view
    this.trackPageView({});

    // Initialize tracking mechanisms
    this.initializeNavigationTracking();
    this.initializeInteractionTracking();

    this.isInitialized = true;
    console.log('✅ Page view tracking initialized');
  }

  /**
   * Track a page view
   */
  trackPageView(data: Partial<PageViewEntry>): void {
    const pageView: PageViewEntry = {
      url: data.url || (typeof window !== 'undefined' ? window.location.href : ''),
      pathname: data.pathname || (typeof window !== 'undefined' ? window.location.pathname : ''),
      referrer: data.referrer || (typeof document !== 'undefined' ? document.referrer : ''),
      timestamp: data.timestamp || Date.now(),
      sessionId: data.sessionId || sessionManager.getSessionId(),
      ...data
    };

    this.pageViewData.push(pageView);

    // Maintain size limit
    if (this.pageViewData.length > this.maxEntries) {
      this.pageViewData = this.pageViewData.slice(-this.maxEntries);
    }
  }

  /**
   * Get all page views
   */
  getAllPageViews(): PageViewEntry[] {
    return [...this.pageViewData];
  }

  /**
   * Get page views for specific path
   */
  getPageViews(path: string, timeRangeMs?: number): PageViewEntry[] {
    let views = this.pageViewData.filter(view => view.pathname === path);
    
    if (timeRangeMs) {
      const now = Date.now();
      views = views.filter(view => (now - view.timestamp) < timeRangeMs);
    }
    
    return views;
  }

  /**
   * Get filtered page views by time range
   */
  getFilteredPageViews(timeRangeMs: number): PageViewEntry[] {
    const now = Date.now();
    return this.pageViewData.filter(view => (now - view.timestamp) < timeRangeMs);
  }

  /**
   * Clear all data
   */
  clearData(): void {
    this.pageViewData = [];
  }

  /**
   * Set maximum entries
   */
  setMaxEntries(max: number): void {
    this.maxEntries = max;
  }

  /**
   * Check if tracker is ready
   */
  isReady(): boolean {
    return this.isInitialized;
  }

  // Private methods
  private initializeNavigationTracking(): void {
    if (typeof window === 'undefined') return;

    let currentUrl = window.location.href;
    
    const checkUrlChange = () => {
      if (window.location.href !== currentUrl) {
        currentUrl = window.location.href;
        this.trackPageView({
          type: 'navigation',
          url: window.location.href,
          pathname: window.location.pathname,
          referrer: document.referrer
        });
      }
    };

    // Check for URL changes every second
    setInterval(checkUrlChange, 1000);
  }

  private initializeInteractionTracking(): void {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        this.trackPageView({
          type: 'visibility_change',
          url: window.location.href,
          pathname: window.location.pathname
        });
      }
    };

    const handleUserInteraction = (event: Event) => {
      // Throttle interaction tracking to avoid spam
      if (Math.random() > 0.1) return; // Only track 10% of interactions
      
      this.trackPageView({
        type: 'user_interaction',
        eventType: event.type,
        url: window.location.href,
        pathname: window.location.pathname
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('click', handleUserInteraction, { passive: true });
    document.addEventListener('scroll', handleUserInteraction, { passive: true });
  }
}

// Export singleton instance
export const pageViewTracker = new PageViewTracker();
