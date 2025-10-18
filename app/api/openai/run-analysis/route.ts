import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { threadId, assistantId } = await request.json();

    if (!threadId || !assistantId) {
      return NextResponse.json(
        { error: 'Thread ID and Assistant ID are required' },
        { status: 400 }
      );
    }

    // Create run
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
      instructions: `You are a settlement document expert. Analyze this document and provide a conversational summary for a client.

Focus on:
1. Document type and purpose
2. Insurance company information
3. Payment details (amount, frequency, dates)
4. Whether this can be used for settlement calculations
5. Next steps for the client

Be friendly and professional in your response.`,
    });

    return NextResponse.json({
      id: run.id,
      status: run.status,
      created_at: run.created_at,
    });

  } catch (error) {
    console.error('Run creation error:', error);
    return NextResponse.json(
      { error: 'Failed to start document analysis' },
      { status: 500 }
    );
  }
}
