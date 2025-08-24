import { useMemo, useCallback } from 'react';
import { NavItem } from '../../../data/navigation/types';
import MobileNavLink from './MobileNavLink';
import MobileSearchBar from './MobileSearchBar';
import MobileDropdownSection from './MobileDropdownSection';

/**
 * Mobile Navigation Component
 * 
 * Main mobile navigation component that orchestrates all mobile-specific
 * navigation elements including slide-out menu, search, and collapsible sections.
 * 
 * @component MobileNavigation
 * @author SmarterPayouts Team
 * @since 2024
 */

interface MobileNavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  searchMap: { [key: string]: string };
  dropdownMenus: { [key: string]: NavItem[] };
  pathname: string;
  expandedSection: string | null;
  toggleMobileSection: (key: string) => void;
}

/**
 * Main Navigation Links Configuration for Mobile
 * 
 * Defines the primary navigation links for mobile menu with mobile-specific icons
 */
const mobileNavLinks = [
  { href: '/main', label: 'Home', icon: '🏠' },
  { href: '/mint-intelligent-chat', label: 'Mint AI Chat', icon: '🤖' },
  { href: '/pricing-calculator', label: 'Early Payout Calculator', icon: '🧮' }
];

/**
 * Mobile Navigation Component
 * 
 * Provides a comprehensive mobile navigation experience with
 * dedicated mobile components for optimal mobile UX
 */
export default function MobileNavigation({
  mobileMenuOpen,
  setMobileMenuOpen,
  searchValue,
  setSearchValue,
  searchMap,
  dropdownMenus,
  pathname,
  expandedSection,
  toggleMobileSection
}: MobileNavigationProps) {
  
  // Memoized helper function to check if current path is in a dropdown section
  const isInDropdownSection = useCallback((items: NavItem[]) => {
    return items.some(item => pathname === item.href);
  }, [pathname]);

  // Memoized close mobile menu function
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, [setMobileMenuOpen]);

  // Memoized static styles to prevent recreating objects on every render
  const overlayStyle = useMemo(() => ({
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000
  }), []);

  const slideMenuStyle = useMemo(() => ({
    position: 'fixed' as const,
    top: 0,
    right: 0,
    height: '100vh',
    width: '320px',
    backgroundColor: 'white',
    boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
    zIndex: 1001,
    padding: '1rem',
    overflowY: 'auto' as const
  }), []);

  const headerStyle = useMemo(() => ({
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'center',
    marginBottom: '1.5rem',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '1rem'
  }), []);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        style={overlayStyle}
        className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Slide-out Menu */}
      <div
        style={slideMenuStyle}
        className={`mobile-menu-slide ${mobileMenuOpen ? 'open' : ''}`}
      >
        {/* Mobile Header */}
        <div style={headerStyle}>
          <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Navigation</span>
          <button
            onClick={closeMobileMenu}
            style={{
              border: 'none',
              background: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.25rem',
              minHeight: '44px',
              minWidth: '44px'
            }}
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>

        {/* Mobile Search */}
        <MobileSearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchMap={searchMap}
          onSearchComplete={closeMobileMenu}
        />

        {/* Mobile Navigation Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {/* Main Navigation Links */}
          {mobileNavLinks.map((link) => (
            <MobileNavLink
              key={link.href}
              href={link.href}
              pathname={pathname}
              icon={link.icon}
              onClick={closeMobileMenu}
            >
              {link.label}
            </MobileNavLink>
          ))}

          {/* Mobile Dropdown Sections */}
          {Object.entries(dropdownMenus).map(([key, items]) => (
            <MobileDropdownSection
              key={key}
              sectionKey={key}
              items={items}
              pathname={pathname}
              isExpanded={expandedSection === key}
              hasActiveItem={isInDropdownSection(items)}
              onToggle={() => toggleMobileSection(key)}
              onItemClick={closeMobileMenu}
            />
          ))}
        </div>
      </div>
    </>
  );
}
