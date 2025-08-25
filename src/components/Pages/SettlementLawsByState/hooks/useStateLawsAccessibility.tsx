// Accessibility hook for Settlement Laws page
// Simple hook - under 50 lines per complexity rule

'use client';

import { useEffect, useCallback } from 'react';

export function useStateLawsAccessibility() {
  // Announce search results to screen readers
  const announceSearchResults = useCallback((resultsCount: number, query: string) => {
    if (typeof window !== 'undefined') {
      const announcement = resultsCount === 0 
        ? `No states found for "${query}"`
        : `Found ${resultsCount} state${resultsCount === 1 ? '' : 's'} matching "${query}"`;
      
      // Create live region for screen reader announcement
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.textContent = announcement;
      
      document.body.appendChild(liveRegion);
      
      setTimeout(() => {
        document.body.removeChild(liveRegion);
      }, 1000);
    }
  }, []);

  // Announce accordion state changes
  const announceAccordionChange = useCallback((stateName: string, isOpen: boolean) => {
    if (typeof window !== 'undefined') {
      const announcement = isOpen 
        ? `${stateName} legal information expanded`
        : `${stateName} legal information collapsed`;
      
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.textContent = announcement;
      
      document.body.appendChild(liveRegion);
      
      setTimeout(() => {
        document.body.removeChild(liveRegion);
      }, 1000);
    }
  }, []);

  // Set up keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Add keyboard shortcuts for common actions
      if (event.ctrlKey && event.key === '/') {
        event.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    announceSearchResults,
    announceAccordionChange
  };
}
