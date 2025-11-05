import { COLORS, SPACING, BORDER_RADIUS, BOX_SHADOWS, TYPOGRAPHY } from '@/src/components/shared/styles';

export default function TestimonialSection() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: `${SPACING.stack.xl} auto`,
      padding: `0 ${SPACING.container.paddingX}`
    }}>
      <div style={{
        background: COLORS.backgrounds.white,
        borderRadius: BORDER_RADIUS.xlarge,
        padding: SPACING.card.standard,
        boxShadow: BOX_SHADOWS.medium,
        border: `1px solid ${COLORS.borders.light}`,
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: COLORS.backgrounds.white,
          padding: `0 ${SPACING.unit.md}`,
          fontSize: TYPOGRAPHY.fontSize.heading.h3
        }}>💬</div>
        <blockquote style={{ margin: 0, paddingTop: SPACING.unit.md }}>
          <p style={{
            fontSize: TYPOGRAPHY.fontSize.body.large,
            fontStyle: 'italic',
            color: COLORS.text.secondary,
            marginBottom: SPACING.unit.md,
            lineHeight: TYPOGRAPHY.lineHeight.relaxed,
            maxWidth: '600px',
            margin: `0 auto ${SPACING.unit.md}`
          }}>
            "I was nervous about the court process, but SmarterPayouts made it easy. <strong>Mint AI helped me practice what to say!</strong> The judge commented on how well-prepared I was."
          </p>
          <footer style={{
            fontSize: TYPOGRAPHY.fontSize.body.medium,
            color: COLORS.text.tertiary,
            fontWeight: TYPOGRAPHY.fontWeight.semibold
          }}>
            — M. Lee, Florida
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
