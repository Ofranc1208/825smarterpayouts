import { COLORS, SPACING } from '@/src/components/shared/styles';

interface ProcessBackgroundProps {
  children: React.ReactNode;
}

export default function ProcessBackground({ children }: ProcessBackgroundProps) {
  return (
    <section style={{
      background: COLORS.backgrounds.lightGray,
      padding: `${SPACING.unit.lg} ${SPACING.container.paddingX}`
    }}>
      {children}
    </section>
  );
}
