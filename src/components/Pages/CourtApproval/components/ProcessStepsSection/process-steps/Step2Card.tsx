import Link from 'next/link';
import { COLORS, SPACING, BORDER_RADIUS, BOX_SHADOWS, TYPOGRAPHY } from '@/src/components/shared/styles';

export default function Step2Card() {
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
          background: 'linear-gradient(90deg, #3b82f6, #06b6d4)'
        }}></div>
        <div style={{ fontSize: TYPOGRAPHY.fontSize.heading.h1, marginBottom: SPACING.unit.md }}>👨‍⚖️</div>
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          color: COLORS.text.white,
          padding: `${SPACING.unit.xs} ${SPACING.unit.md}`,
          borderRadius: BORDER_RADIUS.full,
          fontSize: TYPOGRAPHY.fontSize.body.small,
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          marginBottom: SPACING.unit.md,
          display: 'inline-block'
        }}>Step 2</div>
        <h5 style={{ 
          color: COLORS.primary.dark, 
          fontWeight: TYPOGRAPHY.fontWeight.bold, 
          marginBottom: SPACING.unit.md,
          fontSize: TYPOGRAPHY.fontSize.heading.h5
        }}>Judge Reviews</h5>
        <p style={{ 
          color: COLORS.text.secondary, 
          lineHeight: TYPOGRAPHY.lineHeight.relaxed,
          fontSize: TYPOGRAPHY.fontSize.body.medium,
          marginBottom: SPACING.unit.md
        }}>
          A judge reviews your paperwork, makes sure the offer is in your best interest, and ensures legal compliance.
        </p>
        <Link href="/structured-settlement-laws" style={{
          textDecoration: 'none',
          display: 'block',
          marginTop: SPACING.unit.md,
          padding: SPACING.unit.sm,
          background: COLORS.backgrounds.blueLight,
          borderRadius: BORDER_RADIUS.medium,
          border: `1px solid ${COLORS.borders.blue}`,
          color: COLORS.accent.blue,
          fontSize: TYPOGRAPHY.fontSize.body.small,
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          transition: 'all 0.2s ease'
        }}>
          📚 Learn About Legal Requirements
        </Link>
      </div>
    </div>
  );
}
