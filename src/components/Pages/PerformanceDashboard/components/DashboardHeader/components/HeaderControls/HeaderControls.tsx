'use client';

import React from 'react';
import { TimeRangeSelector, RealTimeToggle, RefreshButton } from './components';

interface HeaderControlsProps {
  timeRange: '1h' | '24h' | '7d' | '30d';
  onTimeRangeChange: (range: '1h' | '24h' | '7d' | '30d') => void;
  isRealTime: boolean;
  onRealTimeToggle: (enabled: boolean) => void;
  onRefresh: () => void;
}

/**
 * Header Controls Component
 * 
 * Main orchestrator for all dashboard control components.
 * Acts as a simple router that composes smaller control components.
 * 
 * @component HeaderControls
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function HeaderControls({ 
  timeRange, 
  onTimeRangeChange, 
  isRealTime, 
  onRealTimeToggle, 
  onRefresh 
}: HeaderControlsProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flexWrap: 'wrap'
    }}>
      <TimeRangeSelector
        timeRange={timeRange}
        onTimeRangeChange={onTimeRangeChange}
      />
      
      <RealTimeToggle
        isRealTime={isRealTime}
        onRealTimeToggle={onRealTimeToggle}
      />
      
      <RefreshButton
        onRefresh={onRefresh}
      />
    </div>
  );
}