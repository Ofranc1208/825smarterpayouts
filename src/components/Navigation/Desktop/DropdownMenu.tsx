import Link from 'next/link';
import { NavItem } from '../../../data/navigation/types';

/**
 * Desktop Dropdown Menu Component
 * 
 * A dropdown menu component optimized for desktop with smooth animations,
 * proper positioning, and hover effects. Part of the desktop navigation system.
 * 
 * @component DropdownMenu
 * @author SmarterPayouts Team
 * @since 2024
 */

interface DropdownMenuProps {
  /** Array of navigation items to display in the dropdown */
  items: NavItem[];
  /** Whether the dropdown is currently open */
  isOpen: boolean;
  /** Unique key for the dropdown (used for data attributes) */
  dropdownKey: string;
  /** Current pathname for active state detection */
  pathname?: string;
}

/**
 * Individual Dropdown Item Component
 * 
 * Renders a single item within the desktop dropdown menu
 */
interface DropdownItemProps {
  item: NavItem;
  pathname?: string;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ item, pathname }) => {
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 0.75rem',
        gap: '8px',
        fontSize: '0.92rem',
        fontWeight: isActive ? 600 : 500,
        letterSpacing: '-0.1px',
        textDecoration: 'none',
        color: isActive ? '#09b44d' : 'inherit',
        backgroundColor: isActive ? '#f0fdf4' : 'transparent',
        borderRadius: '6px',
        margin: '0 0.5rem',
        transition: 'background-color 0.15s ease'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      <span style={{ fontSize: '1.1em' }}>{item.icon}</span>
      {item.label}
    </Link>
  );
};

/**
 * Desktop Dropdown Menu Component
 * 
 * Renders a dropdown menu with proper positioning, animations,
 * and interactive hover effects optimized for desktop use
 */
const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  items, 
  isOpen, 
  dropdownKey, 
  pathname 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      data-dropdown={dropdownKey}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        backgroundColor: 'white',
        border: '1.5px solid #09b44d',
        borderRadius: '12px',
        boxShadow: '0 4px 18px rgba(9,180,77,0.07)',
        minWidth: '230px',
        marginTop: '6px',
        padding: '0.5rem 0',
        zIndex: 1000,
        animation: 'fadeIn 0.15s ease-out'
      }}
      onMouseEnter={(e) => {
        // Prevent dropdown from closing when hovering over it
        e.stopPropagation();
      }}
    >
      {items.map((item) => (
        <DropdownItem 
          key={item.href} 
          item={item} 
          pathname={pathname}
        />
      ))}
    </div>
  );
};

export default DropdownMenu;
