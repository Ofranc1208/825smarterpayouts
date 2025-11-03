"use client";

import React from 'react';
import Link from 'next/link';
import styles from './TrustBadge.module.css';

interface TrustBadgeProps {
  rating?: string;
  reviewCount?: string;
  category?: string;
  className?: string;
  alignment?: 'center' | 'left';
  href?: string; // Optional link destination
}

/**
 * TrustBadge Component
 * Google-compliant rating badge displaying: 4.9 ★★★★★ (250) · Free · Finance
 * Matches Google Play Store format exactly for compliance
 * Visual badge only — structured data handled by JSON-LD in <head>
 */
export default function TrustBadge({
  rating = '4.9',
  reviewCount = '250',
  category = 'Finance',
  className = '',
  alignment = 'center',
  href
}: TrustBadgeProps) {
  const alignmentClass = alignment === 'left' ? styles.alignLeft : styles.alignCenter;

  const badgeContent = (
    <div 
      className={`${styles.trustBadge} ${alignmentClass} ${className}`}
      role="status"
      aria-label={`${rating} star rating with ${reviewCount} reviews. Free ${category} application.`}
      style={href ? { cursor: 'pointer' } : {}}
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
      {/* Rating on Google text */}
      {href && (
        <div className={styles.ratingLink}>
          Rating on Google
        </div>
      )}
    </div>
  );

  // If href is provided, wrap in Link component
  if (href) {
    return (
      <Link 
        href={href}
        style={{ 
          textDecoration: 'none',
          display: 'inline-block'
        }}
        aria-label={`Learn more about our ${rating} star Google rating`}
      >
        {badgeContent}
      </Link>
    );
  }

  return badgeContent;
}

