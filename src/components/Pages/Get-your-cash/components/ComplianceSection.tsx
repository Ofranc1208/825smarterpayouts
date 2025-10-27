/**
 * Compliance & Social Proof Section - Get Your Cash Page
 * 
 * Displays:
 * - Compliance badge (centered)
 * - Testimonial card
 * - FAQ section with accordion items
 * - CTA buttons
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { TestimonialCard, FAQItem } from './shared';
import { testimonialData, faqData } from '../data';
import { SITE_STATS } from '../../../../../app/config/siteConfig';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function ComplianceSection() {
  return (
    <section style={{
      padding: `${SPACING.unit.lg} 0`,
      background: COLORS.backgrounds.white
    }}>
      <div style={SPACING.container.styles}>
        {/* Testimonial Card */}
        <div style={{ marginBottom: SPACING.stack.xl }}>
          <TestimonialCard testimonial={testimonialData} />
        </div>

        {/* FAQ Section */}
        <div style={{
          background: COLORS.radialGradients.greenLight,
          borderRadius: BORDER_RADIUS.xxlarge,
          padding: SPACING.card.compact,
          border: `1px solid ${COLORS.borders.green}`,
          boxShadow: BOX_SHADOWS.large
        }}>
          {/* FAQ Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: SPACING.stack.lg
          }}>
            <h2 style={{
              fontSize: TYPOGRAPHY.fontSize.heading.h4,
              fontWeight: TYPOGRAPHY.fontWeight.bold,
              color: COLORS.primary.dark,
              margin: `0 0 ${SPACING.stack.xs} 0`
            }}>
              Getting Your Cash FAQ
            </h2>
            <Link href="/mint-intelligent-chat" style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: COLORS.text.white,
              padding: `${SPACING.inline.md} ${SPACING.inline.lg}`,
              borderRadius: BORDER_RADIUS.large,
              fontSize: TYPOGRAPHY.fontSize.body.medium,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: SPACING.inline.sm,
              boxShadow: BOX_SHADOWS.medium,
              transition: 'all 0.2s ease'
            }}>
              Ask Mint AI Instantly
            </Link>
          </div>

          {/* FAQ Items */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.stack.sm
          }}>
            {faqData.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: 'center', marginTop: SPACING.stack.lg }}>
            <Link href="/faqs" style={{
              background: COLORS.primary.gradient,
              color: COLORS.text.white,
              padding: `${SPACING.inline.md} ${SPACING.inline.xl}`,
              borderRadius: BORDER_RADIUS.medium,
              fontSize: TYPOGRAPHY.fontSize.body.medium,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.2s ease',
              boxShadow: BOX_SHADOWS.medium
            }}>
              Read All FAQs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

