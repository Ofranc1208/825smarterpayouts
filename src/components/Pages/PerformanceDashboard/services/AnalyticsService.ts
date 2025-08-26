/**
 * @deprecated This file has been replaced by the modular service architecture
 * 
 * The monolithic AnalyticsService has been broken down into focused services:
 * - WebVitalsService: Handles Core Web Vitals tracking
 * - VisitorTrackingService: Manages visitor and page view analytics  
 * - PerformanceService: Browser performance metrics
 * - SystemHealthService: System health monitoring
 * - AnalyticsOrchestrator: Coordinates all services
 * 
 * Please import from './services/index.ts' instead
 */

// Re-export the new modular services for backward compatibility
export { analyticsOrchestrator as analyticsService } from './AnalyticsOrchestrator';
export * from './types';