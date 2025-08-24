/**
 * Mobile Navigation Module Export
 * 
 * Central export for all mobile navigation components.
 * This module provides mobile-specific navigation functionality with:
 * - Touch-friendly interactions and sizing
 * - Mobile-optimized layouts and animations
 * - Slide-out menu with overlay
 * - Collapsible sections for better mobile UX
 * - Search functionality optimized for mobile
 * 
 * @module Mobile Navigation
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main mobile navigation component
export { default } from './MobileNavigation';
export { default as MobileNavigation } from './MobileNavigation';

// Mobile-specific navigation components
export { default as MobileMenuButton } from './MobileMenuButton';
export { default as MobileNavLink } from './MobileNavLink';
export { default as MobileSearchBar } from './MobileSearchBar';
export { default as MobileDropdownSection } from './MobileDropdownSection';
