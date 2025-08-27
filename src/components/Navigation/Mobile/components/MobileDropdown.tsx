import React from 'react';
import NavLink from '../../Shared/NavLink';

/**
 * MobileDropdown Component - Mobile Collapsible Section
 * 
 * Handles individual dropdown sections in mobile navigation
 * with smooth expand/collapse animations.
 */

interface DropdownItem {
  href: string;
  label: string;
  icon?: string;
}

interface MobileDropdownProps {
  title: string;
  items: DropdownItem[];
  isExpanded: boolean;
  onToggle: () => void;
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({ 
  title, 
  items, 
  isExpanded, 
  onToggle 
}) => {
  const sectionHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 600,
    color: '#374151',
  };

  const arrowStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
  };

  const sectionContentStyle: React.CSSProperties = {
    maxHeight: isExpanded ? '500px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease',
    backgroundColor: 'white',
  };

  const itemStyle: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    borderBottom: '1px solid #f3f4f6',
  };

  return (
    <div>
      <div style={sectionHeaderStyle} onClick={onToggle}>
        <span>{title}</span>
        <span style={arrowStyle}>▼</span>
      </div>
      
      <div style={sectionContentStyle}>
        {items.map((item) => (
          <div key={item.href} style={itemStyle}>
            <NavLink href={item.href} icon={item.icon}>
              {item.label}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileDropdown;
