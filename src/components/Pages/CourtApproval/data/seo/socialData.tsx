// Social media SEO data for Court Approval page
import type { OpenGraphData, TwitterCardData } from '../../types/seoTypes';

// Open Graph Data
export const openGraphData: OpenGraphData = {
  title: "Court Approval Process for Structured Settlements",
  description: "Expert guidance through the court approval process. 98% approval rate with 24/7 AI support. Learn what to expect and how we help.",
  type: "website",
  url: "https://smarterpayouts.com/court-approval",
  image: {
    url: "https://smarterpayouts.com/images/court-approval-og.jpg",
    width: 1200,
    height: 630,
    alt: "Court Approval Process - Structured Settlement Transfer Guide"
  },
  siteName: "SmarterPayouts",
  locale: "en_US"
};

// Twitter Card Data
export const twitterCardData: TwitterCardData = {
  card: "summary_large_image",
  site: "@smarterpayouts",
  creator: "@smarterpayouts",
  title: "Court Approval Process for Structured Settlements",
  description: "Expert guidance through court approval. 98% success rate with 24/7 AI support. Learn the process step-by-step.",
  image: "https://smarterpayouts.com/images/court-approval-twitter.jpg",
  imageAlt: "Court Approval Process Guide - SmarterPayouts"
};
