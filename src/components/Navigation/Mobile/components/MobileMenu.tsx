import React, { useState } from 'react';
import NavLink from '../../Shared/NavLink';
import MobileDropdown from './MobileDropdown';
import { mainNavLinks, dropdownSections } from '../../Shared/navigationData';

/**
 * MobileMenu Component - Mobile Slide-out Menu
 * 
 * The main mobile menu panel with navigation items and dropdowns.
 * Handles the slide-out animation and menu content organization.
 */

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'all 0.3s ease',
  };

  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '300px',
    height: '100vh',
    backgroundColor: 'white',
    boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.15)',
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease',
    zIndex: 1000,
    overflowY: 'auto',
  };

  const headerStyle: React.CSSProperties = {
    padding: '1rem',
    borderBottom: '2px solid #09b44d',
    backgroundColor: '#f0fdf4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#374151',
    padding: '0.25rem',
  };

  const mainLinksStyle: React.CSSProperties = {
    padding: '1rem 0',
    borderBottom: '1px solid #e5e7eb',
  };

  const mainLinkItemStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #f3f4f6',
  };

  const handleSectionToggle = (sectionTitle: string) => {
    setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle);
  };

  return (
    <>
      {/* Overlay */}
      <div style={overlayStyle} onClick={onClose} />
      
      {/* Menu Panel */}
      <div style={menuStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <span style={{ fontWeight: 'bold', color: '#09b44d' }}>Navigation</span>
          <button style={closeButtonStyle} onClick={onClose}>
            ×
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
          />
        ))}
      </div>
    </>
  );
};

export default MobileMenu;
