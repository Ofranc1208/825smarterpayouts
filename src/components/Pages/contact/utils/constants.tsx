'use client';

export const CONTACT_CONSTANTS = {
  PHONE: '+1-561-583-1280',
  EMAIL: 'info@smarterpayouts.com',
  BUSINESS_HOURS: {
    WEEKDAYS: 'Monday - Friday',
    HOURS: '9:00 AM - 6:00 PM',
    TIMEZONE: 'EST'
  },
  RESPONSE_TIME: '24 hours',
  COMPANY_NAME: 'SmarterPayouts',
  ADDRESS: {
    STREET: '15257 Amberly Dr Ste 233',
    CITY: 'Tampa',
    STATE: 'FL',
    ZIP: '33647',
    COUNTRY: 'US'
  }
} as const;

export const FORM_LIMITS = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  SUBJECT_MIN_LENGTH: 5,
  SUBJECT_MAX_LENGTH: 200,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 2000,
  EMAIL_MAX_LENGTH: 254
} as const;

export const ANALYTICS_EVENTS = {
  FORM_SUBMIT_SUCCESS: 'form_submit_success',
  FORM_SUBMIT_ERROR: 'form_submit_error',
  CTA_CLICK: 'cta_click',
  CONTACT_METHOD_CLICK: 'contact_method_click',
  FAQ_EXPAND: 'faq_expand',
  PAGE_VIEW: 'page_view'
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.'
} as const;

export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Thank you! Your message has been sent successfully.',
  RESPONSE_TIME: 'We\'ll respond within 24 hours during business days.'
} as const;
