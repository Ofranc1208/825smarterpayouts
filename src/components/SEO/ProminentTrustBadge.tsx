"use client";

import React, { useState, useEffect } from 'react';
import styles from './ProminentTrustBadge.module.css';

interface ProminentTrustBadgeProps {
  rating?: string;
  reviewCount?: string;
  category?: string;
  className?: string;
}

/**
 * ProminentTrustBadge Component
 * Desktop-only prominent overlay displaying Google rating: ★ 4.9 · Free · Finance
 * Similar prominence to "Skip the Sales Pitch" overlay on mobile
 */
export default function ProminentTrustBadge({
  rating = '4.9',
  reviewCount = '250',
  category = 'Finance',
  className = ''
}: ProminentTrustBadgeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Only show on desktop, after a brief delay for impact
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Clear any existing timer
      if (timer) {
        clearTimeout(timer);
      }
      
      // Show badge if desktop, after delay
      if (!mobile) {
        timer = setTimeout(() => {
          setIsVisible(true);
        }, 500);
      } else {
        setIsVisible(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  // Don't render on mobile
  if (isMobile || !isVisible) {
    return null;
  }

  return (
    <div 
      className={`${styles.prominentBadge} ${className}`}
      role="status"
      aria-label={`${rating} star rating based on ${reviewCount} reviews. Free ${category} application.`}
    >
      {/* Removed redundant microdata AggregateRating — JSON-LD in <head> now handles SEO schema. */}
      
      <div className={styles.badgeContent}>
        <span className={styles.star}>★</span>
        <span className={styles.rating}>{rating}</span>
        <span className={styles.separator}>·</span>
        <span className={styles.price}>Free</span>
        <span className={styles.separator}>·</span>
        <span className={styles.category}>{category}</span>
      </div>
      <div className={styles.badgeSubtext}>
        Google Rating · {reviewCount} Reviews
      </div>
    </div>
  );
}

