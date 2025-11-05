import { SPACING } from '@/src/components/shared/styles';
import { ProcessHeaderContainer } from '../process-header';
import { ProcessStepsGrid } from '../process-steps';

export default function ProcessContent() {
  return (
    <div style={{
      width: '100%',
      maxWidth: SPACING.container.maxWidth,
      margin: '0 auto'
    }}>
      <ProcessHeaderContainer />
      <ProcessStepsGrid />
    </div>
  );
}
