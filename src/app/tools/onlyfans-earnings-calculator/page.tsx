'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function OnlyFansCalculatorPage() {
  const [subscribers, setSubscribers] = useState(500)
  const [subPrice, setSubPrice] = useState(9.99)
  const [ppvPerMonth, setPpvPerMonth] = useState(200)
  const [tipsPerMonth, setTipsPerMonth] = useState(100)

  // OnlyFans takes 20%, creator keeps 80%
  const subRevenue = subscribers * subPrice * 0.8
  const ppvRevenue = ppvPerMonth * 0.8
  const tipsRevenue = tipsPerMonth * 0.8
  const total = subRevenue + ppvRevenue + tipsRevenue
  const annual = total * 12

  const fmt = (n: number) => {
    if (n >= 1000000) return `$${(n/1000000).toFixed(1)}M`
    if (n >= 1000) return `$${(n/1000).toFixed(1)}K`
    return `$${Math.round(n)}`
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ fontSize: 12, color: 'var(--t3)', marginBottom: 24, fontFamily: 'JetBrains Mono, monospace' }}>
        <Link href="/" style={{ color: 'var(--t3)' }}>WhoEarns</Link>
        {' › '}<Link href="/tools" style={{ color: 'var(--t3)' }}>Tools</Link>
        {' › '}OnlyFans Earnings Calculator
      </div>

      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px,5vw,40px)', fontWeight: 800, marginBottom: 8, letterSpacing: '-1px' }}>
        OnlyFans Earnings Calculator 2026
      </h1>
      <p style={{ color: 'var(--t2)', fontSize: 15, marginBottom: 36, lineHeight: 1.6 }}>
        Estimate OnlyFans creator income from subscriptions, pay-per-view content and tips. OnlyFans takes 20% — you keep 80%.
      </p>

      <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px,4vw,36px)', marginBottom: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20, marginBottom: 28 }}>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Subscribers</label>
            <input type="range" min={10} max={50000} step={10} value={subscribers} onChange={e => setSubscribers(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)', marginBottom: 6 }} />
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: 'var(--gold)' }}>
              {subscribers >= 1000 ? `${(subscribers/1000).toFixed(1)}K` : subscribers}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Sub Price: ${subPrice}/mo</label>
            <input type="range" min={4.99} max={49.99} step={1} value={subPrice} onChange={e => setSubPrice(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)', marginBottom: 6 }} />
            <div style={{ fontSize: 12, color: 'var(--t3)' }}>Avg is $7–$12/mo</div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>PPV Revenue/mo: ${ppvPerMonth}</label>
            <input type="range" min={0} max={10000} step={50} value={ppvPerMonth} onChange={e => setPpvPerMonth(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)', marginBottom: 6 }} />
            <div style={{ fontSize: 12, color: 'var(--t3)' }}>Pay-per-view messages</div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Tips/mo: ${tipsPerMonth}</label>
            <input type="range" min={0} max={5000} step={50} value={tipsPerMonth} onChange={e => setTipsPerMonth(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)', marginBottom: 6 }} />
            <div style={{ fontSize: 12, color: 'var(--t3)' }}>Direct tips from fans</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <div style={{ background: 'var(--s2)', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--t3)', marginBottom: 6, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>Subscriptions</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 800, color: 'var(--t2)' }}>{fmt(subRevenue)}</div>
            <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>after 20% fee</div>
          </div>
          <div style={{ background: 'rgba(242,180,32,0.1)', border: '1px solid rgba(242,180,32,0.3)', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--gold)', marginBottom: 6, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>Total/Month</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 800, color: 'var(--gold)' }}>{fmt(total)}</div>
            <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>subs + PPV + tips</div>
          </div>
          <div style={{ background: 'var(--s2)', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--t3)', marginBottom: 6, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>Annual</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 800, color: 'var(--t1)' }}>{fmt(annual)}</div>
            <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>estimated yearly</div>
          </div>
        </div>
        <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 14, textAlign: 'center' }}>
          OnlyFans takes 20% of all revenue · You keep 80% · Taxes not included
        </p>
      </div>

      <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px,4vw,32px)', marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>OnlyFans Income Tiers — What Creators Actually Earn</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {[
            { tier: 'Beginner (0–500 subs)', monthly: '$200–$2K', note: 'Side income — still building audience' },
            { tier: 'Growing (500–5K subs)', monthly: '$2K–$20K', note: 'Full-time income territory' },
            { tier: 'Established (5K–50K subs)', monthly: '$20K–$200K', note: 'Top 1% of creators' },
            { tier: 'Top creator (50K+ subs)', monthly: '$200K+', note: 'Bella Thorne made $1M in 24 hours at launch' },
          ].map(r => (
            <div key={r.tier} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--s2)', borderRadius: 10, gap: 16 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--t1)' }}>{r.tier}</div>
                <div style={{ fontSize: 12, color: 'var(--t3)', marginTop: 2 }}>{r.note}</div>
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--gold)', fontSize: 15, whiteSpace: 'nowrap' }}>{r.monthly}/mo</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--t3)', marginTop: 14, lineHeight: 1.6 }}>
          Only the top 1% of OnlyFans creators earn significant income. The median creator earns under $200/month.
          Success requires consistent posting, strong social media presence to drive traffic, and active fan engagement.
        </p>
      </div>

      <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px,4vw,32px)' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>More Calculators</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
          {[
            { title: 'YouTube Earnings', href: '/tools/youtube-earnings-calculator' },
            { title: 'Instagram Earnings', href: '/tools/instagram-earnings-calculator' },
            { title: 'TikTok Earnings', href: '/tools/tiktok-earnings-calculator' },
            { title: 'Newsletter Revenue', href: '/tools/newsletter-revenue-calculator' },
            { title: 'Podcast Earnings', href: '/tools/podcast-earnings-calculator' },
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
