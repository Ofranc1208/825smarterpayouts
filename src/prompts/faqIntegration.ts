/**
 * FAQ Integration System for Enhanced Conversational AI
 * 
 * This module provides FAQ-aware context for the AI assistant,
 * making it smarter and more conversational by integrating
 * frequently asked questions into the knowledge base.
 * 
 * @module faqIntegration
 * @author SmarterPayouts Team
 * @since 2025
 */

/**
 * Structured FAQ content for AI integration
 * Formatted for optimal GPT comprehension and natural conversation
 */
export const FAQ_INTEGRATION_CONTENT = `
## 📚 FREQUENTLY ASKED QUESTIONS (FAQ)

### Legal Questions

**Q: Is it legal to sell my structured settlement?**
A: Yes, selling your structured settlement is 100% legal. The process is court-approved to ensure it's in your best interest, with all transactions reviewed by a judge. This is regulated by state and federal laws to protect consumers.

**Q: Do I need a lawyer?**
A: You don't need to hire your own lawyer to start. We handle all court paperwork and legal filings. However, you're always encouraged to seek independent legal or financial advice. We make sure everything is done clearly and transparently, and we never discourage getting a second opinion.

**Q: Can I sell my settlement if I live in any state?**
A: Yes, structured settlement sales are legal in all 50 states, but each state has specific court approval requirements. We're licensed to work nationwide and know each state's requirements inside and out.

**Q: How does court approval work?**
A: Once you accept your quote, we handle all the court paperwork. The judge will review your case in a short hearing — typically within 30 days — to ensure everything is fair and legal. The judge asks basic questions to confirm you understand the transaction and that it's in your best interest.

### Process Questions

**Q: How do I get a quote?**
A: Use our AI-powered Early Payout Calculator to get an instant, secure quote — no personal data, no phone calls required. Just provide your payment details and timing. The whole process takes 2-3 minutes and you'll get an immediate estimate.

**Q: What if I only want to sell some of my payments?**
A: Absolutely! You can sell just a portion of your future payments and keep the rest. This is called a "partial sale" and many clients choose this option to balance immediate needs with future security. You have complete flexibility.

### Timing Questions

**Q: How fast can I get paid?**
A: Many of our clients receive funds in as little as 24–72 hours after court approval. We offer direct deposit, paper check, or secure digital transfer. The total process (including court approval) typically takes 45-60 days.

**Q: How long does the entire process take?**
A: From start to finish, expect 45-90 days. This includes quote, paperwork, court approval (30-45 days), and funding (2-5 days after approval). We work to expedite every step while ensuring everything is done legally and properly.

### Financial Questions

**Q: How much will court approval cost me?**
A: Court filing fees are typically $100-$500 depending on your state. At SmarterPayouts, we handle all court costs and paperwork for you at no additional charge — they're included in our service. No surprise fees.

**Q: Will selling affect my taxes?**
A: For most personal injury settlements, there are no tax implications. If your structured settlement comes from a personal physical injury, wrongful death, or workers' compensation case, payments are generally tax-free — and so is the lump sum when you sell. We recommend consulting with a tax professional for your specific situation, and we can connect you with qualified CPAs if needed.

**Q: What factors determine the value of my quote?**
A: Your quote is based on: (1) Total amount of future payments, (2) Timing of those payments, (3) Current interest rates and discount rates, (4) Market conditions. We calculate what your future payments are worth in today's dollars, providing a competitive lump sum offer.

### Benefits & Education

**Q: What are the benefits of selling my structured settlement?**
A: Selling allows you to access your future funds now — to eliminate debt, pay medical bills, invest in education or a home, start a business, or improve your quality of life. Our process is transparent, fast, and court-approved. You get financial flexibility when you need it most.

**Q: What makes SmarterPayouts different?**
A: We're the first company to offer 100% digital quoting with upfront pricing — no cold calls, no pressure, no hidden fees. Built by legal and tech experts, our platform is designed for you: fast, safe, and human-first. You get a dedicated specialist (not a call center) who handles your case from start to finish.

**Q: What's the difference between a structured settlement and an annuity?**
A: A structured settlement is tax-free and comes from a legal settlement (injury, workers' comp, etc.), while annuities are typically taxable investments. Structured settlements offer unique legal protections and are specifically designed for injury compensation.

### Company Information

**Q: How many clients have you served?**
A: We've served over 400 happy clients since our founding in 2015, with a 4.9/5 customer rating.

**Q: How much experience do you have?**
A: We've purchased over $50 million worth of future payments for our clients. We're licensed in all 50 states and have deep expertise in both guaranteed payments and life-contingent payments.

**Q: What's your response time?**
A: We respond to inquiries within 24 hours, typically much faster. Once you start the process, you'll have a dedicated specialist who knows your case and is available to answer questions throughout.
`;

/**
 * FAQ keyword mapping for contextual awareness
 * Helps the AI recognize when to reference specific FAQ content
 */
export const FAQ_KEYWORDS = {
  legal: ['legal', 'law', 'court', 'judge', 'lawyer', 'attorney', 'approval', 'regulated'],
  process: ['process', 'how', 'steps', 'quote', 'calculator', 'start', 'begin'],
  timing: ['fast', 'quick', 'how long', 'when', 'timeline', 'speed', 'time'],
  financial: ['cost', 'fee', 'tax', 'money', 'price', 'value', 'quote', 'offer'],
  benefits: ['why', 'benefit', 'advantage', 'different', 'better', 'choose'],
  company: ['who', 'experience', 'clients', 'statistics', 'about', 'founded', 'licensed']
};

/**
 * Detects FAQ-related keywords in user message
 * @param message User's message text
 * @returns Array of detected FAQ categories
 */
export function detectFAQCategories(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const categories: string[] = [];

  for (const [category, keywords] of Object.entries(FAQ_KEYWORDS)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      categories.push(category);
    }
  }

  return categories;
}

/**
 * Generates FAQ-aware context hint for the AI
 * @param message User's message text
 * @returns Context hint string
 */
export function getFAQContextHint(message: string): string {
  const categories = detectFAQCategories(message);
  
  if (categories.length === 0) {
    return '';
  }

  return `\n💡 FAQ CONTEXT: This question relates to ${categories.join(', ')}. Reference the FAQ section above for accurate, detailed answers.\n`;
}

