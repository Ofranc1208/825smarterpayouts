/**
 * CTA Section Component
 * Final call-to-action section at bottom of pages with optimized spacing
 *
 * NO CSS FILES - All styles inline
 * Uses COLORS from shared/styles
 * Reduced padding for cleaner, more compact layout
 */

'use client';
import React from 'react';
import Button from '@/src/components/shared/Button';
import { COLORS } from '@/src/components/shared/styles';
import type { CTASectionProps } from '../types';

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Ready to Get Started?",
  subtitle = "Get your instant quote or chat with Mint AI to learn more about your structured settlement options."
}) => {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
      padding: '2rem 0',
      textAlign: 'center',
      borderTop: '1px solid #e5e7eb'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: COLORS.text.primary,
          marginBottom: '1rem'
        }}>
          {title}
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: COLORS.text.tertiary,
          marginBottom: '1.5rem',
          maxWidth: '600px',
          margin: '0 auto 1.5rem',
          lineHeight: '1.6'
        }}>
          {subtitle}
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Button
            as="a"
            href="/mint-chat-active?type=calculate&source=info-hub-cta"
            variant="technology-primary"
            size="sm"
            enhancedHover={true}
            shimmer={true}
          >
            💰 Get Your Instant Quote
          </Button>
          <Button
            as="a"
            href="/mint-intelligent-chat?chat=open&feature=calculator"
            variant="mint-chat"
            size="sm"
            enhancedHover={true}
            shimmer={true}
            shimmerDelay={1}
          >
            💬 Chat with Mint AI
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

