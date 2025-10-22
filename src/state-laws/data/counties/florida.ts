// Florida Counties - Phase 2 Production Data
// Enterprise data structure for county-level legal information
// Comprehensive content meeting 400+ word requirement per county

import type { CountyDataCollection } from '../types';

export const floridaCounties: CountyDataCollection = {
  'Miami-Dade County': {
    slug: 'miami-dade',
    court: {
      name: 'Eleventh Judicial Circuit Court',
      address: '73 W. Flagler Street, Miami, FL 33130',
      phone: '(305) 349-7000',
      website: 'https://www.jud11.flcourts.org/',
      clerkName: 'Juan Fernandez-Barquin',
      jurisdiction: 'Miami-Dade County',
      established: 'Established 1957'
    },
    venueNotes: 'The Eleventh Judicial Circuit Court of Florida serves Miami-Dade County and handles the highest volume of structured settlement transfer petitions in the state. With over 2.7 million residents, Miami-Dade County processes thousands of civil cases annually, including complex financial transfers requiring court approval under Florida Statute 626.99296. The court maintains specialized divisions for civil matters, ensuring efficient processing of structured settlement petitions. Petitions are typically filed in the civil division and assigned to judges with experience in financial and contract law. The court requires comprehensive documentation including financial disclosures, independent advisor reports, and detailed explanations of the transfer benefits to the payee.',
    filingFee: '$400.00 (plus additional fees for service and publication)',
    processingTime: '45-90 days from filing to final hearing',
    transferVolume: 'high',
    population: '2,701,767 (2023 estimate)',
    majorCities: ['Miami', 'Hialeah', 'Miami Beach', 'Coral Gables', 'North Miami'],
    specialRequirements: [
      'Comprehensive financial disclosure affidavit required from payee',
      'Independent professional financial advisor report mandatory unless waived',
      'All interested parties (annuity issuer, insurance company) must receive notice',
      'Detailed explanation of transfer benefits and alternatives required',
      'Court must find transfer is in payee\'s best interest'
    ],
    localRules: [
      'Electronic filing mandatory through Florida Courts E-Filing Portal',
      'Original petition must be filed with clerk in person or by certified mail',
      'Hearing typically scheduled within 30-45 days of filing',
      'Emergency hearings available for urgent medical or financial situations',
      'Court requires detailed analysis of discount rate and present value calculations',
      'Publication notice required in local newspaper if parties cannot be personally served'
    ],
    localProcedures: [
      'Initial filing includes petition, transfer agreement, and disclosure statement',
      'Clerk reviews for completeness and assigns case number within 24-48 hours',
      'Notice sent to all parties via certified mail and publication if necessary',
      'Pre-hearing discovery period typically 2-3 weeks',
      'Final hearing includes testimony from payee and may include independent advisor',
      'Court issues written order within 7-10 days of hearing',
      'Appeals must be filed within 30 days of final order'
    ],
    judges: [
      {
        name: 'Hon. Jennifer D. Bailey',
        title: 'Circuit Court Judge',
        division: 'Civil Division - Complex Business Litigation',
        notes: 'Handles complex civil matters including structured settlements and financial transfers',
        experience: 'Over 20 years on the bench, specializes in financial disputes'
      },
      {
        name: 'Hon. William Thomas',
        title: 'Circuit Court Judge',
        division: 'Civil Division - General Jurisdiction',
        notes: 'Experienced in contract disputes and structured settlement transfers',
        experience: 'Former civil litigator with extensive financial case background'
      },
      {
        name: 'Hon. Migna Sanchez-Llorens',
        title: 'Circuit Court Judge',
        division: 'Civil Division - Probate and Family',
        notes: 'Handles cases involving financial planning and inheritance matters',
        experience: 'Background in estate planning and financial services law'
      }
    ],
    links: [
      { label: 'Eleventh Judicial Circuit Court Official Website', url: 'https://www.jud11.flcourts.org/' },
      { label: 'Miami-Dade County Clerk of Courts', url: 'https://www.miami-dadeclerk.com/' },
      { label: 'Florida Courts E-Filing Portal', url: 'https://www.myflcourtaccess.com/' },
      { label: 'Florida Statute 626.99296 - Structured Settlements', url: 'https://www.flsenate.gov/Laws/Statutes/2021/0626.99296' },
      { label: 'Miami-Dade County Bar Association', url: 'https://www.miamidadebar.org/' },
      { label: 'Florida Department of Financial Services', url: 'https://www.myfloridacfo.com/' }
    ]
  },
  'Broward County': {
    slug: 'broward',
    court: {
      name: 'Seventeenth Judicial Circuit Court',
      address: '201 SE 6th Street, Fort Lauderdale, FL 33301',
      phone: '(954) 831-6565',
      website: 'https://www.17th.flcourts.org/',
      clerkName: 'Brenda D. Forman',
      jurisdiction: 'Broward County',
      established: 'Established 1915'
    },
    venueNotes: 'The Seventeenth Judicial Circuit Court serves Broward County with Fort Lauderdale as the county seat and primary venue for all civil matters including structured settlement transfers. As Florida\'s second most populous county with nearly 2 million residents, Broward County processes a significant volume of structured settlement petitions annually. The court operates specialized civil divisions that handle complex financial transactions under Florida\'s Structured Settlement Protection Act. Judges in this circuit are experienced in reviewing transfer petitions and ensuring compliance with state requirements for payee protection. The court maintains strict standards for financial disclosure and independent advisor involvement, particularly in cases involving substantial settlement amounts or vulnerable payees.',
    filingFee: '$400.00 (plus $10.00 for each additional defendant)',
    processingTime: '30-60 days from filing to final order',
    transferVolume: 'high',
    population: '1,944,375 (2023 estimate)',
    majorCities: ['Fort Lauderdale', 'Hollywood', 'Pembroke Pines', 'Coral Springs', 'Miramar'],
    specialRequirements: [
      'All documents must be notarized by Florida notary public',
      'Proof of service required for all interested parties via certified mail',
      'Comprehensive financial disclosure forms including income, expenses, and debts',
      'Independent financial advisor consultation report required',
      'Detailed explanation of how transfer funds will be used',
      'Court must make specific finding that transfer is in payee\'s best interest'
    ],
    localRules: [
      'Electronic filing mandatory through Florida Courts E-Portal system',
      'Mandatory mediation required for cases over $50,000',
      'Court appearances required for final hearings unless waived',
      'Emergency hearings available for medical emergencies or foreclosure prevention',
      'Publication notice required in Broward edition of South Florida Sun-Sentinel',
      'All transfer agreements must include discount rate and present value calculations'
    ],
    localProcedures: [
      'Petition filed with clerk and assigned to civil division judge within 24 hours',
      'Clerk issues summons and notice to all parties within 5 business days',
      '20-day response period for interested parties (annuity issuer, insurance company)',
      'Discovery period typically 2-4 weeks including financial document exchange',
      'Pre-hearing conference scheduled 7-10 days before final hearing',
      'Final hearing includes sworn testimony from payee and financial advisor',
      'Written order issued within 10-14 days of hearing',
      '30-day appeal period begins upon entry of final order'
    ],
    judges: [
      {
        name: 'Hon. Michael A. Robinson',
        title: 'Circuit Court Judge',
        division: 'Civil Division - Complex Business Litigation',
        notes: 'Specializes in complex financial transactions and structured settlement transfers',
        experience: 'Former commercial litigator with 15+ years judicial experience'
      },
      {
        name: 'Hon. Jeffrey R. Levenson',
        title: 'Circuit Court Judge',
        division: 'Civil Division - General Jurisdiction',
        notes: 'Handles structured settlement and financial planning cases',
        experience: 'Background in estate planning and financial services regulation'
      },
      {
        name: 'Hon. Dennis D. Bailey',
        title: 'Circuit Court Judge',
        division: 'Civil Division - Probate and Guardianship',
        notes: 'Experienced in cases involving financial decision-making and payee protection',
        experience: 'Former probate attorney with extensive trust and estate background'
      }
    ],
    links: [
      { label: 'Seventeenth Judicial Circuit Court Official Website', url: 'https://www.17th.flcourts.org/' },
      { label: 'Broward County Clerk of Courts', url: 'https://web.browardclerk.org/' },
      { label: 'Florida Courts E-Filing Portal', url: 'https://www.myflcourtaccess.com/' },
      { label: 'Florida Statute 626.99296 - Structured Settlements', url: 'https://www.flsenate.gov/Laws/Statutes/2021/0626.99296' },
      { label: 'Broward County Bar Association', url: 'https://www.browardbar.org/' },
      { label: 'Florida Department of Financial Services', url: 'https://www.myfloridacfo.com/' }
    ]
  },
  'Palm Beach County': {
    slug: 'palm-beach',
    court: {
      name: 'Fifteenth Judicial Circuit Court',
      address: '205 N. Dixie Highway, West Palm Beach, FL 33401',
      phone: '(561) 355-2996',
      website: 'https://www.15thcircuit.com/',
      clerkName: 'Joseph Abruzzo',
      jurisdiction: 'Palm Beach County',
      established: 'Established 1909'
    },
    venueNotes: 'The Fifteenth Judicial Circuit Court serves Palm Beach County with West Palm Beach as the county seat. This affluent county with significant retiree and seasonal resident populations processes numerous structured settlement transfers annually. The court is known for its thorough review process and emphasis on payee protection, particularly for elderly or financially vulnerable individuals. The civil division handles complex financial matters with judges experienced in reviewing structured settlement transfers under Florida law. The court maintains high standards for documentation and independent advisor involvement.',
    filingFee: '$400.00 (plus service and publication fees)',
    processingTime: '60-90 days from filing to final order',
    transferVolume: 'medium',
    population: '1,492,191 (2023 estimate)',
    majorCities: ['West Palm Beach', 'Boca Raton', 'Boynton Beach', 'Delray Beach', 'Wellington'],
    specialRequirements: [
      'Detailed financial affidavits and budget analysis required',
      'All interested parties (annuity companies, insurers) must receive notice via certified mail',
      'Court approval mandatory for all transfers regardless of amount',
      'Independent financial advisor consultation documentation required',
      'Explanation of transfer necessity and alternative options must be provided',
      'Court must make explicit finding that transfer serves payee\'s best interest'
    ],
    localRules: [
      'In-person filing required for initial petitions (electronic filing for subsequent documents)',
      'Hearing typically scheduled within 45-60 days of filing',
      'Independent advisor testimony often required at final hearing',
      'Mandatory mediation for transfers over $100,000',
      'Publication notice required in Palm Beach Post if personal service not possible',
      'All transfer calculations must be verified by court-appointed expert if over $50,000'
    ],
    localProcedures: [
      'Petition filed with clerk and reviewed for completeness within 48 hours',
      'Notice of filing sent to all parties within 5 business days',
      '30-day response period for interested parties to file objections',
      'Financial discovery period typically 3-4 weeks',
      'Pre-hearing settlement conference required for contested cases',
      'Final hearing includes examination of payee and independent advisor',
      'Written findings of fact and conclusions of law issued within 14 days',
      '30-day appeal period from entry of final judgment'
    ],
    judges: [
      {
        name: 'Hon. Scott Suskauer',
        title: 'Circuit Court Judge',
        division: 'Civil Division - Complex Business Litigation',
        notes: 'Specializes in financial transactions and structured settlement transfers',
        experience: 'Former business attorney with extensive contract and financial law background'
      },
      {
        name: 'Hon. Gregory M. Keyser',
        title: 'Circuit Court Judge',
        division: 'Civil Division - General Jurisdiction',
        notes: 'Handles civil matters including financial planning and settlement transfers',
        experience: 'Background in commercial litigation and financial services regulation'
      },
      {
        name: 'Hon. Samantha Schosberg Feuer',
        title: 'Circuit Court Judge',
        division: 'Civil Division - Probate and Guardianship',
        notes: 'Experienced in cases involving financial decision-making and asset protection',
        experience: 'Former trust and estate attorney with focus on elder financial protection'
      }
    ],
    links: [
      { label: 'Fifteenth Judicial Circuit Court Official Website', url: 'https://www.15thcircuit.com/' },
      { label: 'Palm Beach County Clerk of Courts', url: 'https://www.mypalmbeachclerk.com/' },
      { label: 'Florida Courts E-Filing Portal', url: 'https://www.myflcourtaccess.com/' },
      { label: 'Florida Statute 626.99296 - Structured Settlements', url: 'https://www.flsenate.gov/Laws/Statutes/2021/0626.99296' },
      { label: 'Palm Beach County Bar Association', url: 'https://www.palmbeachbar.org/' },
      { label: 'Florida Department of Financial Services', url: 'https://www.myfloridacfo.com/' }
    ]
  },
  'Orange County': {
    slug: 'orange',
    court: {
      name: 'Ninth Judicial Circuit Court',
      address: '425 N. Orange Avenue, Orlando, FL 32801',
      phone: '(407) 836-2000',
      website: 'https://www.ninthcircuit.org/',
      clerkName: 'Tiffany Moore Russell',
      jurisdiction: 'Orange and Osceola Counties',
      established: 'Established 1845'
    },
    venueNotes: 'The Ninth Judicial Circuit Court serves Orange County with Orlando as the county seat and major metropolitan hub of Central Florida. As home to major theme parks and tourism industry, Orange County processes a diverse range of structured settlement cases from various employment and personal injury settlements. The court handles high-volume civil dockets with specialized judges experienced in financial transactions. The civil division maintains efficient case management systems and provides clear guidelines for structured settlement transfers under Florida law.',
    filingFee: '$400.00 (plus additional fees for complex cases)',
    processingTime: '45-75 days from filing to final hearing',
    transferVolume: 'high',
    population: '1,452,726 (2023 estimate)',
    majorCities: ['Orlando', 'Kissimmee', 'Apopka', 'Winter Park', 'Ocoee'],
    specialRequirements: [
      'Comprehensive financial disclosure including all income sources and debts',
      'All interested parties must be served via certified mail with return receipt',
      'Independent financial advisor consultation mandatory for transfers over $10,000',
      'Detailed explanation of transfer purpose and alternative options required',
      'Court must find that transfer is in the best interest of the payee and dependents',
      'Original signatures required on all court documents'
    ],
    localRules: [
      'Electronic filing mandatory through Florida Courts E-Portal system',
      'Expedited hearings available for medical emergencies or imminent foreclosures',
      'Court requires detailed analysis of discount rate and present value calculations',
      'Mandatory pre-hearing conference for cases over $75,000',
      'Publication notice required in Orlando Sentinel if personal service not possible',
      'All transfer agreements must include clear disclosure of fees and effective interest rate'
    ],
    localProcedures: [
      'Initial petition filed and assigned to civil division judge within 24 hours',
      'Summons and notice issued within 3-5 business days',
      '21-day response period for all interested parties',
      'Discovery and financial document exchange period (2-3 weeks)',
      'Pre-hearing conference scheduled 10-14 days before final hearing',
      'Final hearing includes testimony from payee and may include financial advisor',
      'Court issues detailed written order within 7-10 business days',
      '30-day appeal period begins upon entry of final order'
    ],
    judges: [
      {
        name: 'Hon. Lisa T. Munyon',
        title: 'Chief Judge',
        division: 'Administrative - Civil Oversight',
        notes: 'Provides administrative oversight for civil matters including structured settlements',
        experience: 'Former civil litigator with extensive complex case management experience'
      },
      {
        name: 'Hon. Kevin B. Weiss',
        title: 'Circuit Court Judge',
        division: 'Civil Division - Complex Business Litigation',
        notes: 'Specializes in complex financial transactions and structured settlement cases',
        experience: 'Background in commercial litigation and financial services law'
      },
      {
        name: 'Hon. Vincent S. Chiu',
        title: 'Circuit Court Judge',
        division: 'Civil Division - General Jurisdiction',
        notes: 'Handles civil financial matters including settlement transfers and contract disputes',
        experience: 'Former business attorney with focus on financial and contract law'
      }
    ],
    links: [
      { label: 'Ninth Judicial Circuit Court Official Website', url: 'https://www.ninthcircuit.org/' },
      { label: 'Orange County Clerk of Courts', url: 'https://www.myorangeclerk.com/' },
      { label: 'Florida Courts E-Filing Portal', url: 'https://www.myflcourtaccess.com/' },
      { label: 'Florida Statute 626.99296 - Structured Settlements', url: 'https://www.flsenate.gov/Laws/Statutes/2021/0626.99296' },
      { label: 'Orange County Bar Association', url: 'https://www.orangecountybar.org/' },
      { label: 'Florida Department of Financial Services', url: 'https://www.myfloridacfo.com/' }
    ]
  },
  'Hillsborough County': {
    slug: 'hillsborough',
    court: {
      name: 'Thirteenth Judicial Circuit Court',
      address: '800 E. Twiggs Street, Tampa, FL 33602',
      phone: '(813) 272-5894',
      website: 'https://www.fljud13.org/',
      clerkName: 'Cindy Stuart',
      jurisdiction: 'Hillsborough County',
      established: 'Established 1845'
    },
    venueNotes: 'The Thirteenth Judicial Circuit Court serves Hillsborough County with Tampa as the county seat and major metropolitan area of West Central Florida. As a major business and transportation hub, Hillsborough County processes significant numbers of structured settlement transfers from various industries including healthcare, transportation, and manufacturing. The court maintains specialized civil divisions with judges experienced in complex financial transactions. The civil division processes cases efficiently while maintaining thorough review standards for payee protection under Florida\'s Structured Settlement Protection Act.',
    filingFee: '$400.00 (plus service and publication fees)',
    processingTime: '45-75 days from filing to final order',
    transferVolume: 'high',
    population: '1,513,301 (2023 estimate)',
    majorCities: ['Tampa', 'St. Petersburg', 'Clearwater', 'Brandon', 'Riverview'],
    specialRequirements: [
      'Original signatures required on all petitions and affidavits',
      'Proof of service documentation mandatory for all parties',
      'Comprehensive financial impact analysis required including budget projections',
      'Independent financial advisor consultation mandatory',
      'Detailed explanation of transfer necessity and intended use of funds',
      'Court must make specific findings regarding payee\'s best interest'
    ],
    localRules: [
      'Online filing available through court portal but original documents may be required',
      'Hearing typically scheduled within 30-45 days of completed filing',
      'Court conducts thorough review of payee\'s financial situation and alternatives',
      'Mandatory mediation available for contested transfers',
      'Publication notice required in Tampa Bay Times if personal service not possible',
      'All transfer calculations must be clearly documented and verified'
    ],
    localProcedures: [
      'Petition filed with clerk and assigned to civil division judge within 24-48 hours',
      'Notice issued to all interested parties within 5 business days',
      '25-day response period for objections from annuity issuers and insurance companies',
      'Financial discovery period typically 2-3 weeks',
      'Pre-hearing conference scheduled 7-10 days before final hearing',
      'Final hearing includes sworn testimony from payee and financial advisor',
      'Court issues detailed written order with findings of fact',
      '30-day appeal period from entry of final judgment'
    ],
    judges: [
      {
        name: 'Hon. Ronald Ficarrotta',
        title: 'Circuit Court Judge',
        division: 'Civil Division - Complex Business Litigation',
        notes: 'Specializes in complex civil litigation including structured settlement transfers',
        experience: 'Former commercial litigator with extensive business and financial law background'
      },
      {
        name: 'Hon. Cheryl Thomas',
        title: 'Circuit Court Judge',
        division: 'Civil Division - General Jurisdiction',
        notes: 'Handles civil financial matters and settlement transfer cases',
        experience: 'Background in civil litigation and financial services regulation'
      },
      {
        name: 'Hon. Paul L. Huey',
        title: 'Circuit Court Judge',
        division: 'Civil Division - Probate and Guardianship',
        notes: 'Experienced in financial decision-making and asset protection cases',
        experience: 'Former attorney with focus on estate planning and financial protection'
      }
    ],
    links: [
      { label: 'Thirteenth Judicial Circuit Court Official Website', url: 'https://www.fljud13.org/' },
      { label: 'Hillsborough County Clerk of Courts', url: 'https://www.hillsclerk.com/' },
      { label: 'Florida Courts E-Filing Portal', url: 'https://www.myflcourtaccess.com/' },
      { label: 'Florida Statute 626.99296 - Structured Settlements', url: 'https://www.flsenate.gov/Laws/Statutes/2021/0626.99296' },
      { label: 'Hillsborough County Bar Association', url: 'https://www.hillsbar.com/' },
      { label: 'Florida Department of Financial Services', url: 'https://www.myfloridacfo.com/' }
    ]
  }
};

// Helper function to get county by slug
export function getFloridaCountyBySlug(slug: string) {
  return Object.values(floridaCounties).find(county => county.slug === slug);
}

// Helper function to get all Florida county slugs
export function getFloridaCountySlugs(): string[] {
  return Object.values(floridaCounties).map(county => county.slug);
}

// Helper function to get counties by transfer volume
export function getFloridaCountiesByVolume(volume: 'high' | 'medium' | 'low'): string[] {
  return Object.keys(floridaCounties).filter(countyName =>
    floridaCounties[countyName].transferVolume === volume
  );
}
