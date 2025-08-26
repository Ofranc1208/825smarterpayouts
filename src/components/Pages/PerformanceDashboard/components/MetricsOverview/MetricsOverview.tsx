'use client';

import React, { useState, useEffect } from 'react';
import { MetricsHeader, MetricsGrid } from './components';

interface Metric {
  name: string;
  value: number;
  unit: string;
  change: number;
  status: 'good' | 'needs-improvement' | 'poor';
  icon: string;
}

interface MetricsOverviewProps {
  metrics: {
    coreWebVitals: {
      fcp: Metric;
      lcp: Metric;
      cls: Metric;
      fid: Metric;
      ttfb: Metric;
    };
    performance: {
      pageLoad: Metric;
      domReady: Metric;
      firstByte: Metric;
    };
    user: {
      activeUsers: Metric;
      bounceRate: Metric;
      sessionDuration: Metric;
    };
  };
  isLoading: boolean;
  timeRange: string;
}

/**
 * Metrics Overview Component
 * 
 * Main orchestrator for performance metrics display.
 * Composes header and grid components with hydration safety.
 * 
 * @component MetricsOverview
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function MetricsOverview({ metrics, isLoading, timeRange }: MetricsOverviewProps) {
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by only rendering dynamic content on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Flatten all metrics into a single array
  const allMetrics = [
    ...Object.values(metrics.coreWebVitals),
    ...Object.values(metrics.performance),
    ...Object.values(metrics.user)
  ];

  // Show loading state during hydration
  if (!isClient) {
  return (
    <section>
        <MetricsHeader timeRange="Loading..." />
        <MetricsGrid 
          metrics={Array.from({ length: 8 }).map((_, index) => ({
            name: 'Loading...',
            value: 0,
            unit: '',
            change: 0,
            status: 'good' as const,
            icon: '⏳'
          }))}
          isLoading={true}
        />
    </section>
  );
}

  return (
    <section>
      <MetricsHeader timeRange={timeRange} />
      <MetricsGrid metrics={allMetrics} isLoading={isLoading} />
    </section>
  );
}