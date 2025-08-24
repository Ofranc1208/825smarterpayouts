/**
 * Step Detection Service
 * 
 * This service is responsible for detecting which step in the calculator flow
 * a GPT response is asking for. It uses string matching to determine the
 * appropriate step based on the content of the AI's response.
 */

export type GuaranteedStep = 'payment-type' | 'payment-mode' | 'annual-increase' | 'payment-amount' | 'payment-dates' | 'review' | 'offer';

/**
 * Detects what step GPT is asking for based on the response content
 * @param gptReply - The response from GPT to analyze
 * @returns The detected step type or null if no step is detected
 */
export function detectStep(gptReply: string): GuaranteedStep | null {
  const reply = gptReply.toLowerCase();
  
  if (reply.includes('what type of payments do you receive')) {
    return 'payment-type';
  }
  if (reply.includes('how often do you receive your payments')) {
    return 'payment-mode';
  }
  if (reply.includes('annual increase') || reply.includes('yearly increase')) {
    return 'annual-increase';
  }
  if (reply.includes('payment amount') || reply.includes('how much do you receive')) {
    return 'payment-amount';
  }
  if (reply.includes('payment start and end dates') || 
      reply.includes('start date') || 
      reply.includes('end date') || 
      reply.includes('payment dates') ||
      reply.includes('start and end') ||
      reply.includes('dates') ||
      reply.includes('when do') ||
      reply.includes('when did') ||
      reply.includes('payment period')) {
    return 'payment-dates';
  }
  if (reply.includes('review your offer') || reply.includes('review') || reply.includes('click calculate') || reply.includes('payment dates completed')) {
    return 'review';
  }
  if (reply.includes('personalized offer') || reply.includes('your offer') || reply.includes('here\'s your') || reply.includes('calculation completed')) {
    return 'offer';
  }
  
  return null;
} 