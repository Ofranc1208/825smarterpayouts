import Link from 'next/link';

export const metadata = {
  title: 'How to Sell a Structured Settlement | Step-by-Step Guide | SmarterPayouts',
  description: 'Learn how to sell your structured settlement legally and safely. Expert guide covering court approval, pricing, and the complete process. Get your instant quote today.',
  openGraph: {
    title: 'How to Sell a Structured Settlement | Step-by-Step Guide | SmarterPayouts',
    description: 'Learn how to sell your structured settlement legally and safely. Expert guide covering court approval, pricing, and the complete process.',
    type: 'article',
    url: 'https://smarterpayouts.com/structured-settlement-info-hub/how-to-sell-structured-settlement',
  }
};

export default function HowToSellStructuredSettlement() {
  // FAQ Schema for AI SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I sell my structured settlement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To sell your structured settlement: 1) Get a quote using our calculator, 2) Review and accept the offer, 3) Complete the paperwork, 4) Attend a court hearing, 5) Receive your payment. The entire process typically takes 30-45 days."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to sell a structured settlement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The process typically takes 30-45 days from start to finish. This includes getting a quote, completing paperwork, court approval, and receiving your payment. Some cases can be completed faster depending on your state's requirements."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need a lawyer to sell my structured settlement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While you don't need a lawyer to start the process, it's recommended to consult with one. The court will appoint an independent advisor to review your case and ensure the sale is in your best interest."
        }
      },
      {
        "@type": "Question",
        "name": "How much can I get for my structured settlement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The amount you can receive depends on your payment schedule, remaining payments, and current market rates. Use our free calculator to get an instant quote for your specific settlement."
        }
      }
    ]
  };

  // Article Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Sell a Structured Settlement: Complete Step-by-Step Guide",
    "description": "Learn the complete process of selling your structured settlement, from getting quotes to court approval. Expert guide with tips for maximizing your offer.",
    "image": "https://smarterpayouts.com/assets/images/social-preview.jpg",
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
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://smarterpayouts.com/structured-settlement-info-hub/how-to-sell-structured-settlement"
    }
  };

  // Breadcrumb Schema for Navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://smarterpayouts.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Knowledge Hub",
        "item": "https://smarterpayouts.com/structured-settlement-info-hub"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "How to Sell a Structured Settlement",
        "item": "https://smarterpayouts.com/structured-settlement-info-hub/how-to-sell-structured-settlement"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      <main className="container py-5">
        {/* Hero Section */}
        <section className="mb-5">
          <h1 className="display-4 fw-bold mb-4">How to Sell a Structured Settlement</h1>
          <p className="lead text-muted">
            A step-by-step guide to selling your structured settlement legally, safely, and efficiently.
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
              <h2 className="h3 mb-4">Understanding the Process</h2>
              <p>
                Selling your structured settlement is a legal process that requires court approval. 
                Here's what you need to know:
              </p>
              <div className="card bg-light mb-4">
                <div className="card-body">
                  <h3 className="h5">Key Points:</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">✅ Legal and court-approved process</li>
                    <li className="mb-2">✅ Typically takes 30-45 days</li>
                    <li className="mb-2">✅ No upfront fees or obligations</li>
                    <li className="mb-2">✅ Professional guidance throughout</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Step-by-Step Guide */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Step-by-Step Guide to Selling Your Settlement</h2>
              
              <div className="timeline">
                {/* Step 1 */}
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <span className="badge bg-success rounded-circle p-2 me-3">1</span>
                      <h3 className="h5 mb-0">Get Your Quote</h3>
                    </div>
                    <p>
                      Start by using our free calculator to get an instant quote. You'll need:
                    </p>
                    <ul>
                      <li>Your payment schedule</li>
                      <li>Remaining payment amounts</li>
                      <li>Payment dates</li>
                    </ul>
                    <Link href="/pricing-calculator" className="btn btn-outline-success">
                      Get Your Instant Quote
                    </Link>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <span className="badge bg-success rounded-circle p-2 me-3">2</span>
                      <h3 className="h5 mb-0">Review and Accept Your Offer</h3>
                    </div>
                    <p>
                      Once you receive your quote, review it carefully. Our team will explain:
                    </p>
                    <ul>
                      <li>Your total payout amount</li>
                      <li>Any fees or costs</li>
                      <li>Payment options</li>
                      <li>Next steps in the process</li>
                    </ul>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <span className="badge bg-success rounded-circle p-2 me-3">3</span>
                      <h3 className="h5 mb-0">Complete the Paperwork</h3>
                    </div>
                    <p>
                      After accepting your offer, we'll help you complete the necessary paperwork:
                    </p>
                    <ul>
                      <li>Sale agreement</li>
                      <li>Court petition</li>
                      <li>Financial disclosure forms</li>
                      <li>Other required documents</li>
                    </ul>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <span className="badge bg-success rounded-circle p-2 me-3">4</span>
                      <h3 className="h5 mb-0">Court Approval Process</h3>
                    </div>
                    <p>
                      The court will review your case to ensure the sale is in your best interest:
                    </p>
                    <ul>
                      <li>Independent advisor review</li>
                      <li>Court hearing</li>
                      <li>Judge's approval</li>
                      <li>Final order</li>
                    </ul>
                    <Link href="/court-approval" className="btn btn-outline-success">
                      Learn More About Court Approval
                    </Link>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <span className="badge bg-success rounded-circle p-2 me-3">5</span>
                      <h3 className="h5 mb-0">Receive Your Payment</h3>
                    </div>
                    <p>
                      After court approval, you'll receive your payment through your preferred method:
                    </p>
                    <ul>
                      <li>Direct deposit</li>
                      <li>Wire transfer</li>
                      <li>Paper check</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Questions */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Common Questions About Selling</h2>
              <div className="accordion" id="sellingQuestions">
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
                      How much will I receive for my settlement?
                    </button>
                  </h3>
                  <div id="q1" className="accordion-collapse collapse show" data-bs-parent="#sellingQuestions">
                    <div className="accordion-body">
                      The amount you receive depends on your payment schedule, remaining payments, and current market rates. 
                      <Link href="/pricing-calculator" className="text-success">Use our calculator</Link> to get an instant quote for your specific settlement.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
                      What documents do I need?
                    </button>
                  </h3>
                  <div id="q2" className="accordion-collapse collapse" data-bs-parent="#sellingQuestions">
                    <div className="accordion-body">
                      You'll need your settlement agreement, payment schedule, and identification. Our team will guide you through all required documentation.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q3">
                      Are there any fees?
                    </button>
                  </h3>
                  <div id="q3" className="accordion-collapse collapse" data-bs-parent="#sellingQuestions">
                    <div className="accordion-body">
                      There are no upfront fees. All costs are transparently disclosed in your quote and deducted from your final payment amount.
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
                      <h3 className="h5">State Laws & Requirements</h3>
                      <p>Learn about structured settlement laws in your state.</p>
                      <Link href="/state-laws" className="btn btn-outline-success">
                        View State Laws
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="h5">Court Approval Process</h3>
                      <p>Detailed guide to the court approval process.</p>
                      <Link href="/court-approval" className="btn btn-outline-success">
                        Learn More
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
                <p>Our experts are here to guide you through the process.</p>
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
                    <Link href="/blog/pros-cons-selling-settlement" className="text-decoration-none">
                      Pros and Cons of Selling Your Settlement
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/blog/court-approval-tips" className="text-decoration-none">
                      Tips for Court Approval
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/maximize-offer" className="text-decoration-none">
                      How to Maximize Your Offer
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