// Analytics Event Types for Court Approval Page
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

// Page View Analytics
export interface PageViewEvent extends AnalyticsEvent {
  event: 'page_view';
  category: 'court_approval';
  page_title: string;
  page_location: string;
  user_engagement?: number;
}

// CTA Click Analytics
export interface CTAClickEvent extends AnalyticsEvent {
  event: 'cta_click';
  category: 'engagement';
  cta_type: 'primary' | 'secondary' | 'hero' | 'final';
  cta_text: string;
  cta_position: string;
  section: string;
}

// Section View Analytics
export interface SectionViewEvent extends AnalyticsEvent {
  event: 'section_view';
  category: 'engagement';
  section_name: string;
  scroll_depth: number;
  time_on_section?: number;
}

// FAQ Interaction Analytics
export interface FAQInteractionEvent extends AnalyticsEvent {
  event: 'faq_interaction';
  category: 'engagement';
  faq_question: string;
  faq_id: string;
  interaction_type: 'open' | 'close' | 'view';
}

// Process Step Analytics
export interface ProcessStepEvent extends AnalyticsEvent {
  event: 'process_step_view';
  category: 'education';
  step_number: number;
  step_title: string;
  engagement_time?: number;
}

// Mint AI Interaction Analytics
export interface MintAIInteractionEvent extends AnalyticsEvent {
  event: 'mint_ai_interaction';
  category: 'ai_engagement';
  interaction_type: 'feature_view' | 'cta_click' | 'chat_initiate';
  feature_name?: string;
}

// Performance Analytics
export interface PerformanceMetrics {
  page_load_time: number;
  first_contentful_paint: number;
  largest_contentful_paint: number;
  cumulative_layout_shift: number;
  first_input_delay: number;
  time_to_interactive: number;
}

// User Journey Analytics
export interface UserJourneyEvent extends AnalyticsEvent {
  event: 'user_journey';
  category: 'navigation';
  journey_step: string;
  previous_page?: string;
  next_action?: string;
  session_duration?: number;
}

// Conversion Analytics
export interface ConversionEvent extends AnalyticsEvent {
  event: 'conversion';
  category: 'business';
  conversion_type: 'quote_request' | 'chat_started' | 'form_submitted';
  conversion_value?: number;
  funnel_step: string;
}
