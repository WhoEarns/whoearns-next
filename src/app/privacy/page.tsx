import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'WhoEarns Privacy Policy — how we collect, use and protect your data. GDPR compliant.',
  alternates: { canonical: 'https://whoearns.com/privacy' },
}

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="April 2026">
      <p>WhoEarns is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store and protect information about you when you use whoearns.com. This policy complies with the EU General Data Protection Regulation (GDPR).</p>
      <h2>1. Data Controller</h2>
      <p>WhoEarns operates from Malta, European Union. For GDPR purposes, WhoEarns is the data controller. Contact: <a href="mailto:hello@whoearns.com">hello@whoearns.com</a></p>
      <h2>2. What Data We Collect</h2>
      <h3>Data you provide directly</h3>
      <ul>
        <li>Email address — when you subscribe to profile updates or our newsletter</li>
        <li>Name and work email — when you submit a profile claim request</li>
        <li>Data submissions — content you submit to correct or add profile information</li>
      </ul>
      <h3>Data collected automatically</h3>
      <ul>
        <li>Usage data via Google Analytics — pages visited, time on site, referral sources (anonymised)</li>
        <li>Session recordings and heatmaps via Microsoft Clarity — aggregated behaviour data</li>
        <li>IP address and browser information — for security and fraud prevention</li>
      </ul>
      <h2>3. How We Use Your Data</h2>
      <ul>
        <li>To send profile update notifications if you subscribed</li>
        <li>To process and respond to profile claim requests</li>
        <li>To improve the site based on aggregated usage analytics</li>
        <li>To prevent fraud, abuse, and security threats</li>
        <li>To comply with legal obligations</li>
      </ul>
      <h2>4. Legal Basis for Processing (GDPR)</h2>
      <ul>
        <li><strong>Consent</strong> — email alerts and newsletter subscriptions (withdraw at any time)</li>
        <li><strong>Contract</strong> — processing profile claims and Pro subscriptions</li>
        <li><strong>Legitimate interests</strong> — analytics, security, improving the site</li>
      </ul>
      <h2>5. Data Sharing</h2>
      <p>We do not sell your personal data. We share data only with trusted service providers under GDPR-compliant data processing agreements: Supabase (database, EU region), Vercel (hosting, GDPR compliant), Stripe (payments, PCI DSS compliant), Google Analytics (anonymised analytics), Microsoft Clarity (anonymised session analytics).</p>
      <h2>6. Your Rights (GDPR)</h2>
      <p>Under GDPR you have the right to: access your personal data; correct inaccurate data; request deletion (right to be forgotten); restrict or object to processing; data portability; and withdraw consent at any time. Email <a href="mailto:hello@whoearns.com">hello@whoearns.com</a> to exercise any right. We respond within 30 days.</p>
      <h2>7. Cookies</h2>
      <p>We use cookies for analytics and functionality. See our <a href="/cookies">Cookie Policy</a> for full details.</p>
      <h2>8. Contact</h2>
      <p>Questions about privacy: <a href="mailto:hello@whoearns.com">hello@whoearns.com</a></p>
    </LegalLayout>
  )
}
