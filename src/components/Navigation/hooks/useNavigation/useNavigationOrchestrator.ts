/**
 * Navigation Orchestrator - Main Hook
 * 
 * Main orchestrator that combines all navigation functionality
 * (Simplified version of the original useNavigation.ts)
 * 
 * @module useNavigationOrchestrator
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useEffect, useCallback } from 'react';
import { useNavigationAnalytics } from '../useNavigationAnalytics';
import { useNavigationPerformance } from '../useNavigationPerformance';
import { useNavigationAccessibility } from '../useNavigationAccessibility';
import { navigationDashboardIntegration } from '../../services/NavigationDashboardIntegration';
import type { NavigationItem, NavigationConfig } from '../../types';
import { useNavigationEventHandlers } from './useNavigationEventHandlers';
import { useNavigationHealthMonitor } from './useNavigationHealthMonitor';
import { useNavigationMetricsCollector } from './useNavigationMetricsCollector';

interface NavigationHookConfig {
  enableAnalytics?: boolean;
  enablePerformance?: boolean;
  enableAccessibility?: boolean;
  enableDashboardIntegration?: boolean;
  config?: Partial<NavigationConfig>;
}

/**
 * Main navigation hook that orchestrates all navigation functionality
 */
export function useNavigation(config: NavigationHookConfig = {}) {
  const {
    enableAnalytics = true,
    enablePerformance = true,
    enableAccessibility = true,
    enableDashboardIntegration = true
  } = config;

  // Initialize core hooks
  const analytics = useNavigationAnalytics({
    enableVercelAnalytics: enableAnalytics,
    enableCustomEvents: enableAnalytics
  });

  const performance = useNavigationPerformance({
    enableCoreWebVitals: enablePerformance,
    enableCustomMetrics: enablePerformance
  });

  const accessibility = useNavigationAccessibility({
    enableScreenReader: enableAccessibility,
    enableKeyboardNavigation: enableAccessibility,
    enableFocusManagement: enableAccessibility
  });

  // Initialize modular hooks
  const eventHandlers = useNavigationEventHandlers({
    analytics,
    performance,
    accessibility
  });

  const healthMonitor = useNavigationHealthMonitor({
    performance,
    accessibility
  });

  const metricsCollector = useNavigationMetricsCollector({
    analytics,
    performance,
    accessibility,
    enableDashboardIntegration
  });

  // Dashboard integration effect
  useEffect(() => {
    if (enableDashboardIntegration) {
      navigationDashboardIntegration.initialize().catch((error: any) => {
        console.warn('Failed to initialize navigation dashboard integration:', error);
      });
    }

    return () => {
      if (enableDashboardIntegration) {
        navigationDashboardIntegration.destroy();
      }
    };
  }, [enableDashboardIntegration]);

  return {
    // Core functionality
    analytics,
    performance,
    accessibility,

    // Event handlers
    handleNavClick: eventHandlers.handleNavClick,
    handleDropdownToggle: eventHandlers.handleDropdownToggle,
    handleMobileMenuToggle: eventHandlers.handleMobileMenuToggle,

    // Health and metrics
    getNavigationHealth: healthMonitor.getNavigationHealth,
    getNavigationMetrics: metricsCollector.getNavigationMetrics,
    resetNavigationMetrics: metricsCollector.resetNavigationMetrics,

    // Dashboard integration
    dashboardIntegration: enableDashboardIntegration ? navigationDashboardIntegration : null
  };
}
