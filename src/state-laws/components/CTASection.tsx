// Reusable Call-to-Action Section for State Laws Pages
// Enterprise component with consistent styling and analytics

'use client';

import Button from '@/src/components/shared/Button';
import { SPACING, COLORS, TYPOGRAPHY, BORDER_RADIUS } from '@/src/components/shared/styles';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  primaryButtonOnClick?: () => void;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  secondaryButtonOnClick?: () => void;
  className?: string;
  variant?: 'default' | 'compact';
}

export default function CTASection({
  title = "Ready to Get Your Cash?",
  description = "Connect with our specialists to discuss your structured settlement options and get a personalized offer.",
  primaryButtonText = "💰 Get Your Instant Quote",
  primaryButtonHref = "/mint-chat-active?type=calculate&source=state-laws-cta",
  primaryButtonOnClick,
  secondaryButtonText = "💬 Chat with Mint AI",
  secondaryButtonHref = "/mint-intelligent-chat",
  secondaryButtonOnClick,
  className = "",
  variant = 'default'
}: CTASectionProps) {
  return (
    <section 
      style={{
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        color: 'white',
        padding: variant === 'compact' ? '1rem 1.5rem' : '1.5rem 2rem',
        textAlign: 'center',
        borderRadius: '12px',
        marginTop: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
      }}
      aria-labelledby="cta-title"
      className={className}
    >
      <div style={{ maxWidth: '650px', margin: '0 auto' }}>
        <h2 
          id="cta-title" 
          style={{
            fontSize: variant === 'compact' ? '1.25rem' : '1.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            lineHeight: 1.3
          }}
        >
          {title}
        </h2>
        <p style={{
          fontSize: '0.95rem',
          color: 'rgba(255, 255, 255, 0.95)',
          marginBottom: '1rem',
          lineHeight: 1.5
        }}>
          {description}
        </p>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '0.75rem'
        }}>
          {/* Primary CTA - Get Quote */}
          <Button
            as="a"
            href={primaryButtonHref}
            onClick={primaryButtonOnClick}
            variant="technology-primary"
            size="md"
            enhancedHover={true}
            shimmer={true}
          >
            {primaryButtonText}
          </Button>

          {/* Secondary CTA - Chat */}
          <Button
            as="a"
            href={secondaryButtonHref}
            onClick={secondaryButtonOnClick}
            variant="technology-secondary"
            size="md"
            enhancedHover={true}
            shimmer={true}
            shimmerDelay={1}
          >
            {secondaryButtonText}
          </Button>
        </div>

        {/* Trust indicators */}
        <div style={{
          marginTop: '0.75rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.25)'
        }}>
          <p style={{
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: 0
          }}>
            ✅ Free consultation • ✅ No obligation • ✅ Fast approval
          </p>
        </div>
      </div>
    </section>
  );
}

// Preset variants for common use cases
export const StatePageCTA = () => (
  <CTASection
    title="Ready to Sell Your Structured Settlement?"
    description="Our specialists can help you navigate the process in your state and get you the best possible offer."
  />
);

export const CountyPageCTA = ({ stateName }: { stateName: string }) => (
  <CTASection
    title={`Get Your ${stateName} Settlement Offer`}
    description={`Connect with specialists familiar with ${stateName} court procedures and local requirements.`}
  />
);

export const CompactCTA = ({ stateName }: { stateName: string }) => (
  <CTASection
    variant="compact"
    title="Need Help?"
    description={`Get expert guidance for ${stateName} structured settlement transfers.`}
    primaryButtonText="Get Offer"
    secondaryButtonText="Chat Now"
  />
);
