'use client';

interface HeroTitleProps {
  title: string;
  subtitle?: string;
}

export default function HeroTitle({ title, subtitle }: HeroTitleProps) {
  return (
    <>
      {subtitle && (
        <div style={{
          fontSize: "0.875rem",
          fontWeight: "600",
          color: "#059669",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "0.75rem"
        }}>
          {subtitle}
        </div>
      )}
      <h1 style={{
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        fontWeight: "700",
        color: "#1f2937",
        marginBottom: "1rem",
        lineHeight: "1.2"
      }}>
        {title}
      </h1>
    </>
  );
}
