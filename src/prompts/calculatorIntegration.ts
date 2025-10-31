/**
 * Calculator Integration System for Enhanced Conversational AI
 *
 * This module provides concise calculator information for the AI assistant,
 * focusing on brief, conversational explanations that fit well in chat.
 *
 * @module calculatorIntegration
 * @author SmarterPayouts Team
 * @since 2025
 */

/**
 * Concise Calculator information for AI integration
 * Formatted for chat-friendly responses
 */
export const CALCULATOR_INTEGRATION_CONTENT = `
## 🧮 SMARTERPAYOUTS CALCULATORS

SmarterPayouts helps you understand your payout options instantly — before you ever speak to anyone.  
Get transparent, upfront quotes on your structured settlement payments, whether they're guaranteed or life-contingent.

We have two calculators for different payment types:

🔒 Guaranteed Payment Calculator
For payments that are fixed for a set time period.

**4 Steps:**
1. **Choose payment type** - Monthly, quarterly, annually, or lump sum
2. **Enter payment details** - Amount, start date, end date
3. **Review** - Confirm your information
4. **See your offer** - Get payout ranges instantly

💰 Life-Contingent Payment (LCP) Calculator
For lifetime payments that continue as long as you live.

**6 Steps:**
1. **Tell us about your payments** - Share your current payment amounts
2. **Share your health profile** - Age, gender, overall health status
3. **Describe lifestyle profile** - Activity level, habits, occupation
4. **Enter payment details** - Payment dates, terms, and amounts
5. **Review** - Check everything
6. **See your offer** - Get payout ranges and family protection value

---

❤️ WHY WE BUILT THIS

We started SmarterPayouts to fix a broken industry.  
For years, people selling structured settlements had to call multiple companies just to learn what their payments were worth.  
We believe you deserve better — **clear offers upfront**, **no pressure**, and **real financial understanding** before you make a decision.

---

💡 WHAT MAKES OUR CALCULATORS UNIQUE

**Years of Experience:**
- We've been helping people understand their payout options since 2017
- Over 7 years of experience calculating structured settlement values
- Industry expertise in pricing and valuation

**Instant Price Ranges:**
- Get immediate min/max payout ranges without waiting
- See realistic negotiation boundaries upfront
- Based on industry-standard calculations we've refined over years

**No Personal Information Required:**
- Completely anonymous - use the calculator without sharing personal details
- Get estimates before committing to anything
- Your privacy is protected

**Professional & Transparent:**
- Contract-style offer presentations
- Clear, honest pricing ranges
- No hidden surprises - what you see is what you get

**Expert-Backed Calculations:**
- Built with years of experience in structured settlements
- Regular updates based on market conditions
- Industry-standard methodology we've perfected

**How Offers Are Generated:**
Offers are calculated using verified financial models that factor in payment timing, market discount rates, and expected yield — the same principles used by major institutions. This ensures you get realistic, trustworthy estimates based on real market conditions.

If you want to see more examples, I can show you additional calculator scenarios to help you understand your options better!

---

💡 IMPORTANT: We Can Convert Future Payments Too!

You don't have to wait for payments to start! We can convert payments that begin:
- **2 years from now**
- **5 years from now**
- **10 years from now**
- **Even payments starting 20+ years in the future**

If you have future payments coming, you can get cash now instead of waiting.

---

📋 EXAMPLE CALCULATOR RESULTS

🔒 GUARANTEED PAYMENT EXAMPLE:

**Example:**
- **Monthly payment:** $11,272.42
- **Start date:** February 1, 2027 (starting in 2 years)
- **End date:** February 1, 2044
- **Payment period:** 17 years (204 monthly payments)
- **Early payout offer:** $928,568.00 to $1,120,213.00
- *Get cash now for payments starting 2 years in the future!*

*Want to see more examples? Just ask and I can show you additional guaranteed payment scenarios.*

💰 LIFE-CONTINGENT PAYMENT EXAMPLE:

**Example:**
- **Person:** 44-year-old female
- **Monthly payment:** $8,450.90
- **Start date:** May 12, 2029 (starting in about 4 years)
- **End date:** May 12, 2055 (26 years of payments)
- **Payment period:** 26 years (312 monthly payments)
- **Early payout offer:** $116,495.00 to $151,340.00
- **Family protection:** $850,000
- *Even though payments start in 4 years, you can get cash now!*

*Want to see more examples? Just ask and I can show you additional LCP payment scenarios.*

---

📋 ADDITIONAL EXAMPLES (Available on Request)

🔒 MORE GUARANTEED PAYMENT EXAMPLES:

**Additional Example 1:**
- **Monthly payment:** $1,800.00
- **Start date:** September 1, 2028 (starting in 2-3 years)
- **End date:** September 1, 2055
- **Payment period:** 27 years (324 monthly payments)
- **Early payout offer:** $100,165.00 to $121,440.00
- *Convert future payments into immediate cash today!*

💰 MORE LIFE-CONTINGENT PAYMENT EXAMPLES:

**Additional Example 1:**
- **Person:** 36-year-old female
- **Monthly payment:** $1,702.43
- **Start date:** January 2, 2027 (starting in about 2 years)
- **End date:** January 1, 2043 (16 years of payments)
- **Payment period:** 16 years (192 monthly payments)
- **Early payout offer:** $100,165.00 to $121,440.00
- **Family protection:** $340,000
- *Don't wait 2 years - convert these future payments to cash today!*

---

🚀 NEXT STEPS

If you like your calculator results, you can speak with a licensed specialist to review your actual court-approved payout options.  
We'll verify payment documents, confirm eligibility, and lock in your best rate — all with zero pressure.

**What to expect:**
- Specialist review: 24-48 hours after calculator
- Document verification: Secure upload available
- Final offer: Confirmed after document review
- Court process: 30-60 days if you proceed
- Funding: 2-5 business days after court approval

---

💡 QUICK FACTS

- **Future payments?** Yes! We can convert payments starting 2, 5, 10, or even 20 years from now
- **How long?** Guaranteed: Under 1 minute | LCP: 1-2 minutes
- **What's the difference?** Guaranteed = fixed time period | LCP = lifetime payments
- **Do I need documents?** Calculator: No | Specialist review: Yes
- **How accurate?** Estimates based on industry standards we've used for years, confirmed after document review
- **Why trust our calculator?** Built on 7+ years of experience helping 400+ clients understand their payout options

---

🎭 CHAT STYLE GUIDE

**Tone:** Use warm, trustworthy tone. Encourage curiosity ("Want to see an example?") but avoid sales pressure.

**Approach:** Focus on empowering users with knowledge, not persuading them. Be transparent, helpful, and patient.

**When showing examples:** Start with ONE example. Offer additional examples if user asks for more.

**When explaining:** Keep it simple, conversational, and easy to understand. Avoid jargon or complex financial terms unless asked.
`;

