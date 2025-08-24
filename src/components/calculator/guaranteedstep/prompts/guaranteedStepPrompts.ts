// ============================================================================
// 🎯 GUARANTEED STEP ASSISTANT - CONTEXTUAL PROMPTS
// ============================================================================
// Step-aware AI prompts for the Guaranteed Payment Calculator assistant
// Provides contextual guidance based on current step and user data

import { GuaranteedFormData } from '../types/guaranteed.types';

/**
 * 🎭 GUARANTEED STEP ASSISTANT - CORE SYSTEM PROMPT
 * 
 * This prompt defines the Guaranteed Step Assistant's persona and capabilities.
 * It's specifically designed for contextual help during the guaranteed payment flow.
 */
export const GUARANTEED_ASSISTANT_SYSTEM_PROMPT = `You are the Guaranteed Step Assistant, a specialized AI helper for Smarter Payouts' guaranteed payment calculator.

🎯 YOUR MISSION:
You help users navigate the guaranteed payment calculation process step-by-step. You are contextually aware of:
- Which step the user is currently on
- What information they've already provided
- What they need to do next

📋 YOUR CAPABILITIES:
- Provide step-specific guidance and explanations
- Answer questions about payment modes, amounts, and dates
- Explain calculation methodology and offer ranges
- Help users understand their options at each step
- Clarify form requirements and validation rules

🎭 YOUR PERSONALITY:
- Friendly and encouraging
- Clear and concise explanations
- Patient with questions
- Professional but approachable
- Focused on the current step's needs

🔒 IMPORTANT RULES:
- Stay focused on the guaranteed payment process
- Never provide financial advice - only process guidance
- Refer complex questions to specialists
- Keep responses relevant to the current step
- Use the user's actual data when providing examples

Remember: You're here to make the guaranteed payment calculation process smooth and understandable!`;

/**
 * 📝 STEP-SPECIFIC GUIDANCE PROMPTS
 */

