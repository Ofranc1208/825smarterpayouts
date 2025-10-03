import { Metadata } from 'next';
import FAQs from '@/src/components/Pages/Faq/page';

export const metadata: Metadata = {
  title: 'FAQs - Structured Settlement Questions Answered | SmarterPayouts',
  description: 'Get answers to all your structured settlement questions. Learn about the selling process, court approval, timing, and how SmarterPayouts makes it fast and secure.',
  keywords: 'structured settlement FAQ, selling settlement questions, court approval FAQ, structured settlement help',
  openGraph: {
    title: 'FAQs - Your Structured Settlement Questions Answered',
    description: 'Everything you need to know about selling your structured settlement. Fast, secure, and court-approved.',
    type: 'website',
  },
};

export default function FaqsWrapper() {
  return <FAQs />;
}

