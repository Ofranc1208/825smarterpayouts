/**
 * Navigation Module Export
 * 
 * Central export for the complete folder-based modular navigation system.
 * This module provides a scalable, maintainable navigation architecture with:
 * 
 * **Folder Structure:**
 * - Desktop/ - Desktop-specific navigation components
 * - Mobile/ - Mobile-specific navigation components  
 * - Shared/ - Common components used across desktop and mobile
 * - hooks/ - Custom hooks for state and logic management
 * 
 * **Features:**
 * - Clean separation of concerns between desktop and mobile
 * - Modular sub-components for better organization
 * - Custom hooks for state and logic separation
 * - Responsive design with platform-specific optimizations
 * - Touch-friendly mobile interface
 * - Hover-optimized desktop interface
 * - Search functionality
 * - Dropdown menus with smooth interactions
 * 
 * @module Navigation
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main navigation component
export { default } from './Navbar';
export { default as Navbar } from './Navbar';

// Desktop navigation module
export { default as DesktopNavigation } from './Desktop';
export * from './Desktop';

// Mobile navigation module  
export { default as MobileNavigation } from './Mobile';
export * from './Mobile';

// Shared navigation components
export * from './Shared';

// Custom hooks
export { useNavigationState } from './hooks/useNavigationState';
export { useNavigationHelpers } from './hooks/useNavigationHelpers';
export { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
export { useNavigationI18n } from './hooks/useNavigationI18n';
export { useNavigationABTest } from './hooks/useNavigationABTest';
export { useNavigationAnalytics } from './hooks/useNavigationAnalytics';

// Navigation data and types (re-exported for convenience)
export { processRoutes, dropdownMenus, searchMap } from '../../data/navigation/menuData';
export type { NavItem, DropdownMenus, NavbarProps } from '../../data/navigation/types';

// Hook types (for external usage)
export type { NavigationState, NavigationActions } from './hooks/useNavigationState';
export type { NavigationHelpers } from './hooks/useNavigationHelpers';