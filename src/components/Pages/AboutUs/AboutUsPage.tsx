'use client';

import { Suspense } from 'react';
import {
  HeroSection,
  TechnologySection,
  CompanyStorySection,
  RecognitionSection,
  ValuesSection,
  CTASection
} from './components';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * About Us Page Component
 * 
 * Complete About Us page composed of modular sections:
 * - HeroSection: Main hero with Mint AI integration and CTAs
 * - TechnologySection: Showcase of technological innovations
 * - CompanyStorySection: Company history and mission
 * - RecognitionSection: Credentials and compliance information
 * - ValuesSection: Core company values
 * - CTASection: Final call-to-action
 * 
 * This component follows clean architecture principles by composing
 * smaller, focused section components rather than containing all logic
 * in a single monolithic component.
 * 
 * @component AboutUsPage
 * @author SmarterPayouts Team
 * @since 2024
 */
/**
 * Loading component for section suspense
 */
function SectionLoader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      minHeight: '200px'
    }}>
      <div 
        style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f4f6',
          borderTop: '4px solid #059669',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <ErrorBoundary>
      <main role="main" aria-label="About SmarterPayouts">
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <CompanyStorySection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <TechnologySection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <CTASection />
        </Suspense>
      </main>
    </ErrorBoundary>
  );
}
