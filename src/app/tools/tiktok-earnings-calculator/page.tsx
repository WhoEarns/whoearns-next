'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function TikTokCalculatorPage() {
  const [followers, setFollowers] = useState(100000)
  const [views, setViews] = useState(500000)
  const [niche, setNiche] = useState('entertainment')

  const BRAND_DEAL: Record<string, number> = {
    finance: 30, tech: 25, health: 18, beauty: 15, fitness: 14,
    food: 10, entertainment: 8, gaming: 7, comedy: 7,
  }
  const brandRate = BRAND_DEAL[niche] ?? 10
  const creatorFund = (views / 1000) * 0.03
  const brandDeal = (followers / 1000) * brandRate
  const total = creatorFund + brandDeal
  const fmt = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${Math.round(n)}`

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ fontSize: 12, color: 'var(--t3)', marginBottom: 24, fontFamily: 'JetBrains Mono, monospace' }}>
        <Link href="/" style={{ color: 'var(--t3)' }}>WhoEarns</Link> › <Link href="/tools" style={{ color: 'var(--t3)' }}>Tools</Link> › TikTok Earnings Calculator
      </div>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px,5vw,40px)', fontWeight: 800, marginBottom: 8, letterSpacing: '-1px' }}>
        TikTok Earnings Calculator 2026
      </h1>
      <p style={{ color: 'var(--t2)', fontSize: 15, marginBottom: 36, lineHeight: 1.6 }}>
        TikTok Creator Fund pays almost nothing. Brand deals are where the real money is. See what your account is worth.
      </p>

      <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px,4vw,36px)', marginBottom: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20, marginBottom: 28 }}>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Followers</label>
            <input type="range" min={1000} max={10000000} step={1000} value={followers} onChange={e => setFollowers(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)', marginBottom: 6 }} />
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: 'var(--gold)' }}>
              {followers >= 1000000 ? `${(followers / 1000000).toFixed(1)}M` : `${(followers / 1000).toFixed(0)}K`}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Monthly Views</label>
            <input type="range" min={10000} max={50000000} step={10000} value={views} onChange={e => setViews(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)', marginBottom: 6 }} />
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: 'var(--gold)' }}>
              {views >= 1000000 ? `${(views / 1000000).toFixed(1)}M` : `${(views / 1000).toFixed(0)}K`}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Niche</label>
            <select value={niche} onChange={e => setNiche(e.target.value)} style={{ width: '100%', background: 'var(--s2)', border: '1px solid var(--b2)', borderRadius: 8, padding: '10px 12px', color: 'var(--t1)', fontSize: 13 }}>
              {Object.keys(BRAND_DEAL).map(k => <option key={k} value={k}>{k.charAt(0).toUpperCase() + k.slice(1)}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <div style={{ background: 'var(--s2)', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--t3)', marginBottom: 6, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>Creator Fund</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 800, color: 'var(--t2)' }}>{fmt(creatorFund)}</div>
            <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>~$0.03 per 1K views</div>
          </div>
          <div style={{ background: 'rgba(242,180,32,0.1)', border: '1px solid rgba(242,180,32,0.3)', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--gold)', marginBottom: 6, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>Brand Deal</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 800, color: 'var(--gold)' }}>{fmt(brandDeal)}</div>
            <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>per integration</div>
          </div>
          <div style={{ background: 'var(--s2)', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--t3)', marginBottom: 6, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>Total/Month</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 800, color: 'var(--t1)' }}>{fmt(total)}</div>
            <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>estimated</div>
          </div>
        </div>
        <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 14, textAlign: 'center' }}>
          ⚠️ Creator Fund pays $0.02–$0.04 per 1,000 views — brand deals are 10–50x more lucrative
        </p>
      </div>

      <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px,4vw,32px)' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>More Calculators</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
          {[
            { title: 'YouTube Earnings', href: '/tools/youtube-earnings-calculator' },
            { title: 'Instagram Earnings', href: '/tools/instagram-earnings-calculator' },
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
