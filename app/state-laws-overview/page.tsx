import dynamic from 'next/dynamic';
import StateLawsPage from '@/src/components/Pages/State-laws/page';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata = {
  title: 'State Laws Overview - Structured Settlement Regulations | SmarterPayouts',
  description: 'Comprehensive overview of structured settlement laws across all 50 states. Learn about court requirements, approval processes, and how our affiliate partners ensure compliance.',
  keywords: 'structured settlement state laws, court approval requirements, settlement sales by state, compliance regulations',
};

export default function StateLawsOverview() {
  return (
    <>
      <StateLawsPage />
      <LazyFABSpeedDial />
    </>
  );
}
