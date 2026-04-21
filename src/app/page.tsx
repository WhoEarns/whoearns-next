import type { Metadata } from 'next'
import { getAllProfiles, getActivityFeed, getCategories } from '@/lib/supabase'
import HomepageClient from '@/components/HomepageClient'

export const metadata: Metadata = {
  title: 'WhoEarns — Net Worth, Revenue and Career Stats',
  description: 'Net worth, monthly revenue and career earnings for footballers, creators, tech giants and AI startups. The numbers people actually want to see.',
  alternates: { canonical: 'https://whoearns.com' },
}

// Revalidate homepage data every hour
export const revalidate = 3600

export default async function HomePage() {
  // All data fetched server-side at build/revalidation time
  const [profiles, feed, categories] = await Promise.all([
    getAllProfiles(),
    getActivityFeed(),
    getCategories(),
  ])

  return (
    <>
      {/* JSON-LD for homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'WhoEarns',
          url: 'https://whoearns.com',
          description: 'Net worth, revenue and career stats for footballers, creators, tech giants and AI startups.',
          potentialAction: {
            '@type': 'SearchAction',
            target: { '@type': 'EntryPoint', urlTemplate: 'https://whoearns.com/search?q={search_term_string}' },
            'query-input': 'required name=search_term_string',
          },
        })}}
      />

      {/* Pass server data to client component */}
      <HomepageClient
        profiles={profiles}
        feed={feed}
        categories={categories}
      />
    </>
  )
}