export const STEP_GUIDANCE_PROMPTS = {
  mode: {
    welcome: (formData: GuaranteedFormData) => {
      const hasSelectedMode = formData.paymentMode;
      
      if (hasSelectedMode) {
        return `Welcome back! 👋 I see you've selected **${formData.paymentMode}** payments. 

I'm here to help if you want to change your selection or have questions about how **${formData.paymentMode}** payments work.

What would you like to know about your payment frequency options?`;
      }
      
      return `Welcome to your guaranteed payment calculation! 👋 I'm here to help you through each step.

Right now you're on the **Payment Mode** step where you choose how you want to receive your payments. Here's what each option means:

**Monthly** - 12 payments per year
**Quarterly** - 4 payments per year  
**Semiannually** - 2 payments per year
**Annually** - 1 payment per year
**Lump Sum** - Single large payment on specific dates

What questions do you have about payment frequencies? 🤔`;
    },
    
    contextualHelp: (formData: GuaranteedFormData) => {
      return `You're choosing how often you want to receive payments. Consider:

💰 **More frequent payments** (Monthly/Quarterly) = Steady income stream
💰 **Less frequent payments** (Annually) = Larger amounts, less often  
💰 **Lump Sum** = Maximum flexibility with payment dates

What fits your financial needs best?`;
    }
  },

  amount: {
    welcome: (formData: GuaranteedFormData) => {
      const hasAmount = formData.paymentAmount;
      const hasMode = formData.paymentMode;
      
      if (hasAmount && hasMode) {
        return `Great! 📊 I see you're setting up **${formData.paymentMode}** payments of **$${Number(formData.paymentAmount).toLocaleString()}**.

You're now on the **Payment Amount** step where you can adjust your payment details and set your payment period.

Need help with anything here?`;
      }
      
      return `Perfect! 💰 Now you're on the **Payment Amount** step.

Here you'll tell me:
• How much you want to receive per payment
• When you want payments to start  
• When you want payments to end
• Your annual increase percentage (optional)

What questions do you have about setting up your payment amounts?`;
    },
    
    contextualHelp: (formData: GuaranteedFormData) => {
      return `This step determines your payment schedule:

📅 **Payment Amount**: The amount you'll receive each payment period
📅 **Start Date**: When you want payments to begin
📅 **End Date**: When payments should stop
📅 **Annual Increase**: Optional yearly adjustment (like cost of living)

Need help calculating the right amount for your needs?`;
    }
  },

  lumpsum: {
    welcome: (formData: GuaranteedFormData) => {
      const hasPayments = formData.payments && formData.payments.length > 0;
      
      if (hasPayments) {
        return `Excellent! 📋 I see you're setting up **${formData.payments?.length}** lump sum payments.

You're on the **Lump Sum Details** step where you can add, edit, or remove individual payments and their dates.

What would you like to adjust with your payment schedule?`;
      }
      
      return `Perfect! 💸 You've chosen **Lump Sum** payments.

On this step you can:
• Add multiple payment amounts
• Set specific dates for each payment
• Customize your payment schedule completely

This gives you maximum flexibility! What questions do you have about setting up your lump sum payments?`;
    },
    
    contextualHelp: (formData: GuaranteedFormData) => {
      return `Lump sum payments let you:

🎯 **Choose exact dates** when you need money
🎯 **Vary payment amounts** based on your needs
🎯 **Plan around life events** (education, retirement, etc.)

You can add as many payments as you need. What's your payment strategy?`;
    }
  },

  review: {
    welcome: (formData: GuaranteedFormData) => {
      return `Almost there! 📋 You're now on the **Review** step.

This is your chance to double-check all your payment details before we calculate your offer. Everything look good?

If you need to make changes, just click "Edit Form" and I'll take you back to make adjustments.

Ready to see your personalized offer? 🎉`;
    },
    
    contextualHelp: (formData: GuaranteedFormData) => {
      return `Review all your choices:

✅ **Payment type and frequency**
✅ **Payment amounts and dates** 
✅ **Annual increase settings**

This is your last chance to make changes before calculation. Need to edit anything?`;
    }
  },

  offer: {
    welcome: (formData: GuaranteedFormData) => {
      return `🎉 Congratulations! Your guaranteed payment offer has been calculated!

This is your **personalized offer** based on all the details you provided. 

If you have questions about the offer or want to explore different scenarios, I'm here to help!

Ready to take the next step? You can continue to our main chat where Mint can help you with the complete process! 💬`;
    },
    
    contextualHelp: (formData: GuaranteedFormData) => {
      return `Your offer shows:

💰 **Minimum and maximum payout ranges**
💰 **Based on your specific payment schedule**
💰 **Competitive market rates**

Questions about your offer? I can explain how we calculated it or help you understand your options!`;
    }
  }
};

/**
 * 🔄 HANDOFF SUMMARY GENERATOR
 */

export const generateHandoffSummary = (formData: GuaranteedFormData): string => {
  let summary = "🎯 **Guaranteed Payment Calculation Summary**\n\n";
  
  if (formData.paymentMode) {
    summary += `**Payment Mode:** ${formData.paymentMode}\n`;
  }
  
  if (formData.paymentMode === 'Lump Sum' && formData.payments) {
    summary += `**Number of Payments:** ${formData.payments.length}\n`;
    summary += `**Total Amount:** $${formData.payments.reduce((sum, p) => sum + Number(p.amount || 0), 0).toLocaleString()}\n`;
    
    formData.payments.forEach((payment, index) => {
      if (payment.amount && payment.lumpSumDate) {
        summary += `  - Payment ${index + 1}: $${Number(payment.amount).toLocaleString()} on ${new Date(payment.lumpSumDate).toLocaleDateString()}\n`;
      }
    });
  } else {
    if (formData.paymentAmount) {
      summary += `**Payment Amount:** $${Number(formData.paymentAmount).toLocaleString()}\n`;
    }
    if (formData.startDate && formData.endDate) {
      summary += `**Payment Period:** ${new Date(formData.startDate).toLocaleDateString()} to ${new Date(formData.endDate).toLocaleDateString()}\n`;
    }
  }
  
  if (formData.annualIncrease !== undefined) {
    summary += `**Annual Increase:** ${formData.annualIncrease}%\n`;
  }
  
  return summary;
};

