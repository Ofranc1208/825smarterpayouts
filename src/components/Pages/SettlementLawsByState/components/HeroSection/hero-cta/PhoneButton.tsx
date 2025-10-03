// Phone CTA button component - under 50 lines per complexity rule
// Simple interactive component

import Button from '@/src/components/shared/Button';

interface PhoneButtonProps {
  onClick: () => void;
}

export default function PhoneButton({ onClick }: PhoneButtonProps) {
  return (
    <Button
      as="a"
      href="tel:8555823506"
      onClick={onClick}
      variant="technology-primary"
      size="lg"
      enhancedHover={true}
      shimmer={true}
    >
      📞 Call (855) 582-3506
    </Button>
  );
}
