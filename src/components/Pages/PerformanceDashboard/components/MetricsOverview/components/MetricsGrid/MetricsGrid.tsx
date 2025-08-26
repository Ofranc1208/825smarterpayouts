'use client';

import React from 'react';
import { MetricCard } from '../MetricCard';

interface Metric {
  name: string;
  value: number;
  unit: string;
  change: number;
  status: 'good' | 'needs-improvement' | 'poor';
  icon: string;
}

interface MetricsGridProps {
  metrics: Metric[];
  isLoading: boolean;
}

/**
 * Metrics Grid Component
 * 
 * Displays metrics in a responsive grid layout.
 * 
 * @component MetricsGrid
 */
export default function MetricsGrid({ metrics, isLoading }: MetricsGridProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem'
    }}>
      {metrics.map((metric, index) => (
        <MetricCard
          key={`${metric.name}-${index}`}
          metric={metric}
          isLoading={isLoading}
        />
      ))}
      
      {/* CSS for pulse animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `
      }} />
    </div>
  );
}
