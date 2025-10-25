import { FinalCTAHeaderContainer } from '../finalcta-header';
import { CTAButtonsContainer } from '../finalcta-buttons';
import { TrustIndicators } from '../finalcta-trust';

/**
 * Final CTA Main Section Component
 * 
 * Main orchestrator for the Final CTA section, combining:
 * - Header (title and description)
 * - CTA buttons (primary and secondary)
 * - Trust indicators (security, licensing, compliance)
 * 
 * @component FinalCTAMainSection
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function FinalCTAMainSection() {
  return (
    <section style={{
      padding: '48px 16px',
      background: 'linear-gradient(135deg, #2d5a27 0%, #09b44d 100%)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <FinalCTAHeaderContainer />
        </div>
        <CTAButtonsContainer />
        <TrustIndicators />
      </div>
    </section>
  );
}
