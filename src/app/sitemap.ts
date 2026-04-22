import type { MetadataRoute } from 'next'
import { getAllProfiles } from '@/lib/supabase'
import { BLOG_POSTS } from '@/lib/blog'

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
    // Blog posts
    { url: 'https://whoearns.com/blog', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    ...Object.values(BLOG_POSTS).map(post => ({
      url: `https://whoearns.com/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...profileUrls,
  ]
}
