/**
 * Content Card Component
 * Displays featured content with CTA button
 * 
 * NO CSS FILES - All styles inline
 * Uses COLORS, BORDER_RADIUS, BOX_SHADOWS from shared/styles
 */

'use client';
import React from 'react';
import Link from 'next/link';
import { COLORS, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import type { ContentCardProps } from '../types';

export const ContentCard: React.FC<ContentCardProps> = ({
  emoji,
  title,
  description,
  buttonText,
  buttonLink
}) => {
  return (
    <section style={{
      background: 'white',
      padding: '2.5rem',
      borderRadius: BORDER_RADIUS.large,
      boxShadow: BOX_SHADOWS.medium,
      marginBottom: '2rem',
      border: '1px solid #e5e7eb',
      transition: 'box-shadow 0.2s ease'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: COLORS.text.primary,
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        {emoji && <span>{emoji}</span>}
        {title}
      </h2>
      <p style={{
        color: COLORS.text.tertiary,
        lineHeight: '1.6',
        marginBottom: '1.5rem'
      }}>
        {description}
      </p>
      <Link href={buttonLink} style={{
        display: 'inline-block',
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        fontWeight: '600',
        boxShadow: '0 4px 6px rgba(5, 150, 105, 0.2)',
        transition: 'transform 0.2s ease'
      }}>
        {buttonText}
      </Link>
    </section>
  );
};

export default ContentCard;

