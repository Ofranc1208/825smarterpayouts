/**
 * Google Rating Page - Main Orchestrator
 * 
 * Main page component that orchestrates all sections for the Google Rating page
 */

'use client';

import React from 'react';
import { HeroSection, ContentSection, CTASection, ComplianceSection } from './components';
import { StructuredData } from '@/src/components/SEO/StructuredData';
import { googleRatingPageSchema, googleRatingWebPageSchema } from './schemas';
import { organizationSchema } from '@/src/lib/structured-data/schemas';

export default function GoogleRatingPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData schema={[organizationSchema, googleRatingPageSchema, googleRatingWebPageSchema]} />

      <HeroSection />
      <ContentSection />
      <CTASection />
      <ComplianceSection />
    </>
  );
}

