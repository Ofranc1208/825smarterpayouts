'use client';
import { useState } from 'react';
import Head from 'next/head';

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

function groupStatesAlpha(states: string[]) {
  const groups: { [letter: string]: string[] } = {};
  states.forEach(state => {
    const letter = state[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(state);
  });
  return groups;
}

const stateLawDetails: { [state: string]: {
  canSell: string;
  statuteCitation: string;
  enactmentDate: string;
  keyProvisions: string[];
  courtApproval: string;
  prohibited: string[];
  resources: { label: string; url: string }[];
} } = {
  Alabama: {
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
    canSell: 'Yes — under Kansas\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Kan. Stat. Ann. §§ 60-4601 to 60-4621',
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
      { label: 'Full Text: Kansas SSPA', url: 'http://www.kslegislature.org/li_2012/b2011_12/statute/060_000_0000_chapter/060_046_0000_article/' },
      { label: 'Kansas Insurance Department', url: 'https://insurance.kansas.gov/' },
    ],
  },
  Kentucky: {
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
  Montana: {
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
  Nebraska: {
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
  "North Carolina": {
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
      { label: 'Full Text: North Carolina SSPA', url: 'https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/ByArticle/Chapter_1/Article_45A.html' },
      { label: 'North Carolina Department of Insurance', url: 'https://www.ncdoi.gov/' },
    ],
  },
  "North Dakota": {
    canSell: 'Yes — under North Dakota\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'N.D. Cent. Code §§ 32-03.4-01 to 32-03.4-12',
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
      { label: 'Full Text: North Dakota SSPA', url: 'https://www.ndlegis.gov/cencode/t32c03-4.html' },
      { label: 'North Dakota Insurance Department', url: 'https://www.insurance.nd.gov/' },
    ],
  },
  "Ohio": {
    canSell: 'Yes — under Ohio\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Ohio Rev. Code Ann. §§ 2323.58 to 2323.587',
    enactmentDate: '2000',
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
      { label: 'Full Text: Ohio SSPA', url: 'https://codes.ohio.gov/ohio-revised-code/section-2323.58' },
      { label: 'Ohio Department of Insurance', url: 'https://insurance.ohio.gov/' },
    ],
  },
  "Oklahoma": {
    canSell: 'Yes — under Oklahoma\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Okla. Stat. tit. 12, §§ 3238 to 3248',
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
      { label: 'Full Text: Oklahoma SSPA', url: 'https://www.oscn.net/applications/oscn/DeliverDocument.asp?CiteID=447944' },
      { label: 'Oklahoma Insurance Department', url: 'https://www.oid.ok.gov/' },
    ],
  },
  "Oregon": {
    canSell: 'Yes — under Oregon\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Or. Rev. Stat. §§ 33.850 to 33.872',
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
      { label: 'Full Text: Oregon SSPA', url: 'https://www.oregonlegislature.gov/bills_laws/ors/ors033.html' },
      { label: 'Oregon Division of Financial Regulation', url: 'https://dfr.oregon.gov/' },
    ],
  },
  "Pennsylvania": {
    canSell: 'Yes — under Pennsylvania\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Pa. Cons. Stat. Ann. §§ 4001 to 4009',
    enactmentDate: '2000',
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
      { label: 'Full Text: Pennsylvania SSPA', url: 'https://www.legis.state.pa.us/cfdocs/legis/LI/consCheck.cfm?txtType=HTM&ttl=40&div=0&chpt=4' },
      { label: 'Pennsylvania Insurance Department', url: 'https://www.insurance.pa.gov/' },
    ],
  },
  "Rhode Island": {
    canSell: 'Yes — under Rhode Island\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'R.I. Gen. Laws §§ 27-57.1-1 to 27-57.1-13',
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
      { label: 'Full Text: Rhode Island SSPA', url: 'http://webserver.rilin.state.ri.us/Statutes/TITLE27/27-57.1/INDEX.HTM' },
      { label: 'Rhode Island Department of Business Regulation', url: 'https://dbr.ri.gov/' },
    ],
  },
  "South Carolina": {
    canSell: 'Yes — under South Carolina\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'S.C. Code Ann. §§ 15-50-10 to 15-50-70',
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
      { label: 'Full Text: South Carolina SSPA', url: 'https://www.scstatehouse.gov/code/t15c050.php' },
      { label: 'South Carolina Department of Insurance', url: 'https://doi.sc.gov/' },
    ],
  },
  "South Dakota": {
    canSell: 'Yes — under South Dakota\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'S.D. Codified Laws §§ 21-71-1 to 21-71-13',
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
      { label: 'Full Text: South Dakota SSPA', url: 'https://sdlegislature.gov/Statutes/Codified_Laws/2052342' },
      { label: 'South Dakota Division of Insurance', url: 'https://dlr.sd.gov/insurance/' },
    ],
  },
  "Tennessee": {
    canSell: 'Yes — under Tennessee\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Tenn. Code Ann. §§ 47-30-101 to 47-30-123',
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
      { label: 'Full Text: Tennessee SSPA', url: 'https://www.tn.gov/content/dam/tn/commerce/documents/insurance/legislative/StructuredSettlementProtectionAct.pdf' },
      { label: 'Tennessee Department of Commerce & Insurance', url: 'https://www.tn.gov/commerce/insurance.html' },
    ],
  },
  "Texas": {
    canSell: 'Yes — under Texas\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Tex. Civ. Prac. & Rem. Code §§ 141.001 to 141.007',
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
      { label: 'Full Text: Texas SSPA', url: 'https://statutes.capitol.texas.gov/Docs/CP/htm/CP.141.htm' },
      { label: 'Texas Department of Insurance', url: 'https://www.tdi.texas.gov/' },
    ],
  },
  "Utah": {
    canSell: 'Yes — under Utah\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Utah Code Ann. §§ 31A-36-101 to 31A-36-117',
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
      { label: 'Full Text: Utah SSPA', url: 'https://le.utah.gov/xcode/Title31A/Chapter36/31A-36.html' },
      { label: 'Utah Insurance Department', url: 'https://insurance.utah.gov/' },
    ],
  },
  "Vermont": {
    canSell: 'Yes — under Vermont\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Vt. Stat. Ann. tit. 9, §§ 2480aa to 2480ff',
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
      { label: 'Full Text: Vermont SSPA', url: 'https://legislature.vermont.gov/statutes/fullchapter/09/063' },
      { label: 'Vermont Department of Financial Regulation', url: 'https://dfr.vermont.gov/' },
    ],
  },
  "Virginia": {
    canSell: 'Yes — under Virginia\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Va. Code Ann. §§ 59.1-475 to 59.1-484',
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
      { label: 'Full Text: Virginia SSPA', url: 'https://law.lis.virginia.gov/vacode/title59.1/chapter39.1/' },
      { label: 'Virginia Bureau of Insurance', url: 'https://www.scc.virginia.gov/pages/Bureau-of-Insurance' },
    ],
  },
  "Washington": {
    canSell: 'Yes — under Washington\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Wash. Rev. Code §§ 19.205.010 to 19.205.920',
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
      { label: 'Full Text: Washington SSPA', url: 'https://app.leg.wa.gov/rcw/default.aspx?cite=19.205' },
      { label: 'Washington State Office of the Insurance Commissioner', url: 'https://www.insurance.wa.gov/' },
    ],
  },
  "West Virginia": {
    canSell: 'Yes — under West Virginia\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'W. Va. Code §§ 46A-6H-1 to 46A-6H-8',
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
      { label: 'Full Text: West Virginia SSPA', url: 'https://code.wvlegislature.gov/46A-6H/' },
      { label: 'West Virginia Offices of the Insurance Commissioner', url: 'https://www.wvinsurance.gov/' },
    ],
  },
  "Wisconsin": {
    canSell: 'Yes — under Wisconsin\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Wis. Stat. §§ 895.10 to 895.102',
    enactmentDate: '2005',
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
      { label: 'Full Text: Wisconsin SSPA', url: 'https://docs.legis.wisconsin.gov/statutes/statutes/895/10' },
      { label: 'Wisconsin Office of the Commissioner of Insurance', url: 'https://oci.wi.gov/' },
    ],
  },
  "Wyoming": {
    canSell: 'Yes — under Wyoming\'s Structured Settlement Protection Act (SSPA), transfers are allowed with court approval.',
    statuteCitation: 'Wyo. Stat. Ann. §§ 1-16-701 to 1-16-707',
    enactmentDate: '2005',
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
      { label: 'Full Text: Wyoming SSPA', url: 'https://wyoleg.gov/Legislation/2005/HB0212' },
      { label: 'Wyoming Department of Insurance', url: 'https://doi.wyo.gov/' },
    ],
  },
};

