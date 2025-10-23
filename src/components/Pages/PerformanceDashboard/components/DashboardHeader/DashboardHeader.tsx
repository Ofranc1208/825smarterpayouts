'use client';

import React from 'react';
import { HeaderContainer, HeaderTitle, PageNavigation, HeaderControls } from './components';

interface DashboardHeaderProps {
  selectedPage: string;
  onPageChange: (page: string) => void;
  timeRange: '1h' | '24h' | '7d' | '30d';
  onTimeRangeChange: (range: '1h' | '24h' | '7d' | '30d') => void;
  isRealTime: boolean;
  onRealTimeToggle: (enabled: boolean) => void;
  onRefresh: () => void;
}

const pages = [
  { id: 'overview', name: 'Overview', icon: '📊' },
  { id: 'navigation', name: 'Navigation System', icon: '🧭' },
  { id: 'home', name: 'Home', icon: '🏠' },
  { id: 'about', name: 'About Us', icon: 'ℹ️' },
  { id: 'contact', name: 'Contact', icon: '📞' },
  { id: 'court-approval', name: 'Court Approval', icon: '⚖️' },
  { id: 'mint-chat', name: 'Mint Chat', icon: '/assets/images/mint-mascot.png' },
  { id: 'settlement-laws-federal', name: 'Federal Laws', icon: '🏛️' },
  { id: 'settlement-laws-state', name: 'State Laws', icon: '🗺️' },
  { id: 'youtube', name: 'YouTube Channel', icon: '📺' }
];

/**
 * Dashboard Header Component
 * 
 * Main header component that orchestrates all header sub-components.
 * Acts as a simple router/orchestrator for header functionality.
 * 
 * @component DashboardHeader
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function DashboardHeader({
  selectedPage,
  onPageChange,
  timeRange,
  onTimeRangeChange,
  isRealTime,
  onRealTimeToggle,
  onRefresh
}: DashboardHeaderProps) {
  return (
    <HeaderContainer>
      {/* Header Top Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <HeaderTitle
          title="Performance Dashboard"
          subtitle="Real-time monitoring for SmarterPayouts"
          icon="📊"
        />
        
        <HeaderControls
          timeRange={timeRange}
          onTimeRangeChange={onTimeRangeChange}
          isRealTime={isRealTime}
          onRealTimeToggle={onRealTimeToggle}
          onRefresh={onRefresh}
        />
      </div>

      {/* Page Navigation */}
      <PageNavigation
        pages={pages}
        selectedPage={selectedPage}
        onPageChange={onPageChange}
      />
    </HeaderContainer>
  );
}