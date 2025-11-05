import { COLORS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function ProcessTitle() {
  return (
    <h2 style={{
      ...TEXT_PRESETS.heroTitle,
      color: COLORS.neutral.gray900,
      marginBottom: '0.75rem',
      background: COLORS.titleGradients.grayToGreen,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    }}>
      How the Court Approval Process Works
    </h2>
  );
}
