/**
 * Context Retriever Module
 * 
 * Responsible for retrieving relevant context from various sources:
 * - Vector-based knowledge base (when available)
 * - Static knowledge integrations
 * - Context hints based on user queries
 * 
 * @module ContextRetriever
 */

import { DEFAULT_FEATURE_FLAGS } from '../../../types/vector';
import { getFAQContextHint } from '../../prompts/faqIntegration';
import { getAboutUsContextHint } from '../../prompts/aboutUsIntegration';
import { getContactContextHint } from '../../prompts/contactIntegration';
import { getTestimonialsContextHint } from '../../prompts/testimonialsIntegration';
import { getProcessContextHint } from '../../prompts/processIntegration';
import { getCompanyStatsContextHint } from '../../prompts/companyStatsIntegration';
import { getCalculatorContextHint } from '../../prompts/calculatorIntegration';

// Safe vector manager import
let vectorManager: any = null;
let isVectorAvailable = false;

try {
  if (DEFAULT_FEATURE_FLAGS.enableVectorAI) {
    const { vectorManager: vm } = require('../../../lib/firebase/managers/VectorManager');
    vectorManager = vm;
    isVectorAvailable = true;
  }
} catch (error) {
  console.log('🔒 Vector system not available - using standard AI mode');
}

export interface RetrievedContext {
  content: string;
  source: string;
}

export interface ContextHints {
  faq: string;
  aboutUs: string;
  contact: string;
  testimonials: string;
  process: string;
  companyStats: string;
  calculator: string;
}

/**
 * Retrieves vector-based context for a user query
 * Falls back gracefully if vector system is unavailable
 */
export async function retrieveVectorContext(userQuery: string): Promise<RetrievedContext> {
  try {
    if (!isVectorAvailable || !vectorManager || !DEFAULT_FEATURE_FLAGS.enableVectorAI) {
      return { content: '', source: 'static' };
    }

    const searchQuery = userQuery.toLowerCase();
    let retrievedContent = '';
    let contextSource = 'static';

    // Simple relevance matching based on keywords (MVP approach)
    if (searchQuery.includes('company') || searchQuery.includes('about') || searchQuery.includes('statistics')) {
      retrievedContent = `Company Statistics: 400+ happy clients served, $50M+ in future payments purchased, 4.9/5 customer rating, founded in 2017, works with licensed brokers in all 50 states.`;
      contextSource = 'company_data';
    } else if (searchQuery.includes('process') || searchQuery.includes('how') || searchQuery.includes('step')) {
      retrievedContent = `4-Step Process: 1) Get instant quote (no personal info), 2) Review transparent terms, 3) Legal process (we handle everything), 4) Receive funds in 2-5 days after court approval.`;
      contextSource = 'process_data';
    } else if (searchQuery.includes('contact') || searchQuery.includes('phone') || searchQuery.includes('email')) {
      retrievedContent = `Contact Information: Phone: +1 (561) 583-1280, SMS: +1 (561) 583-1280, Email: info@smarterpayouts.com.`;
      contextSource = 'contact_data';
    }

    return { content: retrievedContent, source: contextSource };
  } catch (error) {
    // Vector context unavailable - fall back to static knowledge
    return { content: '', source: 'static' };
  }
}

/**
 * Generates all context hints based on user query
 * These hints help the AI understand which knowledge sections are most relevant
 */
export function generateContextHints(userQuery: string): ContextHints {
  return {
    faq: getFAQContextHint(userQuery),
    aboutUs: getAboutUsContextHint(userQuery),
    contact: getContactContextHint(userQuery),
    testimonials: getTestimonialsContextHint(userQuery),
    process: getProcessContextHint(userQuery),
    companyStats: getCompanyStatsContextHint(userQuery),
    calculator: getCalculatorContextHint(userQuery)
  };
}

