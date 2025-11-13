import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { CourtApprovalProcess } from '@/src/components/Pages/StructuredSettlementInfoHub';
import { generateInfoHubMetadata } from '@/lib/seo/metadata';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = generateInfoHubMetadata(
  'Court Approval Process for Structured Settlements | Timeline & Requirements',
  'Complete guide to court approval: timeline, what judges look for, required documents, and how to prepare for your hearing. 6-12 week process explained.',
  'court-approval-process'
);

export default function Page() {
  return (
    <>
      <CourtApprovalProcess />
      <LazyFABSpeedDial />
    </>
  );
}
