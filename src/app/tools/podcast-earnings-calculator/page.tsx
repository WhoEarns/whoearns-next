'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function PodcastCalculatorPage() {
  const [downloads, setDownloads] = useState(10000)
  const [niche, setNiche] = useState('business')
  const [episodes, setEpisodes] = useState(4)

  const CPM: Record<string, number> = {
    business: 35, finance: 40, tech: 32, health: 28,
    true_crime: 22, comedy: 18, sports: 20, news: 25, education: 28,
  }
  const cpm = CPM[niche] ?? 25

  // Standard: pre-roll $18, mid-roll $25, post-roll $10 — use blended CPM
  const perEpisode = (downloads / 1000) * cpm
  const monthly = perEpisode * episodes
  const annual = monthly * 12

  const fmt = (n: number) => {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`
    return `$${Math.round(n)}`
  }

  const nicheLabels: Record<string, string> = {
    business: 'Business', finance: 'Finance & Investing', tech: 'Technology',
    health: 'Health & Wellness', true_crime: 'True Crime', comedy: 'Comedy',
    sports: 'Sports', news: 'News & Politics', education: 'Education',
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ fontSize: 12, color: 'var(--t3)', marginBottom: 24, fontFamily: 'JetBrains Mono, monospace' }}>
        <Link href="/" style={{ color: 'var(--t3)' }}>WhoEarns</Link>
        {' › '}<Link href="/tools" style={{ color: 'var(--t3)' }}>Tools</Link>
        {' › '}Podcast Earnings Calculator
      </div>

      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px,5vw,40px)', fontWeight: 800, marginBottom: 8, letterSpacing: '-1px' }}>
        Podcast Sponsorship Calculator 2026
      </h1>
      <p style={{ color: 'var(--t2)', fontSize: 15, marginBottom: 36, lineHeight: 1.6 }}>
        Estimate podcast sponsorship revenue based on downloads per episode, niche and publishing frequency. Based on real 2026 CPM rates.
      </p>

      <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px,4vw,36px)', marginBottom: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, marginBottom: 28 }}>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Downloads Per Episode</label>
            <input type="range" min={500} max={1000000} step={500} value={downloads} onChange={e => setDownloads(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)', marginBottom: 6 }} />
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: 'var(--gold)' }}>
              {downloads >= 1000000 ? `${(downloads/1000000).toFixed(1)}M` : downloads >= 1000 ? `${(downloads/1000).toFixed(0)}K` : downloads}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Niche / Category</label>
            <select value={niche} onChange={e => setNiche(e.target.value)} style={{ width: '100%', background: 'var(--s2)', border: '1px solid var(--b2)', borderRadius: 8, padding: '10px 12px', color: 'var(--t1)', fontSize: 13 }}>
              {Object.entries(nicheLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <div style={{ fontSize: 12, color: 'var(--t3)', marginTop: 6 }}>CPM rate: <span style={{ color: 'var(--gold)' }}>${cpm}/1,000 downloads</span></div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Episodes Per Month: {episodes}</label>
            <input type="range" min={1} max={20} step={1} value={episodes} onChange={e => setEpisodes(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)', marginBottom: 6 }} />
            <div style={{ fontSize: 12, color: 'var(--t3)' }}>{episodes} episode{episodes !== 1 ? 's' : ''}/month</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { label: 'Per Episode', value: fmt(perEpisode), sub: 'per sponsored episode' },
            { label: 'Monthly', value: fmt(monthly), sub: `${episodes} episodes/mo` },
            { label: 'Annual', value: fmt(annual), sub: 'estimated yearly' },
          ].map((c, i) => (
            <div key={c.label} style={{ background: i === 1 ? 'rgba(242,180,32,0.1)' : 'var(--s2)', border: i === 1 ? '1px solid rgba(242,180,32,0.3)' : 'none', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: i === 1 ? 'var(--gold)' : 'var(--t3)', marginBottom: 6, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>{c.label}</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 800, color: i === 1 ? 'var(--gold)' : 'var(--t1)' }}>{c.value}</div>
              <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>{c.sub}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 14, textAlign: 'center' }}>
          Blended CPM across pre-roll, mid-roll and post-roll · Typically 1–2 sponsors per episode · Estimates only
        </p>
      </div>

      {/* CPM table */}
      <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px,4vw,32px)', marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Podcast CPM Rates by Niche — 2026</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--b1)' }}>
                {['Niche', 'CPM Rate', 'Why'].map(h => (
                  <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--t3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Finance & Investing', '$35–$45', 'High-value audience — brokerages and fintech pay top dollar'],
                ['Business', '$30–$40', 'B2B software and services targeting entrepreneurs'],
                ['Technology', '$28–$35', 'Developer and tech professional audience'],
                ['Health & Wellness', '$24–$32', 'Supplement and wellness brand spend'],
                ['Education', '$24–$30', 'Course and EdTech advertising'],
                ['True Crime', '$18–$25', 'Mass audience but lower advertiser intent'],
                ['Comedy', '$15–$22', 'Entertainment-first, less advertiser targeting'],
                ['Sports', '$18–$24', 'Strong but seasonal advertiser demand'],
              ].map(([n, cpm, why]) => (
                <tr key={n as string} style={{ borderBottom: '1px solid var(--b1)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600 }}>{n}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--gold)', fontFamily: 'JetBrains Mono, monospace' }}>{cpm}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--t3)', fontSize: 12 }}>{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real examples with internal links */}
      <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px,4vw,32px)', marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Top Podcast Earners</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {[
            { name: 'Joe Rogan', slug: 'joe-rogan', detail: '$250M Spotify deal · 11M+ listeners per episode', est: '$50M+/yr' },
            { name: 'Howard Stern', slug: 'howard-stern', detail: '$500M+ lifetime SiriusXM contracts', est: '$90M+/yr' },
            { name: 'Alex Cooper', slug: 'alex-cooper', detail: 'Call Her Daddy · $60M SiriusXM deal', est: '$20M+/yr' },
            { name: 'Mr Beast', slug: 'mrbeast', detail: 'Beast Reacts podcast growing rapidly', est: 'Supplemental' },
          ].map(p => (
            <Link key={p.slug} href={`/${p.slug}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'var(--s2)', borderRadius: 10, textDecoration: 'none' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--t1)', fontSize: 14 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--t3)', marginTop: 2 }}>{p.detail}</div>
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--gold)', fontSize: 15 }}>{p.est}</div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px,4vw,32px)' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>More Calculators</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
          {[
            { title: 'YouTube Earnings', href: '/tools/youtube-earnings-calculator' },
            { title: 'Instagram Earnings', href: '/tools/instagram-earnings-calculator' },
            { title: 'TikTok Earnings', href: '/tools/tiktok-earnings-calculator' },
            { title: 'Newsletter Revenue', href: '/tools/newsletter-revenue-calculator' },
            { title: 'OnlyFans Earnings', href: '/tools/onlyfans-earnings-calculator' },
          ].map(t => (
            <Link key={t.href} href={t.href} style={{ display: 'block', padding: '14px', background: 'var(--s2)', borderRadius: 10, textDecoration: 'none', fontSize: 13, fontWeight: 600, color: 'var(--t1)' }}>
              {t.title} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
