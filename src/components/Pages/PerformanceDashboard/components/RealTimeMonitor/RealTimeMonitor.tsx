'use client';

import React from 'react';
import { MonitorContainer, MonitorHeader, MonitorStatus } from './components';

interface RealTimeMonitorProps {
  isEnabled: boolean;
  metrics: any;
  lastUpdate: Date;
}

/**
 * Real Time Monitor Component
 * 
 * Main orchestrator for real-time monitoring display.
 * Composes container, header, and status components for clean separation.
 * 
 * @component RealTimeMonitor
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function RealTimeMonitor({ isEnabled, metrics, lastUpdate }: RealTimeMonitorProps) {
  return (
    <MonitorContainer>
      <MonitorHeader isEnabled={isEnabled} />
      <MonitorStatus isEnabled={isEnabled} lastUpdate={lastUpdate} />
    </MonitorContainer>
  );
}