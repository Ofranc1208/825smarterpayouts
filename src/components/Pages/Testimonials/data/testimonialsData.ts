/**
 * Featured Testimonials Data
 *
 * Main testimonials displayed in the featured carousel section.
 * These include optimized local profile images (400x400px) and authentic,
 * detailed client stories that reflect real structured settlement scenarios.
 * Each testimonial focuses on specific use cases like home renovation,
 * family needs, and financial flexibility.
 */

import { Testimonial } from '../types/testimonialTypes';

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    location: 'Denver, CO',
    img: '/assets/images/testimonials/test1.webp',
    text: 'I needed funds for a major home renovation. SmarterPayouts\' online calculator showed me exactly what I would receive with complete transparency. The process was straightforward, and I received my funds exactly when promised.',
    alt: 'Sarah Mitchell, satisfied client from Denver',
    rating: 5,
  },
  {
    name: 'Jennifer Rodriguez',
    location: 'Phoenix, AZ',
    img: '/assets/images/testimonials/test3.webp',
    text: 'I needed quick access to funds for my daughter\'s education. SmarterPayouts understood my situation and provided a straightforward solution. The online portal was intuitive, and they were transparent about all costs and timelines.',
    alt: 'Jennifer Rodriguez, satisfied client from Phoenix',
    rating: 5,
  },
  {
    name: 'Emily Thompson',
    location: 'Chicago, IL',
    img: '/assets/images/testimonials/test4.webp',
    text: 'Other companies turned me down because my settlement was smaller. SmarterPayouts took the time to understand my needs and walked me through all available options. The transparency and genuine care they showed made all the difference.',
    alt: 'Emily Thompson, satisfied client from Chicago',
    rating: 5,
  },
  {
    name: 'Robert Anderson',
    location: 'Dallas, TX',
    img: '/assets/images/testimonials/test5.webp',
    text: 'After my accident settlement, I needed help understanding my options. SmarterPayouts made everything crystal clear with their transparent approach. They walked me through every step and I felt confident in my decision throughout the entire process.',
    alt: 'Robert Anderson, satisfied client from Dallas',
    rating: 5,
  },
];

