'use client'
import { useState } from 'react'

type Step = 'type' | 'details' | 'revenue' | 'confirm' | 'done'

const CREATOR_TYPES = [
  { id: 'youtube', label: 'YouTube Creator', icon: '▶️' },
  { id: 'instagram', label: 'Instagram Creator', icon: '📸' },
  { id: 'tiktok', label: 'TikTok Creator', icon: '🎵' },
  { id: 'newsletter', label: 'Newsletter Writer', icon: '📧' },
  { id: 'podcast', label: 'Podcaster', icon: '🎙️' },
  { id: 'saas', label: 'SaaS Founder', icon: '💻' },
  { id: 'ecommerce', label: 'E-commerce / Shopify', icon: '🛍️' },
  { id: 'affiliate', label: 'Affiliate / Niche Site', icon: '🔗' },
  { id: 'course', label: 'Course Creator', icon: '🎓' },
  { id: 'agency', label: 'Agency / Freelancer', icon: '🏢' },
]

const REVENUE_SOURCES = [
  'Ads / AdSense', 'Sponsorships / Brand deals', 'Affiliate commissions',
  'Digital products', 'Paid subscriptions / Memberships', 'Courses',
  'Consulting / Services', 'SaaS / Software', 'E-commerce / Physical products',
  'Merchandise', 'Tips / Donations',
]

