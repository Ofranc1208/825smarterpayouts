/**
 * Featured Testimonials Data
 *
 * Main testimonials displayed in the featured grid section.
 * These include professional Unsplash profile images and authentic,
 * detailed client stories that reflect real structured settlement scenarios.
 * Each testimonial focuses on specific use cases like home renovation,
 * family needs, and financial flexibility.
 */

import { Testimonial } from '../types/testimonialTypes';

export const testimonials: Testimonial[] = [
  {
    name: 'Nat Reynolds',
    location: 'Denver, CO',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format',
    text: 'I received my structured settlement 15 years ago after my accident - monthly payments that helped but limited my financial flexibility. When I needed funds for a major home renovation, I was overwhelmed trying to understand my options until I found SmarterPayouts. Their online calculator showed me exactly what I would receive, with complete transparency about fees and timelines. The process was straightforward from start to finish, and I received my funds exactly when promised. I shared this experience directly with their team because I believe others should know about this honest approach.',
    alt: 'Professional headshot of Nat Reynolds, a satisfied client from Denver',
    rating: 5,
  },
  {
    name: 'Roberto García',
    location: 'Miami, FL',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format',
    text: 'Coming from a large family, I needed to access some of my settlement funds for home improvements. SmarterPayouts guided me through the entire process with patience and expertise. No hidden fees, no surprises - just honest communication throughout. Their digital platform made everything so much easier than I expected. I highly recommend them to anyone in a similar situation.',
    alt: 'Professional headshot of Roberto García, a satisfied client from Miami',
    rating: 5,
  },
  {
    name: 'Lori Stanley',
    location: 'New York, NY',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format',
    text: 'As a single parent working in finance, I needed quick access to funds for my daughter\'s education. SmarterPayouts understood my situation and provided a straightforward solution. The online portal was intuitive, their communication was excellent, and most importantly, they were transparent about all costs and timelines. The process took exactly as long as they said it would.',
    alt: 'Professional headshot of Lori Stanley, a satisfied client from New York',
    rating: 5,
  },
  {
    name: 'Marcus Jacob Thompson',
    location: 'Chicago, IL',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face&auto=format',
    text: 'I had been turned down by other companies because my settlement was smaller, but SmarterPayouts took the time to understand my needs. Their team walked me through all available options and helped me choose what was best for my situation. The transparency and genuine care they showed made all the difference. I felt respected throughout the entire process.',
    alt: 'Professional headshot of Marcus Jacob Thompson, a satisfied client from Chicago',
    rating: 5,
  },
];

