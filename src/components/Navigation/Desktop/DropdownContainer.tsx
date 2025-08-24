import React from 'react';
import { NavItem } from '../../../data/navigation/types';
import DropdownTrigger from './DropdownTrigger';
import DropdownMenu from './DropdownMenu';

/**
 * Desktop Dropdown Container Component
 * 
 * A complete dropdown component that combines the trigger and menu
 * with proper hover/click handling and positioning for desktop navigation.
 * 
 * @component DropdownContainer
 * @author SmarterPayouts Team
 * @since 2024
 */

interface DropdownContainerProps {
  /** Unique key for the dropdown */
  dropdownKey: string;
  /** Array of navigation items for the dropdown */
  items: NavItem[];
  /** Current pathname for active state detection */
  pathname: string;
  /** Current active dropdown key */
  activeDropdown: string | null;
  /** Function to set the active dropdown */
  setActiveDropdown: (key: string | null) => void;
  /** Function to check if current path is in dropdown section */
  isInDropdownSection: (items: NavItem[]) => boolean;
}

/**
 * Desktop Dropdown Container Component
 * 
 * Orchestrates the complete dropdown functionality including
 * trigger, menu, hover handling, and state management for desktop
 */
const DropdownContainer: React.FC<DropdownContainerProps> = ({
  dropdownKey,
  items,
  pathname,
  activeDropdown,
  setActiveDropdown,
  isInDropdownSection
}) => {
  const isActiveSection = isInDropdownSection(items);
  const isDropdownOpen = activeDropdown === dropdownKey;

  return (
    <div 
      className="dropdown-container"
      style={{ position: 'relative' }}
      onMouseEnter={() => {
        // 2025 Best Practice: Auto-close other dropdowns and open this one on hover
        setActiveDropdown(dropdownKey);
      }}
      onMouseLeave={(e) => {
        // Check if we're moving to a child element (the dropdown)
        const relatedTarget = e.relatedTarget as Element;
        const currentTarget = e.currentTarget as Element;
        
        // Don't close if we're moving to the dropdown or any of its children
        if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
          // Small delay to allow moving to dropdown
          setTimeout(() => {
            setActiveDropdown(null);
          }, 100);
        }
      }}
      data-dropdown={dropdownKey}
    >
      <DropdownTrigger
        dropdownKey={dropdownKey}
        label={dropdownKey}
        isActiveSection={isActiveSection}
        isDropdownOpen={isDropdownOpen}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />
      
      <DropdownMenu
        items={items}
        isOpen={isDropdownOpen}
        dropdownKey={dropdownKey}
        pathname={pathname}
      />
    </div>
  );
};

export default DropdownContainer;
