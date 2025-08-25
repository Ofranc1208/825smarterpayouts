// Contact Page Analytics Types

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

export interface FormAnalytics {
  formId: string;
  startTime: number;
  submitTime?: number;
  completionTime?: number;
  fieldInteractions: FieldInteraction[];
  abandonmentPoint?: string;
}

export interface FieldInteraction {
  fieldName: string;
  focusTime: number;
  blurTime?: number;
  changeCount: number;
  finalValue: string;
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay?: number;
}

export interface UserInteraction {
  type: 'click' | 'scroll' | 'focus' | 'hover';
  element: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface ConversionFunnel {
  pageView: boolean;
  formStart: boolean;
  formComplete: boolean;
  ctaClick: boolean;
  contactMethodClick: boolean;
}