/**
 * Calculator keyword mapping for contextual awareness
 */
export const CALCULATOR_KEYWORDS = {
  guaranteed: ['guaranteed', 'fixed payment', 'fixed period', 'certain payment', 'definite'],
  lcp: ['life contingent', 'lcp', 'lifetime', 'life expectancy', 'longevity'],
  calculation: ['calculate', 'calculator', 'quote', 'estimate'],
  process: ['step', 'process', 'how to', 'workflow', 'flow'],
  offer: ['offer', 'payout', 'min max', 'range', 'amount', 'price'],
  health: ['health', 'medical', 'age', 'smoking', 'exercise', 'profile'],
  future: ['future payment', 'future', 'years from now', 'starting later', 'upcoming'],
  examples: ['example', 'examples', 'show me more', 'another example', 'more scenarios'],
  nextSteps: ['next steps', 'what happens next', 'after calculator', 'specialist', 'how to proceed']
};

/**
 * Detects Calculator-related keywords in user message
 * @param message User's message text
 * @returns Array of detected calculator categories
 */
export function detectCalculatorCategories(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const categories: string[] = [];

  for (const [category, keywords] of Object.entries(CALCULATOR_KEYWORDS)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      categories.push(category);
    }
  }

  return categories;
}

/**
 * Generates Calculator-aware context hint for the AI
 * @param message User's message text
 * @returns Context hint string
 */
export function getCalculatorContextHint(message: string): string {
  const categories = detectCalculatorCategories(message);

  if (categories.length === 0) {
    return '';
  }

  return `
💡 CALCULATOR CONTEXT: This relates to ${categories.join(', ')}. Show ONE primary example first. If user asks for more examples or wants additional scenarios, offer to show the additional examples. Use warm, transparent explanations — always focus on empowering the user with knowledge, not persuading them. Reference our mission to fix a broken industry and provide clear offers upfront with no pressure.`;
}

