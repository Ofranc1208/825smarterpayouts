// Hero description component - under 50 lines per complexity rule
// Subtitle text

import { COLORS, TYPOGRAPHY } from '@/src/components/shared/styles';

export default function HeroDescription() {
  return (
    <p style={{
      fontSize: TYPOGRAPHY.fontSize.body.medium,
      color: COLORS.text.secondary,
      maxWidth: "700px",
      margin: "0 auto 2rem",
      lineHeight: TYPOGRAPHY.lineHeight.relaxed
    }}>
      Understanding the key federal laws, tax rules, and court approval processes governing structured settlements in the United States.
    </p>
  );
}
