/**
 * Payment Methods Section - Get Your Cash Page
 * 
 * Displays:
 * - Section header (title + subtitle)
 * - Payment methods grid (3 cards)
 * - Mint AI help section
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { PaymentMethodCard } from './shared';
import { paymentMethods } from '../data';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function PaymentMethodsSection() {
  return (
    <section id="payment-methods" style={{ 
      padding: SPACING.section.standard,
      background: COLORS.backgrounds.lightGray
    }}>
      <div style={SPACING.container.styles}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: SPACING.stack.xxl
        }}>
          <h2 style={{
            ...TEXT_PRESETS.sectionTitle,
            color: COLORS.text.primary,
            marginBottom: SPACING.stack.md
          }}>
            Choose Your Perfect Payment Method
          </h2>
          <p style={{
            ...TEXT_PRESETS.sectionSubtitle,
            color: COLORS.text.secondary,
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            We offer three secure ways to receive your funds. Pick what works best for your lifestyle and needs.
          </p>
        </div>

        {/* Payment Methods Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: SPACING.stack.lg,
          marginBottom: SPACING.stack.xxl
        }}>
          {paymentMethods.map((method, index) => (
            <PaymentMethodCard key={index} method={method} />
          ))}
        </div>

        {/* Mint AI Help Section */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          borderRadius: BORDER_RADIUS.xxlarge,
          padding: SPACING.card.standard,
          border: `2px solid #93c5fd`,
          textAlign: 'center',
          boxShadow: BOX_SHADOWS.large,
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: SPACING.inline.sm,
            fontSize: TYPOGRAPHY.fontSize.heading.h2,
            marginBottom: SPACING.stack.md
          }}>
            <img
              src="/assets/images/mint-mascot.png"
              alt="Mint AI"
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'contain'
              }}
            />
          </div>
          <h3 style={{
            fontSize: TYPOGRAPHY.fontSize.heading.h3,
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            color: '#1d4ed8',
            marginBottom: SPACING.stack.md,
            letterSpacing: '-0.5px'
          }}>
            Need Help Choosing?
          </h3>
          <p style={{
            color: '#1e40af',
            fontSize: TYPOGRAPHY.fontSize.body.large,
            lineHeight: TYPOGRAPHY.lineHeight.relaxed,
            maxWidth: '650px',
            margin: `0 auto ${SPACING.stack.xl}`
          }}>
            Not sure which payment method is right for you? Mint AI can analyze your situation, timeline needs, and preferences to recommend the perfect option. Get personalized advice in seconds!
          </p>
          <Link href="/mint-intelligent-chat" style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
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
            💡 Get My Payment Recommendation
          </Link>
        </div>
      </div>
    </section>
  );
}

