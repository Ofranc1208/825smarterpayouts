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
  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    backgroundColor: 'transparent',
    border: '2px solid #10b981', // Green border
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
  };

  const lineStyle: React.CSSProperties = {
    width: '24px',
    height: '2px',
    backgroundColor: '#374151', // Dark gray lines
    transition: 'all 0.3s ease',
    position: 'relative',
  };

  const topLineStyle: React.CSSProperties = {
    ...lineStyle,
    transform: isOpen ? 'rotate(45deg) translateY(6px)' : 'rotate(0deg) translateY(0px)',
    marginBottom: '4px',
  };

  const middleLineStyle: React.CSSProperties = {
    ...lineStyle,
    opacity: isOpen ? 0 : 1,
    marginBottom: '4px',
  };

  const bottomLineStyle: React.CSSProperties = {
    ...lineStyle,
    transform: isOpen ? 'rotate(-45deg) translateY(-6px)' : 'rotate(0deg) translateY(0px)',
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
