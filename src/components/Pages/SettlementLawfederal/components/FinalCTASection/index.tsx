// Final CTA Section orchestrator - under 50 lines per complexity rule
// Combines all final CTA components

import { CTAContainer } from './cta-container';
import { CTATitle, CTADescription } from './cta-header';
import { CTAButtons } from './cta-buttons';

export default function FinalCTASection() {
  return (
    <CTAContainer>
      <CTATitle />
      <CTADescription />
      <CTAButtons />
    </CTAContainer>
  );
}
