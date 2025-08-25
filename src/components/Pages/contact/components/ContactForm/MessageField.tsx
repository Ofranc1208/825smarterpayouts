'use client';

interface MessageFieldProps {
  formValidated: boolean;
}

export default function MessageField({ formValidated }: MessageFieldProps) {
  return (
    <div style={{ marginTop: '1rem' }}>
      <label htmlFor="message" style={{
        display: "block",
        fontSize: "0.875rem",
        fontWeight: "500",
        color: "#374151",
        marginBottom: "0.5rem"
      }}>
        Your Message *
      </label>
      <textarea
        id="message"
        rows={5}
        placeholder="Type your message here..."
        required
        style={{
          width: '100%',
          padding: "0.75rem",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          fontSize: "1rem",
          transition: "all 0.2s ease",
          resize: "vertical",
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
      ></textarea>
      {formValidated && (
        <div style={{
          color: "#dc2626",
          fontSize: "0.875rem",
          marginTop: "0.5rem"
        }}>Please enter your message.</div>
      )}
    </div>
  );
}
