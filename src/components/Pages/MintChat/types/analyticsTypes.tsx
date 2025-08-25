// MintChat Analytics Types

export interface MintChatAnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

export interface ChatInteraction {
  sessionId: string;
  messageId: string;
  action: 'send_message' | 'quick_reply' | 'button_click' | 'typing_start' | 'typing_stop';
  timestamp: number;
  content?: string;
  metadata?: {
    messageType?: string;
    responseTime?: number;
    userIntent?: string;
    conversationStage?: string;
  };
}

export interface ConversationAnalytics {
  sessionId: string;
  startTime: number;
  endTime?: number;
  messageCount: number;
  userMessageCount: number;
  mintResponseCount: number;
  averageResponseTime: number;
  conversationOutcome: 'completed' | 'abandoned' | 'converted' | 'escalated';
  topics: string[];
  userSatisfaction?: number;
}

export interface UserEngagementMetrics {
  sessionDuration: number;
  messagesExchanged: number;
  quickRepliesUsed: number;
  buttonsClicked: number;
  scrollDepth: number;
  timeToFirstMessage: number;
  timeToConversion?: number;
  bounceRate: boolean;
}

export interface AIPerformanceMetrics {
  responseTime: number;
  accuracyScore?: number;
  confidenceLevel?: number;
  fallbackTriggered: boolean;
  escalationRequired: boolean;
  userSatisfactionRating?: number;
  topicRecognitionSuccess: boolean;
}

export interface ConversionTracking {
  source: 'mint_chat';
  action: 'quote_request' | 'contact_form' | 'phone_call' | 'calculator_click';
  chatContext: {
    sessionId: string;
    messageCount: number;
    conversationDuration: number;
    lastTopic: string;
    userIntent: string;
  };
  timestamp: number;
  conversionValue?: number;
}

export interface ErrorTracking {
  errorType: 'connection_failed' | 'message_failed' | 'ai_error' | 'ui_error';
  errorMessage: string;
  timestamp: number;
  sessionId: string;
  userAgent: string;
  stackTrace?: string;
  recoveryAction?: string;
}

export interface PerformanceMetrics {
  chatLoadTime: number;
  firstMessageTime: number;
  averageResponseTime: number;
  uiRenderTime: number;
  memoryUsage?: number;
  connectionLatency: number;
}
