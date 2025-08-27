/**
 * Navigation Service Worker - Modular System Exports
 * 
 * Centralized exports for the modular Navigation Service Worker system.
 * Provides both individual modules and the main orchestrator.
 * 
 * @module NavigationServiceWorkerIndex
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

// Main orchestrator (recommended for most use cases)
export { NavigationServiceWorkerOrchestrator } from './NavigationServiceWorkerOrchestrator';
export { NavigationServiceWorkerOrchestrator as NavigationServiceWorker } from './NavigationServiceWorkerOrchestrator';

// Individual modules (for advanced customization)
export { CacheManager } from './CacheManager';
export { BackgroundSyncManager } from './BackgroundSyncManager';
export { AnalyticsQueueManager } from './AnalyticsQueueManager';
export { MetricsTracker } from './MetricsTracker';
export { OfflineUIManager } from './OfflineUIManager';
export { MessageHandler } from './MessageHandler';
export { ServiceWorkerScriptGenerator } from './ServiceWorkerScriptGenerator';

// Types
export type {
  OfflineConfig,
  CacheMetrics,
  AnalyticsEvent,
  ServiceWorkerMessage,
  OfflineIndicatorConfig
} from './types';

// Singleton instance for easy usage
import { NavigationServiceWorkerOrchestrator } from './NavigationServiceWorkerOrchestrator';
export const navigationServiceWorker = new NavigationServiceWorkerOrchestrator();

// Default export (main orchestrator)
export default NavigationServiceWorkerOrchestrator;
