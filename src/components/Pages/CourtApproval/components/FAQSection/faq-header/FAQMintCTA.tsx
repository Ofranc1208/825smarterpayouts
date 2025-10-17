'use client';

import Button from '@/src/components/shared/Button/Button';

export default function FAQMintCTA() {
  return (
    <Button
      as="a"
      href="/mint-intelligent-chat?chat=open&feature=calculator"
      variant="technology-secondary"
      size="lg"
      enhancedHover={true}
      shimmerDelay={1}
      aria-label="Chat with Mint AI assistant for instant help with court approval questions"
    >
      💬 Ask Mint AI Instantly
    </Button>
  );
}
