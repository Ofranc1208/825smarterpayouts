'use client';

import React from 'react';

interface HealthHeaderProps {
  title?: string;
}

/**
 * Health Header Component
 * 
 * Displays header title for system health section.
 * 
 * @component HealthHeader
 */
export default function HealthHeader({ title = 'System Health' }: HealthHeaderProps) {
  return (
    <h3 style={{
      fontSize: '1rem',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 1rem 0'
    }}>
      {title}
    </h3>
  );
}
