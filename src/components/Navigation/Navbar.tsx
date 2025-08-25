"use client";
import React, { Suspense } from 'react';
import { NavbarLogo, NavbarStyles, NavigationErrorBoundary, NavigationSkeleton, NavigationSEO } from './Shared';
import DesktopNavigation from './Desktop';
import MobileNavigation from './Mobile';
import { MobileMenuButton } from './Mobile';
import { dropdownMenus, searchMap } from '../../data/navigation/menuData';
import { useNavigationState } from './hooks/useNavigationState';
import { useNavigationHelpers } from './hooks/useNavigationHelpers';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { useNavigationI18n } from './hooks/useNavigationI18n';
import { useNavigationABTest } from './hooks/useNavigationABTest';
import { useNavigationAnalytics } from './hooks/useNavigationAnalytics';
import NavigationAnimations from './Shared/NavigationAnimations';

/**
 * Main Navbar Component
 * 
 * The primary navigation component that orchestrates the entire navigation system
 * using a clean folder-based architecture with dedicated Desktop/, Mobile/, and Shared/ modules.
 * 
 * Features:
 * - Folder-based modular architecture for better organization
 * - Dedicated desktop and mobile navigation modules
 * - Shared components for common functionality
 * - Custom hooks for state and logic separation
 * - Responsive desktop/mobile navigation
 * - Dropdown menus with hover/click interactions
 * - Search functionality
 * - SSR-compatible hydration
 * 
 * @component Navbar
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Main Navbar Component
 * 
 * Provides complete navigation functionality with a clean, folder-based modular architecture
 * that separates desktop, mobile, and shared concerns for maximum maintainability
 */
export default function Navbar() {
  // Navigation state and actions from custom hook
  const { state, actions } = useNavigationState();
  
  // Navigation helper functions
  const { isInDropdownSection } = useNavigationHelpers();
  
  // Internationalization
  const { t, isRTL, currentLanguage } = useNavigationI18n();
  
  // A/B Testing
  const { getVariant, trackEvent: trackABEvent } = useNavigationABTest();
  
  // Analytics
  const { 
    trackNavClick, 
    trackDropdownInteraction, 
    trackMobileMenuInteraction,
    trackPerformance 
  } = useNavigationAnalytics();

  // Extract state for cleaner component code
  const {
    isClient,
    mobileMenuOpen,
    activeDropdown,
    expandedMobileSection,
    searchValue,
    pathname
  } = state;

  const {
    toggleMobileMenu,
    setActiveDropdown,
    toggleMobileSection,
    setSearchValue,
    setMobileMenuOpen,
    closeMobileMenu
  } = actions;

  // Keyboard navigation support
  const dropdownKeys = Object.keys(dropdownMenus);
  const { focusFirstMenuItem, focusMainNavigation } = useKeyboardNavigation({
    isEnabled: isClient,
    activeDropdown,
    setActiveDropdown,
    dropdownKeys,
    closeMobileMenu
  });

  // Show skeleton during SSR hydration
  if (!isClient) {
    return <NavigationSkeleton variant="desktop" />;
  }

  // Get A/B test variants
  const layoutVariant = getVariant('nav-layout-test');
  const searchVariant = getVariant('search-placement-test');

  return (
    <NavigationErrorBoundary>
      <NavigationSEO />
      <NavbarStyles />
      <NavigationAnimations />
      
      <nav 
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1.5px solid #e0e0e0',
          minHeight: '64px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}
        data-navigation="main"
        role="banner"
        dir={isRTL ? 'rtl' : 'ltr'}
        lang={currentLanguage}
        className="navigation-container"
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 1rem',
          position: 'relative'
        }}>
          <NavbarLogo />

          {/* Desktop Navigation Module */}
          <Suspense fallback={<div style={{ width: '400px', height: '40px' }} />}>
            <DesktopNavigation
              pathname={pathname}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              dropdownMenus={dropdownMenus}
              isInDropdownSection={(items) => isInDropdownSection(items, pathname)}
            />
          </Suspense>

          {/* Mobile Menu Button */}
          <MobileMenuButton
            isOpen={mobileMenuOpen}
            onToggle={toggleMobileMenu}
          />
        </div>
      </nav>

      {/* Mobile Navigation Module */}
      <Suspense fallback={<NavigationSkeleton variant="mobile" />}>
        <MobileNavigation
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchMap={searchMap}
          dropdownMenus={dropdownMenus}
          pathname={pathname}
          expandedSection={expandedMobileSection}
          toggleMobileSection={toggleMobileSection}
        />
      </Suspense>
    </NavigationErrorBoundary>
  );
}