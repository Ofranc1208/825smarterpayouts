import Step1Card from './Step1Card';
import Step2Card from './Step2Card';
import Step3Card from './Step3Card';
import Step4Card from './Step4Card';

export default function ProcessStepsGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      textAlign: 'center',
      marginBottom: '3rem'
    }}>
      <Step1Card />
      <Step2Card />
      <Step3Card />
      <Step4Card />
    </div>
  );
}
