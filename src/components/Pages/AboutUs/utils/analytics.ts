/**
 * Analytics Utilities
 * 
 * Enterprise-grade analytics and monitoring utilities for the About Us page.
 * Provides comprehensive tracking, user behavior analysis, and performance
 * monitoring for business intelligence and optimization.
 * 
 * @module AnalyticsUtils
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

/**
 * Analytics event interface
 */
export interface AnalyticsEvent {
  /** Event category */
  category: string;
  /** Event action */
  action: string;
  /** Event label (optional) */
  label?: string;
  /** Event value (optional) */
  value?: number;
  /** Custom parameters */
  parameters?: Record<string, any>;
}

/**
 * User interaction event interface
 */
export interface UserInteractionEvent extends AnalyticsEvent {
  /** Element that was interacted with */
  element: string;
  /** Interaction type */
  interactionType: 'click' | 'hover' | 'scroll' | 'focus';
  /** Timestamp of interaction */
  timestamp: number;
  /** User session ID */
  sessionId: string;
}

/**
 * Performance metrics interface
 */
export interface PerformanceMetrics {
  /** Page load time */
  pageLoadTime: number;
  /** First contentful paint */
  firstContentfulPaint: number;
  /** Largest contentful paint */
  largestContentfulPaint: number;
  /** Cumulative layout shift */
  cumulativeLayoutShift: number;
  /** First input delay */
  firstInputDelay: number;
}

/**
 * Analytics service class
 * 
 * Provides enterprise-grade analytics tracking with
 * privacy compliance and performance monitoring.
 */
export class AboutUsAnalytics {
  private sessionId: string;
  private userId?: string;
  private isEnabled: boolean;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.isEnabled = this.checkAnalyticsConsent();
    this.initializeAnalytics();
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Check if analytics consent is given
   */
  private checkAnalyticsConsent(): boolean {
    // In production, check for user consent
    // This would integrate with your cookie consent system
    return typeof window !== 'undefined' && 
           localStorage.getItem('analytics_consent') === 'true';
  }

  /**
   * Initialize analytics tracking
   */
  private initializeAnalytics(): void {
    if (!this.isEnabled || typeof window === 'undefined') return;

    // Track page view
    this.trackPageView();

    // Track performance metrics
    this.trackPerformanceMetrics();

    // Set up scroll tracking
    this.setupScrollTracking();

    // Set up click tracking
    this.setupClickTracking();
  }

  /**
   * Track page view event
   */
  public trackPageView(): void {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      category: 'Page View',
      action: 'view',
      label: 'About Us',
      parameters: {
        page_title: document.title,
        page_location: window.location.href,
        session_id: this.sessionId,
        timestamp: Date.now()
      }
    };

