'use client';
import { Button } from '@/src/components/shared';

interface FormSubmitButtonProps {
  isSubmitting: boolean;
  onSubmit?: () => void;
}

export default function FormSubmitButton({ isSubmitting, onSubmit }: FormSubmitButtonProps) {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <Button
        type="submit"
        variant="technology-primary"
        size="lg"
        fullWidth={true}
        loading={isSubmitting}
        disabled={isSubmitting}
        enhancedHover={!isSubmitting}
        onClick={onSubmit}
      >
        {isSubmitting ? "Sending Message..." : "Send Message"}
      </Button>
    </div>
  );
}
