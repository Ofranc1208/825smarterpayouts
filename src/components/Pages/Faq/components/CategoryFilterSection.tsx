/**
 * Category Filter Section
 * 
 * FAQ category filtering with grid of category buttons and result counter
 */

'use client';

import React from 'react';
import { Category } from '../types';
import { CategoryButton } from './shared';
import { COLORS, SPACING, BORDER_RADIUS, TEXT_PRESETS } from '@/src/components/shared/styles';

interface CategoryFilterSectionProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  resultCount: number;
  totalCount: number;
}

// Extracted style objects for better readability and maintainability
const styles = {
  section: {
    ...SPACING.container.styles,
    padding: `${SPACING.unit.xl} ${SPACING.unit.md}`
  } as React.CSSProperties,
  
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center'
  } as React.CSSProperties,
  
  innerContainer: {
    maxWidth: '1000px',
    width: '100%'
  } as React.CSSProperties,
  
  headerSection: {
    textAlign: "center",
    marginBottom: SPACING.unit.xl
  } as React.CSSProperties,
  
  heading: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: SPACING.unit.md,
    lineHeight: "1.3"
  } as React.CSSProperties,
  
  description: {
    ...TEXT_PRESETS.body,
    marginBottom: SPACING.unit.xl
  } as React.CSSProperties,
  
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
    gap: SPACING.unit.sm,
    maxWidth: "600px",
    margin: "0 auto"
  } as React.CSSProperties,
  
  resultCounter: {
    textAlign: "center",
    marginTop: SPACING.unit.xl,
    padding: SPACING.unit.md,
    background: COLORS.backgrounds.greenPale,
    borderRadius: BORDER_RADIUS.md,
    border: `1px solid ${COLORS.borders.green}`
  } as React.CSSProperties,
  
  counterText: {
    margin: "0",
    fontSize: "0.9rem",
    color: COLORS.primary.main,
    fontWeight: "500"
  } as React.CSSProperties,
} as const;

export function CategoryFilterSection({
  categories,
  activeCategory,
  onCategoryChange,
  resultCount,
  totalCount
}: CategoryFilterSectionProps) {
  return (
    <section style={styles.section}>
      <div style={styles.contentWrapper}>
        <div style={styles.innerContainer}>
          <div style={styles.headerSection}>
            <h2 style={styles.heading}>
              Browse by Category
            </h2>
            <p style={styles.description}>
              Find answers to your specific questions by selecting a category below
            </p>
          </div>
          <div style={styles.categoryGrid}>
            {categories.map((category) => (
              <CategoryButton
                key={category.name}
                category={category}
                isActive={activeCategory === category.name}
                onClick={() => onCategoryChange(category.name)}
              />
            ))}
          </div>
          <div style={styles.resultCounter}>
            <p style={styles.counterText}>
              📊 Showing {resultCount} of {totalCount} categories
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


