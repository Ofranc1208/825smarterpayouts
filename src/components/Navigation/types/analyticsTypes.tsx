// Navigation Analytics Types

export interface NavigationAnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

export interface NavigationInteraction {
  type: 'click' | 'hover' | 'focus' | 'search';
  element: string;
  timestamp: number;
  path: string;
  metadata?: Record<string, any>;
}

export interface DropdownAnalytics {
  dropdownId: string;
  openTime: number;
  closeTime?: number;
  itemsClicked: string[];
  abandonmentPoint?: string;
}

export interface SearchAnalytics {
  query: string;
  timestamp: number;
  resultsCount: number;
  selectedResult?: string;
  abandonedSearch?: boolean;
}

export interface MobileMenuAnalytics {
  openTime: number;
  closeTime?: number;
  itemsClicked: string[];
  scrollDepth: number;
}

export interface NavigationPerformance {
  loadTime: number;
  renderTime: number;
  interactionDelay: number;
  dropdownOpenTime: number;
}

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number;
  config: Record<string, any>;
}

export interface NavigationABTest {
  testId: string;
  variants: ABTestVariant[];
  activeVariant?: ABTestVariant;
  conversionGoals: string[];
}
