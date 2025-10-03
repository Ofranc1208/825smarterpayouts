/**
 * Terms Page - Main Orchestrator
 *
 * Coordinates and renders all Terms page sections using the Orchestra pattern.
 * Imports modular components from ./components for clean separation of concerns.
 *
 * @component
 * @returns {JSX.Element} Complete Terms page
 *
 * @example
 * <TermsPage />
 */

import {
  HeroSection,
  ContentSection,
  FAQSection,
  CTASection
} from './components';

export default function TermsPage() {
  return (
    <>
      <HeroSection />
      <ContentSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

