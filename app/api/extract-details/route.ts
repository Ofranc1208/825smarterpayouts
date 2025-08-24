import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Check if the API key is available
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
});

export async function POST(request: NextRequest) {
  // If the API key wasn't found during startup, return an error
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server configuration error: Missing API key.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { userMessage } = body;

    if (!userMessage) {
      return NextResponse.json(
        { error: 'User message is required.' },
        { status: 400 }
      );
    }

    // Create the prompt for extracting payment details
    const prompt = `You are an expert financial analyst. Extract payment details from the following user message and return them as a JSON object.

User Message: "${userMessage}"

Please extract and return ONLY a JSON object with these fields:
- amount: number (the payment amount)
- startDate: string (YYYY-MM-DD format)
- endDate: string (YYYY-MM-DD format) 
- paymentMode: string (one of: "Monthly", "Quarterly", "Semiannually", "Annually", "Lump Sum")
- increaseRate: number (optional, default 0)
- isLCP: boolean (optional, default false)
- lcpKeys: string[] (optional, default [])

If any required field cannot be determined from the message, use reasonable defaults:
- For dates, use current date + 1 month for start, + 2 years for end
- For paymentMode, default to "Monthly"
- For amount, if unclear, return 0

Return ONLY the JSON object, no additional text.`;

    // Make the OpenAI API call
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a financial data extraction expert. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 500
    });

    const extractedText = response.choices[0]?.message?.content?.trim();
    
    if (!extractedText) {
      return NextResponse.json(
        { error: 'No response from OpenAI API' },
        { status: 500 }
      );
    }

    // Robustly parse the JSON response and validate
    let paymentDetails;
    try {
      paymentDetails = JSON.parse(extractedText);
    } catch (parseError) {
      return NextResponse.json(
        { error: 'OpenAI returned malformed data that could not be parsed.' },
        { status: 500 }
      );
    }
    // Validate required fields
    if (!paymentDetails.amount || !paymentDetails.startDate || !paymentDetails.endDate || !paymentDetails.paymentMode) {
      return NextResponse.json(
        { error: 'Missing required payment details in OpenAI response' },
        { status: 500 }
      );
    }

    // Return the extracted payment details
    return NextResponse.json({ paymentDetails });

  } catch (error) {
    console.error("🔴 OpenAI API Error:", error);
    return NextResponse.json(
      { error: 'Failed to communicate with OpenAI API.' },
      { status: 500 }
    );
  }
} 