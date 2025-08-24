import { useCallback } from 'react';
import { NavItem } from '../../../data/navigation/types';
import { processRoutes } from '../../../data/navigation/menuData';

/**
 * Navigation Helpers Hook
 * 
 * Provides utility functions for navigation logic including
 * active state detection and route checking.
 * 
 * @hook useNavigationHelpers
 * @author SmarterPayouts Team
 * @since 2024
 */

export interface NavigationHelpers {
  /** Check if current path is in the process section */
  isInProcessSection: (pathname: string) => boolean;
  
  /** Check if current path is in a dropdown section */
  isInDropdownSection: (items: NavItem[], pathname: string) => boolean;
  
  /** Check if a specific path is active */
  isPathActive: (href: string, pathname: string) => boolean;
  
  /** Get the display label for a dropdown key */
  getDropdownLabel: (key: string) => string;
  
  /** Get the icon for a main navigation item */
  getNavIcon: (href: string) => string;
}

/**
 * Navigation Helpers Hook
 * 
 * Provides memoized utility functions for navigation components
 */
export const useNavigationHelpers = (): NavigationHelpers => {
  
  // Check if current path is in the process section
  const isInProcessSection = useCallback((pathname: string) => {
    return processRoutes.includes(pathname);
  }, []);

  // Check if current path is in a dropdown section
  const isInDropdownSection = useCallback((items: NavItem[], pathname: string) => {
    return items.some(item => pathname === item.href);
  }, []);

  // Check if a specific path is active
  const isPathActive = useCallback((href: string, pathname: string) => {
    return pathname === href;
  }, []);

  // Get the display label for a dropdown key
  const getDropdownLabel = useCallback((key: string): string => {
    const labelMap: { [key: string]: string } = {
      whyUs: 'Why Us',
      company: 'Company Info',
      resources: 'Resources',
      process: 'Process',
      legal: 'Legal'
    };
    return labelMap[key] || key;
  }, []);

  // Get the icon for a main navigation item
  const getNavIcon = useCallback((href: string): string => {
    const iconMap: { [key: string]: string } = {
      '/main': '🏠',
      '/mint-intelligent-chat': '🤖',
      '/pricing-calculator': '🧮'
    };
    return iconMap[href] || '';
  }, []);

  return {
    isInProcessSection,
    isInDropdownSection,
    isPathActive,
    getDropdownLabel,
    getNavIcon
  };
};
