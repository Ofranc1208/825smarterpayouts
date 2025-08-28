// Federal Laws Section orchestrator - under 50 lines per complexity rule
// Main section combining all law articles

import { LawsContainer } from './laws-container';
import { LawsTitle } from './laws-header';
import { PeriodicPaymentAct, ProtectionAct, TerrorismReliefAct } from './law-articles';

export default function FederalLawsSection() {
  return (
    <LawsContainer>
      <LawsTitle />
      <PeriodicPaymentAct />
      <ProtectionAct />
      <TerrorismReliefAct />
    </LawsContainer>
  );
}
