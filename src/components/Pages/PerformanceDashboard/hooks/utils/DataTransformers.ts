/**
 * Data Transformation Utilities
 * 
 * Handles conversion between different data formats for the Performance Dashboard
 */

import type { RealMetric } from '../../services/RealWebVitalsService';

export interface TransformedMetrics {
  coreWebVitals: {
    fcp: MetricData;
    lcp: MetricData;
    cls: MetricData;
    fid: MetricData;
    ttfb: MetricData;
  };
  performance: {
    pageLoad: MetricData;
    domReady: MetricData;
    firstByte: MetricData;
  };
  user: {
    activeUsers: MetricData;
    bounceRate: MetricData;
    sessionDuration: MetricData;
  };
}

export interface MetricData {
  name: string;
  value: number;
  unit: string;
  change: number;
  status: 'good' | 'needs-improvement' | 'poor';
  icon: string;
}

export interface PageData {
  id: string;
  name: string;
  icon: string;
  metrics: {
    visitors: number;
    bounceRate: number;
    pageViews: number;
    avgSessionDuration: number;
  };
  status: 'good' | 'needs-improvement' | 'poor';
  lastUpdated: Date;
}

/**
 * Transforms real Web Vitals data into dashboard metrics format
 */
export const transformWebVitalsToMetrics = (
  realWebVitals: any,
  browserMetrics: any,
  memoryMetrics: any
): TransformedMetrics => {
  return {
    coreWebVitals: {
      fcp: realWebVitals.fcp ? {
        name: realWebVitals.fcp.name,
        value: realWebVitals.fcp.value,
        unit: realWebVitals.fcp.unit,
        change: realWebVitals.fcp.change,
        status: realWebVitals.fcp.status as 'good' | 'needs-improvement' | 'poor',
        icon: realWebVitals.fcp.icon
      } : {
        name: 'First Contentful Paint',
        value: 0,
        unit: 'ms',
        change: 0,
        status: 'good' as const,
        icon: '🎨'
      },
      lcp: realWebVitals.lcp ? {
        name: realWebVitals.lcp.name,
        value: realWebVitals.lcp.value,
        unit: realWebVitals.lcp.unit,
        change: realWebVitals.lcp.change,
        status: realWebVitals.lcp.status as 'good' | 'needs-improvement' | 'poor',
        icon: realWebVitals.lcp.icon
      } : {
        name: 'Largest Contentful Paint',
        value: 0,
        unit: 'ms',
        change: 0,
        status: 'good' as const,
        icon: '🖼️'
      },
      cls: realWebVitals.cls ? {
        name: realWebVitals.cls.name,
        value: realWebVitals.cls.value,
        unit: realWebVitals.cls.unit,
        change: realWebVitals.cls.change,
        status: realWebVitals.cls.status as 'good' | 'needs-improvement' | 'poor',
        icon: realWebVitals.cls.icon
      } : {
        name: 'Cumulative Layout Shift',
        value: 0,
        unit: '',
        change: 0,
        status: 'good' as const,
        icon: '📐'
      },
      fid: realWebVitals.fid ? {
        name: realWebVitals.fid.name,
        value: realWebVitals.fid.value,
        unit: realWebVitals.fid.unit,
        change: realWebVitals.fid.change,
        status: realWebVitals.fid.status as 'good' | 'needs-improvement' | 'poor',
        icon: realWebVitals.fid.icon
      } : {
        name: 'First Input Delay',
        value: 0,
        unit: 'ms',
        change: 0,
        status: 'good' as const,
        icon: '👆'
      },
      ttfb: realWebVitals.ttfb ? {
        name: realWebVitals.ttfb.name,
        value: realWebVitals.ttfb.value,
        unit: realWebVitals.ttfb.unit,
        change: realWebVitals.ttfb.change,
        status: realWebVitals.ttfb.status as 'good' | 'needs-improvement' | 'poor',
        icon: realWebVitals.ttfb.icon
      } : {
        name: 'Time to First Byte',
        value: 0,
        unit: 'ms',
        change: 0,
        status: 'good' as const,
        icon: '⚡'
      }
    },
    performance: {
      pageLoad: browserMetrics?.pageLoad || {
        name: 'Page Load Time',
        value: 0,
        unit: 'ms',
        change: 0,
        status: 'good' as const,
        icon: '🚀'
      },
      domReady: browserMetrics?.domContentLoaded || {
        name: 'DOM Ready',
        value: 0,
        unit: 'ms',
        change: 0,
        status: 'good' as const,
        icon: '🏗️'
      },
      firstByte: realWebVitals.ttfb || {
        name: 'First Byte',
        value: 0,
        unit: 'ms',
        change: 0,
        status: 'good' as const,
        icon: '📡'
      }
    },
    user: {
      activeUsers: {
        name: 'Active Users',
        value: 1, // Current user
        unit: '',
        change: 0,
        status: 'good' as const,
        icon: '👥'
      },
      bounceRate: {
        name: 'Bounce Rate',
        value: 0, // Cannot determine from single session
        unit: '%',
        change: 0,
        status: 'good' as const,
        icon: '📊'
      },
      sessionDuration: {
        name: 'Session Duration',
        value: Math.floor((Date.now() - performance.timeOrigin) / 1000),
        unit: 's',
        change: 0,
        status: 'good' as const,
        icon: '⏱️'
      }
    }
  };
};

/**
 * Transforms analytics page data into dashboard format
 */
export const transformPageDataToDashboard = (realPageData: any[]): PageData[] => {
  return realPageData.map(page => ({
    id: page.id,
    name: page.name,
    icon: page.icon,
    metrics: {
      visitors: page.metrics.visitors,
      bounceRate: page.metrics.bounceRate,
      pageViews: page.metrics.visitors, // Use visitors as pageViews for now
      avgSessionDuration: 120 // Default session duration in seconds
    },
    status: page.status,
    lastUpdated: page.lastUpdated
  }));
};

/**
 * Calculates real analytics data from current session
 */
export const calculateRealAnalytics = () => {
  return {
    pageViews: 1, // Current page view
    uniqueVisitors: 1, // Current user
    avgSessionDuration: Math.floor((Date.now() - performance.timeOrigin) / 1000),
    conversionRate: 0 // Cannot determine from single session
  };
};
