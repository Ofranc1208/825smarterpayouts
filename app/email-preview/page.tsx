import styles from './EmailPreview.module.css';

// Helper function to format currency (matching LCPPaymentResultsPage)
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function EmailPreviewPage({
  searchParams,
}: {
  searchParams?: { type?: string };
}) {
  // Get calculator type from URL (lcp or guaranteed), default to lcp
  const calculatorType = (searchParams?.type || 'lcp') as 'lcp' | 'guaranteed';
  
  // Sample data matching the actual offer structure
  const minOffer = 415300;
  const maxOffer = 469400;
  const familyProtectionValue = calculatorType === 'lcp' ? 830000 : undefined;
  const offerCode = '996436';

  return (
    <div className={styles.previewWrapper}>
      <div className={styles.previewContainer}>
        <div className={styles.previewHeader}>
          <h1 className={styles.previewHeaderTitle}>📧 Email Template Preview</h1>
          <p className={styles.previewHeaderSubtitle}>
            This is what your customers will receive when they submit their offer information
            <br />
            <span className={styles.calculatorTypeBadge}>
              Calculator Type: <strong>{calculatorType === 'lcp' ? 'Life-Contingent Payments (LCP)' : 'Guaranteed Payments'}</strong>
            </span>
            <br />
            <a href="/email-preview?type=lcp" className={styles.typeLink}>View LCP Template</a> | 
            <a href="/email-preview?type=guaranteed" className={styles.typeLink}> View Guaranteed Template</a>
          </p>
        </div>

        <div className={styles.emailCard}>
          {/* Logo Section with Website Link */}
          <div className={styles.logoSection}>
            <div className={styles.logoContainer}>
              <img 
                src="/favicon_without_text.ico" 
                alt="SmarterPayouts Logo"
                className={styles.logoImage}
              />
              <span className={styles.logoText}>SmarterPayouts</span>
            </div>
            <div className={styles.websiteLink}>
              <a href="https://smarterpayouts.com" className={styles.websiteLinkAnchor}>smarterpayouts.com</a>
            </div>
          </div>

          {/* Congratulations Header with Offer Code */}
          <div className={styles.congratulationsHeader}>
            <div className={styles.congratulationsTopRow}>
              <h1 className={styles.congratulationsTitle}>Congratulations!</h1>
              <div className={styles.offerCodeTop}>
                <div className={styles.offerCodeLabelTop}>Offer Code</div>
                <div className={styles.offerCodeValue}>{offerCode}</div>
              </div>
            </div>
            <p className={styles.congratulationsSubtitle}>You Qualify for an Early Payout Option</p>
          </div>

          {/* Email Content */}
          <div className={styles.emailContent}>
            {/* Greeting */}
            <div className={styles.greeting}>
              <p className={styles.greetingLine}>Dear Valued Client,</p>
              <p className={styles.greetingLine}>Thank you for using SmarterPayouts. We&apos;re excited to share your personalized offer!</p>
            </div>

            {/* Offer Section - Matching LCPPaymentResultsPage Layout */}
            <div className={styles.offerSection}>
              {/* Header */}
              <div className={styles.offerHeader}>
                <h2 className={styles.offerTitle}>Early Payout Offer</h2>
                <p className={styles.offerSubtitle}>STRUCTURED SETTLEMENT VALUATION</p>
              </div>

              {/* Minimum Payout - Top, Smaller */}
              <div className={styles.minimumPayoutContainer}>
                <p className={styles.minimumLabel}>Minimum Payout</p>
                <p className={styles.minimumAmount}>{formatCurrency(minOffer)}</p>
              </div>

              {/* Maximum Payout - Center & Largest with Shimmer */}
              <div className={styles.maximumPayoutContainer}>
                <p className={styles.maximumLabel}>Maximum Payout</p>
                <p className={styles.maximumAmount}>{formatCurrency(maxOffer)}</p>
              </div>

              {/* Family Protection Value - Bottom (LCP only) */}
              {calculatorType === 'lcp' && familyProtectionValue !== undefined && (
                <div className={styles.familyProtectionContainer}>
                  <p className={styles.familyLabel}>Family Protection Value</p>
                  <p className={styles.familyAmount}>{formatCurrency(familyProtectionValue)}</p>
                </div>
              )}

              {/* Footer Note */}
              <div className={styles.offerDisclaimer}>
                <p className={styles.disclaimerText}>
                  This offer is based on the information you provided and represents an estimated range.<br />
                  Final terms subject to verification and approval.
                </p>
              </div>
            </div>

            {/* Bonus Message */}
            <div className={styles.bonusMessage}>
              <p className={styles.bonusText}>
                You may qualify for up to <span className={styles.bonusAmount}>$5,000</span> bonus towards closing your structured settlement!
              </p>
            </div>

            {/* Contact Section */}
            <div className={styles.contactSection}>
              <p className={styles.contactTitle}>Ready to Get Started?</p>
              <div className={styles.contactPhone}>
                <a href="tel:+15615831280">+1-561-583-1280</a>
              </div>
              <p className={styles.contactHours}>Monday - Friday, 9:00 AM - 6:00 PM EST</p>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.footerCompany}>SmarterPayouts</p>
            <p className={styles.footerNote}>
              This email was sent because you requested an offer quote from SmarterPayouts.
            </p>
            
            {/* Legal Disclaimers */}
            <div className={styles.disclaimersSection}>
              <p className={styles.disclaimerHeading}>Important Disclaimers</p>
              <p className={styles.disclaimerText}>
                <strong>Illustrative Purposes:</strong> The offer amounts shown above are estimates for illustration purposes only. Actual payout amounts may vary based on verification of your structured settlement documents, court approval requirements, and final due diligence.
              </p>
              {calculatorType === 'lcp' && (
                <p className={styles.disclaimerText}>
                  <strong>Health and Life Contingency Factors:</strong> For life-contingent payment structures, final offer amounts are subject to review of medical records, life expectancy assessments, and actuarial analysis. Offers may be adjusted based on health conditions, age, gender, smoking status, and other risk factors.
                </p>
              )}
              <p className={styles.disclaimerText}>
                <strong>Interest Rates and Market Conditions:</strong> Offer amounts are calculated using current market interest rates and discount factors. Rates are subject to change based on prevailing market conditions at the time of final agreement and court approval.
              </p>
              <p className={styles.disclaimerText}>
                <strong>Regulatory Requirements:</strong> All structured settlement transfers require court approval in accordance with state and federal laws, including the Periodic Payment Settlement Act. Final terms must comply with applicable regulations and may require judicial review.
              </p>
              <p className={styles.disclaimerText}>
                <strong>No Guarantee of Approval:</strong> This offer does not guarantee approval of your structured settlement transfer. Final approval is subject to court review, verification of documents, compliance with all legal requirements, and satisfactory completion of due diligence.
              </p>
              <p className={styles.disclaimerText}>
                <strong>Subject to Change:</strong> All terms, rates, and amounts are subject to change until a final purchase agreement is executed and approved by the appropriate court. SmarterPayouts reserves the right to modify or withdraw this offer based on new information or changed circumstances.
              </p>
              <p className={styles.disclaimerText}>
                <strong>Not Financial Advice:</strong> This communication is not intended as financial, legal, or tax advice. You should consult with qualified professionals, including financial advisors, attorneys, and tax professionals, before making decisions regarding your structured settlement.
              </p>
              <p className={styles.disclaimerText}>
                <strong>Licensed Services:</strong> SmarterPayouts works with licensed brokers in all 50 US states. Services are provided in accordance with applicable state and federal regulations governing structured settlement transfers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

