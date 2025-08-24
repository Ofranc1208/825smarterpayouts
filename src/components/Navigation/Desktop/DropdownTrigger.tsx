import React from 'react';

/**
 * Desktop Dropdown Trigger Component
 * 
 * A dropdown trigger button optimized for desktop navigation with consistent styling,
 * active states, and hover effects. Handles dropdown open/close logic for desktop.
 * 
 * @component DropdownTrigger
 * @author SmarterPayouts Team
 * @since 2024
 */

interface DropdownTriggerProps {
  /** Unique key for the dropdown */
  dropdownKey: string;
  /** Display label for the trigger */
  label: string;
  /** Whether this dropdown section is currently active */
  isActiveSection: boolean;
  /** Whether the dropdown is currently open */
  isDropdownOpen: boolean;
  /** Current active dropdown key */
  activeDropdown: string | null;
  /** Function to set the active dropdown */
  setActiveDropdown: (key: string | null) => void;
}

/**
 * Desktop Dropdown Label Mapping
 * 
 * Maps dropdown keys to their display labels for desktop navigation
 */
const getDesktopDropdownLabel = (key: string): string => {
  const labelMap: { [key: string]: string } = {
    whyUs: 'Why Us',
    company: 'Company Info',
    resources: 'Resources',
    process: 'Process',
    legal: 'Legal'
  };
  return labelMap[key] || key;
};

/**
 * Desktop Dropdown Trigger Component
 * 
 * Renders a clickable/hoverable trigger for desktop dropdown menus
 * with proper state management and visual feedback
 */
const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  dropdownKey,
  label,
  isActiveSection,
  isDropdownOpen,
  activeDropdown,
  setActiveDropdown
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        // Toggle on click for accessibility
        setActiveDropdown(activeDropdown === dropdownKey ? null : dropdownKey);
      }}
      onMouseEnter={() => {
        // Immediate response on hover for better UX
        setActiveDropdown(dropdownKey);
      }}
      style={{
        cursor: 'pointer',
        fontSize: '0.95rem',
        padding: '0.5rem 0.9rem',
        display: 'flex',
        alignItems: 'center',
        fontWeight: isActiveSection ? 600 : 500,
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        letterSpacing: '-0.2px',
        textDecoration: 'none',
        color: isActiveSection || isDropdownOpen ? '#09b44d' : 'inherit',
        background: isActiveSection || isDropdownOpen ? '#e9f9f1' : 'none',
        border: 'none',
      }}
    >
      {getDesktopDropdownLabel(dropdownKey)}
      <span style={{ 
        marginLeft: '4px', 
        fontSize: '0.8rem',
        transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease'
      }}>▼</span>
    </button>
  );
};

export default DropdownTrigger;
