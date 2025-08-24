// Media selection service for Facebook platform
// Matches topics to appropriate pre-loaded images and videos for Facebook posts

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

// Curated image library for Facebook structured settlement posts
const IMAGE_LIBRARY: ImageInfo[] = [
  // Cash & Finance themed images (Facebook optimized)
  {
    filename: 'fb-cash-finance-1.jpg',
    keywords: ['cash', 'money', 'lump', 'sum', 'maximize', 'payout', 'financial', 'immediate'],
    description: 'Professional cash and finance imagery for Facebook',
    type: 'image'
  },
  {
    filename: 'fb-cash-finance-2.jpg', 
    keywords: ['instant', 'quotes', 'payment', 'funds', 'capital', 'liquidity', 'fast'],
    description: 'Money and financial planning imagery for Facebook',
    type: 'image'
  },
  {
    filename: 'fb-cash-finance-3.jpg',
    keywords: ['savings', 'investment', 'growth', 'wealth', 'portfolio', 'financial freedom'],
    description: 'Investment and wealth building imagery for Facebook',
    type: 'image'
  },

  // Settlement & Legal themed images  
  {
    filename: 'fb-settlement-payment-1.jpg',
    keywords: ['settlement', 'structured', 'payments', 'annuity', 'periodic', 'monthly'],
    description: 'Settlement and payment structure imagery for Facebook',
    type: 'image'
  },
  {
    filename: 'fb-settlement-payment-2.jpg',
    keywords: ['legal', 'court', 'approval', 'process', 'documents', 'paperwork'],
    description: 'Legal process and documentation imagery for Facebook',
    type: 'image'
  },
  {
    filename: 'fb-court-legal-1.jpg',
    keywords: ['court', 'approval', 'legal', 'judge', 'process', 'law', 'attorney'],
    description: 'Court and legal proceedings imagery for Facebook',
    type: 'image'
  },

  // Planning & Future themed images
  {
    filename: 'fb-planning-future-1.jpg',
    keywords: ['planning', 'future', 'goals', 'strategy', 'timeline', 'dreams'],
    description: 'Financial planning and future goals imagery for Facebook',
    type: 'image'
  },
  {
    filename: 'fb-planning-future-2.jpg',
    keywords: ['options', 'choices', 'decisions', 'alternatives', 'consider', 'compare'],
    description: 'Decision making and options imagery for Facebook',
    type: 'image'
  },
  {
    filename: 'fb-planning-future-3.jpg',
    keywords: ['timeline', 'schedule', 'terms', 'duration', 'period', 'when'],
    description: 'Timeline and scheduling imagery for Facebook',
    type: 'image'
  },

  // Family & Security themed images
  {
    filename: 'fb-family-security-1.jpg',
    keywords: ['family', 'security', 'protection', 'loved', 'ones', 'care', 'children'],
    description: 'Family security and protection imagery for Facebook',
    type: 'image'
  },
  {
    filename: 'fb-family-security-2.jpg',
    keywords: ['peace', 'mind', 'confidence', 'trust', 'reliable', 'safe'],
    description: 'Peace of mind and trust imagery for Facebook',
    type: 'image'
  },
  {
    filename: 'fb-family-home-1.jpg',
    keywords: ['home', 'house', 'mortgage', 'property', 'real estate', 'buy'],
    description: 'Home buying and real estate imagery for Facebook',
    type: 'image'
  },

  // Business & Professional themed images
  {
    filename: 'fb-business-professional-1.jpg',
    keywords: ['professional', 'expert', 'consultation', 'advice', 'guidance', 'help'],
    description: 'Professional consultation imagery for Facebook',
    type: 'image'
  },
  {
    filename: 'fb-business-professional-2.jpg',
    keywords: ['transparent', 'honest', 'ethical', 'integrity', 'trust', 'reliable'],
    description: 'Business integrity and transparency imagery for Facebook',
    type: 'image'
  },
  {
    filename: 'fb-business-professional-3.jpg',
    keywords: ['fast', 'quick', 'efficient', 'streamlined', 'simple', 'easy'],
    description: 'Efficiency and speed imagery for Facebook',
    type: 'image'
  },

  // Default/General images
  {
    filename: 'fb-default-1.jpg',
    keywords: ['smarterpayouts', 'general', 'default', 'universal', 'brand'],
    description: 'General SmarterPayouts branding imagery for Facebook',
    type: 'image'
  },
  {
    filename: 'fb-default-2.jpg', 
    keywords: ['smarterpayouts', 'general', 'default', 'universal', 'brand'],
    description: 'General SmarterPayouts branding imagery for Facebook',
    type: 'image'
  }
];

