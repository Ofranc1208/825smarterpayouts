/**
 * Navigation Schema Component
 * 
 * Handles JSON-LD structured data for site navigation elements.
 * 
 * @component NavigationSchema
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function NavigationSchema() {
  const navigationData = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": [
      "Home",
      "How It Works",
      "About Us",
      "Contact",
      "Calculator"
    ],
    "url": [
      "https://smarterpayouts.com/",
      "https://smarterpayouts.com/how-it-works",
      "https://smarterpayouts.com/about",
      "https://smarterpayouts.com/contact",
      "https://smarterpayouts.com/pricing-calculator"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(navigationData)
      }}
    />
  );
}
