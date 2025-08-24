import { FAQItem } from '../components/SharedFAQ';
import Link from 'next/link';

// Common FAQs used across multiple pages
export const commonFAQs: FAQItem[] = [
  {
    id: 'legal',
    question: 'Is it legal to sell my structured settlement?',
    answer: 'Yes — it\'s fully legal and regulated. Each case is reviewed and approved by a judge to ensure fairness.',
  },
  {
    id: 'quote',
    question: 'How do I get a quote?',
    answer: (
      <>
        Just use our{' '}
        <Link href="/pricing-calculator" className="text-success text-decoration-underline">
          Early Payout Calculator
        </Link>{' '}
        — no signup or sensitive data needed.
      </>
    ),
  },
  {
    id: 'transfer',
    question: 'What\'s a Structured Settlement Transfer?',
    answer: 'It\'s the legal process of converting your future payments into a lump-sum cash payout — often used for urgent needs or financial flexibility.',
  },
  {
    id: 'timeline',
    question: 'How long does court approval take?',
    answer: 'On average, 30–45 days depending on your state. Our team handles all legal work to keep things smooth and compliant.',
  },
  {
    id: 'lawyer',
    question: 'Do I need to hire a lawyer?',
    answer: 'No — we take care of all the court filings and documents for you. It\'s fully managed and court-approved.',
  },
];

// Mini FAQ data (subset of common FAQs)
export const miniFAQData: FAQItem[] = commonFAQs.slice(0, 5);

// Court approval specific FAQs
export const courtApprovalFAQs: FAQItem[] = [
  {
    id: 'court-why',
    question: 'What is court approval and why is it required?',
    answer: 'Court approval protects your interests and ensures the sale is fair and legal. The judge reviews your case to confirm you understand the transaction and that it is in your best interest.',
    expanded: true,
  },
  {
    id: 'court-questions',
    question: 'What questions will the judge ask?',
    answer: 'Common questions include: Why are you selling? Do you understand the terms? Have you consulted an advisor? What will you do with the lump sum? Are you under any pressure to sell?',
  },
];

// Company selection FAQs
export const companySelectionFAQs: FAQItem[] = [
  {
    id: 'company-look',
    question: 'What should I look for in a structured settlement company?',
    answer: 'Look for licensing, experience, transparent offers, positive reviews, and strong customer support.',
    expanded: true,
  },
  {
    id: 'company-scams',
    question: 'How can I avoid scams or predatory companies?',
    answer: 'Avoid companies with unclear terms, high-pressure tactics, or poor reputations. Always compare offers and check credentials.',
  },
];

// Add more FAQ categories as needed... 