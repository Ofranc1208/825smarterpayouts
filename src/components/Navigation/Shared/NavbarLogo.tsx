import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Shared Navbar Logo Component
 * 
 * The application logo component used in both desktop and mobile navigation.
 * Provides consistent branding and navigation to the main page.
 * 
 * @component NavbarLogo
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Navbar Logo Component
 * 
 * Renders the SmarterPayouts logo with a link to the main page.
 * Used consistently across desktop and mobile navigation.
 */
const NavbarLogo: React.FC = () => {
  return (
    <Link 
      href="/main" 
      style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#09b44d',
        textDecoration: 'none',
        letterSpacing: '-0.5px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'opacity 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.8';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
    >
      <Image
        src="/favicon_without_text.ico"
        alt="SmarterPayouts Logo"
        width={32}
        height={32}
        style={{
          borderRadius: '4px',
          objectFit: 'contain'
        }}
        priority
      />
      <span>Smarter Payouts</span>
    </Link>
  );
};

export default NavbarLogo;
