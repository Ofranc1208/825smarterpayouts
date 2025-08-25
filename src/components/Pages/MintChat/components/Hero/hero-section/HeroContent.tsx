import React from 'react';
import HeroBadgeContainer from '../hero-badge/HeroBadgeContainer';
import HeroHeaderContainer from '../hero-header/HeroHeaderContainer';

/**
 * Hero Content Component for MintChat
 * 
 * Orchestrates the badge and header content with proper
 * layout and positioning for the hero section.
 * 
 * @component HeroContent
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Hero Content Component
 * 
 * Combines the Mint AI badge and header content in a
 * centered layout with optimal spacing and typography.
 */
export default function HeroContent() {
  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 1rem",
      position: "relative",
      zIndex: 1
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          textAlign: 'center'
        }}>
          <HeroBadgeContainer />
          <HeroHeaderContainer />
        </div>
      </div>
    </div>
  );
}
