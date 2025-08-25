'use client';

import WhyChooseHeaderContainer from '../why-choose-header';
import FeaturesGrid from '../why-choose-features';
import StatisticsGrid from '../why-choose-statistics';

/**
 * Why Choose Main Section Component
 * 
 * Main orchestrator component that combines all why choose section elements.
 * 
 * Showcases the key benefits and features including:
 * - AI-Powered Calculator with Mint integration
 * - Court-Approved Process
 * - No Pressure Sales approach
 * - Statistics grid (400+ clients, $50M+, etc.)
 * - Interactive hover effects on all cards
 * 
 * @component WhyChooseMainSection
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function WhyChooseMainSection() {
  return (
    <section style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '48px 16px'
    }}>
      <WhyChooseHeaderContainer />
      <FeaturesGrid />
      <StatisticsGrid />
    </section>
  );
}
