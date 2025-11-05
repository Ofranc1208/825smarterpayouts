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
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

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
            ...TEXT_PRESETS.heroTitle,
            background: COLORS.titleGradients.grayToGreen,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: SPACING.stack.md,
            fontSize: 'clamp(1.5rem, 3.5vw, 2rem)'
          }}>
                Ready to Get Started?
              </h2>
          <p style={{
            fontSize: TYPOGRAPHY.fontSize.body.medium,
            marginBottom: SPACING.stack.xl,
            color: COLORS.text.secondary,
            maxWidth: '600px',
            margin: `0 auto ${SPACING.stack.xl}`
          }}>
                Our AI-powered platform and nationwide network of affiliate partners make the process simple and compliant across 50+ states.
              </p>
          <div style={{
            display: 'flex',
            gap: SPACING.inline.md,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Button
              as="a"
              href="/mint-chat-active?type=calculate&source=state-laws-cta"
              variant="technology-primary"
              size="lg"
              enhancedHover={true}
              shimmer={true}
            >
              Get Your Instant Quote
            </Button>
            
            <Button
              as="a"
              href="/mint-intelligent-chat?chat=open&feature=calculator"
              variant="technology-secondary"
              size="lg"
              enhancedHover={true}
              shimmer={true}
              shimmerDelay={1}
            >
              Chat with Mint AI
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

