/**
 * ChatGPT API Route - 2025 Implementation
 *
 * Handles OpenAI GPT API requests for the chat interface.
 * Uses the latest OpenAI API with proper error handling and streaming support.
 *
 * @route POST /api/chat-gpt
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * POST handler for ChatGPT API requests
 * Supports both streaming and non-streaming responses
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, stream = false } = body;

    // Validate request
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array required' },
        { status: 400 }
      );
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('[ChatGPT API] OPENAI_API_KEY not configured');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Prepare messages for OpenAI API
    const openaiMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Log the messages for debugging
    console.log('[ChatGPT API] Received messages:', openaiMessages.map(m => `${m.role}: ${m.content.substring(0, 100)}...`));

    if (stream) {
      // Handle streaming response
      return handleStreamingResponse(openaiMessages);
    } else {
      // Handle regular response
      return handleRegularResponse(openaiMessages);
    }
  } catch (error) {
    console.error('[ChatGPT API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Handle regular (non-streaming) ChatGPT response
 */
async function handleRegularResponse(messages: any[]) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Use gpt-4o-mini for cost efficiency
      messages,
      max_tokens: 200, // Limited to ~75 words (approximately 1.3-2 tokens per word)
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || '';

    return NextResponse.json({ content });
  } catch (error) {
    console.error('[ChatGPT API] Regular response error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from OpenAI' },
      { status: 500 }
    );
  }
}

/**
 * Handle streaming ChatGPT response
 */
async function handleStreamingResponse(messages: any[]) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 200, // Limited to ~75 words (approximately 1.3-2 tokens per word)
      temperature: 0.7,
      stream: true,
    });

    // Create a ReadableStream for streaming
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              controller.enqueue(new TextEncoder().encode(content));
            }
          }
          controller.close();
        } catch (error) {
          console.error('[ChatGPT API] Streaming error:', error);
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('[ChatGPT API] Streaming response error:', error);
    return NextResponse.json(
      { error: 'Failed to create streaming response' },
      { status: 500 }
    );
  }
} 