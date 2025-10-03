// Chat button component - under 50 lines per complexity rule
// Unified component with optional analytics tracking

import Button from '@/src/components/shared/Button';

interface ChatButtonProps {
  onClick?: () => void;
  size?: 'small' | 'large';
}

export default function ChatButton({ onClick, size = 'large' }: ChatButtonProps) {
  const buttonSize = size === 'small' ? 'lg' : 'lg';
  
  return (
    <Button
      as="a"
      href="/mint-intelligent-chat"
      onClick={onClick}
      variant="technology-secondary"
      size={buttonSize}
      enhancedHover={true}
      shimmer={true}
      shimmerDelay={1}
    >
      💬 Chat with Mint AI
    </Button>
  );
}
