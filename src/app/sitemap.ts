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
    {
      url: "https://ironproof.ai/proof",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: "https://ironproof.ai/proof",
          fr: "https://ironproof.ai/fr/proof",
        },
      },
    },
    {
      url: "https://ironproof.ai/verify",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: "https://ironproof.ai/verify",
          fr: "https://ironproof.ai/fr/verify",
        },
      },
    },
    // The research index is English only, like the notes it lists.
    {
      url: "https://ironproof.ai/research",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // A dated research note: lastModified is its publication date, not the
    // build date, so a re-deploy does not claim the analysis changed. English
    // only for now — the French is written but not native-reviewed, so /fr
    // serves the English note and is not advertised as a French alternate.
    {
      url: "https://ironproof.ai/research/zero-barriers-one-reviewer",
      lastModified: new Date("2026-09-08"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
