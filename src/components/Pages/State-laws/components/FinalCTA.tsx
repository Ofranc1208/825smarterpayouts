/**
 * Final CTA Section Component - State Laws Overview Page
 * 
 * Displays the final call-to-action with buttons and Mint AI guidance badge.
 * Uses design system tokens for consistent styling.
 * 
 * @component
 * @returns {JSX.Element} Rendered final CTA section with buttons and badge
 * 
 * @example
 * <FinalCTA />
 */

import Link from 'next/link';
import Button from '@/src/components/shared/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';

export default function FinalCTA() {
  return (
    <section style={{ 
      paddingTop: 0,
      paddingBottom: SPACING.unit.xxxl,
      paddingLeft: SPACING.unit.md,
      paddingRight: SPACING.unit.md,
      background: COLORS.backgrounds.white
    }}>
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto'
      }}>
        {/* Final CTA Section */}
        <div style={{
          textAlign: 'center',
          background: COLORS.backgrounds.white,
          padding: `${SPACING.unit.xxxl} ${SPACING.card.standard}`,
          borderRadius: BORDER_RADIUS.large,
          border: `2px solid ${COLORS.borders.light}`,
          boxShadow: BOX_SHADOWS.large
        }}>
          <h2 style={{
            fontSize: TYPOGRAPHY.fontSize.heading.h2,
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            marginBottom: SPACING.stack.md,
            color: COLORS.text.primary
          }}>
                Ready to Get Started?
              </h2>
          <p style={{
            fontSize: TYPOGRAPHY.fontSize.body.large,
            marginBottom: SPACING.stack.xl,
            color: COLORS.text.secondary,
            maxWidth: '600px',
            margin: `0 auto ${SPACING.stack.xl}`
          }}>
                Our AI-powered platform and nationwide network of affiliate partners make the process simple and compliant across 50+ states.
              </p>
          <div style={{
            display: 'flex',
            gap: SPACING.inline.lg,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: SPACING.stack.lg
          }}>
            <Button
              as="a"
              href="/pricing-calculator"
              variant="technology-primary"
              size="xl"
              enhancedHover={true}
              shimmer={true}
            >
              💰 Get Your Instant Quote
            </Button>
            
            <Button
              as="a"
              href="/mint-intelligent-chat"
              variant="technology-secondary"
              size="xl"
              enhancedHover={true}
              shimmer={true}
              shimmerDelay={1}
            >
              💬 Chat with Mint AI
            </Button>
              </div>
          
          <div style={{
            padding: `${SPACING.unit.sm} ${SPACING.unit.lg}`,
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            border: `1px solid ${COLORS.borders.light}`,
            borderRadius: BORDER_RADIUS.small,
            display: 'inline-block'
          }}>
            <span style={{ 
              fontSize: TYPOGRAPHY.fontSize.body.small, 
              color: COLORS.text.secondary,
              fontWeight: TYPOGRAPHY.fontWeight.medium
            }}>
              ✨ Get instant state-specific compliance guidance with Mint AI
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

