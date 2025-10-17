'use client';

import Button from '@/src/components/shared/Button/Button';

export default function SecondaryCTAButton() {
  return (
    <Button
      as="a"
      href="/mint-intelligent-chat"
      variant="technology-secondary"
      size="lg"
      enhancedHover={true}
      shimmer={true}
      shimmerDelay={1}
      aria-label="Chat with Mint AI assistant for structured settlement help"
    >
      💬 Ask Mint AI
    </Button>
  );
}
