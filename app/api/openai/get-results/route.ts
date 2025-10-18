import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');
    const runId = searchParams.get('runId');

    if (!threadId || !runId) {
      return NextResponse.json(
        { error: 'Thread ID and Run ID are required' },
        { status: 400 }
      );
    }

    // Wait for run to complete
    let run = await openai.beta.threads.runs.retrieve(threadId, runId);

    // Poll until complete (in production, use webhooks)
    while (run.status === 'queued' || run.status === 'in_progress') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      run = await openai.beta.threads.runs.retrieve(threadId, runId);
    }

    if (run.status !== 'completed') {
      return NextResponse.json(
        { error: `Run failed with status: ${run.status}` },
        { status: 400 }
      );
    }

    // Get messages
    const messages = await openai.beta.threads.messages.list(threadId);

    // Get the latest assistant message
    const latestMessage = messages.data
      .filter(msg => msg.role === 'assistant')
      .sort((a, b) => b.created_at - a.created_at)[0];

    if (!latestMessage) {
      return NextResponse.json(
        { error: 'No analysis found' },
        { status: 404 }
      );
    }

    const content = latestMessage.content[0];
    if (content.type !== 'text') {
      return NextResponse.json(
        { error: 'Unexpected content type' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      content: content.text.value,
      messageId: latestMessage.id,
      created_at: latestMessage.created_at,
    });

  } catch (error) {
    console.error('Get results error:', error);
    return NextResponse.json(
      { error: 'Failed to get analysis results' },
      { status: 500 }
    );
  }
}
