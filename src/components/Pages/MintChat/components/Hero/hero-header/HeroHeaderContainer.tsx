import React from 'react';
import HeroSubtitle from './HeroSubtitle';
import HeroTitle from './HeroTitle';
import HeroDescription from './HeroDescription';

/**
 * Hero Header Container Component for MintChat
 * 
 * Orchestrates all header elements including subtitle, title,
 * and description with proper layout and spacing.
 * 
 * @component HeroHeaderContainer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Hero Header Container Component
 * 
 * Combines all header text elements in a centered layout
 * with optimal typography hierarchy and spacing.
 */
export default function HeroHeaderContainer() {
  return (
    <div style={{
      maxWidth: '800px',
      textAlign: 'center'
    }}>
      <HeroSubtitle />
      <HeroTitle />
      <HeroDescription />
    </div>
  );
}
