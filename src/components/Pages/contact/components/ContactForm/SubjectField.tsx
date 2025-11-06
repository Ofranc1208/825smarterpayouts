'use client';

interface SubjectFieldProps {
  formValidated: boolean;
}

export default function SubjectField({ formValidated }: SubjectFieldProps) {
  const subjects = [
    'General Inquiry',
    'Get a Quote',
    'Technical Support',
    'Billing Question',
    'Appointment Request',
    'Other'
  ];

  return (
    <div style={{ marginTop: '0.75rem' }}>
      <label htmlFor="subject" style={{
        display: "block",
        fontSize: "0.75rem",
        fontWeight: "500",
        color: "#374151",
        marginBottom: "0.125rem"
      }}>
        Subject *
      </label>
      <select
        id="subject"
        name="subject"
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
      >
        <option value="">Select a subject...</option>
        {subjects.map((subject) => (
          <option key={subject} value={subject}>{subject}</option>
        ))}
      </select>
      {formValidated && (
        <div style={{
          color: "#dc2626",
          fontSize: "0.75rem",
          marginTop: "0.25rem"
        }}>Please select a subject.</div>
      )}
    </div>
  );
}
