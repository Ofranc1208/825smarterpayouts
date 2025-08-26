'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Navigation State Hook
 * 
 * Manages all navigation-related state including mobile menu,
 * dropdowns, responsive behavior, and active states.
 * 
 * @hook useNavigationState
 * @author SmarterPayouts Team
 * @since 2024
 */

export interface NavigationState {
  // Responsive state
  isMobile: boolean;
  isClient: boolean;
  
  // Menu state
  mobileMenuOpen: boolean;
  activeDropdown: string | null;
  expandedMobileSection: string | null;
  
  // Search state
  searchValue: string;
  
  // Current route
  pathname: string;
}

export interface NavigationActions {
  // Mobile menu actions
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  
  // Dropdown actions
  setActiveDropdown: (key: string | null) => void;
  closeAllDropdowns: () => void;
  
  // Mobile section actions
  setExpandedMobileSection: (key: string | null) => void;
  toggleMobileSection: (key: string) => void;
  
  // Search actions
  setSearchValue: (value: string) => void;
  clearSearch: () => void;
}

/**
 * Navigation State Hook
 * 
 * Provides centralized state management for all navigation components
 * with proper responsive behavior and cleanup
 */
export const useNavigationState = () => {
  const pathname = usePathname();
  
  // Responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  
  // Search state
  const [searchValue, setSearchValue] = useState('');

  // Client-side hydration and mobile detection
  useEffect(() => {
    setIsClient(true);
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Close menus when pathname changes
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setExpandedMobileSection(null);
  }, [pathname]);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Don't close if clicking within a dropdown
      if (target && typeof target.closest === 'function' && !target.closest('[data-dropdown]')) {
        setActiveDropdown(null);
      }
    };
    
    const handleMouseLeave = (event: MouseEvent) => {
      const target = event.target as Element;
      // Only close if mouse truly leaves the entire navbar area
      if (target && typeof target.closest === 'function' && !target.closest('nav')) {
        setTimeout(() => {
          setActiveDropdown(null);
        }, 200);
      }
    };
    
    if (activeDropdown && typeof document !== 'undefined') {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('mouseleave', handleMouseLeave, true);
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('mouseleave', handleMouseLeave, true);
      };
    }
  }, [activeDropdown]);

  // Actions
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setExpandedMobileSection(null);
  };
  
  const closeAllDropdowns = () => setActiveDropdown(null);
  
  const toggleMobileSection = (key: string) => {
    setExpandedMobileSection(prev => prev === key ? null : key);
  };
  
  const clearSearch = () => setSearchValue('');

  // State object
  const state: NavigationState = {
    isMobile,
    isClient,
    mobileMenuOpen,
    activeDropdown,
    expandedMobileSection,
    searchValue,
    pathname
  };

  // Actions object
  const actions: NavigationActions = {
    setMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    setActiveDropdown,
    closeAllDropdowns,
    setExpandedMobileSection,
    toggleMobileSection,
    setSearchValue,
    clearSearch
  };

  return { state, actions };
};
