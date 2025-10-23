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
import { StructuredData } from '@/src/components/SEO/StructuredData';
import { socialMediaCollectionSchema, organizationSchema } from '@/src/lib/structured-data/schemas';

export default function SocialMediaPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData schema={[organizationSchema, socialMediaCollectionSchema]} />

      <HeroSection />
      <PlatformsSection />
      <CommunitySection />
      <CTASection />
    </>
  );
}

