/**
 * Navigation - CSS-Free Navigation System
 * 
 * A completely self-contained navigation system with zero CSS dependencies.
 * Built with pure React and inline styles for maximum reliability and portability.
 * 
 * Features:
 * - Zero CSS files or className dependencies
 * - Pure inline styles with React state
 * - Responsive desktop/mobile switching
 * - Smooth dropdown functionality
 * - All navigation items from original system
 * 
 * @module Navigation
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main navigation component export
export { default } from './DualNavbar';
export { default as Navbar } from './DualNavbar';
export { default as DualNavbar } from './DualNavbar'; // Keep for backward compatibility

// Sub-components (for potential future use)
export { default as DesktopNav } from './Desktop';
export { default as MobileNav } from './Mobile';
export { default as NavLink } from './Shared/NavLink';
