/**
 * Trust Indicators Component - Credentials Page
 * 
 * Displays trust indicator cards showing why to trust SmarterPayouts.
 * Uses design system tokens for consistent styling.
 * Fully accessible with semantic HTML and ARIA labels.
 * 
 * @component
 * @returns {JSX.Element} Rendered trust indicators section
 * 
 * @example
 * <TrustIndicators />
 */

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';

/**
 * Interface for trust indicator data
 */
interface TrustIndicator {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

/**
 * Array of trust indicators highlighting credential benefits
 */
const trustIndicators: TrustIndicator[] = [
  {
    icon: '✓',
    title: 'Transparent Process',
    description: 'Clear, honest communication throughout every step of your transaction.',
    gradient: 'linear-gradient(135deg, #059669, #047857)'
  },
  {
    icon: '🔒',
    title: 'Secure & Compliant',
    description: 'Full SSL encryption and regulatory compliance for your peace of mind.',
    gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)'
  },
  {
    icon: '🏆',
    title: 'Verified & Trusted',
    description: 'Florida corporation with full legal standing and transparent operations.',
    gradient: 'linear-gradient(135deg, #059669, #047857)'
  }
];

export default function TrustIndicators() {
  return (
    <section style={{
      background: COLORS.backgrounds.lightGray,
      paddingTop: SPACING.unit.xxxxl,
      paddingBottom: SPACING.unit.xxxxl,
      paddingLeft: SPACING.unit.md,
      paddingRight: SPACING.unit.md
    }}>
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: SPACING.unit.xxxl
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: TYPOGRAPHY.fontSize.heading.h3,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              color: COLORS.text.primary,
              marginBottom: SPACING.stack.md
            }}>
              Why Trust SmarterPayouts?
            </h2>
            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.large,
              color: COLORS.text.secondary,
              marginBottom: SPACING.unit.xxxl
            }}>
              Our credentials demonstrate our commitment to transparency, security, and regulatory compliance.
            </p>
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: SPACING.grid.standard
        }}>
          {trustIndicators.map((indicator, idx) => (
            <article
              key={idx}
              aria-label={indicator.title}
              style={{
                background: COLORS.backgrounds.white,
                borderRadius: BORDER_RADIUS.medium,
                padding: SPACING.card.standard,
                textAlign: "center",
                border: `1px solid ${COLORS.borders.light}`
              }}
            >
              <div style={{
                width: "64px",
                height: "64px",
                background: indicator.gradient,
                borderRadius: BORDER_RADIUS.full,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: `0 auto ${SPACING.stack.md}`,
                color: COLORS.backgrounds.white,
                fontSize: TYPOGRAPHY.fontSize.heading.h4,
                fontWeight: TYPOGRAPHY.fontWeight.bold
              }} aria-hidden="true">
                {indicator.icon}
              </div>
              <h3 style={{
                fontSize: TYPOGRAPHY.fontSize.body.large,
                fontWeight: TYPOGRAPHY.fontWeight.semibold,
                color: COLORS.text.primary,
                marginBottom: SPACING.unit.xs
              }}>
                {indicator.title}
              </h3>
              <p style={{
                color: COLORS.text.secondary,
                fontSize: TYPOGRAPHY.fontSize.body.small
              }}>
                {indicator.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

