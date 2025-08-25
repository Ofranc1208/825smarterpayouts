import CourtProcessFeature from './CourtProcessFeature';
import HearingPrepFeature from './HearingPrepFeature';
import LegalRequirementsFeature from './LegalRequirementsFeature';

export default function MintFeaturesGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      justifyItems: 'center'
    }}>
      <CourtProcessFeature />
      <HearingPrepFeature />
      <LegalRequirementsFeature />
    </div>
  );
}
