import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * NavLink Component - CSS-Free Navigation Link
 * 
 * A reusable navigation link component with active state detection
 * and hover effects using pure inline styles.
 * 
 * Shared between Desktop and Mobile navigation components.
 */

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: string;
  onClick?: () => void;
  fontSize?: string; // Optional custom font size
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, icon, onClick, fontSize }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [isHovered, setIsHovered] = React.useState(false);

  const linkStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: icon ? '0.35rem' : '0', // Reduced icon gap
    padding: '0.5rem 0.7rem', // Reduced by 20%: 0.625rem 0.875rem → 0.5rem 0.7rem
    textDecoration: 'none',
    borderRadius: '8px', // Slightly larger border radius
    fontSize: fontSize || '0.9375rem', // Use custom fontSize if provided, otherwise default
    fontWeight: isActive ? 600 : 500,
    color: isActive ? '#059669' : (isHovered ? '#047857' : '#374151'),
    backgroundColor: isActive ? '#f0fdf4' : (isHovered ? '#f9fafb' : 'transparent'),
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    minWidth: 'fit-content',
    transform: isHovered ? 'translateX(2px)' : 'translateX(0)', // Subtle slide on hover
    boxShadow: isActive ? '0 1px 3px rgba(5, 150, 105, 0.1)' : 'none', // Subtle shadow for active state
  };

  return (
    <Link
      href={href}
      style={linkStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon && <span style={{ fontSize: '1.1em' }}>{icon}</span>}
      {children}
    </Link>
  );
};

export default NavLink;
