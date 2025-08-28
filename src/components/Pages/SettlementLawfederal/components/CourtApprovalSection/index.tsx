// Court Approval Section orchestrator - under 50 lines per complexity rule
// Combines all court approval components

import { CourtContainer } from './court-container';
import { CourtTitle } from './court-header';
import { CourtDescription, CourtProcessList, CourtWarning } from './court-content';

export default function CourtApprovalSection() {
  return (
    <CourtContainer>
      <CourtTitle />
      <CourtDescription />
      <CourtProcessList />
      <CourtWarning />
    </CourtContainer>
  );
}