export default function SubmitEarningsPage() {
  const [step, setStep] = useState<Step>('type')
  const [form, setForm] = useState({
    type: '', niche: '', platform: '',
    followersRange: '', monthlyRevenue: '', revenueSources: [] as string[],
    revenueSplit: '' as string, name: '', anonymous: true, note: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const update = (key: string, val: unknown) => setForm(f => ({ ...f, [key]: val }))

  const toggleSource = (s: string) => {
    setForm(f => ({
      ...f,
      revenueSources: f.revenueSources.includes(s)
        ? f.revenueSources.filter(x => x !== s)
        : [...f.revenueSources, s]
    }))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    // In production: POST to /api/submit-earnings
    // For now simulate
    await new Promise(r => setTimeout(r, 1200))
    setStep('done')
    setSubmitting(false)
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px' }}>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 12 }}>
          EARNINGS SUBMISSION
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 800, marginBottom: 12, letterSpacing: '-0.5px' }}>
          Submit Your Earnings
        </h1>
        <p style={{ color: 'var(--t2)', fontSize: 14, lineHeight: 1.7 }}>
          Help build the world&apos;s most transparent creator earnings database. Submissions can be 100% anonymous. Your data helps others understand what&apos;s realistically possible.
        </p>
      </div>

      {/* Progress */}
      {step !== 'done' && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
          {(['type', 'details', 'revenue', 'confirm'] as Step[]).map((s, i) => (
            <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: ['type','details','revenue','confirm','done'].indexOf(step) >= i ? 'var(--gold)' : 'var(--s2)' }} />
          ))}
        </div>
      )}

      {/* Step 1: Type */}
      {step === 'type' && (
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>What kind of creator or business are you?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
            {CREATOR_TYPES.map(t => (
              <button key={t.id} onClick={() => { update('type', t.id); setStep('details') }}
                style={{ padding: '16px 12px', background: form.type === t.id ? 'rgba(242,180,32,0.15)' : 'var(--s1)', border: `1px solid ${form.type === t.id ? 'var(--gold)' : 'var(--b1)'}`, borderRadius: 12, cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{t.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--t1)' }}>{t.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Details */}
      {step === 'details' && (
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Tell us about your channel / business</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Niche / Topic</label>
              <input type="text" placeholder="e.g. Personal finance, Travel, SaaS for developers" value={form.niche} onChange={e => update('niche', e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', background: 'var(--s1)', border: '1px solid var(--b2)', borderRadius: 10, padding: '12px 14px', color: 'var(--t1)', fontSize: 14 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Audience / Subscriber Size</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {['Under 10K', '10K–50K', '50K–100K', '100K–500K', '500K–1M', '1M+'].map(r => (
                  <button key={r} onClick={() => update('followersRange', r)}
                    style={{ padding: '10px 8px', background: form.followersRange === r ? 'rgba(242,180,32,0.15)' : 'var(--s2)', border: `1px solid ${form.followersRange === r ? 'var(--gold)' : 'var(--b1)'}`, borderRadius: 8, cursor: 'pointer', fontSize: 13, color: 'var(--t1)', transition: 'all 0.15s' }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Anonymous? <span style={{ color: 'var(--green)', fontSize: 9 }}>RECOMMENDED</span></label>
              <div style={{ display: 'flex', gap: 10 }}>
                {[{ v: true, label: 'Yes — anonymous' }, { v: false, label: 'No — show my name' }].map(o => (
                  <button key={String(o.v)} onClick={() => update('anonymous', o.v)}
                    style={{ flex: 1, padding: '10px', background: form.anonymous === o.v ? 'rgba(242,180,32,0.15)' : 'var(--s2)', border: `1px solid ${form.anonymous === o.v ? 'var(--gold)' : 'var(--b1)'}`, borderRadius: 8, cursor: 'pointer', fontSize: 13, color: 'var(--t1)', transition: 'all 0.15s' }}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            {!form.anonymous && (
              <div>
                <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Your name / handle (optional)</label>
                <input type="text" placeholder="@yourhandle or Your Name" value={form.name} onChange={e => update('name', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', background: 'var(--s1)', border: '1px solid var(--b2)', borderRadius: 10, padding: '12px 14px', color: 'var(--t1)', fontSize: 14 }} />
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            <button onClick={() => setStep('type')} style={{ padding: '12px 24px', background: 'var(--s2)', border: '1px solid var(--b1)', borderRadius: 100, cursor: 'pointer', fontSize: 14, color: 'var(--t2)' }}>Back</button>
            <button onClick={() => setStep('revenue')} disabled={!form.niche || !form.followersRange}
              style={{ flex: 1, padding: '12px 24px', background: 'var(--gold)', color: '#000', borderRadius: 100, cursor: 'pointer', fontSize: 14, fontWeight: 700, opacity: !form.niche || !form.followersRange ? 0.5 : 1 }}>
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Revenue */}
      {step === 'revenue' && (
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Revenue details</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Monthly Revenue (USD)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {['Under $500', '$500–$2K', '$2K–$5K', '$5K–$10K', '$10K–$50K', '$50K+'].map(r => (
                  <button key={r} onClick={() => update('monthlyRevenue', r)}
                    style={{ padding: '10px 8px', background: form.monthlyRevenue === r ? 'rgba(242,180,32,0.15)' : 'var(--s2)', border: `1px solid ${form.monthlyRevenue === r ? 'var(--gold)' : 'var(--b1)'}`, borderRadius: 8, cursor: 'pointer', fontSize: 13, color: 'var(--t1)', transition: 'all 0.15s' }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Revenue Sources (select all that apply)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {REVENUE_SOURCES.map(s => (
                  <button key={s} onClick={() => toggleSource(s)}
                    style={{ padding: '7px 14px', background: form.revenueSources.includes(s) ? 'rgba(242,180,32,0.15)' : 'var(--s2)', border: `1px solid ${form.revenueSources.includes(s) ? 'var(--gold)' : 'var(--b1)'}`, borderRadius: 100, cursor: 'pointer', fontSize: 12, color: 'var(--t1)', transition: 'all 0.15s' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Revenue split (optional)</label>
              <input type="text" placeholder="e.g. 60% sponsorships, 30% affiliate, 10% products" value={form.revenueSplit} onChange={e => update('revenueSplit', e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', background: 'var(--s1)', border: '1px solid var(--b2)', borderRadius: 10, padding: '12px 14px', color: 'var(--t1)', fontSize: 14 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 8 }}>Anything else to add? (optional)</label>
              <textarea placeholder="Lessons learned, what surprised you, advice for others..." value={form.note} onChange={e => update('note', e.target.value)} rows={3}
                style={{ width: '100%', boxSizing: 'border-box', background: 'var(--s1)', border: '1px solid var(--b2)', borderRadius: 10, padding: '12px 14px', color: 'var(--t1)', fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            <button onClick={() => setStep('details')} style={{ padding: '12px 24px', background: 'var(--s2)', border: '1px solid var(--b1)', borderRadius: 100, cursor: 'pointer', fontSize: 14, color: 'var(--t2)' }}>Back</button>
            <button onClick={() => setStep('confirm')} disabled={!form.monthlyRevenue}
              style={{ flex: 1, padding: '12px 24px', background: 'var(--gold)', color: '#000', borderRadius: 100, cursor: 'pointer', fontSize: 14, fontWeight: 700, opacity: !form.monthlyRevenue ? 0.5 : 1 }}>
              Review →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Confirm */}
      {step === 'confirm' && (
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Review your submission</h2>
          <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, padding: '24px', marginBottom: 28 }}>
            {[
              { label: 'Type', value: CREATOR_TYPES.find(t => t.id === form.type)?.label },
              { label: 'Niche', value: form.niche },
              { label: 'Audience', value: form.followersRange },
              { label: 'Monthly revenue', value: form.monthlyRevenue },
              { label: 'Revenue sources', value: form.revenueSources.join(', ') || '—' },
              { label: 'Revenue split', value: form.revenueSplit || '—' },
              { label: 'Identity', value: form.anonymous ? 'Anonymous' : form.name || 'Public' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--b1)', gap: 16 }}>
                <span style={{ fontSize: 13, color: 'var(--t3)', flexShrink: 0 }}>{row.label}</span>
                <span style={{ fontSize: 13, color: 'var(--t1)', textAlign: 'right' }}>{row.value}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--t3)', marginBottom: 20, lineHeight: 1.6 }}>
            Your submission will be reviewed and published as a data point in our earnings database. Anonymous submissions are never linked to your identity.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setStep('revenue')} style={{ padding: '12px 24px', background: 'var(--s2)', border: '1px solid var(--b1)', borderRadius: 100, cursor: 'pointer', fontSize: 14, color: 'var(--t2)' }}>Back</button>
            <button onClick={handleSubmit} disabled={submitting}
              style={{ flex: 1, padding: '12px 24px', background: 'var(--gold)', color: '#000', borderRadius: 100, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>
              {submitting ? 'Submitting...' : 'Submit Earnings 🚀'}
            </button>
          </div>
        </div>
      )}

      {/* Done */}
      {step === 'done' && (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Thank you!</h2>
          <p style={{ color: 'var(--t2)', fontSize: 15, lineHeight: 1.7, marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
            Your submission is under review and will be published within 24 hours. You&apos;re helping make creator earnings more transparent for everyone.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/tools" style={{ padding: '12px 24px', background: 'var(--gold)', color: '#000', borderRadius: 100, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              Try Calculators
            </a>
            <a href="/category/creators" style={{ padding: '12px 24px', background: 'var(--s2)', color: 'var(--t1)', borderRadius: 100, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              Browse Creators
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
