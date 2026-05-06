import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = 're_atiCUjwQ_DPUg6ErmrmwHCYu1754ngcYn'
const TO_EMAIL = 'hello@whoearns.com'
const FROM_EMAIL = 'WhoEarns <submissions@whoearns.com>'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      type, niche, followersRange, monthlyRevenue,
      revenueSources, revenueSplit, name, anonymous, note
    } = body

    // ── Save to Supabase ──────────────────────────────────
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    await supabase.from('data_submissions').insert({
      profile_slug: 'earnings-submission',
      profile_name: anonymous ? 'Anonymous' : (name || 'Anonymous'),
      field_name: 'earnings_submission',
      current_value: '',
      suggested_value: JSON.stringify(body),
      source_url: '',
      submitter_email: '',
    })

    // ── Send email via Resend ─────────────────────────────
    const emailBody = `
New Earnings Submission — WhoEarns

Type: ${type}
Niche: ${niche}
Audience size: ${followersRange}
Monthly revenue: ${monthlyRevenue}
Revenue sources: ${Array.isArray(revenueSources) ? revenueSources.join(', ') : revenueSources}
Revenue split: ${revenueSplit || '—'}
Identity: ${anonymous ? 'Anonymous' : (name || 'Public')}
Note: ${note || '—'}

Submitted at: ${new Date().toISOString()}
    `.trim()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `New Earnings Submission — ${type} · ${monthlyRevenue}`,
        text: emailBody,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      // Still return success — submission was saved to Supabase
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
