'use client';
import { useEffect } from 'react';
import {
  SEOHead,
  HeroSection,
  WhyChooseSection,
  HowItWorksSection,
  TestimonialsSection,
  FinalCTASection,
  HomePageErrorBoundary,
  SectionErrorBoundary
} from './components';
import {
  useHomeAnalytics,
  useHomePerformance,
  useHomeAccessibility
} from './hooks';

/**
 * Homepage Component
 * 
 * Main orchestrator component for the SmarterPayouts homepage. This component
 * follows enterprise-grade architecture principles by composing modular sections
 * rather than containing monolithic logic.
 * 
 * ## Architecture
 * - **SEOHead**: Meta tags, structured data, and performance optimization
 * - **HeroSection**: Video background hero with primary CTAs
 * - **WhyChooseSection**: Feature cards and company statistics
 * - **HowItWorksSection**: 3-step process explanation with interactive cards
 * - **TestimonialsSection**: Customer testimonials with ratings
 * - **FinalCTASection**: Final call-to-action with trust indicators
 * 
 * ## Features
 * - ✅ Fully responsive design
 * - ✅ Optimized for Core Web Vitals
 * - ✅ Accessibility compliant (WCAG 2.1 AA)
 * - ✅ SEO optimized with structured data
 * - ✅ Interactive hover effects and animations
 * 
 * @component HomePage
 * @example
 * ```tsx
 * import HomePage from './HomePage';
 * 
 * export default function Page() {
 *   return <HomePage />;
 * }
 * ```
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */
export default function HomePage() {
  const {
    trackHeroCTAClick,
    trackFeatureCardClick,
    trackSectionView,
    trackTestimonialInteraction,
    trackFinalCTAClick,
    trackPageView
  } = useHomeAnalytics();

  const { reportWebVitals } = useHomePerformance();
  const { announceToScreenReader } = useHomeAccessibility();

  useEffect(() => {
    // Track page view on mount
    trackPageView();
    
    // Announce page load to screen readers
    announceToScreenReader('Homepage loaded successfully');
  }, [trackPageView, announceToScreenReader]);

  const handleHeroCTAClick = (buttonType: 'primary' | 'secondary') => {
    trackHeroCTAClick(buttonType);
  };

  const handleFeatureCardClick = (featureTitle: string) => {
    trackFeatureCardClick(featureTitle);
  };

  const handleSectionView = (sectionName: string) => {
    trackSectionView(sectionName);
  };

  const handleTestimonialInteraction = (testimonialId: string) => {
    trackTestimonialInteraction(testimonialId);
  };

  const handleFinalCTAClick = (buttonType: 'primary' | 'secondary') => {
    trackFinalCTAClick(buttonType);
  };

  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Home Page Error:', error, errorInfo);
    // Send error to monitoring service
  };

  return (
    <HomePageErrorBoundary onError={handleError}>
      <main>
        <SEOHead />
        
        <SectionErrorBoundary sectionName="Hero">
          <HeroSection />
        </SectionErrorBoundary>
        
        <SectionErrorBoundary sectionName="Why Choose Us">
          <WhyChooseSection />
        </SectionErrorBoundary>
        
        <SectionErrorBoundary sectionName="How It Works">
          <HowItWorksSection />
        </SectionErrorBoundary>
        
        <SectionErrorBoundary sectionName="Testimonials">
          <TestimonialsSection />
        </SectionErrorBoundary>
        
        <SectionErrorBoundary sectionName="Final CTA">
          <FinalCTASection />
        </SectionErrorBoundary>
      </main>
    </HomePageErrorBoundary>
  );
}
