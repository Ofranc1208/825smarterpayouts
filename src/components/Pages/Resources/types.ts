/**
 * Types for Resources Page
 * 
 * Defines TypeScript interfaces and constants for the insurance company directory.
 */

/**
 * Insurance Company Interface
 * 
 * @interface Company
 * @property {string} name - Current legal name of the insurance company
 * @property {string[]} [formerNames] - Previous names the company operated under
 * @property {string} phone - Main phone number
 * @property {string} fax - Fax number
 * @property {string} email - Contact email address
 * @property {string} website - Company website URL
 * @property {string} address - Mailing address
 * @property {string} officeHours - Business hours
 * @property {boolean | string} [verifyPays] - Whether company verifies payments by phone
 * @property {string[]} [acblsadapos] - Array of acronyms for required documents
 * @property {string} [notes] - Additional notes or special instructions
 */
export interface Company {
  name: string;
  formerNames?: string[];
  phone: string;
  fax: string;
  email: string;
  website: string;
  address: string;
  officeHours: string;
  verifyPays?: boolean | string;
  acblsadapos?: string[];
  notes?: string;
}

/**
 * Acronym descriptions for structured settlement documents
 */
export const acronymDescriptions: Record<string, string> = {
  AC: 'Assignment Confirmation',
  BL: 'Benefits Letter',
  SA: 'Settlement Agreement',
  DA: 'Disclosure Agreement',
  POS: 'Proof of Service',
};

/**
 * Icon helper function
 * Returns appropriate emoji for field labels
 */
export function getFieldIcon(label: string): string {
  switch (label) {
    case 'phone': return '📞';
    case 'fax': return '📠';
    case 'email': return '📧';
    case 'website': return '🌐';
    case 'officeHours': return '🕒';
    case 'address': return '🏢';
    case 'formerNames': return '🔄';
    case 'verifyPays': return '✔️';
    case 'acblsadapos': return 'ℹ️';
    case 'notes': return '📝';
    default: return '';
  }
}

/**
 * Complete list of insurance companies
 */
