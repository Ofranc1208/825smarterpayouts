// Disclaimer Section main orchestrator - under 50 lines per complexity rule
// Orchestrates all disclaimer subcomponents following enterprise patterns

import { DisclaimerTitle, DisclaimerText } from './disclaimer-content';
import { DisclaimerContainer } from './disclaimer-container';

export default function DisclaimerSection() {
  return (
    <DisclaimerContainer>
      <DisclaimerTitle />
      <DisclaimerText />
    </DisclaimerContainer>
  );
}
