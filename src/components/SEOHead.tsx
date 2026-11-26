import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

export default function SEOHead({
  title = "SuperIC: an AI lab for Australian e-commerce",
  description = "An open AI lab for Australian e-commerce operators. We test AI systems on real brands, log what we learn, and teach you to build them. Built in Melbourne.",
  ogImage,
  ogType = "website",
  canonical,
}: SEOHeadProps) {
  const fullTitle = title.includes("Super Eye See") || title.includes("SuperIC") ? title : `${title} — Super Eye See (IC)`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonical && <meta property="og:url" content={canonical} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
}
