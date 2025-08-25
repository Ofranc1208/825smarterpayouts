import { ProcessHeaderContainer } from '../process-header';
import { ProcessStepsGrid } from '../process-steps';

export default function ProcessContent() {
  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <ProcessHeaderContainer />
      <ProcessStepsGrid />
    </div>
  );
}
