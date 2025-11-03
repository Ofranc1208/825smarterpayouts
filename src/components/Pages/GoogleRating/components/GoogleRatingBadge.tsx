/**
 * Google Rating Badge - Custom Component for Google Rating Page
 * 
 * High-contrast, readable badge following best practices for award displays
 * Designed specifically for light backgrounds with clear visibility
 */

'use client';

import React from 'react';
import { COLORS } from '@/src/components/shared/styles';

interface GoogleRatingBadgeProps {
  rating?: string;
  reviewCount?: string;
}

export function GoogleRatingBadge({
  rating = '4.9',
  reviewCount = '250'
}: GoogleRatingBadgeProps) {
  return (
    <div 
      role="status"
      aria-label={`${rating} star rating based on user reviews`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.75rem 1.25rem',
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 180, 0, 0.15)',
        border: '1px solid rgba(255, 180, 0, 0.2)',
        maxWidth: '100%'
      }}
    >
      {/* Removed redundant microdata AggregateRating — JSON-LD in <head> now handles SEO schema. */}
      
      {/* Stars - Bright Yellow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.2rem',
        marginBottom: '0.2rem'
      }}>
        <span style={{
          fontSize: '1.25rem',
          color: '#FFB400',
          lineHeight: '1',
          letterSpacing: '0.03em'
        }} aria-label="5 star rating">
          ★★★★★
        </span>
      </div>
      
      {/* Rating - Lighter Gray Text */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.375rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <span style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: COLORS.text.secondary,
          lineHeight: '1',
          letterSpacing: '-0.01em'
        }}>
          {rating}
        </span>
        <span style={{
          fontSize: '0.875rem',
          fontWeight: '500',
          color: COLORS.text.tertiary,
          lineHeight: '1'
        }}>
          rating
        </span>
      </div>
      
    </div>
  );
}

