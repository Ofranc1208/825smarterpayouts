// Core event tracking utilities
import type { AnalyticsEvent } from '../../types/analyticsTypes';

// Enhanced event tracking with custom parameters
export const trackEvent = (
  eventName: string,
  category: string,
  action: string,
  label?: string,
  value?: number,
  customParams?: Record<string, any>
): void => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: category,
      event_label: label,
      value: value,
      ...customParams
    });
  }
  
  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'CustomEvent', {
      event_name: eventName,
      event_category: category,
      event_action: action,
      ...customParams
    });
  }
  
  // Custom analytics logging
  console.log('📊 Analytics Event:', {
    event: eventName,
    category,
    action,
    label,
    value,
    ...customParams,
    timestamp: new Date().toISOString()
  });
};

// Track error events
export const trackError = (
  errorType: string,
  errorMessage: string,
  errorLocation: string,
  severity: 'low' | 'medium' | 'high' = 'medium'
): void => {
  trackEvent(
    'error',
    'error',
    errorType,
    errorLocation,
    undefined,
    {
      error_type: errorType,
      error_message: errorMessage.substring(0, 100),
      error_location: errorLocation,
      error_severity: severity,
      user_agent: navigator.userAgent,
      page_location: window.location.href
    }
  );
  
  console.error('🚨 Tracked Error:', {
    type: errorType,
    message: errorMessage,
    location: errorLocation,
    severity: severity
  });
};
