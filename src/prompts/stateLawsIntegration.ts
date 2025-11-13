/**
 * State Laws Integration System for Enhanced Conversational AI
 * 
 * Provides state-specific structured settlement information to the chatbot
 * to answer questions about state requirements, timelines, and legal processes.
 * 
 * @module stateLawsIntegration
 * @author SmarterPayouts Team
 * @since 2025
 */

import { getStateByName, allStates } from '@/src/state-laws/data';
import { statesData, getStateData } from '@/src/components/Pages/StructuredSettlementInfoHub/data/stateData';

/**
 * State abbreviation mapping for quick lookup
 */
const STATE_ABBREVIATIONS: Record<string, string> = {
  'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR',
  'california': 'CA', 'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE',
  'florida': 'FL', 'georgia': 'GA', 'hawaii': 'HI', 'idaho': 'ID',
  'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA', 'kansas': 'KS',
  'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
  'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS',
  'missouri': 'MO', 'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV',
  'new hampshire': 'NH', 'new jersey': 'NJ', 'new mexico': 'NM', 'new york': 'NY',
  'north carolina': 'NC', 'north dakota': 'ND', 'ohio': 'OH', 'oklahoma': 'OK',
  'oregon': 'OR', 'pennsylvania': 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
  'south dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT',
  'vermont': 'VT', 'virginia': 'VA', 'washington': 'WA', 'west virginia': 'WV',
  'wisconsin': 'WI', 'wyoming': 'WY', 'district of columbia': 'DC'
};

/**
 * Keywords that indicate state-specific legal/process questions
 * Only triggers state content when these keywords are present
 */
const STATE_CONTEXT_KEYWORDS = [
  'work', 'requirement', 'law', 'process', 'timeline', 'court', 'approval',
  'structure', 'settlement', 'sell', 'transfer', 'legal', 'statute', 'regulation',
  'how', 'what', 'when', 'where', 'does', 'need', 'required', 'procedure'
];

/**
 * Detects state names in user query with context awareness
 * Only returns a state if the query contains state-specific context keywords
 */
export function detectStateInQuery(query: string): string | null {
  const normalizedQuery = query.toLowerCase();
  
  // First check if query has state-specific context
  const hasStateContext = STATE_CONTEXT_KEYWORDS.some(keyword => 
    normalizedQuery.includes(keyword)
  );
  
  // If no state context, don't trigger (avoids false positives)
  if (!hasStateContext) {
    return null;
  }
  
  // Check all states in the database
  for (const stateName of Object.keys(allStates)) {
    const state = allStates[stateName];
    const stateLower = stateName.toLowerCase();
    const slugLower = state.slug.toLowerCase();
    
    // Check for full state name
    if (normalizedQuery.includes(stateLower)) {
      return stateName;
    }
    
    // Check for slug (e.g., "new-york")
    if (normalizedQuery.includes(slugLower)) {
      return stateName;
    }
    
    // Check for common abbreviations
    const abbrev = STATE_ABBREVIATIONS[stateLower];
    if (abbrev && normalizedQuery.includes(abbrev.toLowerCase())) {
      return stateName;
    }
  }
  
  return null;
}

/**
 * Formats state law information for AI consumption (concise version)
 * Only includes essential information: Key Requirements, Court Approval, Timeline
 */
