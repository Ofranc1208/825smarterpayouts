/**
 * Resource Grid Component
 * Displays a grid of resource cards
 * 
 * NO CSS FILES - All styles inline
 * Uses COLORS, BORDER_RADIUS, BOX_SHADOWS from shared/styles
 */

'use client';
import React from 'react';
import Link from 'next/link';
import { COLORS, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import type { ResourceCardProps } from '../types';

interface ResourceGridProps {
  resources: ResourceCardProps[];
}

export const ResourceGrid: React.FC<ResourceGridProps> = ({ resources }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginTop: '1rem'
    }}>
      {resources.map((resource, index) => (
        <div key={index} style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: BORDER_RADIUS.large,
          boxShadow: BOX_SHADOWS.small,
          border: '1px solid #e5e7eb',
          height: 'fit-content',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: COLORS.text.primary,
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {resource.emoji && <span>{resource.emoji}</span>}
            {resource.title}
          </h3>
          <p style={{
            color: COLORS.text.tertiary,
            lineHeight: '1.6',
            marginBottom: '1rem',
            fontSize: '0.9375rem'
          }}>
            {resource.description}
          </p>
          <Link href={resource.link} style={{
            color: COLORS.primary.main,
            border: `1px solid ${COLORS.primary.main}`,
            padding: '0.75rem 1.25rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-block',
            transition: 'all 0.2s ease',
            fontSize: '0.875rem'
          }}>
            {resource.linkText}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ResourceGrid;

