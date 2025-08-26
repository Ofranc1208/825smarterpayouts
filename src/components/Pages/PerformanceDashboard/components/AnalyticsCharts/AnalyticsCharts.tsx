'use client';

import React from 'react';
import { ChartContainer, ChartPlaceholder } from './components';

interface AnalyticsChartsProps {
  analytics: any;
  timeRange: string;
  isLoading: boolean;
}

/**
 * Analytics Charts Component
 * 
 * Displays analytics data in chart format with modular sub-components.
 * Uses ChartContainer for consistent styling and ChartPlaceholder for empty states.
 * 
 * @component AnalyticsCharts
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function AnalyticsCharts({ analytics, timeRange, isLoading }: AnalyticsChartsProps) {
  return (
    <ChartContainer 
      title="Analytics Overview" 
      isLoading={isLoading}
    >
      <ChartPlaceholder
        icon="📈"
        title="Analytics charts will be displayed here"
        subtitle="Real-time analytics and performance data"
        timeRange={timeRange}
      />
    </ChartContainer>
  );
}