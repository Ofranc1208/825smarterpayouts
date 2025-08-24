import Link from 'next/link';

export const metadata = {
  title: 'State-by-State Laws & Regulations for Selling Structured Settlements | SmarterPayouts',
  description: 'Explore state-specific laws and regulations for selling structured settlements. Find requirements, timelines, and court approval details for your state. Trusted resource for sellers and professionals.',
  openGraph: {
    title: 'State-by-State Laws & Regulations for Selling Structured Settlements | SmarterPayouts',
    description: 'Explore state-specific laws and regulations for selling structured settlements. Find requirements, timelines, and court approval details for your state.',
    type: 'article',
    url: 'https://smarterpayouts.com/structured-settlement-info-hub/state-laws',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/state-laws',
  },
};

export default function StateLaws() {
  // FAQ Schema for AI SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do all states require court approval to sell a structured settlement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all states require court approval, but the process and requirements vary. Some states have additional consumer protections or unique steps."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the process take in my state?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The timeline varies by state, but most take 30-60 days from application to payment. Some states have faster or slower court schedules."
        }
      },
      {
        "@type": "Question",
        "name": "What documents are required for court approval?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Common documents include the settlement agreement, payment schedule, transfer petition, and financial disclosures. Some states require additional forms."
        }
      }
    ]
  };

  // Example state data (expand as needed)
  const states = [
    {
      name: 'California',
      requirements: [
        'Court approval required',
        'Independent professional advisor required',
        'Cooling-off period: 10 days',
        'Typical timeline: 30-45 days',
        'Special notice requirements for payees',
      ],
      statute: 'California Insurance Code § 10134 et seq.'
    },
    {
      name: 'Florida',
      requirements: [
        'Court approval required',
        'Independent professional advisor required',
        'Cooling-off period: 3 days',
        'Typical timeline: 30-45 days',
        'Notice to interested parties required',
      ],
      statute: 'Florida Statutes § 626.99296'
    },
    {
      name: 'New York',
      requirements: [
        'Court approval required',
        'Independent professional advisor required',
        'Cooling-off period: 3 days',
        'Typical timeline: 45-60 days',
        'Special notice and disclosure requirements',
      ],
      statute: 'New York General Obligations Law § 5-1701 et seq.'
    },
    {
      name: 'Texas',
      requirements: [
        'Court approval required',
        'No mandatory independent advisor',
        'Cooling-off period: 3 days',
        'Typical timeline: 30-45 days',
        'Notice to interested parties required',
      ],
      statute: 'Texas Civil Practice & Remedies Code § 141.001 et seq.'
    },
    {
      name: 'Illinois',
      requirements: [
        'Court approval required',
        'Independent professional advisor required',
        'Cooling-off period: 3 days',
        'Typical timeline: 30-45 days',
        'Notice to interested parties required',
      ],
      statute: '215 ILCS 153/1 et seq.'
    },
    // ...add more states as needed
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
          <h1 className="display-4 fw-bold mb-4">State-by-State Laws & Regulations</h1>
          <p className="lead text-muted">
            Find the requirements, timelines, and court approval details for selling a structured settlement in your state. Always consult with a professional for the latest updates.
          </p>
          <div className="alert alert-success d-inline-block mt-3">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </section>

        {/* Main Content */}
        <article className="row">
          <div className="col-lg-8">
            {/* Overview Section */}
            <section className="mb-5">
              <h2 className="h3 mb-4">How State Laws Affect Your Sale</h2>
              <p>
                Every state has its own laws and procedures for selling structured settlements. Use the accordion below to find your state's requirements. For more details, see our <Link href="/structured-settlement-info-hub/how-to-sell-structured-settlement">How to Sell</Link> and <Link href="/structured-settlement-info-hub/court-approval-process">Court Approval</Link> guides, or visit the <Link href="/structured-settlement-info-hub/glossary-of-structured-settlement-terms">Glossary</Link>.
              </p>
            </section>

            {/* State-by-State Accordion */}
            <section className="mb-5">
              <h2 className="h3 mb-4">State Requirements & Statutes</h2>
              <div className="accordion" id="stateAccordion">
                {states.map((state, idx) => (
                  <div className="accordion-item" key={state.name}>
                    <h3 className="accordion-header">
                      <button className={`accordion-button${idx === 0 ? '' : ' collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#state${idx}`}>
                        {state.name}
                      </button>
                    </h3>
                    <div id={`state${idx}`} className={`accordion-collapse collapse${idx === 0 ? ' show' : ''}`} data-bs-parent="#stateAccordion">
                      <div className="accordion-body">
                        <ul>
                          {state.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                        <div className="mt-2"><strong>Statute:</strong> {state.statute}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Frequently Asked Questions</h2>
              <div className="accordion" id="stateLawQuestions">
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      Do all states require court approval?
                    </button>
                  </h3>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#stateLawQuestions">
                    <div className="accordion-body">
                      Yes, but the process and requirements vary. See the accordion above for your state's details.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      How long does the process take?
                    </button>
                  </h3>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#stateLawQuestions">
                    <div className="accordion-body">
                      Most states take 30-60 days, but it depends on court schedules and state law.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      What documents are required?
                    </button>
                  </h3>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#stateLawQuestions">
                    <div className="accordion-body">
                      Settlement agreement, payment schedule, transfer petition, and financial disclosures are common. Some states require more.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Related Resources</h2>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="h5">How to Sell a Structured Settlement</h3>
                      <p>Step-by-step guide to the selling process.</p>
                      <Link href="/structured-settlement-info-hub/how-to-sell-structured-settlement" className="btn btn-outline-success">
                        Read Guide
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="h5">Court Approval Process</h3>
                      <p>Learn about legal requirements and court approval.</p>
                      <Link href="/structured-settlement-info-hub/court-approval-process" className="btn btn-outline-success">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="h5">Glossary of Terms</h3>
                      <p>Definitions of key structured settlement terms.</p>
                      <Link href="/structured-settlement-info-hub/glossary-of-structured-settlement-terms" className="btn btn-outline-success">
                        View Glossary
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="h5">Calculator</h3>
                      <p>Estimate your lump sum offer instantly.</p>
                      <Link href="/pricing-calculator" className="btn btn-outline-success">
                        Use Calculator
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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
                    <Link href="/structured-settlement-info-hub/glossary-of-structured-settlement-terms" className="text-decoration-none">
                      Glossary of Terms
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