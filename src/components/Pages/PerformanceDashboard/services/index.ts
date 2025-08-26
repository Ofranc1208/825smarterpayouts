/**
 * Performance Dashboard Services
 * 
 * Modular analytics and performance monitoring services.
 * Each service handles a specific aspect of performance tracking.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main orchestrator (replaces the monolithic AnalyticsService)
export { AnalyticsOrchestrator, analyticsOrchestrator } from './AnalyticsOrchestrator';

// Individual services
export * from './webVitals';
export * from './visitor';
export * from './performance';
export * from './system';

// Types
export * from './types';

// For backward compatibility, export the orchestrator as analyticsService
export { analyticsOrchestrator as analyticsService } from './AnalyticsOrchestrator';
