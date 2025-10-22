// Settlement Law Federal Content Data
// Enhanced with comprehensive legal information and expandable disclaimer

import { SettlementLawPageData, FederalLawData, CourtApprovalProcess, TaxImplication, LegalResource, FAQItem, BestPractice, GovernmentResource } from '../types';

export const federalLawsData: FederalLawData[] = [
  {
    id: 'periodic-payment-act-1982',
    title: 'Periodic Payment Settlement Act of 1982',
    description: 'Foundational federal law that created tax-favored treatment for structured settlements from personal injury claims',
    year: 1982,
    publicLaw: 'Public Law 97-473',
    sections: ['IRC § 104(a)(2)', 'IRC § 130'],
    keyProvisions: [
      'Excludes periodic payments from personal injury/physical sickness claims from gross income',
      'Establishes "qualified assignments" allowing defendants to assign payment obligations to third parties',
      'Creates tax-free treatment for structured settlement payments',
      'Enables long-term financial planning through guaranteed periodic payments'
    ],
    impact: 'Made structured settlements financially viable by providing tax incentives and legal framework for secure payment arrangements.',
    whyItMatters: 'This law transformed how personal injury settlements work, making it possible for victims to receive tax-free income streams rather than taxable lump sums.',
    consumerTakeaway: 'If you receive structured settlement payments from a physical injury claim, ensure the settlement meets these federal criteria to maintain tax advantages.'
  },
  {
    id: 'structured-settlement-protection-act-2002',
    title: 'Structured Settlement Protection Act (Federal Tax Framework)',
    description: 'Federal excise tax provisions requiring court approval for structured settlement payment transfers',
    year: 2002,
    sections: ['IRC § 5891'],
    publicLaw: 'Victims of Terrorism Tax Relief Act of 2001 (Public Law 107-134)',
    keyProvisions: [
      'Imposes 40% excise tax on "factoring transactions" not approved by court',
      'Defines "qualified order" requirements for tax-free transfers',
      'Requires court findings that transfers are in payee\'s "best interest"',
      'Mandates disclosure, independent advice, and procedural protections'
    ],
    impact: 'Provides federal "safety net" over the secondary market for structured settlement payment rights, preventing exploitative transfers.',
    whyItMatters: 'This is the federal enforcement mechanism ensuring structured settlement transfers aren\'t predatory and maintain tax-free status.',
    consumerTakeaway: 'Before selling structured settlement payments, ensure compliance with IRC §5891 and state transfer statutes to avoid 40% excise tax and loss of tax-free status.'
  },
  {
    id: 'victims-terrorism-tax-relief-act-2001',
    title: 'Victims of Terrorism Tax Relief Act of 2001',
    description: 'Federal law that added IRC §5891 excise tax provisions and enhanced structured settlement transfer protections',
    year: 2001,
    sections: ['IRC § 5891', 'IRC § 104(a)(2) amendments'],
    publicLaw: 'Public Law 107-134',
    keyProvisions: [
      'Created IRC §5891 imposing 40% excise tax on unapproved structured settlement transfers',
      'Defined "qualified order" requirements for court-approved transfers',
      'Established federal oversight of state transfer statutes',
      'Required independent professional advice and best interest findings',
      'Provided tax relief for terrorism victims with structured settlements'
    ],
    impact: 'Created the federal tax enforcement mechanism that protects structured settlement recipients from predatory factoring companies by requiring court approval for all transfers.',
    whyItMatters: 'This law is the primary federal protection against exploitative "cash now" companies. Without proper court approval under state law, transfers face a devastating 40% federal excise tax.',
    consumerTakeaway: 'Never sell structured settlement payments without court approval under your state\'s transfer statute - violations trigger 40% federal excise tax and may void the transaction entirely.'
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
    category: 'Tax-Free Treatment of Settlement Payments',
    description: 'Periodic payments from personal injury settlements are generally tax-free',
    code: 'IRC § 104(a)(2) & § 130',
    impact: 'positive',
    details: [
      'Excludes payments from gross income for physical injury/sickness claims',
      'Tax-free growth of annuity investments',
      'Maintains tax-free status through qualified assignments',
      'Preserves public benefit eligibility'
    ]
  },
  {
    category: 'Transfer Taxation & Penalties',
    description: 'Selling payment rights may trigger taxes and 40% excise tax penalty',
    code: 'IRC § 5891',
    impact: 'negative',
    details: [
      '40% excise tax on unapproved factoring transactions',
      'Lump sum proceeds may be taxable income',
      'Loss of future tax-free payment status',
      'Federal and potential state tax consequences'
    ]
  },
  {
    category: 'Qualified Assignment Benefits',
    description: 'Properly structured assignments maintain tax advantages',
    code: 'IRC § 130',
    impact: 'positive',
    details: [
      'Continued tax-free treatment for payments',
      'Separation of funding assets from liability',
      'Enhanced security through annuity backing',
      'Long-term financial planning advantages'
    ]
  }
];

