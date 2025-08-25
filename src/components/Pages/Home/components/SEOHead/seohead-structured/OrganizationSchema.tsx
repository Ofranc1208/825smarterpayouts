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
        "telephone": "+1-954-764-9750",
        "contactType": "customer service",
        "areaServed": "US",
        "availableLanguage": "English"
      }
    ],
    "sameAs": [
      "https://www.bbb.org/",
      "https://search.sunbiz.org/Inquiry/CorporationSearch/ByName"
    ]
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
