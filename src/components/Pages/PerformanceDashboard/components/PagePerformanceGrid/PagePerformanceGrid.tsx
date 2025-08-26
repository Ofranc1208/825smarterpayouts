'use client';

import React from 'react';
import { PageGridHeader, PageGrid } from './components';

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

interface PagePerformanceGridProps {
  pageData: PageData[];
  selectedPage: string;
  onPageSelect: (pageId: string) => void;
  isLoading: boolean;
}

/**
 * Page Performance Grid Component
 * 
 * Main orchestrator for page performance display.
 * Composes header and grid components for clean separation of concerns.
 * 
 * @component PagePerformanceGrid
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function PagePerformanceGrid({
  pageData,
  selectedPage,
  onPageSelect,
  isLoading
}: PagePerformanceGridProps) {
  return (
    <section>
      <PageGridHeader />
      <PageGrid
        pageData={pageData}
        selectedPage={selectedPage}
        onPageSelect={onPageSelect}
        isLoading={isLoading}
      />
    </section>
  );
}