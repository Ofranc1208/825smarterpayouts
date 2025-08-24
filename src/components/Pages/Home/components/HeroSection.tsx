'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Homepage Hero Section Component
 * 
 * Full-screen hero section featuring:
 * - Background video with counting cash
 * - Main headline and value proposition
 * - Primary CTA buttons for process and calculator
 * - Pulse animation effect on main heading
 * - Responsive design with overlay for readability
 * 
 * @component HeroSection
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function HeroSection() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pulse = document.getElementById('pulseText');
      if (pulse) {
        pulse.classList.add('pulse-effect');
      }
    }
  }, []);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden',
      margin: 0
    }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1
        }}
      >
        <source src="/assets/videos/promos/counting-cash.webm" type="video/webm" />
        <source src="/assets/videos/promos/counting-cash.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2
      }}></div>

      <div style={{ 
        position: 'relative', 
        zIndex: 3, 
        color: 'white', 
        textAlign: 'center',
        padding: '2rem',
        maxWidth: '800px'
      }}>
        <h1 id="pulseText" style={{ 
          fontWeight: '700', 
          color: 'white', 
          fontSize: 'clamp(2rem, 5vw, 2.75rem)',
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          Skip the Sales Pitch
        </h1>
        <h2 style={{ 
          fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', 
          fontWeight: '600', 
          color: '#f3f4f6', 
          marginTop: '1.5rem',
          marginBottom: '1rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
        }}>
          Industry's First AI-Powered Platform
        </h2>
        <p style={{ 
          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', 
          color: '#f3f4f6',
          marginBottom: '1rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          lineHeight: '1.6'
        }}>
        No personal info needed. No sales calls. Just instant AI-powered quotes.
        </p>

        <p style={{ 
          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', 
          color: '#f3f4f6', 
          marginTop: '0.5rem',
          marginBottom: '2rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          lineHeight: '1.6'
        }}>
        You're in control — Mint, our AI assistant, handles the rest.
        </p>

        <div style={{ 
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <Link href="/main" style={{
            fontWeight: '600',
            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
            borderRadius: '24px',
            boxShadow: '0 4px 16px rgba(251, 194, 51, 0.3)',
            border: 'none',
            padding: '16px 32px',
            transition: 'all 0.2s ease',
            background: '#fbc233',
            color: '#262626',
            textDecoration: 'none',
            display: 'inline-block',
            minWidth: '250px'
          }}>
            How Our Process Works
          </Link>
          <Link href="/pricing-calculator" style={{
            fontWeight: '600',
            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
            borderRadius: '24px',
            boxShadow: '0 4px 16px rgba(9, 180, 77, 0.3)',
            border: 'none',
            padding: '16px 32px',
            transition: 'all 0.2s ease',
            background: '#09b44d',
            color: '#fff',
            textDecoration: 'none',
            display: 'inline-block',
            minWidth: '250px'
          }}>
            Early Payout Calculator
          </Link>
        </div>
      </div>
    </section>
  );
}