/**
 * 🎯 CONTEXTUAL RESPONSE GENERATOR
 */

export const generateContextualResponse = (
  userMessage: string,
  currentStep: string,
  formData: GuaranteedFormData
): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Common question patterns
  if (lowerMessage.includes('how') && lowerMessage.includes('work')) {
    return getHowItWorksResponse(currentStep, formData);
  }
  
  if (lowerMessage.includes('what') && (lowerMessage.includes('next') || lowerMessage.includes('happen'))) {
    return getWhatHappensNextResponse(currentStep, formData);
  }
  
  if (lowerMessage.includes('why') || lowerMessage.includes('explain')) {
    return getExplanationResponse(currentStep, formData, lowerMessage);
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
    return getHelpResponse(currentStep, formData);
  }
  
  if (lowerMessage.includes('calculate') || lowerMessage.includes('math')) {
    return getCalculationResponse(currentStep, formData);
  }
  
  if (lowerMessage.includes('best') || lowerMessage.includes('recommend')) {
    return getRecommendationResponse(currentStep, formData);
  }
  
  // Step-specific responses
  return getStepSpecificResponse(currentStep, lowerMessage, formData);
};

// Helper functions for contextual responses
const getHowItWorksResponse = (step: string, formData: GuaranteedFormData): string => {
  switch (step) {
    case 'mode':
      return `Payment modes work like this:

📅 **Regular payments** (Monthly, Quarterly, etc.) give you predictable income
📅 **Lump Sum** lets you choose exact dates and amounts

Which type fits your financial planning better?`;

    case 'amount':
      return `The payment amount step sets up your schedule:

1️⃣ Choose your payment amount
2️⃣ Set start and end dates  
3️⃣ Add annual increases if needed

This creates your complete payment timeline!`;

    case 'lumpsum':
      return `Lump sum payments work by:

💰 Setting specific amounts for specific dates
💰 Giving you complete control over timing
💰 Letting you plan around major life events

Perfect for strategic financial planning!`;

    default:
      return `The guaranteed payment process is simple:

1️⃣ **Choose** your payment frequency
2️⃣ **Set** your amounts and dates
3️⃣ **Review** everything  
4️⃣ **Get** your personalized offer

I'm here to help with any step!`;
  }
};

const getWhatHappensNextResponse = (step: string, formData: GuaranteedFormData): string => {
  switch (step) {
    case 'mode':
      if (formData.paymentMode === 'Lump Sum') {
        return `Next, you'll set up your individual lump sum payments - amounts and dates for each one. This gives you complete control! 🎯`;
      }
      return `Next, you'll set your payment amount, start date, end date, and any annual increases. Almost there! 📊`;

    case 'amount':
      return `Next up is the **Review** step where you can double-check everything before we calculate your offer. Looking good! ✅`;

    case 'lumpsum':
      return `Once you're happy with your payment schedule, we'll move to **Review** where you can check everything before calculation! 📋`;

    case 'review':
      return `Next, we'll calculate your personalized offer based on all your details. This is the exciting part! 🎉`;

    default:
      return `We'll move through each step systematically to get you the perfect guaranteed payment offer! 🚀`;
  }
};

