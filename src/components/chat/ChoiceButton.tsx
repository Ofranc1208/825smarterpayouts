"use client";
import React, { useState, useRef, useEffect } from 'react';

export interface ChoiceButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  className?: string;
  index?: number; // For staggered animations
  [key: string]: any; // Allow any additional props
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ icon, text, onClick, className, index = 0, ...otherProps }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Enhanced click handler with haptic feedback simulation
  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    if (onClick) onClick();
  };

  // Enhanced mouse handlers with live animations
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    const button = e.currentTarget;
    
    // 2025 best practice: Hardware-accelerated transforms
    button.style.transform = "translateY(-4px) scale(1.02)";
    button.style.boxShadow = "0 12px 32px rgba(5, 150, 105, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)";
    button.style.borderColor = "#059669";
    button.style.background = "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)";
    
    // Icon glow effect
    const iconContainer = button.querySelector('[data-icon-container]') as HTMLElement;
    if (iconContainer) {
      iconContainer.style.background = "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)";
      iconContainer.style.borderColor = "#059669";
      iconContainer.style.transform = "scale(1.1) rotate(5deg)";
    }
    
    // Arrow animation
    const arrow = button.querySelector('[data-arrow]') as HTMLElement;
    if (arrow) {
      arrow.style.transform = "translateX(4px)";
      arrow.style.color = "#059669";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    const button = e.currentTarget;
    
    button.style.transform = "translateY(0) scale(1)";
    button.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.08), 0 2px 8px rgba(0, 0, 0, 0.05)";
    button.style.borderColor = "#d1d5db";
    button.style.background = "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)";
    
    // Reset icon
    const iconContainer = button.querySelector('[data-icon-container]') as HTMLElement;
    if (iconContainer) {
      iconContainer.style.background = "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)";
      iconContainer.style.borderColor = "#93c5fd";
      iconContainer.style.transform = "scale(1) rotate(0deg)";
    }
    
    // Reset arrow
    const arrow = button.querySelector('[data-arrow]') as HTMLElement;
    if (arrow) {
      arrow.style.transform = "translateX(0)";
      arrow.style.color = "#9ca3af";
    }
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    if (buttonRef.current) {
      buttonRef.current.style.transform = "translateY(-2px) scale(0.98)";
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    if (buttonRef.current && isHovered) {
      buttonRef.current.style.transform = "translateY(-4px) scale(1.02)";
    }
  };

  return (
    <>
      {/* Live Button Animations CSS */}
      <style>{`
        @keyframes livePulse {
          0%, 100% { box-shadow: 0 4px 12px rgba(5, 150, 105, 0.08), 0 2px 8px rgba(0, 0, 0, 0.05), 0 0 0 0 rgba(5, 150, 105, 0.4); }
          50% { box-shadow: 0 4px 12px rgba(5, 150, 105, 0.12), 0 2px 8px rgba(0, 0, 0, 0.05), 0 0 0 4px rgba(5, 150, 105, 0.1); }
        }
        
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes iconBounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.05) rotate(2deg); }
        }
        
        .live-button {
          animation: livePulse 3s ease-in-out infinite;
        }
        
        .live-button:hover .icon-container {
          animation: iconBounce 0.6s ease-in-out infinite;
        }
      `}</style>
      
      <button 
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        type="button" 
        className={`live-button ${className || ''}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "1rem",
          width: "100%",
          padding: "1.25rem 1.5rem",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          border: "2px solid #d1d5db",
          borderRadius: "16px",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          textAlign: "left",
          fontSize: "1rem",
          fontWeight: "600",
          color: "#374151",
          fontFamily: "inherit",
          boxShadow: "0 4px 12px rgba(5, 150, 105, 0.08), 0 2px 8px rgba(0, 0, 0, 0.05)",
          position: "relative",
          overflow: "hidden",
          // Staggered entrance animation
          animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
          // Performance optimization
          willChange: "transform, box-shadow",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden"
        }}
        {...otherProps}
      >
        {/* Live indicator dot */}
        <div style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          boxShadow: "0 0 8px rgba(34, 197, 94, 0.6)",
          animation: "livePulse 2s ease-in-out infinite"
        }}></div>
        
        {icon && (
          <span 
            data-icon-container
            className="icon-container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
              border: "2px solid #93c5fd",
              flexShrink: 0,
              fontSize: "1.5rem",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Icon shimmer effect */}
            <div style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
              transform: "translateX(-100%)",
              transition: "transform 0.8s ease",
              ...(isHovered ? { transform: "translateX(100%)" } : {})
            }}></div>
            {icon}
          </span>
        )}
        
        <span style={{
          flex: 1,
          lineHeight: "1.4",
          position: "relative"
        }}>
          {text}
          {/* Live typing indicator */}
          <div style={{
            position: "absolute",
            bottom: "-4px",
            left: "0",
            height: "2px",
            width: isHovered ? "100%" : "0%",
            background: "linear-gradient(90deg, #059669, #22c55e, #059669)",
            transition: "width 0.4s ease",
            borderRadius: "1px"
          }}></div>
        </span>
        
        <span 
          data-arrow
          style={{
            fontSize: "1.5rem",
            color: "#9ca3af",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "24px",
            height: "24px"
          }}
        >
          →
        </span>
        
        {/* Ripple effect container */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: isPressed ? "300px" : "0px",
          height: isPressed ? "300px" : "0px",
          background: "radial-gradient(circle, rgba(5, 150, 105, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          transition: "all 0.3s ease",
          pointerEvents: "none"
        }}></div>
      </button>
    </>
  );
};

export default ChoiceButton; 