/**
 * Social Media Page - Orchestra Pattern
 * 
 * This is the main page component that orchestrates all sub-components.
 * All page logic is broken down into focused, modular components.
 * 
 * Architecture:
 * - Main orchestrator: ~30 lines
 * - Components: 4 focused sections
 * - Pattern: Clean composition with barrel exports
 * 
 * Components:
 * - HeroSection: Hero with title and description
 * - PlatformsSection: Social media platform cards grid
 * - CommunitySection: Community benefits cards
 * - CTASection: Final call-to-action with buttons
 */

import {
  HeroSection,
  PlatformsSection,
  CommunitySection,
  CTASection
} from './components';

export default function SocialMediaPage() {
  return (
    <>
      <HeroSection />
      <PlatformsSection />
      <CommunitySection />
      <CTASection />
    </>
  );
}

