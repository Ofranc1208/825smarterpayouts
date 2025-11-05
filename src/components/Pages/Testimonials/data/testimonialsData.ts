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
    text: 'I needed funds for a major home renovation. SmarterPayouts\' online calculator showed me exactly what I would receive with complete transparency. The process was straightforward, and I received my funds exactly when promised.',
    alt: 'Professional headshot of Nat Reynolds, a satisfied client from Denver',
    rating: 5,
  },
  {
    name: 'Roberto García',
    location: 'Miami, FL',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format',
    text: 'I needed to access some of my settlement funds for home improvements. SmarterPayouts guided me through the entire process with patience and expertise. No hidden fees, no surprises - just honest communication throughout.',
    alt: 'Professional headshot of Roberto García, a satisfied client from Miami',
    rating: 5,
  },
  {
    name: 'Lori Stanley',
    location: 'New York, NY',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format',
    text: 'I needed quick access to funds for my daughter\'s education. SmarterPayouts understood my situation and provided a straightforward solution. The online portal was intuitive, and they were transparent about all costs and timelines.',
    alt: 'Professional headshot of Lori Stanley, a satisfied client from New York',
    rating: 5,
  },
  {
    name: 'Marcus Jacob Thompson',
    location: 'Chicago, IL',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face&auto=format',
    text: 'Other companies turned me down because my settlement was smaller. SmarterPayouts took the time to understand my needs and walked me through all available options. The transparency and genuine care they showed made all the difference.',
    alt: 'Professional headshot of Marcus Jacob Thompson, a satisfied client from Chicago',
    rating: 5,
  },
];