export function formatStateLawContent(stateName: string): string {
  // Try to get detailed state law data first (primary source)
  const stateLaw = getStateByName(stateName);
  
  // Get abbreviation for secondary source lookup
  const stateLower = stateName.toLowerCase();
  const abbrev = STATE_ABBREVIATIONS[stateLower];
  const stateInfo = abbrev ? getStateData(abbrev) : null;

  if (!stateLaw && !stateInfo) {
    return '';
  }

  let content = `\n## 📍 ${stateName} Structured Settlement Laws\n\n`;

  // Primary source: Detailed state law data
  if (stateLaw) {
    // Limit to 3 key provisions to keep it concise
    const keyProvisions = stateLaw.keyProvisions.slice(0, 3);
    content += `**Key Requirements:**\n${keyProvisions.map(p => `- ${p}`).join('\n')}\n\n`;
    
    // Condense court approval to essential info only
    const courtApprovalShort = stateLaw.courtApproval.length > 150 
      ? stateLaw.courtApproval.substring(0, 150) + '...'
      : stateLaw.courtApproval;
    content += `**Court Approval:** ${courtApprovalShort}\n\n`;
  }

  // Secondary source: Timeline (most important for user)
  if (stateInfo && stateInfo.timeline) {
    content += `**Timeline:** ${stateInfo.timeline}\n\n`;
  }

  // Add link to full state page
  if (stateLaw) {
    content += `**More Info:** /state-laws/${stateLaw.slug}\n\n`;
  }

  return content;
}

/**
 * Gets state-specific context hint for the AI
 */
export function getStateLawsContextHint(userQuery: string): string {
  const detectedState = detectStateInQuery(userQuery);
  
  if (!detectedState) {
    return '';
  }
  
  return `⚠️ STATE-SPECIFIC QUERY DETECTED: User is asking about ${detectedState}. Focus on providing accurate timelines, key requirements, and court approval process for ${detectedState}. Emphasize how long the process takes in ${detectedState}.`;
}

/**
 * Base state laws content (general information)
 * This is always included in the prompt
 */
export const STATE_LAWS_INTEGRATION_CONTENT = `
## 📍 STATE-SPECIFIC STRUCTURED SETTLEMENT LAWS

**Important:** Each state has specific laws and requirements for selling structured settlements. When users ask about a specific state, detailed state-specific information will be provided below.

**General Information:**
- All 50 states require court approval for structured settlement transfers
- Each state has its own Structured Settlement Protection Act (SSPA)
- Processing times vary by state (typically 30-90 days)
- Requirements include disclosure statements, notice periods, and independent professional advice in many states

**⚠️ CRITICAL: When users ask "What are the legal requirements?" WITHOUT mentioning a specific state:**
1. FIRST explain that legal requirements vary by state
2. Provide 2-3 universal requirements that apply to ALL states:
   - Court approval is required in every state
   - Disclosure statements explaining all terms and fees
   - Notice to all interested parties (insurance company, annuity issuer)
3. THEN offer to provide state-specific examples
4. Use diverse state examples (NOT just Alabama) such as:
   - "For example, in **Texas** [explain], in **California** [explain], or in **New York** [explain]"
   - Rotate through different states (Texas, California, Florida, New York) to provide variety
5. Ask which state the user is in to provide specific information

**When answering state-specific questions:**
- Reference the exact statute citation for that state
- Mention specific requirements (notice periods, independent counsel, etc.)
- Provide accurate timelines based on that state's typical processing time
- Explain court approval requirements specific to that state
- If you don't have information for a specific state, acknowledge this and suggest they contact a specialist
`;

/**
 * State laws keyword mapping for contextual awareness
 */
export const STATE_LAWS_KEYWORDS = {
  state: ['state', 'states', 'location', 'where', 'laws', 'requirements', 'by state', 'local'],
  legal: ['law', 'legal', 'statute', 'regulation', 'court', 'approval', 'judge', 'hearing'],
  process: ['process', 'procedure', 'timeline', 'how long', 'time', 'duration', 'steps'],
  requirements: ['requirement', 'required', 'need', 'must', 'mandatory', 'provision']
};

/**
 * Detects State Laws-related keywords in user message
 * @param message User's message text
 * @returns Array of detected state law categories
 */
export function detectStateLawsCategories(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const categories: string[] = [];

  for (const [category, keywords] of Object.entries(STATE_LAWS_KEYWORDS)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      categories.push(category);
    }
  }

  return categories;
}

