import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: 'calc(var(--nav-h) + 60px) 20px 80px',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        marginBottom: '16px',
      }}>
        404
      </div>
      <h1 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(28px, 5vw, 42px)',
        fontWeight: 700,
        letterSpacing: '-0.5px',
        marginBottom: '12px',
      }}>
        Profile not found
      </h1>
      <p style={{ fontSize: '15px', color: 'var(--t2)', lineHeight: 1.7, marginBottom: '32px' }}>
        This profile does not exist yet. If you think it should, you can suggest it.
      </p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" style={{
          background: 'var(--gold)', color: '#000',
          padding: '10px 24px', borderRadius: '100px',
          fontWeight: 700, fontSize: '14px',
        }}>
          Back to WhoEarns
        </Link>
        <a href="mailto:hello@whoearns.com?subject=Profile suggestion" style={{
          background: 'var(--s1)', color: 'var(--t2)',
          border: '1px solid var(--b2)',
          padding: '10px 24px', borderRadius: '100px',
          fontSize: '14px',
        }}>
          Suggest this profile
        </a>
      </div>
    </main>
  )
}
