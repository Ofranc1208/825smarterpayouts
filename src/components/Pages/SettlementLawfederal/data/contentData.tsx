// Settlement Law Federal Content Data
// Following enterprise patterns from Home and CourtApproval pages

import { SettlementLawPageData, FederalLawData, CourtApprovalProcess, TaxImplication, LegalResource } from '../types';

export const federalLawsData: FederalLawData[] = [
  {
    id: 'periodic-payment-act-1982',
    title: 'Periodic Payment Settlement Act of 1982',
    description: 'Foundational federal law encouraging structured settlements for tort victims',
    year: 1982,
    sections: ['IRC § 104(a)(2)', 'IRC § 130'],
    keyProvisions: [
      'Excludes damages from gross income for personal physical injuries',
      'Allows qualified assignments of periodic payment obligations',
      'Provides tax benefits for both payees and qualified assignees',
      'Ensures structured settlement payments are tax-free to recipients'
    ],
    impact: 'Established the legal framework for tax-free structured settlements and promoted long-term financial security for injury victims.'
  },
  {
    id: 'structured-settlement-protection-act-2002',
    title: 'Structured Settlement Protection Act of 2002',
    description: 'Federal law requiring court approval for structured settlement transfers',
    year: 2002,
    sections: ['IRC § 5891'],
    keyProvisions: [
      'Requires court approval for any transfer of structured settlement payment rights',
      'Imposes 40% excise tax on transfers not approved by court',
      'Ensures transfers are in the "best interest" of the payee and dependents',
      'Mandates independent professional advice for payees'
    ],
    impact: 'Protects structured settlement recipients from predatory practices and ensures judicial oversight of all transfers.'
  },
  {
    id: 'victims-terrorism-tax-relief-act-2001',
    title: 'Victims of Terrorism Tax Relief Act of 2001',
    description: 'Enhanced protections for structured settlement holders affected by terrorism',
    year: 2001,
    sections: ['Multiple provisions'],
    keyProvisions: [
      'Strengthens court approval requirements',
      'Clarifies tax treatment of structured settlements',
      'Provides additional protections for terrorism victims',
      'Enhances oversight mechanisms'
    ],
    impact: 'Further strengthened protections and clarified tax treatment, especially for victims of terrorism and disasters.'
  }
];

export const courtProcessData: CourtApprovalProcess[] = [
  {
    step: 1,
    title: 'File Petition with Court',
    description: 'Submit a detailed petition outlining the terms of the proposed transfer to the appropriate state court.',
    requirements: [
      'Complete transfer petition form',
      'Detailed financial disclosure',
      'Proposed transfer terms',
      'Reason for transfer request'
    ],
    timeline: '1-2 weeks to prepare and file',
    icon: '📋'
  },
  {
    step: 2,
    title: 'Notify All Interested Parties',
    description: 'Provide formal notice to the original annuity issuer, dependents, and other stakeholders.',
    requirements: [
      'Certified mail to annuity issuer',
      'Notice to spouse and dependents',
      'Notice to assignee company',
      'Proof of service documentation'
    ],
    timeline: '2-3 weeks for proper service',
    icon: '📮'
  },
  {
    step: 3,
    title: 'Attend Court Hearing',
    description: 'Participate in a court hearing where a judge evaluates if the transfer serves the payee\'s best interests.',
    requirements: [
      'Personal appearance in court',
      'Financial documentation',
      'Independent professional advice certificate',
      'Testimony about financial needs'
    ],
    timeline: '30-60 days from filing',
    icon: '⚖️'
  },
  {
    step: 4,
    title: 'Obtain Court Order',
    description: 'Receive the judge\'s decision approving or denying the transfer request.',
    requirements: [
      'Judge\'s written order',
      'Compliance with all conditions',
      'Final transfer documentation',
      'Notification to all parties'
    ],
    timeline: '1-2 weeks after hearing',
    icon: '✅'
  }
];

