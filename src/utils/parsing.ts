export const formatMessageText = (messageText: string): { text: string; hasBold: boolean } => {
  // Check for bold markdown (**text**)
  if (messageText.includes('**')) {
    return {
      text: messageText.replace(/\*\*([^*]+)\*\*/g, '$1'),
      hasBold: true
    };
  }

  return {
    text: messageText,
    hasBold: false
  };
}; 