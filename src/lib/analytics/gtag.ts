/**
 * Google Analytics 4 (GA4) Integration
 * Type-safe analytics tracking for SmarterPayouts
 * 
 * @module GoogleAnalytics
 * @author SmarterPayouts Team
 * @since 2024
 */

// Google Analytics Measurement ID (set via environment variable)
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

/**
 * Check if Google Analytics is enabled
 */
export const isAnalyticsEnabled = (): boolean => {
  return !!GA_MEASUREMENT_ID && typeof window !== 'undefined' && 'gtag' in window;
};

/**
 * Page view tracking
 * Automatically called by Next.js router
 */
export const pageview = (url: string): void => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

/**
 * Custom event tracking
 */
interface GtagEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: GtagEvent): void => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// ============================================================================
// CONVERSION TRACKING EVENTS
// ============================================================================

/**
 * Track calculator usage
 */
export const trackCalculatorStart = (calculatorType: 'pricing' | 'lump-sum' | 'guaranteed' | 'lcp'): void => {
  event({
    action: 'calculator_started',
    category: 'Calculator',
    label: calculatorType,
  });
};

export const trackCalculatorComplete = (calculatorType: string, estimatedValue?: number): void => {
  event({
    action: 'calculator_completed',
    category: 'Calculator',
    label: calculatorType,
    value: estimatedValue,
  });
};

export const trackCalculatorStep = (calculatorType: string, step: number): void => {
  event({
    action: 'calculator_step',
    category: 'Calculator',
    label: `${calculatorType}_step_${step}`,
  });
};

/**
 * Track Mint AI interactions
 */
export const trackMintChatStart = (): void => {
  event({
    action: 'chat_started',
    category: 'Mint AI',
    label: 'chat_session_start',
  });
};

export const trackMintChatMessage = (messageCount: number): void => {
  event({
    action: 'chat_message_sent',
    category: 'Mint AI',
    label: 'user_message',
    value: messageCount,
  });
};

export const trackMintChatEnd = (duration: number): void => {
  event({
    action: 'chat_ended',
    category: 'Mint AI',
    label: 'chat_session_end',
    value: duration,
  });
};

/**
 * Track quote submissions
 */
export const trackQuoteRequest = (source: string): void => {
  event({
    action: 'quote_requested',
    category: 'Conversion',
    label: source,
  });
};

export const trackQuoteSubmitted = (estimatedValue?: number): void => {
  event({
    action: 'quote_submitted',
    category: 'Conversion',
    label: 'quote_form_completed',
    value: estimatedValue,
  });
};

/**
 * Track form interactions
 */
export const trackFormStart = (formName: string): void => {
  event({
    action: 'form_started',
    category: 'Form',
    label: formName,
  });
};

export const trackFormComplete = (formName: string): void => {
  event({
    action: 'form_completed',
    category: 'Form',
    label: formName,
  });
};

/**
 * Track content engagement
 */
export const trackContentView = (contentType: string, contentName: string): void => {
  event({
    action: 'content_viewed',
    category: 'Content',
    label: `${contentType}_${contentName}`,
  });
};

export const trackArticleRead = (articleTitle: string, readPercentage: number): void => {
  event({
    action: 'article_read',
    category: 'Content',
    label: articleTitle,
    value: readPercentage,
  });
};

/**
 * Track CTA clicks
 */
export const trackCTAClick = (ctaName: string, location: string): void => {
  event({
    action: 'cta_clicked',
    category: 'CTA',
    label: `${ctaName}_${location}`,
  });
};

/**
 * Track navigation
 */
export const trackNavigation = (destination: string, source: string): void => {
  event({
    action: 'navigation',
    category: 'Navigation',
    label: `${source}_to_${destination}`,
  });
};

/**
 * Track search
 */
export const trackSearch = (searchTerm: string, resultsCount?: number): void => {
  event({
    action: 'search',
    category: 'Search',
    label: searchTerm,
    value: resultsCount,
  });
};

/**
 * Track video interactions
 */
export const trackVideoPlay = (videoTitle: string): void => {
  event({
    action: 'video_play',
    category: 'Video',
    label: videoTitle,
  });
};

export const trackVideoComplete = (videoTitle: string, duration: number): void => {
  event({
    action: 'video_complete',
    category: 'Video',
    label: videoTitle,
    value: duration,
  });
};

/**
 * Track downloads
 */
export const trackDownload = (fileName: string, fileType: string): void => {
  event({
    action: 'download',
    category: 'Download',
    label: `${fileName}_${fileType}`,
  });
};

/**
 * Track outbound links
 */
export const trackOutboundLink = (url: string, label?: string): void => {
  event({
    action: 'outbound_link',
    category: 'Outbound',
    label: label || url,
  });
};

/**
 * Track errors
 */
export const trackError = (errorType: string, errorMessage: string): void => {
  event({
    action: 'error',
    category: 'Error',
    label: `${errorType}: ${errorMessage}`,
  });
};

/**
 * Track performance metrics
 */
export const trackPerformance = (metricName: string, value: number): void => {
  event({
    action: 'performance',
    category: 'Performance',
    label: metricName,
    value: Math.round(value),
  });
};

// ============================================================================
// TYPE DEFINITIONS FOR WINDOW.GTAG
// ============================================================================

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

