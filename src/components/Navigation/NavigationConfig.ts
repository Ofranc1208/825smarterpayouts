/**
 * Navigation Configuration - Enterprise Features
 * 
 * Control which enterprise features are enabled/disabled
 * Use environment variables or build-time configuration
 * 
 * @module NavigationConfig
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Enterprise Edition
 */

export interface NavigationConfig {
  // Core features (always enabled)
  enableDesktop: boolean;
  enableMobile: boolean;
  
  // Enterprise features (configurable)
  enableI18n: boolean;
  enableSecurity: boolean;
  enableSEO: boolean;
  enableAnalytics: boolean;
  enablePerformance: boolean;
  enableAccessibility: boolean;
  enableDashboardIntegration: boolean;
  
  // Feature-specific config
  i18n: {
    defaultLanguage: string;
    supportedLanguages: string[];
    enableRTL: boolean;
  };
  
  security: {
    enableCSPReporting: boolean;
    enableXSSProtection: boolean;
    enableSecureLinks: boolean;
    trustedDomains: string[];
  };
  
  seo: {
    enableBreadcrumbs: boolean;
    enableMetaTags: boolean;
    enableStructuredData: boolean;
  };
  
  performance: {
    enableWebVitals: boolean;
    enableMemoryTracking: boolean;
    enableMetricsCollection: boolean;
  };
  
  // Responsive breakpoint (in pixels)
  mobileBreakpoint: number;
}

/**
 * Default Navigation Configuration
 * 
 * Enterprise features are disabled by default and can be enabled
 * via environment variables for production use.
 */
export const defaultNavigationConfig: NavigationConfig = {
  // Core features (always enabled)
  enableDesktop: true,
  enableMobile: true,
  
  // Enterprise features (disabled by default, enable as needed)
  enableI18n: process.env.NEXT_PUBLIC_ENABLE_NAV_I18N === 'true',
  enableSecurity: process.env.NEXT_PUBLIC_ENABLE_NAV_SECURITY === 'true',
  enableSEO: process.env.NEXT_PUBLIC_ENABLE_NAV_SEO === 'true',
  enableAnalytics: true, // Always enabled for insights
  enablePerformance: true, // Always enabled for monitoring
  enableAccessibility: true, // Always enabled for compliance
  enableDashboardIntegration: process.env.NEXT_PUBLIC_ENABLE_NAV_DASHBOARD === 'true',
  
  // Feature-specific config
  i18n: {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar', 'he', 'ru'],
    enableRTL: true,
  },
  
  security: {
    enableCSPReporting: true,
    enableXSSProtection: true,
    enableSecureLinks: true,
    trustedDomains: ['smarterpayouts.com', 'vercel.app', 'localhost'],
  },
  
  seo: {
    enableBreadcrumbs: true,
    enableMetaTags: true,
    enableStructuredData: true,
  },
  
  performance: {
    enableWebVitals: true,
    enableMemoryTracking: process.env.NODE_ENV === 'development',
    enableMetricsCollection: true,
  },
  
  // Responsive breakpoint (768px is standard tablet/mobile breakpoint)
  mobileBreakpoint: 768,
};

/**
 * Get current navigation configuration
 * 
 * @returns {NavigationConfig} Current navigation configuration
 */
export function getNavigationConfig(): NavigationConfig {
  return defaultNavigationConfig;
}

/**
 * Check if a specific enterprise feature is enabled
 * 
 * @param {keyof NavigationConfig} feature - Feature name to check
 * @returns {boolean} Whether the feature is enabled
 */
export function isFeatureEnabled(feature: keyof NavigationConfig): boolean {
  const config = getNavigationConfig();
  return config[feature] === true;
}

/**
 * Get feature-specific configuration
 * 
 * @param {'i18n' | 'security' | 'seo' | 'performance'} feature - Feature name
 * @returns {object} Feature configuration
 */
export function getFeatureConfig(
  feature: 'i18n' | 'security' | 'seo' | 'performance'
): NavigationConfig['i18n'] | NavigationConfig['security'] | NavigationConfig['seo'] | NavigationConfig['performance'] {
  const config = getNavigationConfig();
  return config[feature];
}

// Export singleton configuration
export default defaultNavigationConfig;

