'use client';

import { useCallback, useEffect } from 'react';
import { useA11yLandmarks } from './useA11yLandmarks';

/**
 * Keyboard shortcuts for accessibility navigation
 * Implements common accessibility keyboard patterns
 */
export function useA11yShortcuts() {
  const { skipToMain, skipToNavigation, announceToScreenReader } = useA11yLandmarks();

  // Handle keyboard navigation shortcuts
  const handleKeyboardNavigation = useCallback((event: KeyboardEvent) => {
    // Skip to main content (Alt + 1)
    if (event.altKey && event.key === '1') {
      event.preventDefault();
      skipToMain();
    }
    
    // Skip to navigation (Alt + 2)
    if (event.altKey && event.key === '2') {
      event.preventDefault();
      skipToNavigation();
    }
    
    // Show help (Alt + H)
    if (event.altKey && event.key.toLowerCase() === 'h') {
      event.preventDefault();
      announceToScreenReader(
        'Keyboard shortcuts: Alt+1 for main content, Alt+2 for navigation, Alt+H for help',
        'assertive'
      );
    }
    
    // Escape key handling
    if (event.key === 'Escape') {
      const activeModal = document.querySelector('[role="dialog"][aria-modal="true"]');
      if (activeModal) {
        const closeButton = activeModal.querySelector('[aria-label*="close"], [aria-label*="Close"]') as HTMLElement;
        closeButton?.click();
      }
    }
  }, [skipToMain, skipToNavigation, announceToScreenReader]);

  // Form navigation shortcuts
  const handleFormShortcuts = useCallback((event: KeyboardEvent) => {
    // Navigate between form sections with Ctrl + Arrow keys
    if (event.ctrlKey) {
      const formSections = Array.from(document.querySelectorAll('fieldset, [role="group"]'));
      const currentSection = formSections.find(section => 
        section.contains(document.activeElement)
      );
      
      if (currentSection) {
        const currentIndex = formSections.indexOf(currentSection);
        let nextIndex = currentIndex;
        
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
          nextIndex = Math.min(currentIndex + 1, formSections.length - 1);
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
          nextIndex = Math.max(currentIndex - 1, 0);
        }
        
        if (nextIndex !== currentIndex) {
          event.preventDefault();
          const nextSection = formSections[nextIndex] as HTMLElement;
          const firstInput = nextSection.querySelector('input, select, textarea, button') as HTMLElement;
          firstInput?.focus();
          
          const sectionName = nextSection.getAttribute('aria-label') || 
                             nextSection.querySelector('legend')?.textContent || 
                             'Form section';
          announceToScreenReader(`Moved to ${sectionName}`);
        }
      }
    }
  }, [announceToScreenReader]);

  // Setup keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardNavigation);
    document.addEventListener('keydown', handleFormShortcuts);
    
    return () => {
      document.removeEventListener('keydown', handleKeyboardNavigation);
      document.removeEventListener('keydown', handleFormShortcuts);
    };
  }, [handleKeyboardNavigation, handleFormShortcuts]);

  return {
    handleKeyboardNavigation,
    handleFormShortcuts
  };
}
