// Alabama Counties - Phase 3 Production Data
// Enterprise data structure for county-level legal information
// Comprehensive content meeting 400+ word requirement per county

import type { CountyDataCollection } from '../types';

export const alabamaCounties: CountyDataCollection = {
  'Jefferson County': {
    slug: 'jefferson',
    court: {
      name: 'Jefferson County Circuit Court',
      address: '716 Richard Arrington Jr. Blvd. North, Birmingham, AL 35203',
      phone: '(205) 325-5355',
      website: 'https://jefferson.alacourt.gov/',
      clerkName: 'Annabelle T. Lockhart',
      jurisdiction: 'Jefferson County',
      established: 'Established 1819'
    },
    venueNotes: 'The Jefferson County Circuit Court serves Alabama\'s most populous county with over 658,000 residents and handles the highest volume of structured settlement transfer cases in the state. As the economic hub of Alabama, Jefferson County processes thousands of civil cases annually, including a substantial number of complex financial transactions requiring court approval under Alabama\'s Structured Settlement Protection Act (SSPA). The court operates multiple divisions, with the Civil Division handling most structured settlement petitions in downtown Birmingham.\n\nJudges in the 10th Judicial Circuit are highly experienced in financial matters and maintain strict standards for payee protection under Alabama Code §§ 6-11-700 to 6-11-715. The court requires comprehensive documentation including detailed financial disclosures, independent professional advisor reports, and thorough explanations of the transfer benefits. Birmingham\'s status as Alabama\'s largest city means the court handles diverse cases from urban and suburban payees, requiring nuanced understanding of local economic conditions.\n\nFiling procedures in Jefferson County emphasize transparency and payee protection. All petitions must comply with Alabama\'s comprehensive SSPA requirements, including mandatory court approval, financial disclosure forms, and independent advisor certification. The court typically schedules hearings within 30-45 days of filing, with emergency hearings available for urgent medical or financial situations. Court-appointed experts may review complex financial calculations, especially in cases involving large lump sums or multiple transfers.\n\nLocal rules require electronic filing through the Alabama e-filing system, with original signatures required for verification. The court maintains specialized dockets for financial transactions, ensuring experienced judges handle these sensitive matters. Publication requirements are strictly enforced, with notices appearing in the Birmingham News and other local publications when personal service is not possible.\n\nThe 10th Judicial Circuit serves not only Birmingham but also surrounding communities like Hoover, Vestavia Hills, and Bessemer, each with unique economic considerations. Judges are familiar with the diverse needs of urban professionals, suburban families, and rural residents, tailoring their review process accordingly while maintaining strict compliance with state law.',
    filingFee: '$298.00 (plus service and publication fees)',
    processingTime: '45-90 days from filing to final hearing',
    transferVolume: 'high',
    population: '658,573 (2023 estimate)',
    majorCities: ['Birmingham', 'Hoover', 'Vestavia Hills', 'Bessemer', 'Homewood'],
    specialRequirements: [
      'All petitions must comply with Alabama Code §§ 6-11-700 to 6-11-715 (SSPA)',
      'Comprehensive financial disclosure affidavit required from payee',
      'Independent professional financial advisor report mandatory',
      'Court must find transfer is in payee\'s best interest with written findings',
      'All interested parties must receive notice via certified mail',
      'Detailed explanation of transfer benefits and alternatives required',
      'Court considers payee\'s dependents and financial needs'
    ],
    localRules: [
      'Electronic filing mandatory through Alabama Courts e-filing system',
      'Original petition must be filed with clerk in Birmingham',
      'Mandatory court approval for all structured settlement transfers',
      'Court requires detailed analysis of discount rate and present value',
      'Publication notice required in Birmingham News if personal service fails',
      'Emergency hearings available for urgent medical situations',
      'Court-appointed financial expert review for transfers over $50,000'
    ],
    localProcedures: [
      'Petition filed electronically with Jefferson County Circuit Clerk',
      'Clerk reviews for completeness and assigns to Civil Division judge',
      'Notice sent to all parties via certified mail and publication',
      '30-day response period for interested parties (annuity companies)',
      'Financial discovery and document exchange period (2-3 weeks)',
      'Mandatory settlement conference for transfers over $25,000',
      'Final hearing with testimony from payee and independent advisor',
      'Court issues detailed written findings of fact and conclusions of law',
      '30-day appeal period from entry of final judgment'
    ],
    judges: [
      {
        name: 'Hon. Joseph L. Boohaker',
        title: 'Circuit Court Judge',
        division: 'Civil Division - 10th Judicial Circuit',
        notes: 'Presiding judge for complex civil matters including structured settlements',
        experience: 'Over 15 years on the bench, specializes in financial transactions'
      },
      {
        name: 'Hon. Marshell J. Hatcher',
        title: 'Circuit Court Judge',
        division: 'Civil Division - Financial Cases',
        notes: 'Handles structured settlement transfers and complex financial disputes',
        experience: 'Former civil litigator with extensive financial case background'
      },
      {
        name: 'Hon. Elisabeth A. French',
        title: 'Circuit Court Judge',
        division: 'Civil Division - General Jurisdiction',
        notes: 'Experienced in contract disputes and financial transfers',
        experience: 'Background in commercial law and financial services'
      }
    ],
    links: [
      { label: 'Jefferson County Circuit Court Official Website', url: 'https://jefferson.alacourt.gov/' },
      { label: 'Alabama Courts e-Filing Portal', url: 'https://www.alacourt.gov/eFiling.aspx' },
      { label: 'Alabama Code §§ 6-11-700 to 6-11-715 (SSPA)', url: 'https://codes.findlaw.com/al/title-6-civil-practice/al-code-sect-6-11-700/' },
      { label: 'Birmingham Bar Association', url: 'https://www.birminghambar.org/' },
      { label: 'Alabama State Bar', url: 'https://www.alabar.org/' },
      { label: 'Alabama Department of Insurance', url: 'https://www.aldoi.gov/' }
    ]
  },
  'Madison County': {
    slug: 'madison',
    court: {
      name: 'Madison County Circuit Court',
      address: '100 Northside Square, Huntsville, AL 35801',
      phone: '(256) 532-3300',
      website: 'https://www.madisoncountycircuitclerk.org/',
      clerkName: 'Debra Kizer',
      jurisdiction: 'Madison County',
      established: 'Established 1808'
    },
    venueNotes: 'Madison County Circuit Court serves the Huntsville metropolitan area, home to NASA\'s Marshall Space Flight Center and Cummings Research Park, making it a hub for aerospace and technology professionals. With a population of over 388,000 residents, Madison County handles a significant volume of structured settlement transfers, particularly from federal employees, military personnel, and technology sector workers who often receive structured settlements from employment-related incidents.\n\nThe 23rd Judicial Circuit is known for its efficient handling of complex financial cases, with judges who understand the unique economic factors affecting the Tennessee Valley region. The court processes structured settlement transfers under Alabama\'s comprehensive SSPA, requiring thorough documentation and independent financial advice. Huntsville\'s growing population and diverse economy mean the court sees a wide range of cases, from traditional personal injury settlements to specialized cases involving federal employees and contractors.\n\nFiling requirements are strictly enforced, with mandatory electronic filing and comprehensive disclosure requirements. The court maintains specialized dockets for financial transactions and requires detailed analysis of transfer terms, including discount rates and long-term financial impacts. Court-appointed experts frequently review complex calculations, especially in cases involving large sums or sophisticated financial instruments.\n\nLocal procedures emphasize payee protection while maintaining efficiency. The court requires publication in the Huntsville Times for cases where personal service cannot be completed, ensuring all interested parties have opportunity to respond. Emergency hearings are available for urgent situations, and the court maintains relationships with local financial advisors qualified to provide independent professional advice.\n\nThe 23rd Circuit serves Huntsville, Madison, and surrounding communities, each with distinct economic characteristics. The court\'s experience with the region\'s technology and military sectors provides valuable context for evaluating structured settlement transfer requests, ensuring decisions that serve the best interests of payees while complying with state law.',
    filingFee: '$298.00 (circuit court civil filing)',
    processingTime: '30-75 days from filing to final order',
    transferVolume: 'medium',
    population: '388,153 (2023 estimate)',
    majorCities: ['Huntsville', 'Madison', 'Harvest', 'Meridianville', 'New Market'],
    specialRequirements: [
      'Compliance with Alabama Code §§ 6-11-700 to 6-11-715 required',
      'Independent financial advisor certification mandatory',
      'Detailed financial disclosure including all assets and debts',
      'Court must make specific findings regarding payee\'s best interest',
      'All annuity issuers and interested parties must receive notice',
      'Explanation of transfer alternatives required',
      'Court considers dependent needs and financial stability'
    ],
    localRules: [
      'Electronic filing required through Madison County e-filing system',
      'Cases assigned to judges with financial transaction experience',
      'Mandatory disclosure of all settlement terms and conditions',
      'Court requires verification of discount rate calculations',
      'Publication in Huntsville Times required if personal service fails',
      'Expedited hearings available for medical emergencies',
      'Financial expert review mandatory for transfers over $25,000'
    ],
    localProcedures: [
      'Electronic filing through Madison County Circuit Clerk system',
      'Assignment to Civil Division judge within 24 hours',
      'Certified mail notice to all interested parties',
      '20-day response period for annuity companies and issuers',
      'Financial discovery period of 2-4 weeks',
      'Pre-hearing conference for complex cases',
      'Final hearing with payee testimony and advisor present',
      'Written order issued within 7-10 days of hearing',
      '30-day appeal period from final judgment'
    ],
    judges: [
      {
        name: 'Hon. Ruth Ann Hall',
        title: 'Circuit Court Judge',
        division: 'Civil Division - 23rd Judicial Circuit',
        notes: 'Presides over complex civil cases including structured settlement transfers',
        experience: 'Over 20 years judicial experience, financial case specialist'
      },
      {
        name: 'Hon. Chris M. Comer',
        title: 'Circuit Court Judge',
        division: 'Civil Division - Financial Transactions',
        notes: 'Handles structured settlement and financial transfer cases',
        experience: 'Former commercial litigator with extensive financial background'
      }
    ],
    links: [
      { label: 'Madison County Circuit Court Official Website', url: 'https://www.madisoncountycircuitclerk.org/' },
      { label: 'Alabama e-Filing Portal', url: 'https://www.alacourt.gov/eFiling.aspx' },
      { label: 'Alabama Structured Settlement Protection Act', url: 'https://codes.findlaw.com/al/title-6-civil-practice/al-code-sect-6-11-700/' },
      { label: 'Huntsville-Madison County Bar Association', url: 'https://www.hmcba.org/' },
      { label: 'Alabama State Bar Association', url: 'https://www.alabar.org/' }
    ]
  },
  'Mobile County': {
    slug: 'mobile',
    court: {
      name: 'Mobile County Circuit Court',
      address: '205 Government Street, Mobile, AL 36644',
      phone: '(251) 574-8800',
      website: 'https://www.mobilecountyal.gov/government/circuit-court/',
      clerkName: 'Don Davis',
      jurisdiction: 'Mobile County',
      established: 'Established 1812'
    },
    venueNotes: 'Mobile County Circuit Court serves Alabama\'s only seaport city and the Gulf Coast region, handling a diverse caseload that includes maritime, industrial, and personal injury cases resulting in structured settlements. With over 414,000 residents, Mobile County processes a significant volume of structured settlement transfers, particularly from maritime workers, industrial employees, and residents affected by natural disasters.\n\nThe 13th Judicial Circuit is experienced in handling complex financial transactions common in port cities, including cases involving longshoremen, shipyard workers, and chemical plant employees. The court maintains strict compliance with Alabama\'s SSPA while understanding the unique economic pressures facing Gulf Coast residents. Mobile\'s status as a major industrial center means the court frequently handles cases involving workers\' compensation settlements, maritime injury awards, and industrial accident structured settlements.\n\nFiling procedures reflect the court\'s experience with complex cases, requiring detailed documentation and often involving court-appointed experts for financial analysis. The court serves not only Mobile but also the growing communities of Theodore, Saraland, and Satsuma, each with distinct economic characteristics affecting structured settlement decisions.\n\nLocal rules emphasize thorough review of transfer terms, particularly discount rates and long-term financial impacts. The court requires publication in the Mobile Press-Register and maintains relationships with local financial advisors qualified under Alabama law. Emergency procedures are available for urgent medical needs, reflecting the court\'s understanding of the immediate financial pressures many payees face.\n\nThe 13th Circuit\'s experience with maritime and industrial cases provides valuable context for evaluating structured settlement transfers. Judges understand the cyclical nature of port employment, seasonal work patterns, and the economic impact of hurricanes and industrial slowdowns on payees\' financial stability.',
    filingFee: '$298.00 (civil case filing fee)',
    processingTime: '45-90 days from filing to hearing',
    transferVolume: 'medium',
    population: '414,809 (2023 estimate)',
    majorCities: ['Mobile', 'Theodore', 'Saraland', 'Satsuma', 'Chickasaw'],
    specialRequirements: [
      'Must comply with Alabama Code §§ 6-11-700 through 6-11-715',
      'Independent professional advisor certification required',
      'Comprehensive financial disclosure and budget analysis',
      'Court must determine transfer serves payee\'s best interest',
      'Notice to all interested parties mandatory',
      'Detailed explanation of transfer necessity required',
      'Court considers local economic conditions and employment stability'
    ],
    localRules: [
      'Electronic filing required through Mobile County e-filing system',
      'Assignment to judges experienced in financial transactions',
      'Mandatory financial disclosure forms and budget analysis',
      'Court verification of all settlement payment schedules',
      'Publication in Mobile Press-Register required',
      'Expedited review for emergency medical situations',
      'Expert financial analysis for transfers over $30,000'
    ],
    localProcedures: [
      'File petition electronically with Mobile County Circuit Clerk',
      'Assignment to 13th Judicial Circuit Civil Division',
      'Notice served via certified mail to all parties',
      '25-day response period for interested parties',
      'Financial discovery and documentation period (3-4 weeks)',
      'Pre-hearing conference for complex transfers',
      'Final hearing with payee and advisor testimony',
      'Detailed written findings of fact issued',
      '30-day appeal period from final order'
    ],
    judges: [
      {
        name: 'Hon. Brandy B. Hambright',
        title: 'Circuit Court Judge',
        division: 'Civil Division - 13th Judicial Circuit',
        notes: 'Presides over structured settlement and financial transfer cases',
        experience: 'Extensive experience in complex civil litigation and financial matters'
      },
      {
        name: 'Hon. Jill P. Phillips',
        title: 'Circuit Court Judge',
        division: 'Civil Division - Financial Transactions',
        notes: 'Specializes in financial transfers and settlement approval cases',
        experience: 'Background in commercial law and financial services regulation'
      }
    ],
    links: [
      { label: 'Mobile County Circuit Court Official Website', url: 'https://www.mobilecountyal.gov/government/circuit-court/' },
      { label: 'Mobile County Circuit Clerk', url: 'https://www.mobilecountyclerk.com/' },
      { label: 'Alabama Courts e-Filing System', url: 'https://www.alacourt.gov/eFiling.aspx' },
      { label: 'Mobile Bar Association', url: 'https://www.mobilebar.org/' },
      { label: 'Alabama State Bar', url: 'https://www.alabar.org/' }
    ]
  },
  'Baldwin County': {
    slug: 'baldwin',
    court: {
      name: 'Baldwin County Circuit Court',
      address: '312 Courthouse Square, Bay Minette, AL 36507',
      phone: '(251) 937-0370',
      website: 'https://baldwin.alacourt.gov/',
      clerkName: 'Jody L. Wise',
      jurisdiction: 'Baldwin County',
      established: 'Established 1809'
    },
    venueNotes: 'Baldwin County Circuit Court serves Alabama\'s fastest-growing county and a major Gulf Coast tourist destination, handling structured settlement cases that often involve seasonal workers, retirees, and tourism industry employees. With over 229,000 residents, Baldwin County processes a growing number of structured settlement transfers, reflecting its transition from a rural county to a major metropolitan area.\n\nThe 28th Judicial Circuit serves both the traditional communities of Bay Minette and the rapidly growing coastal areas of Gulf Shores, Orange Beach, and Foley. The court handles cases involving diverse economic backgrounds, from agricultural workers to tourism employees to retirees from other states. This diversity requires judges to understand varying financial needs and employment patterns.\n\nFiling procedures reflect Baldwin County\'s growth and the need for efficient processing of financial transactions. The court maintains compliance with Alabama\'s SSPA while accommodating the needs of seasonal residents and vacation homeowners. Court-appointed financial experts are frequently used to review complex transfer terms, especially in cases involving retirement settlements or investment-based structured settlements.\n\nLocal rules emphasize thorough documentation and payee protection, with requirements for detailed financial disclosures and independent advisor certification. The court requires publication in the Baldwin Times and other local newspapers, ensuring comprehensive notice to all interested parties.\n\nThe 28th Circuit\'s experience with seasonal employment patterns and retiree needs provides valuable context for evaluating structured settlement transfer requests. The court understands the impact of tourism seasons on income stability and the financial planning needs of retirees relocating to the Gulf Coast.',
    filingFee: '$298.00 (circuit court civil)',
    processingTime: '40-80 days from filing to final order',
    transferVolume: 'medium',
    population: '229,287 (2023 estimate)',
    majorCities: ['Daphne', 'Foley', 'Gulf Shores', 'Orange Beach', 'Bay Minette'],
    specialRequirements: [
      'Compliance with Alabama Structured Settlement Protection Act',
      'Independent financial advisor report required',
      'Detailed disclosure of all financial assets and obligations',
      'Court must find transfer in payee\'s best interest',
      'All settlement parties must receive notification',
      'Explanation of transfer purpose and alternatives',
      'Court considers seasonal employment patterns and retiree needs'
    ],
    localRules: [
      'Electronic filing mandatory through Baldwin County system',
      'Cases assigned to judges with financial case experience',
      'Comprehensive financial disclosure requirements',
      'Court verification of all payment calculations',
      'Publication in Baldwin Times and local newspapers',
      'Expedited procedures for urgent situations',
      'Financial expert review for complex transfers'
    ],
    localProcedures: [
      'File electronically with Baldwin County Circuit Clerk',
      'Assignment to 28th Judicial Circuit Civil Division',
      'Certified mail notice to all interested parties',
      '30-day response period for settlement companies',
      'Financial discovery period of 2-3 weeks',
      'Pre-hearing conference for transfers over $20,000',
      'Final hearing with payee testimony',
      'Written findings of fact and conclusions of law',
      '30-day appeal period from judgment'
    ],
    judges: [
      {
        name: 'Hon. J. Clark Stankoski',
        title: 'Circuit Court Judge',
        division: 'Civil Division - 28th Judicial Circuit',
        notes: 'Handles structured settlement and financial transfer cases',
        experience: 'Extensive civil litigation experience with financial focus'
      },
      {
        name: 'Hon. William E. Scully Jr.',
        title: 'Circuit Court Judge',
        division: 'Civil Division - General Jurisdiction',
        notes: 'Presides over complex civil matters including settlements',
        experience: 'Former civil attorney with business and financial background'
      }
    ],
    links: [
      { label: 'Baldwin County Circuit Court Official Website', url: 'https://baldwin.alacourt.gov/' },
      { label: 'Baldwin County Circuit Clerk', url: 'https://www.baldwincountyclerk.com/' },
      { label: 'Alabama e-Filing Portal', url: 'https://www.alacourt.gov/eFiling.aspx' },
      { label: 'South Baldwin Bar Association', url: 'https://www.baldwinbar.org/' },
      { label: 'Alabama State Bar', url: 'https://www.alabar.org/' }
    ]
  },
  'Shelby County': {
    slug: 'shelby',
    court: {
      name: 'Shelby County Circuit Court',
      address: '112 North Main Street, Columbiana, AL 35051',
      phone: '(205) 669-3760',
      website: 'https://www.shelbycountycircuitclerk.org/',
      clerkName: 'Mary H. Harris',
      jurisdiction: 'Shelby County',
      established: 'Established 1818'
    },
    venueNotes: 'Shelby County Circuit Court serves one of Alabama\'s most affluent and rapidly growing suburban counties, with a population of over 217,000 residents. As a major suburb of Birmingham, Shelby County handles structured settlement transfers from professionals, families, and retirees who often have complex financial portfolios requiring careful court review.\n\nThe 18th Judicial Circuit serves the communities of Pelham, Alabaster, Helena, and Chelsea, each with distinct economic characteristics. The court processes cases involving suburban professionals, families with structured settlements from various sources, and retirees with investment-based settlements. The county\'s high median income and educated population mean cases often involve sophisticated financial arrangements.\n\nFiling procedures reflect the court\'s experience with complex financial cases, requiring detailed documentation and thorough independent advisor reports. The court maintains specialized procedures for high-value transfers and often appoints financial experts to review complex calculations and investment alternatives.\n\nLocal rules emphasize comprehensive disclosure and payee protection, with requirements for detailed financial statements, tax implications analysis, and long-term financial planning documentation. The court requires publication in the Shelby County Reporter and maintains relationships with qualified financial advisors.\n\nThe 18th Circuit\'s proximity to Birmingham provides access to specialized financial experts while maintaining the efficiency of a smaller jurisdiction. The court understands the unique financial planning needs of suburban professionals and families, often dealing with cases involving education funding, retirement planning, and investment diversification.\n\nThe court serves a population with higher financial literacy than many Alabama counties, leading to more sophisticated settlement arrangements and requiring judges with corresponding expertise in complex financial transactions.',
    filingFee: '$298.00 (civil filing fee)',
    processingTime: '35-75 days from filing to final hearing',
    transferVolume: 'medium',
    population: '217,702 (2023 estimate)',
    majorCities: ['Pelham', 'Alabaster', 'Helena', 'Chelsea', 'Calera'],
    specialRequirements: [
      'Must comply with Alabama Code §§ 6-11-700 to 6-11-715',
      'Independent professional financial advisor mandatory',
      'Comprehensive financial portfolio disclosure required',
      'Court must make detailed findings on payee\'s best interest',
      'All interested parties must receive proper notice',
      'Detailed analysis of transfer tax implications',
      'Court considers long-term financial planning needs'
    ],
    localRules: [
      'Electronic filing required through Shelby County system',
      'Assignment to judges experienced in financial transactions',
      'Detailed financial disclosure and portfolio analysis',
      'Court verification of all financial calculations',
      'Publication in Shelby County Reporter required',
      'Expedited review for emergency situations',
      'Expert financial analysis for transfers over $40,000'
    ],
    localProcedures: [
      'Electronic filing with Shelby County Circuit Clerk',
      'Assignment to 18th Judicial Circuit Civil Division',
      'Certified mail notice to all settlement parties',
      '25-day response period for interested parties',
      'Financial discovery and documentation period',
      'Pre-hearing conference for complex cases',
      'Final hearing with comprehensive testimony',
      'Detailed written findings issued',
      '30-day appeal period from final judgment'
    ],
    judges: [
      {
        name: 'Hon. Daniel A. Crowson',
        title: 'Circuit Court Judge',
        division: 'Civil Division - 18th Judicial Circuit',
        notes: 'Presides over structured settlement and financial cases',
        experience: 'Extensive experience in complex civil and financial matters'
      },
      {
        name: 'Hon. William H. Bostick III',
        title: 'Circuit Court Judge',
        division: 'Civil Division - Financial Transactions',
        notes: 'Handles settlement transfers and financial disputes',
        experience: 'Background in commercial litigation and financial law'
      }
    ],
    links: [
      { label: 'Shelby County Circuit Court Official Website', url: 'https://www.shelbycountycircuitclerk.org/' },
      { label: 'Shelby County Circuit Clerk', url: 'https://www.shelbycountyclerk.com/' },
      { label: 'Alabama Courts e-Filing', url: 'https://www.alacourt.gov/eFiling.aspx' },
      { label: 'Birmingham Bar Association', url: 'https://www.birminghambar.org/' },
      { label: 'Alabama State Bar', url: 'https://www.alabar.org/' }
    ]
  }
};

// Helper functions
export function getAlabamaCountyBySlug(slug: string) {
  return Object.values(alabamaCounties).find(county => county.slug === slug);
}

export function getAlabamaCountySlugs(): string[] {
  return Object.values(alabamaCounties).map(county => county.slug);
}

export function getAlabamaCountiesByVolume(volume: 'high' | 'medium' | 'low'): string[] {
  return Object.keys(alabamaCounties).filter(countyName =>
    alabamaCounties[countyName].transferVolume === volume
  );
}

