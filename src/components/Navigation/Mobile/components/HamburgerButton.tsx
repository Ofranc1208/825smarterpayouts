import React from 'react';

/**
 * HamburgerButton Component - Mobile Menu Toggle
 * 
 * Animated hamburger menu button with pure inline styles.
 * Handles the visual state changes between hamburger and X icon.
 */

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, onClick }) => {
  // 15% smaller for thinner mobile navbar: 44px -> 37px
  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '37px',
    height: '37px',
    backgroundColor: 'transparent',
    border: '2px solid #10b981', // Green border
    cursor: 'pointer',
    borderRadius: '6px', // Slightly smaller border radius
    transition: 'all 0.2s ease',
  };

  const lineStyle: React.CSSProperties = {
    width: '20px', // 15% smaller: 24px -> 20px
    height: '2px',
    backgroundColor: '#374151', // Dark gray lines
    transition: 'all 0.3s ease',
    position: 'relative',
  };

  const topLineStyle: React.CSSProperties = {
    ...lineStyle,
    transform: isOpen ? 'rotate(45deg) translateY(5px)' : 'rotate(0deg) translateY(0px)', // Adjusted translation
    marginBottom: '3px', // Reduced spacing
  };

  const middleLineStyle: React.CSSProperties = {
    ...lineStyle,
    opacity: isOpen ? 0 : 1,
    marginBottom: '3px', // Reduced spacing
  };

  const bottomLineStyle: React.CSSProperties = {
    ...lineStyle,
    transform: isOpen ? 'rotate(-45deg) translateY(-5px)' : 'rotate(0deg) translateY(0px)', // Adjusted translation
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={topLineStyle} />
        <div style={middleLineStyle} />
        <div style={bottomLineStyle} />
      </div>
    </button>
  );
};

export default HamburgerButton;
