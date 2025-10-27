/**
 * Privacy Protection Section Component - Review Offer Page
 * 
 * Displays the four key privacy protection features with interactive cards.
 * Each card has hover effects for better user engagement.
 * 
 * @component
 * @returns {JSX.Element} Rendered privacy protection grid
 * 
 * @example
 * <PrivacyProtectionSection />
 */

'use client';

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';

const protectionFeatures = [
  {
    icon: '🔒',
    bgGradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    title: 'No Personal Info Needed',
    description: 'Get your quote instantly—no SSN, no credit check, no sensitive data required.'
  },
  {
    icon: '💻',
    bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    title: '100% Digital & Secure',
    description: 'All quotes and documents are handled securely online. Your privacy is protected at every step.'
  },
  {
    icon: '🛡️',
    bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    title: 'Confidential & Compliant',
    description: 'We never sell or rent your information. All processes are state and federally compliant.'
  },
  {
    icon: '🧑‍💻',
    bgGradient: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
    title: 'You Stay in Control',
    description: 'Only you decide what to share. We\'re here to help, not to pressure or collect unnecessary data.'
  }
];

function PrivacyCard({ feature }: { feature: typeof protectionFeatures[0] }) {
  return (
    <div>
      <div 
        style={{
          background: COLORS.backgrounds.white,
          borderRadius: BORDER_RADIUS.large,
          padding: SPACING.unit.lg,
          height: '100%',
          boxShadow: BOX_SHADOWS.small,
          border: `1px solid ${COLORS.borders.light}`,
          textAlign: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = BOX_SHADOWS.medium;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = BOX_SHADOWS.small;
        }}
      >
        <div style={{
          width: '64px',
          height: '64px',
          background: feature.bgGradient,
          borderRadius: BORDER_RADIUS.large,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: `0 auto ${SPACING.stack.md}`,
          fontSize: TYPOGRAPHY.fontSize.heading.h2
        }}>
          {feature.icon}
        </div>
        <h3 style={{
          fontSize: TYPOGRAPHY.fontSize.heading.h5,
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          color: COLORS.text.primary,
          marginBottom: SPACING.unit.sm
        }}>
          {feature.title}
        </h3>
        <p style={{
          color: COLORS.text.secondary,
          lineHeight: TYPOGRAPHY.lineHeight.relaxed,
          margin: 0,
          fontSize: TYPOGRAPHY.fontSize.body.medium
        }}>
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default function PrivacyProtectionSection() {
  return (
    <section
      aria-label="Privacy protection features"
      style={{
        background: COLORS.backgrounds.white,
        paddingTop: SPACING.unit.lg,
        paddingBottom: SPACING.unit.lg,
        paddingLeft: SPACING.unit.md,
        paddingRight: SPACING.unit.md
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: SPACING.stack.xl }}>
          <h2 style={{
            fontSize: TYPOGRAPHY.fontSize.heading.h2,
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            color: COLORS.text.primary,
            marginBottom: SPACING.unit.md
          }}>
            How We Protect Your Privacy
          </h2>
          <p style={{
            fontSize: TYPOGRAPHY.fontSize.body.large,
            color: COLORS.text.secondary,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: TYPOGRAPHY.lineHeight.relaxed
          }}>
            Your privacy and security are our top priorities throughout the entire process.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: SPACING.grid.comfortable
        }}>
          {protectionFeatures.map((feature, index) => (
            <PrivacyCard key={index} feature={feature} />
          ))}
        </div>

      </div>
    </section>
  );
}

