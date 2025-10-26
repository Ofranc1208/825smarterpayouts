/**
 * Platforms Section Component - Social Media Page
 * 
 * Displays social media platform cards in a grid with interactive hover effects.
 * Uses design system tokens and shared Button components.
 * 
 * @component
 * @returns {JSX.Element} Rendered platforms section with social media cards
 * 
 * @example
 * <PlatformsSection />
 */

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';

const platforms = [
  {
    name: 'YouTube',
    icon: '▶️',
    color: '#FF0000',
    gradient: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
    desc: 'Subscribe to our YouTube channel for educational videos about structured settlements and financial planning.',
    link: 'https://youtube.com/@smarterpayouts'
  },
  {
    name: 'Facebook',
    icon: '🌐',
    color: '#1877F2',
    gradient: 'linear-gradient(135deg, #1877F2 0%, #166FE5 100%)',
    desc: 'Follow us on Facebook to stay updated with our latest news and community posts.',
    link: 'https://facebook.com/smarterpayouts'
  },
  {
    name: 'X',
    icon: '𝕏',
    color: '#000000',
    gradient: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
    desc: 'Join us on X for real-time updates, tips, and industry insights.',
    link: 'https://x.com/smarterpayouts'
  },
  {
    name: 'Instagram',
    icon: '📷',
    color: '#E4405F',
    gradient: 'linear-gradient(135deg, #E4405F 0%, #C13584 100%)',
    desc: 'Connect with us on Instagram for behind-the-scenes content and company highlights.',
    link: 'https://instagram.com/smarterpayouts'
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    color: '#0A66C2',
    gradient: 'linear-gradient(135deg, #0A66C2 0%, #0077B5 100%)',
    desc: 'Follow our LinkedIn page for professional updates and business news.',
    link: 'https://linkedin.com/company/smarterpayouts'
  }
];

export default function PlatformsSection() {
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
      {/* Section Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: SPACING.unit.xxxl
      }}>
        <h2 style={{
          fontSize: TYPOGRAPHY.fontSize.heading.h2,
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          color: COLORS.text.primary,
          marginBottom: SPACING.stack.md
        }}>
          Follow Us on Social Media
        </h2>
        <p style={{
          fontSize: TYPOGRAPHY.fontSize.body.large,
          color: COLORS.text.secondary,
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: TYPOGRAPHY.lineHeight.relaxed
        }}>
          Connect with us across all platforms for the latest updates, tips, and community discussions.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: SPACING.grid.comfortable
      }}>
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              background: COLORS.backgrounds.white,
              borderRadius: BORDER_RADIUS.large,
              padding: SPACING.card.comfortable,
              boxShadow: BOX_SHADOWS.medium,
              border: `1px solid ${COLORS.borders.light}`,
              height: "100%",
              transition: "all 0.3s ease",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "280px"
            }}>
              
              {/* Top Content */}
              <div>
                {/* Platform Icon */}
                <div style={{ textAlign: "center", marginBottom: SPACING.stack.lg }}>
                  <div style={{
                    width: "80px",
                    height: "80px",
                    background: platform.gradient,
                    borderRadius: BORDER_RADIUS.full,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    fontSize: "2.5rem",
                    color: COLORS.backgrounds.white,
                    boxShadow: `0 8px 16px ${platform.color}40`
                  }}>
                    {platform.icon}
                  </div>
                </div>

                {/* Platform Name */}
                <h3 style={{
                  fontSize: TYPOGRAPHY.fontSize.heading.h4,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  color: platform.color,
                  textAlign: "center",
                  marginBottom: SPACING.stack.md
                }}>
                  {platform.name}
                </h3>

                {/* Platform Description */}
                <p style={{
                  fontSize: TYPOGRAPHY.fontSize.body.medium,
                  color: COLORS.text.secondary,
                  lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                  textAlign: "center",
                  marginBottom: SPACING.stack.lg
                }}>
                  {platform.desc}
                </p>
              </div>

              {/* Follow Button */}
              <div style={{ textAlign: "center", marginTop: "auto" }}>
                <span
                  style={{
                    display: "inline-block",
                    background: platform.gradient,
                    color: COLORS.backgrounds.white,
                    padding: `${SPACING.unit.sm} ${SPACING.unit.lg}`,
                    borderRadius: BORDER_RADIUS.small,
                    fontWeight: TYPOGRAPHY.fontWeight.semibold,
                    fontSize: TYPOGRAPHY.fontSize.body.medium,
                    border: "none",
                    minWidth: "200px",
                    textAlign: "center"
                  }}
                >
                  Follow on {platform.name}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
