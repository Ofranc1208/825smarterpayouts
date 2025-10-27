/**
 * Hero Section - Main Component
 * 
 * Streamlined main component that orchestrates the hero section display.
 * This component is now much smaller and focused on coordination rather
 * than implementation details, which are handled by sub-components.
 * 
 * @component HeroSection
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useEffect } from 'react';
import HeroBackground from './HeroBackground';
import HeroHeader from './HeroHeader';
import HeroCTA from './HeroCTA';
import { HERO_CONFIG, HERO_CTA_BUTTONS } from './data';
import type { HeroSectionProps } from './types';

/**
 * Main hero section component
 * 
 * Orchestrates the display of hero content with proper state management,
 * responsive behavior, and accessibility. Delegates rendering to specialized
 * sub-components for better maintainability.
 * 
 * @param {HeroSectionProps} props - Component props
 * @returns {JSX.Element} Complete hero section
 */
export default function AboutHeroSection({
  id = 'hero-section',
  className,
  showBadge = false,
  showCTA = true,
  config
}: HeroSectionProps = {}): JSX.Element {
  const [url, setUrl] = useState('');

  // Merge custom config with default config
  const heroConfig = { ...HERO_CONFIG, ...config };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <HeroBackground 
      background={heroConfig.background}
      style={{}}
    >
      <HeroHeader
        title={heroConfig.title}
        subtitle={heroConfig.subtitle}
        description={heroConfig.description}
        showBadge={showBadge}
        badge={heroConfig.badge}
        align="center"
      />

      {showCTA && (
        <HeroCTA
          buttons={HERO_CTA_BUTTONS}
          align="center"
          layout="horizontal"
        />
      )}
    </HeroBackground>
  );
}
