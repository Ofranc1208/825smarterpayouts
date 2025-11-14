/**
 * Organization Schema Component
 * 
 * Handles JSON-LD structured data for organization information.
 * 
 * @component OrganizationSchema
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function OrganizationSchema() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SmarterPayouts",
    "url": "https://smarterpayouts.com",
    "logo": "https://smarterpayouts.com/assets/images/logo.png",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-855-214-3510",
        "contactType": "customer service",
        "areaServed": "US",
        "availableLanguage": "English"
      }
    ],
    "sameAs": [
      "https://search.sunbiz.org/Inquiry/CorporationSearch/ByName"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "250",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationData)
      }}
    />
  );
}
