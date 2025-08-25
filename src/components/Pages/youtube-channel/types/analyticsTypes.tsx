// YouTube Channel Analytics Types

export interface YouTubeAnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

export interface VideoInteraction {
  videoId: string;
  videoTitle: string;
  action: 'play' | 'pause' | 'complete' | 'click' | 'share';
  timestamp: number;
  duration?: number;
  position?: number;
  source: 'gallery' | 'hero' | 'cta' | 'search';
}

export interface GalleryInteraction {
  action: 'scroll' | 'filter' | 'search' | 'load_more' | 'view_change';
  timestamp: number;
  metadata?: {
    scrollDepth?: number;
    filterCategory?: string;
    searchQuery?: string;
    viewMode?: string;
    videosLoaded?: number;
  };
}

export interface CTAInteraction {
  ctaId: string;
  ctaLabel: string;
  action: 'click' | 'hover' | 'view';
  timestamp: number;
  section: 'hero' | 'cta' | 'video_card';
  position?: number;
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  videoLoadTime: number;
  galleryRenderTime: number;
  searchResponseTime: number;
  thumbnailLoadTime: number;
  interactionDelay: number;
}

export interface UserEngagement {
  sessionDuration: number;
  videosViewed: number;
  videosCompleted: number;
  searchQueries: number;
  ctaClicks: number;
  scrollDepth: number;
  bounceRate: boolean;
}

export interface ConversionTracking {
  source: 'youtube_channel';
  action: 'calculator_click' | 'mint_chat_click' | 'contact_click' | 'subscribe_click';
  videoContext?: {
    videoId: string;
    videoTitle: string;
    watchTime: number;
  };
  timestamp: number;
}
