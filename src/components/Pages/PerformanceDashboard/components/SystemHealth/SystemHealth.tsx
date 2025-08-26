'use client';

import React from 'react';
import { HealthContainer, HealthHeader, SystemsList, HealthSummary } from './components';

interface SystemHealthProps {
  health: {
    server: 'healthy' | 'warning' | 'critical';
    database: 'healthy' | 'warning' | 'critical';
    cdn: 'healthy' | 'warning' | 'critical';
    api: 'healthy' | 'warning' | 'critical';
  };
  isLoading: boolean;
}

/**
 * System Health Component
 * 
 * Main orchestrator for system health monitoring display.
 * Composes container, header, systems list, and summary components.
 * 
 * @component SystemHealth
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function SystemHealth({ health, isLoading }: SystemHealthProps) {
  return (
    <HealthContainer isLoading={isLoading}>
      <HealthHeader />
      <SystemsList health={health} />
      <HealthSummary />
    </HealthContainer>
  );
}