import { SPACING } from '@/src/components/shared/styles';
import ProcessTitle from './ProcessTitle';
import ProcessDescription from './ProcessDescription';

export default function ProcessHeaderContainer() {
  return (
    <div style={{ 
      textAlign: 'center', 
      marginBottom: SPACING.stack.xl,
      padding: `0 ${SPACING.container.paddingX}`
    }}>
      <ProcessTitle />
      <ProcessDescription />
    </div>
  );
}
