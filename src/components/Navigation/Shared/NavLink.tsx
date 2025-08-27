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
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, icon, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [isHovered, setIsHovered] = React.useState(false);

  const linkStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: icon ? '0.25rem' : '0',
    padding: '0.5rem 0.75rem', // Reduced padding
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '0.875rem', // Smaller font size
    fontWeight: isActive ? 600 : 500,
    color: isActive ? '#09b44d' : (isHovered ? '#07a043' : '#374151'),
    backgroundColor: isActive ? '#f0fdf4' : (isHovered ? '#f9fafb' : 'transparent'),
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother transition
    cursor: 'pointer',
    whiteSpace: 'nowrap', // Prevent text wrapping
    minWidth: 'fit-content', // Ensure full text is visible
    transform: isHovered ? 'translateY(-1px)' : 'translateY(0)', // Subtle lift on hover
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
