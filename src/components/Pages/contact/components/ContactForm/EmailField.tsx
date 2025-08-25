'use client';

interface EmailFieldProps {
  formValidated: boolean;
}

export default function EmailField({ formValidated }: EmailFieldProps) {
  return (
    <div>
      <label htmlFor="email" style={{
        display: "block",
        fontSize: "0.875rem",
        fontWeight: "500",
        color: "#374151",
        marginBottom: "0.5rem"
      }}>
        Your Email *
      </label>
      <input
        type="email"
        id="email"
        placeholder="you@email.com"
        required
        style={{
          width: '100%',
          padding: "0.75rem",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          fontSize: "1rem",
          transition: "all 0.2s ease",
          outline: 'none'
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#059669";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(5, 150, 105, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#d1d5db";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      {formValidated && (
        <div style={{
          color: "#dc2626",
          fontSize: "0.875rem",
          marginTop: "0.5rem"
        }}>Please enter a valid email address.</div>
      )}
    </div>
  );
}
