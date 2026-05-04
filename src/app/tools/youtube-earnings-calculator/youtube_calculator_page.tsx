'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function YouTubeCalculatorPage() {
  const [views, setViews] = useState(1000000)
  const [niche, setNiche] = useState('general')
  const [country, setCountry] = useState('us')

  const CPM_RATES: Record<string, Record<string, number>> = {
    us: { finance: 22, tech: 18, business: 16, health: 12, gaming: 4, entertainment: 5, general: 7 },
    uk: { finance: 18, tech: 14, business: 13, health: 10, gaming: 3, entertainment: 4, general: 6 },
    ca: { finance: 16, tech: 13, business: 12, health: 9, gaming: 3, entertainment: 4, general: 5 },
    au: { finance: 15, tech: 12, business: 11, health: 8, gaming: 3, entertainment: 4, general: 5 },
    in: { finance: 3, tech: 2.5, business: 2, health: 1.5, gaming: 0.8, entertainment: 1, general: 1.2 },
    other: { finance: 5, tech: 4, business: 3.5, health: 3, gaming: 1.5, entertainment: 2, general: 2.5 },
  }

  const cpm = CPM_RATES[country]?.[niche] ?? 5
  // YouTube takes 45%, creator gets 55% of ad revenue
  // Only ~40-60% of views are monetised
  const monetisedViews = views * 0.5
  const grossRevenue = (monetisedViews / 1000) * cpm
  const creatorRevenue = grossRevenue * 0.55
  const monthlyLow = creatorRevenue * 0.7
  const monthlyHigh = creatorRevenue * 1.4

  const formatMoney = (n: number) => {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `$${Math.round(n / 100) * 100 >= 1000 ? (n / 1000).toFixed(1) + 'K' : Math.round(n).toLocaleString()}`
    return `$${Math.round(n).toLocaleString()}`
  }

  const nicheLabels: Record<string, string> = {
    finance: 'Finance & Investing', tech: 'Technology', business: 'Business & Entrepreneurship',
    health: 'Health & Wellness', gaming: 'Gaming', entertainment: 'Entertainment & Vlogs', general: 'General / Mixed',
  }
  const countryLabels: Record<string, string> = {
    us: '🇺🇸 United States', uk: '🇬🇧 United Kingdom', ca: '🇨🇦 Canada',
    au: '🇦🇺 Australia', in: '🇮🇳 India', other: '🌍 Other',
  }

  return (
    <>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 12, color: 'var(--t3)', marginBottom: 24, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.5px' }}>
          <Link href="/" style={{ color: 'var(--t3)' }}>WhoEarns</Link>
          {' › '}
          <Link href="/tools" style={{ color: 'var(--t3)' }}>Tools</Link>
          {' › YouTube Earnings Calculator'}
        </div>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, marginBottom: 8, letterSpacing: '-1px' }}>
          YouTube Earnings Calculator 2026
        </h1>
        <p style={{ color: 'var(--t2)', fontSize: 15, marginBottom: 40, lineHeight: 1.6 }}>
          Estimate how much a YouTube channel earns from AdSense based on monthly views, niche and audience location. Based on real CPM data from 2026.
        </p>

        {/* Calculator */}
        <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px, 4vw, 36px)', marginBottom: 32 }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 32 }}>

            {/* Monthly Views */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 10 }}>
                Monthly Views
              </label>
              <input
                type="range" min={10000} max={100000000} step={10000}
                value={views}
                onChange={e => setViews(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--gold)', marginBottom: 8 }}
              />
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: 'var(--gold)' }}>
                {views >= 1000000 ? `${(views / 1000000).toFixed(1)}M` : `${(views / 1000).toFixed(0)}K`} views/mo
              </div>
            </div>

            {/* Niche */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 10 }}>
                Channel Niche
              </label>
              <select
                value={niche}
                onChange={e => setNiche(e.target.value)}
                style={{ width: '100%', background: 'var(--s2)', border: '1px solid var(--b2)', borderRadius: 8, padding: '10px 12px', color: 'var(--t1)', fontSize: 14, cursor: 'pointer' }}
              >
                {Object.entries(nicheLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <div style={{ fontSize: 12, color: 'var(--t3)', marginTop: 8 }}>CPM rate: <span style={{ color: 'var(--gold)' }}>${cpm}/1,000 views</span></div>
            </div>

            {/* Country */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 10 }}>
                Primary Audience
              </label>
              <select
                value={country}
                onChange={e => setCountry(e.target.value)}
                style={{ width: '100%', background: 'var(--s2)', border: '1px solid var(--b2)', borderRadius: 8, padding: '10px 12px', color: 'var(--t1)', fontSize: 14, cursor: 'pointer' }}
              >
                {Object.entries(countryLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>

          {/* Results */}
          <div style={{ borderTop: '1px solid var(--b1)', paddingTop: 28 }}>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 20 }}>
              Estimated Monthly AdSense Earnings
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <div style={{ background: 'var(--s2)', borderRadius: 12, padding: '18px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 8 }}>Low estimate</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 800, color: 'var(--t2)' }}>{formatMoney(monthlyLow)}</div>
              </div>
              <div style={{ background: 'rgba(242, 180, 32, 0.1)', border: '1px solid rgba(242, 180, 32, 0.3)', borderRadius: 12, padding: '18px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--gold)', marginBottom: 8 }}>Mid estimate</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 800, color: 'var(--gold)' }}>{formatMoney(creatorRevenue)}</div>
              </div>
              <div style={{ background: 'var(--s2)', borderRadius: 12, padding: '18px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 8 }}>High estimate</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 800, color: 'var(--t2)' }}>{formatMoney(monthlyHigh)}</div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: 'var(--t3)', marginTop: 16, textAlign: 'center' }}>
              AdSense only · YouTube takes 45% · ~50% of views are monetised · Excludes sponsorships, memberships, merchandise
            </p>
          </div>
        </div>

        {/* Revenue breakdown */}
        <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px, 4vw, 32px)', marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            Full Revenue Breakdown — What YouTube Channels Actually Earn
          </h2>
          <p style={{ color: 'var(--t2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
            AdSense is typically only 30–50% of a YouTube creator's total income. The full picture:
          </p>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { source: 'AdSense (ads)', pct: '30–50%', note: 'Based on CPM × monetised views × 55% creator share' },
              { source: 'Sponsorships', pct: '20–40%', note: `Typically $20–$50 per 1,000 views for mid-size channels. At ${(views/1000).toFixed(0)}K views: ${formatMoney(views * 0.001 * 25)}–${formatMoney(views * 0.001 * 50)} per integration` },
              { source: 'Affiliate links', pct: '5–20%', note: 'Depends heavily on niche. Finance/software affiliates pay $50–$200+ per conversion' },
              { source: 'Channel memberships', pct: '2–10%', note: 'YouTube Members paying $4.99–$29.99/month. Typically 0.5–2% of subscribers' },
              { source: 'Merchandise', pct: '1–5%', note: 'Usually only meaningful above 500K subscribers' },
            ].map(row => (
              <div key={row.source} style={{ display: 'flex', gap: 16, padding: '12px 16px', background: 'var(--s2)', borderRadius: 10, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 160, fontWeight: 600, fontSize: 13, color: 'var(--t1)' }}>{row.source}</div>
                <div style={{ color: 'var(--gold)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, minWidth: 60 }}>{row.pct}</div>
                <div style={{ fontSize: 12, color: 'var(--t3)', flex: 1 }}>{row.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CPM table */}
        <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px, 4vw, 32px)', marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            YouTube CPM Rates by Niche — 2026
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--b1)' }}>
                  {['Niche', 'US CPM', 'UK CPM', 'India CPM', 'Why high/low'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--t3)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Finance & Investing', '$18–$30', '$14–$22', '$2–$4', 'Advertisers pay most per click — high purchase intent'],
                  ['Technology', '$12–$22', '$10–$16', '$1.5–$3', 'Software ads, B2B targeting premium'],
                  ['Business', '$10–$18', '$9–$14', '$1.5–$3', 'B2B advertising, high-value audience'],
                  ['Health & Wellness', '$8–$14', '$7–$12', '$1–$2', 'Supplement and pharma ad spend'],
                  ['Gaming', '$3–$6', '$2.5–$5', '$0.5–$1.2', 'Young audience, low advertiser intent'],
                  ['Entertainment/Vlogs', '$4–$8', '$3–$6', '$0.8–$1.5', 'General audience, lower purchase intent'],
                ].map(([niche, us, uk, india, why]) => (
                  <tr key={niche as string} style={{ borderBottom: '1px solid var(--b1)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600 }}>{niche}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--gold)', fontFamily: 'JetBrains Mono, monospace' }}>{us}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--t2)', fontFamily: 'JetBrains Mono, monospace' }}>{uk}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--t3)', fontFamily: 'JetBrains Mono, monospace' }}>{india}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--t3)', fontSize: 12 }}>{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real examples */}
        <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px, 4vw, 32px)', marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            Real Creator Earnings — How Much Do They Actually Make?
          </h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { name: 'MrBeast', slug: 'mrbeast', subs: '330M', est: '$80M+/yr', note: 'YouTube + Feastables + sponsorships' },
              { name: 'Mark Rober', slug: 'mark-rober', subs: '50M', est: '$15M+/yr', note: 'CrunchLabs + sponsorships + AdSense' },
              { name: 'PewDiePie', slug: 'pewdiepie', subs: '111M', est: '$15M+/yr', note: 'Semi-retired — Tsuki brand + legacy income' },
              { name: 'KSI', slug: 'ksi', subs: '24M', est: '$12M+/yr', note: 'Prime Hydration is the real money' },
              { name: 'Łatwogang', slug: 'latogang', subs: '2M+', est: 'Record breaker', note: '$70M raised for charity in 9 days' },
            ].map(c => (
              <Link key={c.slug} href={`/${c.slug}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'var(--s2)', borderRadius: 10, textDecoration: 'none', transition: 'opacity 0.15s' }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--t1)', fontSize: 14 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--t3)', marginTop: 3 }}>{c.subs} subscribers · {c.note}</div>
                </div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--gold)', fontSize: 16 }}>{c.est}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* More tools */}
        <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px, 4vw, 32px)' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>More Earnings Calculators</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { title: 'Instagram Earnings', href: '/tools/instagram-earnings-calculator', desc: 'Sponsored post rates by follower count' },
              { title: 'TikTok Earnings', href: '/tools/tiktok-earnings-calculator', desc: 'Creator Fund + brand deals' },
              { title: 'Newsletter Revenue', href: '/tools/newsletter-revenue-calculator', desc: 'Subscription + sponsorship income' },
              { title: 'Podcast Earnings', href: '/tools/podcast-earnings-calculator', desc: 'Sponsorships by download count' },
            ].map(t => (
              <Link key={t.href} href={t.href} style={{ display: 'block', padding: '16px', background: 'var(--s2)', borderRadius: 10, textDecoration: 'none', transition: 'opacity 0.15s' }}>
                <div style={{ fontWeight: 600, color: 'var(--t1)', fontSize: 13, marginBottom: 6 }}>{t.title}</div>
                <div style={{ fontSize: 12, color: 'var(--t3)' }}>{t.desc}</div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
