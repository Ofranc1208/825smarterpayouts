import Link from 'next/link';
import { getBodyStyles, TYPOGRAPHY } from '../../shared/styles/typography';
import { COLORS } from '../../shared/styles/colorThemes';

export default function HeroFooterText() {
  return (
    <p style={{
      ...getBodyStyles('medium', 'regular'),
      color: COLORS.neutral.gray500,
      maxWidth: "680px",
      margin: "0 auto 0 auto"
    }}>
      Our{' '}
      <Link href="/pricing-calculator" style={{
        color: COLORS.primary.dark,
        textDecoration: "underline",
        fontWeight: TYPOGRAPHY.fontWeight.medium
      }}>
        Early Payout Calculator
      </Link>{' '}
      gives you a private, instant quote. No calls, no sales pressure, and no personal data required.
    </p>
  );
}

