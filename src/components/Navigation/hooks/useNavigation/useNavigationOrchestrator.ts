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

import { useEffect, useCallback, useState } from 'react';
import { navigationDashboardIntegration } from '../../services/NavigationDashboardIntegration';
import type { NavigationItem, NavigationConfig } from '../../types';
import { useNavigationEventHandlers } from './useNavigationEventHandlers';
import { useNavigationHealthMonitor } from './useNavigationHealthMonitor';
import { useNavigationMetricsCollector } from './useNavigationMetricsCollector';
import { createNavigationAnalytics, createNavigationPerformance, createNavigationAccessibility } from '../index';

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

  // Lazy-load optional hooks to reduce bundle size
  const [analytics, setAnalytics] = useState<any>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [accessibility, setAccessibility] = useState<any>(null);

  // Initialize hooks on demand
  useEffect(() => {
    if (enableAnalytics && !analytics) {
      createNavigationAnalytics().then(hook => setAnalytics(hook));
    }
    if (enablePerformance && !performance) {
      createNavigationPerformance().then(hook => setPerformance(hook));
    }
    if (enableAccessibility && !accessibility) {
      createNavigationAccessibility().then(hook => setAccessibility(hook));
    }
  }, [enableAnalytics, enablePerformance, enableAccessibility, analytics, performance, accessibility]);

  // Initialize modular hooks (only when dependencies are available)
  const eventHandlers = useNavigationEventHandlers({
    analytics: analytics || {},
    performance: performance || {},
    accessibility: accessibility || {}
  });

  const healthMonitor = useNavigationHealthMonitor({
    performance: performance || {},
    accessibility: accessibility || {}
  });

  const metricsCollector = useNavigationMetricsCollector({
    analytics: analytics || {},
    performance: performance || {},
    accessibility: accessibility || {},
    enableDashboardIntegration
  });

  // Dashboard integration effect (only run when hooks are loaded)
  useEffect(() => {
    if (enableDashboardIntegration && analytics && performance && accessibility) {
      navigationDashboardIntegration.initialize().catch((error: any) => {
        console.warn('Failed to initialize navigation dashboard integration:', error);
      });
    }

    return () => {
      if (enableDashboardIntegration) {
        navigationDashboardIntegration.destroy();
      }
    };
  }, [enableDashboardIntegration, analytics, performance, accessibility]);

  return {
    // Core functionality (lazy-loaded)
    analytics: analytics || {},
    performance: performance || {},
    accessibility: accessibility || {},

    // Event handlers
    handleNavClick: eventHandlers.handleNavClick,
    handleDropdownToggle: eventHandlers.handleDropdownToggle,
    handleMobileMenuToggle: eventHandlers.handleMobileMenuToggle,

    // Health and metrics
    getNavigationHealth: healthMonitor.getNavigationHealth,
    getNavigationMetrics: metricsCollector.getNavigationMetrics,
    resetNavigationMetrics: metricsCollector.resetNavigationMetrics,

    // Dashboard integration (only available when hooks are loaded)
    dashboardIntegration: (enableDashboardIntegration && analytics && performance && accessibility) ? navigationDashboardIntegration : null
  };
}
