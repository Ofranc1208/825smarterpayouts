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
  onItemClick?: () => void; // Optional callback for when an item is clicked
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({ 
  title, 
  items, 
  isExpanded, 
  onToggle,
  onItemClick
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const sectionHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.25rem', // Better horizontal padding
    backgroundColor: isHovered ? '#f3f4f6' : '#f9fafb',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    fontSize: '0.9375rem',
    fontWeight: 600,
    color: isHovered ? '#1f2937' : '#374151',
    transition: 'all 0.2s ease',
    userSelect: 'none',
  };

  const arrowStyle: React.CSSProperties = {
    fontSize: '0.625rem',
    color: '#9ca3af',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const sectionContentStyle: React.CSSProperties = {
    maxHeight: isExpanded ? '800px' : '0', // Larger max height for smooth animation
    overflow: 'hidden',
    transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother easing
    backgroundColor: 'white',
  };

  const itemStyle: React.CSSProperties = {
    padding: '0.5rem 1.5rem', // Better vertical spacing
    marginBottom: '0.125rem', // Subtle gap between items
  };

  return (
    <div>
      <div 
        style={sectionHeaderStyle} 
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <span>{title}</span>
        <span style={arrowStyle}>▼</span>
      </div>
      
      <div style={sectionContentStyle}>
        {items.map((item) => (
          <div key={item.href} style={itemStyle}>
            <NavLink href={item.href} icon={item.icon} onClick={onItemClick}>
              {item.label}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileDropdown;
