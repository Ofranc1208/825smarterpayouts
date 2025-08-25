// Conversion tracking utilities
import { trackEvent } from './eventTracking';

// Track conversion events with enhanced data
export const trackConversion = (
  conversionType: string,
  value?: number,
  currency: string = 'USD',
  transactionId?: string
): void => {
  const conversionData = {
    event_category: 'conversion',
    event_action: conversionType,
    value: value,
    currency: currency,
    transaction_id: transactionId,
    page_location: window.location.href,
    page_title: document.title
  };
  
  // Google Analytics 4 Enhanced Ecommerce
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', conversionData);
    
    // Also track as purchase if value is provided
    if (value) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId || `court-approval-${Date.now()}`,
        value: value,
        currency: currency,
        items: [{
          item_id: 'court-approval-service',
          item_name: 'Court Approval Service',
          category: 'Legal Services',
          quantity: 1,
          price: value
        }]
      });
    }
  }
  
  // Facebook Pixel Conversion
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: currency,
      content_type: 'service',
      content_name: 'Court Approval Service'
    });
  }
  
  console.log('💰 Conversion Tracked:', conversionData);
};
