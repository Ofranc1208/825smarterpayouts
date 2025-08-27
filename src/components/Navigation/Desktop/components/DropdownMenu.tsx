import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import NavLink from '../../Shared/NavLink';

/**
 * DropdownMenu Component - Desktop Dropdown Navigation
 * 
 * Handles individual dropdown menus with click-to-open/close behavior.
 * Features:
 * - Click to open dropdown (stays open)
 * - Click outside to close
 * - Click on item to close and navigate
 * - Smooth animations with pure inline styles
 * - No CSS dependencies
 */

interface DropdownItem {
  href: string;
  label: string;
  icon?: string;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
  isMobile: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, items, isMobile }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if current path is in this dropdown section
  const isActive = items.some(item => pathname === item.href);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle dropdown toggle
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Handle item click - close dropdown
  const handleItemClick = () => {
    setIsOpen(false);
  };

  const dropdownContainerStyle: React.CSSProperties = {
    position: 'relative',
  };

  const dropdownTriggerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.5rem 0.75rem',
    backgroundColor: isActive || isOpen ? '#f0fdf4' : 'transparent',
    color: isActive || isOpen ? '#09b44d' : '#374151',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: isActive ? 600 : 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    minWidth: 'fit-content',
  };

  const dropdownMenuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: '0',
    backgroundColor: 'white',
    border: '2px solid #09b44d',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(9, 180, 77, 0.15)',
    minWidth: '250px',
    padding: '0.75rem 0',
    zIndex: 1000,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.95)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: isOpen ? 'auto' : 'none',
    marginTop: '0.5rem',
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    display: 'block',
  };

  const arrowStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
  };

  return (
    <div
      ref={dropdownRef}
      style={dropdownContainerStyle}
    >
      <button 
        style={dropdownTriggerStyle}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {title}
        <span style={arrowStyle}>▼</span>
      </button>
      
      <div style={dropdownMenuStyle}>
        {items.map((item) => (
          <div key={item.href} style={dropdownItemStyle} onClick={handleItemClick}>
            <NavLink href={item.href} icon={item.icon}>
              {item.label}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
