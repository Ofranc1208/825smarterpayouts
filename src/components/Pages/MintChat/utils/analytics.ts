'use client';

/**
 * Analytics Utility for MintChat
 * 
 * Provides comprehensive analytics tracking for user behavior,
 * chat interactions, and performance metrics with privacy compliance.
 * 
 * @utility analytics
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface AnalyticsEvent {
  /** Event category (e.g., 'chat', 'navigation', 'engagement') */
  category: string;
  /** Event action (e.g., 'message_sent', 'button_click') */
  action: string;
  /** Event label (optional additional context) */
  label?: string;
  /** Event value (optional numeric value) */
  value?: number;
  /** Custom properties */
  properties?: Record<string, any>;
}

interface ChatAnalyticsEvent extends AnalyticsEvent {
  /** Chat session ID */
  sessionId?: string;
  /** Message type */
  messageType?: 'user' | 'ai' | 'system';
  /** Response time for AI messages */
  responseTime?: number;
}

/**
 * Analytics Class
 * 
 * ## Features
 * - ✅ Privacy-compliant tracking
 * - ✅ Chat interaction analytics
 * - ✅ User behavior tracking
 * - ✅ Performance metrics
 * - ✅ Custom event tracking
 * - ✅ GDPR compliance
 * 
 * @example
 * ```tsx
 * import { analytics } from '../utils/analytics';
 * 
 * // Track chat message
 * analytics.trackChatMessage({
 *   category: 'chat',
 *   action: 'message_sent',
 *   messageType: 'user',
 *   properties: { messageLength: 50 }
 * });
 * 
 * // Track page view
 * analytics.trackPageView('/mint-intelligent-chat');
 * ```
 */
class Analytics {
  private isEnabled: boolean = true;
  private sessionId: string;
  private userId: string | null = null;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeAnalytics();
  }

  /**
   * Initialize analytics with privacy compliance
   */
  private initializeAnalytics() {
    if (typeof window === 'undefined') return;

    // Check for user consent (GDPR compliance)
    const hasConsent = localStorage.getItem('analytics-consent') === 'true';
    this.isEnabled = hasConsent;

    // Generate anonymous user ID if consent given
    if (this.isEnabled) {
      this.userId = localStorage.getItem('anonymous-user-id') || this.generateUserId();
      localStorage.setItem('anonymous-user-id', this.userId);
    }
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate anonymous user ID
   */
  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Track page view
   */
  trackPageView(path: string, title?: string) {
    if (!this.isEnabled) return;

    this.trackEvent({
      category: 'navigation',
      action: 'page_view',
      label: path,
      properties: {
        path,
        title: title || document.title,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        userId: this.userId
      }
    });
  }

  /**
   * Track chat-specific events
   */
  trackChatMessage(event: ChatAnalyticsEvent) {
    if (!this.isEnabled) return;

    this.trackEvent({
      ...event,
      properties: {
        ...event.properties,
        sessionId: event.sessionId || this.sessionId,
        timestamp: Date.now(),
        userId: this.userId
      }
    });
  }

  /**
   * Track user interactions
   */
  trackInteraction(element: string, action: string, context?: string) {
    if (!this.isEnabled) return;

    this.trackEvent({
      category: 'interaction',
      action: action,
      label: element,
      properties: {
        element,
        context,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        userId: this.userId
      }
    });
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metric: string, value: number, unit: string = 'ms') {
    if (!this.isEnabled) return;

    this.trackEvent({
      category: 'performance',
      action: 'metric_recorded',
      label: metric,
      value: value,
      properties: {
        metric,
        value,
        unit,
        timestamp: Date.now(),
        sessionId: this.sessionId
      }
    });
  }

  /**
   * Track errors and exceptions
   */
  trackError(error: Error, context?: string) {
    if (!this.isEnabled) return;

    this.trackEvent({
      category: 'error',
      action: 'exception',
      label: error.message,
      properties: {
        error: error.message,
        stack: error.stack,
        context,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        userId: this.userId
      }
    });
  }

  /**
   * Track custom events
   */
  trackEvent(event: AnalyticsEvent) {
    if (!this.isEnabled) return;

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event);
    }

    // Send to analytics service (Google Analytics, Mixpanel, etc.)
    this.sendToAnalyticsService(event);
  }

  /**
   * Send event to analytics service
   */
  private sendToAnalyticsService(event: AnalyticsEvent) {
    // Google Analytics 4 (gtag)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameters: event.properties
      });
    }

    // Custom analytics endpoint
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      }).catch(error => {
        console.warn('[Analytics] Failed to send event:', error);
      });
    }
  }

  /**
   * Enable analytics tracking (user consent)
   */
  enableTracking() {
    this.isEnabled = true;
    localStorage.setItem('analytics-consent', 'true');
    this.userId = this.generateUserId();
    localStorage.setItem('anonymous-user-id', this.userId);
  }

  /**
   * Disable analytics tracking (user opt-out)
   */
  disableTracking() {
    this.isEnabled = false;
    localStorage.removeItem('analytics-consent');
    localStorage.removeItem('anonymous-user-id');
    this.userId = null;
  }

  /**
   * Get current tracking status
   */
  isTrackingEnabled(): boolean {
    return this.isEnabled;
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Export types for external use
export type { AnalyticsEvent, ChatAnalyticsEvent };
