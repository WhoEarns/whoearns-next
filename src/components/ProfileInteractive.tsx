'use client'
import { useState } from 'react'
import type { Profile } from '@/types'
import { subscribeToProfile, submitDataCorrection } from '@/lib/supabase'
import styles from './ProfileInteractive.module.css'

interface Props { profile: Profile }

export default function ProfileInteractive({ profile }: Props) {
  const [aiOpen, setAiOpen] = useState(false)
  const [aiLoaded, setAiLoaded] = useState(false)
  const [notifyOpen, setNotifyOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [notifyDone, setNotifyDone] = useState(false)
  const [toast, setToast] = useState('')
  const [submitOpen, setSubmitOpen] = useState(false)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  const handleShare = async () => {
    const url = `https://whoearns.com/${profile.slug}`
    if (navigator.share) {
      await navigator.share({ title: profile.name, url })
    } else {
      await navigator.clipboard.writeText(url)
      showToast('Link copied to clipboard')
    }
  }

  const handleNotify = async () => {
    if (!email || !email.includes('@')) return
    const ok = await subscribeToProfile(email, profile.slug, profile.name)
    if (ok) {
      setNotifyDone(true)
      showToast(`You will be notified when ${profile.name} is updated`)
      setTimeout(() => setNotifyOpen(false), 1500)
    }
  }

  const toggleAI = () => {
    setAiOpen(v => !v)
    if (!aiLoaded) setAiLoaded(true)
  }

  return (
    <>
      {/* ACTION ROW */}
      <div className={styles.actions}>
        <button className={`${styles.action} ${styles.share}`} onClick={handleShare}>
          Share Profile
        </button>
        <button className={`${styles.action} ${styles.notify}`} onClick={() => setNotifyOpen(true)}>
          Get Updates
        </button>
        {profile.show_claim && (
          <button className={`${styles.action} ${styles.claim}`} onClick={() => window.location.href = 'mailto:hello@whoearns.com?subject=Profile claim'}>
            Claim — €49/mo
          </button>
        )}
      </div>

      {/* AI OPPORTUNITY BUTTON */}
      {profile.ai_enabled && profile.ai_data && (
        <>
          <button className={`${styles.aiBtn} ${aiOpen ? styles.aiOpen : ''}`} onClick={toggleAI}>
            <span className={styles.aiIco}>AI</span>
            <div className={styles.aiBody}>
              <div className={styles.aiTitle}>AI Opportunity Analysis</div>
              <div className={styles.aiSub}>See the gap in this business and what you could build</div>
            </div>
            <span className={styles.aiArr}>{aiOpen ? '‹' : '›'}</span>
          </button>

          {aiOpen && aiLoaded && (
            <div className={styles.aiPanel}>
              <div className={styles.aiPanelTitle}>
                Opportunity Analysis — {profile.ai_data.name}
              </div>
              <div className={styles.oppGrid}>
                <div className={styles.oppCard}>
                  <div className={styles.oppLabel}>The Weakness</div>
                  <div className={styles.oppText} dangerouslySetInnerHTML={{ __html: profile.ai_data.weakness }} />
                </div>
                <div className={styles.oppCard}>
                  <div className={styles.oppLabel}>Underserved Market</div>
                  <div className={styles.oppText} dangerouslySetInnerHTML={{ __html: profile.ai_data.market }} />
                </div>
                <div className={styles.oppCard}>
                  <div className={styles.oppLabel}>The Opportunity</div>
                  <div className={styles.oppText} dangerouslySetInnerHTML={{ __html: profile.ai_data.opportunity }} />
                </div>
                <div className={styles.oppCard}>
                  <div className={styles.oppLabel}>Execution Difficulty</div>
                  <div className={styles.oppText} dangerouslySetInnerHTML={{ __html: profile.ai_data.difficulty }} />
                </div>
              </div>

              <div className={styles.buildBox}>
                <div className={styles.buildLabel}>
                  Build This Instead — <strong>{profile.ai_data.build_name}</strong>
                </div>
                <div className={styles.buildText}>{profile.ai_data.build_description}</div>
              </div>

              <MiniLanding ai={profile.ai_data} />

              <div className={styles.aiDisc}>
                AI analysis by WhoEarns · Not investment advice · Based on public market data
              </div>
            </div>
          )}
        </>
      )}

      {/* DATA CORRECTION */}
      <div className={styles.submitBanner}>
        <div className={styles.submitText}>
          <strong>Spotted an error?</strong> Submit updated data with a source and we will review within 48 hours.
        </div>
        <button className={styles.submitBtn} onClick={() => setSubmitOpen(true)}>
          Submit Correction
        </button>
      </div>

      {/* NOTIFY MODAL */}
      {notifyOpen && (
        <div className={styles.overlay} onClick={() => setNotifyOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalTitle}>Get Updates</div>
            <div className={styles.modalSub}>
              Get notified when {profile.name}&apos;s profile is updated with new data.
            </div>
            {notifyDone ? (
              <div style={{ color: 'var(--green)', fontWeight: 600, padding: '12px 0' }}>
                Subscribed successfully.
              </div>
            ) : (
              <>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleNotify()}
                />
                <button className={styles.notifyBtn} onClick={handleNotify}>Notify Me</button>
                <button className={styles.cancelBtn} onClick={() => setNotifyOpen(false)}>No thanks</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* SUBMIT CORRECTION MODAL */}
      {submitOpen && (
        <SubmitModal
          profile={profile}
          onClose={() => setSubmitOpen(false)}
          onSuccess={() => { setSubmitOpen(false); showToast('Correction submitted — we will review within 48 hours') }}
        />
      )}

      {/* TOAST */}
      {toast && <div className={styles.toast}>{toast}</div>}
    </>
  )
}

// ── MINI LANDING PREVIEW ───────────────────────────────────
function MiniLanding({ ai }: { ai: NonNullable<Profile['ai_data']> }) {
  return (
    <div className={styles.mini}>
      <div className={styles.miniBar}>
        <div className={styles.miniDots}>
          <span style={{ background: '#ff5f56' }} />
          <span style={{ background: '#ffbd2e' }} />
          <span style={{ background: '#27c93f' }} />
        </div>
        <span className={styles.miniUrl}>{ai.product_url}</span>
      </div>
      <div className={styles.miniBody} style={{ background: ai.product_bg }}>
        <div className={styles.miniLogo} style={{ color: ai.product_accent }}>
          {ai.product_name}
        </div>
        <div className={styles.miniTagline}>{ai.product_tagline}</div>
        <div className={styles.miniCta} style={{ background: ai.product_accent }}>
          {ai.product_cta}
        </div>
        <div className={styles.miniFeats}>
          {ai.product_features.map((f, i) => (
            <span key={i} className={styles.miniFeat}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── SUBMIT CORRECTION MODAL ────────────────────────────────
function SubmitModal({ profile, onClose, onSuccess }: {
  profile: Profile
  onClose: () => void
  onSuccess: () => void
}) {
  const [field, setField] = useState('')
  const [current, setCurrent] = useState('')
  const [suggested, setSuggested] = useState('')
  const [source, setSource] = useState('')
  const [submitterEmail, setSubmitterEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!field || !suggested || !source) return
    setLoading(true)
    const ok = await submitDataCorrection({
      profile_slug: profile.slug,
      profile_name: profile.name,
      field_name: field,
      current_value: current,
      suggested_value: suggested,
      source_url: source,
      submitter_email: submitterEmail,
    })
    setLoading(false)
    if (ok) onSuccess()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
        <div className={styles.modalTitle}>Submit a Correction</div>
        <div className={styles.modalSub}>
          For {profile.name}. Please include a credible source.
        </div>
        <input className={styles.input} placeholder="What field needs correcting? (e.g. Net Worth)" value={field} onChange={e => setField(e.target.value)} />
        <input className={styles.input} placeholder="Current value on site (optional)" value={current} onChange={e => setCurrent(e.target.value)} />
        <input className={styles.input} placeholder="Your suggested correct value" value={suggested} onChange={e => setSuggested(e.target.value)} />
        <input className={styles.input} placeholder="Source URL (required)" value={source} onChange={e => setSource(e.target.value)} />
        <input className={styles.input} placeholder="Your email (optional — for follow-up)" value={submitterEmail} onChange={e => setSubmitterEmail(e.target.value)} />
        <button className={styles.notifyBtn} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting…' : 'Submit Correction'}
        </button>
        <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}
