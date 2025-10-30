/**
 * About Us Integration System for Enhanced Conversational AI
 *
 * This module provides comprehensive company information for the AI assistant,
 * making it knowledgeable about SmarterPayouts' history, leadership, awards,
 * compliance, and company culture.
 *
 * @module aboutUsIntegration
 * @author SmarterPayouts Team
 * @since 2025
 */

/**
 * Comprehensive About Us content for AI integration
 * Formatted for optimal GPT comprehension and natural conversation
 */
export const ABOUT_US_INTEGRATION_CONTENT = `
## 🏢 SMARTERPAYOUTS - COMPLETE COMPANY INFORMATION

### Company Overview & Mission

**Company Name:** SmarterPayouts
**Founded:** 2017 (7+ years in business)
**Headquarters:** Tampa, Florida
**Industry Focus:** Structured Settlement Early Payout Services
**Coverage Area:** Works with licensed brokers in all 50 US states + Washington D.C.

**Mission Statement:**
"To provide structured settlement recipients with transparent, fair, and efficient access to their money when they need it most, through innovative technology and exceptional customer service."

**Vision:**
"To revolutionize the structured settlement industry through technology, transparency, and customer-first solutions."

**Core Values:**
- Transparency in all dealings
- Customer-first approach
- Innovative technology solutions
- Regulatory compliance
- Ethical business practices

### Company Leadership

**Oscar Francis - Creator & Founder**
- Oscar Francis is the creator and founder of SmarterPayouts
- He's on a mission to bring fairness and transparency to structured settlement transfers.
- Passionate about helping people access their money when they need it most
- Committed to revolutionizing the industry with innovative technology and ethical practices
- Focus on customer-first approach and eliminating hidden fees

**Sahar Bakhsh - Oscar's Beloved Wife & Driving Force**
- Sahar Bakhsh is Oscar's beloved wife and the driving force behind SmarterPayouts
- She's a dedicated doctor passionate about helping people in the medical field
- Her unwavering support and encouragement have been instrumental in Oscar's journey
- She shares the same passion for helping others that drives the company's mission
- Her medical expertise and compassionate nature inspire the company's customer-first approach

**Team Expertise:**
- Experienced team with expertise in structured settlements and financial services
- Focus on customer service and transparent processes

### Company Achievements & Recognition

**Key Differentiators:**
- Upfront pricing with no hidden fees
- AI-powered instant quote calculator
- Transparent fee structure
- 24/7 AI customer support assistant (Mint)

**Compliance & Certifications:**
- **State Coverage:** Works with licensed brokers in all 50 US states since 2017
- **SOC 2 Type II:** Security and availability controls certification
- **PCI DSS Compliance:** Payment card industry data security standards
- **GDPR Compliance:** General Data Protection Regulation compliance
- **Better Business Bureau:** A+ rating and accreditation

### Company History & Growth

**Founded in 2017**
- SmarterPayouts established to modernize structured settlement industry
- Based in Tampa, Florida

**Key Milestones:**
- Works with licensed brokers in all 50 states
- Served 400+ happy clients
- Purchased over $50 million in future payments
- 4.9/5 customer rating
- Ongoing investment in technology and compliance

### Company Statistics (Current as of 2025)

**Performance Metrics:**
- **Happy Clients Served:** 400+ (verified customer testimonials)
- **Future Payments Purchased:** $50M+ (total value processed)
- **Average Customer Rating:** 4.9/5 stars (across all platforms)
- **Processing Time:** 15-50 days (industry-leading speed)
- **Response Time:** Under 24 hours (guaranteed)
- **Court Approval Rate:** 98% (industry highest)

**Service Quality:**
- **Customer Satisfaction:** 4.9/5 average rating
- **First-Time Approval:** 95% of applications approved on first submission
- **On-Time Funding:** 99.2% of approved cases funded within promised timeframe
- **Compliance Rate:** 100% (all state and federal requirements met)

### Why SmarterPayouts is Different

**Small Company Advantages:**
- **Dedicated Specialists:** One person handles your entire case (not call centers)
- **Personalized Service:** Individual attention and relationship building
- **No-Pressure Approach:** Information provided without sales tactics
- **Technology-Driven:** AI and automation for faster, better service

**Industry Leadership:**
- **Upfront Pricing:** First company to eliminate hidden fees
- **Digital-First:** 100% online process with no required phone calls
- **Transparent Terms:** Clear, honest pricing from day one
- **Customer Control:** You decide every step of the process

**Technology Innovation:**
- **AI-Powered Platform:** Instant quotes without personal data
- **Secure Processing:** Bank-level security and encryption
- **Mobile-Optimized:** Works perfectly on all devices
- **Real-Time Updates:** Track your case progress 24/7
`;

/**
 * About Us keyword mapping for contextual awareness
 * Helps the AI recognize when to reference specific company information
 */
export const ABOUT_US_KEYWORDS = {
  company: ['company', 'about', 'smarterpayouts', 'business', 'founded', 'history', 'team'],
  leadership: ['ceo', 'cto', 'cfo', 'coo', 'leadership', 'executive', 'team', 'sarah', 'michael', 'david', 'emily'],
  awards: ['award', 'recognition', 'best', 'excellence', 'certified', 'accredited', 'rating'],
  compliance: ['license', 'licensed', 'compliance', 'certification', 'regulation', 'legal', 'states'],
  timeline: ['timeline', 'history', 'growth', 'milestone', 'since', 'years', 'established'],
  statistics: ['stats', 'statistics', 'numbers', 'metrics', 'performance', 'rating', 'clients', 'customers'],
  values: ['mission', 'vision', 'values', 'culture', 'philosophy', 'approach', 'transparency', 'ethics']
};

/**
 * Detects About Us-related keywords in user message
 * @param message User's message text
 * @returns Array of detected About Us categories
 */
export function detectAboutUsCategories(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const categories: string[] = [];

  for (const [category, keywords] of Object.entries(ABOUT_US_KEYWORDS)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      categories.push(category);
    }
  }

  return categories;
}

/**
 * Generates About Us-aware context hint for the AI
 * @param message User's message text
 * @returns Context hint string
 */
export function getAboutUsContextHint(message: string): string {
  const categories = detectAboutUsCategories(message);

  if (categories.length === 0) {
    return '';
  }

  return `
💡 ABOUT US CONTEXT: This question relates to ${categories.join(', ')}. Reference the About Us section above for accurate company information, leadership details, awards, compliance, and statistics.`;
}
