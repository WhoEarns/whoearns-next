'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function InstagramCalculatorPage() {
  const [followers, setFollowers] = useState(50000)
  const [engRate, setEngRate] = useState(3)
  const [niche, setNiche] = useState('lifestyle')

  const NICHE_MULT: Record<string, number> = {
    finance: 2.5, tech: 2.2, business: 2.0, health: 1.6,
    fashion: 1.4, travel: 1.3, lifestyle: 1.0, food: 0.9, gaming: 0.8,
  }
  const mult = NICHE_MULT[niche] ?? 1
  const baseRate = (followers / 1000) * 10 * mult
  const engBoost = engRate > 3 ? 1 + (engRate - 3) * 0.15 : 1 - (3 - engRate) * 0.1
  const perPost = baseRate * engBoost
  const perStory = perPost * 0.3
  const perReel = perPost * 1.5
  const fmt = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${Math.round(n)}`

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ fontSize: 12, color: 'var(--t3)', marginBottom: 24, fontFamily: 'JetBrains Mono, monospace' }}>
        <Link href="/" style={{ color: 'var(--t3)' }}>WhoEarns</Link> › <Link href="/tools" style={{ color: 'var(--t3)' }}>Tools</Link> › Instagram Earnings Calculator
      </div>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px,5vw,40px)', fontWeight: 800, marginBottom: 8, letterSpacing: '-1px' }}>
        Instagram Earnings Calculator 2026
      </h1>
      <p style={{ color: 'var(--t2)', fontSize: 15, marginBottom: 36, lineHeight: 1.6 }}>
        Estimate what brands pay for Instagram sponsorships based on follower count, engagement rate and niche.
      </p>

      <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px,4vw,36px)', marginBottom: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, marginBottom: 28 }}>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Followers</label>
            <input type="range" min={1000} max={10000000} step={1000} value={followers} onChange={e => setFollowers(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)', marginBottom: 6 }} />
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: 'var(--gold)' }}>
              {followers >= 1000000 ? `${(followers / 1000000).toFixed(1)}M` : `${(followers / 1000).toFixed(0)}K`}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Engagement Rate: {engRate}%</label>
            <input type="range" min={0.5} max={10} step={0.1} value={engRate} onChange={e => setEngRate(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)', marginBottom: 6 }} />
            <div style={{ fontSize: 12, color: engRate >= 3 ? 'var(--green)' : 'var(--t3)' }}>{engRate >= 6 ? 'Excellent' : engRate >= 3 ? 'Good' : 'Below average'}</div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Niche</label>
            <select value={niche} onChange={e => setNiche(e.target.value)} style={{ width: '100%', background: 'var(--s2)', border: '1px solid var(--b2)', borderRadius: 8, padding: '10px 12px', color: 'var(--t1)', fontSize: 13 }}>
              {Object.keys(NICHE_MULT).map(k => <option key={k} value={k}>{k.charAt(0).toUpperCase() + k.slice(1)}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { label: 'Feed Post', value: fmt(perPost), sub: 'per sponsored post' },
            { label: 'Story', value: fmt(perStory), sub: 'per story set' },
            { label: 'Reel', value: fmt(perReel), sub: 'per sponsored reel' },
          ].map(c => (
            <div key={c.label} style={{ background: 'var(--s2)', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--t3)', marginBottom: 6, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>{c.label}</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 800, color: 'var(--gold)' }}>{c.value}</div>
              <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>{c.sub}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 14, textAlign: 'center' }}>
          Industry standard: ~$10/1,000 followers baseline · Adjusted for engagement and niche · Estimates only
        </p>
      </div>

      <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px,4vw,32px)' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>More Calculators</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
          {[
            { title: 'YouTube Earnings', href: '/tools/youtube-earnings-calculator' },
            { title: 'TikTok Earnings', href: '/tools/tiktok-earnings-calculator' },
            { title: 'Newsletter Revenue', href: '/tools/newsletter-revenue-calculator' },
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
