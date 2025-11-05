import Link from 'next/link';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '@/src/components/shared/styles';

export default function HearingPrepFeature() {
  return (
    <Link href="/mint-intelligent-chat" style={{
      textDecoration: 'none',
      display: 'block',
      padding: SPACING.card.compact,
      background: COLORS.backgrounds.white,
      borderRadius: BORDER_RADIUS.large,
      border: `1px solid ${COLORS.borders.blue}`,
      color: COLORS.accent.blue,
      transition: 'all 0.2s ease',
      width: '100%',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: TYPOGRAPHY.fontSize.heading.h2, marginBottom: SPACING.unit.xs }}>📋</div>
      <div style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold, fontSize: TYPOGRAPHY.fontSize.body.medium }}>Practice Hearing Prep</div>
    </Link>
  );
}
