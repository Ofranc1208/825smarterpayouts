// Final CTA section component - now modular and under 50 lines
// Orchestrates all CTA subcomponents following enterprise patterns

import { CTATitle, CTADescription } from '../cta-header';
import { CTAButtons } from '../cta-buttons';
import { CTAContainer } from '../cta-container';

export default function FinalCTASection() {
  return (
    <CTAContainer>
      <CTATitle />
      <CTADescription />
      <CTAButtons />
    </CTAContainer>
  );
}
