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
import Link from 'next/link';
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
          <Link href="/mint-chat-active?type=calculate&source=info-hub-cta" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '2rem',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.125rem',
            boxShadow: '0 4px 15px rgba(9, 180, 77, 0.3)',
            transition: 'transform 0.2s ease'
          }}>
            💰 Get Your Instant Quote
          </Link>
          <Link href="/mint-intelligent-chat" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '2rem',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.125rem',
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
            transition: 'transform 0.2s ease'
          }}>
            💬 Chat with Mint AI
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

