import Link from 'next/link';

/**
 * Shared Navigation Link Component
 * 
 * A reusable navigation link component with consistent styling,
 * active states, and hover effects. Used across both desktop and mobile navigation
 * where shared link behavior is needed.
 * 
 * @component NavLink
 * @author SmarterPayouts Team
 * @since 2024
 */

interface NavLinkProps {
  /** The URL path for the link */
  href: string;
  /** The display text for the link */
  children: React.ReactNode;
  /** Current pathname to determine active state */
  pathname: string;
  /** Optional icon to display before the text */
  icon?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Additional custom styles */
  style?: React.CSSProperties;
  /** Custom className for additional styling */
  className?: string;
}

/**
 * Shared Navigation Link Component
 * 
 * Renders a navigation link with proper active states, hover effects,
 * and consistent styling that works across desktop and mobile contexts
 */
const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  pathname,
  icon,
  onClick,
  style = {},
  className = ''
}) => {
  const isActive = pathname === href;

  return (
    <Link 
      href={href}
      onClick={onClick}
      className={className}
      style={{
        fontSize: '0.95rem',
        padding: '0.5rem 0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: icon ? '0.4rem' : '0',
        fontWeight: isActive ? 600 : 500,
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        letterSpacing: '-0.2px',
        textDecoration: 'none',
        color: isActive ? '#09b44d' : 'inherit',
        background: isActive ? '#e9f9f1' : 'transparent',
        ...style
      }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </Link>
  );
};

export default NavLink;
