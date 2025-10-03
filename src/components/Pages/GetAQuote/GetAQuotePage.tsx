/**
 * GetAQuote Page - Orchestrator Pattern
 * 
 * This is the main page component that orchestrates all sub-components.
 * All page logic is broken down into focused, modular components.
 * 
 * Components:
 * - HeroSection: Hero with title and CTA buttons
 * - ChooseMethod: Two options (AI Calculator vs Talk to Expert)
 * - FAQSection: Frequently asked questions accordion
 * - FinalCTA: Final call-to-action section
 */

'use client';

import HeroSection from './components/HeroSection';
import ChooseMethod from './components/ChooseMethod';
import FAQSection from './components/FAQSection';
import FinalCTA from './components/FinalCTA';

export default function GetAQuotePage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <HeroSection />
      <ChooseMethod />
      <FAQSection />
      <FinalCTA />
    </div>
  );
}
