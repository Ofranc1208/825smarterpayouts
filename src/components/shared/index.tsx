/**
 * Shared Components Library - Enterprise Grade
 * 
 * Central export hub for all reusable components across the SmarterPayouts application.
 * This library provides consistent UI components that can be shared between pages
 * to improve maintainability and reduce duplication.
 * 
 * @module SharedComponents
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Button Components
export { default as Button } from './Button/Button';
export type { ButtonProps } from './Button/Button';

// Image Components
export { OptimizedImage } from './OptimizedImage';

// Performance Components
export { default as PerformanceDashboard } from './PerformanceDashboard/PerformanceDashboard';