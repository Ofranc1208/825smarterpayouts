'use client';

import { 
  useScreenReaderAnnouncements, 
  useKeyboardNavigation, 
  useFocusManagement, 
  useAccessibilityValidation 
} from './accessibility';

/**
 * Settlement Law Accessibility Hook - Main Orchestrator
 * Following enterprise patterns - clean orchestrator under 50 lines
 * 
 * Provides comprehensive accessibility features by composing focused hooks
 */
export default function useSettlementLawAccessibility() {
  // Screen reader functionality
  const screenReader = useScreenReaderAnnouncements();
  
  // Keyboard navigation
  const keyboard = useKeyboardNavigation(screenReader.announceToScreenReader);
  
  // Focus management
  const focus = useFocusManagement(screenReader.announceToScreenReader);
  
  // Accessibility validation
  const validation = useAccessibilityValidation();

  // Return combined interface
  return {
    // Screen reader functions
    ...screenReader,
    
    // Keyboard navigation
    ...keyboard,
    
    // Focus management
    ...focus,
    
    // Validation functions
    ...validation
  };
}