export default function StructuredSettlementLawsByState() {
  const [search, setSearch] = useState('');
  const [openState, setOpenState] = useState<string | null>(null);
  const filteredStates = search.trim()
    ? states.filter(s => s.toLowerCase().includes(search.trim().toLowerCase()))
    : states;
  const grouped = groupStatesAlpha(filteredStates);

  const handleAccordionClick = (state: string) => {
    setOpenState(prev => (prev === state ? null : state));
  };

  return (
    <>
      <Head>
        <title>Structured Settlement Laws by State | SmarterPayouts</title>
        <meta name="description" content="State-specific structured settlement transfer laws, protection acts, and regulations for all 50 states and D.C." />
      </Head>
      <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)',
        padding: '5rem 0 4rem',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "#059669",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "1rem"
          }}>
            State Legal Information
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            🗺️ Structured Settlement Laws by State
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            maxWidth: '700px',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            Comprehensive state-specific structured settlement transfer laws, protection acts, and regulations for all 50 states and D.C.
          </p>
          <div style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <a href="/pricing-calculator" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #09b44d 0%, #059669 100%)",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              boxShadow: "0 4px 6px rgba(9, 180, 77, 0.2)"
            }}>💰 Get Your Quote</a>
            <a href="/mint-intelligent-chat" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              boxShadow: "0 4px 6px rgba(139, 92, 246, 0.2)"
            }}>💬 Chat with Mint AI</a>
          </div>
        </div>
      </section>

      <main style={{
        background: '#f9fafb',
        minHeight: '100vh',
        padding: '48px 0'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          {/* Attorney Disclaimer */}
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 10%, #f59e0b 100%)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            marginBottom: '2rem',
            border: '1px solid #f59e0b',
            boxShadow: '0 4px 6px rgba(245, 158, 11, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#92400e',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              ⚠️ Legal Disclaimer
            </h3>
            <p style={{
              color: '#92400e',
              lineHeight: '1.6',
              fontSize: '0.95rem',
              margin: '0'
            }}>
              <strong>Important:</strong> The state law information provided here has been gathered for informational purposes only. 
              State laws change frequently and interpretations may vary by jurisdiction. <strong>Always consult with a qualified attorney</strong> 
              licensed in your state and specializing in structured settlements to ensure the accuracy and applicability of these laws 
              to your specific situation. This information should not be considered legal advice.
            </p>
          </div>
        {/* Search and Call to Action Section */}
        <section style={{
          background: 'white',
          padding: '2.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
          marginBottom: '2rem',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              color: '#6b7280',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}>
              💬 Need immediate assistance? Call us:
            </div>
            <a
              href="tel:+19547649750"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: '#ffffff',
                padding: '0.75rem 2rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
                marginBottom: '1.5rem',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                border: 'none'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              📞 Call Now for Expert Help
            </a>
            
            <div style={{
              color: '#374151',
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              🔍 Or search for your state below:
            </div>
            
            <input
              type="text"
              placeholder="🏛️ Type your state name (e.g., California, Texas, New York)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '500px',
                margin: '0 auto',
                padding: '1rem 1.5rem',
                fontSize: '1.1rem',
                border: '2px solid #059669',
                borderRadius: '50px',
                boxShadow: '0 4px 15px rgba(5, 150, 105, 0.1)',
                background: '#ffffff',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.2)';
                e.currentTarget.style.borderColor = '#047857';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(5, 150, 105, 0.1)';
                e.currentTarget.style.borderColor = '#059669';
              }}
              aria-label="Search for a state"
            />
          </div>
        </section>
        {/* States Accordion Section */}
        <section style={{ marginBottom: '2rem' }}>
          {Object.keys(grouped).sort().map(letter => (
            <div key={letter} style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#059669',
                marginBottom: '1.5rem',
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                borderRadius: '12px',
                border: '1px solid #bbf7d0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                📁 {letter}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {grouped[letter].map(state => (
                  <div key={state} style={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    marginBottom: '1rem',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
                  }}>
                    <h2 style={{ margin: 0 }}>
                      <button
                        type="button"
                        aria-expanded={openState === state}
                        aria-controls={`collapse-${state}`}
                        onClick={() => handleAccordionClick(state)}
                        style={{
                          width: '100%',
                          padding: '1.25rem 1.5rem',
                          fontSize: '1.15rem',
                          fontWeight: 600,
                          color: '#059669',
                          background: 'none',
                          border: 'none',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'background 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = '#f8fafc';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'none';
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          🏛️ {state}
                        </span>
                        <span style={{
                          fontSize: '1.5rem',
                          transform: openState === state ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }}>
                          ⌄
                        </span>
                      </button>
                    </h2>
                    <div
                      id={`collapse-${state}`}
                      style={{
                        display: openState === state ? 'block' : 'none',
                        borderTop: openState === state ? '1px solid #e5e7eb' : 'none'
                      }}
                    >
                      <div style={{ padding: '1.5rem 2rem 2rem 2rem' }}>
                        {stateLawDetails[state] ? (
                          <div>
                            <h5 style={{
                              fontSize: '1.2rem',
                              fontWeight: 700,
                              color: '#059669',
                              marginBottom: '1rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}>
                              ⚖️ Can I Sell My Structured Settlement in {state}?
                            </h5>
                            <p style={{
                              color: '#374151',
                              lineHeight: 1.6,
                              marginBottom: '1.5rem',
                              fontSize: '1.05rem'
                            }}>{stateLawDetails[state].canSell}</p>
                            
                            <div style={{
                              display: 'grid',
                              gap: '1rem',
                              marginBottom: '1.5rem'
                            }}>
                              <div style={{
                                background: '#f8fafc',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: '1px solid #e5e7eb'
                              }}>
                                <strong style={{ color: '#059669' }}>📋 Statute Citation:</strong> {stateLawDetails[state].statuteCitation}
                              </div>
                              <div style={{
                                background: '#f8fafc',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: '1px solid #e5e7eb'
                              }}>
                                <strong style={{ color: '#059669' }}>📅 Enactment Date:</strong> {stateLawDetails[state].enactmentDate}
                              </div>
                            </div>
                            
                            <div style={{ marginBottom: '1.5rem' }}>
                              <h6 style={{
                                color: '#059669',
                                fontWeight: 600,
                                marginBottom: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                              }}>
                                📝 Key Provisions:
                              </h6>
                              <ul style={{
                                color: '#374151',
                                lineHeight: 1.6,
                                paddingLeft: '1.5rem'
                              }}>
                                {stateLawDetails[state].keyProvisions.map((prov, i) => 
                                  <li key={i} style={{ marginBottom: '0.5rem' }}>{prov}</li>
                                )}
                              </ul>
                            </div>
                            
                            <div style={{
                              background: '#f0fdf4',
                              padding: '1.25rem',
                              borderRadius: '12px',
                              border: '1px solid #bbf7d0',
                              marginBottom: '1.5rem'
                            }}>
                              <h6 style={{
                                color: '#059669',
                                fontWeight: 600,
                                marginBottom: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                              }}>
                                🏛️ Court Approval Process:
                              </h6>
                              <p style={{
                                color: '#047857',
                                lineHeight: 1.6,
                                margin: 0
                              }}>{stateLawDetails[state].courtApproval}</p>
                            </div>
                            
                            {stateLawDetails[state].prohibited.length > 0 && (
                              <div style={{ marginBottom: '1.5rem' }}>
                                <h6 style={{
                                  color: '#dc2626',
                                  fontWeight: 600,
                                  marginBottom: '0.75rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem'
                                }}>
                                  🚫 Prohibited Practices:
                                </h6>
                                <ul style={{
                                  color: '#374151',
                                  lineHeight: 1.6,
                                  paddingLeft: '1.5rem'
                                }}>
                                  {stateLawDetails[state].prohibited.map((p, i) => 
                                    <li key={i} style={{ marginBottom: '0.5rem' }}>{p}</li>
                                  )}
                                </ul>
                              </div>
                            )}
                            
                            <div>
                              <h6 style={{
                                color: '#059669',
                                fontWeight: 600,
                                marginBottom: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                              }}>
                                🔗 Additional Resources:
                              </h6>
                              <ul style={{
                                color: '#374151',
                                lineHeight: 1.6,
                                paddingLeft: '1.5rem',
                                margin: 0
                              }}>
                                {stateLawDetails[state].resources.map((r, i) => 
                                  <li key={i} style={{ marginBottom: '0.5rem' }}>
                                    <a 
                                      href={r.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      style={{
                                        color: '#059669',
                                        textDecoration: 'none',
                                        fontWeight: 500
                                      }}
                                      onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                      onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                      {r.label} ↗
                                    </a>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div style={{
                            background: '#fef3c7',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #f59e0b',
                            textAlign: 'center'
                          }}>
                            <h5 style={{
                              color: '#92400e',
                              fontWeight: 600,
                              marginBottom: '0.75rem'
                            }}>
                              🔄 Coming Soon: {state} Details
                            </h5>
                            <p style={{
                              color: '#78350f',
                              margin: 0,
                              lineHeight: 1.6
                            }}>
                              State-specific regulations, transfer requirements, and protection act details for {state} are being compiled and will be available soon.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {filteredStates.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              🔍 No states found matching "{search}". Try a different search term.
            </div>
          )}
        </section>
        </div>
      </main>

      {/* Final CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
        padding: '4rem 0',
        textAlign: 'center',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            Ready to Sell Your Structured Settlement?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Get your instant quote or chat with Mint AI to understand how your state's laws apply to your situation.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="/pricing-calculator" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.125rem',
              boxShadow: '0 4px 15px rgba(9, 180, 77, 0.3)'
            }}>
              💰 Get Your Instant Quote
            </a>
            <a href="/mint-intelligent-chat" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.125rem',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
            }}>
              💬 Chat with Mint AI
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
} 