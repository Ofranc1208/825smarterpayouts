// Final CTA title - under 50 lines per complexity rule
// Main CTA heading

import { COLORS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function CTATitle() {
  return (
    <h2 style={{
      ...TEXT_PRESETS.heroTitle,
      fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
      color: COLORS.neutral.gray900,
      marginBottom: '1rem',
      background: COLORS.titleGradients.grayToGreen,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    }}>
      Need Help with Your Structured Settlement?
    </h2>
  );
}
