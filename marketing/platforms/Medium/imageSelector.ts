// Media selection service for Medium platform
// Matches topics to appropriate pre-loaded images and videos for Medium articles

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

// Curated image library for Medium structured settlement articles
const IMAGE_LIBRARY: ImageInfo[] = [
  // Cash & Finance themed images (Medium optimized)
  {
    filename: 'medium-cash-finance-1.jpg',
    keywords: ['cash', 'money', 'lump', 'sum', 'maximize', 'payout', 'financial', 'immediate', 'liquidity'],
    description: 'Professional cash and finance imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-cash-finance-2.jpg', 
    keywords: ['instant', 'quotes', 'payment', 'funds', 'capital', 'investment', 'returns'],
    description: 'Money and financial planning imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-cash-finance-3.jpg',
    keywords: ['savings', 'investment', 'growth', 'wealth', 'portfolio', 'financial freedom', 'retirement'],
    description: 'Investment and wealth building imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-cash-analysis.jpg',
    keywords: ['analysis', 'calculator', 'comparison', 'value', 'worth', 'calculation'],
    description: 'Financial analysis and calculation imagery for Medium',
    type: 'image'
  },

  // Settlement & Legal themed images  
  {
    filename: 'medium-settlement-payment-1.jpg',
    keywords: ['settlement', 'structured', 'payments', 'annuity', 'periodic', 'monthly', 'lawsuit'],
    description: 'Settlement and payment structure imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-settlement-payment-2.jpg',
    keywords: ['legal', 'court', 'approval', 'process', 'documents', 'paperwork', 'attorney'],
    description: 'Legal process and documentation imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-court-legal-1.jpg',
    keywords: ['court', 'approval', 'legal', 'judge', 'process', 'law', 'attorney', 'litigation'],
    description: 'Court and legal proceedings imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-legal-advice.jpg',
    keywords: ['advice', 'consultation', 'lawyer', 'attorney', 'legal counsel', 'guidance'],
    description: 'Legal consultation and advice imagery for Medium',
    type: 'image'
  },

  // Planning & Future themed images
  {
    filename: 'medium-planning-future-1.jpg',
    keywords: ['planning', 'future', 'goals', 'strategy', 'timeline', 'dreams', 'aspirations'],
    description: 'Financial planning and future goals imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-planning-future-2.jpg',
    keywords: ['options', 'choices', 'decisions', 'alternatives', 'consider', 'compare', 'pros', 'cons'],
    description: 'Decision making and options imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-planning-future-3.jpg',
    keywords: ['timeline', 'schedule', 'terms', 'duration', 'period', 'when', 'timing'],
    description: 'Timeline and scheduling imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-financial-planning.jpg',
    keywords: ['budget', 'plan', 'financial planning', 'roadmap', 'strategy', 'long-term'],
    description: 'Comprehensive financial planning imagery for Medium',
    type: 'image'
  },

  // Family & Security themed images
  {
    filename: 'medium-family-security-1.jpg',
    keywords: ['family', 'security', 'protection', 'loved', 'ones', 'care', 'children', 'dependents'],
    description: 'Family security and protection imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-family-security-2.jpg',
    keywords: ['peace', 'mind', 'confidence', 'trust', 'reliable', 'safe', 'security'],
    description: 'Peace of mind and trust imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-family-home-1.jpg',
    keywords: ['home', 'house', 'mortgage', 'property', 'real estate', 'buy', 'ownership'],
    description: 'Home buying and real estate imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-education-fund.jpg',
    keywords: ['education', 'college', 'tuition', 'school', 'learning', 'future', 'children'],
    description: 'Education funding and future planning imagery for Medium',
    type: 'image'
  },

  // Business & Professional themed images
  {
    filename: 'medium-business-professional-1.jpg',
    keywords: ['professional', 'expert', 'consultation', 'advice', 'guidance', 'help', 'service'],
    description: 'Professional consultation imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-business-professional-2.jpg',
    keywords: ['transparent', 'honest', 'ethical', 'integrity', 'trust', 'reliable', 'reputation'],
    description: 'Business integrity and transparency imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-business-professional-3.jpg',
    keywords: ['fast', 'quick', 'efficient', 'streamlined', 'simple', 'easy', 'process'],
    description: 'Efficiency and speed imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-industry-insight.jpg',
    keywords: ['industry', 'insight', 'market', 'trends', 'analysis', 'expertise', 'knowledge'],
    description: 'Industry expertise and market insight imagery for Medium',
    type: 'image'
  },

  // Default/General images
  {
    filename: 'medium-default-1.jpg',
    keywords: ['smarterpayouts', 'general', 'default', 'universal', 'brand', 'company'],
    description: 'General SmarterPayouts branding imagery for Medium articles',
    type: 'image'
  },
  {
    filename: 'medium-default-2.jpg', 
    keywords: ['smarterpayouts', 'general', 'default', 'universal', 'brand', 'company'],
    description: 'General SmarterPayouts branding imagery for Medium articles',
    type: 'image'
  }
];

