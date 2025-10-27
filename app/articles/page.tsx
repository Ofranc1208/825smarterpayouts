import dynamic from 'next/dynamic';
import ArticlesPage from '@/src/components/Pages/Articles/page';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata = {
  title: 'Articles & Resources | SmarterPayouts',
  description: 'Expert advice, financial insights, and structured settlement tips. Learn from industry professionals about structured settlements, selling payments, and financial planning.',
  keywords: 'structured settlement articles, settlement resources, financial advice, expert insights, structured settlement tips',
  alternates: {
    canonical: 'https://smarterpayouts.com/articles',
  },
  robots: 'index, follow',
};

export default function Articles() {
  return (
    <>
      <ArticlesPage />
      <LazyFABSpeedDial />
    </>
  );
}
