import { COLORS, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';

interface MintBackgroundProps {
  children: React.ReactNode;
}

export default function MintBackground({ children }: MintBackgroundProps) {
  return (
    <div style={{
      background: COLORS.backgrounds.white,
      padding: `${SPACING.unit.lg} ${SPACING.container.paddingX}`,
      textAlign: 'center',
      maxWidth: SPACING.container.maxWidth,
      margin: `${SPACING.stack.lg} auto`
    }}>
      {children}
    </div>
  );
}
