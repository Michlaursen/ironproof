import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://ironproof.ai",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: "https://ironproof.ai",
          fr: "https://ironproof.ai/fr",
        },
      },
    },
    {
      url: "https://ironproof.ai/fr",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: "https://ironproof.ai",
          fr: "https://ironproof.ai/fr",
        },
      },
    },
    {
      url: "https://ironproof.ai/provable-ai",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: "https://ironproof.ai/provable-ai",
          fr: "https://ironproof.ai/fr/provable-ai",
        },
      },
    },
    // A dated research note: lastModified is its publication date, not the
    // build date, so a re-deploy does not claim the analysis changed.
    {
      url: "https://ironproof.ai/research/zero-barriers-one-reviewer",
      lastModified: new Date("2026-09-08"),
      changeFrequency: "yearly",
      priority: 0.7,
      alternates: {
        languages: {
          en: "https://ironproof.ai/research/zero-barriers-one-reviewer",
          fr: "https://ironproof.ai/fr/research/zero-barriers-one-reviewer",
        },
      },
    },
  ];
}
