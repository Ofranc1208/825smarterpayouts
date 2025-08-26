'use client';

import React from 'react';

interface HeaderContainerProps {
  children: React.ReactNode;
}

/**
 * Header Container Component
 * 
 * Provides consistent styling and layout for the dashboard header.
 * 
 * @component HeaderContainer
 */
export default function HeaderContainer({ children }: HeaderContainerProps) {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      color: 'white',
      padding: '1.5rem 2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {children}
      </div>
    </header>
  );
}
