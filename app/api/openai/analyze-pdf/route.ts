import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    console.log('📥 [analyze-pdf] Received request');
    
    const body = await request.json();
    const { pdfText, fileName } = body;

    console.log('📝 [analyze-pdf] Request data:', {
      fileName,
      textLength: pdfText?.length
    });

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ [analyze-pdf] OPENAI_API_KEY is not configured');
      return NextResponse.json({
        analysis: `I've received your document "${fileName || ''}". One of our team members will review it and reach out to you shortly to assist you further.`
      });
    }

    console.log('✅ [analyze-pdf] OpenAI API key is configured');

    if (!pdfText) {
      console.error('❌ [analyze-pdf] No PDF text provided');
      return NextResponse.json(
        { error: 'PDF text is required' },
        { status: 400 }
      );
    }

    console.log('🤖 [analyze-pdf] Calling OpenAI API...');

    // Use OpenAI to analyze the PDF text
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Use mini for cost savings on text-only analysis
      messages: [
        {
          role: "system",
          content: `You are a structured settlement document expert. Provide BRIEF, CONCISE summaries only.

IMPORTANT: First determine if this is a structured settlement-related document (benefits letter, annuity statement, payment schedule, insurance document, structured settlement agreement).

If NOT structured settlement-related (presentations, random documents, unrelated content):
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
          content: `Analyze this PDF document "${fileName}" and provide a brief summary:

${pdfText}

Extract: Insurance company, payment type, payment amount, start date, end date (or life contingent), and any increases.`
        }
      ],
      max_tokens: 200,
      temperature: 0.2,
    });

    console.log('🤖 [analyze-pdf] OpenAI API call successful');

    const analysis = response.choices[0]?.message?.content || 
      'I was unable to analyze this document. One of our team members will review it and reach out to you shortly.';

    console.log('✅ [analyze-pdf] Analysis complete, length:', analysis.length);

    return NextResponse.json({
      analysis,
      usage: response.usage
    });

  } catch (error: any) {
    console.error('❌ [analyze-pdf] Error occurred:', {
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

