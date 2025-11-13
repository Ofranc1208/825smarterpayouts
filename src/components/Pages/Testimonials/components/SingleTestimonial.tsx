/**
 * Single Testimonial Component
 * 
 * Individual testimonial card with:
 * - Circular profile image with hover scale effect
 * - Overlay effect on hover
 * - Star rating display
 * - Client name and location
 * - Beautiful white card with shadow
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { Testimonial } from '../types/testimonialTypes';

interface SingleTestimonialProps {
  testimonial: Testimonial;
}

export default function SingleTestimonial({ testimonial }: SingleTestimonialProps) {
  const { img, alt, name, location, rating, text } = testimonial;

  return (
    <div style={{ 
      padding: '0 15px',
      marginBottom: '30px'
    }}>
      <div className="testimonial-single">
        {/* Circular Profile Image */}
        <div className="testimonial-image">
          <Image
            src={img}
            alt={alt}
            width={230}
            height={230}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Testimonial Content Card */}
        <div className="testimonial-content">
          {/* Star Rating */}
          <div className="testimonial-rating">
            {Array.from({ length: rating }).map((_, i) => (
              <i key={i} className="fa fa-star" style={{ color: '#ffa801', fontSize: '16px', marginRight: '3px' }}></i>
            ))}
          </div>

          {/* Testimonial Text */}
          <p className="testimonial-text">
            "{text}"
          </p>

          {/* Client Info */}
          <div className="testimonial-client">
            <h3 className="testimonial-client-name">{name}</h3>
            <p className="testimonial-client-location">{location}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonial-single {
          position: relative;
          display: block;
          text-align: center;
          user-select: none;
          margin-bottom: 20px;
        }

        .testimonial-image {
          position: relative;
          display: block;
          height: 250px;
          width: 250px;
          margin: 0 auto 50px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.15),
            0 10px 25px rgba(34, 197, 94, 0.1),
            inset 0 0 0 4px rgba(255, 255, 255, 0.8);
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .testimonial-image::before {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          content: "";
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(59, 130, 246, 0.6) 100%);
          transform: scale(0);
          transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
        }

        .testimonial-single:hover .testimonial-image {
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.2),
            0 15px 35px rgba(34, 197, 94, 0.2),
            inset 0 0 0 6px rgba(34, 197, 94, 0.3);
          transform: scale(1.05);
        }

        .testimonial-single:hover .testimonial-image::before {
          transform: scale(1);
        }

        .testimonial-image :global(img) {
          transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 50%;
        }

        .testimonial-single:hover .testimonial-image :global(img) {
          transform: scale(1.15);
        }

        .testimonial-content {
          position: relative;
          display: block;
          background: linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: 
            0px 20px 80px rgba(0, 0, 0, 0.08),
            0px 8px 32px rgba(34, 197, 94, 0.05),
            inset 0 1px 0 rgba(255,255,255,0.4);
          padding: 60px 50px 50px;
          text-align: center;
          border-radius: 24px;
          transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .testimonial-content::before {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          height: 20px;
          width: 70px;
          background: linear-gradient(135deg, #22c55e 0%, #3b82f6 100%);
          border-radius: 0 0 10px 10px;
          content: "";
        }

        .testimonial-content::after {
          position: absolute;
          top: 20px;
          right: 20px;
          content: '"';
          font-size: 4rem;
          font-family: serif;
          color: rgba(34, 197, 94, 0.1);
          line-height: 1;
          font-weight: bold;
          transform: rotate(15deg);
          transition: all 400ms ease;
        }

        .testimonial-single:hover .testimonial-content {
          box-shadow: 
            0px 30px 100px rgba(0, 0, 0, 0.15),
            0px 12px 40px rgba(34, 197, 94, 0.1),
            inset 0 1px 0 rgba(255,255,255,0.6);
          transform: translateY(-8px);
        }

        .testimonial-single:hover .testimonial-content::after {
          color: rgba(34, 197, 94, 0.2);
          transform: rotate(15deg) scale(1.1);
        }

        .testimonial-rating {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          gap: 2px;
        }

        .testimonial-rating i {
          color: #fbbf24;
          font-size: 18px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
          transition: all 300ms ease;
        }

        .testimonial-single:hover .testimonial-rating i {
          color: #f59e0b;
          transform: scale(1.1);
        }

        .testimonial-text {
          margin: 0 0 30px;
          line-height: 1.8;
          font-size: 17px;
          color: #475569;
          font-style: italic;
          font-weight: 400;
          position: relative;
          z-index: 2;
          letter-spacing: 0.3px;
        }

        .testimonial-client-name {
          font-size: 22px;
          font-weight: 700;
          line-height: 30px;
          color: #0f172a;
          margin: 0 0 8px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .testimonial-client-location {
          font-size: 14px;
          font-weight: 600;
          color: #22c55e;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
          line-height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .testimonial-client-location::before {
          content: "📍";
          font-size: 12px;
          filter: grayscale(0.3);
        }

        @media (max-width: 767px) {
          .testimonial-image {
            height: 200px;
            width: 200px;
            margin-bottom: 40px;
          }

          .testimonial-content {
            padding: 45px 30px 40px;
          }

          .testimonial-content::after {
            font-size: 3rem;
            top: 15px;
            right: 15px;
          }

          .testimonial-text {
            font-size: 16px;
            line-height: 1.7;
          }

          .testimonial-client-name {
            font-size: 20px;
          }
        }

        @media (max-width: 480px) {
          .testimonial-image {
            height: 180px;
            width: 180px;
          }

          .testimonial-content {
            padding: 35px 25px 30px;
          }
        }
      `}</style>
    </div>
  );
}

