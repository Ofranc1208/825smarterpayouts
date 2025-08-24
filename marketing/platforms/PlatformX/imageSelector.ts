// Media selection service for X platform
// Matches topics to appropriate pre-loaded images and videos

interface MediaInfo {
  filename: string;
  keywords: string[];
  description: string;
  type: 'image' | 'video';
}

interface ImageInfo extends MediaInfo {
  type: 'image';
}

interface VideoInfo extends MediaInfo {
  type: 'video';
}

// Curated image library for structured settlements
const IMAGE_LIBRARY: ImageInfo[] = [
  // Cash & Finance themed images
  {
    filename: 'cash-finance-1.jpg',
    keywords: ['cash', 'money', 'lump', 'sum', 'maximize', 'payout', 'financial'],
    description: 'Professional cash and finance imagery',
    type: 'image'
  },
  {
    filename: 'cash-finance-2.jpg', 
    keywords: ['instant', 'quotes', 'payment', 'funds', 'capital', 'liquidity'],
    description: 'Money and financial planning imagery',
    type: 'image'
  },
  {
    filename: 'cash-finance-3.jpg',
    keywords: ['savings', 'investment', 'growth', 'wealth', 'portfolio'],
    description: 'Investment and wealth building imagery',
    type: 'image'
  },

  // Settlement & Legal themed images  
  {
    filename: 'settlement-payment-1.jpg',
    keywords: ['settlement', 'structured', 'payments', 'annuity', 'periodic'],
    description: 'Settlement and payment structure imagery',
    type: 'image'
  },
  {
    filename: 'settlement-payment-2.jpg',
    keywords: ['legal', 'court', 'approval', 'process', 'documents'],
    description: 'Legal process and documentation imagery',
    type: 'image'
  },
  {
    filename: 'court-legal-1.jpg',
    keywords: ['court', 'approval', 'legal', 'judge', 'process', 'law'],
    description: 'Court and legal proceedings imagery',
    type: 'image'
  },

  // Planning & Future themed images
  {
    filename: 'planning-future-1.jpg',
    keywords: ['planning', 'future', 'goals', 'strategy', 'timeline'],
    description: 'Financial planning and future goals imagery',
    type: 'image'
  },
  {
    filename: 'planning-future-2.jpg',
    keywords: ['options', 'choices', 'decisions', 'alternatives', 'consider'],
    description: 'Decision making and options imagery',
    type: 'image'
  },
  {
    filename: 'planning-future-3.jpg',
    keywords: ['timeline', 'schedule', 'terms', 'duration', 'period'],
    description: 'Timeline and scheduling imagery',
    type: 'image'
  },

  // Family & Security themed images
  {
    filename: 'family-security-1.jpg',
    keywords: ['family', 'security', 'protection', 'loved', 'ones', 'care'],
    description: 'Family security and protection imagery',
    type: 'image'
  },
  {
    filename: 'family-security-2.jpg',
    keywords: ['peace', 'mind', 'confidence', 'trust', 'reliable'],
    description: 'Peace of mind and trust imagery',
    type: 'image'
  },

  // Business & Professional themed images
  {
    filename: 'business-professional-1.jpg',
    keywords: ['professional', 'expert', 'consultation', 'advice', 'guidance'],
    description: 'Professional consultation imagery',
    type: 'image'
  },
  {
    filename: 'business-professional-2.jpg',
    keywords: ['transparent', 'honest', 'ethical', 'integrity', 'trust'],
    description: 'Business integrity and transparency imagery',
    type: 'image'
  },
  {
    filename: 'business-professional-3.jpg',
    keywords: ['fast', 'quick', 'efficient', 'streamlined', 'simple'],
    description: 'Efficiency and speed imagery',
    type: 'image'
  },

  // Default/General images
  {
    filename: 'default-1.jpg',
    keywords: ['smarterpayouts', 'general', 'default', 'universal'],
    description: 'General SmarterPayouts branding imagery',
    type: 'image'
  },
  {
    filename: 'default-2.jpg', 
    keywords: ['smarterpayouts', 'general', 'default', 'universal'],
    description: 'General SmarterPayouts branding imagery',
    type: 'image'
  }
];

