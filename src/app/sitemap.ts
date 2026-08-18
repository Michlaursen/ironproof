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
  ];
}
