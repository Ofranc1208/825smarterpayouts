/**
 * Content Section Component - Privacy Page
 *
 * Displays the main privacy policy content with organized sections.
 * Uses design system tokens for consistent styling.
 *
 * @component
 * @returns {JSX.Element} Rendered privacy policy content
 *
 * @example
 * <ContentSection />
 */

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

const privacySections = [
  {
    icon: '📝',
    title: 'Information We Collect',
    items: [
      {
        label: 'Information you provide:',
        text: 'Name, email, and details you submit via forms or calculators.'
      },
      {
        label: 'Automatic data:',
        text: 'IP address, browser type, device info, and usage data collected via cookies and analytics tools.'
      }
    ]
  },
  {
    icon: '🎯',
    title: 'How We Use Your Information',
    items: [
      { text: 'To provide quotes, respond to inquiries, and deliver services you request.' },
      { text: 'To improve our website, user experience, and customer support.' },
      { text: 'To comply with legal obligations and prevent fraud.' }
    ]
  },
  {
    icon: '🔐',
    title: 'How We Protect Your Data',
    items: [
      { text: 'We use industry-standard encryption and security measures.' },
      { text: 'We never sell or rent your personal information.', bold: true },
      { text: 'Access to your data is limited to authorized team members only.' }
    ]
  },
  {
    icon: '🍪',
    title: 'Cookies & Analytics',
    description: 'We use cookies and analytics tools (like Google Analytics) to understand how visitors use our site. You can control cookie preferences in your browser settings.'
  },
  {
    icon: '⚖️',
    title: 'Your Rights',
    items: [
      { text: 'You can request, update, or delete your personal information at any time.' },
      { 
        text: 'Contact us at ',
        link: { text: 'support@smarterpayouts.com', href: 'mailto:support@smarterpayouts.com' },
        afterLink: ' for privacy requests.'
      }
    ]
  },
  {
    icon: '🔄',
    title: 'Policy Updates',
    description: 'We may update this policy from time to time. Changes will be posted on this page with a new effective date.'
  }
];

export default function ContentSection() {
  return (
    <section
      aria-label="Privacy policy content"
      style={{
        background: COLORS.backgrounds.white,
        paddingTop: SPACING.unit.xxxxl,
        paddingBottom: SPACING.unit.xxxxl,
        paddingLeft: SPACING.unit.md,
        paddingRight: SPACING.unit.md
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          background: COLORS.backgrounds.white,
          borderRadius: BORDER_RADIUS.large,
          padding: SPACING.card.comfortable,
          boxShadow: BOX_SHADOWS.small,
          border: `1px solid ${COLORS.borders.light}`
        }}>
          <div style={{ textAlign: 'center', marginBottom: SPACING.stack.xxxl }}>
            <h2 style={{
              ...TEXT_PRESETS.heroTitle,
              background: COLORS.titleGradients.grayToGreen,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: SPACING.stack.md,
              fontSize: 'clamp(1.5rem, 3.5vw, 2rem)'
            }}>
              Our Commitment to Your Privacy
            </h2>
            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.medium,
              color: COLORS.text.secondary,
              lineHeight: TYPOGRAPHY.lineHeight.relaxed
            }}>
              SmarterPayouts is committed to protecting your privacy and ensuring your personal information is handled securely and transparently.
            </p>
          </div>

          {/* Privacy Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.stack.xxl }}>
            {privacySections.map((section, index) => (
              <div key={index}>
                <h3 style={{
                  fontSize: TYPOGRAPHY.fontSize.heading.h5,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  color: COLORS.primary.main,
                  marginBottom: SPACING.stack.md
                }}>
                  {section.title}
                </h3>

                {section.description && (
                  <p style={{
                    color: COLORS.text.secondary,
                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                    fontSize: TYPOGRAPHY.fontSize.body.medium
                  }}>
                    {section.description}
                  </p>
                )}

                {section.items && (
                  <ul style={{
                    color: COLORS.text.secondary,
                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                    paddingLeft: SPACING.unit.xl,
                    fontSize: TYPOGRAPHY.fontSize.body.medium
                  }}>
                    {section.items.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: SPACING.unit.xs }}>
                        {item.label && <strong>{item.label}</strong>}
                        {item.text}
                        {item.bold && <strong>{item.text}</strong>}
                        {item.link && (
                          <>
                            <a
                              href={item.link.href}
                              style={{
                                color: COLORS.primary.main,
                                fontWeight: TYPOGRAPHY.fontWeight.semibold,
                                textDecoration: 'none'
                              }}
                            >
                              {item.link.text}
                            </a>
                            {item.afterLink}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

