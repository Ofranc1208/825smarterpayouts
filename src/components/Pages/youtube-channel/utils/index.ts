/**
 * Utilities Module - YouTube Channel Enterprise Edition
 * 
 * Exports all enterprise-grade utilities for the YouTube Channel page.
 * Provides SEO optimization, analytics tracking, and performance utilities.
 * 
 * ## Available Utilities
 * - **SEO Utils**: Structured data, meta tags, and search optimization
 * - **Analytics Utils**: User behavior tracking and conversion analysis
 * 
 * ## Usage
 * ```tsx
 * import { generateSEOMetaData, calculateVideoEngagementScore } from './utils';
 * 
 * const seoData = generateSEOMetaData({ videos, channelData });
 * const engagementScore = calculateVideoEngagementScore(metrics);
 * ```
 * 
 * @module Utils
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Enterprise Edition
 */

export * from './seo';
export * from './analytics';