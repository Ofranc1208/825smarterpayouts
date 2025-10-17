'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import DesktopNav from './Desktop';
import MobileNav from './Mobile';

/**
 * DualNavbar - Main CSS-Free Navigation Component
 * 
 * A complete navigation system with zero CSS dependencies.
 * Handles both desktop and mobile navigation with pure React state and inline styles.
 * 
 * Features:
 * - Responsive desktop/mobile switching
 * - All navigation items from original system
 * - Smooth dropdown functionality
 * - Zero CSS files or className usage
 * - Pure inline styles with React state
 */

const DualNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);

  // Client-side hydration and responsive detection
  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth;

      // Standard responsive breakpoint (768px) for better layout stability
      // This prevents frequent layout shifts and improves user experience

      if (width < 768) {
        setIsMobile(true); // Mobile - hamburger menu for small screens
      } else {
        setIsMobile(false); // Desktop - horizontal navigation for larger screens
      }
    };

    // Immediate client-side rendering - no delays
    setIsClient(true);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkIsMobile);
      }
    };
  }, []);

  // Show loading state during SSR hydration
  // Use CSS variable for consistent height with layout.tsx
  if (!isClient) {
    return (
      <nav style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        height: 'var(--navbar-height, 54px)', // Use CSS variable with fallback
        minHeight: 'var(--navbar-height, 54px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', // Changed from sticky to prevent layout shift
        zIndex: 1000,
      }} className="navbar-container">
        <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Loading navigation...</div>
      </nav>
    );
  }

  // Responsive heights: 54px for mobile (15% thinner), 64px for desktop
  const navbarHeight = isMobile ? '54px' : '64px';

  const navbarStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    height: navbarHeight, // Explicit height to match container
    minHeight: navbarHeight,
    maxHeight: navbarHeight, // Prevent CSS from overriding
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // Let components control their own positioning
    padding: isMobile ? '0 0.75rem' : '0 1rem', // Reduced padding for mobile
    minHeight: navbarHeight,
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '0.375rem' : '0.5rem', // Smaller gap on mobile
    textDecoration: 'none',
    color: '#1f2937',
    fontWeight: 700,
    fontSize: isMobile ? '0.875rem' : '1rem', // Smaller font on mobile
    whiteSpace: 'nowrap',
    flexShrink: 0, // Prevent logo from shrinking
  };

  const logoIconStyle: React.CSSProperties = {
    width: isMobile ? '24px' : '28px', // Smaller icon on mobile
    height: isMobile ? '24px' : '28px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <nav style={navbarStyle} className="navbar-container">
      <div ref={navRef} style={containerStyle}>
        {/* Logo */}
        <a href="/main" style={logoStyle}>
          <img 
            src="/favicon_without_text.ico" 
            alt="Smarter Payouts Logo"
            style={logoIconStyle}
          />
          <span style={{ fontSize: isMobile ? '0.875rem' : '1rem', fontWeight: 700 }}>
            Smarter Payouts
          </span>
        </a>

        {/* Desktop Navigation */}
        <DesktopNav isMobile={isMobile} />

        {/* Mobile Navigation */}
        <MobileNav isMobile={isMobile} />
      </div>
    </nav>
  );
};

export default DualNavbar;
