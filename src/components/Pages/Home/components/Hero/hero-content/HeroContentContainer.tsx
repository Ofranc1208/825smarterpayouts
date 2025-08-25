'use client';

import HeroTitle from './HeroTitle';
import HeroSubtitle from './HeroSubtitle';
import HeroDescription from './HeroDescription';

/**
 * Hero Content Container Component
 * 
 * Orchestrates all text content components for the hero section.
 * 
 * @component HeroContentContainer
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function HeroContentContainer() {
  return (
    <>
      <HeroTitle />
      <HeroSubtitle />
      <HeroDescription />
    </>
  );
}
