import ProcessTitle from './ProcessTitle';
import ProcessDescription from './ProcessDescription';

export default function ProcessHeaderContainer() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <ProcessTitle />
      <ProcessDescription />
    </div>
  );
}
