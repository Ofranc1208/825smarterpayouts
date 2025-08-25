'use client';

interface FormSubmitButtonProps {
  isSubmitting: boolean;
  onSubmit?: () => void;
}

export default function FormSubmitButton({ isSubmitting, onSubmit }: FormSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      onClick={onSubmit}
      style={{
        width: '100%',
        background: isSubmitting 
          ? "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)"
          : "linear-gradient(135deg, #09b44d 0%, #059669 100%)",
        color: "white",
        padding: "0.875rem 1.5rem",
        borderRadius: "8px",
        border: "none",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: isSubmitting ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        marginTop: "1.5rem"
      }}
      onMouseEnter={(e) => {
        if (!isSubmitting) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSubmitting) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      {isSubmitting ? "Sending Message..." : "Send Message"}
    </button>
  );
}
