'use client';
import { useState } from 'react';
import { Button } from '@/src/components/shared';
import { COLORS, SPACING, BORDER_RADIUS, BOX_SHADOWS, TYPOGRAPHY } from '@/src/components/shared/styles';

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
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(title.toLowerCase().replace(/\s+/g, '-'));
    }
  };

  return (
    <div
      style={{
        background: COLORS.backgrounds.white,
        padding: `${SPACING.unit.lg} ${SPACING.unit.md}`,
        borderRadius: BORDER_RADIUS.large,
        boxShadow: isHovered ? BOX_SHADOWS.large : BOX_SHADOWS.medium,
        border: `1px solid ${COLORS.neutral.gray200}`,
        textAlign: "center",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        position: "relative",
        overflow: "hidden",
        maxWidth: "100%"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="article"
      aria-label={`${title} contact option`}
    >
      {/* Subtle gradient overlay on hover */}
      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${COLORS.primary.lightest}08 0%, ${COLORS.primary.light}08 100%)`,
            pointerEvents: "none"
          }}
        />
      )}
      
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          fontSize: "2.5rem",
          marginBottom: SPACING.stack.sm,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "transform 0.3s ease",
          transform: isHovered ? "scale(1.1)" : "scale(1)"
        }}>
          {icon}
        </div>
        <h3 style={{
          fontSize: TYPOGRAPHY.fontSize.heading.h4,
          fontWeight: "700",
          color: COLORS.neutral.gray900,
          marginBottom: SPACING.stack.xs,
          lineHeight: TYPOGRAPHY.lineHeight.tight
        }}>
          {title}
        </h3>
        <div style={{
          marginBottom: SPACING.stack.md,
          flex: 1,
          minHeight: "60px"
        }}>
          {/* Display address formatted exactly like Google Maps */}
          {title === "Visit Us" && description.includes('\n') ? (
            <address
              style={{
                color: COLORS.text.secondary,
                lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                fontStyle: "normal",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: SPACING.unit.xs,
                fontSize: TYPOGRAPHY.fontSize.body.small
              }}
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              {/* Street address - emphasized like Google Maps */}
              <div itemProp="streetAddress" style={{ 
                fontWeight: "600", 
                color: COLORS.neutral.gray900, 
                fontSize: TYPOGRAPHY.fontSize.body.medium 
              }}>
                {description.split('\n')[0]}
              </div>
              {/* City, State ZIP - main line like Google Maps */}
              <div style={{ color: COLORS.text.secondary }}>
                {description.split('\n')[1]}
              </div>
              {/* Country - subtle like Google Maps */}
              <div itemProp="addressCountry" style={{ 
                fontSize: TYPOGRAPHY.fontSize.body.small, 
                color: COLORS.text.tertiary 
              }}>
                {description.split('\n')[2]}
              </div>
            </address>
          ) : (
            <p style={{
              color: COLORS.text.secondary,
              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
              fontSize: TYPOGRAPHY.fontSize.body.medium
            }}>
              {description}
            </p>
          )}
        </div>
      </div>
      <div style={{ 
        position: "relative", 
        zIndex: 1, 
        marginTop: SPACING.stack.md,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
      }}>
        <Button
          as="a"
          href={actionLink}
          variant="primary"
          size="md"
          enhancedHover={true}
          style={{
            minWidth: "160px",
            maxWidth: "200px",
            background: isHovered 
              ? COLORS.primary.gradient 
              : COLORS.primary.main,
            borderColor: COLORS.primary.main,
            color: COLORS.backgrounds.white,
            transition: "all 0.3s ease",
            textAlign: "center",
            justifyContent: "center"
          }}
          onClick={handleClick}
        >
          {actionText}
        </Button>
      </div>
    </div>
  );
}
