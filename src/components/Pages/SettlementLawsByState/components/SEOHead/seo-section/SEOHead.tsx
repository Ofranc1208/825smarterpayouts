// Main SEO orchestrator component
// Simple orchestrator - under 50 lines per complexity rule

import MetaTags from '../seo-meta/MetaTags';
import SocialTags from '../seo-meta/SocialTags';
import WebPageSchema from '../seo-structured/WebPageSchema';
import FAQSchema from '../seo-structured/FAQSchema';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  image
}: SEOHeadProps) {
  return (
    <>
      <MetaTags
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
      />
      <SocialTags
        title={title}
        description={description}
        image={image}
        url={canonical}
      />
      <WebPageSchema />
      <FAQSchema />
    </>
  );
}
