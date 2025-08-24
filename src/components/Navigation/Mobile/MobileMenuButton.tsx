import React from 'react';

/**
 * Mobile Menu Button Component
 * 
 * A hamburger menu button specifically designed for mobile navigation with
 * touch-friendly sizing, proper accessibility attributes, and mobile-optimized styling.
 * 
 * @component MobileMenuButton
 * @author SmarterPayouts Team
 * @since 2024
 */

interface MobileMenuButtonProps {
  /** Whether the mobile menu is currently open */
  isOpen: boolean;
  /** Function to toggle the mobile menu */
  onToggle: () => void;
}

/**
 * Mobile Menu Button Component
 * 
 * Renders a hamburger menu button with proper styling, accessibility,
 * and touch-friendly interactions optimized for mobile devices
 */
const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ 
  isOpen, 
  onToggle 
}) => {
  return (
    <button
      onClick={onToggle}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        padding: '0.5rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '44px', // Touch-friendly minimum height
        minWidth: '44px'   // Touch-friendly minimum width
      }}
      className="mobile-menu-button"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M3 12h18M3 6h18M3 18h18"/>
      </svg>
    </button>
  );
};

export default MobileMenuButton;
