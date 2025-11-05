// Hero title component - under 50 lines per complexity rule
// Main page title

import { COLORS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function HeroTitle() {
  return (
    <h1 style={{
      ...TEXT_PRESETS.heroTitle,
      fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
      color: COLORS.neutral.gray900,
      marginBottom: "1rem",
      lineHeight: "1.3",
      background: COLORS.titleGradients.grayToGreen,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    }}>
      Structured Settlement Federal Law
    </h1>
  );
}
