import React, { memo } from 'react';
import { NavItem } from '../../../data/navigation/types';
import NavLink from '../Shared/NavLink';
import DropdownContainer from './DropdownContainer';

/**
 * Desktop Navigation Component
 * 
 * Main desktop navigation component that orchestrates all desktop-specific
 * navigation elements including main links and dropdown menus.
 * 
 * @component DesktopNavigation
 * @author SmarterPayouts Team
 * @since 2024
 */

interface DesktopNavigationProps {
  pathname: string;
  activeDropdown: string | null;
  setActiveDropdown: (key: string | null) => void;
  dropdownMenus: { [key: string]: NavItem[] };
  isInDropdownSection: (items: NavItem[]) => boolean;
}

/**
 * Main Navigation Links Configuration
 * 
 * Defines the primary navigation links displayed in the desktop menu
 */
const mainNavLinks = [
  { href: '/main', label: 'Home', icon: '' },
  { href: '/mint-intelligent-chat', label: 'Mint AI Chat', icon: '🤖' },
  { href: '/pricing-calculator', label: 'Early Payout Calculator', icon: '' }
];

/**
 * Desktop Navigation Component
 * 
 * Renders a clean, modular desktop navigation using dedicated desktop
 * sub-components for better maintainability and desktop-specific optimization
 */
const DesktopNavigation = memo(function DesktopNavigation({ 
  pathname, 
  activeDropdown, 
  setActiveDropdown, 
  dropdownMenus,
  isInDropdownSection 
}: DesktopNavigationProps) {
  return (
    <nav 
      role="navigation"
      aria-label="Main navigation"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }} 
      className="desktop-navigation"
    >
      {/* Main Navigation Links */}
      {mainNavLinks.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          pathname={pathname}
          icon={link.icon}
        >
          {link.label}
        </NavLink>
      ))}

      {/* Desktop Dropdown Menus */}
      {Object.entries(dropdownMenus).map(([key, items]) => (
        <DropdownContainer
          key={key}
          dropdownKey={key}
          items={items}
          pathname={pathname}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          isInDropdownSection={isInDropdownSection}
        />
      ))}
    </nav>
  );
});

export default DesktopNavigation;
