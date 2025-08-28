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
      
      // Aggressive responsive breakpoints to prevent ANY text cutoff:
      // User reported "Legal" cuts off between 1288px-1082px
      // So we switch to mobile at 1300px to be safe
      
      if (width < 1300) {
        setIsMobile(true); // Switch to hamburger menu early to prevent cutoff
      } else {
        setIsMobile(false); // Desktop - only on very wide screens
      }
    };

    // Force client-side rendering immediately
    const timer = setTimeout(() => {
      setIsClient(true);
      checkIsMobile();
      window.addEventListener('resize', checkIsMobile);
    }, 100); // Small delay to ensure DOM is ready
    
    return () => {
      clearTimeout(timer);
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkIsMobile);
      }
    };
  }, []);

  // Show loading state during SSR hydration
  if (!isClient) {
    return (
      <nav style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        minHeight: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', // Changed from sticky to prevent layout shift
        zIndex: 1000,
      }}>
        <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Loading navigation...</div>
      </nav>
    );
  }

  const navbarStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    minHeight: '64px',
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
    padding: '0 1rem',
    minHeight: '64px',
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: '#1f2937',
    fontWeight: 700,
    fontSize: '1rem', // Reduced font size
    whiteSpace: 'nowrap',
    flexShrink: 0, // Prevent logo from shrinking
  };

  const logoIconStyle: React.CSSProperties = {
    width: '28px', // Slightly smaller
    height: '28px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <nav style={navbarStyle}>
      <div ref={navRef} style={containerStyle}>
        {/* Logo */}
        <a href="/main" style={logoStyle}>
          <img 
            src="/favicon_without_text.ico" 
            alt="Smarter Payouts Logo"
            style={logoIconStyle}
          />
          <span style={{ fontSize: '1rem', fontWeight: 700 }}>
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
