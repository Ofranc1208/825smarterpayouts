import React from 'react';
import MintBadgeComponent from './MintBadgeComponent';

/**
 * Hero Badge Container Component for MintChat
 * 
 * Wraps the Mint AI badge with proper spacing and positioning
 * for the hero section layout.
 * 
 * @component HeroBadgeContainer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Hero Badge Container Component
 * 
 * Provides the Mint AI badge with appropriate spacing
 * and positioning for the hero section.
 */
export default function HeroBadgeContainer() {
  return (
    <MintBadgeComponent 
      variant="compact" 
      style={{ marginBottom: "0.5rem" }} 
    />
  );
}
