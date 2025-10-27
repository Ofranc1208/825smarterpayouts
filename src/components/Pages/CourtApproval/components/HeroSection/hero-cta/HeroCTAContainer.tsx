import PrimaryCTAButton from './PrimaryCTAButton';
import SecondaryCTAButton from './SecondaryCTAButton';

export default function HeroCTAContainer() {
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '1.5rem'
    }}>
      <PrimaryCTAButton />
      <SecondaryCTAButton />
    </div>
  );
}
