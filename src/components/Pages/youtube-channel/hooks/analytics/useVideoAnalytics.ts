'use client';

import { useCallback } from 'react';

/**
 * Video-specific analytics tracking
 * Handles video play, pause, completion, and engagement metrics
 */
export function useVideoAnalytics() {
  // Track video play events
  const trackVideoPlay = useCallback((videoId: string, videoTitle: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'video_play', {
        video_id: videoId,
        video_title: videoTitle,
        content_type: 'youtube_video'
      });
    }
  }, []);

  // Track video pause events
  const trackVideoPause = useCallback((videoId: string, currentTime: number) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'video_pause', {
        video_id: videoId,
        video_current_time: currentTime
      });
    }
  }, []);

  // Track video completion
  const trackVideoComplete = useCallback((videoId: string, duration: number) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'video_complete', {
        video_id: videoId,
        video_duration: duration
      });
    }
  }, []);

  // Track video engagement milestones
  const trackVideoMilestone = useCallback((videoId: string, milestone: number) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'video_progress', {
        video_id: videoId,
        video_percent: milestone
      });
    }
  }, []);

  // Track video quality changes
  const trackVideoQuality = useCallback((videoId: string, quality: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'video_quality_change', {
        video_id: videoId,
        video_quality: quality
      });
    }
  }, []);

  return {
    trackVideoPlay,
    trackVideoPause,
    trackVideoComplete,
    trackVideoMilestone,
    trackVideoQuality
  };
}
