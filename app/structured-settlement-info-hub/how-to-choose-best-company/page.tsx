import Head from 'next/head';
import Link from 'next/link';

export const metadata = {
  title: 'How to Choose the Best Structured Settlement Company | SmarterPayouts',
  description: 'Learn how to select a reputable structured settlement company. Key factors, expert tips, and red flags to watch for. Make a safe, informed choice.',
  openGraph: {
    title: 'How to Choose the Best Structured Settlement Company | SmarterPayouts',
    description: 'Learn how to select a reputable structured settlement company. Key factors, expert tips, and red flags to watch for. Make a safe, informed choice.',
    type: 'article',
    url: 'https://smarterpayouts.com/structured-settlement-info-hub/how-to-choose-best-company',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/how-to-choose-best-company',
  },
};

export default function HowToChooseBestCompany() {
  // FAQ Schema for AI SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What should I look for in a structured settlement company?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Look for licensing, experience, transparent offers, positive reviews, and strong customer support."
        }
      },
      {
        "@type": "Question",
        "name": "How can I avoid scams or predatory companies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Avoid companies with unclear terms, high-pressure tactics, or poor reputations. Always compare offers and check credentials."
        }
      }
    ]
  };

  const factors = [
    'Proper licensing and registration in your state',
    'Years of experience and industry reputation',
    'Transparent, competitive offers (no hidden fees)',
    'Clear explanation of the process and timeline',
    'Positive customer reviews and testimonials',
    'Strong customer support and communication',
    'No high-pressure sales tactics',
    'Willingness to answer all your questions',
    'Compliance with state and federal laws',
    'Ability to provide references or case studies',
  ];

  return (
    <>
      <Head>
        <link rel="canonical" href="https://smarterpayouts.com/structured-settlement-info-hub/how-to-choose-best-company" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <main className="container py-5">
        {/* Hero Section */}
        <section className="mb-5">
          <h1 className="display-4 fw-bold mb-4">How to Choose the Best Structured Settlement Company</h1>
          <p className="lead text-muted">
            Make a safe, informed choice—discover the key factors to consider and red flags to avoid when selecting a structured settlement company.
          </p>
          <div className="alert alert-success d-inline-block mt-3">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </section>

        {/* Main Content */}
        <article className="row">
          <div className="col-lg-8">
            {/* Factors List */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Key Factors to Consider</h2>
              <ul className="list-group mb-4">
                {factors.map((factor, idx) => (
                  <li className="list-group-item" key={idx}>⭐ {factor}</li>
                ))}
              </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Frequently Asked Questions</h2>
              <div className="accordion" id="companyFaq">
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      What should I look for in a company?
                    </button>
                  </h3>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#companyFaq">
                    <div className="accordion-body">
                      Look for licensing, experience, transparent offers, positive reviews, and strong customer support. See the list above for more.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      How can I avoid scams or predatory companies?
                    </button>
                  </h3>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#companyFaq">
                    <div className="accordion-body">
                      Avoid companies with unclear terms, high-pressure tactics, or poor reputations. Always compare offers and check credentials.
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
                <li><Link href="/testimonials">Testimonials</Link></li>
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