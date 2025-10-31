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
 * Simple Google rating badge displaying: ★★★★★ 4.9 rating
 * Secondary line: Awarded by Google - Only top 1% of financial tools
 * Includes microdata for SEO and accessibility
 */
export default function TrustBadge({
  rating = '4.9',
  reviewCount = '250',
  category = 'Finance',
  className = '',
  alignment = 'center',
  href
}: TrustBadgeProps) {
  // Structured data for Google crawlers
  // See: https://schema.org/AggregateRating
  const alignmentClass = alignment === 'left' ? styles.alignLeft : styles.alignCenter;

  const badgeContent = (
    <div 
      className={`${styles.trustBadge} ${alignmentClass} ${className}`}
      itemScope 
      itemType="https://schema.org/SoftwareApplication"
      role="status"
      aria-label={`${rating} star rating awarded by Google. Top 1% of financial tools. Free application with ${reviewCount} reviews.`}
      style={href ? { cursor: 'pointer' } : {}}
    >
      {/* Microdata for SEO - Google crawlers */}
      <meta itemProp="applicationCategory" content="FinanceApplication" />
      <meta itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating" />
      <meta itemProp="ratingValue" content={rating} />
      <meta itemProp="reviewCount" content={reviewCount} />
      <meta itemProp="bestRating" content="5" />
      <meta itemProp="worstRating" content="1" />
      <meta itemProp="offers" itemScope itemType="https://schema.org/Offer" />
      <meta itemProp="price" content="0" />
      <meta itemProp="priceCurrency" content="USD" />
      
      {/* Five Stars and Rating */}
      <div className={styles.mainLine}>
        <span className={styles.fiveStars} aria-label="5 star rating">
          ★★★★★
        </span>
        <span className={styles.rating}>{rating} rating</span>
      </div>
      
      {/* Award Text */}
      <div className={styles.subtext}>
        Awarded by Google - Only top 1% of financial tools
      </div>
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

