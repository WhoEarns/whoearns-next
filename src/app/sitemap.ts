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
    // Category pages
    ...['footballers','basketball','singers','actors','creators',
        'tech-founders','politicians','athletes',
        'ai-startups','tech-giants','startup-mrr','indie-founders'].map(key => ({
      url: `https://whoearns.com/category/${key}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...profileUrls,
  ]
}
