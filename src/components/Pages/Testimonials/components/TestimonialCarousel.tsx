/**
 * Testimonial Carousel Component
 * 
 * Beautiful carousel/slider for testimonials featuring:
 * - Responsive slider (1 item mobile, 2 tablet, 3 desktop)
 * - Circular profile images with hover effects
 * - Star ratings
 * - Auto-play with navigation dots
 * - Smooth transitions and animations
 * - Using Swiper for reliable Next.js compatibility
 */

'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { testimonials } from '../data';
import SingleTestimonial from './SingleTestimonial';
import { SPACING } from '@/src/components/shared/styles';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function TestimonialCarousel() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: SPACING.container.maxWidth,
      margin: '0 auto',
      padding: `0 ${SPACING.container.padding}`,
      zIndex: 1
    }}>
      <div className="testimonial-carousel">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          style={{
            paddingBottom: '60px'
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.name}>
              <SingleTestimonial testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        /* Carousel Container */
        .testimonial-carousel {
          position: relative;
          z-index: 1;
        }

        /* Swiper Pagination Customization */
        .testimonial-carousel .swiper-pagination {
          position: absolute;
          bottom: 0px !important;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .testimonial-carousel .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #94a3b8;
          opacity: 0.3;
          margin: 0px 5px !important;
          border-radius: 50%;
          transition: all 300ms ease;
          cursor: pointer;
        }

        .testimonial-carousel .swiper-pagination-bullet:hover {
          opacity: 0.6;
          transform: scale(1.1);
        }

        .testimonial-carousel .swiper-pagination-bullet-active {
          background: #22c55e !important;
          opacity: 1 !important;
          width: 32px;
          height: 12px;
          border-radius: 6px;
        }

        /* Swiper Slide */
        .testimonial-carousel .swiper-slide {
          height: auto;
          display: flex;
          align-items: stretch;
        }

        /* Responsive adjustments */
        @media (max-width: 767px) {
          .testimonial-carousel .swiper {
            padding-bottom: 50px !important;
          }
        }
      `}</style>
    </div>
  );
}

