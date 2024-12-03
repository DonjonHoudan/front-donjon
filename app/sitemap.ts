import { MetadataRoute } from "next";
import { getPageActualites } from "@/lib/api/resources/actualites";
import { getPageProgrammation } from "@/lib/api/resources/programmations";

type Sitemap = {
  url: string;
  lastModified: Date;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticSitemap: Sitemap[] = [
    {
      url: "https://www.ledonjondehoudan.fr",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.ledonjondehoudan.fr/le-donjon",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.ledonjondehoudan.fr/programmation",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.ledonjondehoudan.fr/preparez-votre-visite",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.ledonjondehoudan.fr/actualites",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.ledonjondehoudan.fr/contact",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];

  const sitemapActualites: Sitemap[] = [];
  const actualites = await getPageActualites();
  if (actualites) {
    for (const actualite of actualites.articles.data) {
      sitemapActualites.push({
        url: `https://www.ledonjondehoudan.fr/actualites/${actualite.attributes.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  const sitemapProgrammation: Sitemap[] = [];
  const programmations = await getPageProgrammation();
  if (programmations) {
    for (const programmation of programmations) {
      sitemapProgrammation.push({
        url: `https://www.ledonjondehoudan.fr/programmation/${programmation.attributes.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  return [...staticSitemap, ...sitemapActualites, ...sitemapProgrammation]; 
}