export const practicalApplicationsData = {
  taxFreeTreatment: {
    title: 'Tax-Free Treatment of Settlement Payments',
    description: 'Understanding how IRC §104(a)(2) and IRC §130 work in practice',
    details: [
      'Periodic payments must be "fixed and determinable as to amount and time"',
      'Cannot be accelerated or increased to maintain tax-free status',
      'Qualified assignments separate funding from liability for security',
      'Recipients maintain public benefit eligibility with structured payments'
    ]
  },
  transfersAndSales: {
    title: 'Transfers and Sales of Payment Rights',
    description: 'The regulated process for selling structured settlement payments',
    details: [
      'Must comply with both federal (IRC §5891) and state transfer statutes',
      'Requires court approval finding transfer is in "best interest"',
      'Independent professional advice (legal/tax/financial) is mandatory',
      'All 50 states + DC have compliant transfer statutes'
    ]
  },
  courtApproval: {
    title: 'Court Approval and State Statute Interface',
    description: 'How federal and state laws work together',
    details: [
      'Federal law sets tax framework and 40% excise tax penalty',
      'State laws implement procedural protections and court approval',
      'State statutes must meet federal criteria for tax exemption',
      'Court must make specific findings about payee\'s best interest'
    ]
  }
};

export const faqData: FAQItem[] = [
  {
    id: 'tax-free-payments',
    question: 'Are structured settlement payments always tax-free?',
    answer: 'Generally yes if the settlement meets IRC §104(a)(2) and §130 requirements (physical injury, fixed payment stream, etc). If payments are transferred without proper approval or accelerated, tax status may change.',
    category: 'taxation'
  },
  {
    id: 'selling-payments',
    question: 'What happens if I sell my structured settlement payments?',
    answer: 'If the sale is not approved by a court under applicable state statute (thus failing IRC §5891 "qualified order" requirements), the purchaser risks 40% excise tax, and you may lose tax-free status of future payments.',
    category: 'transfers'
  },
  {
    id: 'qualified-assignment',
    question: 'What is a "qualified assignment"?',
    answer: 'Under IRC §130, a defendant/insurer may assign payment obligations to a third-party "qualified assignment company". This ensures payments are funded by secure assets (like annuities) and removes liability from the defendant\'s books.',
    category: 'legal'
  },
  {
    id: 'state-vs-federal',
    question: 'Do state laws matter if federal law covers structured settlements?',
    answer: 'Yes. Federal law sets tax treatment and excise tax rules; state laws implement procedural protections for transfers and enforce court-approval mechanisms. Both are essential.',
    category: 'legal'
  },
  {
    id: 'transfer-checklist',
    question: 'What should I check before agreeing to transfer (sell) my payment rights?',
    answer: 'Confirm your state has compliant transfer statute, ensure court order approval, receive independent professional advice, understand discount and tax consequences, and retain documentation of all approvals.',
    category: 'transfers'
  }
];

