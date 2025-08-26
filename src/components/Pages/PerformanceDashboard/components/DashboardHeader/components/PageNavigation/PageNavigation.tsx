'use client';

import React from 'react';

interface Page {
  id: string;
  name: string;
  icon: string;
}

interface PageNavigationProps {
  pages: Page[];
  selectedPage: string;
  onPageChange: (page: string) => void;
}

/**
 * Page Navigation Component
 * 
 * Displays navigation tabs for different pages in the dashboard.
 * 
 * @component PageNavigation
 */
export default function PageNavigation({ pages, selectedPage, onPageChange }: PageNavigationProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    }}>
      {pages.map((page) => (
        <button
          key={page.id}
          onClick={() => onPageChange(page.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: selectedPage === page.id ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
            border: selectedPage === page.id ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
            borderRadius: '0.5rem',
            color: 'white',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: selectedPage === page.id ? '600' : '400'
          }}
          onMouseEnter={(e) => {
            if (selectedPage !== page.id) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedPage !== page.id) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }
          }}
        >
          <span>{page.icon}</span>
          <span>{page.name}</span>
        </button>
      ))}
    </div>
  );
}
