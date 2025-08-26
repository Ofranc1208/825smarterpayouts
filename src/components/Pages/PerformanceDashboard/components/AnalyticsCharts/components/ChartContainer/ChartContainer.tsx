'use client';

import React from 'react';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function ChartContainer({ title, children, isLoading = false }: ChartContainerProps) {
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
          height: '300px',
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
      <h3 style={{
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1f2937',
        margin: '0 0 1rem 0'
      }}>
        {title}
      </h3>
      
      {children}
    </div>
  );
}
