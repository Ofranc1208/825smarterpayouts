// Analytics hook for Settlement Laws page
// Medium complexity hook - under 150 lines per rule

'use client';

import { useEffect, useCallback } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export function useStateLawsAnalytics() {
  // Track page view with Performance Dashboard integration
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'Settlement Laws by State',
        page_location: window.location.href
      });
    }
    
    // Report to Performance Dashboard
    reportToPerformanceDashboard('pageView', {
      page: 'Settlement Laws by State',
      timestamp: Date.now(),
      url: window.location.href
    });
  }, []);

  // Track search events
  const trackSearch = useCallback((query: string, resultsCount: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'search', {
        search_term: query,
        custom_parameter: resultsCount,
        event_category: 'Settlement Laws',
        event_label: 'State Search'
      });
    }
  }, []);

  // Track state accordion clicks
  const trackStateClick = useCallback((stateName: string, action: 'open' | 'close') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'Settlement Laws',
        event_label: `${stateName} - ${action}`,
        custom_parameter: stateName
      });
    }
  }, []);

  // Track resource link clicks
  const trackResourceClick = useCallback((stateName: string, resourceLabel: string, url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'External Links',
        event_label: `${stateName} - ${resourceLabel}`,
        custom_parameter: url
      });
    }
  }, []);

  // Track phone CTA clicks
  const trackPhoneClick = useCallback((location: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'Conversion',
        event_label: `Phone CTA - ${location}`,
        custom_parameter: 'tel:8555823506'
      });
    }
  }, []);

  // Track quote CTA clicks
  const trackQuoteClick = useCallback((location: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'Conversion',
        event_label: `Quote CTA - ${location}`,
        custom_parameter: '/pricing-calculator'
      });
    }
  }, []);

  // Track chat CTA clicks
  const trackChatClick = useCallback((location: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'Conversion',
        event_label: `Chat CTA - ${location}`,
        custom_parameter: '/mint-intelligent-chat'
      });
    }
  }, []);

  // Track scroll depth
  const trackScrollDepth = useCallback((percentage: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'scroll', {
        event_category: 'Engagement',
        event_label: `${percentage}% Scroll Depth`,
        custom_parameter: percentage
      });
    }
  }, []);

  // Track time on page
  const trackTimeOnPage = useCallback((seconds: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: 'page_view_time',
        value: seconds,
        event_category: 'Engagement',
        event_label: 'Settlement Laws Page'
      });
    }
  }, []);

  // Performance Dashboard reporting function
  const reportToPerformanceDashboard = useCallback((
    eventType: string,
    eventData: Record<string, any>
  ) => {
    try {
      // Report to Performance Dashboard if available
      if (typeof window !== 'undefined' && (window as any).PerformanceDashboard) {
        (window as any).PerformanceDashboard.reportEvent({
          type: eventType,
          component: 'SettlementLawsByState',
          data: eventData,
          timestamp: Date.now()
        });
      }

      // Fallback: Store in sessionStorage for Performance Dashboard
      const existingEvents = JSON.parse(
        window.sessionStorage.getItem('performance-dashboard-events') || '[]'
      );
      
      existingEvents.push({
        type: eventType,
        component: 'SettlementLawsByState',
        data: eventData,
        timestamp: Date.now()
      });

      // Keep only last 100 events to prevent memory issues
      if (existingEvents.length > 100) {
        existingEvents.splice(0, existingEvents.length - 100);
      }

      window.sessionStorage.setItem(
        'performance-dashboard-events',
        JSON.stringify(existingEvents)
      );
    } catch (error) {
      console.warn('Failed to report to Performance Dashboard:', error);
    }
  }, []);

  return {
    trackSearch,
    trackStateClick,
    trackResourceClick,
    trackPhoneClick,
    trackQuoteClick,
    trackChatClick,
    trackScrollDepth,
    trackTimeOnPage,
    reportToPerformanceDashboard
  };
}
