import Link from 'next/link';

export const metadata = {
  title: 'Glossary of Structured Settlement Terms | SmarterPayouts',
  description: 'Clear definitions of key structured settlement terms. Learn the language of settlements, court approval, annuities, and more. Trusted resource for sellers and professionals.',
  openGraph: {
    title: 'Glossary of Structured Settlement Terms | SmarterPayouts',
    description: 'Clear definitions of key structured settlement terms. Learn the language of settlements, court approval, annuities, and more.',
    type: 'article',
    url: 'https://smarterpayouts.com/structured-settlement-info-hub/glossary-of-structured-settlement-terms',
  },
};

export default function GlossaryStructuredSettlementTerms() {
  // FAQ Schema for AI SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a structured settlement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A structured settlement is a series of periodic payments awarded to a claimant, typically from a lawsuit or insurance claim, instead of a lump sum."
        }
      },
      {
        "@type": "Question",
        "name": "What does 'annuity' mean in structured settlements?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An annuity is a financial product that provides regular payments over time. In structured settlements, an insurance company issues an annuity to fund the periodic payments."
        }
      },
      {
        "@type": "Question",
        "name": "What is a transfer petition?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A transfer petition is a legal document filed in court to request approval for the sale or transfer of structured settlement payment rights."
        }
      }
    ]
  };

  // Glossary terms (alphabetized)
  const glossary = [
    {
      term: 'Annuity',
      definition: 'A financial product that provides regular, periodic payments. In structured settlements, annuities are issued by insurance companies to fund the settlement.'
    },
    {
      term: 'Beneficiary',
      definition: 'A person or entity entitled to receive payments from a structured settlement or annuity.'
    },
    {
      term: 'Court Approval',
      definition: 'A legal process required to sell or transfer structured settlement payments. A judge reviews the sale to ensure it is in the seller\'s best interest.'
    },
    {
      term: 'Discount Rate',
      definition: 'The interest rate used to determine the present value of future structured settlement payments when selling them for a lump sum.'
    },
    {
      term: 'Independent Advisor',
      definition: 'A court-appointed professional who reviews the sale of a structured settlement to ensure it is fair and in the seller\'s best interest.'
    },
    {
      term: 'Lump Sum',
      definition: 'A single payment of money, as opposed to a series of periodic payments.'
    },
    {
      term: 'Obligor',
      definition: 'The party responsible for making structured settlement payments, usually an insurance company.'
    },
    {
      term: 'Payee',
      definition: 'The individual entitled to receive payments from a structured settlement.'
    },
    {
      term: 'Purchase Price',
      definition: 'The amount offered to the seller in exchange for the right to receive future structured settlement payments.'
    },
    {
      term: 'Qualified Assignment',
      definition: 'A legal arrangement allowing the transfer of structured settlement payment obligations from the defendant to an assignment company.'
    },
    {
      term: 'Settlement Agreement',
      definition: 'A legal contract outlining the terms of a structured settlement, including payment amounts, schedule, and conditions.'
    },
    {
      term: 'Structured Settlement',
      definition: 'A financial arrangement in which a claimant receives periodic payments over time, typically as a result of a lawsuit or insurance claim.'
    },
    {
      term: 'Transfer Petition',
      definition: 'A legal document filed in court to request approval for the sale or transfer of structured settlement payment rights.'
    },
    {
      term: 'Underwriting',
      definition: 'The process of evaluating the risk and terms involved in purchasing structured settlement payments.'
    }
  ];

  return (
    <>
      {/* FAQ Schema for AI SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="container py-5">
        {/* Hero Section */}
        <section className="mb-5">
          <h1 className="display-4 fw-bold mb-4">Glossary of Structured Settlement Terms</h1>
          <p className="lead text-muted">
            Clear definitions of the most important terms in structured settlements, court approval, annuities, and more.
          </p>
          <div className="alert alert-success d-inline-block mt-3">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </section>

        {/* Main Content */}
        <article className="row">
          <div className="col-lg-8">
            {/* Glossary Section */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Key Terms & Definitions</h2>
              <div className="list-group glossary-list mb-4">
                {glossary.map(({ term, definition }) => (
                  <div key={term} className="list-group-item py-3">
                    <h3 className="h6 mb-1 text-success">{term}</h3>
                    <p className="mb-0">{definition}</p>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <Link href="/structured-settlement-info-hub/faq" className="btn btn-outline-success me-2">
                  View FAQs
                </Link>
                <Link href="/structured-settlement-info-hub/what-is-a-structured-settlement" className="btn btn-outline-success">
                  What is a Structured Settlement?
                </Link>
              </div>
            </section>

            {/* Common Questions */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Common Glossary Questions</h2>
              <div className="accordion" id="glossaryQuestions">
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#gq1">
                      What is the difference between an annuity and a structured settlement?
                    </button>
                  </h3>
                  <div id="gq1" className="accordion-collapse collapse show" data-bs-parent="#glossaryQuestions">
                    <div className="accordion-body">
                      An annuity is a financial product that provides regular payments, while a structured settlement is a legal arrangement that uses an annuity to pay out a settlement over time.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#gq2">
                      What is a transfer petition?
                    </button>
                  </h3>
                  <div id="gq2" className="accordion-collapse collapse" data-bs-parent="#glossaryQuestions">
                    <div className="accordion-body">
                      A transfer petition is a legal document filed in court to request approval for the sale or transfer of structured settlement payment rights.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#gq3">
                      What is a discount rate?
                    </button>
                  </h3>
                  <div id="gq3" className="accordion-collapse collapse" data-bs-parent="#glossaryQuestions">
                    <div className="accordion-body">
                      The discount rate is the interest rate used to determine the present value of future structured settlement payments when selling them for a lump sum.
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
                      <h3 className="h5">What is a Structured Settlement?</h3>
                      <p>Learn the basics and benefits of structured settlements.</p>
                      <Link href="/structured-settlement-info-hub/what-is-a-structured-settlement" className="btn btn-outline-success">
                        Read Article
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="h5">Complete Selling Guide</h3>
                      <p>Step-by-step guide to selling your structured settlement.</p>
                      <Link href="/structured-settlement-info-hub/how-to-sell-structured-settlement" className="btn btn-outline-success">
                        Read Guide
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
                    <Link href="/structured-settlement-info-hub/faq" className="text-decoration-none">
                      Frequently Asked Questions
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/structured-settlement-info-hub/court-approval-process" className="text-decoration-none">
                      Court Approval Process
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/structured-settlement-basics" className="text-decoration-none">
                      Structured Settlement Basics
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