    this.sendEvent(event);
  }

  /**
   * Track user interaction
   */
  public trackInteraction(
    element: string, 
    interactionType: 'click' | 'hover' | 'scroll' | 'focus',
    additionalData?: Record<string, any>
  ): void {
    if (!this.isEnabled) return;

    const event: UserInteractionEvent = {
      category: 'User Interaction',
      action: interactionType,
      label: element,
      element,
      interactionType,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      parameters: {
        ...additionalData,
        page: 'about-us'
      }
    };

    this.sendEvent(event);
  }

  /**
   * Track section visibility
   */
  public trackSectionVisibility(sectionName: string, isVisible: boolean): void {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      category: 'Section Visibility',
      action: isVisible ? 'section_visible' : 'section_hidden',
      label: sectionName,
      parameters: {
        section: sectionName,
        visible: isVisible,
        timestamp: Date.now(),
        session_id: this.sessionId
      }
    };

    this.sendEvent(event);
  }

  /**
   * Track performance metrics
   */
  private trackPerformanceMetrics(): void {
    if (!this.isEnabled || typeof window === 'undefined') return;

    // Wait for page to load completely
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        const metrics: Partial<PerformanceMetrics> = {
          pageLoadTime: navigation.loadEventEnd - navigation.fetchStart
        };

        // Get paint metrics
        paint.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            metrics.firstContentfulPaint = entry.startTime;
          }
        });

        // Track Core Web Vitals if available
        if ('web-vitals' in window) {
          // This would integrate with web-vitals library
          // getCLS, getFID, getFCP, getLCP, getTTFB
        }

        const event: AnalyticsEvent = {
          category: 'Performance',
          action: 'page_metrics',
          label: 'About Us',
          parameters: {
            ...metrics,
            user_agent: navigator.userAgent,
            session_id: this.sessionId
          }
        };

        this.sendEvent(event);
      }, 1000);
    });
  }

  /**
   * Set up scroll tracking
   */
  private setupScrollTracking(): void {
    if (!this.isEnabled) return;

    let scrollDepth = 0;
    const scrollThresholds = [25, 50, 75, 90, 100];
    const trackedThresholds = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > scrollDepth) {
        scrollDepth = scrollPercent;

        scrollThresholds.forEach(threshold => {
          if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
            trackedThresholds.add(threshold);
            
            const event: AnalyticsEvent = {
              category: 'Scroll Depth',
              action: 'scroll',
              label: `${threshold}%`,
              value: threshold,
              parameters: {
                scroll_depth: threshold,
                session_id: this.sessionId
              }
            };

            this.sendEvent(event);
          }
        });
      }
    };

    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Set up click tracking
   */
  private setupClickTracking(): void {
    if (!this.isEnabled) return;

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      
      // Track CTA button clicks
      if (target.closest('[data-analytics="cta-button"]')) {
        const buttonText = target.textContent || 'Unknown';
        this.trackInteraction(`CTA Button: ${buttonText}`, 'click', {
          button_text: buttonText,
          button_location: this.getElementLocation(target)
        });
      }

      // Track navigation clicks
      if (target.closest('a[href]')) {
        const link = target.closest('a') as HTMLAnchorElement;
        this.trackInteraction(`Link: ${link.href}`, 'click', {
          link_url: link.href,
          link_text: link.textContent
        });
      }

      // Track feature card clicks
      if (target.closest('[data-analytics="feature-card"]')) {
        const card = target.closest('[data-analytics="feature-card"]') as HTMLElement;
        const featureName = card.dataset.featureName || 'Unknown';
        this.trackInteraction(`Feature Card: ${featureName}`, 'click', {
          feature_name: featureName
        });
      }
    });
  }

  /**
   * Get element location on page
   */
  private getElementLocation(element: HTMLElement): string {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset;
    const scrollLeft = window.pageXOffset;
    
    return `x:${Math.round(rect.left + scrollLeft)},y:${Math.round(rect.top + scrollTop)}`;
  }

  /**
   * Send event to analytics service
   */
  private sendEvent(event: AnalyticsEvent | UserInteractionEvent): void {
    if (!this.isEnabled) return;

    // In production, this would send to your analytics service
    // Examples: Google Analytics, Mixpanel, Segment, etc.
    
    if (process.env.NODE_ENV === 'development') {
      console.group('📊 Analytics Event');
      console.log('Category:', event.category);
      console.log('Action:', event.action);
      console.log('Label:', event.label);
      console.log('Parameters:', event.parameters);
      console.groupEnd();
    }

    // Example implementation for Google Analytics 4
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameters: event.parameters
      });
    }

    // Example implementation for custom analytics endpoint
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      }).catch(error => {
        // Silently handle analytics errors
        console.warn('Analytics tracking failed:', error);
      });
    }
  }

  /**
   * Set user ID for tracking
   */
  public setUserId(userId: string): void {
    this.userId = userId;
  }

  /**
   * Enable analytics tracking
   */
  public enable(): void {
    this.isEnabled = true;
    if (typeof window !== 'undefined') {
      localStorage.setItem('analytics_consent', 'true');
    }
  }

  /**
   * Disable analytics tracking
   */
  public disable(): void {
    this.isEnabled = false;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('analytics_consent');
    }
  }
}

// Export singleton instance
export const aboutUsAnalytics = new AboutUsAnalytics();
