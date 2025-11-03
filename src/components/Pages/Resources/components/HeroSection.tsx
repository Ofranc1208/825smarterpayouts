/**
 * Hero Section Component - Resources Page
 *
 * Displays the main hero content with a professional badge, optimized title sizing,
 * detailed description, and CTA buttons. Improved typography hierarchy and spacing
 * for better visual balance and readability.
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
        paddingTop: SPACING.unit.xxxl,
        paddingBottom: SPACING.unit.xxl,
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
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            padding: `${SPACING.unit.xs} ${SPACING.unit.lg}`,
            borderRadius: BORDER_RADIUS.full,
            marginBottom: SPACING.stack.md,
            border: `1px solid ${COLORS.primary.main}`,
            boxShadow: BOX_SHADOWS.small
          }}>
            <span style={{ fontSize: TYPOGRAPHY.fontSize.body.large }}>📋</span>
            <span style={{
              color: COLORS.backgrounds.white,
              fontWeight: TYPOGRAPHY.fontWeight.bold,
              fontSize: TYPOGRAPHY.fontSize.body.small,
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>Insurance Directory</span>
          </div>

          <h1 style={{
            fontSize: TYPOGRAPHY.fontSize.heading.h3,
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            color: COLORS.text.primary,
            marginBottom: SPACING.stack.sm,
            lineHeight: TYPOGRAPHY.lineHeight.snug,
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Structured Settlement Insurance Companies
          </h1>

          <p style={{
            fontSize: TYPOGRAPHY.fontSize.body.large,
            color: COLORS.text.secondary,
            maxWidth: "600px",
            margin: `0 auto ${SPACING.stack.lg}`,
            lineHeight: TYPOGRAPHY.lineHeight.relaxed,
            fontWeight: TYPOGRAPHY.fontWeight.medium
          }}>
            Complete directory with contact information for insurance companies that provide structured settlement contracts. Search and verify payments instantly.
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
              href="/mint-intelligent-chat?chat=open&feature=calculator"
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

