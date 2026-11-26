// Instagram companion content.
// Each item is a social post that pairs with something on the site —
// usually a blog post (set `postSlug`) or a project.
// Items can also be managed in the CMS (`socialPost` documents); both
// sources are merged on /social.

export type SocialItem = {
  /** Permalink to the Instagram post/reel */
  url: string;
  /** Short title shown on the card */
  title: string;
  /** Caption / what the post covers */
  caption?: string;
  /** reel | carousel | post */
  format?: "reel" | "carousel" | "post";
  /** Thumbnail image URL (screenshot or export of the post) */
  thumbnail?: string;
  /** Slug of the companion blog post, if any */
  postSlug?: string;
  /** ISO date */
  date?: string;
};

export const INSTAGRAM_HANDLE = "supereyesee";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

// Add real posts here (or in the CMS). Empty until content is published.
export const socialPosts: SocialItem[] = [];
