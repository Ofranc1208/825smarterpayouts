/**
 * Shared Types for Performance Dashboard Services
 * 
 * Common interfaces and types used across all performance monitoring services.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

export interface MetricData {
  name: string;
  value: number;
  unit: string;
  change: number;
  status: 'good' | 'needs-improvement' | 'poor';
  icon: string;
}

export interface CoreWebVitalsMetrics {
  fcp: MetricData;
  lcp: MetricData;
  cls: MetricData;
  fid: MetricData;
  ttfb: MetricData;
}

export interface PerformanceMetrics {
  pageLoad: MetricData;
  domReady: MetricData;
  firstByte: MetricData;
}

export interface UserMetrics {
  activeUsers: MetricData;
  bounceRate: MetricData;
  sessionDuration: MetricData;
  pageViews: MetricData;
}

export interface RealMetrics {
  coreWebVitals: CoreWebVitalsMetrics;
  performance: PerformanceMetrics;
  user: UserMetrics;
}

export interface PageMetrics {
  fcp: number;
  lcp: number;
  cls: number;
  visitors: number;
  bounceRate: number;
}

export interface RealPageData {
  id: string;
  name: string;
  icon: string;
  path: string;
  metrics: PageMetrics;
  status: 'good' | 'needs-improvement' | 'poor';
  lastUpdated: Date;
}

export interface VisitorData {
  currentVisitors: number;
  totalVisitors: number;
  uniqueVisitors: number;
  pageViews: number;
  sessionsToday: number;
  avgSessionDuration: number;
}

export interface WebVitalEntry {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating: string;
  timestamp: number;
  url: string;
}

export interface PageViewEntry {
  url: string;
  pathname: string;
  referrer: string;
  timestamp: number;
  sessionId: string;
  ip?: string;
  type?: string;
  eventType?: string;
}

export interface SystemHealthStatus {
  server: 'healthy' | 'warning' | 'critical';
  database: 'healthy' | 'warning' | 'critical';
  cdn: 'healthy' | 'warning' | 'critical';
  api: 'healthy' | 'warning' | 'critical';
  deployment?: 'healthy' | 'warning' | 'critical';
  lastCheck?: Date;
}

export type TimeRange = '1h' | '24h' | '7d' | '30d';

// Page Analytics Types
export interface PageAnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
}

export interface PagePerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  webVitalsScore: number;
  memoryUsage: number;
  errorCount: number;
}

export interface PageAccessibilityMetrics {
  score: number;
  lastAudit: Date | null;
  compliance: 'AA' | 'A' | 'Non-compliant';
  issues: string[];
}

export interface AnalyticsConfig {
  enableRealTimeTracking: boolean;
  refreshInterval: number;
  maxDataPoints: number;
  enableConsoleLogging: boolean;
}
