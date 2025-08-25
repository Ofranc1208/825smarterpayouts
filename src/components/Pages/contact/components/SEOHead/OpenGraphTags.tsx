'use client';

interface OpenGraphTagsProps {
  title: string;
  description: string;
  url: string;
  siteName: string;
  imageUrl: string;
}

export default function OpenGraphTags({ 
  title, 
  description, 
  url, 
  siteName, 
  imageUrl 
}: OpenGraphTagsProps) {
  return (
    <>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_US" />
    </>
  );
}
