/**
 * State Laws Overview Page - Orchestra Pattern
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
 * - HeroSection: Hero with title, CTAs, and stats
 * - MainContentSection: Legal disclaimer, key facts, state categories, common requirements
 * - ComplianceSection: Compliance through affiliates + Mint AI guidance
 * - FinalCTA: Bottom call-to-action section
 */

import {
  HeroSection,
  MainContentSection,
  ComplianceSection,
  FinalCTA
} from './components';

export default function StateLawsPage() {
  return (
    <>
      <HeroSection />
      <MainContentSection />
      <ComplianceSection />
      <FinalCTA />
    </>
  );
}

