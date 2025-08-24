/**
 * Hero Background Component
 * 
 * Handles the hero section background with video, fallback image,
 * and overlay effects. Features responsive design and performance
 * optimizations for different device types.
 * 
 * @component HeroBackground
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Props for HeroBackground component
 */
interface HeroBackgroundProps {
  /** Video URL for background */
  videoUrl?: string;
  /** Fallback image URL */
  imageUrl?: string;
  /** Overlay opacity (0-1) */
  overlayOpacity?: number;
  /** Overlay color */
  overlayColor?: string;
  /** Enable video autoplay */
  enableVideo?: boolean;
}

/**
 * Hero background component with video and fallback image
 * 
 * @param {HeroBackgroundProps} props - Component props
 * @returns {JSX.Element} Hero background with video/image
 */
export default function HeroBackground({
  videoUrl = "/assets/videos/promos/counting-cash.mp4",
  imageUrl = "/assets/images/hero-fallback.jpg",
  overlayOpacity = 0.7,
  overlayColor = "#000000",
  enableVideo = true
}: HeroBackgroundProps): JSX.Element {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showVideo, setShowVideo] = useState(enableVideo);
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * Handle video load success
   */
  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
    setVideoError(false);
  }, []);

  /**
   * Handle video load error
   */
  const handleVideoError = useCallback(() => {
    setVideoError(true);
    setVideoLoaded(false);
    console.warn('Hero video failed to load, falling back to image');
  }, []);

  /**
   * Handle video play/pause based on visibility
   */
  useEffect(() => {
    if (!videoRef.current || !videoLoaded || videoError) return;

    const video = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay failed, which is fine
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoLoaded, videoError]);

  /**
   * Detect if user prefers reduced motion
   */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShowVideo(false);
    }
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: 1
    }}>
      {/* Video Background */}
      {showVideo && !videoError && (
        <video
          ref={videoRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease'
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          aria-hidden="true"
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
        </video>
      )}

      {/* Fallback Image Background */}
      {(videoError || !showVideo || !videoLoaded) && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: (!showVideo || videoError) ? 1 : (videoLoaded ? 0 : 1),
            transition: 'opacity 0.5s ease'
          }}
          role="img"
          aria-label="Hero background"
        />
      )}

      {/* Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${overlayColor}${Math.round(overlayOpacity * 255).toString(16).padStart(2, '0')} 0%, ${overlayColor}${Math.round((overlayOpacity * 0.8) * 255).toString(16).padStart(2, '0')} 100%)`,
          zIndex: 2
        }}
        aria-hidden="true"
      />

      {/* Animated Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(45deg, rgba(9, 180, 77, 0.1) 0%, rgba(45, 90, 39, 0.1) 50%, rgba(9, 180, 77, 0.1) 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 8s ease-in-out infinite',
          zIndex: 3
        }}
        aria-hidden="true"
      />

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
