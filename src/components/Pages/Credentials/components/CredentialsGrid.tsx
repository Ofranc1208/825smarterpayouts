/**
 * Credentials Grid Component - Credentials Page
 * 
 * Displays credential cards in a grid with verification links.
 * Uses design system tokens for consistent styling.
 * Fully accessible with ARIA labels and keyboard navigation.
 * 
 * @component
 * @returns {JSX.Element} Rendered credentials grid
 * 
 * @example
 * <CredentialsGrid />
 */

'use client';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';

/**
 * Interface for credential verification data
 */
interface Credential {
  title: string;
  description: string;
  link: string;
  linkText: string;
  color: string;
  accentColor: string;
  icon: string;
}

/**
 * Array of credential verification sources
 */
const credentials: Credential[] = [
  {
    title: 'Florida Corporation Registration',
    description: 'SmarterPayouts is a fully registered legal entity in the State of Florida. This official record verifies our legal standing and corporate identity.',
    link: 'https://search.sunbiz.org/Inquiry/CorporationSearch/ByName',
    linkText: 'Verify on Sunbiz',
    color: '#059669',
    accentColor: '#047857',
    icon: '📋'
  },
  {
    title: 'SSL Certificate of Incorporation',
    description: 'Our website and backend operations are secured with full SSL certification. This ensures secure, encrypted communication for all user activity.',
    link: 'https://www.ssllabs.com/ssltest/analyze.html?d=smarterpayouts.com',
    linkText: 'Check SSL',
    color: '#059669',
    accentColor: '#047857',
    icon: '🔒'
  }
];

export default function CredentialsGrid() {
  return (
    <section style={{
      width: '100%',
      maxWidth: SPACING.container.maxWidth,
      margin: '0 auto',
      paddingTop: SPACING.unit.xxxl,
      paddingBottom: SPACING.unit.xxxl,
      paddingLeft: SPACING.unit.md,
      paddingRight: SPACING.unit.md
    }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: SPACING.grid.standard
        }}>
        {credentials.map((credential) => (
          <div key={credential.title}>
            <div style={{
              background: COLORS.backgrounds.white,
              borderRadius: BORDER_RADIUS.large,
              padding: SPACING.card.comfortable,
              boxShadow: BOX_SHADOWS.medium,
              border: `1px solid ${COLORS.borders.light}`,
              height: "100%",
              transition: "all 0.3s ease",
              position: "relative"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = BOX_SHADOWS.large;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = BOX_SHADOWS.medium;
            }}>
              
              {/* Accent Bar */}
              <div style={{
                position: "absolute",
                top: "0",
                left: "50%",
                transform: "translateX(-50%)",
                width: "48px",
                height: "4px",
                borderRadius: BORDER_RADIUS.sm,
                background: credential.color
              }}></div>

              {/* Icon */}
              <div style={{ textAlign: "center", marginBottom: SPACING.stack.lg }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  background: `linear-gradient(135deg, ${credential.color}, ${credential.accentColor})`,
                  borderRadius: BORDER_RADIUS.full,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  fontSize: "2rem",
                  color: COLORS.backgrounds.white,
                  boxShadow: `0 8px 16px ${credential.color}40`
                }}>
                  {credential.icon}
                </div>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: TYPOGRAPHY.fontSize.heading.h4,
                fontWeight: TYPOGRAPHY.fontWeight.semibold,
                color: credential.color,
                textAlign: "center",
                marginBottom: SPACING.stack.md
              }}>
                {credential.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: TYPOGRAPHY.fontSize.body.medium,
                color: COLORS.text.secondary,
                lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                marginBottom: SPACING.stack.lg,
                textAlign: "center"
              }}>
                {credential.description}
              </p>

              {/* Verify Button */}
              <div style={{ textAlign: "center" }}>
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`${credential.linkText} - Opens in new tab`}
                  style={{
                    display: "inline-block",
                    background: credential.color,
                    color: COLORS.backgrounds.white,
                    padding: `${SPACING.unit.sm} ${SPACING.unit.lg}`,
                    borderRadius: BORDER_RADIUS.small,
                    fontWeight: TYPOGRAPHY.fontWeight.semibold,
                    fontSize: TYPOGRAPHY.fontSize.body.medium,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: "none",
                    textAlign: "center",
                    outline: "none"
                  }}
                  onClick={() => window.open(credential.link, '_blank', 'noopener,noreferrer')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.open(credential.link, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = credential.accentColor;
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = credential.color;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${credential.color}40`;
                    e.currentTarget.style.outline = `2px solid ${credential.color}`;
                    e.currentTarget.style.outlineOffset = "2px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.outline = "none";
                  }}
                >
                  {credential.linkText}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

