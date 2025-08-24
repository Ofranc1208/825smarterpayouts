export const metadata = {
  title: "Instant Structured Settlement Calculator | Get Your Quote in 60 Seconds | SmarterPayouts",
  description: "Revolutionary manual calculator provides instant, accurate structured settlement quotes. No phone calls, no pressure. Compare with JG Wentworth and get better offers.",
  keywords: "structured settlement calculator, instant quote, JG Wentworth alternative, settlement payout calculator, lump sum calculator, manual quotes",
  openGraph: {
    title: "Instant Structured Settlement Calculator | Get Your Quote in 60 Seconds",
    description: "Revolutionary manual calculator provides instant, accurate structured settlement quotes. No phone calls, no pressure.",
    type: 'article',
    url: 'https://smarterpayouts.com/pricing-calculator',
  }
};

import React, { Suspense } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import PricingCalculator from '../pricing';

export default function PricingCalculatorPageWrapper() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <HeroSection />
      
      {/* Calculator Section */}
      <Suspense fallback={<LoadingSpinner text="Loading settlement calculator..." />}>
        <PricingCalculator />
      </Suspense>

      {/* Benefits Section */}
      <BenefitsSection />
    </div>
  );
}
