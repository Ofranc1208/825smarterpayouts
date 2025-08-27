import React, { useState } from 'react';
import HamburgerButton from './components/HamburgerButton';
import MobileMenu from './components/MobileMenu';

/**
 * MobileNav Component - Main Mobile Navigation Orchestrator
 * 
 * Simplified main component that orchestrates mobile navigation.
 * All complex logic has been moved to sub-components for better maintainability.
 * 
 * Reduced from 229 lines to ~40 lines through modularization.
 */

interface MobileNavProps {
  isMobile: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ isMobile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when switching back to desktop
  React.useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  // Don't render on desktop
  if (!isMobile) return null;

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  // Mobile navigation container style - positions hamburger on the right
  const mobileNavStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto', // Push to the right side
    position: 'absolute', // Position absolutely to ensure it's on the right
    right: '1rem', // Align to right edge
  };

  return (
    <div style={mobileNavStyle}>
      <HamburgerButton isOpen={isMenuOpen} onClick={handleToggleMenu} />
      <MobileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </div>
  );
};

export default MobileNav;
