import { SITE_STATS } from '../../../../../../../app/config/siteConfig';
import { COLORS, SPACING, BORDER_RADIUS, BOX_SHADOWS, TYPOGRAPHY } from '@/src/components/shared/styles';

export default function Step4Card() {
  return (
    <div>
      <div style={{
        background: COLORS.backgrounds.greenLight,
        borderRadius: BORDER_RADIUS.xlarge,
        padding: SPACING.card.compact,
        boxShadow: BOX_SHADOWS.medium,
        border: `2px solid ${COLORS.borders.green}`,
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
          background: 'linear-gradient(90deg, #059669, #34d399)'
        }}></div>
        <div style={{ fontSize: TYPOGRAPHY.fontSize.heading.h1, marginBottom: SPACING.unit.md }}>✅</div>
        <div style={{
          background: COLORS.primary.gradient,
          color: COLORS.text.white,
          padding: `${SPACING.unit.xs} ${SPACING.unit.md}`,
          borderRadius: BORDER_RADIUS.full,
          fontSize: TYPOGRAPHY.fontSize.body.small,
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          marginBottom: SPACING.unit.md,
          display: 'inline-block'
        }}>Step 4</div>
        <h5 style={{ 
          color: COLORS.primary.dark, 
          fontWeight: TYPOGRAPHY.fontWeight.bold, 
          marginBottom: SPACING.unit.md,
          fontSize: TYPOGRAPHY.fontSize.heading.h5
        }}>Approval & Funding</h5>
        <p style={{ 
          color: COLORS.text.greenDark, 
          lineHeight: TYPOGRAPHY.lineHeight.relaxed,
          fontSize: TYPOGRAPHY.fontSize.body.medium,
          marginBottom: SPACING.unit.md
        }}>
          Once approved, your Early Payout is typically released within 5–7 business days.
        </p>
        <div style={{
          marginTop: SPACING.unit.md,
          padding: SPACING.unit.sm,
          background: COLORS.backgrounds.white,
          borderRadius: BORDER_RADIUS.medium,
          border: `1px solid ${COLORS.borders.green}`
        }}>
          <div style={{ 
            fontSize: TYPOGRAPHY.fontSize.body.small, 
            color: COLORS.primary.dark, 
            fontWeight: TYPOGRAPHY.fontWeight.semibold 
          }}>
            💰 Average: {SITE_STATS.avgDays.value} days
          </div>
        </div>
      </div>
    </div>
  );
}
