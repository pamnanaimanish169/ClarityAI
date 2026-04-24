import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ejsxjafz",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2024-01-01",
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AiTerm = {
  _id: string;
  title: string;
  slug: { current: string };
  category?: string;
  description: string;
  whatItMeans?: string;
  realWorldAnalogy?: string;
  commonMisconception?: string;
  relatedTermsTags?: string[];
};

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

const TERM_FIELDS = `
  _id,
  title,
  slug,
  category,
  description,
  whatItMeans,
  realWorldAnalogy,
  commonMisconception,
  relatedTermsTags
`;

/**
 * Search AI terms by a raw keyword against title and slug.
 */
export async function searchTerms(query: string): Promise<AiTerm[]> {
  if (!query.trim()) return [];

  return sanityClient.fetch<AiTerm[]>(
    `*[_type == "aiTerm" && (
      title match $q ||
      slug.current match $q
    )] | order(title asc) [0...30] { ${TERM_FIELDS} }`,
    { q: `${query.trim()}*` }
  );
}

/**
 * Fetch all published AI terms, ordered alphabetically.
 */
export async function getAllTerms(): Promise<AiTerm[]> {
  return sanityClient.fetch<AiTerm[]>(
    `*[_type == "aiTerm"] | order(title asc) { ${TERM_FIELDS} }`
  );
}

/**
 * Fetch a single AI term by its slug for the detail page.
 */
export async function getTermBySlug(slug: string): Promise<AiTerm | null> {
  return sanityClient.fetch<AiTerm | null>(
    `*[_type == "aiTerm" && slug.current == $slug][0] { ${TERM_FIELDS} }`,
    { slug }
  );
}
