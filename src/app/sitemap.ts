import type { MetadataRoute } from 'next'
import { getAllProfiles } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profiles = await getAllProfiles()

  const profileUrls: MetadataRoute.Sitemap = profiles.map(p => ({
    url: `https://whoearns.com/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly',
    priority: p.rank_order <= 20 ? 0.9 : 0.7,
  }))

  return [
    {
      url: 'https://whoearns.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://whoearns.com/footballers',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://whoearns.com/tech',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://whoearns.com/ai',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://whoearns.com/creators',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...profileUrls,
  ]
}
