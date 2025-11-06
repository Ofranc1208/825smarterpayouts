'use client';

interface FormSubmitButtonProps {
  isSubmitting: boolean;
  onSubmit?: () => void;
}

export default function FormSubmitButton({ isSubmitting, onSubmit }: FormSubmitButtonProps) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <button
        type="submit"
        disabled={isSubmitting}
        onClick={onSubmit}
        style={{
          width: "100%",
          padding: "0.625rem 1rem",
          borderRadius: "6px",
          fontWeight: "500",
          fontSize: "0.8rem",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          border: "none",
          minHeight: "44px",
          background: isSubmitting 
            ? "#9ca3af" 
            : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          color: "white",
          borderColor: "transparent"
        }}
        onMouseEnter={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.background = "linear-gradient(135deg, #16a34a 0%, #15803d 100%)";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.3)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.background = "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }
        }}
      >
        {isSubmitting ? "Sending Message..." : "Send Message"}
      </button>
    </div>
  );
}
