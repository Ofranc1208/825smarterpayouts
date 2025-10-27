import dynamic from 'next/dynamic';
import HowFastPage from '@/src/components/Pages/HowFast/page';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata = {
  title: 'How Fast Can I Get My Structured Settlement Money? | SmarterPayouts',
  description: 'Learn how quickly you can access your structured settlement cash. Most clients receive funds in 24-72 hours after court approval. Get your instant quote today.',
  keywords: 'how fast structured settlement money, quick payout, settlement cash, court approval time, fast money structured settlement',
  openGraph: {
    title: 'How Fast Can I Get My Structured Settlement Money? | SmarterPayouts',
    description: 'Most clients receive funds in 24-72 hours after court approval. Learn the complete timeline and how to expedite your payout.',
    type: 'article',
    url: 'https://smarterpayouts.com/how-fast-can-i-get-my-money',
  }
};

/**
 * FAQ Schema for SEO
 */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How fast can I get my structured settlement money?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most clients receive their money in 24-72 hours after court approval. The total process typically takes 30-45 days from quote to cash, depending on court schedules."
      }
    },
    {
      "@type": "Question", 
      "name": "What affects how quickly I can get my money?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Court schedules, completeness of documentation, and your state's specific requirements affect timing. We help expedite by handling all paperwork and court coordination."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get emergency funding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For urgent situations, we can often expedite court hearings and provide priority processing. Contact us to discuss emergency funding options."
      }
    }
  ]
};

/**
 * Article Schema for SEO
 */
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How Fast Can I Get My Structured Settlement Money?",
  "description": "Complete guide to structured settlement payout timing, court approval process, and how to get your money faster.",
  "author": {
    "@type": "Organization",
    "name": "SmarterPayouts",
    "url": "https://smarterpayouts.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SmarterPayouts",
    "logo": {
      "@type": "ImageObject",
      "url": "https://smarterpayouts.com/assets/images/logo.png"
    }
  },
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString().split('T')[0]
};

export default function HowFastCanIGetMyMoney() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <HowFastPage />
      <LazyFABSpeedDial />
    </>
  );
}
