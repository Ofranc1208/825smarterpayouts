import { COLORS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function FinalCTATitle() {
  return (
    <h2 style={{
      ...TEXT_PRESETS.heroTitle,
      color: COLORS.neutral.gray900,
      marginBottom: '1rem',
      background: COLORS.titleGradients.grayToGreen,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    }}>
      Ready to Start Your Court-Approved Process?
    </h2>
  );
}
