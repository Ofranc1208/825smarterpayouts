import MainPage from '@/src/components/Pages/Main';
import dynamic from 'next/dynamic';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export default function Main() {
  return (
    <>
      <MainPage />
      <LazyFABSpeedDial />
    </>
  );
}
