/**
 * TypeScript interfaces for How Fast page
 * Defines data structures for timeline steps, factors, and stats
 */

/**
 * Timeline step data structure
 */
export interface TimelineStep {
  step: number;
  title: string;
  time: string;
  description: string;
  variant: 'success' | 'warning';
}

/**
 * Factor item data structure (things that speed up or slow down the process)
 */
export interface Factor {
  icon: string;
  text: string;
  description: string;
}

/**
 * Payment method data structure
 */
export interface PaymentMethod {
  icon: string;
  title: string;
  description: string;
  ariaLabel: string;
}

/**
 * State timing category
 */
export interface StateCategory {
  title: string;
  timeframe: string;
  states: string;
  variant: 'success' | 'warning' | 'secondary';
}

