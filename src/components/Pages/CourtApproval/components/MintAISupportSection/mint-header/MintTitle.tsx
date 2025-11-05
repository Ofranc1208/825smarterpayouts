import { COLORS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function MintTitle() {
  return (
    <h3 style={{
      ...TEXT_PRESETS.heroTitle,
      color: COLORS.neutral.gray900,
      marginBottom: '1rem',
      background: COLORS.titleGradients.grayToGreen,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    }}>
      Mint AI Support
    </h3>
  );
}
