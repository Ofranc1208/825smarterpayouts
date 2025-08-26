'use client';

import React from 'react';

interface HealthContainerProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

/**
 * Health Container Component
 * 
 * Provides consistent styling and layout for system health display.
 * 
 * @component HealthContainer
 */
export default function HealthContainer({ children, isLoading = false }: HealthContainerProps) {
  if (isLoading) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          height: '200px',
          background: '#f3f4f6',
          borderRadius: '0.5rem',
          animation: 'pulse 2s infinite'
        }} />
        
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `
        }} />
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      {children}
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `
      }} />
    </div>
  );
}
