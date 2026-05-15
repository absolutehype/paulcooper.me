import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://paulcooper.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages: Record<string, string> = { "x-default": SITE_URL };
  for (const l of routing.locales) {
    languages[l] = l === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${l}`;
  }

  return routing.locales.map((locale) => {
    const url =
      locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`;
    return {
      url,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: locale === routing.defaultLocale ? 1 : 0.8,
      alternates: { languages },
    };
  });
}
