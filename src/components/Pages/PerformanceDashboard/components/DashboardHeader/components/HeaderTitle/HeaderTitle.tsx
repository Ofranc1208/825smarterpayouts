'use client';

import React from 'react';

interface HeaderTitleProps {
  title: string;
  subtitle: string;
  icon?: string;
}

/**
 * Header Title Component
 * 
 * Displays the main title and subtitle for the dashboard header.
 * 
 * @component HeaderTitle
 */
export default function HeaderTitle({ title, subtitle, icon = '📊' }: HeaderTitleProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '0.75rem',
        padding: '0.75rem',
        fontSize: '1.5rem'
      }}>
        {icon}
      </div>
      <div>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          margin: '0 0 0.25rem 0'
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: '0.875rem',
          opacity: 0.8,
          margin: '0'
        }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
