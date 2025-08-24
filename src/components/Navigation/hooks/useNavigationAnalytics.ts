import { useCallback, useEffect } from 'react';

/**
 * Navigation Analytics Hook
 * 
 * Provides comprehensive analytics tracking for navigation components including:
 * - User interaction tracking
 * - Performance metrics
 * - Conversion funnel analysis
 * - Heatmap data collection
 * 
 * @hook useNavigationAnalytics
 * @author SmarterPayouts Team
 * @since 2024
 */

export interface NavigationAnalyticsEvent {
  /** Event category */
  category: 'navigation' | 'search' | 'dropdown' | 'mobile-menu' | 'performance';
  /** Event action */
  action: string;
  /** Event label */
  label?: string;
  /** Event value */
  value?: number;
  /** Custom properties */
  properties?: Record<string, any>;
  /** Timestamp */
  timestamp: Date;
  /** User session ID */
  sessionId: string;
  /** Page path */
  path: string;
}

export interface NavigationPerformanceMetrics {
  /** Time to first navigation interaction */
  timeToFirstInteraction?: number;
  /** Navigation load time */
  navigationLoadTime?: number;
  /** Dropdown open time */
  dropdownOpenTime?: number;
  /** Mobile menu animation duration */
  mobileMenuAnimationTime?: number;
  /** Search response time */
  searchResponseTime?: number;
}

interface UseNavigationAnalyticsReturn {
  /** Track navigation event */
  trackEvent: (
    category: NavigationAnalyticsEvent['category'],
    action: string,
    label?: string,
    value?: number,
    properties?: Record<string, any>
  ) => void;
  
  /** Track navigation click */
  trackNavClick: (linkText: string, linkUrl: string, position: number) => void;
  
  /** Track dropdown interaction */
  trackDropdownInteraction: (dropdownName: string, action: 'open' | 'close' | 'item-click', itemName?: string) => void;
  
  /** Track mobile menu interaction */
  trackMobileMenuInteraction: (action: 'open' | 'close' | 'item-click', itemName?: string) => void;
  
  /** Track search interaction */
  trackSearchInteraction: (query: string, resultsCount?: number, selectedResult?: string) => void;
  
  /** Track performance metric */
  trackPerformance: (metric: keyof NavigationPerformanceMetrics, value: number) => void;
  
  /** Track user journey step */
  trackUserJourney: (step: string, metadata?: Record<string, any>) => void;
  
  /** Get session analytics data */
  getSessionData: () => NavigationAnalyticsEvent[];
}

/**
 * Generate or retrieve session ID
 */
const getSessionId = (): string => {
  // Check if we're in browser environment
  if (typeof window === 'undefined') {
    return `nav-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  let sessionId = sessionStorage.getItem('navigation-session-id');
  if (!sessionId) {
    sessionId = `nav-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('navigation-session-id', sessionId);
  }
  return sessionId;
};

/**
 * Send event to analytics services
 */
const sendToAnalytics = (event: NavigationAnalyticsEvent) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      custom_map: event.properties,
      page_path: event.path,
      session_id: event.sessionId
    });
  }

  // Adobe Analytics
  if (typeof window !== 'undefined' && (window as any).s) {
    const s = (window as any).s;
    s.linkTrackVars = 'events,eVar1,eVar2,eVar3';
    s.linkTrackEvents = 'event1';
    s.events = 'event1';
    s.eVar1 = event.category;
    s.eVar2 = event.action;
    s.eVar3 = event.label;
    s.tl(true, 'o', `Navigation: ${event.action}`);
  }

  // Mixpanel
  if (typeof window !== 'undefined' && (window as any).mixpanel) {
    (window as any).mixpanel.track(`Navigation ${event.action}`, {
      category: event.category,
      label: event.label,
      value: event.value,
      path: event.path,
      session_id: event.sessionId,
      ...event.properties
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
      console.warn('Failed to send analytics event:', error);
    });
  }
};

/**
 * Navigation Analytics Hook
 * 
 * Provides comprehensive analytics tracking for navigation interactions
 * with support for multiple analytics platforms
 */
