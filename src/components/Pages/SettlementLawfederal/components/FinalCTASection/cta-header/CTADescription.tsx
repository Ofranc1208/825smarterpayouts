// Final CTA description - under 50 lines per complexity rule
// CTA subtitle text

import { COLORS, TYPOGRAPHY } from '@/src/components/shared/styles';

export default function CTADescription() {
  return (
    <p style={{
      fontSize: TYPOGRAPHY.fontSize.body.medium,
      color: COLORS.text.secondary,
      maxWidth: '600px',
      margin: '0 auto 2rem',
      lineHeight: TYPOGRAPHY.lineHeight.relaxed
    }}>
      Get your instant quote or chat with Mint AI to understand how federal laws apply to your specific situation.
    </p>
  );
}
