import { useEffect, useCallback } from 'react';

/**
 * Keyboard Navigation Hook
 * 
 * Provides keyboard navigation support for navigation components.
 * Handles arrow keys, Enter, Escape, and Tab navigation for accessibility.
 * 
 * @hook useKeyboardNavigation
 * @author SmarterPayouts Team
 * @since 2024
 */

interface UseKeyboardNavigationProps {
  /** Whether keyboard navigation is enabled */
  isEnabled: boolean;
  /** Current active dropdown */
  activeDropdown: string | null;
  /** Function to set active dropdown */
  setActiveDropdown: (key: string | null) => void;
  /** Available dropdown keys */
  dropdownKeys: string[];
  /** Function to close mobile menu */
  closeMobileMenu?: () => void;
}

/**
 * Keyboard Navigation Hook
 * 
 * Provides comprehensive keyboard navigation support for better accessibility
 */
export const useKeyboardNavigation = ({
  isEnabled,
  activeDropdown,
  setActiveDropdown,
  dropdownKeys,
  closeMobileMenu
}: UseKeyboardNavigationProps) => {

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isEnabled) return;

    switch (event.key) {
      case 'Escape':
        // Close any open dropdowns or mobile menu
        if (activeDropdown) {
          setActiveDropdown(null);
          event.preventDefault();
        } else if (closeMobileMenu) {
          closeMobileMenu();
          event.preventDefault();
        }
        break;

      case 'ArrowDown':
        // Open first dropdown if none is active
        if (!activeDropdown && dropdownKeys.length > 0) {
          setActiveDropdown(dropdownKeys[0]);
          event.preventDefault();
        }
        break;

      case 'ArrowRight':
        // Navigate to next dropdown
        if (activeDropdown) {
          const currentIndex = dropdownKeys.indexOf(activeDropdown);
          const nextIndex = (currentIndex + 1) % dropdownKeys.length;
          setActiveDropdown(dropdownKeys[nextIndex]);
          event.preventDefault();
        }
        break;

      case 'ArrowLeft':
        // Navigate to previous dropdown
        if (activeDropdown) {
          const currentIndex = dropdownKeys.indexOf(activeDropdown);
          const prevIndex = currentIndex === 0 ? dropdownKeys.length - 1 : currentIndex - 1;
          setActiveDropdown(dropdownKeys[prevIndex]);
          event.preventDefault();
        }
        break;

      case 'Tab':
        // Close dropdowns when tabbing away
        if (activeDropdown && !event.shiftKey) {
          // Small delay to allow focus to move
          setTimeout(() => {
            const focusedElement = document.activeElement;
            const isWithinNavigation = focusedElement?.closest('[data-navigation]');
            if (!isWithinNavigation) {
              setActiveDropdown(null);
            }
          }, 0);
        }
        break;

      case 'Enter':
      case ' ':
        // Handle Enter/Space on focused navigation elements
        const focusedElement = document.activeElement as HTMLElement;
        if (focusedElement?.getAttribute('role') === 'button' && 
            focusedElement?.closest('[data-navigation]')) {
          focusedElement.click();
          event.preventDefault();
        }
        break;
    }
  }, [isEnabled, activeDropdown, setActiveDropdown, dropdownKeys, closeMobileMenu]);

  useEffect(() => {
    if (isEnabled) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isEnabled, handleKeyDown]);

  // Focus management utilities
  const focusFirstMenuItem = useCallback((dropdownKey: string) => {
    const dropdown = document.querySelector(`[data-dropdown="${dropdownKey}"]`);
    const firstMenuItem = dropdown?.querySelector('a, button');
    if (firstMenuItem instanceof HTMLElement) {
      firstMenuItem.focus();
    }
  }, []);

  const focusMainNavigation = useCallback(() => {
    const mainNav = document.querySelector('[data-navigation="main"]');
    const firstLink = mainNav?.querySelector('a, button');
    if (firstLink instanceof HTMLElement) {
      firstLink.focus();
    }
  }, []);

  return {
    focusFirstMenuItem,
    focusMainNavigation
  };
};
