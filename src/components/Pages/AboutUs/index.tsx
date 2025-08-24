/**
 * About Us Page Module - Enterprise Edition
 * 
 * Complete enterprise-grade about page implementation with:
 * - Comprehensive error boundaries and fault tolerance
 * - Performance monitoring and optimization
 * - Accessibility compliance (WCAG 2.1 AA)
 * - SEO optimization with structured data
 * - Analytics and user behavior tracking
 * - Security enhancements and CSP compliance
 * 
 * This module provides a production-ready, scalable solution
 * for enterprise applications with full monitoring and observability.
 * 
 * @module AboutUs
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Enterprise Edition
 */

// Main about page component (enterprise-ready)
export { default as AboutPage } from './AboutUsPage';
export { default } from './AboutUsPage';

// Individual section components (all enterprise-enhanced)
export {
  HeroSection as AboutHeroSection,
  TechnologySection as AboutTechnologySection,
  CompanyStorySection as AboutCompanyStorySection,
  RecognitionSection as AboutRecognitionSection,
  ValuesSection as AboutValuesSection,
  CTASection as AboutCTASection,
  ErrorBoundary as AboutUsErrorBoundary
} from './components';

// SEO utilities (server-safe)
export { 
  generateAboutUsMetadata, 
  generateOrganizationStructuredData,
  generateBreadcrumbStructuredData,
  generateFAQStructuredData,
  getSecurityHeaders,
  getPerformanceHints
} from './utils/seo';

// Note: Client-side hooks and analytics are available for direct import:
// import { useIntersectionObserver } from './hooks/useIntersectionObserver';
// import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';
// import { useAccessibilityPreferences } from './hooks/useAccessibility';
// import { aboutUsAnalytics } from './utils/analytics';

// TypeScript types for enterprise integration
export type * from './types';
