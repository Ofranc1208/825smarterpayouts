import React from 'react';

/**
 * Navigation Animations Component
 * 
 * Advanced CSS animations and micro-interactions for navigation components.
 * Provides delightful user experiences with smooth, performant animations.
 * 
 * @component NavigationAnimations
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Navigation Animations Styles
 * 
 * Comprehensive animation library for navigation components with
 * micro-interactions, hover effects, and smooth transitions
 */
export const NavigationAnimations: React.FC = () => (
  <style jsx global>{`
    /* ===== MICRO-INTERACTIONS ===== */
    
    /* Logo hover animation */
    .navbar-logo {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .navbar-logo:hover {
      transform: scale(1.05);
      filter: brightness(1.1);
    }
    
    .navbar-logo:active {
      transform: scale(0.98);
    }

    /* Navigation link hover effects */
    .nav-link {
      position: relative;
      transition: all 0.2s ease;
      overflow: hidden;
    }
    
    .nav-link::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #09b44d, #0ea5e9);
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-link:hover::before {
      width: 100%;
    }
    
    .nav-link:hover {
      transform: translateY(-1px);
      color: #09b44d;
    }

    /* ===== DROPDOWN ANIMATIONS ===== */
    
    /* Dropdown container */
    .dropdown-container {
      position: relative;
    }
    
    /* Dropdown menu entrance */
    @keyframes dropdownSlideIn {
      0% {
        opacity: 0;
        transform: translateY(-10px) scale(0.95);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @keyframes dropdownSlideOut {
      0% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-10px) scale(0.95);
      }
    }
    
    .dropdown-menu {
      animation: dropdownSlideIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: top center;
    }
    
    .dropdown-menu.closing {
      animation: dropdownSlideOut 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Dropdown trigger arrow rotation */
    .dropdown-trigger-arrow {
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .dropdown-trigger[aria-expanded="true"] .dropdown-trigger-arrow {
      transform: rotate(180deg);
    }

    /* Dropdown item hover effects */
    .dropdown-item {
      position: relative;
      transition: all 0.15s ease;
    }
    
    .dropdown-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background: linear-gradient(90deg, rgba(9, 180, 77, 0.1), transparent);
      transition: width 0.2s ease;
      border-radius: 6px;
    }
    
    .dropdown-item:hover::before {
      width: 100%;
    }
    
    .dropdown-item:hover {
      transform: translateX(4px);
      color: #09b44d;
    }

    /* ===== MOBILE MENU ANIMATIONS ===== */
    
    /* Mobile menu button animation */
    .mobile-menu-button {
      transition: all 0.2s ease;
    }
    
    .mobile-menu-button:hover {
      transform: scale(1.1);
      background-color: rgba(9, 180, 77, 0.1);
      border-radius: 8px;
    }
    
    .mobile-menu-button:active {
      transform: scale(0.95);
    }

    /* Hamburger menu icon animation */
    .hamburger-icon {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hamburger-icon.open {
      transform: rotate(90deg);
    }

    /* Mobile overlay entrance */
    .mobile-overlay {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(0px);
    }
    
    .mobile-overlay.open {
      backdrop-filter: blur(4px);
    }

    /* Mobile menu slide animation */
    .mobile-menu-slide {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .mobile-menu-slide.open {
      transform: translateX(0);
    }

    /* Mobile menu items stagger animation */
    .mobile-nav-item {
      opacity: 0;
      transform: translateX(20px);
      transition: all 0.2s ease;
    }
    
    .mobile-menu-slide.open .mobile-nav-item {
      opacity: 1;
      transform: translateX(0);
    }
    
    .mobile-menu-slide.open .mobile-nav-item:nth-child(1) { transition-delay: 0.1s; }
    .mobile-menu-slide.open .mobile-nav-item:nth-child(2) { transition-delay: 0.15s; }
    .mobile-menu-slide.open .mobile-nav-item:nth-child(3) { transition-delay: 0.2s; }
    .mobile-menu-slide.open .mobile-nav-item:nth-child(4) { transition-delay: 0.25s; }
    .mobile-menu-slide.open .mobile-nav-item:nth-child(5) { transition-delay: 0.3s; }

    /* ===== SEARCH ANIMATIONS ===== */
    
    /* Search bar focus animation */
    .search-input {
      transition: all 0.2s ease;
      position: relative;
    }
    
    .search-input:focus {
      transform: scale(1.02);
      box-shadow: 0 0 0 3px rgba(9, 180, 77, 0.1);
    }

    /* Search results animation */
    @keyframes searchResultsSlideIn {
      0% {
        opacity: 0;
        transform: translateY(-10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .search-results {
      animation: searchResultsSlideIn 0.2s ease;
    }

    /* ===== LOADING ANIMATIONS ===== */
    
    /* Skeleton pulse animation */
    @keyframes skeletonPulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
    }
    
    .skeleton {
      animation: skeletonPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    /* Loading spinner */
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .loading-spinner {
      animation: spin 1s linear infinite;
    }

    /* ===== ACCESSIBILITY ANIMATIONS ===== */
    
    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
      .nav-link,
      .dropdown-menu,
      .mobile-menu-slide,
      .mobile-nav-item,
      .search-input,
      .navbar-logo {
        animation: none !important;
        transition: none !important;
      }
      
      .nav-link:hover {
        transform: none;
      }
      
      .navbar-logo:hover {
        transform: none;
      }
    }

    /* ===== FOCUS ANIMATIONS ===== */
    
    /* Enhanced focus indicators */
    .nav-link:focus,
    .dropdown-trigger:focus,
    .mobile-menu-button:focus {
      outline: 2px solid #09b44d;
      outline-offset: 2px;
      border-radius: 4px;
      animation: focusPulse 1s ease-in-out infinite alternate;
    }
    
    @keyframes focusPulse {
      0% {
        outline-color: #09b44d;
      }
      100% {
        outline-color: rgba(9, 180, 77, 0.6);
      }
    }

    /* ===== PERFORMANCE OPTIMIZATIONS ===== */
    
    /* GPU acceleration for smooth animations */
    .nav-link,
    .dropdown-menu,
    .mobile-menu-slide,
    .navbar-logo {
      will-change: transform;
      backface-visibility: hidden;
      perspective: 1000px;
    }
    
    /* Optimize repaints */
    .dropdown-container,
    .mobile-menu-container {
      contain: layout style paint;
    }

    /* ===== HOVER STATES ===== */
    
    /* Subtle hover effects for better UX */
    .interactive-element {
      transition: all 0.2s ease;
      cursor: pointer;
    }
    
    .interactive-element:hover {
      filter: brightness(1.05);
    }
    
    .interactive-element:active {
      filter: brightness(0.95);
      transform: scale(0.98);
    }

    /* ===== THEME TRANSITIONS ===== */
    
    /* Smooth theme switching */
    .navigation-container {
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }
    
    /* Dark mode transitions */
    @media (prefers-color-scheme: dark) {
      .navigation-container {
        background-color: #1f2937;
        color: #f9fafb;
        border-color: #374151;
      }
      
      .nav-link:hover {
        color: #10b981;
      }
      
      .dropdown-menu {
        background-color: #374151;
        border-color: #10b981;
      }
    }
  `}</style>
);

export default NavigationAnimations;
