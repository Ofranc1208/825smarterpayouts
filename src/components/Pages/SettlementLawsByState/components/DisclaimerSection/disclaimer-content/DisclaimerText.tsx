// Disclaimer text component - under 50 lines per complexity rule
// Simple presentational component with inline data

export default function DisclaimerText() {
  return (
    <p style={{
      color: '#374151',
      lineHeight: 1.5,
      fontSize: '0.65rem'
    }}>
      This information is provided for educational purposes only and does not constitute legal advice. State laws are subject to change, and specific circumstances may affect how these laws apply to your situation. Always consult with a qualified attorney licensed in your state before making any decisions regarding structured settlement transfers. SmarterPayouts is not a law firm and does not provide legal services.
    </p>
  );
}
