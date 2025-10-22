// State law data for states A through M
// Data file - can exceed 120 lines as it's mostly declarative content
import type { StateLaw } from './types';

export const stateDataA_M: Record<string, StateLaw> = {
  Alabama: {
    slug: 'alabama',
    canSell: 'Yes — under Alabama\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Ala. Code §§ 6-11-700 to 6-11-715',
    enactmentDate: '2009',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers the best interest of the payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Alabama SSPA', url: 'https://codes.findlaw.com/al/title-6-civil-practice/al-code-sect-6-11-700.html' },
      { label: 'Alabama Department of Insurance', url: 'https://www.aldoi.gov/' },
    ],
  },
  Alaska: {
    slug: 'alaska',
    canSell: 'Yes — under Alaska\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Alaska Stat. §§ 09.65.300 to 09.65.340',
    enactmentDate: '2004',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers the best interest of the payee and dependents, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Alaska SSPA', url: 'http://www.akleg.gov/basis/statutes.asp#09.65.300' },
      { label: 'Alaska Division of Insurance', url: 'https://www.commerce.alaska.gov/web/ins/' },
    ],
  },
  Arizona: {
    slug: 'arizona',
    canSell: 'Yes — under Arizona\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Ariz. Rev. Stat. §§ 12-2901 to 12-2910',
    enactmentDate: '2003',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '3-day cooling-off period after contract execution',
      'Notice to all interested parties',
    ],
    courtApproval: 'Court considers the best interest of the payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Arizona SSPA', url: 'https://www.azleg.gov/arsDetail/?title=12' },
      { label: 'Arizona Department of Insurance', url: 'https://difi.az.gov/' },
    ],
  },
  Arkansas: {
    slug: 'arkansas',
    canSell: 'Yes — under Arkansas\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Ark. Code Ann. §§ 23-81-701 to 23-81-711',
    enactmentDate: '2005',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers the best interest of the payee and dependents, financial needs, and whether the payee received independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Arkansas SSPA', url: 'https://law.justia.com/codes/arkansas/2012/title-23/subtitle-3/chapter-81/subchapter-7/' },
      { label: 'Arkansas Insurance Department', url: 'https://insurance.arkansas.gov/' },
    ],
  },
  California: {
    slug: 'california',
    canSell: 'Yes — under California\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Cal. Insurance Code §§ 10134–10139.5',
    enactmentDate: '2000 (amended 2013)',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '10-day cooling-off period after contract execution',
      'Independent professional advice required unless waived',
      'Notice to all interested parties',
    ],
    courtApproval: 'Petition filed in superior court; court considers best interest of payee and dependents, financial needs, and advice received.',
    prohibited: [
      'No transfer without court approval',
      'No targeting minors or incapacitated persons',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: California SSPA', url: 'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=INS&division=2.&title=&part=2.&chapter=2.5.&article=' },
      { label: 'California Department of Insurance', url: 'https://www.insurance.ca.gov/' },
    ],
  },
  Colorado: {
    slug: 'colorado',
    canSell: 'Yes — under Colorado\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Colo. Rev. Stat. §§ 13-23-101 to 13-23-107',
    enactmentDate: '2004',
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
      { label: 'Full Text: Colorado SSPA', url: 'https://law.justia.com/codes/colorado/2016/title-13/proceedings-in-civil-actions-and-courts/article-23/' },
      { label: 'Colorado Division of Insurance', url: 'https://doi.colorado.gov/' },
    ],
  },
  Connecticut: {
    slug: 'connecticut',
    canSell: 'Yes — under Connecticut\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Conn. Gen. Stat. §§ 52-225g to 52-225l',
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
      { label: 'Full Text: Connecticut SSPA', url: 'https://www.cga.ct.gov/current/pub/chap_901.htm#sec_52-225g' },
      { label: 'Connecticut Insurance Department', url: 'https://portal.ct.gov/cid' },
    ],
  },
  Delaware: {
    slug: 'delaware',
    canSell: 'Yes — under Delaware\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Del. Code Ann. tit. 6, §§ 6601A to 6609A',
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
      { label: 'Full Text: Delaware SSPA', url: 'https://delcode.delaware.gov/title6/c066a/index.html' },
      { label: 'Delaware Department of Insurance', url: 'https://insurance.delaware.gov/' },
    ],
  },
  'District of Columbia': {
    slug: 'district-of-columbia',
    canSell: 'Yes — under D.C.\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'D.C. Code §§ 31-3301.01 to 31-3301.13',
    enactmentDate: '2003',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      '3-day cooling-off period',
      'Notice to all interested parties',
    ],
    courtApproval: 'Petition filed in D.C. Superior Court; court considers best interest of payee and dependents.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: D.C. SSPA', url: 'https://code.dccouncil.us/dc/council/code/titles/31/chapters/33A/' },
      { label: 'D.C. Department of Insurance, Securities and Banking', url: 'https://disb.dc.gov/' },
    ],
  },
  Florida: {
    slug: 'florida',
    canSell: 'Yes — under Florida\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Fla. Stat. §§ 626.99296',
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
      { label: 'Full Text: Florida SSPA', url: 'https://www.flsenate.gov/Laws/Statutes/2021/626.99296' },
      { label: 'Florida Department of Financial Services', url: 'https://www.myfloridacfo.com/' },
    ],
  },
  Georgia: {
    slug: 'georgia',
    canSell: 'Yes — under Georgia\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Ga. Code Ann. §§ 51-12-70 to 51-12-78',
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
      { label: 'Full Text: Georgia SSPA', url: 'https://law.justia.com/codes/georgia/2010/title-51/chapter-12/article-4/' },
      { label: 'Georgia Office of Insurance and Safety Fire Commissioner', url: 'https://oci.georgia.gov/' },
    ],
  },
  Hawaii: {
    slug: 'hawaii',
    canSell: 'Yes — under Hawaii\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Haw. Rev. Stat. §§ 431:10B-101 to 431:10B-114',
    enactmentDate: '2004',
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
      { label: 'Full Text: Hawaii SSPA', url: 'https://www.capitol.hawaii.gov/hrscurrent/Vol09_Ch0431-0435H/HRS0431/HRS_0431-0010B-0101.htm' },
      { label: 'Hawaii Insurance Division', url: 'https://cca.hawaii.gov/ins/' },
    ],
  },
  Idaho: {
    slug: 'idaho',
    canSell: 'Yes — under Idaho\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Idaho Code §§ 41-2501 to 41-2512',
    enactmentDate: '2004',
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
      { label: 'Full Text: Idaho SSPA', url: 'https://legislature.idaho.gov/statutesrules/idstat/Title41/T41CH25/' },
      { label: 'Idaho Department of Insurance', url: 'https://doi.idaho.gov/' },
    ],
  },
  Illinois: {
    slug: 'illinois',
    canSell: 'Yes — under Illinois\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: '215 Ill. Comp. Stat. 153/1 to 153/35',
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
      { label: 'Full Text: Illinois SSPA', url: 'https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=2732&ChapterID=68' },
      { label: 'Illinois Department of Insurance', url: 'https://insurance.illinois.gov/' },
    ],
  },
  Indiana: {
    slug: 'indiana',
    canSell: 'Yes — under Indiana\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Ind. Code §§ 34-50-2-1 to 34-50-2-23',
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
      { label: 'Full Text: Indiana SSPA', url: 'https://iga.in.gov/legislative/laws/2021/ic/titles/034#34-50-2' },
      { label: 'Indiana Department of Insurance', url: 'https://www.in.gov/idoi/' },
    ],
  },
  Iowa: {
    slug: 'iowa',
    canSell: 'Yes — under Iowa\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Iowa Code §§ 682.1 to 682.12',
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
      { label: 'Full Text: Iowa SSPA', url: 'https://www.legis.iowa.gov/docs/code/682.pdf' },
      { label: 'Iowa Insurance Division', url: 'https://iid.iowa.gov/' },
    ],
  },
  Kansas: {
    slug: 'kansas',
    canSell: 'Yes — under Kansas\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Kan. Stat. Ann. §§ 60-4601 to 60-4621',
    enactmentDate: '2004',
    keyProvisions: [
      'Court approval required for all transfers',
      'Written disclosure of terms and fees to payee',
      'Notice to all interested parties',
      'No explicit cooling-off period in statute',
    ],
    courtApproval: 'Court considers best interest of payee and dependents, financial needs, and whether the payee received independent independent professional advice.',
    prohibited: [
      'No transfer without court approval',
      'No misrepresentation of terms',
    ],
    resources: [
      { label: 'Full Text: Kansas SSPA', url: 'http://www.kslegislature.org/li_2012/b2011_12/statute/060_000_0000_chapter/060_046_0000_article/' },
      { label: 'Kansas Insurance Department', url: 'https://insurance.kansas.gov/' },
    ],
  },
  Kentucky: {
    slug: 'kentucky',
    canSell: 'Yes — under Kentucky\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Ky. Rev. Stat. Ann. §§ 454.430 to 454.435',
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
      { label: 'Full Text: Kentucky SSPA', url: 'https://apps.legislature.ky.gov/law/statutes/chapter.aspx?id=38513' },
      { label: 'Kentucky Department of Insurance', url: 'https://insurance.ky.gov/' },
    ],
  },
  Louisiana: {
    slug: 'louisiana',
    canSell: 'Yes — under Louisiana\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'La. Rev. Stat. Ann. §§ 9:2715.1 to 9:2715.6',
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
      { label: 'Full Text: Louisiana SSPA', url: 'https://www.legis.la.gov/legis/Law.aspx?d=109234' },
      { label: 'Louisiana Department of Insurance', url: 'https://www.ldi.la.gov/' },
    ],
  },
  Maine: {
    slug: 'maine',
    canSell: 'Yes — under Maine\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Me. Rev. Stat. Ann. tit. 24-A, §§ 2241 to 2248',
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
      { label: 'Full Text: Maine SSPA', url: 'https://legislature.maine.gov/statutes/24-A/title24-Asec2241.html' },
      { label: 'Maine Bureau of Insurance', url: 'https://www.maine.gov/pfr/insurance/' },
    ],
  },
  Maryland: {
    slug: 'maryland',
    canSell: 'Yes — under Maryland\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Md. Code Ann., Cts. & Jud. Proc. §§ 5-1101 to 5-1112',
    enactmentDate: '2000',
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
      { label: 'Full Text: Maryland SSPA', url: 'https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gcj&section=5-1101&enactments=false' },
      { label: 'Maryland Insurance Administration', url: 'https://insurance.maryland.gov/' },
    ],
  },
  Massachusetts: {
    slug: 'massachusetts',
    canSell: 'Yes — under Massachusetts\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Mass. Gen. Laws ch. 231C, §§ 1 to 7',
    enactmentDate: '2000',
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
      { label: 'Full Text: Massachusetts SSPA', url: 'https://malegislature.gov/Laws/GeneralLaws/PartIII/TitleII/Chapter231C' },
      { label: 'Massachusetts Division of Insurance', url: 'https://www.mass.gov/orgs/division-of-insurance' },
    ],
  },
  Michigan: {
    slug: 'michigan',
    canSell: 'Yes — under Michigan\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Mich. Comp. Laws §§ 691.1301 to 691.1311',
    enactmentDate: '2006',
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
      { label: 'Full Text: Michigan SSPA', url: 'https://www.legislature.mi.gov/(S(0w2k3k45w2k3k45w2k3k45))/mileg.aspx?page=getObject&objectName=mcl-Act-445-of-2006' },
      { label: 'Michigan Department of Insurance and Financial Services', url: 'https://www.michigan.gov/difs' },
    ],
  },
  Minnesota: {
    slug: 'minnesota',
    canSell: 'Yes — under Minnesota\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Minn. Stat. §§ 549.31 to 549.34',
    enactmentDate: '2000',
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
      { label: 'Full Text: Minnesota SSPA', url: 'https://www.revisor.mn.gov/statutes/cite/549.31' },
      { label: 'Minnesota Department of Commerce', url: 'https://mn.gov/commerce/' },
    ],
  },
  Mississippi: {
    slug: 'mississippi',
    canSell: 'Yes — under Mississippi\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Miss. Code Ann. §§ 11-57-1 to 11-57-23',
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
      { label: 'Full Text: Mississippi SSPA', url: 'https://law.justia.com/codes/mississippi/2013/title-11/chapter-57/' },
      { label: 'Mississippi Insurance Department', url: 'https://www.mid.ms.gov/' },
    ],
  },
  Missouri: {
    slug: 'missouri',
    canSell: 'Yes — under Missouri\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Mo. Rev. Stat. §§ 407.1060 to 407.1076',
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
      { label: 'Full Text: Missouri SSPA', url: 'https://revisor.mo.gov/main/OneChapter.aspx?chapter=407' },
      { label: 'Missouri Department of Commerce & Insurance', url: 'https://insurance.mo.gov/' },
    ],
  },
};
