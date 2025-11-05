import { COLORS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function HeroTitle() {
  return (
    <h1
      id="hero-heading"
      style={{
        ...TEXT_PRESETS.heroTitle,
        color: COLORS.neutral.gray900,
        marginBottom: "1rem",
        background: COLORS.titleGradients.grayToGreen,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}
    >
      Court Approved Structured Settlements
    </h1>
  );
}
