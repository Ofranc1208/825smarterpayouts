// MintChat Core Types

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'mint';
  timestamp: number;
  type: 'text' | 'quick_reply' | 'card' | 'typing';
  metadata?: {
    quickReplies?: QuickReply[];
    cardData?: ChatCard;
    isTyping?: boolean;
  };
}

export interface QuickReply {
  id: string;
  text: string;
  payload: string;
  icon?: string;
}

export interface ChatCard {
  title: string;
  subtitle?: string;
  image?: string;
  buttons: ChatButton[];
}

export interface ChatButton {
  id: string;
  text: string;
  url?: string;
  payload?: string;
  type: 'web_url' | 'postback';
}

export interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  isConnected: boolean;
  sessionId: string;
  userId?: string;
  conversationContext: ConversationContext;
}

export interface ConversationContext {
  currentTopic?: string;
  userIntent?: string;
  collectedData?: Record<string, any>;
  conversationStage: 'greeting' | 'discovery' | 'qualification' | 'conversion' | 'support';
  lastActivity: number;
}

export interface ChatActions {
  sendMessage: (content: string) => Promise<void>;
  sendQuickReply: (payload: string) => Promise<void>;
  clearChat: () => void;
  exportChat: () => string;
  setTyping: (isTyping: boolean) => void;
  reconnect: () => Promise<void>;
}

export interface ProblemCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  severity: 'high' | 'medium' | 'low';
  category: 'financial' | 'process' | 'communication' | 'timing';
}

export interface SolutionFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  category: 'ai' | 'process' | 'support' | 'technology';
}

export interface BenefitCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
  metrics?: {
    value: string;
    label: string;
  };
}

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaButtons?: CTAButton[];
  backgroundImage?: string;
  className?: string;
}

export interface CTAButton {
  id: string;
  text: string;
  href?: string;
  onClick?: () => void;
  variant: 'primary' | 'secondary' | 'outline';
  icon?: string;
}

export interface MintChatPageState {
  chatState: ChatState;
  isLoading: boolean;
  error: string | null;
  activeSection: string;
  scrollPosition: number;
  modalState: {
    isOpen: boolean;
    type?: 'demo' | 'help' | 'feedback';
    data?: any;
  };
}
