'use client';

// Refactored accessibility hook - now uses modular sub-hooks
// Original 225 lines split into focused modules for better maintainability

import { useA11yFocus } from './accessibility/useA11yFocus';
import { useA11yLandmarks } from './accessibility/useA11yLandmarks';
import { useA11yShortcuts } from './accessibility/useA11yShortcuts';

/**
 * Main accessibility hook for CourtApproval page
 * Orchestrates all accessibility features using modular sub-hooks
 */
export function useCourtApprovalAccessibility() {
  // Focus management utilities
  const focusUtils = useA11yFocus();
  
  // Landmark navigation and announcements
  const landmarkUtils = useA11yLandmarks();
  
  // Keyboard shortcuts (auto-initializes event listeners)
  const shortcutUtils = useA11yShortcuts();

  // Combined interface for backward compatibility
  return {
    // Focus management
    trapFocus: focusUtils.trapFocus,
    restoreFocus: focusUtils.restoreFocus,
    focusFirstError: focusUtils.focusFirstError,
    
    // Landmark navigation
    announceToScreenReader: landmarkUtils.announceToScreenReader,
    navigateToLandmark: landmarkUtils.navigateToLandmark,
    skipToMain: landmarkUtils.skipToMain,
    skipToNavigation: landmarkUtils.skipToNavigation,
    
    // Keyboard shortcuts
    handleKeyboardNavigation: shortcutUtils.handleKeyboardNavigation,
    handleFormShortcuts: shortcutUtils.handleFormShortcuts
  };
}