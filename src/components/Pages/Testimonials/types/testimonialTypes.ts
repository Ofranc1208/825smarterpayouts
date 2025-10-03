/**
 * Testimonial Types
 * 
 * TypeScript interfaces for testimonial data structures
 */

/**
 * Full testimonial with detailed information
 * Used in FeaturedTestimonialsGrid section
 */
export interface Testimonial {
  name: string;
  location: string;
  img: string;
  alt: string;
  text: string;
  rating: number;
}

/**
 * Quick/compact testimonial
 * Used in QuickTestimonialsSection
 */
export interface QuickTestimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}

