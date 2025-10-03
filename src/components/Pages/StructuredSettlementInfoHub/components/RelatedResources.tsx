/**
 * Related Resources Component
 * Grid of related article cards
 * 
 * NO CSS FILES - All styles inline
 * Uses COLORS, BORDER_RADIUS, BOX_SHADOWS from shared/styles
 */

'use client';
import React from 'react';
import Link from 'next/link';
import { COLORS, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';

interface RelatedResource {
  title: string;
  description: string;
  link: string;
  linkText?: string;
}

interface RelatedResourcesProps {
  resources: RelatedResource[];
  title?: string;
}

export const RelatedResources: React.FC<RelatedResourcesProps> = ({ 
  resources,
  title = "Related Resources"
}) => {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: COLORS.text.primary,
        marginBottom: '1.5rem'
      }}>
        {title}
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {resources.map((resource, index) => (
          <div key={index} style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: BORDER_RADIUS.large,
            boxShadow: BOX_SHADOWS.small,
            border: '1px solid #e5e7eb',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: COLORS.text.primary,
              marginBottom: '0.75rem'
            }}>
              {resource.title}
            </h3>
            <p style={{
              color: COLORS.text.tertiary,
              lineHeight: '1.6',
              marginBottom: '1.25rem',
              fontSize: '0.9375rem',
              flexGrow: 1
            }}>
              {resource.description}
            </p>
            <Link href={resource.link} style={{
              color: COLORS.primary.main,
              border: `1px solid ${COLORS.primary.main}`,
              padding: '0.625rem 1rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-block',
              textAlign: 'center',
              transition: 'all 0.2s ease',
              fontSize: '0.875rem'
            }}>
              {resource.linkText || 'Learn More'}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedResources;

