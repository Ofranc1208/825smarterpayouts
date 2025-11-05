/**
 * Community Section Component - Social Media Page
 * 
 * Displays the "Join Our Community" section with benefit cards.
 * Uses design system tokens for consistent styling.
 * 
 * @component
 * @returns {JSX.Element} Rendered community section with benefit cards
 * 
 * @example
 * <CommunitySection />
 */

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function CommunitySection() {
  return (
    <section style={{
      background: COLORS.backgrounds.lightGray,
      paddingTop: SPACING.unit.xl,
      paddingBottom: SPACING.unit.xl,
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
          textAlign: 'center',
          marginBottom: SPACING.unit.lg
        }}>
          <div style={{
            maxWidth: '800px'
          }}>
            <h2 style={{
              ...TEXT_PRESETS.heroTitle,
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              color: COLORS.neutral.gray900,
              marginBottom: SPACING.stack.sm,
              background: COLORS.titleGradients.grayToGreen,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Join Our Community
            </h2>
            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.medium,
              color: COLORS.text.secondary,
              marginBottom: SPACING.unit.lg
            }}>
              Connect with thousands of clients who trust SmarterPayouts.
            </p>
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: SPACING.grid.standard
        }}>
          <div>
            <div style={{
              background: COLORS.backgrounds.white,
              borderRadius: BORDER_RADIUS.medium,
              padding: SPACING.card.standard,
              textAlign: "center",
              border: `1px solid ${COLORS.borders.light}`
            }}>
              <div style={{
                width: "64px",
                height: "64px",
                background: "linear-gradient(135deg, #059669, #047857)",
                borderRadius: BORDER_RADIUS.full,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: `0 auto ${SPACING.stack.md}`,
                color: COLORS.backgrounds.white,
                fontSize: TYPOGRAPHY.fontSize.heading.h4,
                fontWeight: TYPOGRAPHY.fontWeight.bold
              }}>
                📈
              </div>
              <h3 style={{
                fontSize: TYPOGRAPHY.fontSize.body.large,
                fontWeight: TYPOGRAPHY.fontWeight.semibold,
                color: COLORS.text.primary,
                marginBottom: SPACING.unit.xs
              }}>
                Latest Updates
              </h3>
              <p style={{
                color: COLORS.text.secondary,
                fontSize: TYPOGRAPHY.fontSize.body.small
              }}>
                Get real-time updates about structured settlement news and industry changes.
              </p>
            </div>
          </div>
          <div>
            <div style={{
              background: COLORS.backgrounds.white,
              borderRadius: BORDER_RADIUS.medium,
              padding: SPACING.card.standard,
              textAlign: "center",
              border: `1px solid ${COLORS.borders.light}`
            }}>
              <div style={{
                width: "64px",
                height: "64px",
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                borderRadius: BORDER_RADIUS.full,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: `0 auto ${SPACING.stack.md}`,
                color: COLORS.backgrounds.white,
                fontSize: TYPOGRAPHY.fontSize.heading.h4,
                fontWeight: TYPOGRAPHY.fontWeight.bold
              }}>
                💡
              </div>
              <h3 style={{
                fontSize: TYPOGRAPHY.fontSize.body.large,
                fontWeight: TYPOGRAPHY.fontWeight.semibold,
                color: COLORS.text.primary,
                marginBottom: SPACING.unit.xs
              }}>
                Expert Tips
              </h3>
              <p style={{
                color: COLORS.text.secondary,
                fontSize: TYPOGRAPHY.fontSize.body.small
              }}>
                Receive valuable insights and tips from our structured settlement experts.
              </p>
            </div>
          </div>
          <div>
            <div style={{
              background: COLORS.backgrounds.white,
              borderRadius: BORDER_RADIUS.medium,
              padding: SPACING.card.standard,
              textAlign: "center",
              border: `1px solid ${COLORS.borders.light}`
            }}>
              <div style={{
                width: "64px",
                height: "64px",
                background: "linear-gradient(135deg, #059669, #047857)",
                borderRadius: BORDER_RADIUS.full,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: `0 auto ${SPACING.stack.md}`,
                color: COLORS.backgrounds.white,
                fontSize: TYPOGRAPHY.fontSize.heading.h4,
                fontWeight: TYPOGRAPHY.fontWeight.bold
              }}>
                🤝
              </div>
              <h3 style={{
                fontSize: TYPOGRAPHY.fontSize.body.large,
                fontWeight: TYPOGRAPHY.fontWeight.semibold,
                color: COLORS.text.primary,
                marginBottom: SPACING.unit.xs
              }}>
                Community Support
              </h3>
              <p style={{
                color: COLORS.text.secondary,
                fontSize: TYPOGRAPHY.fontSize.body.small
              }}>
                Connect with others who have gone through similar experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
