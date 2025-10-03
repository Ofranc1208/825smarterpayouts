/**
 * Category Button Component
 * 
 * Individual category filter button with active/inactive states
 */

'use client';

import React from 'react';
import { Category } from '../../types';
import { COLORS, SPACING, BORDER_RADIUS, BOX_SHADOWS, TEXT_PRESETS } from '@/src/components/shared/styles';

interface CategoryButtonProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}

// Extracted style objects for better readability and maintainability
const getButtonStyles = (isActive: boolean, isHovered: boolean): React.CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: SPACING.unit.xs,
  padding: `${SPACING.unit.sm} ${SPACING.unit.xs}`,
  borderRadius: BORDER_RADIUS.sm,
  border: "none",
  background: isActive ? COLORS.primary.gradient : COLORS.backgrounds.white,
  color: isActive ? COLORS.text.white : COLORS.text.secondary,
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: isActive ? BOX_SHADOWS.custom.greenGlow : BOX_SHADOWS.sm,
  minHeight: "54px",
  position: "relative",
  overflow: "hidden",
  transform: isHovered && !isActive ? "translateY(-2px)" : "translateY(0)",
  ...(isHovered && !isActive && {
    boxShadow: `0 4px 10px ${COLORS.shadows.blackMedium}`
  })
});

const styles = {
  icon: (isActive: boolean) => ({
    fontSize: "1.05rem",
    opacity: isActive ? "1" : "0.8"
  } as React.CSSProperties),
  
  label: {
    ...TEXT_PRESETS.captionBold,
    textAlign: "center"
  } as React.CSSProperties,
  
  activeIndicator: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    height: "2px",
    background: "rgba(255, 255, 255, 0.3)",
    borderRadius: `0 0 ${BORDER_RADIUS.sm} ${BORDER_RADIUS.sm}`
  } as React.CSSProperties,
} as const;

export function CategoryButton({ category, isActive, onClick }: CategoryButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={getButtonStyles(isActive, isHovered)}
    >
      <span style={styles.icon(isActive)}>
        {category.icon}
      </span>
      <span style={styles.label}>
        {category.name}
      </span>
      {isActive && (
        <div style={styles.activeIndicator}></div>
      )}
    </button>
  );
}


