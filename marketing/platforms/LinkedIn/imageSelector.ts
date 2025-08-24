// LinkedIn professional media selector service

interface MediaInfo {
  filename: string;
  keywords: string[];
  type: 'professional' | 'educational' | 'business' | 'finance';
  description: string;
}

interface ImageInfo extends MediaInfo {
  mediaType: 'image';
}

interface VideoInfo extends MediaInfo {
  mediaType: 'video';
}

type LinkedInMediaInfo = ImageInfo | VideoInfo;

// Professional image library for LinkedIn
const IMAGE_LIBRARY: ImageInfo[] = [
  {
    filename: 'professional-handshake-1.jpg',
    keywords: ['business', 'professional', 'partnership', 'agreement', 'meeting', 'corporate', 'success'],
    type: 'professional',
    description: 'Professional business handshake representing partnerships and agreements',
    mediaType: 'image'
  },
  {
    filename: 'financial-planning-1.jpg', 
    keywords: ['finance', 'planning', 'financial', 'investment', 'money', 'calculator', 'analysis'],
    type: 'finance',
    description: 'Financial planning and analysis workspace with charts and calculator',
    mediaType: 'image'
  },
  {
    filename: 'business-meeting-1.jpg',
    keywords: ['meeting', 'business', 'professional', 'team', 'conference', 'discussion', 'corporate'],
    type: 'professional', 
    description: 'Professional business meeting with diverse team members',
    mediaType: 'image'
  },
  {
    filename: 'legal-documents-1.jpg',
    keywords: ['legal', 'documents', 'contract', 'settlement', 'paperwork', 'professional', 'lawyer'],
    type: 'business',
    description: 'Professional legal documents and contracts on desk',
    mediaType: 'image'
  },
  {
    filename: 'financial-growth-1.jpg',
    keywords: ['growth', 'finance', 'success', 'investment', 'chart', 'upward', 'profit'],
    type: 'finance',
    description: 'Financial growth chart showing upward trend and success',
    mediaType: 'image'
  },
  {
    filename: 'professional-consultation-1.jpg',
    keywords: ['consultation', 'advice', 'professional', 'meeting', 'client', 'service', 'expertise'],
    type: 'professional',
    description: 'Professional consultation between advisor and client',
    mediaType: 'image'
  },
  {
    filename: 'education-learning-1.jpg',
    keywords: ['education', 'learning', 'knowledge', 'training', 'professional', 'development', 'skill'],
    type: 'educational',
    description: 'Professional education and learning environment',
    mediaType: 'image'
  },
  {
    filename: 'technology-finance-1.jpg',
    keywords: ['technology', 'finance', 'digital', 'innovation', 'fintech', 'modern', 'professional'],
    type: 'business',
    description: 'Modern technology in financial services and fintech',
    mediaType: 'image'
  }
];

// Professional video library for LinkedIn
const VIDEO_LIBRARY: VideoInfo[] = [
  {
    filename: 'professional-presentation-1.mp4',
    keywords: ['presentation', 'professional', 'business', 'meeting', 'corporate', 'speaking', 'leadership'],
    type: 'professional',
    description: 'Professional business presentation in corporate setting',
    mediaType: 'video'
  },
  {
    filename: 'financial-analysis-1.mp4',
    keywords: ['finance', 'analysis', 'data', 'charts', 'financial', 'planning', 'professional'],
    type: 'finance',
    description: 'Professional financial analysis and data visualization',
    mediaType: 'video'
  },
  {
    filename: 'team-collaboration-1.mp4',
    keywords: ['team', 'collaboration', 'professional', 'meeting', 'business', 'corporate', 'success'],
    type: 'professional',
    description: 'Professional team collaboration and business meeting',
    mediaType: 'video'
  },
  {
    filename: 'client-consultation-1.mp4',
    keywords: ['consultation', 'client', 'service', 'professional', 'advice', 'meeting', 'expertise'],
    type: 'professional',
    description: 'Professional client consultation and advisory services',
    mediaType: 'video'
  }
];

/**
 * Selects the most relevant professional media for LinkedIn content
 * @param content - The generated content to analyze
 * @param mediaType - Type of media to select ('image' or 'video')
 * @param preferVideo - Whether to prefer video content when keywords match both
 * @returns Selected media info or null if no good match found
 */
export function selectMediaForContent(
  content: string, 
  mediaType: 'image' | 'video',
  preferVideo: boolean = false
): LinkedInMediaInfo | null {
  const library = mediaType === 'image' ? IMAGE_LIBRARY : VIDEO_LIBRARY;
  const contentLower = content.toLowerCase();
  
  // Score each media item based on keyword matches
  const scoredMedia = library.map(media => {
    const score = media.keywords.reduce((acc, keyword) => {
      if (contentLower.includes(keyword.toLowerCase())) {
        return acc + 1;
      }
      return acc;
    }, 0);
    
    return { media, score };
  });
  
  // Sort by score (descending) and filter out items with no matches
  const rankedMedia = scoredMedia
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
  
  if (rankedMedia.length === 0) {
    // Fallback to first professional business image/video if no keywords match
    const fallback = library.find(media => media.type === 'professional');
    return fallback || library[0] || null;
  }
  
  return rankedMedia[0].media;
}

/**
 * Gets the full public path for a LinkedIn media file
 * @param media - Media info object
 * @returns Full URL path for the media file
 */
export function getMediaPath(media: LinkedInMediaInfo): string {
  const mediaFolder = media.mediaType === 'image' ? 'images' : 'videos';
  return `/marketing/platforms/LinkedIn/${mediaFolder}/${media.filename}`;
}

/**
 * Gets all available media in the LinkedIn library
 * @returns Object with separate arrays for images and videos
 */
export function getAllLinkedInMedia(): { images: ImageInfo[]; videos: VideoInfo[] } {
  return {
    images: IMAGE_LIBRARY,
    videos: VIDEO_LIBRARY
  };
}
