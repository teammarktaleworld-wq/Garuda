import type { MetadataRoute } from "next";
import { SHOWROOM_SLUGS } from "./config/showrooms";

const BASE_URL = "https://tatamotors-delhi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    ...SHOWROOM_SLUGS.map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}