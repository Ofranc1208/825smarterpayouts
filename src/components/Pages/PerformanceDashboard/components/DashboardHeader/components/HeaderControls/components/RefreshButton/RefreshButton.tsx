'use client';

import React from 'react';

interface RefreshButtonProps {
  onRefresh: () => void;
  icon?: string;
  label?: string;
}

/**
 * Refresh Button Component
 * 
 * Handles manual data refresh functionality.
 * 
 * @component RefreshButton
 */
export default function RefreshButton({ 
  onRefresh, 
  icon = '🔄', 
  label = 'Refresh' 
}: RefreshButtonProps) {
  return (
    <button
      onClick={onRefresh}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '0.5rem',
        color: 'white',
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
