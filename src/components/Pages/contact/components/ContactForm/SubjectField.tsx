'use client';

interface SubjectFieldProps {
  formValidated: boolean;
}

export default function SubjectField({ formValidated }: SubjectFieldProps) {
  return (
    <div style={{ marginTop: '1rem' }}>
      <label htmlFor="subject" style={{
        display: "block",
        fontSize: "0.875rem",
        fontWeight: "500",
        color: "#374151",
        marginBottom: "0.5rem"
      }}>
        Subject *
      </label>
      <input
        type="text"
        id="subject"
        placeholder="How can we help you?"
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
        }}>Please enter a subject.</div>
      )}
    </div>
  );
}