const getExplanationResponse = (step: string, formData: GuaranteedFormData, message: string): string => {
  if (message.includes('annual increase') || message.includes('inflation')) {
    return `Annual increases help your payments keep up with inflation! 📈

For example:
• 3% annual increase means each year your payments grow by 3%
• If you start with $1,000/month, year 2 would be $1,030/month
• This helps maintain your purchasing power over time

Most people choose 2-4% to match typical inflation rates.`;
  }

  if (message.includes('calculation') || message.includes('offer')) {
    return `Your offer calculation considers:

🔢 **Present value** of your future payments
🔢 **Market interest rates** and timing
🔢 **Payment schedule** and frequency
🔢 **Risk factors** and processing costs

We provide a competitive range based on current market conditions!`;
  }

  return getStepSpecificResponse(step, message, formData);
};

const getHelpResponse = (step: string, formData: GuaranteedFormData): string => {
  switch (step) {
    case 'mode':
      return `I'm here to help! For payment modes:

🤔 **Not sure which to choose?** Think about your budget needs
🤔 **Want steady income?** Try Monthly or Quarterly  
🤔 **Planning specific expenses?** Lump Sum gives you control
🤔 **Need help deciding?** I can explain each option in detail

What specific aspect would you like me to explain?`;

    case 'amount':
      return `Happy to help with payment amounts! 💡

💭 **Payment amount**: How much do you need per payment?
💭 **Start date**: When do you want payments to begin?
💭 **End date**: How long do you want payments to continue?
💭 **Annual increase**: Optional inflation protection

What part would you like help with?`;

    case 'lumpsum':
      return `Lump sum help coming right up! 🎯

➕ **Add payments**: Click the + button for more payments
📅 **Set dates**: Choose when you need each payment
💰 **Set amounts**: Customize each payment amount
❌ **Remove payments**: Delete any you don't need

What would you like to adjust?`;

    default:
      return `I'm here to help with anything about guaranteed payments! 

🎯 Ask me about payment options
🎯 Get help with calculations
🎯 Understand the process
🎯 Learn about your choices

What specific question do you have?`;
  }
};

const getCalculationResponse = (step: string, formData: GuaranteedFormData): string => {
  return `The calculation works by evaluating your payment stream:

📊 **Present Value Analysis**: What your future payments are worth today
📊 **Market Rate Factors**: Current interest rates and market conditions  
📊 **Risk Assessment**: Factors that affect the calculation
📊 **Competitive Pricing**: We provide market-leading offers

Your final offer will show a range based on these factors. Ready to see your numbers? 🎉`;
};

const getRecommendationResponse = (step: string, formData: GuaranteedFormData): string => {
  switch (step) {
    case 'mode':
      return `Here's what I typically recommend:

💡 **Monthly**: Best for budgeting and regular expenses
💡 **Quarterly**: Good balance of frequency and amount size
💡 **Annually**: Larger payments, good for planned expenses
💡 **Lump Sum**: Maximum flexibility for specific needs

What's most important for your financial planning?`;

    case 'amount':
      return `For payment amounts, consider:

💡 **Start conservative**: You can always adjust later
💡 **Plan for inflation**: Consider annual increases
💡 **Think long-term**: How will your needs change?
💡 **Leave some buffer**: Don't use 100% of available funds

What's your main financial goal with these payments?`;

    default:
      return `My general recommendations:

✅ **Take your time** - this is an important decision
✅ **Ask questions** - I'm here to help you understand everything  
✅ **Consider your goals** - what do you want to achieve?
✅ **Plan ahead** - think about future needs

What aspect would you like my specific recommendation on?`;
  }
};

const getStepSpecificResponse = (step: string, message: string, formData: GuaranteedFormData): string => {
  const stepKey = step as keyof typeof STEP_GUIDANCE_PROMPTS;
  const stepPrompts = STEP_GUIDANCE_PROMPTS[stepKey];
  
  if (stepPrompts && typeof stepPrompts.contextualHelp === 'function') {
    return stepPrompts.contextualHelp(formData);
  }
  
  return `I'm here to help with your guaranteed payment calculation! 

For this step, I can explain:
• How this part of the process works
• What information you need to provide
• Why each field is important
• What happens next

What specific question can I answer for you? 🤔`;
};
