/**
 * Resources Page - Main Orchestrator
 *
 * Coordinates and renders all Resources page sections using the Orchestra pattern.
 * Imports modular components from ./components for clean separation of concerns.
 *
 * @component
 * @returns {JSX.Element} Complete Resources/Insurance Directory page
 *
 * @example
 * <ResourcesPage />
 */

import {
  HeroSection,
  DirectorySection,
  CTASection
} from './components';

export default function ResourcesPage() {
  return (
    <>
      <HeroSection />
      <DirectorySection />
      <CTASection />
    </>
  );
}

