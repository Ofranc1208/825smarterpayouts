'use client';
import { useState } from 'react';

interface ContactCardProps {
  icon: string;
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
  onClick?: () => void;
  isAppointment?: boolean;
}

export default function ContactCard({ 
  icon, 
  title, 
  description, 
  actionText, 
  actionLink,
  onClick,
  isAppointment
}: ContactCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Only handle card click if button wasn't clicked
    if ((e.target as HTMLElement).tagName !== 'BUTTON') {
      handleAction();
    }
  };

  const handleAction = () => {
    if (isAppointment && onClick) {
      // Book Appointment - open modal
      onClick();
    } else if (actionLink && actionLink !== '#') {
      if (actionLink.startsWith('tel:')) {
        // Phone call - create temporary link and click it
        const link = document.createElement('a');
        link.href = actionLink;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (actionLink.startsWith('mailto:')) {
        // Email - create temporary link and click it for better browser compatibility
        const link = document.createElement('a');
        link.href = actionLink;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // External links (Google Maps) - open in new tab
        window.open(actionLink, '_blank', 'noopener,noreferrer');
      }
    }
    // Call analytics callback if provided
    if (onClick && !isAppointment) {
      onClick();
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleAction();
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "0.5rem",
        borderRadius: "6px",
        boxShadow: isHovered ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "0 1px 4px rgba(0, 0, 0, 0.04)",
        border: "1px solid #e2e8f0",
        textAlign: "center",
        transition: "all 0.2s ease",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transform: isHovered ? "translateY(-1px)" : "translateY(0)",
        position: "relative",
        overflow: "hidden"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      role="article"
      aria-label={`${title} contact option`}
    >
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          fontSize: "1.1rem",
          marginBottom: "0.375rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {icon}
        </div>
        <h3 style={{
          fontSize: "0.8rem",
          fontWeight: "600",
          color: "#1e293b",
          marginBottom: "0.25rem",
          lineHeight: "1.2"
        }}>
          {title}
        </h3>
        <div style={{
          marginBottom: "0.375rem",
          flex: 1,
          minHeight: "30px"
        }}>
          {(title === "Visit Us" || title === "Call Us") && description.includes('\n') ? (
            <div
              style={{
                color: "#64748b",
                lineHeight: "1.3",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "0.125rem",
                fontSize: "0.65rem"
              }}
            >
              <div style={{ 
                fontWeight: "600", 
                color: "#1e293b", 
                fontSize: title === "Call Us" ? "0.7rem" : "0.7rem" 
              }}>
                {description.split('\n')[0]}
              </div>
              <div style={{ color: "#64748b", fontSize: "0.65rem" }}>
                {description.split('\n')[1]}
              </div>
            </div>
          ) : (
            <p style={{
              color: "#64748b",
              lineHeight: "1.3",
              fontSize: "0.65rem",
              margin: 0
            }}>
              {description}
            </p>
          )}
        </div>
      </div>
      <div style={{ 
        position: "relative", 
        zIndex: 1, 
        marginTop: "0.375rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
      }}>
        <button
          style={{
            width: "100%",
            padding: "0.375rem 0.5rem",
            borderRadius: "4px",
            fontWeight: "500",
            fontSize: "0.7rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
            border: "none",
            background: isHovered 
              ? "linear-gradient(135deg, #16a34a 0%, #15803d 100%)"
              : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            color: "#ffffff",
            transform: isHovered ? "translateY(-1px)" : "translateY(0)",
            boxShadow: isHovered ? "0 2px 8px rgba(34, 197, 94, 0.25)" : "0 1px 4px rgba(34, 197, 94, 0.15)"
          }}
          onClick={handleButtonClick}
        >
          {actionText}
        </button>
      </div>
    </div>
  );
}
