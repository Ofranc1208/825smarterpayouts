import React, { useState } from 'react';
import NavLink from '../../Shared/NavLink';
import MobileDropdown from './MobileDropdown';
import { mainNavLinks, dropdownSections } from '../../Desktop/data/navigationData';

/**
 * MobileMenu Component - Mobile Slide-out Menu
 * 
 * The main mobile menu panel with navigation items and dropdowns.
 * Handles the slide-out animation and menu content organization.
 * 
 * Features:
 * - Compact spacing optimized for mobile screens
 * - Accordion behavior: only one dropdown section open at a time
 * - Bottom padding ensures all items are visible
 * - Smooth animations and transitions
 */

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Handle escape key and prevent body scroll when menu is open
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      // Restore body scroll when menu is closed
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly darker overlay
    backdropFilter: 'blur(2px)', // Modern blur effect
    zIndex: 999,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother easing
    pointerEvents: isOpen ? 'auto' : 'none',
  };

  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '320px', // Slightly wider for better spacing
    maxWidth: '85vw', // Responsive on very small screens
    height: '100vh',
    backgroundColor: 'white',
    boxShadow: '-8px 0 24px rgba(0, 0, 0, 0.12)', // Softer, larger shadow
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother slide
    zIndex: 1000,
    overflowY: 'auto',
    overflowX: 'hidden',
    // Modern scrollbar styling
    scrollbarWidth: 'thin',
    scrollbarColor: '#d1d5db #f3f4f6',
    // Add padding at bottom to ensure all items are visible
    paddingBottom: '2rem',
  };

  const headerStyle: React.CSSProperties = {
    padding: '0.625rem 1rem', // Much thinner header - reduced from 1rem to 0.625rem
    borderBottom: '1px solid #e5e7eb', // Subtle border
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)', // Subtle gradient
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)', // Subtle shadow for depth
  };

  const closeButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px', // Slightly smaller button
    height: '32px', // Slightly smaller button
    background: 'rgba(5, 150, 105, 0.08)', // Light green background
    border: 'none',
    borderRadius: '6px', // Smaller border radius to match smaller button
    fontSize: '1.25rem', // Smaller X icon
    cursor: 'pointer',
    color: '#059669',
    transition: 'all 0.2s ease',
  };

  const mainLinksStyle: React.CSSProperties = {
    padding: '0.75rem 0', // Reduced vertical spacing to bring items up
    borderBottom: '1px solid #f3f4f6',
  };

  const mainLinkItemStyle: React.CSSProperties = {
    padding: '0.375rem 1rem', // Reduced padding for more compact layout
    marginBottom: '0.125rem', // Less space between items
  };

  // Handle accordion behavior: only one section can be open at a time
  // When a section is clicked, it either closes (if already open) or opens and auto-closes the previous section
  const handleSectionToggle = (sectionTitle: string) => {
    setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle);
  };

  // Prevent menu panel clicks from bubbling to overlay
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        style={overlayStyle} 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu Panel */}
      <div 
        style={menuStyle} 
        onClick={handleMenuClick}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div style={headerStyle}>
          <span style={{ 
            fontWeight: 700, 
            fontSize: '1rem', // Slightly smaller font
            color: '#059669',
            letterSpacing: '-0.01em'
          }}>
            Menu
          </span>
          <button 
            style={closeButtonStyle} 
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(5, 150, 105, 0.15)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(5, 150, 105, 0.08)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        {/* Main Navigation Links */}
        <div style={mainLinksStyle}>
          {mainNavLinks.map((link) => (
            <div key={link.href} style={mainLinkItemStyle}>
              <NavLink href={link.href} icon={link.icon} onClick={onClose}>
                {link.label}
              </NavLink>
            </div>
          ))}
        </div>

        {/* Dropdown Sections */}
        {Object.entries(dropdownSections).map(([title, items]) => (
          <MobileDropdown
            key={title}
            title={title}
            items={items}
            isExpanded={expandedSection === title}
            onToggle={() => handleSectionToggle(title)}
            onItemClick={onClose}
          />
        ))}
      </div>
    </>
  );
};

export default MobileMenu;
