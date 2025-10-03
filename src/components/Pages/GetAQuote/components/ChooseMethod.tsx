'use client';

import Link from 'next/link';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';
import { getAccentBorderCardStyles, getIconContainerStyles } from '@/src/components/shared/styles/cardStyles';
import { createFloatHover } from '@/src/components/shared/styles/hoverEffects';

export default function ChooseMethod() {
  return (
    <section style={{
      padding: SPACING.section.standard,
      background: COLORS.backgrounds.whiteToSlate,
      position: 'relative'
    }}>
      {/* Background Decorations */}
      <div style={{
        position: "absolute",
        top: "15%",
        right: "5%",
        width: "120px",
        height: "120px",
        background: COLORS.radialGradients.greenLighter,
        borderRadius: "50%",
        opacity: 0.6
      }}></div>

      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        padding: SPACING.container.paddingX,
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: SPACING.stack.xxl
        }}>
          <h2 style={{
            ...TEXT_PRESETS.sectionTitle,
            color: COLORS.neutral.gray900,
            marginBottom: SPACING.stack.md,
            background: COLORS.titleGradients.grayToGreen,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Choose Your Quote Method
          </h2>
          <p style={{
            ...TEXT_PRESETS.sectionSubtitle,
            color: COLORS.text.secondary,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Two simple ways to get your quote. Both are fast, secure, and pressure-free.
          </p>
        </div>

        {/* Quote Method Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: SPACING.grid.comfortable,
          marginBottom: SPACING.stack.xl
        }}>
          {/* AI Calculator Card */}
          <div
            style={{
              ...getAccentBorderCardStyles(COLORS.borders.green),
              height: '100%',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'translateY(0) scale(1)'
            }}
            {...createFloatHover({
              translateY: -8,
              scale: 1.02,
              shadowColor: COLORS.shadows.greenLight,
              shadowSize: '0 16px 40px'
            })}
            onClick={() => window.location.href = '/pricing-calculator'}
          >
            {/* Icon */}
            <div style={{
              ...getIconContainerStyles({
                size: '80px',
                borderRadius: BORDER_RADIUS.large,
                background: COLORS.primary.gradient,
                color: COLORS.text.white,
                fontSize: '2rem'
              }),
              margin: `0 auto ${SPACING.stack.md}`,
              boxShadow: `0 8px 24px ${COLORS.shadows.greenLight}`
            }}>
              🤖
            </div>

            <h3 style={{
              ...TEXT_PRESETS.cardTitle,
              color: COLORS.neutral.gray900,
              marginBottom: SPACING.stack.sm
            }}>
              AI Calculator
            </h3>

            <p style={{
              ...TEXT_PRESETS.cardText,
              color: COLORS.text.secondary,
              marginBottom: SPACING.stack.md
            }}>
              Instant quote in 60 seconds. No personal info required.
            </p>

            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: SPACING.inline.xs,
              fontSize: TYPOGRAPHY.fontSize.body.xsmall,
              fontWeight: TYPOGRAPHY.fontWeight.bold,
              color: COLORS.primary.main,
              background: COLORS.backgrounds.greenLight,
              padding: `${SPACING.unit.xxs} ${SPACING.unit.sm}`,
              borderRadius: BORDER_RADIUS.medium,
              letterSpacing: TYPOGRAPHY.letterSpacing.wide
            }}>
              ⚡ RECOMMENDED • 24/7 AVAILABLE
            </div>
          </div>

          {/* Talk to Expert Card */}
          <div
            style={{
              ...getAccentBorderCardStyles('#fbbf24'),
              height: '100%',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'translateY(0) scale(1)'
            }}
            {...createFloatHover({
              translateY: -8,
              scale: 1.02,
              shadowColor: COLORS.shadows.goldLight,
              shadowSize: '0 16px 40px'
            })}
            onClick={() => window.location.href = 'tel:+19547649750'}
          >
            {/* Icon */}
            <div style={{
              ...getIconContainerStyles({
                size: '80px',
                borderRadius: BORDER_RADIUS.large,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: COLORS.text.white,
                fontSize: '2rem'
              }),
              margin: `0 auto ${SPACING.stack.md}`,
              boxShadow: `0 8px 24px ${COLORS.shadows.goldLight}`
            }}>
              👨‍💼
            </div>

            <h3 style={{
              ...TEXT_PRESETS.cardTitle,
              color: COLORS.neutral.gray900,
              marginBottom: SPACING.stack.sm
            }}>
              Talk to Expert
            </h3>

            <p style={{
              ...TEXT_PRESETS.cardText,
              color: COLORS.text.secondary,
              marginBottom: SPACING.stack.md
            }}>
              Speak with our team for personalized guidance. No pressure.
            </p>

            {/* Phone Number */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: SPACING.inline.xs,
              fontSize: TYPOGRAPHY.fontSize.body.small,
              fontWeight: TYPOGRAPHY.fontWeight.bold,
              color: COLORS.accent.goldDarker,
              background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
              padding: `${SPACING.unit.xs} ${SPACING.unit.md}`,
              borderRadius: BORDER_RADIUS.medium,
              border: '1px solid #fbbf24'
            }}>
              📞 (954) 764-9750
            </div>
          </div>
        </div>

        {/* Help Text Card */}
        <div style={{
          textAlign: 'center',
          marginTop: SPACING.stack.xl,
          padding: SPACING.card.compact,
          background: 'rgba(240, 253, 244, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: BORDER_RADIUS.large,
          border: `1px solid ${COLORS.borders.green}`,
          boxShadow: BOX_SHADOWS.small
        }}>
          <p style={{
            margin: 0,
            color: COLORS.primary.dark,
            fontSize: TYPOGRAPHY.fontSize.body.medium,
            fontWeight: TYPOGRAPHY.fontWeight.medium
          }}>
            🤖 Need help choosing?{' '}
            <Link
              href="/mint-intelligent-chat"
              style={{
                color: COLORS.primary.main,
                fontWeight: TYPOGRAPHY.fontWeight.bold,
                textDecoration: 'none',
                borderBottom: `2px solid ${COLORS.primary.main}`
              }}
            >
              Ask Mint AI for guidance
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
