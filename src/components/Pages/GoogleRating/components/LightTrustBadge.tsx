"use client";

import React from 'react';
import styles from './LightTrustBadge.module.css';

interface LightTrustBadgeProps {
  rating?: string;
  reviewCount?: string;
  category?: string;
  className?: string;
  alignment?: 'center' | 'left';
}

/**
 * LightTrustBadge Component
 * Optimized for light backgrounds with dark text for proper contrast
 * Used specifically on the platform-rating page
 */
export default function LightTrustBadge({
  rating = '4.9',
  reviewCount = '250',
  category = 'Finance',
  className = '',
  alignment = 'center'
}: LightTrustBadgeProps) {
  const alignmentClass = alignment === 'left' ? styles.alignLeft : styles.alignCenter;

  return (
    <div 
      className={`${styles.lightTrustBadge} ${alignmentClass} ${className}`}
      role="status"
      aria-label={`${rating} star rating with ${reviewCount} reviews. Free ${category} application.`}
    >
      {/* Removed redundant microdata AggregateRating — JSON-LD in <head> now handles SEO schema. */}
      
      {/* Google Play Store Format: 4.9 ★★★★★ (250) · Free · Finance */}
      <div className={styles.mainLine}>
        <span className={styles.ratingNumber}>{rating}</span>
        <span className={styles.fiveStars} aria-label="5 star rating">
          ★★★★★
        </span>
        <span className={styles.reviewCount}>({reviewCount})</span>
        <span className={styles.separator}>·</span>
        <span className={styles.freeText}>Free</span>
        <span className={styles.separator}>·</span>
        <span className={styles.categoryText}>{category}</span>
      </div>
    </div>
  );
}

