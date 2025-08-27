/**
 * Advanced Navigation Analytics - Modular System Exports
 * 
 * Centralized exports for the modular Advanced Navigation Analytics system.
 * Provides both individual modules and the main orchestrator.
 * 
 * @module AdvancedNavigationAnalyticsIndex
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

// Main orchestrator (recommended for most use cases)
export { AdvancedAnalyticsOrchestrator } from './AdvancedAnalyticsOrchestrator';
export { AdvancedAnalyticsOrchestrator as AdvancedNavigationAnalytics } from './AdvancedAnalyticsOrchestrator';

// Individual modules (for advanced customization)
export { HeatmapTracker } from './HeatmapTracker';
export { UserJourneyAnalyzer } from './UserJourneyAnalyzer';
export { EventListenerManager } from './EventListenerManager';
export { InsightGenerator } from './InsightGenerator';
export { AnalyticsDataManager } from './AnalyticsDataManager';
export { VisualizationDataProcessor } from './VisualizationDataProcessor';

// Types
export type {
  HeatmapPoint,
  UserJourneyStep,
  NavigationInsight,
  AdvancedAnalyticsConfig,
  HeatmapVisualizationPoint,
  JourneyPattern,
  AnalyticsSummary,
  StorageData,
  EventHandlerConfig,
  InsightGenerationConfig
} from './types';

// Singleton instance for easy usage
import { AdvancedAnalyticsOrchestrator } from './AdvancedAnalyticsOrchestrator';
export const advancedNavigationAnalytics = new AdvancedAnalyticsOrchestrator();

// Default export (main orchestrator)
export default AdvancedAnalyticsOrchestrator;
