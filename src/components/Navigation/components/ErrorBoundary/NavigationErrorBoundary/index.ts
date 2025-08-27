/**
 * Navigation Error Boundary - Enterprise Edition
 * 
 * Modular error boundary system for navigation components
 * 
 * @module NavigationErrorBoundary
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Modular Edition
 */

// Main orchestrator
export { NavigationErrorBoundaryOrchestrator as NavigationErrorBoundary } from './NavigationErrorBoundaryOrchestrator';

// Services and utilities
export { ErrorReportingService, defaultErrorReporter } from './ErrorReportingService';
export { RetryHandler } from './RetryHandler';

// UI components
export { ErrorFallbackUI } from './ErrorFallbackUI';

// Types
export type { ErrorReportingOptions } from './ErrorReportingService';
export type { RetryOptions, RetryState } from './RetryHandler';
export type { ErrorFallbackUIProps } from './ErrorFallbackUI';

// Default export
export { NavigationErrorBoundaryOrchestrator as default } from './NavigationErrorBoundaryOrchestrator';
