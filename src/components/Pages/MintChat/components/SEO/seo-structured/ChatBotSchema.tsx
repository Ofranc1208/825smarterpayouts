import React from 'react';

/**
 * ChatBot Schema Component for MintChat SEO
 * 
 * Provides structured data markup for the Mint AI chatbot
 * to enhance search engine understanding of AI assistant functionality.
 * 
 * @component ChatBotSchema
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * ChatBot Schema Component
 * 
 * ## Features
 * - ✅ ChatBot structured data (Schema.org)
 * - ✅ AI assistant capabilities description
 * - ✅ Service integration information
 * - ✅ Rich snippet optimization for AI features
 * 
 * @example
 * ```tsx
 * import ChatBotSchema from './ChatBotSchema';
 * 
 * export default function SEOStructured() {
 *   return <ChatBotSchema />;
 * }
 * ```
 */
export default function ChatBotSchema() {
  const chatBotSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Mint AI Assistant",
    "description": "AI-powered chatbot providing instant answers about structured settlements with no personal information required",
    "url": "https://smarterpayouts.com/mint-intelligent-chat",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free AI assistant for structured settlement questions"
    },
    "creator": {
      "@type": "Organization",
      "name": "SmarterPayouts",
      "url": "https://smarterpayouts.com"
    },
    "featureList": [
      "Instant settlement question answers",
      "No personal information required",
      "24/7 availability",
      "AI-powered responses",
      "Structured settlement expertise",
      "Free consultation"
    ],
    "screenshot": "https://smarterpayouts.com/images/mint-ai-screenshot.jpg",
    "softwareVersion": "2.0",
    "datePublished": "2024-01-01",
    "dateModified": "2024-12-01",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  React.useEffect(() => {
    // Add structured data script to head
    const existingScript = document.querySelector('script[type="application/ld+json"][data-schema="chatbot"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'chatbot');
      script.textContent = JSON.stringify(chatBotSchema);
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
