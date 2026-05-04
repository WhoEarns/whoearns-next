'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function NewsletterCalculatorPage() {
  const [subscribers, setSubscribers] = useState(10000)
  const [openRate, setOpenRate] = useState(35)
  const [paidPct, setPaidPct] = useState(2)

  const sponsorPerIssue = (subscribers * (openRate / 100) / 1000) * 30
  const monthlySponsors = sponsorPerIssue * 4
  const paidRevenue = subscribers * (paidPct / 100) * 8
  const total = monthlySponsors + paidRevenue
  const fmt = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${Math.round(n)}`

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ fontSize: 12, color: 'var(--t3)', marginBottom: 24, fontFamily: 'JetBrains Mono, monospace' }}>
        <Link href="/" style={{ color: 'var(--t3)' }}>WhoEarns</Link> › <Link href="/tools" style={{ color: 'var(--t3)' }}>Tools</Link> › Newsletter Revenue Calculator
      </div>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px,5vw,40px)', fontWeight: 800, marginBottom: 8, letterSpacing: '-1px' }}>
        Newsletter Revenue Calculator 2026
      </h1>
      <p style={{ color: 'var(--t2)', fontSize: 15, marginBottom: 36, lineHeight: 1.6 }}>
        Estimate newsletter income from sponsorships and paid subscriptions. The most underrated creator business model.
      </p>

      <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px,4vw,36px)', marginBottom: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20, marginBottom: 28 }}>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Subscribers</label>
            <input type="range" min={500} max={500000} step={500} value={subscribers} onChange={e => setSubscribers(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)', marginBottom: 6 }} />
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: 'var(--gold)' }}>
              {subscribers >= 1000 ? `${(subscribers / 1000).toFixed(1)}K` : subscribers}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Open Rate: {openRate}%</label>
            <input type="range" min={10} max={70} step={1} value={openRate} onChange={e => setOpenRate(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)', marginBottom: 6 }} />
            <div style={{ fontSize: 12, color: openRate >= 40 ? 'var(--green)' : openRate >= 25 ? 'var(--gold)' : 'var(--t3)' }}>
              {openRate >= 40 ? 'Excellent' : openRate >= 25 ? 'Good' : 'Below average'}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Paid subscribers: {paidPct}%</label>
            <input type="range" min={0} max={15} step={0.5} value={paidPct} onChange={e => setPaidPct(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)', marginBottom: 6 }} />
            <div style={{ fontSize: 12, color: 'var(--t3)' }}>{Math.round(subscribers * paidPct / 100)} paying @ $8/mo avg</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <div style={{ background: 'var(--s2)', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--t3)', marginBottom: 6, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>Sponsorships</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 800, color: 'var(--t2)' }}>{fmt(monthlySponsors)}</div>
            <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>4 issues/mo</div>
          </div>
          <div style={{ background: 'var(--s2)', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--t3)', marginBottom: 6, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>Paid Subs</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 800, color: 'var(--t2)' }}>{fmt(paidRevenue)}</div>
            <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>{Math.round(subscribers * paidPct / 100)} × $8/mo</div>
          </div>
          <div style={{ background: 'rgba(242,180,32,0.1)', border: '1px solid rgba(242,180,32,0.3)', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--gold)', marginBottom: 6, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>Total/Month</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 800, color: 'var(--gold)' }}>{fmt(total)}</div>
            <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>estimated</div>
          </div>
        </div>
        <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 14, textAlign: 'center' }}>
          Sponsorship CPM $30 on opens · Industry standard · Paid tier avg $8/mo
        </p>
      </div>

      <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: 'clamp(20px,4vw,32px)' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>More Calculators</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
          {[
            { title: 'YouTube Earnings', href: '/tools/youtube-earnings-calculator' },
            { title: 'Instagram Earnings', href: '/tools/instagram-earnings-calculator' },
            { title: 'TikTok Earnings', href: '/tools/tiktok-earnings-calculator' },
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
