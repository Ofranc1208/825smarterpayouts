/**
 * Vercel Analytics Integration - Modular Structure
 * 
 * Modular Vercel Analytics services broken down into focused components.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

// Core components
export { VercelConnectionManager, vercelConnectionManager } from './core/VercelConnectionManager';
export { WebVitalsCollector, webVitalsCollector } from './core/WebVitalsCollector';

// Calculators
export { MetricsCalculator, metricsCalculator } from './calculators/MetricsCalculator';
export { PageDataCalculator, pageDataCalculator } from './calculators/PageDataCalculator';
export { VisitorDataCalculator, visitorDataCalculator } from './calculators/VisitorDataCalculator';

// Main service (orchestrator)
export { VercelService, vercelService } from './VercelService';

// For backward compatibility, export the main service with the old name
export { vercelService as vercelAnalyticsService } from './VercelService';
