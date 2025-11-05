import { SPACING } from '@/src/components/shared/styles';
import CourtProcessFeature from './CourtProcessFeature';
import HearingPrepFeature from './HearingPrepFeature';
import LegalRequirementsFeature from './LegalRequirementsFeature';

export default function MintFeaturesGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: SPACING.grid.comfortable,
      justifyItems: 'center',
      marginTop: SPACING.stack.md,
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <CourtProcessFeature />
      <HearingPrepFeature />
      <LegalRequirementsFeature />
    </div>
  );
}
