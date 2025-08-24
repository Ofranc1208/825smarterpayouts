import Head from 'next/head';
import Link from 'next/link';

export const metadata = {
  title: 'Court Approval Process for Selling Structured Settlements | SmarterPayouts',
  description: 'Step-by-step guide to the court approval process for selling your structured settlement. Learn what to expect, required documents, and how to prepare for your hearing.',
  openGraph: {
    title: 'Court Approval Process for Selling Structured Settlements | SmarterPayouts',
    description: 'Step-by-step guide to the court approval process for selling your structured settlement. Learn what to expect, required documents, and how to prepare for your hearing.',
    type: 'article',
    url: 'https://smarterpayouts.com/structured-settlement-info-hub/court-approval-process',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/court-approval-process',
  },
};

export default function CourtApprovalProcess() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is court approval required to sell a structured settlement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Court approval is required to protect the seller's interests and ensure the sale is fair and legal. The judge reviews your case to confirm you understand the transaction and that it is in your best interest."
        }
      },
      {
        "@type": "Question",
        "name": "What happens at the court hearing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A judge will review your case, ask questions about your reasons for selling, and confirm you understand the terms. The judge will approve or deny the sale based on your best interest."
        }
      },
      {
        "@type": "Question",
        "name": "How can I prepare for the court approval process?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gather all required documents, prepare a clear statement of need, and consult an advisor if possible. Arrive early and dress professionally for your hearing."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <main className="container py-5">
        {/* Hero Section */}
        <section className="mb-5">
          <h1 className="display-4 fw-bold mb-4">Court Approval Process for Selling Structured Settlements</h1>
          <p className="lead text-muted">
            Selling your structured settlement requires court approval. Here's what to expect and how to prepare for a successful hearing.
          </p>
          <div className="alert alert-success d-inline-block mt-3">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </section>

        {/* Main Content */}
        <article className="row">
          <div className="col-lg-8">
            {/* Step-by-Step Guide */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Step-by-Step Court Approval Process</h2>
              <ol className="mb-4">
                <li className="mb-3"><strong>File Your Application:</strong> Submit your petition to the court with all required documents, including your settlement agreement and sale contract.</li>
                <li className="mb-3"><strong>Receive Your Hearing Date:</strong> The court will schedule a hearing, usually within 30–45 days.</li>
                <li className="mb-3"><strong>Prepare for the Hearing:</strong> Gather all paperwork, prepare your statement of need, and consult an advisor if required by your state.</li>
                <li className="mb-3"><strong>Attend the Hearing:</strong> Arrive early, dress professionally, and answer the judge's questions honestly and clearly.</li>
                <li className="mb-3"><strong>Judge's Decision:</strong> The judge will approve or deny the sale based on your best interest and state law.</li>
                <li className="mb-3"><strong>Receive Funds:</strong> If approved, you'll receive your lump sum payment, usually within a few days.</li>
              </ol>
            </section>

            {/* FAQ Section */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Frequently Asked Questions</h2>
              <div className="accordion" id="courtProcessFaq">
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      Why is court approval required?
                    </button>
                  </h3>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#courtProcessFaq">
                    <div className="accordion-body">
                      Court approval protects your interests and ensures the sale is fair and legal. The judge reviews your case to confirm you understand the transaction and that it is in your best interest.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      What documents do I need for court approval?
                    </button>
                  </h3>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#courtProcessFaq">
                    <div className="accordion-body">
                      You'll need your settlement agreement, payment schedule, government-issued ID, and the sale agreement. Some states require additional disclosures or financial statements.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      How long does the court approval process take?
                    </button>
                  </h3>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#courtProcessFaq">
                    <div className="accordion-body">
                      Most hearings are scheduled within 30–45 days of your application. The process may be faster or slower depending on your state and court schedule.
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
                <li><Link href="/structured-settlement-info-hub/state-laws">State-by-State Laws</Link></li>
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
                    <Link href="/structured-settlement-info-hub/state-laws" className="text-decoration-none">
                      State-by-State Laws
                    </Link>
                  </li>
                  <li>
                    <Link href="/structured-settlement-info-hub/faq" className="text-decoration-none">
                      FAQ
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