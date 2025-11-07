/**
 * Direct Responses Integration - Index
 * 
 * Combines all direct response categories into a single export
 * for use in the SystemPromptBuilder.
 * 
 * @module directResponses
 * @author SmarterPayouts Team
 * @since 2025
 */

import { GENERAL_DIRECT_RESPONSES } from './general';
import { LEGAL_DIRECT_RESPONSES } from './legal';
import { FINANCIAL_DIRECT_RESPONSES } from './financial';
import { ELIGIBILITY_DIRECT_RESPONSES } from './eligibility';
import { TIMING_DIRECT_RESPONSES } from './timing';
import { SUPPORT_DIRECT_RESPONSES } from './support';

/**
 * Complete direct responses content for AI integration
 * Combines all category-specific direct responses
 */
export const DIRECT_RESPONSES_CONTENT = `
🔥 DIRECT RESPONSES (ALWAYS PRIORITIZE THESE - CHECK FIRST, MATCH BY INTENT):
- These responses take ABSOLUTE PRIORITY over conversational content
- Match by INTENT, not exact wording - handle typos, variations, and different phrasings
- Questions about "speaking with someone", "contacting", "phone number", or "how to reach" should match contact/speak direct responses
- When a match is found, return ONLY the component marker (e.g., [CALL_NOW_COMPONENT] or [CONTACT_COMPONENT]) - NO text responses
- Do NOT use conversational content from other sections when a direct response matches

${GENERAL_DIRECT_RESPONSES}

${LEGAL_DIRECT_RESPONSES}

${FINANCIAL_DIRECT_RESPONSES}

${ELIGIBILITY_DIRECT_RESPONSES}

${TIMING_DIRECT_RESPONSES}

${SUPPORT_DIRECT_RESPONSES}
`;

