// Main HeroSection orchestrator - under 50 lines per complexity rule
// Combines all modular hero components

'use client';

import { HeroBackground } from './hero-background';
import { HeroBadge, HeroTitle, HeroDescription } from './hero-header';
import { HeroCTAButtons } from './hero-cta';

interface HeroSectionProps {
  onPhoneClick: () => void;
  onChatClick: () => void;
}

export default function HeroSection({ onPhoneClick, onChatClick }: HeroSectionProps) {
  return (
    <HeroBackground>
      <HeroTitle />
      <HeroDescription />
      <HeroCTAButtons 
        onPhoneClick={onPhoneClick}
        onChatClick={onChatClick}
      />
    </HeroBackground>
  );
}
