/**
 * DEPRECATED: Navigation A/B Testing Framework
 * 
 * This file has been modularized for better maintainability and scalability.
 * Please use the new modular system from './NavigationABTesting/' instead.
 * 
 * @deprecated Use NavigationABTestProvider from './NavigationABTesting/index'
 * @module NavigationABTesting
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition (Modularized)
 */

// Re-export the new modular system for backward compatibility
export {
  NavigationABTestProvider,
  useNavigationABTest,
  ABTestComponent,
  useABTestVariant,
  withABTest,
  type ABTestVariant,
  type ABTest,
  type ABTestResult,
  type ABTestStats,
  type ABTestContextType,
  type UserAssignment,
  type ABTestConfig,
  type StatisticalResult,
  type VariantPerformance
} from './NavigationABTesting/index';

// Default export (main provider)
export { NavigationABTestProvider as default } from './NavigationABTesting/index';
