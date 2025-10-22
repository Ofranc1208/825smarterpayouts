// Final CTA chat button - under 50 lines per complexity rule
// Large chat button

import Button from '@/src/components/shared/Button';

export default function ChatButton() {
  return (
    <Button
      as="a"
      href="/mint-intelligent-chat?chat=open&feature=calculator"
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
