// Disclaimer text component - under 50 lines per complexity rule
// Legal warning text content

import { settlementLawPageData } from '../../../data';

export default function DisclaimerText() {
  const disclaimer = settlementLawPageData.disclaimer;

  return (
    <div style={{
      color: '#92400e',
      lineHeight: '1.5',
      fontSize: '0.75rem'
    }}>
      <p style={{ margin: '0 0 0.75rem 0' }}>
        <strong>Important:</strong> {disclaimer.content}
      </p>
      <p style={{ margin: 0, fontSize: '0.75rem' }}>
        <strong>Note:</strong> {disclaimer.warning}
      </p>
    </div>
  );
}