export const companies: Company[] = [
  {
    name: 'AIG (American General / Life Insurance Branch)',
    formerNames: ['AIG American General Life', 'American General Life Insurance Company of New York (NY Branch)'],
    phone: '800-888-2452',
    fax: '713-831-3028',
    email: 'customersupport@aig.com',
    website: 'https://www.aig.com',
    address: 'P.O. Box 305355, Nashville, TN 37230',
    officeHours: '',
    verifyPays: false,
    acblsadapos: ['BL'],
    notes: '',
  },
  {
    name: 'Allstate Life Insurance Company',
    phone: '800-366-1411',
    fax: '',
    email: 'AFRUnit@allstate.com',
    website: 'https://www.allstate.com',
    address: '3100 Sanders Road, Northbrook, IL 60062',
    officeHours: '',
    verifyPays: false,
    acblsadapos: ['AC', 'BL'],
    notes: '',
  },
  {
    name: 'Berkshire Hathaway Life Insurance Company of NE',
    phone: '800-624-5554',
    fax: '',
    email: '',
    website: 'https://www.berkshirehathaway.com/insurance/insurance.html',
    address: '1314 Douglas Street, Suite 1400, Omaha, NE 68102',
    officeHours: '',
    verifyPays: true,
    acblsadapos: ['AC', 'SA', 'QA'],
    notes: '',
  },
  {
    name: 'MassMutual Life Insurance Company',
    phone: '800-272-2216',
    fax: '',
    email: 'service@massmutual.com',
    website: 'https://www.massmutual.com',
    address: '1295 State Street, Springfield, MA 01111',
    officeHours: '',
    verifyPays: '',
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'MetLife',
    formerNames: ['Metropolitan Life Insurance Company'],
    phone: '800-638-5433',
    fax: '',
    email: '',
    website: 'https://www.metlife.com',
    address: 'P.O. Box 14587, Lexington, KY 40512',
    officeHours: '',
    verifyPays: '',
    acblsadapos: ['BL'],
    notes: '',
  },
  {
    name: 'New York Life Insurance Company',
    phone: '800-225-5695',
    fax: '212-576-3500',
    email: 'customerservice@newyorklife.com',
    website: 'https://www.newyorklife.com',
    address: '51 Madison Avenue, New York, NY 10010',
    officeHours: '',
    verifyPays: false,
    acblsadapos: ['BL'],
    notes: '',
  },
  {
    name: 'Pacific Life Insurance Company',
    phone: '800-800-7646',
    fax: '949-420-6821',
    email: 'service@pacificlife.com',
    website: 'https://www.pacificlife.com',
    address: 'P.O. Box 9000, Newport Beach, CA 92658',
    officeHours: '',
    verifyPays: true,
    acblsadapos: ['BL'],
    notes: '',
  },
  {
    name: 'Prudential Insurance Company of America',
    phone: '800-778-2255',
    fax: '877-889-6446',
    email: 'contactus@prudential.com',
    website: 'https://www.prudential.com',
    address: 'P.O. Box 7392, Philadelphia, PA 19176',
    officeHours: '',
    verifyPays: false,
    acblsadapos: ['AC', 'SA', 'QA'],
    notes: "STLegal@prudential.com",
  },
  {
    name: 'Symetra Life Insurance Company',
    phone: '800-796-3872',
    fax: '866-817-2207',
    email: 'service@symetra.com',
    website: 'https://www.symetra.com',
    address: 'P.O. Box 34690, Seattle, WA 98124',
    officeHours: '',
    verifyPays: true,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Transamerica Life Insurance Company',
    phone: '800-797-2643',
    fax: '800-553-6074',
    email: 'customercare@transamerica.com',
    website: 'https://www.transamerica.com',
    address: '6400 C Street SW, Cedar Rapids, IA 52499',
    officeHours: '',
    verifyPays: true,
    acblsadapos: ['BL', 'AC', 'QA', 'SA'],
    notes: 'When requesting ask for "Verification of Benefits"',
  },
  {
    name: 'American United Life Insurance Company',
    phone: '800-382-4000',
    fax: '',
    email: '',
    website: 'https://www.oneamerica.com',
    address: 'One American Square, Indianapolis, IN 46206',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Athene Annuity & Life Assurance Company',
    phone: '888-266-8489',
    fax: '',
    email: '',
    website: 'https://www.athene.com',
    address: 'P.O. Box 725449, Atlanta, GA 31139',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Brighthouse Life Insurance Company',
    formerNames: ['MetLife Assurance Company of Connecticut'],
    phone: '800-638-5433',
    fax: '',
    email: '',
    website: 'https://www.brighthousefinancial.com',
    address: '11225 North Community House Road, Charlotte, NC 28277',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Companion Life Insurance Company',
    phone: '800-753-0404',
    fax: '',
    email: '',
    website: 'https://www.companionlife.com',
    address: '7909 Parklane Road, Suite 200, Columbia, SC 29223',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'First Berkshire Hathaway Life Insurance Company',
    phone: '800-624-5554',
    fax: '',
    email: '',
    website: 'https://www.berkshirehathaway.com/insurance/insurance.html',
    address: '1314 Douglas Street, Suite 1400, Omaha, NE 68102',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Genworth Life Insurance Company',
    formerNames: ['GE Capital Assurance', 'General Electric Capital Assurance', 'GE Life & Annuity'],
    phone: '888-436-9678',
    fax: '804-281-6200',
    email: '',
    website: 'https://www.genworth.com',
    address: '6620 West Broad Street, Richmond, VA 23230',
    officeHours: '',
    verifyPays: true,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Great American Life Insurance Company',
    phone: '800-854-3649',
    fax: '',
    email: '',
    website: 'https://www.greatamericaninsurancegroup.com',
    address: '301 E. Fourth Street, Cincinnati, OH 45202',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'John Hancock Life Insurance Company',
    phone: '800-624-5155',
    fax: '617-572-1571',
    email: '',
    website: 'https://www.johnhancock.com',
    address: 'P.O. Box 55979, Boston, MA 02205',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Liberty Life Assurance Company of Boston',
    phone: '800-451-7065',
    fax: '',
    email: '',
    website: 'https://www.libertymutual.com',
    address: '100 Liberty Way, Dover, NH 03820',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Minnesota Life Insurance Company',
    phone: '800-362-3141',
    fax: '',
    email: '',
    website: 'https://www.securian.com',
    address: '400 Robert Street North, St. Paul, MN 55101',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Mutual of Omaha Insurance Company',
    phone: '800-775-6000',
    fax: '',
    email: 'clientservices@mutualofomaha.com',
    website: 'https://www.mutualofomaha.com',
    address: 'Mutual of Omaha Plaza, Omaha, NE 68175',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Nationwide Life Insurance Company',
    phone: '800-848-6331',
    fax: '',
    email: 'customerservice@nationwide.com',
    website: 'https://www.nationwide.com',
    address: 'One Nationwide Plaza, Columbus, OH 43215',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Independent Life Insurance Company',
    formerNames: [],
    phone: '800-793-7474',
    fax: '',
    email: 'info@independent.life',
    website: 'https://www.independent.life',
    address: '8950 SW 74th Ct, Suite 2201, Miami, FL 33156',
    officeHours: '',
    verifyPays: true,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'USAA Life Insurance Company',
    formerNames: [],
    phone: '800-531-8722',
    fax: '',
    email: '',
    website: 'https://www.usaa.com',
    address: '9800 Fredericksburg Road, San Antonio, TX 78288',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Hartford Life Insurance Company',
    formerNames: ['Genworth Life Insurance Company', 'Hartford Life and Annuity Insurance Company'],
    phone: '800-862-6668',
    fax: '',
    email: '',
    website: 'https://www.genworth.com',
    address: '6620 West Broad Street, Richmond, VA 23230',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: 'Hartford Life business was acquired by Genworth in 2004. Some legacy policies may still be serviced under the Hartford name.'
  },
  {
    name: 'United States Life Insurance Company in the City of New York',
    formerNames: ['AIG', 'American General Life Insurance Company of New York'],
    phone: '800-221-9039',
    fax: '',
    email: '',
    website: 'https://www.corebridgefinancial.com',
    address: 'One World Financial Center, 200 Liberty Street, New York, NY 10281',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Pacific Life & Annuity Company (NY)',
    formerNames: ['Pacific Life Insurance Company'],
    phone: '800-800-7646',
    fax: '',
    email: '',
    website: 'https://ssa.pacificlife.com',
    address: '700 Newport Center Drive, Newport Beach, CA 92660',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: 'Handles NY-specific structured settlements.'
  },
];

