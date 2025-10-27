'use client';

interface HeroDescriptionProps {
  description: string;
}

export default function HeroDescription({ description }: HeroDescriptionProps) {
  return (
    <p style={{
      fontSize: "1.125rem",
      color: "#6b7280",
      maxWidth: "600px",
      margin: "0 auto 1.5rem",
      lineHeight: "1.6"
    }}>
      {description}
    </p>
  );
}
