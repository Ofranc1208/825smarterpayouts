'use client';

import MainPage from '@/src/components/Pages/Main';
import dynamic from 'next/dynamic';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });
const LazyChatManager = dynamic(() => import('@/src/components/chat/ChatManager'), { 
  ssr: false,
  loading: () => <div style={{ display: 'none' }} />
});

export default function Main() {
  return (
    <>
      <MainPage />
      <LazyChatManager />
      <LazyFABSpeedDial />
    </>
  );
}
