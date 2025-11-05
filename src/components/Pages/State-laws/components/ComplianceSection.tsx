/**
 * Compliance Section Component - State Laws Overview Page
 * 
 * Displays compliance information about affiliate partners and Mint AI guidance.
 * Uses design system tokens for consistent styling.
 * 
 * @component
 * @returns {JSX.Element} Rendered compliance section with partner info and AI CTA
 * 
 * @example
 * <ComplianceSection />
 */

import Link from 'next/link';
import Button from '@/src/components/shared/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function ComplianceSection() {
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
        {/* Compliance Section */}
        <div style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          padding: SPACING.card.standard,
          borderRadius: BORDER_RADIUS.large,
          marginBottom: SPACING.unit.xxxxl
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: SPACING.grid.comfortable,
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{
                ...TEXT_PRESETS.heroTitle,
                background: COLORS.titleGradients.grayToGreen,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: SPACING.stack.md,
                fontSize: 'clamp(1.5rem, 3.5vw, 2rem)'
              }}>
                    Full Compliance Through Affiliate Partners
                  </h2>
              <p style={{
                marginBottom: SPACING.stack.md,
                color: COLORS.text.secondary,
                lineHeight: TYPOGRAPHY.lineHeight.relaxed
              }}>
                    We work with licensed affiliate partners across 50+ states to ensure full compliance with local regulations. 
                    Each state has unique requirements, and our partners are experts in their respective jurisdictions.
                  </p>
              <ul style={{
                marginBottom: 0,
                color: COLORS.text.secondary,
                lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                paddingLeft: SPACING.unit.lg
              }}>
                    <li>Licensed partners across 50+ states</li>
                    <li>State-specific legal expertise</li>
                    <li>Full compliance with local regulations</li>
                    <li>Seamless coordination across jurisdictions</li>
                  </ul>
                </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: BORDER_RADIUS.full,
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: COLORS.backgrounds.white,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                fontWeight: TYPOGRAPHY.fontWeight.bold
              }}>
                ✓
                  </div>
                </div>
              </div>
            </div>

        {/* Mint AI Help Section */}
        <div style={{
          background: COLORS.backgrounds.white,
          padding: SPACING.card.standard,
          borderRadius: BORDER_RADIUS.large,
          border: `2px solid ${COLORS.borders.light}`,
          boxShadow: BOX_SHADOWS.medium,
          textAlign: 'center',
          marginBottom: SPACING.unit.xxxxl
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
            Need State-Specific Guidance?
          </h2>
          <p style={{ 
            color: COLORS.text.secondary, 
            fontSize: TYPOGRAPHY.fontSize.body.medium, 
            marginBottom: SPACING.stack.lg, 
            maxWidth: '600px', 
            margin: `0 auto ${SPACING.stack.lg}` 
          }}>
            Mint AI can instantly provide information about your state's specific requirements, timelines, and compliance procedures. 
            Get personalized guidance for your jurisdiction.
          </p>
          
          <Button
            as="a"
            href="/mint-intelligent-chat"
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
    </section>
  );
}

