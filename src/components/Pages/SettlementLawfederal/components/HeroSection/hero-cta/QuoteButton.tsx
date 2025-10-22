// Hero quote button component - under 50 lines per complexity rule
// Get Your Quote CTA button

import Button from '@/src/components/shared/Button';

export default function QuoteButton() {
  return (
    <Button
      as="a"
      href="/mint-chat-active?type=calculate&source=federal-law-hero"
      variant="cta"
      size="xl"
      enhancedHover={true}
      shimmer={true}
    >
      Get Your Instant Offer
    </Button>
  );
}
