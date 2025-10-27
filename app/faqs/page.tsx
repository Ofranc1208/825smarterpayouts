import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import FAQs from '@/src/components/Pages/Faq/page';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = {
  title: 'FAQs - Structured Settlement Questions | SmarterPayouts',
  description: 'Get answers to all your structured settlement questions. Learn about selling process, court approval, timing, and how we make it fast and secure.',
  keywords: 'structured settlement FAQ, selling settlement questions, court approval FAQ, structured settlement help',
  alternates: {
    canonical: 'https://smarterpayouts.com/faqs',
  },
  openGraph: {
    title: 'FAQs - Your Structured Settlement Questions Answered',
    description: 'Everything you need to know about selling your structured settlement. Fast, secure, and court-approved.',
    url: 'https://smarterpayouts.com/faqs',
    siteName: 'SmarterPayouts',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'FAQs - Structured Settlement Questions | SmarterPayouts',
    description: 'Get answers to all your structured settlement questions. Fast, secure, and court-approved process.',
    creator: '@smarterpayouts',
  },
  robots: 'index, follow',
};

export default function FaqsWrapper() {
  return (
    <>
      <FAQs />
      <LazyFABSpeedDial />
    </>
  );
}

