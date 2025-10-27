import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { CourtApprovalProcess } from '@/src/components/Pages/StructuredSettlementInfoHub';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = {
  title: 'Court Approval Process for Structured Settlements | Timeline & Requirements | SmarterPayouts',
  description: 'Complete guide to court approval: timeline, what judges look for, required documents, and how to prepare for your hearing. 6-12 week process explained.',
  robots: 'index, follow',
  openGraph: {
    title: 'Court Approval Process for Selling Structured Settlements',
    description: 'Understand the 5-step court approval process, what judges evaluate, and how to prepare for your hearing.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/court-approval-process',
  },
};

export default function Page() {
  return (
    <>
      <CourtApprovalProcess />
      <LazyFABSpeedDial />
    </>
  );
}
