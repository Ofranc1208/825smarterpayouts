'use client';

interface TwitterCardsProps {
  title: string;
  description: string;
  imageUrl: string;
  site: string;
}

export default function TwitterCards({ title, description, imageUrl, site }: TwitterCardsProps) {
  return (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={site} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title} />
    </>
  );
}
