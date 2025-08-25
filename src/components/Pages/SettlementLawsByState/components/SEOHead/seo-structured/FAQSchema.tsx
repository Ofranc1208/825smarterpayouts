// FAQ structured data for better search results
// Simple component - under 50 lines per complexity rule

import Head from 'next/head';

export default function FAQSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I sell my structured settlement payments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can sell structured settlement payments in all 50 states, but you must obtain court approval first. Each state has a Structured Settlement Protection Act (SSPA) that requires judicial review to ensure the transfer is in your best interest."
        }
      },
      {
        "@type": "Question", 
        "name": "Do I need court approval to sell my structured settlement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, court approval is required in all states. The court will review factors like your financial needs, whether you received independent advice, and if the transfer serves your best interests and those of your dependents."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the court approval process take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The court approval process typically takes 45-90 days, depending on your state's requirements and court schedule. Some states have mandatory waiting periods or cooling-off periods that can extend this timeline."
        }
      },
      {
        "@type": "Question",
        "name": "What is a Structured Settlement Protection Act (SSPA)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Structured Settlement Protection Act is state legislation that regulates the transfer of structured settlement payment rights. These acts require court approval, disclosure of terms, and other consumer protections."
        }
      }
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </Head>
  );
}
