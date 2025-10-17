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
        Unlock Your Settlement's Hidden Value Today
      </h1>
      
      <p style={{
        ...TEXT_PRESETS.heroSubtitle,
        color: COLORS.neutral.gray700,
        maxWidth: "600px",
        margin: "0 auto 1.5rem"
      }}>
        <strong>Court-approved process</strong> with zero upfront costs. No need to speak to a salesperson — <strong>do it yourself</strong> in seconds.     
      </p>
    </>
  );
}

