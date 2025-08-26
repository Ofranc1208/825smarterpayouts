'use client';

import React from 'react';

interface TimeRange {
  id: '1h' | '24h' | '7d' | '30d';
  name: string;
}

interface TimeRangeSelectorProps {
  timeRange: '1h' | '24h' | '7d' | '30d';
  onTimeRangeChange: (range: '1h' | '24h' | '7d' | '30d') => void;
}

const timeRanges: TimeRange[] = [
  { id: '1h', name: '1 Hour' },
  { id: '24h', name: '24 Hours' },
  { id: '7d', name: '7 Days' },
  { id: '30d', name: '30 Days' }
];

/**
 * Time Range Selector Component
 * 
 * Handles time range selection for dashboard data filtering.
 * 
 * @component TimeRangeSelector
 */
export default function TimeRangeSelector({ timeRange, onTimeRangeChange }: TimeRangeSelectorProps) {
  return (
    <select
      value={timeRange}
      onChange={(e) => onTimeRangeChange(e.target.value as '1h' | '24h' | '7d' | '30d')}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '0.5rem',
        color: 'white',
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        cursor: 'pointer'
      }}
    >
      {timeRanges.map((range) => (
        <option key={range.id} value={range.id} style={{ color: 'black' }}>
          {range.name}
        </option>
      ))}
    </select>
  );
}
