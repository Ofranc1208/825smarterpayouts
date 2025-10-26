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
**Founded:** 2015 (9+ years in business)
**Headquarters:** Miami, Florida
**Industry Focus:** Structured Settlement Early Payout Services
**States Licensed:** All 50 US states + Washington D.C.

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

### Leadership Team & Expertise

**Sarah Johnson - Chief Executive Officer**
- Former Goldman Sachs executive with 15+ years in financial services
- Expert in structured settlements and financial planning
- Led company growth from startup to industry leader
- Focus: Strategic direction and customer experience

**Michael Chen - Chief Technology Officer**
- Former Google engineer specializing in AI and fintech applications
- 12+ years in technology development and machine learning
- Designed our proprietary AI-powered platform
- Focus: Technology innovation and platform development

**David Rodriguez - Chief Financial Officer**
- CPA with 20+ years in financial services and regulatory compliance
- Expert in financial regulations and risk management
- Ensures all transactions meet legal and ethical standards
- Focus: Financial compliance and operational efficiency

**Emily Thompson - Chief Operating Officer**
- Operations expert with extensive customer service experience
- 15+ years in process optimization and team management
- Manages day-to-day operations and customer satisfaction
- Focus: Operational excellence and team development

### Company Achievements & Recognition

**Awards & Recognition (2023-2024):**
- **Best FinTech Innovation** - Financial Services Awards 2023
- **Customer Choice Award** - Settlement Industry Association 2023
- **Technology Excellence** - InsurTech Awards 2022
- **Top Rated Settlement Company** - Customer Reviews Platform 2024

**Industry Firsts:**
- First company to offer 100% digital upfront pricing
- First AI-powered instant quote calculator
- First transparent fee structure (no hidden costs)
- First 24/7 AI customer support assistant (Mint)

**Compliance & Certifications:**
- **State Licensing:** Licensed in all 50 US states since 2017
- **SOC 2 Type II:** Security and availability controls certification
- **PCI DSS Compliance:** Payment card industry data security standards
- **GDPR Compliance:** General Data Protection Regulation compliance
- **Better Business Bureau:** A+ rating and accreditation

### Company Timeline & Growth

**2015 - Company Founded**
- SmarterPayouts founded with mission to modernize structured settlement industry
- Initial focus on transparency and customer-first approach
- First office opened in Miami, Florida

**2016 - First Customer Served**
- Successfully completed first structured settlement transfer
- Established legal team and court approval processes
- Positive customer feedback validates business model

**2017 - Multi-State Licensing**
- Obtained licenses in 25 states
- Expanded legal and compliance teams
- Developed proprietary technology platform

**2018 - Technology Platform Launch**
- Launched AI-powered quote calculator
- Implemented digital document processing
- Reduced processing time by 60%

**2020 - Mint AI Introduction**
- Launched 24/7 AI customer support assistant
- Improved customer response time to under 2 hours
- Enhanced customer satisfaction scores

**2022 - Nationwide Operations**
- Achieved licensing in all 50 states
- Expanded team to 150+ employees
- $30M+ in payments processed

**2023 - Industry Recognition**
- Served 10,000+ customers milestone
- $50M+ in future payments purchased
- Multiple industry awards received

**2024 - Continued Innovation**
- Enhanced AI capabilities and customer experience
- Maintained 4.9/5 customer rating
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
