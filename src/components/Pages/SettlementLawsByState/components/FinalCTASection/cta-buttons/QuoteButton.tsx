// Quote button component - under 50 lines per complexity rule
// Simple presentational component with shared Button

import Button from '@/src/components/shared/Button';

export default function QuoteButton() {
  return (
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
  );
}
