/**
 * Analytics Orchestrator - Main Hook
 * 
 * Main orchestrator that combines all analytics functionality
 * (Simplified version of the original useNavigationAnalytics.ts)
 * 
 * @module useAnalyticsOrchestrator
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useCallback } from 'react';
import type { NavigationItem, NavigationError, UseNavigationAnalytics } from '../../types';
import { useVercelAnalyticsManager } from './useVercelAnalyticsManager';
import { useCustomEventManager } from './useCustomEventManager';
import { useAnalyticsReporter } from './useAnalyticsReporter';

interface AnalyticsConfig {
  enableVercelAnalytics?: boolean;
  enableCustomEvents?: boolean;
  trackingPrefix?: string;
  debug?: boolean;
}

/**
 * Main analytics hook that orchestrates all analytics functionality
 */
export function useNavigationAnalytics(config: AnalyticsConfig = {}): UseNavigationAnalytics {
  const {
    enableVercelAnalytics = true,
    enableCustomEvents = true,
    trackingPrefix = 'nav',
    debug = process.env.NODE_ENV === 'development'
  } = config;

  // Initialize analytics managers
  const vercelAnalytics = useVercelAnalyticsManager({
    enableVercelAnalytics,
    trackingPrefix,
    debug
  });

  const customEvents = useCustomEventManager({
    enableCustomEvents,
    debug
  });

  const reporter = useAnalyticsReporter({
    customEvents: customEvents.getEventQueue
  });

  /**
   * Track navigation item click
   */
  const trackNavClick = useCallback((item: NavigationItem, context?: string) => {
    const eventData = {
      item_href: item.href,
      item_label: item.label,
      item_icon: item.icon,
      context: context || 'navigation',
      is_external: item.isExternal || false,
      requires_auth: item.requiresAuth || false,
      analytics_id: item.analyticsId
    };

    // Send to Vercel Analytics
    vercelAnalytics.sendToVercel('item_click', eventData);

    // Store custom event
    customEvents.storeEvent({
      eventType: 'click',
      elementType: 'nav_item',
      elementId: item.analyticsId || item.href,
      elementLabel: item.label,
      timestamp: Date.now(),
      sessionId: customEvents.getSessionId(),
      metadata: eventData
    });
  }, [vercelAnalytics, customEvents]);

  /**
   * Track dropdown open
   */
  const trackDropdownOpen = useCallback((sectionName: string) => {
    const eventData = {
      section_name: sectionName,
      action: 'open'
    };

    vercelAnalytics.sendToVercel('dropdown_toggle', eventData);

    customEvents.storeEvent({
      eventType: 'click',
      elementType: 'dropdown',
      elementId: `dropdown_${sectionName}`,
      elementLabel: sectionName,
      timestamp: Date.now(),
      sessionId: customEvents.getSessionId(),
      metadata: eventData
    });
  }, [vercelAnalytics, customEvents]);

  /**
   * Track dropdown close
   */
  const trackDropdownClose = useCallback((sectionName: string) => {
    const eventData = {
      section_name: sectionName,
      action: 'close'
    };

    vercelAnalytics.sendToVercel('dropdown_toggle', eventData);

    customEvents.storeEvent({
      eventType: 'click',
      elementType: 'dropdown',
      elementId: `dropdown_${sectionName}`,
      elementLabel: sectionName,
      timestamp: Date.now(),
      sessionId: customEvents.getSessionId(),
      metadata: eventData
    });
  }, [vercelAnalytics, customEvents]);

  /**
   * Track mobile menu toggle
   */
  const trackMobileMenuToggle = useCallback((isOpen: boolean) => {
    const eventData = {
      action: isOpen ? 'open' : 'close',
      menu_state: isOpen
    };

    vercelAnalytics.sendToVercel('mobile_menu_toggle', eventData);

    customEvents.storeEvent({
      eventType: 'click',
      elementType: 'mobile_menu',
      elementId: 'hamburger_button',
      elementLabel: isOpen ? 'Open Menu' : 'Close Menu',
      timestamp: Date.now(),
      sessionId: customEvents.getSessionId(),
      metadata: eventData
    });
  }, [vercelAnalytics, customEvents]);

  /**
   * Track navigation error
   */
  const trackNavigationError = useCallback((error: NavigationError) => {
    const eventData = {
      error_code: error.code,
      error_message: error.message,
      error_component: error.component,
      error_url: error.url,
      user_agent: error.userAgent
    };

    vercelAnalytics.sendToVercel('navigation_error', eventData);

    customEvents.storeEvent({
      eventType: 'error',
      elementType: 'nav_item',
      elementId: error.component,
      elementLabel: error.message,
      timestamp: error.timestamp,
      sessionId: customEvents.getSessionId(),
      metadata: eventData
    });

    // Also log to console for debugging
    console.error('Navigation Error:', error);
  }, [vercelAnalytics, customEvents]);

  /**
   * Track performance metric
   */
  const trackPerformanceMetric = useCallback((metric: string, value: number) => {
    const eventData = {
      metric_name: metric,
      metric_value: value,
      metric_unit: 'ms'
    };

    vercelAnalytics.sendToVercel('performance_metric', eventData);

    customEvents.storeEvent({
      eventType: 'scroll', // Using scroll as a generic performance event type
      elementType: 'nav_item',
      elementId: `performance_${metric}`,
      elementLabel: `Performance: ${metric}`,
      timestamp: Date.now(),
      sessionId: customEvents.getSessionId(),
      metadata: eventData
    });
  }, [vercelAnalytics, customEvents]);

  return {
    trackNavClick,
    trackDropdownOpen,
    trackDropdownClose,
    trackMobileMenuToggle,
    trackNavigationError,
    trackPerformanceMetric,
    getAnalyticsSummary: reporter.getAnalyticsSummary
  } as UseNavigationAnalytics & { getAnalyticsSummary: () => any };
}
