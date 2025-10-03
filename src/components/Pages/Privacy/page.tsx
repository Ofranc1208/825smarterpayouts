/**
 * Privacy Page - Main Orchestrator
 *
 * Coordinates and renders all Privacy page sections using the Orchestra pattern.
 * Imports modular components from ./components for clean separation of concerns.
 *
 * @component
 * @returns {JSX.Element} Complete Privacy page
 *
 * @example
 * <PrivacyPage />
 */

import {
  HeroSection,
  ContentSection,
  FAQSection,
  CTASection
} from './components';

export default function PrivacyPage() {
  return (
    <>
      <HeroSection />
      <ContentSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

