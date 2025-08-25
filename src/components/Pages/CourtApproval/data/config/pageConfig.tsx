// Page configuration for Court Approval page

// Page Configuration
export const pageConfig = {
  title: "Court Approval Process - Structured Settlement Transfer",
  description: "Learn about the court approval process for structured settlement transfers. Get expert guidance and 24/7 AI support through every step.",
  keywords: [
    "court approval",
    "structured settlement",
    "legal process",
    "judge approval",
    "settlement transfer",
    "legal documents",
    "court hearing",
    "structured settlement company"
  ],
  lastUpdated: "2024-01-15",
  estimatedReadTime: 8,
  sections: [
    "hero",
    "process-steps", 
    "compliance",
    "testimonial",
    "mint-ai-support",
    "faq",
    "final-cta"
  ]
};

// Analytics Configuration
export const analyticsConfig = {
  trackingEvents: {
    pageView: 'court_approval_page_view',
    ctaClick: 'court_approval_cta_click',
    sectionView: 'court_approval_section_view',
    faqInteraction: 'court_approval_faq_interaction',
    processStepView: 'court_approval_process_step_view',
    mintAIInteraction: 'court_approval_mint_ai_interaction',
    conversion: 'court_approval_conversion'
  },
  goals: {
    primaryConversion: 'quote_request',
    secondaryConversion: 'mint_chat_start',
    engagementThreshold: 30, // seconds
    scrollDepthTargets: [25, 50, 75, 90, 100]
  }
};

// Performance Configuration
export const performanceConfig = {
  lazyLoadThreshold: '50px',
  imageOptimization: {
    quality: 85,
    format: 'webp',
    fallback: 'jpg'
  },
  cacheStrategy: {
    staticAssets: '1y',
    dynamicContent: '1h',
    apiResponses: '5m'
  },
  criticalResources: [
    '/fonts/inter-var.woff2',
    '/images/hero-bg.webp',
    '/css/critical.css'
  ]
};
