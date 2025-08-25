'use client';

import { useEffect } from 'react';

/**
 * Hero Title Component
 * 
 * Main headline with pulse animation effect.
 * 
 * @component HeroTitle
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function HeroTitle() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pulse = document.getElementById('pulseText');
      if (pulse) {
        pulse.classList.add('pulse-effect');
      }
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes heartbeat {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            14% {
              transform: scale(1.05);
              opacity: 0.9;
            }
            28% {
              transform: scale(1);
              opacity: 1;
            }
            42% {
              transform: scale(1.05);
              opacity: 0.9;
            }
            70% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          .heartbeat-pulse {
            animation: heartbeat 2.5s ease-in-out infinite;
            transform-origin: center;
          }
        `
      }} />
      <h1 
        id="pulseText" 
        className="heartbeat-pulse"
        style={{ 
          fontWeight: '700', 
          color: 'white', 
          fontSize: 'clamp(2rem, 5vw, 2.75rem)',
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}
      >
        Skip the Sales Pitch
      </h1>
    </>
  );
}
