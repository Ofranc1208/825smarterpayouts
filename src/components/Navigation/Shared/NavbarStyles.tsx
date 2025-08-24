import React from 'react';

/**
 * Shared Navbar Styles Component
 * 
 * Global styles for navigation components using styled-jsx.
 * Provides animations and responsive styles used across both
 * desktop and mobile navigation components.
 * 
 * @component NavbarStyles
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Navbar Styles Component
 * 
 * Renders global CSS styles for navigation animations and responsive behavior.
 * These styles are shared between desktop and mobile navigation components.
 */
export const NavbarStyles: React.FC = () => (
  <style jsx global>{`
    /* Fade-in animation for dropdowns */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Desktop navigation responsive behavior */
    @media (max-width: 767px) {
      .desktop-navigation {
        display: none !important;
      }
      
      .mobile-menu-button {
        display: flex !important;
      }
    }

    @media (min-width: 768px) {
      .desktop-navigation {
        display: flex !important;
      }
      
      .mobile-menu-button {
        display: none !important;
      }
    }

    /* Mobile overlay and slide animations */
    .mobile-overlay {
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .mobile-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .mobile-menu-slide {
      transform: translateX(100%);
      transition: transform 0.3s ease;
    }

    .mobile-menu-slide.open {
      transform: translateX(0);
    }

    /* Hover effects for desktop navigation */
    .desktop-navigation a:hover,
    .desktop-navigation button:hover {
      background-color: #f3f4f6;
    }

    /* Focus styles for accessibility */
    .desktop-navigation a:focus,
    .desktop-navigation button:focus,
    .mobile-menu-button:focus {
      outline: 2px solid #09b44d;
      outline-offset: 2px;
    }

    /* Mobile touch feedback */
    @media (max-width: 767px) {
      .mobile-nav-link:active,
      .mobile-dropdown-section button:active {
        background-color: #f0f0f0;
      }
    }
  `}</style>
);
