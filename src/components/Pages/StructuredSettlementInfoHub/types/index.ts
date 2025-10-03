/**
 * TypeScript Types for Structured Settlement Info Hub
 * 
 * All interfaces and types used across Info Hub components
 */

export interface ContentCardProps {
  emoji?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface ResourceCardProps {
  title: string;
  emoji?: string;
  description: string;
  link: string;
  linkText: string;
}

export interface SidebarProps {
  relatedArticles?: RelatedArticleProps[];
}

export interface RelatedArticleProps {
  title: string;
  link: string;
}

export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

export interface StepItem {
  stepNumber: number;
  title: string;
  description: string;
  details: string[];
  ctaLink?: string;
  ctaText?: string;
}

export interface SchemaData {
  article?: any;
  faq?: any;
  breadcrumb?: any;
}

export interface MetadataConfig {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  relatedTerms?: string[];
}

export interface StateData {
  state: string;
  abbreviation: string;
  requirements: string[];
  timeline: string;
  notes?: string;
}

export interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export interface SchemaMarkupProps {
  articleSchema?: any;
  faqSchema?: any;
  breadcrumbSchema?: any;
}

