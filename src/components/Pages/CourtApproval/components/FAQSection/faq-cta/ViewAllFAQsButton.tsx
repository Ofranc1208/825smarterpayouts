'use client';

import Button from '@/src/components/shared/Button/Button';

export default function ViewAllFAQsButton() {
  return (
    <Button
      as="a"
      href="/faqs"
      variant="technology-primary"
      size="lg"
      enhancedHover={true}
      aria-label="View all court approval frequently asked questions"
    >
      📚 View All Court Approval FAQs
    </Button>
  );
}
