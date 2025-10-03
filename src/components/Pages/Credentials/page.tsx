/**
 * Credentials Page - Orchestra Pattern
 * 
 * This is the main page component that orchestrates all sub-components.
 * All page logic is broken down into focused, modular components.
 * 
 * Architecture:
 * - Main orchestrator: ~35 lines
 * - Components: 4 focused sections
 * - Pattern: Clean composition with barrel exports
 * 
 * Components:
 * - HeroSection: Hero with title, description, and CTA buttons
 * - CredentialsGrid: Credential verification cards
 * - TrustIndicators: Trust and security indicators
 * - CTASection: Final call-to-action with buttons
 */

import {
  HeroSection,
  CredentialsGrid,
  TrustIndicators,
  CTASection
} from './components';

export default function CredentialsPage() {
  return (
    <>
      <HeroSection />
      <CredentialsGrid />
      <TrustIndicators />
      <CTASection />
    </>
  );
}

