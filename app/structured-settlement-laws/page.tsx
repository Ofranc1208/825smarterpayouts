// App Router wrapper for Settlement Law Federal page
// Following enterprise architecture patterns

import { Metadata } from 'next';
import SettlementLawfederalPage from '../../src/components/Pages/SettlementLawfederal/page';

export const metadata: Metadata = {
  title: 'Structured Settlement Federal Law | SmarterPayouts',
  description: 'Learn about the key federal laws, tax rules, and court approval process governing structured settlements in the United States.',
  robots: 'index, follow',
};

export default function StructuredSettlementFederalLaw() {
  return <SettlementLawfederalPage />;
}
