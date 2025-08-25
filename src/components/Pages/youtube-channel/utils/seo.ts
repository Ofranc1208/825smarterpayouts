/**
 * SEO Utilities for YouTube Channel
 * 
 * Comprehensive SEO optimization utilities including structured data,
 * meta tag generation, and search engine optimization features.
 * 
 * @module SEOUtils
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Enterprise Edition
 */

/**
 * Video data interface for structured data
 */
export interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  viewCount?: number;
  embedUrl?: string;
}

/**
 * SEO meta data interface
 */
export interface SEOMetaData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  structuredData: any[];
}

/**
 * Generate structured data for YouTube channel
 */
export function generateChannelStructuredData(channelData: {
  name: string;
  description: string;
  url: string;
  subscriberCount?: number;
  videoCount?: number;
  thumbnailUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": channelData.name,
    "description": channelData.description,
    "url": channelData.url,
    "thumbnailUrl": channelData.thumbnailUrl || "https://smarterpayouts.com/assets/images/youtube-channel-thumb.jpg",
    "uploadDate": new Date().toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "SmarterPayouts",
      "url": "https://smarterpayouts.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://smarterpayouts.com/assets/images/logo.png"
      }
    },
    "potentialAction": {
      "@type": "WatchAction",
      "target": channelData.url
    }
  };
}

/**
 * Generate structured data for video gallery
 */
export function generateVideoGalleryStructuredData(videos: VideoData[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "SmarterPayouts Educational Videos",
    "description": "Comprehensive video library covering structured settlements, early payouts, and financial strategies",
    "numberOfItems": videos.length,
    "itemListElement": videos.map((video, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "VideoObject",
        "name": video.title,
        "description": video.description,
        "thumbnailUrl": video.thumbnailUrl,
        "uploadDate": video.uploadDate,
        "duration": video.duration,
        "embedUrl": video.embedUrl,
        ...(video.viewCount && {
          "interactionStatistic": {
            "@type": "InteractionCounter",
            "interactionType": "https://schema.org/WatchAction",
            "userInteractionCount": video.viewCount
          }
        })
      }
    }))
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What topics are covered in SmarterPayouts YouTube videos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our YouTube channel covers structured settlements, early payout options, financial planning strategies, market rate analysis, and educational content to help settlement recipients make informed decisions."
        }
      },
      {
        "@type": "Question",
        "name": "How often are new videos published?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We publish new educational videos weekly, covering the latest trends in structured settlements, market updates, and helpful tips for maximizing your settlement value."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get personalized advice through the videos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While our videos provide general educational content, you can get personalized guidance by using our Mint AI chat assistant or our settlement value calculator for specific questions about your situation."
        }
      }
    ]
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://smarterpayouts.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "YouTube Channel",
        "item": "https://smarterpayouts.com/youtube-channel"
      }
    ]
  };
}

/**
 * Generate complete SEO meta data
 */
export function generateSEOMetaData(options: {
  videos?: VideoData[];
  channelData?: any;
}): SEOMetaData {
  const { videos = [], channelData } = options;

  const structuredData: any[] = [
    generateBreadcrumbStructuredData(),
    generateFAQStructuredData()
  ];

  if (channelData) {
    structuredData.push(generateChannelStructuredData(channelData));
  }

  if (videos.length > 0) {
    structuredData.push(generateVideoGalleryStructuredData(videos));
  }

  return {
    title: "SmarterPayouts YouTube Channel - Educational Videos & Insights",
    description: "Explore our comprehensive video library covering structured settlements, early payouts, and financial strategies. Learn from experts and make informed decisions about your settlement.",
    keywords: [
      "structured settlement videos",
      "payout education",
      "financial planning",
      "settlement advice",
      "YouTube channel",
      "SmarterPayouts",
      "educational content",
      "settlement calculator",
      "early payout",
      "financial strategies"
    ],
    canonicalUrl: "https://smarterpayouts.com/youtube-channel",
    ogImage: "https://smarterpayouts.com/assets/images/youtube-channel-og.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    structuredData
  };
}

/**
 * Optimize page title for SEO
 */
export function optimizePageTitle(baseTitle: string, options?: {
  includeVideoCount?: number;
  includeBrand?: boolean;
}): string {
  const { includeVideoCount, includeBrand = true } = options || {};
  
  let title = baseTitle;
  
  if (includeVideoCount) {
    title = `${title} - ${includeVideoCount} Educational Videos`;
  }
  
  if (includeBrand) {
    title = `${title} | SmarterPayouts`;
  }
  
  // Ensure title is within optimal length (50-60 characters)
  if (title.length > 60) {
    title = title.substring(0, 57) + '...';
  }
  
  return title;
}

/**
 * Generate meta description with optimal length
 */
export function optimizeMetaDescription(baseDescription: string, options?: {
  includeVideoCount?: number;
  includeCTA?: boolean;
}): string {
  const { includeVideoCount, includeCTA = true } = options || {};
  
  let description = baseDescription;
  
  if (includeVideoCount) {
    description = `${description} Browse ${includeVideoCount}+ educational videos.`;
  }
  
  if (includeCTA) {
    description = `${description} Get instant quotes with our calculator or chat with Mint AI.`;
  }
  
  // Ensure description is within optimal length (150-160 characters)
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }
  
  return description;
}

/**
 * Generate video-specific meta tags
 */
export function generateVideoMetaTags(video: VideoData) {
  return {
    "og:video": video.embedUrl,
    "og:video:type": "text/html",
    "og:video:width": "1280",
    "og:video:height": "720",
    "video:duration": video.duration,
    "video:release_date": video.uploadDate,
    "twitter:player": video.embedUrl,
    "twitter:player:width": "1280",
    "twitter:player:height": "720"
  };
}

/**
 * SEO performance scoring
 */
export function calculateSEOScore(metaData: SEOMetaData): {
  score: number;
  recommendations: string[];
} {
  let score = 0;
  const recommendations: string[] = [];
  
  // Title optimization (20 points)
  if (metaData.title.length >= 30 && metaData.title.length <= 60) {
    score += 20;
  } else {
    recommendations.push("Optimize title length (30-60 characters)");
  }
  
  // Description optimization (20 points)
  if (metaData.description.length >= 120 && metaData.description.length <= 160) {
    score += 20;
  } else {
    recommendations.push("Optimize meta description length (120-160 characters)");
  }
  
  // Keywords (15 points)
  if (metaData.keywords.length >= 5 && metaData.keywords.length <= 10) {
    score += 15;
  } else {
    recommendations.push("Include 5-10 relevant keywords");
  }
  
  // Structured data (25 points)
  if (metaData.structuredData.length >= 3) {
    score += 25;
  } else {
    recommendations.push("Add more structured data types");
  }
  
  // Social media optimization (10 points)
  if (metaData.ogImage && metaData.twitterCard) {
    score += 10;
  } else {
    recommendations.push("Add Open Graph and Twitter Card meta tags");
  }
  
  // Canonical URL (10 points)
  if (metaData.canonicalUrl) {
    score += 10;
  } else {
    recommendations.push("Add canonical URL");
  }
  
  return { score, recommendations };
}
