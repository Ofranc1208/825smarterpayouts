import React from 'react';
import NavigationItems from './components/NavigationItems';

/**
 * DesktopNav Component - Main Desktop Navigation Orchestrator
 * 
 * Simplified main component that orchestrates desktop navigation.
 * All complex logic has been moved to sub-components for better maintainability.
 * 
 * Reduced from 169 lines to ~20 lines through modularization.
 */

interface DesktopNavProps {
  isMobile: boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ isMobile }) => {
  // Desktop navigation container with proper spacing
  const desktopNavStyle: React.CSSProperties = {
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    marginLeft: '1rem', // Reduced space to bring navigation closer to logo
  };

  return (
    <div style={desktopNavStyle}>
      <NavigationItems isMobile={isMobile} />
    </div>
  );
};

export default DesktopNav;
