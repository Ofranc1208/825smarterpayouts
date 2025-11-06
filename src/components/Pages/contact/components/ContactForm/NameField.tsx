'use client';

interface NameFieldProps {
  formValidated: boolean;
}

export default function NameField({ formValidated }: NameFieldProps) {
  return (
    <div>
      <label htmlFor="name" style={{
        display: "block",
        fontSize: "0.75rem",
        fontWeight: "500",
        color: "#374151",
        marginBottom: "0.125rem"
      }}>
        Your Name *
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Jane Doe"
        required
        style={{
          width: '100%',
          padding: "0.625rem",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          fontSize: "0.85rem",
          transition: "all 0.2s ease",
          outline: 'none',
          background: "#ffffff",
          fontFamily: "inherit",
          boxSizing: "border-box",
          minHeight: "44px"
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#22c55e";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#d1d5db";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      {formValidated && (
        <div style={{
          color: "#dc2626",
          fontSize: "0.75rem",
          marginTop: "0.25rem"
        }}>Please enter your name.</div>
      )}
    </div>
  );
}
