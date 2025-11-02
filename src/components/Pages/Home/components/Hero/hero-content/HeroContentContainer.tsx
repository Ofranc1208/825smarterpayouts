'use client';

import HeroTitle from './HeroTitle';
import HeroSubtitle from './HeroSubtitle';
import HeroDescription from './HeroDescription';
import TrustBadge from '@/src/components/SEO/TrustBadge';

/**
 * Hero Content Container Component
 * 
 * Orchestrates all text content components for the hero section.
 * 
 * @component HeroContentContainer
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function HeroContentContainer() {
  return (
    <>
      <HeroTitle />
      <HeroSubtitle />
      
      {/* Google Rating Badge - Increased spacing */}
      <div style={{ 
        marginTop: '1.6rem',
        marginBottom: '1.6rem',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <TrustBadge 
          rating="4.9"
          reviewCount="250"
          category="Finance"
          alignment="center"
          href="/platform-rating"
        />
      </div>
      
      <HeroDescription />
    </>
  );
}
