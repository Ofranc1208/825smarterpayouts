import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { fileId, instructions } = await request.json();

    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    // Create thread
    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: 'user',
          content: 'Please analyze this settlement document.',
          attachments: [
            {
              file_id: fileId,
              tools: [{ type: 'file_search' }]
            }
          ]
        }
      ]
    });

    return NextResponse.json({
      id: thread.id,
      created_at: thread.created_at,
    });

  } catch (error) {
    console.error('Thread creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create analysis thread' },
      { status: 500 }
    );
  }
}
