import { COLORS, SPACING } from '@/src/components/shared/styles';

interface HeroBackgroundProps {
  children: React.ReactNode;
}

export default function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <section style={{
      background: COLORS.backgrounds.slateGradient,
      padding: `${SPACING.unit.xl} 0`,
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern (matching Main page) */}
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: "radial-gradient(circle at 20% 80%, rgba(5, 150, 105, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)",
        pointerEvents: "none"
      }}></div>
      
      {children}
    </section>
  );
}
