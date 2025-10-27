import dynamic from 'next/dynamic';
import SocialMediaPage from '@/src/components/Pages/Social-media/page';
import Head from 'next/head';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata = {
  title: 'Social Media | SmarterPayouts',
  description: 'Connect with SmarterPayouts on social media for the latest news, tips, and updates about structured settlements.',
  keywords: 'SmarterPayouts social media, Facebook, X, Instagram, LinkedIn, structured settlement updates',
  alternates: {
    canonical: 'https://smarterpayouts.com/social-media',
  },
  robots: 'index, follow',
};

export default function SocialMedia() {
  return (
    <>
      <SocialMediaPage />
      <LazyFABSpeedDial />
    </>
  );
}
