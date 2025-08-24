// Phase 2: Enable GPT Chat
// Hook for sending chat messages to GPT via /api/chat-gpt

export async function sendToGpt(messages: { role: string; content: string }[]): Promise<string> {
  try {
    const res = await fetch('/api/chat-gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('[useChatGpt] GPT API error:', errorText);
      throw new Error('Failed to get response from GPT.');
    }
    const data = await res.json();
    if (!data.content) {
      console.error('[useChatGpt] No content in GPT response:', data);
      throw new Error('No content in GPT response.');
    }
    return data.content;
  } catch (err: any) {
    console.error('[useChatGpt] Error sending to GPT:', err);
    throw new Error(err.message || 'Unknown error sending to GPT');
  }
} 