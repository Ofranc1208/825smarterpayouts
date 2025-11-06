/**
 * Glossary Integration System for Enhanced Conversational AI
 * 
 * Provides structured settlement terminology definitions to the chatbot
 * to answer questions about industry terms, concepts, and legal definitions.
 * 
 * @module glossaryIntegration
 * @author SmarterPayouts Team
 * @since 2025
 */

import { glossaryTerms } from '@/src/components/Pages/StructuredSettlementInfoHub/data/glossaryData';

/**
 * Base glossary content for AI integration
 * Formatted for optimal GPT comprehension and natural conversation
 */
export const GLOSSARY_INTEGRATION_CONTENT = `
## 📖 STRUCTURED SETTLEMENT TERMINOLOGY GLOSSARY

**Important:** When users ask about industry terms, definitions, or concepts, use the definitions below to provide accurate, clear explanations.

### Key Terms & Definitions:

${glossaryTerms.map(term => {
  const related = term.relatedTerms && term.relatedTerms.length > 0 
    ? `\n  Related: ${term.relatedTerms.join(', ')}`
    : '';
  return `**${term.term}:**\n${term.definition}${related}`;
}).join('\n\n')}

### Usage Guidelines:
- When a user asks "What is [term]?" or "What does [term] mean?", provide the exact definition from above
- Use simple, conversational language when explaining complex terms
- Reference related terms when helpful for understanding
- If a term isn't in the glossary, acknowledge this and offer to connect them with a specialist
`;

/**
 * Finds a glossary term by name (case-insensitive, partial match)
 */
export function findGlossaryTerm(query: string): typeof glossaryTerms[0] | null {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Try exact match first
  let term = glossaryTerms.find(t => 
    t.term.toLowerCase() === normalizedQuery
  );
  
  if (term) return term;
  
  // Try partial match
  term = glossaryTerms.find(t => 
    t.term.toLowerCase().includes(normalizedQuery) ||
    normalizedQuery.includes(t.term.toLowerCase())
  );
  
  if (term) return term;
  
  // Try related terms
  term = glossaryTerms.find(t => 
    t.relatedTerms?.some(rt => 
      rt.toLowerCase().includes(normalizedQuery) ||
      normalizedQuery.includes(rt.toLowerCase())
    )
  );
  
  return term || null;
}

/**
 * Detects if user query is asking about terminology
 */
export function detectTerminologyQuery(query: string): boolean {
  const normalizedQuery = query.toLowerCase();
  
  const terminologyKeywords = [
    'what is', 'what does', 'what are', 'what\'s',
    'define', 'definition', 'meaning', 'means',
    'explain', 'explanation', 'term', 'terms',
    'glossary', 'terminology', 'vocabulary'
  ];
  
  return terminologyKeywords.some(keyword => normalizedQuery.includes(keyword));
}

/**
 * Gets glossary context hint for the AI
 */
export function getGlossaryContextHint(userQuery: string): string {
  const detectedTerm = findGlossaryTerm(userQuery);
  const isTerminologyQuery = detectTerminologyQuery(userQuery);
  
  if (!detectedTerm && !isTerminologyQuery) {
    return '';
  }
  
  if (detectedTerm) {
    return `💡 TERMINOLOGY QUERY DETECTED: User is asking about "${detectedTerm.term}". Use the exact definition from the glossary above. If related terms are mentioned, reference those as well.`;
  }
  
  return `💡 TERMINOLOGY QUERY DETECTED: User is asking about a term or concept. Check the glossary above for the definition. If the term isn't found, acknowledge this and offer to connect them with a specialist for clarification.`;
}

/**
 * Glossary keyword mapping for contextual awareness
 */
export const GLOSSARY_KEYWORDS = {
  definitions: ['what is', 'what does', 'define', 'definition', 'meaning', 'means'],
  explanations: ['explain', 'explanation', 'how does', 'how do'],
  terms: ['term', 'terms', 'glossary', 'terminology', 'vocabulary', 'word', 'words'],
  concepts: ['concept', 'concepts', 'idea', 'ideas', 'understand', 'understanding']
};

/**
 * Detects Glossary-related keywords in user message
 * @param message User's message text
 * @returns Array of detected glossary categories
 */
export function detectGlossaryCategories(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const categories: string[] = [];

  for (const [category, keywords] of Object.entries(GLOSSARY_KEYWORDS)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      categories.push(category);
    }
  }

  return categories;
}

