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
      padding: SPACING.section.standard,
      background: COLORS.backgrounds.white
    }}>
      <div style={SPACING.container.styles}>
        {/* Compliance Badge (Large, Centered) */}
        <div style={{ textAlign: 'center', marginBottom: SPACING.stack.xxl }}>
          <Link href={SITE_STATS.compliance.link} style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: SPACING.inline.sm,
              background: COLORS.radialGradients.greenLight,
              border: `1px solid ${COLORS.borders.green}`,
              borderRadius: BORDER_RADIUS.xxlarge,
              padding: `${SPACING.inline.md} ${SPACING.inline.xl}`,
              fontSize: TYPOGRAPHY.fontSize.body.large,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              color: COLORS.primary.dark,
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              boxShadow: BOX_SHADOWS.medium
            }}
            title={SITE_STATS.compliance.description}>
              <span style={{ fontSize: TYPOGRAPHY.fontSize.heading.h4 }}>✅</span>
              <span>{SITE_STATS.compliance.value} State & Federal Compliant</span>
            </div>
          </Link>
        </div>

        {/* Testimonial Card */}
        <div style={{ marginBottom: SPACING.stack.xxl }}>
          <TestimonialCard testimonial={testimonialData} />
        </div>

        {/* FAQ Section */}
        <div style={{
          background: COLORS.radialGradients.greenLight,
          borderRadius: BORDER_RADIUS.xxlarge,
          padding: SPACING.card.standard,
          border: `1px solid ${COLORS.borders.green}`,
          boxShadow: BOX_SHADOWS.large
        }}>
          {/* FAQ Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: SPACING.stack.xl
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: SPACING.inline.sm,
              marginBottom: SPACING.stack.sm
            }}>
              <span style={{ fontSize: TYPOGRAPHY.fontSize.heading.h3 }}>❓</span>
            </div>
            <h2 style={{
              fontSize: TYPOGRAPHY.fontSize.heading.h2,
              fontWeight: TYPOGRAPHY.fontWeight.bold,
              color: COLORS.primary.dark,
              margin: `0 0 ${SPACING.stack.md} 0`
            }}>
              Getting Your Cash FAQ
            </h2>
            <Link href="/mint-intelligent-chat" style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: COLORS.text.white,
              padding: `${SPACING.inline.md} ${SPACING.inline.lg}`,
              borderRadius: BORDER_RADIUS.large,
              fontSize: TYPOGRAPHY.fontSize.body.default,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: SPACING.inline.sm,
              boxShadow: BOX_SHADOWS.medium,
              transition: 'all 0.2s ease'
            }}>
              💬 Ask Mint AI Instantly
            </Link>
          </div>

          {/* FAQ Items */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.stack.md
          }}>
            {faqData.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: 'center', marginTop: SPACING.stack.xxl }}>
            <Link href="/faqs" style={{
              background: COLORS.primary.gradient,
              color: COLORS.text.white,
              padding: `${SPACING.inline.md} ${SPACING.inline.xl}`,
              borderRadius: BORDER_RADIUS.medium,
              fontSize: TYPOGRAPHY.fontSize.body.default,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.2s ease',
              boxShadow: BOX_SHADOWS.medium
            }}>
              📖 Read All FAQs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

