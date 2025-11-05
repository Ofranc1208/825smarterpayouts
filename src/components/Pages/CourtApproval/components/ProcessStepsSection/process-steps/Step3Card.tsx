import Link from 'next/link';
import { COLORS, SPACING, BORDER_RADIUS, BOX_SHADOWS, TYPOGRAPHY } from '@/src/components/shared/styles';

export default function Step3Card() {
  return (
    <div>
      <div style={{
        background: COLORS.backgrounds.white,
        borderRadius: BORDER_RADIUS.xlarge,
        padding: SPACING.card.compact,
        boxShadow: BOX_SHADOWS.small,
        border: `1px solid ${COLORS.borders.light}`,
        height: '100%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #f59e0b, #eab308)'
        }}></div>
        <div style={{ fontSize: TYPOGRAPHY.fontSize.heading.h1, marginBottom: SPACING.unit.md }}>🏛️</div>
        <div style={{
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: COLORS.text.white,
          padding: `${SPACING.unit.xs} ${SPACING.unit.md}`,
          borderRadius: BORDER_RADIUS.full,
          fontSize: TYPOGRAPHY.fontSize.body.small,
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          marginBottom: SPACING.unit.md,
          display: 'inline-block'
        }}>Step 3</div>
        <h5 style={{ 
          color: COLORS.primary.dark, 
          fontWeight: TYPOGRAPHY.fontWeight.bold, 
          marginBottom: SPACING.unit.md,
          fontSize: TYPOGRAPHY.fontSize.heading.h5
        }}>Court Hearing</h5>
        <p style={{ 
          color: COLORS.text.secondary, 
          lineHeight: TYPOGRAPHY.lineHeight.relaxed,
          fontSize: TYPOGRAPHY.fontSize.body.medium,
          marginBottom: SPACING.unit.md
        }}>
          Some states require a brief hearing. You may join by phone, Zoom, or in person. We'll walk you through everything.
        </p>
        <Link href="/mint-intelligent-chat" style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: SPACING.unit.md,
          padding: SPACING.unit.sm,
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
          borderRadius: BORDER_RADIUS.medium,
          border: `1px solid ${COLORS.accent.gold}`,
          color: COLORS.accent.goldDarker,
          fontSize: TYPOGRAPHY.fontSize.body.small,
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          transition: 'all 0.2s ease',
          gap: SPACING.inline.xs
        }}>
          <img
            src="/assets/images/mint-mascot.png"
            alt="Mint AI"
            style={{
              width: '18px',
              height: '18px',
              objectFit: 'contain'
            }}
          />
          Practice with Mint AI
        </Link>
      </div>
    </div>
  );
}
