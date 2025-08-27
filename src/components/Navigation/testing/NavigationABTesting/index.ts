/**
 * Navigation A/B Testing - Modular System Exports
 * 
 * Centralized exports for the modular Navigation A/B Testing system.
 * Provides both individual modules and the main provider component.
 * 
 * @module NavigationABTestingIndex
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

// Main Provider and Hooks (recommended for most use cases)
export {
  NavigationABTestProvider,
  useNavigationABTest,
  ABTestComponent,
  useABTestVariant,
  withABTest
} from './NavigationABTestProvider';

// Individual modules (for advanced customization)
export { ABTestManager } from './ABTestManager';
export { StatisticalAnalyzer } from './StatisticalAnalyzer';
export { UserAssignmentEngine } from './UserAssignmentEngine';
export { ABTestAnalytics } from './ABTestAnalytics';

// Utilities
export {
  getUserId,
  getSessionId,
  generateTestId,
  hashString,
  getUserRandomNumber,
  validateABTest,
  ABTestStorage,
  DateUtils,
  PerformanceUtils
} from './ABTestUtils';

// Types
export type {
  ABTestVariant,
  ABTest,
  ABTestResult,
  ABTestStats,
  ABTestContextType,
  UserAssignment,
  ABTestConfig,
  StatisticalResult,
  VariantPerformance
} from './types';

// Default export (main provider)
export { NavigationABTestProvider as default } from './NavigationABTestProvider';
