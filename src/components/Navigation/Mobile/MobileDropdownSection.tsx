import Link from 'next/link';
import { NavItem } from '../../../data/navigation/types';

/**
 * Mobile Dropdown Section Component
 * 
 * A collapsible section specifically designed for mobile navigation with
 * touch-friendly interactions, smooth animations, and mobile-optimized layout.
 * 
 * @component MobileDropdownSection
 * @author SmarterPayouts Team
 * @since 2024
 */

interface MobileDropdownSectionProps {
  /** Unique key for the section */
  sectionKey: string;
  /** Array of navigation items in this section */
  items: NavItem[];
  /** Current pathname for active state detection */
  pathname: string;
  /** Whether this section is currently expanded */
  isExpanded: boolean;
  /** Whether any item in this section is currently active */
  hasActiveItem: boolean;
  /** Function to toggle section expansion */
  onToggle: () => void;
  /** Function to close mobile menu when item is clicked */
  onItemClick: () => void;
}

/**
 * Mobile Section Label Mapping
 * 
 * Maps section keys to their display labels for mobile navigation
 */
const getMobileSectionLabel = (key: string): string => {
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
 * Mobile Dropdown Section Component
 * 
 * Renders a collapsible section with header and expandable items
 * optimized for mobile touch interactions and mobile-specific UX patterns
 */
const MobileDropdownSection: React.FC<MobileDropdownSectionProps> = ({
  sectionKey,
  items,
  pathname,
  isExpanded,
  hasActiveItem,
  onToggle,
  onItemClick
}) => {
  return (
    <div style={{ 
      borderBottom: '1px solid #f0f0f0', 
      marginBottom: '4px' 
    }}>
      {/* Section Header - Touch-friendly clickable area */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '0.75rem 0',
          fontWeight: 600,
          color: hasActiveItem ? '#09b44d' : '#374151',
          backgroundColor: hasActiveItem ? '#f0fdf4' : 'transparent',
          fontSize: '0.95rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          border: 'none',
          borderLeft: hasActiveItem ? '3px solid #09b44d' : 'none',
          paddingLeft: hasActiveItem ? '0.6rem' : '0',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'left',
          transition: 'all 0.2s ease',
          minHeight: '44px' // Touch-friendly minimum height
        }}
        aria-expanded={isExpanded}
        aria-label={`${getMobileSectionLabel(sectionKey)} section`}
      >
        <span>{getMobileSectionLabel(sectionKey)}</span>
        <span style={{
          fontSize: '0.8rem',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>
          ▼
        </span>
      </button>

      {/* Collapsible Items - Mobile-optimized layout */}
      {isExpanded && (
        <div style={{
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          backgroundColor: '#fafafa',
          borderRadius: '6px',
          marginTop: '4px'
        }}>
          {items.map((item) => {
            const isCurrentPage = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onItemClick}
                style={{
                  padding: '0.6rem 1rem',
                  textDecoration: 'none',
                  color: isCurrentPage ? '#09b44d' : '#374151',
                  backgroundColor: isCurrentPage ? '#f0fdf4' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.95rem',
                  fontWeight: isCurrentPage ? 600 : 500,
                  borderRadius: '6px',
                  margin: '2px 0',
                  borderLeft: isCurrentPage ? '3px solid #09b44d' : 'none',
                  paddingLeft: isCurrentPage ? '0.85rem' : '1rem',
                  minHeight: '44px', // Touch-friendly minimum height
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '1.1em' }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MobileDropdownSection;
