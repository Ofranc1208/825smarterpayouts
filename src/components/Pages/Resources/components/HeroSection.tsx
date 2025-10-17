/**
 * Hero Section Component - Resources Page
 *
 * Displays the main hero content with a badge, title, description, and search CTA button.
 * Uses design system tokens for consistent styling and shared components.
 *
 * @component
 * @returns {JSX.Element} Rendered hero section for insurance directory
 *
 * @example
 * <HeroSection />
 */

'use client';
import React from 'react';
import Button from '@/src/components/shared/Button/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';

export default function HeroSection() {
  return (
    <section
      aria-label="Insurance directory hero section"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)',
        paddingTop: SPACING.unit.xl,
        paddingBottom: SPACING.unit.lg,
        paddingLeft: SPACING.unit.md,
        paddingRight: SPACING.unit.md,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center'
        }}>
          {/* Directory Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: SPACING.inline.xs,
            background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            padding: `${SPACING.unit.xxs} ${SPACING.unit.md}`,
            borderRadius: BORDER_RADIUS.small,
            marginBottom: SPACING.stack.sm,
            border: `1px solid ${COLORS.borders.green}`
          }}>
            <span style={{ fontSize: TYPOGRAPHY.fontSize.body.large }}>📋</span>
            <span style={{
              color: COLORS.primary.main,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              fontSize: TYPOGRAPHY.fontSize.body.xsmall,
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>INSURANCE DIRECTORY</span>
          </div>

          <h1 style={{
            fontSize: TYPOGRAPHY.fontSize.heading.h2,
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            color: COLORS.text.primary,
            marginBottom: SPACING.stack.sm,
            lineHeight: TYPOGRAPHY.lineHeight.tight
          }}>
            Structured Settlement Insurance Companies
          </h1>

          <p style={{
            fontSize: TYPOGRAPHY.fontSize.body.medium,
            color: COLORS.text.secondary,
            maxWidth: "700px",
            margin: `0 auto ${SPACING.stack.md}`,
            lineHeight: TYPOGRAPHY.lineHeight.normal
          }}>
            Complete directory with contact information for insurance companies. Search and verify payments instantly.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: "flex",
            gap: SPACING.inline.sm,
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <Button
              as="a"
              href="/mint-chat-active?type=calculate&source=resources-hero"
              variant="technology-primary"
              size="md"
              enhancedHover={true}
              shimmer={true}
            >
              💰 Get Your Quote
            </Button>

            <Button
              as="a"
              href="/mint-intelligent-chat"
              variant="technology-secondary"
              size="md"
              enhancedHover={true}
              shimmer={true}
              shimmerDelay={1}
            >
              💬 Chat with Mint AI
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

