// Settlement Law Federal - Constants
// Following enterprise patterns - centralized configuration constants

/**
 * Page Configuration Constants
 */
export const PAGE_CONFIG = {
  name: 'Settlement Law Federal',
  slug: 'settlement-law-federal',
  path: '/structured-settlement-laws',
  maxWidth: '900px',
  padding: '48px 0',
  background: '#f9fafb'
} as const;

/**
 * Analytics Configuration
 */
export const ANALYTICS_CONFIG = {
  category: 'Settlement Law Federal',
  events: {
    pageView: 'settlement_law_federal_view',
    sectionView: 'settlement_law_section_view',
    linkClick: 'settlement_law_link_click',
    downloadClick: 'settlement_law_download',
    ctaClick: 'settlement_law_cta_click',
    errorOccurred: 'settlement_law_error'
  },
  goals: {
    pageEngagement: 'settlement_law_engagement',
    contentCompletion: 'settlement_law_completion',
    resourceAccess: 'settlement_law_resource_access'
  }
} as const;

/**
 * Performance Thresholds
 */
export const PERFORMANCE_THRESHOLDS = {
  // Core Web Vitals targets
  lcp: 2500, // Largest Contentful Paint (ms)
  fid: 100,  // First Input Delay (ms)
  cls: 0.1,  // Cumulative Layout Shift
  fcp: 1800, // First Contentful Paint (ms)
  ttfb: 600, // Time to First Byte (ms)
  
  // Custom metrics
  pageLoadTime: 3000,
  domContentLoaded: 1500,
  interactionReady: 2000,
  
  // Performance scoring
  excellent: 90,
  good: 75,
  needsImprovement: 50
} as const;

/**
 * Accessibility Configuration
 */
export const ACCESSIBILITY_CONFIG = {
  announcements: {
    pageLoad: 'Settlement Law Federal page loaded. Navigate through sections using Tab key or Alt+1 for main content.',
    sectionChange: 'Navigated to {section} section',
    errorOccurred: 'An error occurred. Please try again or contact support.',
    actionCompleted: '{action} completed successfully'
  },
  shortcuts: {
    mainContent: 'Alt+1',
    navigation: 'Alt+2',
    search: 'Alt+3',
    help: 'Alt+H'
  },
  targets: {
    minScore: 80,
    excellentScore: 95,
    maxIssues: 5
  }
} as const;

/**
 * SEO Configuration
 */
export const SEO_CONFIG = {
  title: 'Structured Settlement Federal Law | SmarterPayouts',
  description: 'Learn about the key federal laws, tax rules, and court approval process governing structured settlements in the United States.',
  keywords: [
    'structured settlement federal law',
    'periodic payment settlement act',
    'structured settlement protection act',
    'federal tax implications',
    'court approval process',
    'IRC Section 104',
    'structured settlement regulations'
  ],
  openGraph: {
    type: 'article',
    locale: 'en_US',
    siteName: 'SmarterPayouts'
  },
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'LegalArticle',
    publisher: {
      '@type': 'Organization',
      name: 'SmarterPayouts',
      url: 'https://smarterpayouts.com'
    }
  }
} as const;

/**
 * Error Handling Configuration
 */
export const ERROR_CONFIG = {
  retryAttempts: 3,
  retryDelay: 1000,
  timeout: 10000,
  
  errorTypes: {
    network: 'NETWORK_ERROR',
    validation: 'VALIDATION_ERROR',
    permission: 'PERMISSION_ERROR',
    notFound: 'NOT_FOUND_ERROR',
    server: 'SERVER_ERROR',
    client: 'CLIENT_ERROR'
  },
  
  fallbackMessages: {
    generic: 'Something went wrong. Please try again.',
    network: 'Network connection issue. Please check your internet connection.',
    timeout: 'Request timed out. Please try again.',
    notFound: 'The requested resource was not found.',
    permission: 'You do not have permission to access this resource.'
  }
} as const;

/**
 * Legal Content Configuration
 */
export const LEGAL_CONFIG = {
  sections: {
    hero: 'Hero Section',
    disclaimer: 'Legal Disclaimer',
    federalLaws: 'Federal Laws',
    courtApproval: 'Court Approval Process',
    taxImplications: 'Tax Implications',
    references: 'Legal References',
    resources: 'Additional Resources',
    finalCTA: 'Final Call-to-Action'
  },
  
  laws: {
    periodicPaymentAct: {
      name: 'Periodic Payment Settlement Act',
      year: '1982',
      code: 'Public Law 97-473'
    },
    protectionAct: {
      name: 'Structured Settlement Protection Act',
      year: '2002',
      code: 'Public Law 107-134'
    },
    terrorismReliefAct: {
      name: 'Terrorism Risk Insurance Act',
      year: '2002',
      code: 'Public Law 107-297'
    }
  },
  
  taxCodes: {
    section104: 'IRC Section 104(a)(2)',
    section130: 'IRC Section 130',
    section461: 'IRC Section 461(h)'
  }
} as const;

/**
 * UI Configuration
 */
export const UI_CONFIG = {
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px'
  },
  
  colors: {
    primary: '#059669',
    secondary: '#dc2626',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      muted: '#9ca3af'
    },
    
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      muted: '#f3f4f6'
    }
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem'
  }
} as const;

/**
 * Contact Information
 */
export const CONTACT_CONFIG = {
  phone: '(855) 582-3506',
  email: 'support@smarterpayouts.com',
  website: 'https://smarterpayouts.com',
  
  support: {
    hours: 'Monday - Friday, 9 AM - 6 PM EST',
    emergency: 'Available 24/7 for urgent matters',
    response: 'Typically respond within 2 hours'
  }
} as const;

/**
 * Feature Flags
 */
export const FEATURE_FLAGS = {
  enableAnalytics: true,
  enablePerformanceMonitoring: true,
  enableAccessibilityValidation: true,
  enableErrorReporting: true,
  enableLazyLoading: true,
  enableWebVitals: true,
  enableIntersectionObserver: true,
  
  // Development flags
  enableDebugMode: process.env.NODE_ENV === 'development',
  enableVerboseLogging: process.env.NODE_ENV === 'development',
  enablePerformanceProfiling: process.env.NODE_ENV === 'development'
} as const;

/**
 * Type exports for TypeScript support
 */
export type PageConfig = typeof PAGE_CONFIG;
export type AnalyticsConfig = typeof ANALYTICS_CONFIG;
export type PerformanceThresholds = typeof PERFORMANCE_THRESHOLDS;
export type AccessibilityConfig = typeof ACCESSIBILITY_CONFIG;
export type SEOConfig = typeof SEO_CONFIG;
export type ErrorConfig = typeof ERROR_CONFIG;
export type LegalConfig = typeof LEGAL_CONFIG;
export type UIConfig = typeof UI_CONFIG;
export type ContactConfig = typeof CONTACT_CONFIG;
export type FeatureFlags = typeof FEATURE_FLAGS;
