'use client';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
}

export default function MetaTags({ title, description, keywords, canonicalUrl }: MetaTagsProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="SmarterPayouts" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={canonicalUrl} />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
    </>
  );
}
