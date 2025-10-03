/**
 * CTA Section Component - Articles Page
 * 
 * Displays final call-to-action buttons for conversion.
 * Uses design system tokens and shared Button components.
 * Fully accessible with semantic HTML and proper ARIA labels.
 * 
 * @component
 * @returns {JSX.Element} Rendered CTA section with action buttons
 * 
 * @example
 * <CTASection />
 */

import Button from '@/src/components/shared/Button';
import { SPACING } from '@/src/components/shared/styles';

export default function CTASection() {
  return (
    <>
      {/* Primary CTA - Get Quote */}
      <section
        aria-label="Get your instant quote"
        style={{
          textAlign: 'center',
          marginTop: SPACING.unit.xxl,
          paddingLeft: SPACING.unit.md,
          paddingRight: SPACING.unit.md
        }}
      >
        <Button
          as="a"
          href="/pricing-calculator"
          variant="technology-primary"
          size="lg"
          enhancedHover={true}
          shimmer={true}
        >
          💰 Get Your Instant Quote
        </Button>
      </section>

      {/* Secondary CTA - Chat with Mint AI */}
      <section 
        aria-label="Chat with Mint AI"
        style={{ 
          textAlign: 'center', 
          marginTop: SPACING.unit.lg,
          marginBottom: SPACING.unit.xxxl,
          paddingLeft: SPACING.unit.md,
          paddingRight: SPACING.unit.md
        }}
      >
        <Button
          as="a"
          href="/mint-intelligent-chat"
          variant="technology-secondary"
          size="lg"
          enhancedHover={true}
          shimmer={true}
          shimmerDelay={1}
        >
          💬 Chat with Mint AI
        </Button>
      </section>
    </>
  );
}

