import Head from 'next/head';
import Link from 'next/link';

export const metadata = {
  title: 'What Happens After You Sell Your Structured Settlement | SmarterPayouts',
  description: 'Learn what to expect after selling your structured settlement: receiving funds, taxes, financial planning, and next steps. Expert guidance for a smooth transition.',
  openGraph: {
    title: 'What Happens After You Sell Your Structured Settlement | SmarterPayouts',
    description: 'Learn what to expect after selling your structured settlement: receiving funds, taxes, financial planning, and next steps. Expert guidance for a smooth transition.',
    type: 'article',
    url: 'https://smarterpayouts.com/structured-settlement-info-hub/after-you-sell-structured-settlement',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/after-you-sell-structured-settlement',
  },
};

export default function AfterYouSellStructuredSettlement() {
  // FAQ Schema for AI SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How soon will I receive my funds after selling?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most sellers receive their funds within a few days after court approval and final paperwork."
        }
      },
      {
        "@type": "Question",
        "name": "Are there tax implications after selling?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In most cases, proceeds from selling a structured settlement are tax-free, but always consult a tax advisor for your situation."
        }
      },
      {
        "@type": "Question",
        "name": "What should I do with my lump sum?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Consider paying off debts, saving, or investing. Consult a financial advisor to make the most of your funds."
        }
      }
    ]
  };

  const keyPoints = [
    {
      title: 'Receiving Your Funds',
      content: 'After court approval and final paperwork, your funds are typically sent via direct deposit, wire transfer, or check within a few business days.'
    },
    {
      title: 'Tax Considerations',
      content: 'In most cases, the lump sum you receive is tax-free, but there are exceptions. Always consult a tax advisor to confirm your specific situation.'
    },
    {
      title: 'Financial Planning',
      content: 'Plan how you will use your lump sum. Consider paying off debts, building an emergency fund, investing, or saving for major goals.'
    },
    {
      title: 'Impact on Benefits',
      content: 'A lump sum may affect eligibility for needs-based government programs (SSI, Medicaid, etc.). Check with a benefits advisor.'
    },
    {
      title: 'Record Keeping',
      content: 'Keep copies of all sale documents, court orders, and payment records for your files and future reference.'
    },
    {
      title: 'Next Steps',
      content: 'If you have questions or need further support, contact your buyer or a financial advisor. SmarterPayouts is here to help.'
    },
  ];

  return (
    <>
      <Head>
        <link rel="canonical" href="https://smarterpayouts.com/structured-settlement-info-hub/after-you-sell-structured-settlement" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <main className="container py-5">
        {/* Hero Section */}
        <section className="mb-5">
          <h1 className="display-4 fw-bold mb-4">What Happens After You Sell Your Structured Settlement?</h1>
          <p className="lead text-muted">
            Understand the next steps: receiving your funds, tax implications, financial planning, and how to make the most of your lump sum.
          </p>
          <div className="alert alert-success d-inline-block mt-3">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </section>

        {/* Main Content */}
        <article className="row">
          <div className="col-lg-8">
            {/* Key Points Section */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Key Things to Know After Selling</h2>
              <div className="row g-4">
                {keyPoints.map((point, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="card h-100">
                      <div className="card-body">
                        <h3 className="h5">{point.title}</h3>
                        <p>{point.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Frequently Asked Questions</h2>
              <div className="accordion" id="afterFaq">
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      How soon will I receive my funds?
                    </button>
                  </h3>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#afterFaq">
                    <div className="accordion-body">
                      Most sellers receive their funds within a few days after court approval and final paperwork.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      Are there tax implications?
                    </button>
                  </h3>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#afterFaq">
                    <div className="accordion-body">
                      In most cases, proceeds are tax-free, but always consult a tax advisor for your situation.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      What should I do with my lump sum?
                    </button>
                  </h3>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#afterFaq">
                    <div className="accordion-body">
                      Consider paying off debts, saving, or investing. Consult a financial advisor to make the most of your funds.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Internal Links */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Explore More Resources</h2>
              <ul>
                <li><Link href="/structured-settlement-info-hub/how-to-sell-structured-settlement">How to Sell a Structured Settlement</Link></li>
                <li><Link href="/structured-settlement-info-hub/court-approval-process">Court Approval Process</Link></li>
                <li><Link href="/structured-settlement-info-hub/state-laws">State-by-State Laws</Link></li>
                <li><Link href="/structured-settlement-info-hub/glossary-of-structured-settlement-terms">Glossary of Terms</Link></li>
                <li><Link href="/structured-settlement-info-hub/faq">FAQ</Link></li>
                <li><Link href="/pricing-calculator">Calculator</Link></li>
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