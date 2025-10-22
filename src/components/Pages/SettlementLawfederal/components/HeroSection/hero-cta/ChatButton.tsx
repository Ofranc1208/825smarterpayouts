// Hero chat button component - under 50 lines per complexity rule
// Chat with Mint AI CTA button

import Button from '@/src/components/shared/Button';

export default function ChatButton() {
  return (
    <Button
      as="a"
      href="/mint-intelligent-chat"
      variant="golden"
      size="xl"
      enhancedHover={true}
      shimmer={true}
      shimmerDelay={1}
    >
      Chat with Mint AI
    </Button>
  );
}
