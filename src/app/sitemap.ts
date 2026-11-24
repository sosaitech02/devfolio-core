import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllProjectSlugs } from "@/lib/projects";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://devfolio-core.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllProjectSlugs();

  const homeEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    changeFrequency: "weekly",
    priority: 1,
    alternates: {
      languages: {
        es: `${siteUrl}/es`,
        en: `${siteUrl}/en`,
      },
    },
  }));

  const catalogEntries: MetadataRoute.Sitemap = routing.locales.map(
    (locale) => ({
      url: `${siteUrl}/${locale}/projects`,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          es: `${siteUrl}/es/projects`,
          en: `${siteUrl}/en/projects`,
        },
      },
    })
  );

  const projectEntries: MetadataRoute.Sitemap = slugs.flatMap((slug) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}/projects/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          es: `${siteUrl}/es/projects/${slug}`,
          en: `${siteUrl}/en/projects/${slug}`,
        },
      },
    }))
  );

  return [...homeEntries, ...catalogEntries, ...projectEntries];
}
