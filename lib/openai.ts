// lib/openai.ts

// This file must only be imported/used in server-side code.

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-3.5-turbo';
const MAX_TOKENS = 2048;

export type OpenAIChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export async function callOpenAIChat(messages: OpenAIChatMessage[]): Promise<string> {
  // Truncate messages if needed (simple safeguard)
  const safeMessages = messages.slice(-12);

  const apiKey = process.env.OPENAI_API_KEY;
  
  // Enhanced logging for debugging
  console.log('[callOpenAIChat] Environment check:');
  console.log('[callOpenAIChat] NODE_ENV:', process.env.NODE_ENV);
  console.log('[callOpenAIChat] API key present:', !!apiKey);
  console.log('[callOpenAIChat] API key length:', apiKey ? apiKey.length : 0);
  console.log('[callOpenAIChat] API key starts with:', apiKey ? apiKey.substring(0, 7) + '...' : 'N/A');
  
  if (!apiKey) {
    console.error('[callOpenAIChat] CRITICAL: OpenAI API key not found in environment variables');
    console.error('[callOpenAIChat] Please ensure you have created a .env.local file with OPENAI_API_KEY=your_key_here');
    throw new Error('OpenAI API key not set. Please check your .env.local file.');
  }

  if (apiKey.length < 20) {
    console.error('[callOpenAIChat] CRITICAL: OpenAI API key appears to be invalid (too short)');
    throw new Error('OpenAI API key appears to be invalid. Please check your .env.local file.');
  }

  console.log('[callOpenAIChat] Sending messages to OpenAI:', JSON.stringify(safeMessages, null, 2));
  
  try {
    const res = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: safeMessages,
        max_tokens: MAX_TOKENS,
        temperature: 0.7,
      }),
    });

    console.log('[callOpenAIChat] OpenAI API response status:', res.status);
    console.log('[callOpenAIChat] OpenAI API response headers:', Object.fromEntries(res.headers.entries()));

    if (!res.ok) {
      const errorText = await res.text();
      console.error('[callOpenAIChat] OpenAI API error response:', errorText);
      
      // Parse error response if possible
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText };
      }
      
      // Provide specific error messages for common issues
      if (res.status === 401) {
        throw new Error('OpenAI API key is invalid or expired. Please check your API key in .env.local');
      } else if (res.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please try again later');
      } else if (res.status === 500) {
        throw new Error('OpenAI API server error. Please try again later');
      } else {
        throw new Error(`OpenAI API error (${res.status}): ${errorData.error?.message || errorData.error || errorText}`);
      }
    }

    const data = await res.json();
    console.log('[callOpenAIChat] OpenAI API success response structure:', {
      hasChoices: !!data.choices,
      choicesLength: data.choices?.length,
      hasMessage: !!data.choices?.[0]?.message,
      hasContent: !!data.choices?.[0]?.message?.content
    });
    
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.error('[callOpenAIChat] No content in OpenAI response:', JSON.stringify(data, null, 2));
      throw new Error('No response content from OpenAI API');
    }
    
    console.log('[callOpenAIChat] Successfully received response from OpenAI');
    return content.trim();
  } catch (error: any) {
    console.error('[callOpenAIChat] Exception during OpenAI API call:', error);
    
    // Re-throw with additional context if it's not already a formatted error
    if (error.message.includes('OpenAI API')) {
      throw error;
    } else {
      throw new Error(`OpenAI API call failed: ${error.message}`);
    }
  }
} 