/**
 * Navigation Perfection Suite - Modular System Exports
 * 
 * Centralized exports for the modular Navigation Perfection Suite.
 * Provides both individual modules and the main orchestrator.
 * 
 * @module NavigationPerfectionSuiteIndex
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Modular Edition
 */

// Main orchestrator (recommended for most use cases)
export { NavigationPerfectionOrchestrator } from './NavigationPerfectionOrchestrator';
export { NavigationPerfectionOrchestrator as NavigationPerfectionSuite } from './NavigationPerfectionOrchestrator';

// Individual modules (for advanced customization)
export { ConfigurationManager } from './ConfigurationManager';
export { ComponentInitializer } from './ComponentInitializer';
export { MetricsCollector } from './MetricsCollector';
export { ReportGenerator } from './ReportGenerator';
export { MonitoringManager } from './MonitoringManager';

// Types
export type {
  PerfectionConfig,
  PerfectionMetrics,
  PerfectionReport,
  ComponentInstances,
  ScoreWeights
} from './types';

// Singleton instance for easy usage
import { NavigationPerfectionOrchestrator } from './NavigationPerfectionOrchestrator';
export const navigationPerfectionSuite = new NavigationPerfectionOrchestrator();

// Default export (main orchestrator)
export default NavigationPerfectionOrchestrator;
