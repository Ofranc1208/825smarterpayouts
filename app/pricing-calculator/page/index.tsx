export const metadata = {
  title: "Instant Structured Settlement Calculator | Get Your Quote in 60 Seconds | SmarterPayouts",
  description: "Revolutionary manual calculator provides instant, accurate structured settlement quotes. No phone calls, no pressure. Compare with JG Wentworth and get better offers.",
  keywords: "structured settlement calculator, instant quote, JG Wentworth alternative, settlement payout calculator, lump sum calculator, manual quotes",
  openGraph: {
    title: "Instant Structured Settlement Calculator | Get Your Quote in 60 Seconds",
    description: "Revolutionary manual calculator provides instant, accurate structured settlement quotes. No phone calls, no pressure.",
    type: 'article',
    url: 'https://smarterpayouts.com/pricing-calculator',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/pricing-calculator',
  }
};

import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import LoadingSpinner from '../../components/LoadingSpinner';
import { StructuredData } from '@/src/components/SEO/StructuredData';
import { pricingCalculatorSchema, organizationSchema } from '@/src/lib/structured-data/schemas';

// Dynamically import the calculator to avoid SSR issues with useSearchParams
const PricingCalculator = dynamic(() => import('../pricing'), {
  ssr: false,
  loading: () => <LoadingSpinner text="Loading settlement calculator..." />
});

export default function PricingCalculatorPageWrapper() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData schema={[pricingCalculatorSchema, organizationSchema]} />
      
      <div style={{ background: '#ffffff', minHeight: '100vh' }}>
        <HeroSection />
        
        {/* Calculator Section */}
        <PricingCalculator />

        {/* Benefits Section */}
        <BenefitsSection />
      </div>
    </>
  );
}
