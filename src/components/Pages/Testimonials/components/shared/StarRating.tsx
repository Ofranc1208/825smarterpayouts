/**
 * StarRating Component
 * 
 * Displays a star rating (1-5 stars)
 * Reusable across testimonial displays
 */

import React from 'react';

interface StarRatingProps {
  rating: number;
  size?: 'small' | 'medium' | 'large';
}

export default function StarRating({ rating, size = 'medium' }: StarRatingProps) {
  const sizeMap = {
    small: '0.75rem',
    medium: '1rem',
    large: '1.25rem',
  };

  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: rating }).map((_, i) => (
        <span 
          key={i} 
          style={{ 
            color: "#fbbf24", 
            fontSize: sizeMap[size]
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