export const governmentResourcesData: GovernmentResource[] = [
  {
    id: 'irs-publication-4345',
    title: 'IRS Publication 4345: Settlements – Taxability',
    description: 'Official IRS guidance on taxation of settlement payments and structured settlements',
    url: 'https://www.irs.gov/pub/irs-pdf/p4345.pdf',
    type: 'guidance',
    relevance: 'critical'
  },
  {
    id: 'irc-104',
    title: '26 U.S. Code § 104 - Compensation for injuries or sickness',
    description: 'Federal statute excluding personal injury settlements from gross income',
    url: 'https://www.law.cornell.edu/uscode/text/26/104',
    type: 'statute',
    relevance: 'critical'
  },
  {
    id: 'irc-130',
    title: '26 U.S. Code § 130 - Qualified assignments',
    description: 'Federal statute governing assignment of structured settlement payment obligations',
    url: 'https://www.law.cornell.edu/uscode/text/26/130',
    type: 'statute',
    relevance: 'critical'
  },
  {
    id: 'irc-5891',
    title: '26 U.S. Code § 5891 - Structured settlement factoring transactions',
    description: 'Federal statute imposing 40% excise tax on unapproved transfers',
    url: 'https://www.law.cornell.edu/uscode/text/26/5891',
    type: 'statute',
    relevance: 'critical'
  },
  {
    id: 'cfr-157',
    title: '26 CFR Part 157 - Excise Tax on Structured Settlement Factoring Transactions',
    description: 'Federal regulations implementing IRC §5891 excise tax provisions',
    url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-F/part-157',
    type: 'regulation',
    relevance: 'critical'
  },
  {
    id: 'ncoil-model-act',
    title: 'NCOIL Model Structured Settlement Protection Act',
    description: 'Model state legislation providing template for structured settlement transfer protections',
    url: 'https://www.ncoil.org/wp-content/uploads/2019/10/Structured-Settlement-Protection-Act.pdf',
    type: 'model-law',
    relevance: 'high'
  },
  {
    id: 'treasury-regulations',
    title: 'Treasury Regulations § 1.104-1 - Compensation for injuries or sickness',
    description: 'Treasury regulations interpreting IRC §104 exclusions for structured settlements',
    url: 'https://www.law.cornell.edu/cfr/text/26/1.104-1',
    type: 'regulation',
    relevance: 'high'
  },
  {
    id: 'doj-structured-settlements',
    title: 'U.S. Department of Justice: Structured Settlement Resources',
    description: 'DOJ guidance on structured settlements in federal litigation and victim compensation',
    url: 'https://www.justice.gov/civil/structured-settlements',
    type: 'guidance',
    relevance: 'medium'
  }
];

export const bestPracticesData: BestPractice[] = [
  {
    id: 'verify-structure',
    title: 'Verify Proper Settlement Structure',
    description: 'Confirm your structured settlement was correctly established with qualified assignment to maintain tax-free status.',
    category: 'setup',
    priority: 'high'
  },
  {
    id: 'independent-advice',
    title: 'Seek Independent Professional Advice',
    description: 'Before any transfer decision, consult neutral attorney, CPA, and financial advisor experienced in structured settlements.',
    category: 'transfers',
    priority: 'critical'
  },
  {
    id: 'understand-discount',
    title: 'Understand the Discount and Costs',
    description: 'Calculate the discounted present value, fees, and effective interest rate. Know exactly what you\'re giving up versus receiving.',
    category: 'transfers',
    priority: 'high'
  },
  {
    id: 'court-approval',
    title: 'Ensure Proper Court Approval',
    description: 'Verify court makes required findings: transfer in your best interest, proper disclosure, independent advice received.',
    category: 'transfers',
    priority: 'critical'
  },
  {
    id: 'retain-documentation',
    title: 'Maintain Complete Records',
    description: 'Keep copies of all settlement documents, court orders, disclosures, and professional advice certificates.',
    category: 'records',
    priority: 'medium'
  },
  {
    id: 'avoid-pressure',
    title: 'Avoid High-Pressure Sales',
    description: 'Be cautious of unsolicited offers, "get cash now" promises, or pressure tactics. Take time to evaluate thoroughly.',
    category: 'transfers',
    priority: 'high'
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

export const introductionData = {
  title: 'Understanding Structured Settlements and Federal Law',
  description: 'A structured settlement is an arrangement where a person resolves a personal-injury or workers\'-compensation claim and receives part or all of the compensation in periodic payments rather than a single lump sum. Federal laws govern how these settlements are treated — especially for tax purposes, for assignment or transfer of payment rights, and for consumer protection when payments are sold.',
  keyPoints: [
    'Federal laws provide the underlying legal framework for structured settlements',
    'State laws (especially for transfers) play a crucial supporting role',
    'Tax treatment, court approval processes, and consumer protections are federally regulated',
    'Understanding both federal and state requirements is essential for proper compliance'
  ]
};

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
  introduction: introductionData,
  federalLaws: federalLawsData,
  practicalApplications: practicalApplicationsData,
  faq: faqData,
  governmentResources: governmentResourcesData,
  bestPractices: bestPracticesData,
  courtProcess: courtProcessData,
  taxImplications: taxImplicationsData,
  resources: legalResourcesData,
  disclaimer: {
    title: 'Legal Disclaimer',
    content: 'The information provided on this page represents laws we have gathered for informational purposes only. Laws change frequently and interpretations may vary.',
    warning: 'Always consult with a qualified attorney specializing in structured settlements to ensure the accuracy and applicability of these laws to your specific situation. This information should not be considered legal advice.',
    isExpandable: true,
    shortText: 'Important legal information - click to read full disclaimer'
  }
};
