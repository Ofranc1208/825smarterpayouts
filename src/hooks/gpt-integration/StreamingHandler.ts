/**
 * Streaming Handler Module
 * 
 * Responsible for handling streaming responses from the GPT API,
 * including chunk processing, parsing, and error handling.
 * 
 * @module StreamingHandler
 */

export interface StreamingCallbacks {
  onStream: (partialText: string) => void;
  onComplete?: (finalText: string) => void;
}

/**
 * Processes a streaming response from the GPT API
 * Handles chunked data and invokes callbacks for UI updates
 */
export async function processStreamingResponse(
  response: Response,
  callbacks: StreamingCallbacks
): Promise<string> {
  const { onStream, onComplete } = callbacks;

  if (!response.body) {
    onComplete?.('');
    return '';
  }

  const reader = response.body.getReader();
  let fullText = '';
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;

    if (value) {
      const chunk = new TextDecoder().decode(value);
      fullText += chunk;
      onStream(fullText);
    }
  }

  // Parse the final response
  const finalContent = parseFinalResponse(fullText);
  onComplete?.(finalContent);

  return finalContent;
}

/**
 * Parses the final streaming response
 * Handles both JSON and plain text responses
 */
function parseFinalResponse(rawText: string): string {
  try {
    const trimmed = rawText.trim();
    
    // Check if response is JSON
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      const parsed = JSON.parse(trimmed);
      
      if (parsed && typeof parsed.content === 'string') {
        return parsed.content;
      }
    }
    
    // Return raw text if not JSON or parsing fails
    return rawText;
  } catch (error) {
    console.error('AI response parsing error:', error);
    return rawText;
  }
}

/**
 * Makes a streaming API call to the GPT endpoint
 */
export async function makeStreamingAPICall(
  messages: Array<{ role: string; content: string }>
): Promise<Response> {
  const response = await fetch('/api/chat-gpt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, stream: true }),
  });

  if (!response.ok) {
    throw new Error(`API call failed with status ${response.status}`);
  }

  return response;
}

