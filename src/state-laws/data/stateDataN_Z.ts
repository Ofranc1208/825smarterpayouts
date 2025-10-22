// State law data for states N through Z
// Data file - can exceed 120 lines as it's mostly declarative content
import type { StateLaw } from './types';

export const stateDataN_Z: Record<string, StateLaw> = {
  Nebraska: {
    slug: 'nebraska',
    canSell: 'Yes — under Nebraska\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Neb. Rev. Stat. §§ 25-3101 to 25-3113',
    enactmentDate: '2001',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Nebraska SSPA', url: 'https://nebraskalegislature.gov/laws/browse-chapters.php?chapter=25' },
      { label: 'Nebraska Department of Insurance', url: 'https://doi.nebraska.gov/' },
    ],
  },
  Nevada: {
    slug: 'nevada',
    canSell: 'Yes — under Nevada\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Nev. Rev. Stat. §§ 42.500 to 42.550',
    enactmentDate: '2003',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Nevada SSPA', url: 'https://www.leg.state.nv.us/NRS/NRS-042.html#NRS042Sec500' },
      { label: 'Nevada Division of Insurance', url: 'https://doi.nv.gov/' },
    ],
  },
  'New Hampshire': {
    slug: 'new-hampshire',
    canSell: 'Yes — under New Hampshire\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'N.H. Rev. Stat. Ann. §§ 408-D:1 to 408-D:12',
    enactmentDate: '2002',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '3-day cooling-off period after contract execution',
      'Notice to all interested parties',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: New Hampshire SSPA', url: 'https://www.gencourt.state.nh.us/rsa/html/NHTOC/NHTOC-XXXVII-408-D.htm' },
      { label: 'New Hampshire Insurance Department', url: 'https://www.nh.gov/insurance/' },
    ],
  },
  'New Jersey': {
    slug: 'new-jersey',
    canSell: 'Yes — under New Jersey\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'N.J. Stat. Ann. §§ 2A:16-63 to 2A:16-73',
    enactmentDate: '2001',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '3-day cooling-off period after contract execution',
      'Notice to all interested parties',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: New Jersey SSPA', url: 'https://www.njleg.state.nj.us/legislation-and-laws/statutes' },
      { label: 'New Jersey Department of Banking and Insurance', url: 'https://www.nj.gov/dobi/' },
    ],
  },
  'New Mexico': {
    slug: 'new-mexico',
    canSell: 'Yes — under New Mexico\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'N.M. Stat. Ann. §§ 39-1A-1 to 39-1A-10',
    enactmentDate: '2003',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: New Mexico SSPA', url: 'https://law.justia.com/codes/new-mexico/2011/chapter39/article1A/' },
      { label: 'New Mexico Office of Superintendent of Insurance', url: 'https://www.osi.state.nm.us/' },
    ],
  },
  'New York': {
    slug: 'new-york',
    canSell: 'Yes — under New York\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'N.Y. Gen. Oblig. Law §§ 5-1701 to 5-1709',
    enactmentDate: '2002',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '3-day cooling-off period after contract execution',
      'Notice to all interested parties',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: New York SSPA', url: 'https://www.nysenate.gov/legislation/laws/GOB/A5T17' },
      { label: 'New York State Department of Financial Services', url: 'https://www.dfs.ny.gov/' },
    ],
  },
  'North Carolina': {
    slug: 'north-carolina',
    canSell: 'Yes — under North Carolina\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'N.C. Gen. Stat. §§ 1-543.10 to 1-543.18',
    enactmentDate: '2005',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: North Carolina SSPA', url: 'https://www.ncleg.gov/Laws/GeneralStatutes/Chapter1' },
      { label: 'North Carolina Department of Insurance', url: 'https://www.ncdoi.gov/' },
    ],
  },
  'North Dakota': {
    slug: 'north-dakota',
    canSell: 'Yes — under North Dakota\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'N.D. Cent. Code §§ 26.1-33.2-01 to 26.1-33.2-11',
    enactmentDate: '2003',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: North Dakota SSPA', url: 'https://www.legis.nd.gov/cencode/t26-1c33-2.pdf' },
      { label: 'North Dakota Insurance Department', url: 'https://www.nd.gov/ndins/' },
    ],
  },
  Ohio: {
    slug: 'ohio',
    canSell: 'Yes — under Ohio\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Ohio Rev. Code Ann. §§ 2323.56 to 2323.68',
    enactmentDate: '2002',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '3-day cooling-off period after contract execution',
      'Notice to all interested parties',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Ohio SSPA', url: 'https://codes.ohio.gov/ohio-revised-code/chapter-2323' },
      { label: 'Ohio Department of Insurance', url: 'https://insurance.ohio.gov/' },
    ],
  },
  Oklahoma: {
    slug: 'oklahoma',
    canSell: 'Yes — under Oklahoma\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Okla. Stat. tit. 36, §§ 4001 to 4015',
    enactmentDate: '2003',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Oklahoma SSPA', url: 'https://www.oscn.net/applications/oscn/DeliverDocument.asp?CiteID=69163' },
      { label: 'Oklahoma Insurance Department', url: 'https://www.oid.ok.gov/' },
    ],
  },
  Oregon: {
    slug: 'oregon',
    canSell: 'Yes — under Oregon\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Or. Rev. Stat. §§ 33.750 to 33.775',
    enactmentDate: '2001',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '3-day cooling-off period after contract execution',
      'Notice to all interested parties',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Oregon SSPA', url: 'https://www.oregonlegislature.gov/bills_laws/ors/ors033.html' },
      { label: 'Oregon Division of Financial Regulation', url: 'https://dfr.oregon.gov/' },
    ],
  },
  Pennsylvania: {
    slug: 'pennsylvania',
    canSell: 'Yes — under Pennsylvania\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: '42 Pa. Cons. Stat. §§ 8601 to 8610',
    enactmentDate: '2002',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '3-day cooling-off period after contract execution',
      'Notice to all interested parties',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Pennsylvania SSPA', url: 'https://www.legis.state.pa.us/cfdocs/legis/LI/consCheck.cfm?txtType=HTM&ttl=42&div=0&chpt=86' },
      { label: 'Pennsylvania Insurance Department', url: 'https://www.insurance.pa.gov/' },
    ],
  },
  'Rhode Island': {
    slug: 'rhode-island',
    canSell: 'Yes — under Rhode Island\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'R.I. Gen. Laws §§ 27-5.1-1 to 27-5.1-12',
    enactmentDate: '2002',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '3-day cooling-off period after contract execution',
      'Notice to all interested parties',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Rhode Island SSPA', url: 'http://webserver.rilin.state.ri.us/Statutes/TITLE27/27-5.1/INDEX.HTM' },
      { label: 'Rhode Island Department of Business Regulation', url: 'https://dbr.ri.gov/' },
    ],
  },
  'South Carolina': {
    slug: 'south-carolina',
    canSell: 'Yes — under South Carolina\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'S.C. Code Ann. §§ 38-63-10 to 38-63-100',
    enactmentDate: '2002',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: South Carolina SSPA', url: 'https://www.scstatehouse.gov/code/t38c063.php' },
      { label: 'South Carolina Department of Insurance', url: 'https://doi.sc.gov/' },
    ],
  },
  'South Dakota': {
    slug: 'south-dakota',
    canSell: 'Yes — under South Dakota\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'S.D. Codified Laws §§ 58-5B-1 to 58-5B-12',
    enactmentDate: '2003',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: South Dakota SSPA', url: 'https://sdlegislature.gov/Statutes/Codified_Laws/2049006' },
      { label: 'South Dakota Division of Insurance', url: 'https://dlr.sd.gov/insurance/' },
    ],
  },
  Tennessee: {
    slug: 'tennessee',
    canSell: 'Yes — under Tennessee\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Tenn. Code Ann. §§ 56-7-2301 to 56-7-2310',
    enactmentDate: '2003',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '3-day cooling-off period after contract execution',
      'Notice to all interested parties',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Tennessee SSPA', url: 'https://law.justia.com/codes/tennessee/2010/title-56/chapter-7/part-23/' },
      { label: 'Tennessee Department of Commerce & Insurance', url: 'https://www.tn.gov/commerce/insurance.html' },
    ],
  },
  Texas: {
    slug: 'texas',
    canSell: 'Yes — under Texas\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Tex. Prop. Code Ann. §§ 141.001 to 141.012',
    enactmentDate: '2001',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '3-day cooling-off period after contract execution',
      'Notice to all interested parties',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Texas SSPA', url: 'https://statutes.capitol.texas.gov/Docs/PR/htm/PR.141.htm' },
      { label: 'Texas Department of Insurance', url: 'https://www.tdi.texas.gov/' },
    ],
  },
  Utah: {
    slug: 'utah',
    canSell: 'Yes — under Utah\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Utah Code Ann. §§ 78B-6-1301 to 78B-6-1312',
    enactmentDate: '2003',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Utah SSPA', url: 'https://le.utah.gov/xcode/Title78B/Chapter6/78B-6-S1301.html' },
      { label: 'Utah Insurance Department', url: 'https://insurance.utah.gov/' },
    ],
  },
  Vermont: {
    slug: 'vermont',
    canSell: 'Yes — under Vermont\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Vt. Stat. Ann. tit. 8, §§ 5501 to 5512',
    enactmentDate: '2003',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '3-day cooling-off period after contract execution',
      'Notice to all interested parties',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Vermont SSPA', url: 'https://legislature.vermont.gov/statutes/section/08/101/5501' },
      { label: 'Vermont Department of Financial Regulation', url: 'https://dfr.vermont.gov/' },
    ],
  },
  Virginia: {
    slug: 'virginia',
    canSell: 'Yes — under Virginia\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Va. Code Ann. §§ 59.1-475 to 59.1-485',
    enactmentDate: '2001',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '3-day cooling-off period after contract execution',
      'Notice to all interested parties',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Virginia SSPA', url: 'https://law.lis.virginia.gov/vacode/title59.1/chapter41/' },
      { label: 'Virginia Bureau of Insurance', url: 'https://scc.virginia.gov/pages/Bureau-of-Insurance' },
    ],
  },
  Washington: {
    slug: 'washington',
    canSell: 'Yes — under Washington\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Wash. Rev. Code §§ 19.205.010 to 19.205.900',
    enactmentDate: '2002',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '3-day cooling-off period after contract execution',
      'Notice to all interested parties',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Washington SSPA', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=19.205' },
      { label: 'Washington State Office of the Insurance Commissioner', url: 'https://www.insurance.wa.gov/' },
    ],
  },
  'West Virginia': {
    slug: 'west-virginia',
    canSell: 'Yes — under West Virginia\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'W. Va. Code §§ 46A-6F-101 to 46A-6F-112',
    enactmentDate: '2003',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: West Virginia SSPA', url: 'http://www.wvlegislature.gov/wvcode/ChapterEntire.cfm?chap=46a&art=6F' },
      { label: 'West Virginia Offices of the Insurance Commissioner', url: 'https://www.wvinsurance.gov/' },
    ],
  },
  Wisconsin: {
    slug: 'wisconsin',
    canSell: 'Yes — under Wisconsin\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Wis. Stat. §§ 895.65 to 895.66',
    enactmentDate: '2002',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '3-day cooling-off period after contract execution',
      'Notice to all interested parties',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Wisconsin SSPA', url: 'https://docs.legis.wisconsin.gov/statutes/statutes/895/65' },
      { label: 'Wisconsin Office of the Commissioner of Insurance', url: 'https://oci.wi.gov/' },
    ],
  },
  Wyoming: {
    slug: 'wyoming',
    canSell: 'Yes — under Wyoming\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Wyo. Stat. Ann. §§ 26-15-301 to 26-15-312',
    enactmentDate: '2003',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Wyoming SSPA', url: 'https://law.justia.com/codes/wyoming/2011/title26/chapter15/' },
      { label: 'Wyoming Insurance Department', url: 'https://doi.wyo.gov/' },
    ],
  },
  Montana: {
    slug: 'montana',
    canSell: 'Yes — under Montana\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Mont. Code Ann. §§ 33-20-1401 to 33-20-1415',
    enactmentDate: '2005',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Montana SSPA', url: 'https://leg.mt.gov/bills/mca/title_0330/chapter_0200/part_01400/sections_index.html' },
      { label: 'Montana Commissioner of Securities and Insurance', url: 'https://csimt.gov/' },
    ],
  },
};
