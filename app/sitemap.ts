import type { MetadataRoute } from 'next'
import { getAllTourSlugs } from '@/lib/sanity/queries'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deconilalmundo.es'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/aviso-legal`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteUrl}/privacidad`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteUrl}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  let tourRoutes: MetadataRoute.Sitemap = []
  try {
    const slugs = await getAllTourSlugs()
    tourRoutes = slugs.map((slug) => ({
      url: `${siteUrl}/viajes/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch {
    /* sitemap still valid with static routes only */
  }

  return [...staticRoutes, ...tourRoutes]
}
