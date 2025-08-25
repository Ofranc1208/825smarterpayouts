import { FinalCTAHeaderContainer } from '../final-cta-header';
import { FinalCTAButtonsContainer } from '../final-cta-buttons';
import { FinalCTAFooterContainer } from '../final-cta-footer';

export default function FinalCTAContent() {
  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <FinalCTAHeaderContainer />
      <FinalCTAButtonsContainer />
      <FinalCTAFooterContainer />
    </div>
  );
}
