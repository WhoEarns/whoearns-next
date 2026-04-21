import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://whoearns.com'),
  title: {
    default: 'WhoEarns — Net Worth, Revenue and Career Stats',
    template: '%s · WhoEarns',
  },
  description:
    'Net worth, monthly revenue and career earnings for footballers, creators, tech giants and AI startups. The numbers people actually want to see.',
  keywords: [
    'net worth', 'revenue', 'career stats', 'footballer net worth',
    'celebrity net worth', 'AI startup revenue', 'tech billionaire wealth',
    'who earns what', 'WhoEarns',
  ],
  authors: [{ name: 'WhoEarns', url: 'https://whoearns.com' }],
  creator: 'WhoEarns',
  publisher: 'WhoEarns',
  openGraph: {
    type: 'website',
    siteName: 'WhoEarns',
    title: 'WhoEarns — Net Worth, Revenue and Career Stats',
    description:
      'The numbers people actually want to see. Net worth and career stats for footballers, creators, tech giants and AI startups.',
    url: 'https://whoearns.com',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WhoEarns' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@WhoEarns',
    creator: '@WhoEarns',
    title: 'WhoEarns — Net Worth, Revenue and Career Stats',
    description: 'The numbers people actually want to see.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://whoearns.com',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='12' fill='%2309090b'/><text y='.9em' font-size='80' font-family='Georgia,serif' fill='%23f2b420'>W</text></svg>",
  },
  verification: {
    // google: 'your-google-verification-code', // Add after setting up Search Console
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
