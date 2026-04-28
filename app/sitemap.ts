import type { MetadataRoute } from "next";
import { getAllTerms } from "@/lib/sanity";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const terms = await getAllTerms();

  const termEntries: MetadataRoute.Sitemap = terms.map((term) => ({
    url: `https://theaiclarity.com/term/${term.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://theaiclarity.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...termEntries,
  ];
}
