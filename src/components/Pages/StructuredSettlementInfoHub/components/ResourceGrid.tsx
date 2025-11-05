/**
 * Resource Grid Component
 * Displays a grid of resource cards
 * 
 * NO CSS FILES - All styles inline
 * Uses COLORS, BORDER_RADIUS, BOX_SHADOWS from shared/styles
 */

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import type { ResourceCardProps } from '../types';

interface ResourceGridProps {
  resources: ResourceCardProps[];
}

export const ResourceGrid: React.FC<ResourceGridProps> = ({ resources }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: SPACING.unit.lg,
      marginTop: SPACING.stack.md
    }}>
      {resources.map((resource, index) => {
        const [isHovered, setIsHovered] = useState(false);
        
        return (
          <div 
            key={index} 
            style={{
              background: COLORS.backgrounds.white,
              padding: `${SPACING.unit.lg} ${SPACING.unit.md}`,
              borderRadius: BORDER_RADIUS.large,
              boxShadow: isHovered ? BOX_SHADOWS.medium : BOX_SHADOWS.small,
              border: `1px solid ${COLORS.neutral.gray200}`,
              height: 'fit-content',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <h3 style={{
              fontSize: TYPOGRAPHY.fontSize.heading.h4,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              color: COLORS.neutral.gray900,
              marginBottom: SPACING.stack.sm,
              lineHeight: TYPOGRAPHY.lineHeight.tight
            }}>
              {resource.title}
            </h3>
            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.small,
              color: COLORS.text.secondary,
              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
              marginBottom: SPACING.stack.md,
              flex: 1
            }}>
              {resource.description}
            </p>
            <Link 
              href={resource.link} 
              style={{
                color: isHovered ? COLORS.backgrounds.white : COLORS.primary.main,
                background: isHovered ? COLORS.primary.main : 'transparent',
                border: `1px solid ${COLORS.primary.main}`,
                padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                borderRadius: BORDER_RADIUS.medium,
                textDecoration: 'none',
                fontWeight: TYPOGRAPHY.fontWeight.semibold,
                display: 'inline-block',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontSize: TYPOGRAPHY.fontSize.body.small,
                textAlign: 'center',
                width: '100%'
              }}
            >
              {resource.linkText}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ResourceGrid;

