'use client';
import { NavigationAnalyticsEvent, NavigationInteraction } from '../types';

export const trackNavigationEvent = (event: NavigationAnalyticsEvent): void => {
  // Google Analytics 4 tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.customParameters
    });
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Navigation Analytics Event:', event);
  }
};

export const trackLinkClick = (href: string, linkText: string, position?: number): void => {
  trackNavigationEvent({
    action: 'navigation_link_click',
    category: 'navigation',
    label: `${linkText} -> ${href}`,
    value: position,
    customParameters: {
      link_url: href,
      link_text: linkText,
      link_position: position
    }
  });
};

export const trackDropdownInteraction = (
  dropdownId: string, 
  action: 'open' | 'close' | 'item_click',
  itemLabel?: string
): void => {
  trackNavigationEvent({
    action: `dropdown_${action}`,
    category: 'navigation',
    label: dropdownId,
    customParameters: {
      dropdown_id: dropdownId,
      item_label: itemLabel
    }
  });
};

export const trackMobileMenuInteraction = (
  action: 'open' | 'close' | 'item_click',
  itemLabel?: string
): void => {
  trackNavigationEvent({
    action: `mobile_menu_${action}`,
    category: 'navigation',
    label: itemLabel || 'menu',
    customParameters: {
      item_label: itemLabel
    }
  });
};

export const trackSearchInteraction = (
  action: 'open' | 'close' | 'query' | 'result_click',
  query?: string,
  resultPosition?: number
): void => {
  trackNavigationEvent({
    action: `search_${action}`,
    category: 'navigation',
    label: query || 'search',
    value: resultPosition,
    customParameters: {
      search_query: query,
      result_position: resultPosition
    }
  });
};

export const trackNavigationPerformance = (
  metric: string,
  value: number,
  unit: string = 'ms'
): void => {
  trackNavigationEvent({
    action: 'navigation_performance',
    category: 'performance',
    label: `${metric}_${unit}`,
    value: Math.round(value),
    customParameters: {
      metric_name: metric,
      metric_value: value,
      metric_unit: unit
    }
  });
};

export const createInteractionRecord = (
  type: NavigationInteraction['type'],
  element: string,
  path: string,
  metadata?: Record<string, any>
): NavigationInteraction => {
  return {
    type,
    element,
    timestamp: Date.now(),
    path,
    metadata
  };
};

export const batchTrackInteractions = (interactions: NavigationInteraction[]): void => {
  if (interactions.length === 0) return;

  trackNavigationEvent({
    action: 'navigation_interaction_batch',
    category: 'navigation',
    label: 'batch_tracking',
    value: interactions.length,
    customParameters: {
      interactions: interactions,
      batch_size: interactions.length
    }
  });
};
