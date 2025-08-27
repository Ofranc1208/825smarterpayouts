/**
 * Navigation TypeScript Definitions - Enterprise Edition
 * 
 * Comprehensive type definitions for the enterprise-grade navigation system
 * with Vercel Analytics integration and performance monitoring.
 * 
 * @module NavigationTypes
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Enterprise Edition
 */

// Core Navigation Types
export interface NavigationItem {
  href: string;
  label: string;
  icon?: string;
  description?: string;
  isExternal?: boolean;
  requiresAuth?: boolean;
  badge?: string;
  analyticsId?: string;
}

export interface DropdownSection {
  [key: string]: NavigationItem[];
}

export interface NavigationConfig {
  mainNavLinks: NavigationItem[];
  dropdownSections: DropdownSection;
  branding: BrandingConfig;
  analytics: AnalyticsConfig;
}

// Branding Configuration
export interface BrandingConfig {
  logoSrc: string;
  logoAlt: string;
  companyName: string;
  homeUrl: string;
  logoWidth?: number;
  logoHeight?: number;
}

// Analytics Configuration
export interface AnalyticsConfig {
  enableVercelAnalytics: boolean;
  enableCustomEvents: boolean;
  enablePerformanceTracking: boolean;
  enableAccessibilityTracking: boolean;
  trackingPrefix: string;
}

// Navigation State Management
export interface NavigationState {
  isMobile: boolean;
  isMenuOpen: boolean;
  activeDropdown: string | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

// Navigation Analytics Events
export interface NavigationAnalyticsEvent {
  eventType: 'click' | 'hover' | 'focus' | 'scroll' | 'error';
  elementType: 'logo' | 'nav_item' | 'dropdown' | 'mobile_menu' | 'hamburger';
  elementId: string;
  elementLabel: string;
  timestamp: number;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
}

// Performance Metrics
export interface NavigationPerformanceMetrics {
  renderTime: number;
  interactionTime: number;
  dropdownOpenTime: number;
  mobileMenuToggleTime: number;
  memoryUsage?: number;
  errorCount: number;
  accessibilityScore?: number;
}

// Accessibility Configuration
export interface AccessibilityConfig {
  enableScreenReader: boolean;
  enableKeyboardNavigation: boolean;
  enableFocusManagement: boolean;
  enableAriaLabels: boolean;
  announceNavigation: boolean;
  skipToContentEnabled: boolean;
}

// SEO Configuration
export interface SEOConfig {
  enableBreadcrumbs: boolean;
  enableStructuredData: boolean;
  canonicalBaseUrl: string;
  siteName: string;
  enableSitemapGeneration: boolean;
}

// Error Handling
export interface NavigationError {
  code: string;
  message: string;
  timestamp: number;
  component: string;
  stack?: string;
  userAgent?: string;
  url?: string;
}

// Hook Return Types
export interface UseNavigationAnalytics {
  trackNavClick: (item: NavigationItem, context?: string) => void;
  trackDropdownOpen: (sectionName: string) => void;
  trackDropdownClose: (sectionName: string) => void;
  trackMobileMenuToggle: (isOpen: boolean) => void;
  trackNavigationError: (error: NavigationError) => void;
  trackPerformanceMetric: (metric: keyof NavigationPerformanceMetrics, value: number) => void;
  getAnalyticsSummary?: () => any;
}

export interface UseNavigationPerformance {
  metrics: NavigationPerformanceMetrics;
  startTimer: (operation: string) => () => void;
  recordMetric: (metric: keyof NavigationPerformanceMetrics, value: number) => void;
  getAverageMetrics: () => NavigationPerformanceMetrics;
  resetMetrics: () => void;
  getPerformanceScore?: () => number;
  getPerformanceRecommendations?: () => string[];
}

export interface UseNavigationAccessibility {
  announceToScreenReader: (message: string) => void;
  manageFocus: (elementId: string) => void;
  enableKeyboardShortcuts: () => () => void;
  validateAccessibility: () => Promise<number>;
  getAccessibilityReport: () => AccessibilityReport;
}

export interface AccessibilityReport {
  score: number;
  issues: AccessibilityIssue[];
  recommendations: string[];
  compliance: 'AA' | 'A' | 'Non-compliant';
  lastAudit?: Date | null;
}

export interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info';
  element: string;
  description: string;
  recommendation: string;
  wcagReference: string;
}

// Component Props
export interface DualNavbarProps {
  className?: string;
  style?: React.CSSProperties;
  config?: Partial<NavigationConfig>;
  onNavigationClick?: (item: NavigationItem) => void;
  onError?: (error: NavigationError) => void;
}

export interface DesktopNavProps {
  isMobile: boolean;
  config?: NavigationConfig;
  onItemClick?: (item: NavigationItem) => void;
  onDropdownToggle?: (sectionName: string, isOpen: boolean) => void;
}

export interface MobileNavProps {
  isMobile: boolean;
  config?: NavigationConfig;
  onItemClick?: (item: NavigationItem) => void;
  onMenuToggle?: (isOpen: boolean) => void;
}

export interface NavigationItemProps {
  item: NavigationItem;
  isActive?: boolean;
  onClick?: (item: NavigationItem) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface DropdownMenuProps {
  sections: DropdownSection;
  isOpen: boolean;
  onClose: () => void;
  onItemClick?: (item: NavigationItem) => void;
  position?: 'left' | 'center' | 'right';
}

// Vercel Analytics Integration
export interface VercelAnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
}

export interface VercelAnalyticsConfig {
  beforeSend?: (event: VercelAnalyticsEvent) => VercelAnalyticsEvent | null;
  debug?: boolean;
  mode?: 'auto' | 'production' | 'development';
}

// Performance Dashboard Integration
export interface NavigationDashboardMetrics {
  totalClicks: number;
  popularItems: Array<{ item: string; clicks: number }>;
  averageInteractionTime: number;
  errorRate: number;
  mobileUsagePercentage: number;
  accessibilityScore: number;
  performanceScore: number;
  lastUpdated: number;
}

// Testing Types
export interface NavigationTestConfig {
  enableE2ETesting: boolean;
  enableUnitTesting: boolean;
  enableAccessibilityTesting: boolean;
  enablePerformanceTesting: boolean;
  testDataAttributes: boolean;
}

export interface NavigationTestHelpers {
  getNavigationElement: (testId: string) => HTMLElement | null;
  simulateClick: (element: HTMLElement) => void;
  simulateKeyPress: (element: HTMLElement, key: string) => void;
  measurePerformance: (operation: () => void) => number;
  validateAccessibility: (element: HTMLElement) => Promise<AccessibilityReport>;
}

// Context Types
export interface NavigationContextValue {
  state: NavigationState;
  config: NavigationConfig;
  analytics: UseNavigationAnalytics;
  performance: UseNavigationPerformance;
  accessibility: UseNavigationAccessibility;
  updateState: (updates: Partial<NavigationState>) => void;
  updateConfig: (updates: Partial<NavigationConfig>) => void;
}

// All types are already exported above with their definitions
// No need for additional export declarations
