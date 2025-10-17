import React from 'react';
import NavLink from '../../Shared/NavLink';
import DropdownMenu from './DropdownMenu';
import { mainNavLinks, dropdownSections } from '../data/navigationData';

/**
 * NavigationItems Component - Desktop Navigation Items Renderer
 * 
 * Renders all navigation items including main links and dropdown menus.
 * Orchestrates the layout and organization of navigation elements.
 */

interface NavigationItemsProps {
  isMobile: boolean;
}

const NavigationItems: React.FC<NavigationItemsProps> = ({ isMobile }) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    flexWrap: 'nowrap',
    overflow: 'visible',
    flexShrink: 1,
    minWidth: 0,
  };

  return (
    <nav style={containerStyle}>
      {/* Main Navigation Links */}
      {mainNavLinks.map((link) => (
        <NavLink key={link.href} href={link.href} icon={link.icon}>
          {link.label}
        </NavLink>
      ))}

      {/* Dropdown Menus */}
      {Object.entries(dropdownSections).map(([title, items]) => (
        <DropdownMenu
          key={title}
          title={title}
          items={items}
          isMobile={isMobile}
        />
      ))}
    </nav>
  );
};

export default NavigationItems;
