import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    console.log('📥 [analyze-image] Received request');
    
    const body = await request.json();
    const { imageUrl, fileName, imageBase64 } = body;

    console.log('📝 [analyze-image] Request data:', {
      hasImageUrl: !!imageUrl,
      hasImageBase64: !!imageBase64,
      fileName,
      imageUrlPrefix: imageUrl?.substring(0, 50),
      base64Length: imageBase64?.length
    });

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ [analyze-image] OPENAI_API_KEY is not configured');
      return NextResponse.json({
        analysis: `I've received your document "${fileName || ''}". One of our team members will review it and reach out to you shortly to assist you further.`
      });
    }

    console.log('✅ [analyze-image] OpenAI API key is configured');

    if (!imageUrl && !imageBase64) {
      console.error('❌ [analyze-image] No image data provided');
      return NextResponse.json(
        { error: 'Image URL or base64 data is required' },
        { status: 400 }
      );
    }

    // Determine the image source - prefer base64 for blob URLs
    const imageSource = imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : imageUrl;
    console.log('🖼️ [analyze-image] Using image source:', imageSource.substring(0, 50) + '...');

    console.log('🤖 [analyze-image] Calling OpenAI Vision API...');

    // Use OpenAI Vision API to analyze the image
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // GPT-4 with vision capabilities
      messages: [
        {
          role: "system",
          content: `You are a structured settlement document expert. Provide BRIEF, CONCISE summaries only.

IMPORTANT: First determine if this is a structured settlement-related document (benefits letter, annuity statement, payment schedule, insurance document, structured settlement agreement).

If NOT structured settlement-related (random photos, presentations, unrelated documents):
- Respond EXACTLY: "This doesn't appear to be a structured settlement document. One of our team members will reach out to you shortly to assist you further."

If IS structured settlement-related, extract ONLY these key facts:
- Insurance Company name
- Payment Type (Life Contingent or Guaranteed Payments)
- Payment Amount (monthly/annual)
- Start Date
- End Date (if specified, otherwise note "Life Contingent")
- Payment Increases (if any, e.g., "2% annual increase")

Format: Short, friendly 2-3 sentence summary. Be conversational but concise.`
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze "${fileName}" and provide a brief summary with: Insurance company, payment type, payment amount, start date, end date (or life contingent), and any increases.`
            },
            {
              type: "image_url",
              image_url: {
                url: imageSource,
                detail: "high" // High detail for better text recognition
              }
            }
          ]
        }
      ],
      max_tokens: 200,
      temperature: 0.2, // Lower temperature for more consistent analysis
    });

    console.log('🤖 [analyze-image] OpenAI API call successful');

    const analysis = response.choices[0]?.message?.content || 
      'I was unable to analyze this image. Please contact our specialists for assistance.';

    console.log('✅ [analyze-image] Analysis complete, length:', analysis.length);

    return NextResponse.json({
      analysis,
      usage: response.usage
    });

  } catch (error: any) {
    console.error('❌ [analyze-image] Error occurred:', {
      message: error?.message,
      status: error?.status,
      type: error?.type,
      code: error?.code,
      stack: error?.stack?.split('\n').slice(0, 3)
    });

    // Handle specific error types
    if (error?.status === 429 || error?.code === 'insufficient_quota') {
      return NextResponse.json({
        analysis: `I've received your document, but our AI analysis service is currently at capacity. One of our team members will review this document and reach out to you shortly.`
      });
    }

    // Return a user-friendly error message
    return NextResponse.json({
      analysis: `I encountered an issue analyzing your document. One of our team members will review it and reach out to you shortly to assist you further.`
    });
  }
}

