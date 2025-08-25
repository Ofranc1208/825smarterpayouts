'use client';

import { useCallback, useEffect } from 'react';
import type {
  PageViewEvent,
  CTAClickEvent,
  SectionViewEvent,
  FAQInteractionEvent,
  ProcessStepEvent,
  MintAIInteractionEvent,
  ConversionEvent
} from '../types/analyticsTypes';

export function useCourtApprovalAnalytics() {
  // Track page view
  const trackPageView = useCallback(() => {
    const event: PageViewEvent = {
      event: 'page_view',
      category: 'court_approval',
      action: 'page_load',
      page_title: 'Court Approval Process - Structured Settlement',
      page_location: window.location.href,
      user_engagement: Date.now()
    };
    
    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.event, {
        event_category: event.category,
        event_label: event.page_title,
        page_title: event.page_title,
        page_location: event.page_location
      });
    }
    
    console.log('📊 Court Approval Page View:', event);
  }, []);

  // Track CTA clicks
  const trackCTAClick = useCallback((
    ctaType: 'primary' | 'secondary' | 'hero' | 'final',
    ctaText: string,
    section: string,
    ctaPosition: string
  ) => {
    const event: CTAClickEvent = {
      event: 'cta_click',
      category: 'engagement',
      action: 'click',
      cta_type: ctaType,
      cta_text: ctaText,
      cta_position: ctaPosition,
      section: section
    };
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: `${section}_${ctaType}`,
        cta_text: ctaText,
        cta_position: ctaPosition
      });
    }
    
    console.log('🎯 CTA Click:', event);
  }, []);

  // Track section views
  const trackSectionView = useCallback((sectionName: string, scrollDepth: number) => {
    const event: SectionViewEvent = {
      event: 'section_view',
      category: 'engagement',
      action: 'view',
      section_name: sectionName,
      scroll_depth: scrollDepth
    };
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'section_view', {
        event_category: 'engagement',
        event_label: sectionName,
        scroll_depth: scrollDepth
      });
    }
    
    console.log('👁️ Section View:', event);
  }, []);

  // Track FAQ interactions
  const trackFAQInteraction = useCallback((
    faqId: string,
    question: string,
    interactionType: 'open' | 'close' | 'view'
  ) => {
    const event: FAQInteractionEvent = {
      event: 'faq_interaction',
      category: 'engagement',
      action: interactionType,
      faq_question: question,
      faq_id: faqId,
      interaction_type: interactionType
    };
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'faq_interaction', {
        event_category: 'engagement',
        event_label: `faq_${interactionType}`,
        faq_id: faqId
      });
    }
    
    console.log('❓ FAQ Interaction:', event);
  }, []);

  // Track process step views
  const trackProcessStepView = useCallback((stepNumber: number, stepTitle: string) => {
    const event: ProcessStepEvent = {
      event: 'process_step_view',
      category: 'education',
      action: 'view',
      step_number: stepNumber,
      step_title: stepTitle
    };
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'process_step_view', {
        event_category: 'education',
        event_label: `step_${stepNumber}`,
        step_title: stepTitle
      });
    }
    
    console.log('📋 Process Step View:', event);
  }, []);

  // Track Mint AI interactions
  const trackMintAIInteraction = useCallback((
    interactionType: 'feature_view' | 'cta_click' | 'chat_initiate',
    featureName?: string
  ) => {
    const event: MintAIInteractionEvent = {
      event: 'mint_ai_interaction',
      category: 'ai_engagement',
      action: interactionType,
      interaction_type: interactionType,
      feature_name: featureName
    };
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'mint_ai_interaction', {
        event_category: 'ai_engagement',
        event_label: interactionType,
        feature_name: featureName
      });
    }
    
    console.log('🤖 Mint AI Interaction:', event);
  }, []);

  // Track conversions
  const trackConversion = useCallback((
    conversionType: 'quote_request' | 'chat_started' | 'form_submitted',
    funnelStep: string,
    value?: number
  ) => {
    const event: ConversionEvent = {
      event: 'conversion',
      category: 'business',
      action: conversionType,
      conversion_type: conversionType,
      conversion_value: value,
      funnel_step: funnelStep
    };
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        event_category: 'business',
        event_label: conversionType,
        value: value,
        funnel_step: funnelStep
      });
    }
    
    console.log('💰 Conversion:', event);
  }, []);

  return {
    trackPageView,
    trackCTAClick,
    trackSectionView,
    trackFAQInteraction,
    trackProcessStepView,
    trackMintAIInteraction,
    trackConversion
  };
}
