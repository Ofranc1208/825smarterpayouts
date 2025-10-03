/**
 * FAQ Data
 * All FAQ questions and answers for the Info Hub
 */

import type { FAQItem } from '../types';
import Link from 'next/link';
import React from 'react';

export const generalFAQs: FAQItem[] = [
  {
    question: "What is a structured settlement?",
    answer: "A structured settlement is a financial arrangement where you receive periodic payments over time, typically from a legal settlement. These payments are tax-free and court-approved, providing long-term financial security."
  },
  {
    question: "Can I sell my structured settlement?",
    answer: "Yes, you can sell your structured settlement. The process is legal and requires court approval to ensure it's in your best interest. Many people sell to access their money sooner for needs like medical bills, debt relief, or investments."
  },
  {
    question: "How do structured settlements work?",
    answer: "Structured settlements work by converting a large settlement into a series of guaranteed payments. These payments can be scheduled monthly, annually, or in other intervals, and are typically tax-free under federal law."
  }
];

export const sellingFAQs: FAQItem[] = [
  {
    question: "How do I sell my structured settlement?",
    answer: "To sell your structured settlement: 1) Get a quote using our calculator, 2) Review and accept the offer, 3) Complete the paperwork, 4) Attend a court hearing, 5) Receive your payment. The entire process typically takes 30-45 days."
  },
  {
    question: "How long does it take to sell a structured settlement?",
    answer: "The process typically takes 30-45 days from start to finish. This includes getting a quote, completing paperwork, court approval, and receiving your payment. Some cases can be completed faster depending on your state's requirements."
  },
  {
    question: "Do I need a lawyer to sell my structured settlement?",
    answer: "While you don't need a lawyer to start the process, it's recommended to consult with one. The court will appoint an independent advisor to review your case and ensure the sale is in your best interest."
  },
  {
    question: "How much can I get for my structured settlement?",
    answer: "The amount you receive depends on your payment schedule, remaining payments, and current market rates. Use our free calculator to get an instant quote for your specific settlement."
  }
];

export const legalFAQs: FAQItem[] = [
  {
    question: "Is it legal to sell my structured settlement?",
    answer: "Yes, it is legal in all 50 states, but court approval is required to protect your interests."
  },
  {
    question: "Do all states require court approval to sell a structured settlement?",
    answer: "Yes, all states require court approval, but the process and requirements vary. Some states have additional consumer protections or unique steps."
  },
  {
    question: "What documents are required for court approval?",
    answer: "Common documents include the settlement agreement, payment schedule, transfer petition, and financial disclosures. Some states require additional forms."
  }
];

export const financialFAQs: FAQItem[] = [
  {
    question: "Will I get the full value of my payments?",
    answer: "No, you will receive less than the total future value due to the time value of money and discount rates. However, you gain immediate access to a lump sum of cash."
  },
  {
    question: "Are there any fees?",
    answer: "There are no upfront fees. All costs are transparently disclosed in your quote and deducted from your final payment amount."
  },
  {
    question: "Will selling affect my taxes?",
    answer: "Generally, no. The tax-free status of your structured settlement payments typically remains when you sell. However, consult a tax professional for your specific situation."
  }
];

export const allFAQs: FAQItem[] = [
  ...generalFAQs,
  ...sellingFAQs,
  ...legalFAQs,
  ...financialFAQs
];

