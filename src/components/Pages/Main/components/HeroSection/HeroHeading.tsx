import { TEXT_PRESETS } from '../../shared/styles/typography';
import { COLORS } from '../../shared/styles/colorThemes';

export default function HeroHeading() {
  return (
    <>
      <h1 id="hero-heading" style={{
        ...TEXT_PRESETS.heroTitle,
        color: COLORS.primary.dark,
        marginBottom: "1rem"
      }}>
        Revolutionize Your Financial Future
      </h1>
      
      <p style={{
        ...TEXT_PRESETS.heroSubtitle,
        color: COLORS.neutral.gray700,
        maxWidth: "700px",
        margin: "0 auto 1.5rem"
      }}>
        Turn your future structured settlement payments into fast, upfront cash — with zero out-of-pocket cost and a fully court-approved process.
      </p>
    </>
  );
}

