/**
 * Navigation Hooks - Optimized Edition
 *
 * Lazy-loadable navigation hooks for optimal bundle size
 * Only load hooks when explicitly needed for advanced features
 *
 * @module NavigationHooks
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Optimized Edition
 */

// Lazy-loaded hook factories - reduces bundle size
export const createNavigationAnalytics = () => import('./useNavigationAnalytics').then(m => m.useNavigationAnalytics);
export const createNavigationPerformance = () => import('./useNavigationPerformance').then(m => m.useNavigationPerformance);
export const createNavigationAccessibility = () => import('./useNavigationAccessibility').then(m => m.useNavigationAccessibility);

// Hook types (still exported for TypeScript)
export type {
  UseNavigationAnalytics,
  UseNavigationPerformance,
  UseNavigationAccessibility
} from '../types';

// Core navigation hook (always needed for basic functionality)
export { useNavigation } from './useNavigation';
