import React from 'react';

/**
 * Video Gallery Schema Component for YouTube Channel SEO
 * 
 * Provides structured data markup for the video gallery
 * to enhance search engine understanding of video content.
 * 
 * @component VideoGallerySchema
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Video Gallery Schema Component
 * 
 * ## Features
 * - ✅ VideoGallery structured data (Schema.org)
 * - ✅ Individual video metadata
 * - ✅ Educational content classification
 * - ✅ Rich snippet optimization
 * 
 * @example
 * ```tsx
 * import VideoGallerySchema from './VideoGallerySchema';
 * 
 * export default function SEOStructured() {
 *   return <VideoGallerySchema />;
 * }
 * ```
 */
export default function VideoGallerySchema() {
  const videoGallerySchema = {
    "@context": "https://schema.org",
    "@type": "VideoGallery",
    "name": "SmarterPayouts Educational Video Library",
    "description": "Comprehensive video library covering structured settlements, early payouts, and financial strategies",
    "url": "https://smarterpayouts.com/youtube-channel",
    "publisher": {
      "@type": "Organization",
      "name": "SmarterPayouts",
      "url": "https://smarterpayouts.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://smarterpayouts.com/images/logo.png"
      }
    },
    "video": [
      {
        "@type": "VideoObject",
        "name": "Self Calculate an Early Payout with Smarter Payouts!",
        "description": "Self-calculate a lump sum offer for your future settlement payments using our real-time tool. It's fast, accurate, and secure.",
        "thumbnailUrl": "https://smarterpayouts.com/assets/images/Self.JPG",
        "uploadDate": "2024-01-01",
        "duration": "PT3M45S",
        "contentUrl": "https://youtu.be/TxFogK2R61o",
        "embedUrl": "https://www.youtube.com/embed/TxFogK2R61o",
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": { "@type": "WatchAction" },
          "userInteractionCount": 2100
        }
      },
      {
        "@type": "VideoObject",
        "name": "Why wait, see an Early Lump offer in 2 minutes",
        "description": "Understand the benefit of receiving a lump-sum today versus waiting for monthly checks. A 2-minute video that explains everything.",
        "thumbnailUrl": "https://smarterpayouts.com/assets/images/why-wait.JPG",
        "uploadDate": "2024-01-01",
        "duration": "PT2M15S",
        "contentUrl": "https://youtu.be/AYFvqQCCSoY",
        "embedUrl": "https://www.youtube.com/embed/AYFvqQCCSoY",
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": { "@type": "WatchAction" },
          "userInteractionCount": 1800
        }
      },
      {
        "@type": "VideoObject",
        "name": "How does it feel to be debt free!",
        "description": "See how settlement payments can be used to pay off high-interest debt and regain financial peace of mind.",
        "thumbnailUrl": "https://smarterpayouts.com/assets/images/debt.JPG",
        "uploadDate": "2024-01-01",
        "duration": "PT4M20S",
        "contentUrl": "https://youtu.be/ur9pB2-xkk4",
        "embedUrl": "https://www.youtube.com/embed/ur9pB2-xkk4",
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": { "@type": "WatchAction" },
          "userInteractionCount": 3200
        }
      }
    ],
    "about": {
      "@type": "Thing",
      "name": "Structured Settlement Education",
      "description": "Educational content about structured settlements, financial planning, and early payout options"
    }
  };

  React.useEffect(() => {
    // Add structured data script to head
    const existingScript = document.querySelector('script[type="application/ld+json"][data-schema="video-gallery"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'video-gallery');
      script.textContent = JSON.stringify(videoGallerySchema);
      document.head.appendChild(script);

      // Cleanup function
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  return null; // No JSX needed for App Router structured data
}
