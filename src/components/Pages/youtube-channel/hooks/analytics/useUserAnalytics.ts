'use client';

import { useCallback } from 'react';

/**
 * User behavior analytics tracking
 * Handles user interactions, engagement, and conversion events
 */
export function useUserAnalytics() {
  // Track page view with enhanced data
  const trackPageView = useCallback((pagePath: string, pageTitle: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pagePath,
        page_title: pageTitle
      });
    }
  }, []);

  // Track user engagement events
  const trackEngagement = useCallback((action: string, category: string, label?: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  }, []);

  // Track CTA button clicks
  const trackCTAClick = useCallback((ctaType: string, location: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cta_click', {
        cta_type: ctaType,
        cta_location: location
      });
    }
  }, []);

  // Track subscription actions
  const trackSubscription = useCallback((action: 'subscribe' | 'unsubscribe') => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'subscription_action', {
        action: action,
        content_type: 'youtube_channel'
      });
    }
  }, []);

  // Track social sharing
  const trackSocialShare = useCallback((platform: string, contentType: string, contentId?: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: platform,
        content_type: contentType,
        content_id: contentId
      });
    }
  }, []);

  // Track form submissions
  const trackFormSubmission = useCallback((formType: string, success: boolean) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_submit', {
        form_type: formType,
        success: success
      });
    }
  }, []);

  return {
    trackPageView,
    trackEngagement,
    trackCTAClick,
    trackSubscription,
    trackSocialShare,
    trackFormSubmission
  };
}
