import Link from 'next/link';

export const metadata = {
  title: 'FAQs About Selling Structured Settlements | SmarterPayouts',
  description: 'Get answers to the most common questions about selling structured settlements. Learn about the process, court approval, timelines, and more. Trusted resource for sellers and professionals.',
  openGraph: {
    title: 'FAQs About Selling Structured Settlements | SmarterPayouts',
    description: 'Get answers to the most common questions about selling structured settlements. Learn about the process, court approval, timelines, and more.',
    type: 'article',
    url: 'https://smarterpayouts.com/structured-settlement-info-hub/faq',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/faq',
  },
};

export default function FAQPage() {
  // Expanded FAQ Schema for AI SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is it legal to sell my structured settlement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it is legal in all 50 states, but court approval is required to protect your interests."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the process take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most sales take 30-60 days, depending on your state and court schedule."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need a lawyer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A lawyer is not required, but you may consult one. The court will appoint an independent advisor to review your case."
        }
      },
      {
        "@type": "Question",
        "name": "Will I get the full value of my payments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, you will receive a lump sum that is less than the total value of your future payments due to discounting."
        }
      },
      {
        "@type": "Question",
        "name": "What documents do I need?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You will need your settlement agreement, payment schedule, ID, and any court-required forms."
        }
      },
      {
        "@type": "Question",
        "name": "Can I sell just part of my settlement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can sell all or part of your future payments, depending on your needs."
        }
      },
      {
        "@type": "Question",
        "name": "Will selling affect my government benefits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It may affect eligibility for needs-based programs like SSI or Medicaid. Consult a benefits advisor."
        }
      },
      {
        "@type": "Question",
        "name": "What if the court denies my sale?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can reapply or modify your request. The court will explain the reason for denial."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get started?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use our calculator for an instant quote, then contact our team to begin the process."
        }
      }
    ]
  };

  // FAQ content for display
  const faqs = [
    {
      question: 'Is it legal to sell my structured settlement?',
      answer: 'Yes, it is legal in all 50 states, but court approval is required to protect your interests.'
    },
    {
      question: 'How long does the process take?',
      answer: 'Most sales take 30-60 days, depending on your state and court schedule.'
    },
    {
      question: 'Do I need a lawyer?',
      answer: 'A lawyer is not required, but you may consult one. The court will appoint an independent advisor to review your case.'
    },
    {
      question: 'Will I get the full value of my payments?',
      answer: 'No, you will receive a lump sum that is less than the total value of your future payments due to discounting.'
    },
    {
      question: 'What documents do I need?',
      answer: 'You will need your settlement agreement, payment schedule, ID, and any court-required forms.'
    },
    {
      question: 'Can I sell just part of my settlement?',
      answer: 'Yes, you can sell all or part of your future payments, depending on your needs.'
    },
    {
      question: 'Will selling affect my government benefits?',
      answer: 'It may affect eligibility for needs-based programs like SSI or Medicaid. Consult a benefits advisor.'
    },
    {
      question: 'What if the court denies my sale?',
      answer: 'You can reapply or modify your request. The court will explain the reason for denial.'
    },
    {
      question: 'How do I get started?',
      answer: 'Use our calculator for an instant quote, then contact our team to begin the process.'
    },
    // People Also Ask style
    {
      question: 'Can I sell my settlement if I live outside the US?',
      answer: 'US court approval is required for US-based settlements. International sales may have additional requirements.'
    },
    {
      question: 'How is my lump sum calculated?',
      answer: 'It is based on your payment schedule, remaining payments, discount rate, and market conditions. Use our calculator for an estimate.'
    },
    {
      question: 'What is a discount rate?',
      answer: 'The discount rate is the interest rate used to determine the present value of your future payments.'
    },
    {
      question: 'What is an independent advisor?',
      answer: 'A court-appointed professional who reviews your sale to ensure it is in your best interest.'
    },
    {
      question: 'Can I cancel the sale after court approval?',
      answer: 'Most states have a cooling-off period (3-10 days) after approval. After that, the sale is final.'
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="container py-5">
        {/* Hero Section */}
        <section className="mb-5">
          <h1 className="display-4 fw-bold mb-4">Frequently Asked Questions (FAQs)</h1>
          <p className="lead text-muted">
            Get answers to the most common questions about selling your structured settlement. Explore the process, requirements, and what to expect.
          </p>
          <div className="alert alert-success d-inline-block mt-3">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </section>

        {/* Main Content */}
        <article className="row">
          <div className="col-lg-8">
            {/* People Also Ask Block */}
            <section className="mb-5">
              <h2 className="h3 mb-4">People Also Ask</h2>
              <div className="accordion" id="faqAccordion">
                {faqs.map((faq, idx) => (
                  <div className="accordion-item" key={idx}>
                    <h3 className="accordion-header">
                      <button className={`accordion-button${idx === 0 ? '' : ' collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#faq${idx}`}>
                        {faq.question}
                      </button>
                    </h3>
                    <div id={`faq${idx}`} className={`accordion-collapse collapse${idx === 0 ? ' show' : ''}`} data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Internal Links */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Explore More Resources</h2>
              <ul>
                <li><Link href="/structured-settlement-info-hub/how-to-sell-structured-settlement">How to Sell a Structured Settlement</Link></li>
                <li><Link href="/structured-settlement-info-hub/court-approval-process">Court Approval Process</Link></li>
                <li><Link href="/structured-settlement-info-hub/state-laws">State-by-State Laws</Link></li>
                <li><Link href="/pricing-calculator">Calculator</Link></li>
                <li><Link href="/structured-settlement-info-hub/glossary-of-structured-settlement-terms">Glossary of Terms</Link></li>
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h5">Get Your Instant Quote</h3>
                <p>Find out how much your structured settlement is worth today.</p>
                <Link href="/pricing-calculator" className="btn btn-success w-100">
                  Calculate Your Offer
                </Link>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h5">Need Help?</h3>
                <p>Our experts are here to answer your questions.</p>
                <Link href="/contact" className="btn btn-outline-success w-100">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h3 className="h5">Related Articles</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link href="/structured-settlement-info-hub/how-to-sell-structured-settlement" className="text-decoration-none">
                      How to Sell a Structured Settlement
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/structured-settlement-info-hub/court-approval-process" className="text-decoration-none">
                      Court Approval Process
                    </Link>
                  </li>
                  <li>
                    <Link href="/structured-settlement-info-hub/state-laws" className="text-decoration-none">
                      State-by-State Laws
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </article>
      </main>
    </>
  );
} 