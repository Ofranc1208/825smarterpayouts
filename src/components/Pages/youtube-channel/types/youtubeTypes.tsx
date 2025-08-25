// YouTube Channel Core Types

export interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  publishedAt: string;
  viewCount: number;
  likeCount?: number;
  url: string;
  embedUrl: string;
  category: 'education' | 'testimonial' | 'process' | 'faq' | 'general';
  tags: string[];
}

export interface VideoGalleryProps {
  videos: VideoData[];
  loading?: boolean;
  error?: string | null;
  onVideoClick?: (video: VideoData) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
}

export interface VideoCardProps {
  video: VideoData;
  onClick?: (video: VideoData) => void;
  loading?: boolean;
  className?: string;
}

export interface HeroSectionProps {
  title?: string;
  description?: string;
  ctaButtons?: CTAButtonConfig[];
  backgroundVideo?: string;
  className?: string;
}

export interface CTAButtonConfig {
  id: string;
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
  icon?: string;
  onClick?: () => void;
}

export interface CTASectionProps {
  title?: string;
  description?: string;
  buttons?: CTAButtonConfig[];
  trustIndicators?: TrustIndicator[];
  className?: string;
}

export interface TrustIndicator {
  id: string;
  text: string;
  icon?: string;
  value?: string;
}

export interface YouTubeChannelState {
  videos: VideoData[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  selectedVideo: VideoData | null;
  searchQuery: string;
  filterCategory: string;
}

export interface YouTubeChannelActions {
  loadVideos: () => Promise<void>;
  loadMoreVideos: () => Promise<void>;
  selectVideo: (video: VideoData) => void;
  clearSelectedVideo: () => void;
  setSearchQuery: (query: string) => void;
  setFilterCategory: (category: string) => void;
  refreshVideos: () => Promise<void>;
}