// Curated video library for Facebook structured settlement posts
const VIDEO_LIBRARY: VideoInfo[] = [
  // Cash & Finance themed videos
  {
    filename: 'fb-cash-finance-1.mp4',
    keywords: ['cash', 'money', 'lump', 'sum', 'maximize', 'payout', 'financial'],
    description: 'Professional cash and finance motion graphics for Facebook',
    type: 'video'
  },
  {
    filename: 'fb-cash-finance-2.mp4', 
    keywords: ['instant', 'quotes', 'payment', 'funds', 'capital', 'liquidity'],
    description: 'Money flow and financial planning animation for Facebook',
    type: 'video'
  },

  // Settlement & Legal themed videos  
  {
    filename: 'fb-settlement-payment-1.mp4',
    keywords: ['settlement', 'structured', 'payments', 'annuity', 'periodic'],
    description: 'Settlement process animation for Facebook',
    type: 'video'
  },
  {
    filename: 'fb-court-legal-1.mp4',
    keywords: ['court', 'approval', 'legal', 'judge', 'process', 'law'],
    description: 'Legal process motion graphics for Facebook',
    type: 'video'
  },

  // Planning & Future themed videos
  {
    filename: 'fb-planning-future-1.mp4',
    keywords: ['planning', 'future', 'goals', 'strategy', 'timeline'],
    description: 'Financial planning animation for Facebook',
    type: 'video'
  },
  {
    filename: 'fb-planning-future-2.mp4',
    keywords: ['options', 'choices', 'decisions', 'alternatives', 'consider'],
    description: 'Decision-making process animation for Facebook',
    type: 'video'
  },

  // Family & Security themed videos
  {
    filename: 'fb-family-security-1.mp4',
    keywords: ['family', 'security', 'protection', 'loved', 'ones', 'care'],
    description: 'Family protection animation for Facebook',
    type: 'video'
  },

  // Business & Professional themed videos
  {
    filename: 'fb-business-professional-1.mp4',
    keywords: ['professional', 'expert', 'consultation', 'advice', 'guidance'],
    description: 'Professional consultation animation for Facebook',
    type: 'video'
  },
  {
    filename: 'fb-business-professional-2.mp4',
    keywords: ['fast', 'quick', 'efficient', 'streamlined', 'simple'],
    description: 'Efficiency and speed animation for Facebook',
    type: 'video'
  },

  // Default/General videos
  {
    filename: 'fb-default-1.mp4',
    keywords: ['smarterpayouts', 'general', 'default', 'universal'],
    description: 'General SmarterPayouts branding animation for Facebook',
    type: 'video'
  }
];

// Combined media library
const ALL_MEDIA: MediaInfo[] = [...IMAGE_LIBRARY, ...VIDEO_LIBRARY];

/**
 * Selects the best matching media (image or video) based on topic and content for Facebook
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
 * Get the full path for media (image or video) for Facebook platform
 * @param filename The media filename
 * @param type The media type
 * @returns The full path to the media
 */
export function getMediaPath(filename: string, type: 'image' | 'video'): string {
  const folder = type === 'video' ? 'videos' : 'images';
  return `/marketing/platforms/Facebook/${folder}/${filename}`;
}

/**
 * Get all available media for Facebook
 * @returns Array of all media info
 */
export function getAllMedia(): MediaInfo[] {
  return ALL_MEDIA;
}

/**
 * Get all available images for Facebook
 * @returns Array of all image info
 */
export function getAllImages(): ImageInfo[] {
  return IMAGE_LIBRARY;
}

/**
 * Get all available videos for Facebook
 * @returns Array of all video info
 */
export function getAllVideos(): VideoInfo[] {
  return VIDEO_LIBRARY;
}

/**
 * Check if media exists in our Facebook library
 * @param filename The media filename to check
 * @returns True if the media exists in our library
 */
export function hasMedia(filename: string): boolean {
  return ALL_MEDIA.some(media => media.filename === filename);
}
