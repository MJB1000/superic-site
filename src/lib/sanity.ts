import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "qs95bq7w",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

const builder = imageUrlBuilder(sanityClient);

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ Queries
export const queries = {
  latestPosts: (start = 0, end = 10) =>
    `*[_type == "post"] | order(publishedAt desc) [${start}...${end}] {
      _id, title, "slug": slug.current, excerpt, publishedAt, heroImage, entryAnimation,
      categories[]->{ title, "slug": slug.current, color },
      author->{ name, avatar }
    }`,

  featuredPosts: `*[_type == "post"] | order(publishedAt desc) [0...4] {
    _id, title, "slug": slug.current, excerpt, publishedAt, heroImage, entryAnimation,
    categories[]->{ title, "slug": slug.current, color },
    author->{ name, avatar }
  }`,

  singlePost: `*[_type == "post" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, excerpt, publishedAt, heroImage, body, seo,
    entryAnimation, heroAnimation, thesis,
    categories[]->{ _id, title, "slug": slug.current, color },
    author->{ name, avatar, bio, role, social }
  }`,

  postsByCategory: `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, publishedAt, heroImage, entryAnimation,
    categories[]->{ title, "slug": slug.current, color },
    author->{ name, avatar }
  }`,

  category: `*[_type == "category" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, description, color
  }`,

  allCategories: `*[_type == "category"] | order(title asc) {
    _id, title, "slug": slug.current, color
  }`,

  siteSettings: `*[_type == "siteSettings"][0]`,

  totalPosts: `count(*[_type == "post"])`,

  labProjects: `*[_type == "labProject"] | order(displayOrder asc) {
    title, "slug": slug.current, url, previewEnabled, description, status, techStack, thumbnail, displayOrder
  }`,

  tools: `*[_type == "tool"] | order(displayOrder asc, title asc) {
    title, "slug": slug.current, url, description, category, language, tags, displayOrder
  }`,

  socialPosts: `*[_type == "socialPost"] | order(coalesce(date, _createdAt) desc) {
    title, url, caption, format, date,
    "thumbnail": thumbnail.asset->url,
    "postSlug": coalesce(post->slug.current, postSlug)
  }`,
};
