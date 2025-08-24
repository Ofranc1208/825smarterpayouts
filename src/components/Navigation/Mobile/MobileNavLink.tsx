import Link from 'next/link';

/**
 * Mobile Navigation Link Component
 * 
 * A specialized navigation link component designed specifically for mobile menus with
 * touch-friendly sizing, mobile-optimized styling, and visual indicators.
 * 
 * @component MobileNavLink
 * @author SmarterPayouts Team
 * @since 2024
 */

interface MobileNavLinkProps {
  /** The URL path for the link */
  href: string;
  /** The display text for the link */
  children: React.ReactNode;
  /** Current pathname to determine active state */
  pathname: string;
  /** Optional icon to display before the text */
  icon?: string;
  /** Function to call when link is clicked (usually to close menu) */
  onClick: () => void;
}

/**
 * Mobile Navigation Link Component
 * 
 * Renders a mobile-optimized navigation link with proper active states,
 * touch-friendly sizing, visual indicators, and mobile-specific interactions
 */
const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  href,
  children,
  pathname,
  icon,
  onClick
}) => {
  const isActive = pathname === href;

  return (
    <Link 
      href={href}
      onClick={onClick}
      style={{
        padding: '0.75rem 0',
        textDecoration: 'none',
        color: isActive ? '#09b44d' : 'inherit',
        backgroundColor: isActive ? '#f0fdf4' : 'transparent',
        borderBottom: '1px solid #f0f0f0',
        borderLeft: isActive ? '3px solid #09b44d' : 'none',
        paddingLeft: isActive ? '0.6rem' : '0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: isActive ? 600 : 500,
        borderRadius: '6px',
        marginBottom: '4px',
        minHeight: '44px', // Touch-friendly minimum height
        transition: 'all 0.2s ease'
      }}
    >
      {icon && <span style={{ fontSize: '1.1em' }}>{icon}</span>}
      {children}
    </Link>
  );
};

export default MobileNavLink;
