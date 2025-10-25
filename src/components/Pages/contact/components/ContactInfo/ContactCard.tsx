'use client';

interface ContactCardProps {
  icon: string;
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
  onClick?: (cardId: string) => void;
}

export default function ContactCard({ 
  icon, 
  title, 
  description, 
  actionText, 
  actionLink,
  onClick 
}: ContactCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(title.toLowerCase().replace(/\s+/g, '-'));
    }
  };

  return (
    <div
      style={{
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
        textAlign: "center",
        transition: "all 0.2s ease",
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
      }}
      onClick={handleClick}
    >
      <div>
        <div style={{
          fontSize: "2.5rem",
          marginBottom: "1rem"
        }}>
          {icon}
        </div>
        <h3 style={{
          fontSize: "1.25rem",
          fontWeight: "700",
          color: "#1f2937",
          marginBottom: "0.75rem"
        }}>
          {title}
        </h3>
        <p style={{
          color: "#6b7280",
          marginBottom: "1.5rem",
          lineHeight: "1.5",
          flex: 1
        }}>
          {description}
        </p>
      </div>
      <a
        href={actionLink}
        style={{
          color: "#059669",
          fontWeight: "600",
          textDecoration: "none",
          fontSize: "0.875rem",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          display: "inline-block",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "1px solid #059669",
          transition: "all 0.2s ease",
          marginTop: "auto"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#059669";
          e.currentTarget.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#059669";
        }}
      >
        {actionText} →
      </a>
    </div>
  );
}
