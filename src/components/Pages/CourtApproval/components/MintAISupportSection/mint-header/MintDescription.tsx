import { COLORS, SPACING, TYPOGRAPHY } from '@/src/components/shared/styles';

export default function MintDescription() {
  return (
    <p style={{
      fontSize: TYPOGRAPHY.fontSize.body.medium,
      color: COLORS.text.secondary,
      maxWidth: '600px',
      margin: `0 auto ${SPACING.stack.md}`,
      lineHeight: TYPOGRAPHY.lineHeight.relaxed
    }}>
      Get help anytime with court requirements and hearing preparation.
    </p>
  );
}
