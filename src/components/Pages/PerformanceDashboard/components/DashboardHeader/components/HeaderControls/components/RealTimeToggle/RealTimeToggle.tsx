'use client';

import React from 'react';

interface RealTimeToggleProps {
  isRealTime: boolean;
  onRealTimeToggle: (enabled: boolean) => void;
}

/**
 * Real Time Toggle Component
 * 
 * Handles real-time monitoring toggle functionality.
 * 
 * @component RealTimeToggle
 */
export default function RealTimeToggle({ isRealTime, onRealTimeToggle }: RealTimeToggleProps) {
  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      fontSize: '0.875rem'
    }}>
      <input
        type="checkbox"
        checked={isRealTime}
        onChange={(e) => onRealTimeToggle(e.target.checked)}
        style={{
          width: '1rem',
          height: '1rem',
          cursor: 'pointer'
        }}
      />
      <span>Real-time</span>
    </label>
  );
}