// Curated video library for structured settlements
const VIDEO_LIBRARY: VideoInfo[] = [
  // Cash & Finance themed videos
  {
    filename: 'cash-finance-1.mp4',
    keywords: ['cash', 'money', 'lump', 'sum', 'maximize', 'payout', 'financial'],
    description: 'Professional cash and finance motion graphics',
    type: 'video'
  },
  {
    filename: 'cash-finance-2.mp4', 
    keywords: ['instant', 'quotes', 'payment', 'funds', 'capital', 'liquidity'],
    description: 'Money flow and financial planning animation',
    type: 'video'
  },

  // Settlement & Legal themed videos  
  {
    filename: 'settlement-payment-1.mp4',
    keywords: ['settlement', 'structured', 'payments', 'annuity', 'periodic'],
    description: 'Settlement process animation',
    type: 'video'
  },
  {
    filename: 'court-legal-1.mp4',
    keywords: ['court', 'approval', 'legal', 'judge', 'process', 'law'],
    description: 'Legal process motion graphics',
    type: 'video'
  },

  // Planning & Future themed videos
  {
    filename: 'planning-future-1.mp4',
    keywords: ['planning', 'future', 'goals', 'strategy', 'timeline'],
    description: 'Financial planning animation',
    type: 'video'
  },
  {
    filename: 'planning-future-2.mp4',
    keywords: ['options', 'choices', 'decisions', 'alternatives', 'consider'],
    description: 'Decision-making process animation',
    type: 'video'
  },

  // Family & Security themed videos
  {
    filename: 'family-security-1.mp4',
    keywords: ['family', 'security', 'protection', 'loved', 'ones', 'care'],
    description: 'Family protection animation',
    type: 'video'
  },

  // Business & Professional themed videos
  {
    filename: 'business-professional-1.mp4',
    keywords: ['professional', 'expert', 'consultation', 'advice', 'guidance'],
    description: 'Professional consultation animation',
    type: 'video'
  },
  {
    filename: 'business-professional-2.mp4',
    keywords: ['fast', 'quick', 'efficient', 'streamlined', 'simple'],
    description: 'Efficiency and speed animation',
    type: 'video'
  },

  // Default/General videos
  {
    filename: 'default-1.mp4',
    keywords: ['smarterpayouts', 'general', 'default', 'universal'],
    description: 'General SmarterPayouts branding animation',
    type: 'video'
  }
];

// Combined media library
const ALL_MEDIA: MediaInfo[] = [...IMAGE_LIBRARY, ...VIDEO_LIBRARY];

/**
 * Selects the best matching media (image or video) based on topic and content
 * @param topic The main topic
 * @param content The generated content (optional)
 * @param preferVideo Whether to prefer video over images when scores are equal
 * @returns The best matching media info
 */
export function selectMediaForContent(topic: string, content?: string, preferVideo: boolean = false): MediaInfo {
  const searchText = `${topic} ${content || ''}`.toLowerCase();
  
  // Score each media item based on keyword matches
  const scores = ALL_MEDIA.map(media => {
    const keywordMatches = media.keywords.filter(keyword => 
      searchText.includes(keyword.toLowerCase())
    ).length;
    
    return {
      ...media,
      score: keywordMatches
    };
  });

  // Sort by score (highest first), with video preference as tiebreaker
  scores.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    if (preferVideo) {
      if (a.type === 'video' && b.type === 'image') return -1;
      if (a.type === 'image' && b.type === 'video') return 1;
    }
    return 0;
  });

  // If no keywords match, use the first default item
  const bestMatch = scores[0];
  if (bestMatch.score === 0) {
    const defaultMedia = ALL_MEDIA.find(media => media.keywords.includes('default'));
    return defaultMedia || ALL_MEDIA[0];
  }

  return bestMatch;
}

/**
 * Selects the best matching image based on topic and content (legacy function)
 * @param topic The main topic
 * @param content The generated content (optional)
 * @returns The best matching image filename
 */
export function selectImageForContent(topic: string, content?: string): string {
  const media = selectMediaForContent(topic, content, false);
  // If it's a video, find a similar image instead
  if (media.type === 'video') {
    const imageMedia = selectMediaForContent(topic, content, false);
    const imageAlternative = IMAGE_LIBRARY.find(img => 
      img.keywords.some(keyword => media.keywords.includes(keyword))
    );
    return imageAlternative?.filename || 'default-1.jpg';
  }
  return media.filename;
}

/**
 * Get the full path for media (image or video) for X platform
 * @param filename The media filename
 * @param type The media type
 * @returns The full path to the media
 */
export function getMediaPath(filename: string, type: 'image' | 'video'): string {
  const folder = type === 'video' ? 'videos' : 'images';
  return `/marketing/platforms/PlatformX/${folder}/${filename}`;
}

/**
 * Get the full image path for X platform (legacy function)
 * @param filename The image filename
 * @returns The full path to the image
 */
export function getImagePath(filename: string): string {
  return getMediaPath(filename, 'image');
}

/**
 * Get all available media
 * @returns Array of all media info
 */
export function getAllMedia(): MediaInfo[] {
  return ALL_MEDIA;
}

/**
 * Get all available images
 * @returns Array of all image info
 */
export function getAllImages(): ImageInfo[] {
  return IMAGE_LIBRARY;
}

/**
 * Get all available videos
 * @returns Array of all video info
 */
export function getAllVideos(): VideoInfo[] {
  return VIDEO_LIBRARY;
}

/**
 * Check if media exists in our library
 * @param filename The media filename to check
 * @returns True if the media exists in our library
 */
export function hasMedia(filename: string): boolean {
  return ALL_MEDIA.some(media => media.filename === filename);
}

/**
 * Check if an image exists in our library
 * @param filename The image filename to check
 * @returns True if the image exists in our library
 */
export function hasImage(filename: string): boolean {
  return IMAGE_LIBRARY.some(img => img.filename === filename);
}
