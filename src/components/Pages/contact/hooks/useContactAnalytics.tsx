'use client';
import { useCallback } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

interface UseContactAnalyticsReturn {
  trackFormSubmission: (success: boolean) => void;
  trackCTAClick: (buttonId: string) => void;
  trackContactMethodClick: (method: string) => void;
  trackFAQInteraction: (questionId: string) => void;
  trackPageView: () => void;
}

export default function useContactAnalytics(): UseContactAnalyticsReturn {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Google Analytics 4 tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      });
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }
  }, []);

  const trackFormSubmission = useCallback((success: boolean) => {
    trackEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'contact_form',
      label: 'contact_page'
    });
  }, [trackEvent]);

  const trackCTAClick = useCallback((buttonId: string) => {
    trackEvent({
      action: 'cta_click',
      category: 'engagement',
      label: buttonId
    });
  }, [trackEvent]);

  const trackContactMethodClick = useCallback((method: string) => {
    trackEvent({
      action: 'contact_method_click',
      category: 'contact_interaction',
      label: method
    });
  }, [trackEvent]);

  const trackFAQInteraction = useCallback((questionId: string) => {
    trackEvent({
      action: 'faq_expand',
      category: 'content_interaction',
      label: questionId
    });
  }, [trackEvent]);

  const trackPageView = useCallback(() => {
    trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: 'contact_page'
    });
  }, [trackEvent]);

  return {
    trackFormSubmission,
    trackCTAClick,
    trackContactMethodClick,
    trackFAQInteraction,
    trackPageView
  };
}
