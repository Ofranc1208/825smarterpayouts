/**
 * TypeScript Interfaces for Get Your Cash Page
 * 
 * Defines all data structures used throughout the page components
 */

/**
 * Payment Method Interface
 * Represents a payment delivery option (Direct Deposit, Check, In-Person)
 */
export interface PaymentMethod {
  name: string;
  description: string;
  icon: string; // Emoji icon
  badge: {
    text: string;
    emoji: string;
  };
  benefits: string[]; // Array of 3 benefit strings
  theme: 'green' | 'amber' | 'blue'; // Theme color variant
}

/**
 * FAQ Interface
 * Represents a frequently asked question with its answer
 */
export interface FAQ {
  question: string;
  answer: string;
}

/**
 * Testimonial Interface
 * Represents a client testimonial
 */
export interface Testimonial {
  name: string;
  location: string;
  text: string;
  initial: string; // First letter for avatar
  paymentMethod: string;
}

/**
 * Stat Card Interface
 * Represents a quick statistic display in the hero section
 */
export interface StatCard {
  value: string;
  label: string;
  href?: string; // Optional anchor link
}

