/**
 * How Fast Page - Main Orchestrator
 * 
 * Coordinates and renders all How Fast page sections using the Orchestra pattern.
 * Imports modular components from ./components for clean separation of concerns.
 * 
 * @component
 * @returns {JSX.Element} Complete How Fast page
 * 
 * @example
 * <HowFastPage />
 */

import {
  HeroSection,
  QuickAnswerSection,
  TimelineSection,
  FactorsSection,
  CTASection
} from './components';

export default function HowFastPage() {
  return (
    <>
      <HeroSection />
      <TimelineSection />
      <QuickAnswerSection />
      <FactorsSection />
      <CTASection />
    </>
  );
}

