// Site-wide configuration
export const siteConfig = {};

// Good Reads — curated content you recommend.
// Empty until you commit real picks. The /reads page and homepage feed both
// hide the section when this list is empty.
export interface GoodRead {
  title: string;
  url: string;
  source: string;
  description: string;
  category: string;
}

export const goodReads: GoodRead[] = [];
