/**
 * Platform Rating Page - Main Orchestrator
 * 
 * Main page component that orchestrates all sections for the Platform Rating page
 * Compliant with Google's guidelines for displaying ratings
 */

'use client';

import React from 'react';
import { HeroSection, HighImpactVisualsSection, ContentSection, CTASection, ComplianceSection } from './components';
import { StructuredData } from '@/src/components/SEO/StructuredData';
import { platformRatingPageSchema, platformRatingWebPageSchema } from './schemas';
import { organizationSchema } from '@/src/lib/structured-data/schemas';

export default function GoogleRatingPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData schema={[organizationSchema, platformRatingPageSchema, platformRatingWebPageSchema]} />

      <HeroSection />
      <HighImpactVisualsSection />
      <ContentSection />
      <CTASection />
      <ComplianceSection />
    </>
  );
}

