import Link from 'next/link';

export const metadata = {
  title: 'What is a Structured Settlement? | Complete Guide | SmarterPayouts',
  description: 'Learn what a structured settlement is, how it works, and your options. Expert guide covering tax benefits, payment schedules, and selling your settlement. Get your instant quote today.',
  openGraph: {
    title: 'What is a Structured Settlement? | Complete Guide | SmarterPayouts',
    description: 'Learn what a structured settlement is, how it works, and your options. Expert guide covering tax benefits, payment schedules, and selling your settlement.',
    type: 'article',
    url: 'https://smarterpayouts.com/structured-settlement-info-hub/what-is-a-structured-settlement',
  }
};

export default function WhatIsStructuredSettlement() {
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
          "text": "A structured settlement is a financial arrangement where you receive periodic payments over time, typically from a legal settlement. These payments are tax-free and court-approved, providing long-term financial security."
        }
      },
      {
        "@type": "Question",
        "name": "How do structured settlements work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Structured settlements work by converting a large settlement into a series of guaranteed payments. These payments can be scheduled monthly, annually, or in other intervals, and are typically tax-free under federal law."
        }
      },
      {
        "@type": "Question",
        "name": "Can I sell my structured settlement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can sell your structured settlement. The process is legal and requires court approval to ensure it's in your best interest. Many people sell to access their money sooner for needs like medical bills, debt relief, or investments."
        }
      }
    ]
  };

  // Article Schema for AI SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What is a Structured Settlement?",
    "description": "A comprehensive guide to understanding structured settlements, how they work, and your options for managing your payments.",
    "image": "https://smarterpayouts.com/images/structured-settlement-guide.jpg",
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
        "url": "https://smarterpayouts.com/images/logo.png"
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://smarterpayouts.com/structured-settlement-info-hub/what-is-a-structured-settlement"
    }
  };

  // Breadcrumb Schema for AI SEO
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
        "name": "What is a Structured Settlement?",
        "item": "https://smarterpayouts.com/structured-settlement-info-hub/what-is-a-structured-settlement"
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="container py-5">
        {/* Hero Section */}
        <section className="mb-5">
          <h1 className="display-4 fw-bold mb-4">What is a Structured Settlement?</h1>
          <p className="lead text-muted">
            A comprehensive guide to understanding structured settlements, how they work, and your options for managing your payments.
          </p>
          <div className="alert alert-success d-inline-block mt-3">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </section>

        {/* Main Content */}
        <article className="row">
          <div className="col-lg-8">
            {/* Definition Section */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Understanding Structured Settlements</h2>
              <p>
                A structured settlement is a financial arrangement where you receive periodic payments over time, 
                typically resulting from a legal settlement. These payments are:
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">✅ Tax-free under federal law</li>
                <li className="mb-2">✅ Court-approved and secure</li>
                <li className="mb-2">✅ Customized to your needs</li>
                <li className="mb-2">✅ Protected from market volatility</li>
              </ul>
            </section>

            {/* How They Work Section */}
            <section className="mb-5">
              <h2 className="h3 mb-4">How Structured Settlements Work</h2>
              <p>
                When you receive a structured settlement, your settlement amount is converted into a series of 
                guaranteed payments. These payments can be scheduled:
              </p>
              <ul>
                <li>Monthly payments for regular income</li>
                <li>Annual payments for long-term security</li>
                <li>Lump sum payments at specific dates</li>
                <li>Combinations of different payment schedules</li>
              </ul>
              <p>
                The payments are typically funded through an annuity, which is a financial product that 
                guarantees your payments over time.
              </p>
            </section>

            {/* Benefits Section */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Benefits of Structured Settlements</h2>
              <div className="card bg-light mb-4">
                <div className="card-body">
                  <h3 className="h5">Key Advantages:</h3>
                  <ul>
                    <li>Tax-free payments under federal law</li>
                    <li>Guaranteed income stream</li>
                    <li>Protection from market volatility</li>
                    <li>Customizable payment schedules</li>
                    <li>Court-approved security</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Common Questions Section */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Common Questions About Structured Settlements</h2>
              <div className="accordion" id="commonQuestions">
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
                      Can I sell my structured settlement?
                    </button>
                  </h3>
                  <div id="q1" className="accordion-collapse collapse show" data-bs-parent="#commonQuestions">
                    <div className="accordion-body">
                      Yes, you can sell your structured settlement. The process is legal and requires court approval 
                      to ensure it's in your best interest. <Link href="/how-to-sell-structured-settlement" className="text-success">Learn more about selling your settlement</Link>.
                    </div>
                  </div>
                </div>
                {/* Add more accordion items for other common questions */}
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-5">
              <h2 className="h3 mb-4">Related Resources</h2>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="h5">Learn More About Selling</h3>
                      <p>Understand your options for selling your structured settlement.</p>
                      <Link href="/how-to-sell-structured-settlement" className="btn btn-outline-success">
                        Read Guide
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="h5">Check Your State Laws</h3>
                      <p>Review structured settlement laws in your state.</p>
                      <Link href="/state-laws" className="btn btn-outline-success">
                        View State Laws
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
                    <Link href="/blog/pros-cons-selling-settlement" className="text-decoration-none">
                      Pros and Cons of Selling Your Settlement
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/blog/tax-implications" className="text-decoration-none">
                      Tax Implications of Structured Settlements
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/choosing-company" className="text-decoration-none">
                      How to Choose a Structured Settlement Company
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