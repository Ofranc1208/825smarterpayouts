// Court approval section title - under 50 lines per complexity rule
// Section heading with icon

import { COLORS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function CourtTitle() {
  return (
    <h2 style={{
      ...TEXT_PRESETS.heroTitle,
      fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
      color: COLORS.neutral.gray900,
      marginBottom: '1.5rem',
      background: COLORS.titleGradients.grayToGreen,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    }}>
      Court Approval Process
    </h2>
  );
}
