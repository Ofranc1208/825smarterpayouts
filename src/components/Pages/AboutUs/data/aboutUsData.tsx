// About Us Centralized Data Configuration

// Company Overview Data
export const COMPANY_OVERVIEW = {
  name: 'SmarterPayouts',
  founded: '2015',
  headquarters: 'New York, NY',
  employees: '150+',
  customersServed: '10,000+',
  totalPayouts: '$500M+',
  averageRating: '4.9/5',
  responseTime: '< 24 hours',
  processingTime: '30-45 days',
  statesLicensed: '50 states'
} as const;

// Mission & Vision
export const MISSION_VISION = {
  mission: 'To provide structured settlement recipients with transparent, fair, and efficient access to their money when they need it most.',
  vision: 'To revolutionize the structured settlement industry through technology, transparency, and exceptional customer service.',
  values: [
    'Transparency in all dealings',
    'Customer-first approach',
    'Innovative technology solutions',
    'Regulatory compliance',
    'Ethical business practices'
  ]
} as const;

// Key Statistics
export const KEY_STATISTICS = [
  {
    id: 'customers-served',
    value: '10,000+',
    label: 'Customers Served',
    description: 'Satisfied customers who have accessed their settlement funds',
    icon: '👥'
  },
  {
    id: 'total-payouts',
    value: '$500M+',
    label: 'Total Payouts',
    description: 'Total amount paid to customers since inception',
    icon: '💰'
  },
  {
    id: 'average-rating',
    value: '4.9/5',
    label: 'Customer Rating',
    description: 'Average customer satisfaction rating',
    icon: '⭐'
  },
  {
    id: 'response-time',
    value: '< 24 hrs',
    label: 'Response Time',
    description: 'Average time to respond to customer inquiries',
    icon: '⚡'
  },
  {
    id: 'processing-time',
    value: '30-45 days',
    label: 'Processing Time',
    description: 'Average time from application to funding',
    icon: '📅'
  },
  {
    id: 'states-licensed',
    value: '50 states',
    label: 'Licensed States',
    description: 'Licensed to operate in all 50 US states',
    icon: '🇺🇸'
  }
] as const;

// Leadership Team
export const LEADERSHIP_TEAM = [
  {
    id: 'ceo',
    name: 'Sarah Johnson',
    title: 'Chief Executive Officer',
    bio: 'Former Goldman Sachs executive with 15+ years in financial services and structured settlements.',
    image: '/images/team/sarah-johnson.jpg',
    linkedin: 'https://linkedin.com/in/sarah-johnson-ceo'
  },
  {
    id: 'cto',
    name: 'Michael Chen',
    title: 'Chief Technology Officer',
    bio: 'Former Google engineer specializing in AI and machine learning applications in fintech.',
    image: '/images/team/michael-chen.jpg',
    linkedin: 'https://linkedin.com/in/michael-chen-cto'
  },
  {
    id: 'cfo',
    name: 'David Rodriguez',
    title: 'Chief Financial Officer',
    bio: 'CPA with 20+ years experience in financial services and regulatory compliance.',
    image: '/images/team/david-rodriguez.jpg',
    linkedin: 'https://linkedin.com/in/david-rodriguez-cfo'
  },
  {
    id: 'coo',
    name: 'Emily Thompson',
    title: 'Chief Operating Officer',
    bio: 'Operations expert with extensive experience in customer service and process optimization.',
    image: '/images/team/emily-thompson.jpg',
    linkedin: 'https://linkedin.com/in/emily-thompson-coo'
  }
] as const;

// Company Timeline
export const COMPANY_TIMELINE = [
  {
    id: 'founded',
    year: '2015',
    title: 'Company Founded',
    description: 'SmarterPayouts was founded with a mission to modernize the structured settlement industry.',
    milestone: true
  },
  {
    id: 'first-customer',
    year: '2016',
    title: 'First Customer Served',
    description: 'Successfully helped our first customer access their settlement funds.',
    milestone: false
  },
  {
    id: 'licensing',
    year: '2017',
    title: 'Multi-State Licensing',
    description: 'Obtained licenses to operate in 25 states, expanding our reach.',
    milestone: false
  },
  {
    id: 'technology-platform',
    year: '2018',
    title: 'Technology Platform Launch',
    description: 'Launched our proprietary technology platform for faster processing.',
    milestone: true
  },
  {
    id: 'mint-ai',
    year: '2020',
    title: 'Mint AI Introduction',
    description: 'Introduced Mint AI, our 24/7 customer support assistant.',
    milestone: true
  },
  {
    id: 'nationwide',
    year: '2022',
    title: 'Nationwide Operations',
    description: 'Achieved licensing in all 50 states, serving customers nationwide.',
    milestone: true
  },
  {
    id: 'milestone-customers',
    year: '2023',
    title: '10,000+ Customers',
    description: 'Reached the milestone of serving over 10,000 satisfied customers.',
    milestone: true
  },
  {
    id: 'future',
    year: '2024',
    title: 'Continued Innovation',
    description: 'Ongoing investment in AI technology and customer experience improvements.',
    milestone: false
  }
] as const;

// Awards & Recognition
export const AWARDS_RECOGNITION = [
  {
    id: 'best-fintech',
    title: 'Best FinTech Innovation',
    organization: 'Financial Services Awards',
    year: '2023',
    description: 'Recognized for innovative use of AI in structured settlements'
  },
  {
    id: 'customer-choice',
    title: 'Customer Choice Award',
    organization: 'Settlement Industry Association',
    year: '2023',
    description: 'Highest customer satisfaction rating in the industry'
  },
  {
    id: 'tech-excellence',
    title: 'Technology Excellence',
    organization: 'InsurTech Awards',
    year: '2022',
    description: 'Outstanding achievement in financial technology'
  },
] as const;

// Compliance & Certifications
export const COMPLIANCE_CERTIFICATIONS = [
  {
    id: 'state-licensing',
    title: 'State Licensing',
    description: 'Licensed in all 50 US states',
    authority: 'State Insurance Departments',
    status: 'Active'
  },
  {
    id: 'soc2',
    title: 'SOC 2 Type II',
    description: 'Security and availability controls certification',
    authority: 'AICPA',
    status: 'Certified'
  },
  {
    id: 'pci-dss',
    title: 'PCI DSS Compliance',
    description: 'Payment card industry data security standards',
    authority: 'PCI Security Standards Council',
    status: 'Compliant'
  },
  {
    id: 'gdpr',
    title: 'GDPR Compliance',
    description: 'General Data Protection Regulation compliance',
    authority: 'European Union',
    status: 'Compliant'
  }
] as const;

// About Us Constants
export const ABOUT_US_CONSTANTS = {
  COMPANY_NAME: 'SmarterPayouts',
  TAGLINE: 'Your Trusted Settlement Partner',
  PHONE: '+1-561-583-1280',
  EMAIL: 'info@smarterpayouts.com',
  ADDRESS: {
    street: '123 Financial Street',
    city: 'Miami',
    state: 'FL',
    zip: '33101',
    country: 'United States'
  },
  SOCIAL_MEDIA: {
    facebook: 'https://facebook.com/smarterpayouts',
    twitter: 'https://twitter.com/smarterpayouts',
    linkedin: 'https://linkedin.com/company/smarterpayouts',
    youtube: 'https://youtube.com/@smarterpayouts'
  },
  BUSINESS_HOURS: {
    weekdays: '9:00 AM - 6:00 PM EST',
    weekends: 'Closed',
    holidays: 'Closed on major holidays'
  }
} as const;
