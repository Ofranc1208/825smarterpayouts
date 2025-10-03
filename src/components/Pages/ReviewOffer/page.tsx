/**
 * Review Offer Page - Main Orchestrator
 * 
 * Coordinates and renders all Review Offer page sections using the Orchestra pattern.
 * Imports modular components from ./components for clean separation of concerns.
 * 
 * @component
 * @returns {JSX.Element} Complete Review Offer page
 * 
 * @example
 * <ReviewOfferPage />
 */

import {
  HeroSection,
  PrivacyProtectionSection,
  FAQSection,
  CTASection
} from './components';

export default function ReviewOfferPage() {
  return (
    <>
      <HeroSection />
      <PrivacyProtectionSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

