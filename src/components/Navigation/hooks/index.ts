/**
 * Navigation Hooks - Enterprise Edition
 * 
 * Centralized exports for all navigation-related custom hooks
 * 
 * @module NavigationHooks
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Enterprise Edition
 */

// Core navigation hooks
export { useNavigationAnalytics, default as useNavigationAnalyticsDefault } from './useNavigationAnalytics';
export { useNavigationPerformance, default as useNavigationPerformanceDefault } from './useNavigationPerformance';
export { useNavigationAccessibility, default as useNavigationAccessibilityDefault } from './useNavigationAccessibility';

// Hook types
export type {
  UseNavigationAnalytics,
  UseNavigationPerformance,
  UseNavigationAccessibility
} from '../types';

// Main navigation hook - now modular architecture
export { useNavigation } from './useNavigation';
