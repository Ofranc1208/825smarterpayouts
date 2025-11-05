'use client';
import { COLORS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

interface HeroTitleProps {
  title: string;
  subtitle?: string;
}

export default function HeroTitle({ title, subtitle }: HeroTitleProps) {
  return (
    <>
      <h1 style={{
        ...TEXT_PRESETS.heroTitle,
        color: COLORS.neutral.gray900,
        marginBottom: "1rem",
        background: COLORS.titleGradients.grayToGreen,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{
          fontSize: "1rem",
          color: COLORS.text.secondary,
          marginBottom: "0.75rem"
        }}>
          {subtitle}
        </p>
      )}
    </>
  );
}
