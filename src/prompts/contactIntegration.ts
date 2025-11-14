/**
 * Contact Integration System for Enhanced Conversational AI
 *
 * This module provides comprehensive contact information for the AI assistant,
 * making it knowledgeable about all available contact methods, business hours,
 * response times, and specialist availability.
 *
 * @module contactIntegration
 * @author SmarterPayouts Team
 * @since 2025
 */

/**
 * Comprehensive Contact information for AI integration
 * Formatted for optimal GPT comprehension and natural conversation
 */
export const CONTACT_INTEGRATION_CONTENT = `
## 📞 SMARTERPAYOUTS - COMPLETE CONTACT INFORMATION

### Multiple Ways to Reach Us

**Primary Phone Number:**
- **Phone:** (855) 214-3510
- **SMS/Text:** (561) 583-1280
- **Available:** Monday-Friday, 9:00 AM - 6:00 PM EST
- **Response Time:** Immediate during business hours
- **Best For:** Urgent questions, complex situations, personalized guidance

**Email Contact:**
- **Email:** info@smarterpayouts.com
- **Response Time:** Within 24 hours (typically much faster)
- **Available:** 24/7 for sending messages
- **Best For:** Document sharing, detailed questions, non-urgent matters

**Physical Location:**
- **Address:** 15257 Amberly Dr Ste 233, Tampa, FL 33647
- **Business Hours:** Monday-Friday, 9:00 AM - 6:00 PM EST
- **Phone:** (855) 214-3510
- **Best For:** In-person consultations (by appointment only)

### Response Time Guarantees

**Phone Calls:**
- Answered within 3 rings during business hours
- Voicemail returned within 1 hour during business hours
- After-hours urgent matters: Call and leave message for priority callback

**Email Inquiries:**
- Initial response within 24 hours (business days)
- Average response time: 2-4 hours during business days
- Complex inquiries: 24-48 hours with detailed response

**Emergency Contact:**
- For time-sensitive matters, call and press 1 for priority handling
- Emergency team available for urgent court deadlines
- Same-day response for urgent legal matters

### Specialist Consultation Options

**Free Initial Consultation:**
- **Duration:** 15-30 minutes
- **Format:** Phone call, video call, or in-person
- **Topics Covered:** Your specific situation, quote review, process explanation
- **No Obligation:** Completely free with no pressure to proceed

**Document Review:**
- **Free Service:** Review of your settlement documents
- **Timeline:** 24-48 hours for detailed analysis
- **Format:** Secure upload or email submission
- **Includes:** Detailed explanation of options and next steps

**Quote Consultation:**
- **Free Service:** Review and explanation of your quote
- **Includes:** Comparison with industry standards
- **Timeline:** Same-day if during business hours
- **Format:** Phone call with your dedicated specialist

### Business Hours & Availability

**Standard Business Hours:**
- **Monday - Friday:** 9:00 AM - 6:00 PM EST
- **Saturday - Sunday:** Closed
- **Holidays:** Closed on major US holidays

**After-Hours Support:**
- **Urgent Matters:** Leave voicemail with "URGENT" for priority callback
- **Emergency Line:** Available for court deadlines and time-sensitive matters
- **Questions:** You can ask questions here anytime, and we'll respond during business hours

**Holiday Schedule:**
- New Year's Day, Memorial Day, July 4th, Labor Day
- Thanksgiving Day, Christmas Day
- Emergency support available on holidays for urgent matters

### Contact Best Practices

**For Fastest Response:**
1. **Phone Call:** Best for urgent matters and complex questions
2. **Book Appointment:** Best for consultations and personalized guidance
3. **Email:** Best for detailed questions and document sharing

**What to Include in Your Message:**
- Type of structured settlement (guaranteed or life-contingent)
- Approximate payment amounts and timing
- Your location (state) for legal requirements
- Timeline needs (how quickly you need funds)
- Best contact method and availability

**Privacy & Security:**
- All communications are encrypted and secure
- No sensitive information required for initial quotes
- Your privacy is protected under GDPR and state regulations
- We never share your information with third parties

### Escalation Procedures

**When to Escalate to Human Specialist:**
- Complex legal questions requiring professional advice
- Detailed document review and explanation
- Negotiation of terms or special circumstances
- Complaints or concerns requiring management attention

**Specialist Assignment:**
- Dedicated specialist assigned within 24 hours of initial contact
- One specialist handles your entire case from start to finish
- Direct phone number and email provided for your specialist
- Regular updates throughout the process

### Contact Information Summary

**Quick Reference:**
- **Call:** (855) 214-3510 | **Text:** (561) 583-1280
- **Email:** info@smarterpayouts.com
- **Book Appointment:** Schedule a free consultation
- **Business Hours:** Mon-Fri 9AM-6PM EST
- **Response Guarantee:** 24 hours max (typically much faster)

**Emergency Contact:**
- Call (855) 214-3510 and press 1 for urgent matters
- Leave detailed message for immediate callback
- Available for court deadlines and time-sensitive situations
`;

/**
 * Contact keyword mapping for contextual awareness
 * Helps the AI recognize when to provide specific contact information
 */
export const CONTACT_KEYWORDS = {
  phone: ['phone', 'call', 'telephone', 'number', 'dial', 'ring', 'speak', 'talk'],
  email: ['email', 'mail', 'write', 'contact', 'message', 'send', 'inquiry'],
  chat: ['chat', 'live chat', 'instant', 'message', 'text chat', 'online chat'],
  location: ['address', 'office', 'location', 'visit', 'meet', 'directions', 'miami'],
  hours: ['hours', 'time', 'when', 'available', 'open', 'closed', 'weekends'],
  emergency: ['urgent', 'emergency', 'asap', 'immediately', 'rush', 'deadline', 'court'],
  consultation: ['consultation', 'consult', 'meeting', 'appointment', 'discuss', 'review'],
  response: ['response', 'reply', 'callback', 'get back', 'hear back', 'follow up']
};

/**
 * Detects Contact-related keywords in user message
 * @param message User's message text
 * @returns Array of detected contact categories
 */
export function detectContactCategories(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const categories: string[] = [];

  for (const [category, keywords] of Object.entries(CONTACT_KEYWORDS)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      categories.push(category);
    }
  }

  return categories;
}

/**
 * Generates Contact-aware context hint for the AI
 * @param message User's message text
 * @returns Context hint string
 */
export function getContactContextHint(message: string): string {
  const categories = detectContactCategories(message);

  if (categories.length === 0) {
    return '';
  }

  // Don't trigger contact component for location-only questions (handled by direct response)
  const locationOnlyKeywords = ['where are you', 'where are you located', 'where is your office', 'what\'s your address', 'physical location'];
  const isLocationOnly = locationOnlyKeywords.some(keyword => message.toLowerCase().includes(keyword));
  
  if (isLocationOnly && categories.length === 1 && categories[0] === 'location') {
    return ''; // Let direct response handle this
  }

  return `
💡 CONTACT CONTEXT: This question relates to ${categories.join(', ')}. Reference the Contact Information section above for accurate contact methods, business hours, response times, and specialist availability.`;
}
