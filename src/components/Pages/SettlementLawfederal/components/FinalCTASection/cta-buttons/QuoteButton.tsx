// Final CTA quote button - under 50 lines per complexity rule
// Large quote button

import Button from '@/src/components/shared/Button';

export default function QuoteButton() {
  return (
    <Button
      as="a"
      href="/mint-chat-active?type=calculate&source=federal-law-cta"
      variant="cta"
      size="xl"
      enhancedHover={true}
      shimmer={true}
    >
      Get Your Instant Offer
    </Button>
  );
}