export const useNavigationAnalytics = (): UseNavigationAnalyticsReturn => {
  const sessionId = getSessionId();

  // Track page view on mount
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    const event: NavigationAnalyticsEvent = {
      category: 'navigation',
      action: 'page_view',
      label: 'navigation_loaded',
      timestamp: new Date(),
      sessionId,
      path: window.location.pathname
    };
    
    sendToAnalytics(event);
    
    // Store in session for debugging
    const events = JSON.parse(sessionStorage.getItem('navigation-analytics') || '[]');
    events.push(event);
    sessionStorage.setItem('navigation-analytics', JSON.stringify(events));
  }, [sessionId]);

  // Generic event tracking
  const trackEvent = useCallback((
    category: NavigationAnalyticsEvent['category'],
    action: string,
    label?: string,
    value?: number,
    properties?: Record<string, any>
  ) => {
    if (typeof window === 'undefined') return;
    
    const event: NavigationAnalyticsEvent = {
      category,
      action,
      label,
      value,
      properties,
      timestamp: new Date(),
      sessionId,
      path: window.location.pathname
    };

    sendToAnalytics(event);

    // Store locally for session analysis
    const events = JSON.parse(sessionStorage.getItem('navigation-analytics') || '[]');
    events.push(event);
    sessionStorage.setItem('navigation-analytics', JSON.stringify(events.slice(-50))); // Keep last 50 events
  }, [sessionId]);

  // Track navigation clicks
  const trackNavClick = useCallback((linkText: string, linkUrl: string, position: number) => {
    if (typeof window === 'undefined') return;
    trackEvent('navigation', 'nav_click', linkText, position, {
      link_url: linkUrl,
      link_position: position,
      link_text: linkText
    });
  }, [trackEvent]);

  // Track dropdown interactions
  const trackDropdownInteraction = useCallback((
    dropdownName: string, 
    action: 'open' | 'close' | 'item-click', 
    itemName?: string
  ) => {
    trackEvent('dropdown', `dropdown_${action}`, dropdownName, undefined, {
      dropdown_name: dropdownName,
      item_name: itemName,
      interaction_type: action
    });
  }, [trackEvent]);

  // Track mobile menu interactions
  const trackMobileMenuInteraction = useCallback((
    action: 'open' | 'close' | 'item-click', 
    itemName?: string
  ) => {
    trackEvent('mobile-menu', `mobile_menu_${action}`, itemName, undefined, {
      item_name: itemName,
      interaction_type: action,
      device_type: 'mobile'
    });
  }, [trackEvent]);

  // Track search interactions
  const trackSearchInteraction = useCallback((
    query: string, 
    resultsCount?: number, 
    selectedResult?: string
  ) => {
    trackEvent('search', 'search_query', query, resultsCount, {
      search_query: query,
      results_count: resultsCount,
      selected_result: selectedResult,
      query_length: query.length
    });
  }, [trackEvent]);

  // Track performance metrics
  const trackPerformance = useCallback((
    metric: keyof NavigationPerformanceMetrics, 
    value: number
  ) => {
    trackEvent('performance', `performance_${metric}`, metric, value, {
      metric_name: metric,
      metric_value: value,
      performance_category: 'navigation'
    });
  }, [trackEvent]);

  // Track user journey steps
  const trackUserJourney = useCallback((step: string, metadata?: Record<string, any>) => {
    trackEvent('navigation', 'user_journey_step', step, undefined, {
      journey_step: step,
      step_timestamp: new Date().toISOString(),
      ...metadata
    });
  }, [trackEvent]);

  // Get session analytics data
  const getSessionData = useCallback((): NavigationAnalyticsEvent[] => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(sessionStorage.getItem('navigation-analytics') || '[]');
  }, []);

  return {
    trackEvent,
    trackNavClick,
    trackDropdownInteraction,
    trackMobileMenuInteraction,
    trackSearchInteraction,
    trackPerformance,
    trackUserJourney,
    getSessionData
  };
};
