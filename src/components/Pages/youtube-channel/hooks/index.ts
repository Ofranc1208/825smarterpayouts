/**
 * Hooks Module - YouTube Channel Enterprise Edition
 * 
 * Exports all enterprise-grade hooks for the YouTube Channel page.
 * Provides performance monitoring, accessibility features, and analytics tracking.
 * 
 * ## Available Hooks
 * - **usePerformanceMonitor**: Core Web Vitals and performance tracking
 * - **useAccessibility**: WCAG 2.1 AA compliance and accessibility features
 * - **useAnalytics**: Comprehensive user behavior and conversion tracking
 * 
 * ## Usage
 * ```tsx
 * import { usePerformanceMonitor, useAccessibility, useAnalytics } from './hooks';
 * 
 * function YouTubeChannelPage() {
 *   const { metrics } = usePerformanceMonitor();
 *   const { announce } = useAccessibility();
 *   const { trackEvent } = useAnalytics();
 *   
 *   // Component logic...
 * }
 * ```
 * 
 * @module Hooks
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Enterprise Edition
 */

export { usePerformanceMonitor } from './usePerformanceMonitor';
export { useAccessibility } from './useAccessibility';
export { useAnalytics } from './useAnalytics';
