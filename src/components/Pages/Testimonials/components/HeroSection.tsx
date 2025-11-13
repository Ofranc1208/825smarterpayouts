/**
 * Hero Section - Testimonials Page
 *
 * Displays section header with title and tagline for testimonials carousel
 */

'use client';

import React from 'react';
import { COLORS, TYPOGRAPHY, SPACING } from '@/src/components/shared/styles';

export default function HeroSection() {
  return (
    <div style={{
      textAlign: 'center',
      marginBottom: '2.5rem',
      marginTop: '0'
    }}>
      <span style={{
        color: '#22c55e',
        fontSize: '0.9rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        display: 'block',
        marginBottom: '0.75rem'
      }}>
        Client Testimonials
      </span>
      <h2 style={{
        fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
        fontWeight: 700,
        color: COLORS.neutral.gray900,
        marginBottom: '0.75rem',
        lineHeight: 1.2
      }}>
        What Our Clients Say
      </h2>
      <p style={{
        fontSize: '1rem',
        color: COLORS.text.secondary,
        maxWidth: '700px',
        margin: '0 auto',
        lineHeight: 1.6
      }}>
        Real experiences from clients who chose transparency and received exceptional results
      </p>
    </div>
  );
}

