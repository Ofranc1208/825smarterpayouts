import FinalCTATitle from './FinalCTATitle';
import FinalCTADescription from './FinalCTADescription';

export default function FinalCTAHeaderContainer() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <FinalCTATitle />
      <FinalCTADescription />
    </div>
  );
}
