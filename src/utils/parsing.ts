export const parseAIResponse = (messageText: string): string => {
  // Return empty if input is not a string, to prevent errors.
  if (typeof messageText !== 'string') {
    return '';
  }
  // Check if the string looks like a JSON object.
  if (messageText.trim().startsWith('{') && messageText.trim().endsWith('}')) {
    try {
      const parsed = JSON.parse(messageText);
      // If it has a 'content' property, return that. Otherwise, return the original text.
      return parsed?.content || messageText;
    } catch (error) {
      // If parsing fails, it's not valid JSON. Return the original text.
      return messageText;
    }
  }
  // If it doesn't look like JSON, return the original text.
  return messageText;
}; 