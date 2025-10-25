import { CourtApprovalPage } from '../../src/components/Pages/CourtApproval';

export const metadata = {
  title: 'Court Approved Structured Settlements | SmarterPayouts',
  description: 'Learn how the court approval process works for structured settlements. SmarterPayouts guides you through every step—compliant, secure, and stress-free.',
  keywords: 'court approved, structured settlement, legal process, judge, compliance, payout, SmarterPayouts',
  alternates: {
    canonical: 'https://smarterpayouts.com/court-approval',
  },
  robots: 'index, follow',
  openGraph: {
    title: 'Court Approved Structured Settlements | SmarterPayouts',
    description: 'Learn how the court approval process works for structured settlements. SmarterPayouts guides you through every step—compliant, secure, and stress-free.',
    url: 'https://smarterpayouts.com/court-approval',
    type: 'website'
  }
};

export default function CourtApproval() {
  return <CourtApprovalPage />;
}
