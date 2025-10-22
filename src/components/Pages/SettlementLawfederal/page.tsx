// Settlement Law Federal - Main Orchestrator
// Enterprise-grade modular architecture with dynamic imports for optimal performance

'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import critical above-the-fold components
import {
  SEOHead,
  PageErrorBoundary,
  SectionErrorBoundary,
  HeroSection,
  DisclaimerSection
} from './components';

// Import LoadingFallback components
import LoadingFallback, { 
  LegalSectionLoader, 
  ResourceSectionLoader, 
  TaxSectionLoader, 
  CTASectionLoader 
} from './components/LoadingFallback';

// Lazy load below-the-fold sections for optimal performance
const IntroductionSection = dynamic(() => import('./components/IntroductionSection'), {
  loading: () => <LegalSectionLoader />,
  ssr: false
});

const FederalLawsSection = dynamic(() => import('./components/FederalLawsSection'), {
  loading: () => <LegalSectionLoader />,
  ssr: false
});

const PracticalApplicationsSection = dynamic(() => import('./components/PracticalApplicationsSection'), {
  loading: () => <LegalSectionLoader />,
  ssr: false
});

const FAQSection = dynamic(() => import('./components/FAQSection'), {
  loading: () => <LegalSectionLoader />,
  ssr: false
});

const GovernmentResourcesSection = dynamic(() => import('./components/GovernmentResourcesSection'), {
  loading: () => <ResourceSectionLoader />,
  ssr: false
});

const BestPracticesSection = dynamic(() => import('./components/BestPracticesSection'), {
  loading: () => <LegalSectionLoader />,
  ssr: false
});

const CourtApprovalSection = dynamic(() => import('./components/CourtApprovalSection'), {
  loading: () => <LegalSectionLoader />,
  ssr: false
});

const TaxImplicationsSection = dynamic(() => import('./components/TaxImplicationsSection'), {
  loading: () => <TaxSectionLoader />,
  ssr: false
});

const ReferencesSection = dynamic(() => import('./components/ReferencesSection'), {
  loading: () => <ResourceSectionLoader />,
  ssr: false
});

const ResourcesSection = dynamic(() => import('./components/ResourcesSection'), {
  loading: () => <ResourceSectionLoader />,
  ssr: false
});

const FinalCTASection = dynamic(() => import('./components/FinalCTASection'), {
  loading: () => <CTASectionLoader />,
  ssr: false
});

import { 
  useSettlementLawAnalytics, 
  useSettlementLawPerformance, 
  useSettlementLawAccessibility,
  useIntersectionObserver,
  useWebVitals
} from './hooks';

export default function SettlementLawfederalPage() {
  // Initialize enterprise hooks
  const analytics = useSettlementLawAnalytics();
  const performance = useSettlementLawPerformance();
  const accessibility = useSettlementLawAccessibility();
  
  // Initialize performance monitoring hooks
  const webVitals = useWebVitals();
  const { isIntersecting: isMainContentVisible, ref: mainContentRef } = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true
  });

  // Initialize page tracking and accessibility
  useEffect(() => {
    // Track page view
    analytics.trackPageView();
    
    // Initialize performance monitoring
    performance.trackPageLoad();
    
    // Announce page load to screen readers
    accessibility.announceToScreenReader(
      'Settlement Law Federal page loaded. Navigate through sections using Tab key or Alt+1 for main content.',
      'polite'
    );
  }, [analytics, performance, accessibility]);

  // Track main content visibility
  useEffect(() => {
    if (isMainContentVisible) {
      analytics.trackSectionView('main-content');
    }
  }, [isMainContentVisible, analytics]);

  return (
    <PageErrorBoundary>
      {/* Enterprise SEO Head - Comprehensive meta tags and structured data */}
      <SEOHead />
      
      <SectionErrorBoundary sectionName="Hero">
        <HeroSection />
      </SectionErrorBoundary>
      
      <main 
        ref={mainContentRef as React.RefObject<HTMLElement>}
        id="main-content"
        role="main"
        aria-label="Settlement Law Federal Information"
        data-section="main-content"
        style={{
          background: '#f9fafb',
          minHeight: '100vh',
          padding: '48px 0'
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <SectionErrorBoundary sectionName="Introduction">
            <IntroductionSection />
          </SectionErrorBoundary>

          <SectionErrorBoundary sectionName="Legal Disclaimer">
            <DisclaimerSection />
          </SectionErrorBoundary>

          <SectionErrorBoundary sectionName="Federal Laws">
            <FederalLawsSection />
          </SectionErrorBoundary>

          <SectionErrorBoundary sectionName="Practical Applications">
            <PracticalApplicationsSection />
          </SectionErrorBoundary>

          <SectionErrorBoundary sectionName="Frequently Asked Questions">
            <FAQSection />
          </SectionErrorBoundary>

          <SectionErrorBoundary sectionName="Government Resources">
            <GovernmentResourcesSection />
          </SectionErrorBoundary>

          <SectionErrorBoundary sectionName="Best Practices">
            <BestPracticesSection />
          </SectionErrorBoundary>

          <SectionErrorBoundary sectionName="Court Approval Process">
            <CourtApprovalSection />
          </SectionErrorBoundary>

          <SectionErrorBoundary sectionName="Tax Implications">
            <TaxImplicationsSection />
          </SectionErrorBoundary>

          <SectionErrorBoundary sectionName="Legal References">
            <ReferencesSection />
          </SectionErrorBoundary>

          <SectionErrorBoundary sectionName="Additional Resources">
            <ResourcesSection />
          </SectionErrorBoundary>
        </div>
      </main>

      <SectionErrorBoundary sectionName="Final Call-to-Action">
        <FinalCTASection />
      </SectionErrorBoundary>
    </PageErrorBoundary>
  );
}
