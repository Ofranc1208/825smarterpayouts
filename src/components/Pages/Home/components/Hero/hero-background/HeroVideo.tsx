'use client';

/**
 * Hero Video Component
 * 
 * Handles the background video display with proper fallbacks
 * and accessibility considerations.
 * 
 * @component HeroVideo
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function HeroVideo() {
  return (
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
  );
}
