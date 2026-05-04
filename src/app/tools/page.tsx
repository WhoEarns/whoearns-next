import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Creator Earnings Calculators 2026 — YouTube, Instagram, TikTok, Newsletter | WhoEarns',
  description: 'Free creator earnings calculators. Estimate YouTube AdSense revenue, Instagram sponsorship rates, TikTok creator fund earnings and newsletter revenue based on real 2026 data.',
}

const TOOLS = [
  {
    title: 'YouTube Earnings Calculator',
    href: '/tools/youtube-earnings-calculator',
    desc: 'How much does a YouTube channel make? Estimate AdSense revenue from monthly views, niche and audience location.',
    stats: ['CPM by niche', 'Country rates', 'Full breakdown'],
    emoji: '▶️',
    searchVolume: 'High',
  },
  {
    title: 'Instagram Sponsored Post Calculator',
    href: '/tools/instagram-earnings-calculator',
    desc: 'How much do brands pay for Instagram sponsorships? Rates by follower count, engagement rate and niche.',
    stats: ['Feed posts', 'Stories', 'Reels'],
    emoji: '📸',
    searchVolume: 'High',
  },
  {
    title: 'TikTok Earnings Calculator',
    href: '/tools/tiktok-earnings-calculator',
    desc: 'TikTok Creator Fund pays almost nothing. Find out what brand deals are actually worth for your account size.',
    stats: ['Creator Fund', 'Brand deals', 'Live gifts'],
    emoji: '🎵',
    searchVolume: 'Very High',
  },
  {
    title: 'Newsletter Revenue Calculator',
    href: '/tools/newsletter-revenue-calculator',
    desc: 'Calculate newsletter income from sponsorships and paid subscriptions. Based on real CPM and conversion data.',
    stats: ['Sponsorship CPM', 'Paid tier', 'Open rate impact'],
    emoji: '📧',
    searchVolume: 'Medium',
  },
  {
    title: 'Podcast Sponsorship Calculator',
    href: '/tools/podcast-earnings-calculator',
    desc: 'How much do podcasts earn from sponsorships? CPM rates by download count and category.',
    stats: ['Host-read CPM', 'Downloads → revenue', 'Niche rates'],
    emoji: '🎙️',
    searchVolume: 'Medium',
  },
  {
    title: 'OnlyFans Earnings Calculator',
    href: '/tools/onlyfans-earnings-calculator',
    desc: 'Estimate OnlyFans creator revenue from subscribers, tips and pay-per-view content.',
    stats: ['Sub count', 'PPV', 'Tips'],
    emoji: '💰',
    searchVolume: 'Very High',
  },
]

export default function ToolsPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>

      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 16 }}>
          FREE TOOLS
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-1px' }}>
          Creator Earnings Calculators
        </h1>
        <p style={{ color: 'var(--t2)', fontSize: 16, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
          How much does a YouTube channel with 1 million views make? What do brands pay for Instagram posts? Find out with real 2026 data.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {TOOLS.map(tool => (
          <Link key={tool.href} href={tool.href} style={{ display: 'block', textDecoration: 'none', background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: '24px', transition: 'border-color 0.2s', cursor: 'pointer' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{tool.emoji}</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: 'var(--t1)', marginBottom: 10 }}>
              {tool.title}
            </h2>
            <p style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.6, marginBottom: 16 }}>{tool.desc}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {tool.stats.map(s => (
                <span key={s} style={{ fontSize: 11, padding: '3px 10px', background: 'var(--s2)', borderRadius: 100, color: 'var(--t3)', fontFamily: 'JetBrains Mono, monospace' }}>{s}</span>
              ))}
            </div>
            <div style={{ marginTop: 16, fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>
              Try calculator →
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 64, background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: '32px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
          See Real Creator Earnings
        </h2>
        <p style={{ color: 'var(--t2)', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
          Don&apos;t just estimate — browse verified and researched earnings data for 400+ real creators, athletes and founders.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/category/creators" style={{ padding: '12px 24px', background: 'var(--gold)', color: '#000', borderRadius: 100, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            Browse Creators
          </Link>
          <Link href="/category/startup-mrr" style={{ padding: '12px 24px', background: 'var(--s2)', color: 'var(--t1)', borderRadius: 100, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
            Startup Revenue
          </Link>
        </div>
      </div>

    </div>
  )
}
