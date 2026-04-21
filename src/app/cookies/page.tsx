import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'WhoEarns Cookie Policy — what cookies we use and why.',
  alternates: { canonical: 'https://whoearns.com/cookies' },
}

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" updated="April 2026">
      <p>WhoEarns uses cookies and similar tracking technologies on whoearns.com. This policy explains what cookies we use and why.</p>
      <h2>What Are Cookies?</h2>
      <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, improve user experience, and provide analytical information to site owners.</p>
      <h2>Cookies We Use</h2>
      <h3>Strictly necessary cookies</h3>
      <p>These cookies are essential for the site to function. They include session management and security cookies. These cannot be disabled.</p>
      <h3>Analytics cookies</h3>
      <p><strong>Google Analytics 4</strong> — We use GA4 to understand how visitors use our site. Data is anonymised and aggregated. IP addresses are anonymised. You can opt out via <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google's opt-out tool</a>.</p>
      <p><strong>Microsoft Clarity</strong> — We use Clarity to record session data including mouse movements, clicks and scroll behaviour. This data is aggregated and anonymised.</p>
      <h3>Functional cookies</h3>
      <p>We store your light/dark mode preference locally in your browser. No personal data is involved.</p>
      <h2>Managing Cookies</h2>
      <p>You can control cookies through your browser settings. Note that disabling certain cookies may affect the functionality of the site.</p>
      <h2>Contact</h2>
      <p>Questions about cookies: <a href="mailto:hello@whoearns.com">hello@whoearns.com</a></p>
    </LegalLayout>
  )
}
