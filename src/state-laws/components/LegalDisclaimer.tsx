// Reusable Legal Disclaimer Component for State Laws Pages
// Enterprise component ensuring compliance across all pages

'use client';

import { useState, useEffect } from 'react';

interface LegalDisclaimerProps {
  stateName?: string;
  className?: string;
  variant?: 'full' | 'compact' | 'footer';
  showLastUpdated?: boolean;
}

export default function LegalDisclaimer({
  stateName,
  className = "",
  variant = 'full',
  showLastUpdated = true
}: LegalDisclaimerProps) {
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    // Set last updated timestamp on component mount
    const now = new Date();
    const formatted = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setLastUpdated(formatted);
  }, []);

  const baseClasses = "bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600 leading-relaxed";
  const variantClasses = {
    full: "my-6",
    compact: "my-4 p-3 text-xs",
    footer: "my-4 p-3 text-xs border-t border-gray-200 bg-transparent"
  };

  const titleText = stateName
    ? `${stateName} Structured Settlement Information`
    : "Legal Information";

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-800 text-sm">
          ⚖️ Legal Disclaimer - {titleText}
        </h3>

        <div className="space-y-1 text-xs leading-relaxed">
          <p>
            <strong>For informational purposes only.</strong> This information is provided for educational purposes and should not be construed as legal advice. Structured settlement laws vary by state and are subject to change.
          </p>

          <p>
            <strong>Court approval required.</strong> All structured settlement transfers require court approval in every state to ensure the best interests of the payee and any dependents are protected.
          </p>

          <p>
            <strong>Professional consultation recommended.</strong> We strongly recommend consulting with qualified legal and financial professionals before making any decisions regarding structured settlement transfers.
          </p>

          <p>
            <strong>State-specific requirements.</strong> Each state has unique statutes, court procedures, and approval criteria. Always verify current requirements with official state resources.
          </p>

          {stateName && (
            <p>
              <strong>{stateName} specific information.</strong> The information provided here is specific to {stateName} state laws and may not apply to other jurisdictions.
            </p>
          )}

          <p className="pt-1 border-t border-gray-300 mt-2">
            <strong>Contact information:</strong> For questions about structured settlements in your state, please contact your state insurance department or a qualified attorney.
          </p>
        </div>

        {showLastUpdated && (
          <div className="pt-2 border-t border-gray-300 text-xs text-gray-500 text-center">
            Last updated: {lastUpdated}
          </div>
        )}
      </div>
    </div>
  );
}

// Preset variants for common use cases
export const StatePageDisclaimer = ({ stateName }: { stateName: string }) => (
  <LegalDisclaimer stateName={stateName} variant="full" />
);

export const CountyPageDisclaimer = ({ stateName }: { stateName: string }) => (
  <LegalDisclaimer stateName={stateName} variant="full" />
);

export const CompactDisclaimer = ({ stateName }: { stateName?: string }) => (
  <LegalDisclaimer stateName={stateName} variant="compact" />
);

export const FooterDisclaimer = () => (
  <LegalDisclaimer variant="footer" showLastUpdated={false} />
);

// Compliance notice for high-traffic pages
export const ComplianceNotice = ({ stateName }: { stateName: string }) => (
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
    <div className="flex items-start gap-3">
      <span className="text-yellow-600 text-lg">⚠️</span>
      <div className="text-sm">
        <p className="font-semibold text-yellow-800 mb-1">
          Important Notice for {stateName} Residents
        </p>
        <p className="text-yellow-700 leading-relaxed">
          Before proceeding with any structured settlement transfer, please consult with a qualified attorney familiar with {stateName} state laws. Court approval is mandatory and requires demonstration that the transfer is in your best interest.
        </p>
      </div>
    </div>
  </div>
);