export const taxImplicationsData: TaxImplication[] = [
  {
    category: 'Tax-Exempt Status',
    description: 'Structured settlement payments are generally tax-free to the recipient',
    code: 'IRC § 104(a)(2)',
    impact: 'positive',
    details: [
      'No federal income tax on periodic payments',
      'No state income tax in most jurisdictions',
      'Tax-free growth of invested funds',
      'Lifetime tax exemption for qualifying payments'
    ]
  },
  {
    category: 'Transfer Taxation',
    description: 'Selling payment rights may create taxable events and penalties',
    code: 'IRC § 5891',
    impact: 'negative',
    details: [
      '40% excise tax on unapproved transfers',
      'Lump sum may be subject to income tax',
      'Loss of future tax-free status',
      'Potential state tax implications'
    ]
  },
  {
    category: 'Qualified Assignments',
    description: 'Payments from qualified assignees maintain tax-free status',
    code: 'IRC § 130',
    impact: 'positive',
    details: [
      'Continued tax-free treatment',
      'No impact on recipient\'s tax status',
      'Maintained federal tax benefits',
      'Preserved state tax exemptions'
    ]
  }
];

export const legalResourcesData: LegalResource[] = [
  {
    id: 'usc-104',
    title: '26 U.S. Code § 104 - Compensation for injuries or sickness',
    type: 'statute',
    url: 'https://www.law.cornell.edu/uscode/text/26/104',
    description: 'Federal statute excluding personal injury settlements from gross income',
    relevance: 'high'
  },
  {
    id: 'usc-130',
    title: '26 U.S. Code § 130 - Certain personal injury liability assignments',
    type: 'statute',
    url: 'https://www.law.cornell.edu/uscode/text/26/130',
    description: 'Federal statute governing qualified assignment of structured settlements',
    relevance: 'high'
  },
  {
    id: 'usc-5891',
    title: '26 U.S. Code § 5891 - Structured settlement factoring transactions',
    type: 'statute',
    url: 'https://www.law.cornell.edu/uscode/text/26/5891',
    description: 'Federal statute imposing excise tax on unapproved transfers',
    relevance: 'high'
  },
  {
    id: 'periodic-payment-act',
    title: 'Periodic Payment Settlement Act of 1982 (Public Law 97-473)',
    type: 'statute',
    url: 'https://www.congress.gov/bill/97th-congress/house-bill/5470',
    description: 'Original federal legislation establishing structured settlement framework',
    relevance: 'high'
  },
  {
    id: 'victims-terrorism-act',
    title: 'Victims of Terrorism Tax Relief Act of 2001',
    type: 'statute',
    url: 'https://www.congress.gov/bill/107th-congress/house-bill/2884',
    description: 'Enhanced protections for structured settlement holders',
    relevance: 'medium'
  },
  {
    id: 'irs-publication-4345',
    title: 'IRS Publication 4345: Settlements – Taxability',
    type: 'guidance',
    url: 'https://www.irs.gov/pub/irs-pdf/p4345.pdf',
    description: 'Official IRS guidance on taxation of settlement proceeds',
    relevance: 'high'
  }
];

export const settlementLawPageData: SettlementLawPageData = {
  hero: {
    title: '⚖️ Structured Settlement Federal Law',
    subtitle: 'Legal Information',
    description: 'Understanding the key federal laws, tax rules, and court approval processes governing structured settlements in the United States.',
    ctaButtons: {
      primary: { text: '💰 Get Your Quote', href: '/mint-intelligent-chat' },
      secondary: { text: '💬 Chat with Mint AI', href: '/mint-intelligent-chat?chat=open&feature=calculator' }
    }
  },
  federalLaws: federalLawsData,
  courtProcess: courtProcessData,
  taxImplications: taxImplicationsData,
  resources: legalResourcesData,
  disclaimer: {
    title: '⚠️ Legal Disclaimer',
    content: 'The information provided on this page represents laws we have gathered for informational purposes only. Laws change frequently and interpretations may vary.',
    warning: 'Always consult with a qualified attorney specializing in structured settlements to ensure the accuracy and applicability of these laws to your specific situation. This information should not be considered legal advice.'
  }
};
