/**
 * Navigation Types
 * 
 * Type definitions for the navigation system components.
 * These types ensure type safety across all navigation components.
 * 
 * @module NavigationTypes
 * @author SmarterPayouts Team
 * @since 2024
 */

export interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export interface DropdownMenus {
  [key: string]: NavItem[];
}

export interface NavbarProps {
  pathname: string;
  isMobile: boolean;
  isClient: boolean;
}
