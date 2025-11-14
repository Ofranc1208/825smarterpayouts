'use client';
import MetaTags from './MetaTags';
import OpenGraphTags from './OpenGraphTags';
import TwitterCards from './TwitterCards';
import StructuredData from './StructuredData';
import PerformanceHints from './PerformanceHints';

export default function ContactPageSEOHead() {
  const seoData = {
    title: "Contact SmarterPayouts - Get Expert Settlement Advice | Free Consultation",
    description: "Contact SmarterPayouts for expert structured settlement advice. Get your free consultation today and maximize your settlement value with our trusted team.",
    keywords: "contact structured settlement, settlement consultation, SmarterPayouts contact, settlement experts, free consultation",
    canonicalUrl: "https://smarterpayouts.com/contact",
    siteName: "SmarterPayouts",
    imageUrl: "https://smarterpayouts.com/images/contact-og-image.jpg",
    twitterSite: "@smarterpayouts"
  };

  const organizationData = {
    organizationName: "SmarterPayouts",
    url: "https://smarterpayouts.com",
    phone: "+1-855-214-3510",
    email: "info@smarterpayouts.com",
    address: {
      streetAddress: "15257 Amberly Dr Ste 233",
      addressLocality: "Tampa",
      addressRegion: "FL",
      postalCode: "33647",
      addressCountry: "US"
    }
  };

  return (
    <>
      <MetaTags
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonicalUrl={seoData.canonicalUrl}
      />
      <OpenGraphTags
        title={seoData.title}
        description={seoData.description}
        url={seoData.canonicalUrl}
        siteName={seoData.siteName}
        imageUrl={seoData.imageUrl}
      />
      <TwitterCards
        title={seoData.title}
        description={seoData.description}
        imageUrl={seoData.imageUrl}
        site={seoData.twitterSite}
      />
      <StructuredData
        organizationName={organizationData.organizationName}
        url={organizationData.url}
        phone={organizationData.phone}
        email={organizationData.email}
        address={organizationData.address}
      />
      <PerformanceHints />
    </>
  );
}
