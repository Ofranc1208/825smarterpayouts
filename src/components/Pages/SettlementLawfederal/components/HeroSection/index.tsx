// Main HeroSection orchestrator - under 50 lines per complexity rule
// Combines all modular hero components

'use client';

import { HeroBackground } from './hero-background';
import { HeroTitle, HeroDescription } from './hero-header';
import { HeroCTAButtons } from './hero-cta';

export default function HeroSection() {
  return (
    <HeroBackground>
      <HeroTitle />
      <HeroDescription />
      <HeroCTAButtons />
    </HeroBackground>
  );
}
