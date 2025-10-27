'use client';
import Link from 'next/link';
import { Button } from '@/src/components/shared';

interface HeroCTAButtonsProps {
  onCTAClick?: (buttonId: string) => void;
}

export default function HeroCTAButtons({ onCTAClick }: HeroCTAButtonsProps) {
  const handleButtonClick = (buttonId: string) => {
    if (onCTAClick) {
      onCTAClick(buttonId);
    }
  };

  return (
    <div style={{
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      flexWrap: "wrap",
      alignItems: "center"
    }}>
      <Button
        as="a"
        href="/mint-chat-active?type=calculate&source=contact-hero"
        variant="technology-primary"
        size="lg"
        enhancedHover={true}
        onClick={() => handleButtonClick('pricing-calculator')}
      >
        Get Your Instant Offer
      </Button>

      <Button
        as="a"
        href="/mint-intelligent-chat"
        variant="technology-secondary"
        size="lg"
        enhancedHover={true}
        leftIcon="💬"
        onClick={() => handleButtonClick('mint-intelligent-chat')}
      >
        Chat with Mint AI
      </Button>
    </div>
  );
}
