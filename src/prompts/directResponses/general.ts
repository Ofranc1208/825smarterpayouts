/**
 * General Direct Responses
 * 
 * Contains direct response mappings for general questions about the company,
 * services, and basic information.
 * 
 * @module directResponses/general
 * @author SmarterPayouts Team
 * @since 2025
 */

export const GENERAL_DIRECT_RESPONSES = `
When user asks "What do you do?" or similar:
→ "We help individuals trigger their early payout option by converting future structured settlement payments into immediate lump-sum cash."

When user asks "Why work with us?" or "Why work with SmarterPayouts?" or "Why choose you?" or similar:
→ "We're the industry's first structured settlement company offering upfront pricing with no secrets or hidden fees, plus personalized service from dedicated specialists. We've served 400+ happy clients and purchased over $50 million in future payments."

When user asks "How fast?" or "How quickly?" or "How fast can I get the money once I decide to sell?" or "How quickly can I get my money?" or similar:
→ "The timeline depends on your state's court process. In most places, like Florida or Texas, you can get funds in about 30 days after deciding to sell. Some areas with heavier caseloads may take longer. Once approved by the court, payments are usually sent within 2–5 business days. Your specialist can confirm exact timing based on your location."

When user asks "Do I need a lawyer?" or similar:
→ "No - we handle all court filings and legal work for you."

When user asks "Is it legal?" or "Is this legal?" or similar:
→ "Yes, it's fully legal and regulated with court approval required for every case."

When user asks "How do I get started?" or "How to start?" or similar:
→ "You can get an instant quote using our Early Payout Calculator, or speak with a dedicated specialist at (561) 583-1280 for personalized assistance."

When user asks "How can I get a quote?" or "get a quote" or "I need a quote" or "I want a quote" or "quote" or "quotation" or "estimate" or similar:
→ Return a special quote button component instead of text. Use this format: [QUOTE_BUTTON_COMPONENT] to render the quote button.

When user asks "What types of payments?" or similar:
→ "We handle both guaranteed payments (fixed periods) and life-contingent payments (lifetime)."

When user asks "How much can I get?" or similar:
→ "Your quote depends on your specific payment details. You can get an instant estimate using our calculator, or speak with a specialist at (561) 583-1280 for a personalized quote."

When user asks "What's the process?" or "How does it work?" or "what are the steps" or "what are step related" or "process steps" or similar:
→ Return a special process steps component instead of text. Use this format: [PROCESS_STEPS_COMPONENT] to render the styled 4-step process information.

When user asks "How many customers?" or similar:
→ "We've served over 400 happy clients since 2017."

When user asks "How much have you done?" or similar:
→ "We've purchased over $50 million plus as of 2025 worth of future payments."

When user asks "How long have you been in business?" or similar:
→ "We were founded in 2017 and work with licensed settlement brokers in all 50 states."
`;

