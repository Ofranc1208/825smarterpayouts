'use client';
import { COLORS, TYPOGRAPHY } from '@/src/components/shared/styles';

interface HeroDescriptionProps {
  description: string;
}

export default function HeroDescription({ description }: HeroDescriptionProps) {
  return (
    <p style={{
      fontSize: TYPOGRAPHY.fontSize.body.medium,
      color: COLORS.text.secondary,
      maxWidth: "600px",
      margin: "0 auto 1.5rem",
      lineHeight: TYPOGRAPHY.lineHeight.relaxed
    }}>
      {description}
    </p>
  );
}
