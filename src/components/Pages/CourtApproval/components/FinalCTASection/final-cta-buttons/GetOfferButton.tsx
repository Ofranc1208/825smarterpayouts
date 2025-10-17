'use client';

import Button from '@/src/components/shared/Button/Button';

export default function GetOfferButton() {
  return (
    <Button
      as="a"
      href="/mint-intelligent-chat"
      variant="technology-primary"
      size="lg"
      enhancedHover={true}
      shimmer={true}
      aria-label="Get your instant structured settlement quote"
    >
      💰 Get Your Instant Offer
    </Button>
  );
}