// Curated video library for Medium structured settlement articles (embedded content)
const VIDEO_LIBRARY: VideoInfo[] = [
  // Educational & Explanatory videos
  {
    filename: 'medium-explanation-1.mp4',
    keywords: ['explanation', 'how', 'works', 'process', 'guide', 'tutorial', 'education'],
    description: 'Educational explanation video for Medium articles',
    type: 'video'
  },
  {
    filename: 'medium-case-study-1.mp4',
    keywords: ['case', 'study', 'example', 'real', 'story', 'experience', 'testimonial'],
    description: 'Case study and real example video for Medium',
    type: 'video'
  },

  // Financial Analysis videos
  {
    filename: 'medium-financial-analysis-1.mp4',
    keywords: ['analysis', 'calculation', 'comparison', 'numbers', 'data', 'statistics'],
    description: 'Financial analysis and calculation video for Medium',
    type: 'video'
  },
  {
    filename: 'medium-market-trends-1.mp4',
    keywords: ['market', 'trends', 'industry', 'outlook', 'forecast', 'future'],
    description: 'Market trends and industry analysis video for Medium',
    type: 'video'
  },

  // Planning & Strategy videos
  {
    filename: 'medium-planning-strategy-1.mp4',
    keywords: ['planning', 'strategy', 'approach', 'method', 'best practices', 'tips'],
    description: 'Planning and strategy guidance video for Medium',
    type: 'video'
  },
  {
    filename: 'medium-decision-guide-1.mp4',
    keywords: ['decision', 'guide', 'choices', 'factors', 'consider', 'criteria'],
    description: 'Decision-making guidance video for Medium',
    type: 'video'
  },

  // Default/General videos
  {
    filename: 'medium-default-1.mp4',
    keywords: ['smarterpayouts', 'general', 'default', 'universal', 'introduction'],
    description: 'General SmarterPayouts introduction video for Medium',
    type: 'video'
  }
];

// Combined media library
const ALL_MEDIA: MediaInfo[] = [...IMAGE_LIBRARY, ...VIDEO_LIBRARY];

/**
 * Selects the best matching media (image or video) based on topic and content for Medium articles
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
 * Get the full path for media (image or video) for Medium platform
 * @param filename The media filename
 * @param type The media type
 * @returns The full path to the media
 */
export function getMediaPath(filename: string, type: 'image' | 'video'): string {
  const folder = type === 'video' ? 'videos' : 'images';
  return `/marketing/platforms/Medium/${folder}/${filename}`;
}

/**
 * Get all available media for Medium
 * @returns Array of all media info
 */
export function getAllMedia(): MediaInfo[] {
  return ALL_MEDIA;
}

/**
 * Get all available images for Medium
 * @returns Array of all image info
 */
export function getAllImages(): ImageInfo[] {
  return IMAGE_LIBRARY;
}

/**
 * Get all available videos for Medium
 * @returns Array of all video info
 */
export function getAllVideos(): VideoInfo[] {
  return VIDEO_LIBRARY;
}

/**
 * Check if media exists in our Medium library
 * @param filename The media filename to check
 * @returns True if the media exists in our library
 */
export function hasMedia(filename: string): boolean {
  return ALL_MEDIA.some(media => media.filename === filename);
}
