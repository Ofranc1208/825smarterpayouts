'use client';

import React from 'react';
import { PageCard } from '../PageCard';

interface PageData {
  id: string;
  name: string;
  icon: string;
  metrics: {
    fcp: number;
    lcp: number;
    cls: number;
    visitors: number;
    bounceRate: number;
  };
  status: 'good' | 'needs-improvement' | 'poor';
  lastUpdated: Date;
}

interface PageGridProps {
  pageData: PageData[];
  selectedPage: string;
  onPageSelect: (pageId: string) => void;
  isLoading: boolean;
}

/**
 * Page Grid Component
 * 
 * Displays pages in a responsive grid layout with loading states.
 * 
 * @component PageGrid
 */
export default function PageGrid({ pageData, selectedPage, onPageSelect, isLoading }: PageGridProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem'
    }}>
      {isLoading ? (
        // Loading skeleton
        Array.from({ length: 6 }).map((_, index) => (
          <PageCard
            key={`loading-${index}`}
            page={{} as PageData}
            isSelected={false}
            onSelect={() => {}}
            isLoading={true}
          />
        ))
      ) : (
        pageData.map((page) => (
          <PageCard
            key={page.id}
            page={page}
            isSelected={selectedPage === page.id}
            onSelect={() => onPageSelect(page.id)}
            isLoading={false}
          />
        ))
      )}
      
      {/* CSS for pulse animation */}
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
