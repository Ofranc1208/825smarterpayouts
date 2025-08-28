'use client';

import { useCallback } from 'react';
import { AnalyticsEvent, UseSettlementLawAnalyticsReturn } from '../types';

/**
 * Settlement Law Analytics Hook
 * Following enterprise patterns from Home and CourtApproval pages
 * 
 * Tracks user interactions and engagement on the Settlement Law Federal page
 */
export default function useSettlementLawAnalytics(): UseSettlementLawAnalyticsReturn {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Google Analytics 4 tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        page_title: 'Settlement Law Federal',
        page_location: window.location.href
      });
    }

    // Vercel Analytics tracking
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', event.action, {
        category: event.category,
        label: event.label,
        value: event.value
      });
    }

    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Settlement Law Analytics:', event);
    }
  }, []);

  const trackPageView = useCallback(() => {
    trackEvent({
      action: 'page_view',
      category: 'Settlement Law Federal',
      label: 'Federal Law Page View'
    });
  }, [trackEvent]);

  const trackHeroCTAClick = useCallback((buttonType: 'primary' | 'secondary') => {
    trackEvent({
      action: 'cta_click',
      category: 'Settlement Law Federal',
      label: `Hero ${buttonType === 'primary' ? 'Get Quote' : 'Chat Mint'} Button`,
      value: buttonType === 'primary' ? 10 : 5
    });
  }, [trackEvent]);

  const trackSectionView = useCallback((sectionName: string) => {
    trackEvent({
      action: 'section_view',
      category: 'Settlement Law Federal',
      label: `${sectionName} Section Viewed`
    });
  }, [trackEvent]);

  const trackLegalLinkClick = useCallback((linkTitle: string, linkUrl: string, linkType: 'internal' | 'external') => {
    trackEvent({
      action: 'link_click',
      category: 'Settlement Law Federal',
      label: `${linkType} Link: ${linkTitle}`,
      value: linkType === 'external' ? 3 : 1
    });

    // Track external link clicks separately for compliance
    if (linkType === 'external') {
      trackEvent({
        action: 'external_link_click',
        category: 'Legal Resources',
        label: linkUrl
      });
    }
  }, [trackEvent]);

  const trackResourceDownload = useCallback((resourceTitle: string, resourceType: string) => {
    trackEvent({
      action: 'resource_download',
      category: 'Settlement Law Federal',
      label: `${resourceType}: ${resourceTitle}`,
      value: 5
    });
  }, [trackEvent]);

  const trackScrollDepth = useCallback((depth: number) => {
    trackEvent({
      action: 'scroll_depth',
      category: 'Settlement Law Federal',
      label: `${depth}% Scroll Depth`,
      value: depth
    });
  }, [trackEvent]);

  const trackFinalCTAClick = useCallback((buttonType: 'primary' | 'secondary') => {
    trackEvent({
      action: 'final_cta_click',
      category: 'Settlement Law Federal',
      label: `Final ${buttonType === 'primary' ? 'Get Quote' : 'Chat Mint'} Button`,
      value: buttonType === 'primary' ? 15 : 8
    });
  }, [trackEvent]);

  const trackDisclaimerView = useCallback(() => {
    trackEvent({
      action: 'disclaimer_view',
      category: 'Settlement Law Federal',
      label: 'Legal Disclaimer Viewed'
    });
  }, [trackEvent]);

  const trackFederalLawExpand = useCallback((lawTitle: string) => {
    trackEvent({
      action: 'law_expand',
      category: 'Settlement Law Federal',
      label: `Federal Law Expanded: ${lawTitle}`,
      value: 2
    });
  }, [trackEvent]);

  const trackCourtProcessStep = useCallback((stepNumber: number, stepTitle: string) => {
    trackEvent({
      action: 'court_process_step',
      category: 'Settlement Law Federal',
      label: `Step ${stepNumber}: ${stepTitle}`,
      value: stepNumber
    });
  }, [trackEvent]);

  const trackTaxImplicationView = useCallback((category: string) => {
    trackEvent({
      action: 'tax_implication_view',
      category: 'Settlement Law Federal',
      label: `Tax Category: ${category}`,
      value: 1
    });
  }, [trackEvent]);

  return {
    trackPageView,
    trackHeroCTAClick,
    trackSectionView,
    trackLegalLinkClick,
    trackResourceDownload,
    trackScrollDepth,
    trackFinalCTAClick,
    trackDisclaimerView,
    trackFederalLawExpand,
    trackCourtProcessStep,
    trackTaxImplicationView
  };
}
