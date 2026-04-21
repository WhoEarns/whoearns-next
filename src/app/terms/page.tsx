import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'WhoEarns Terms of Service — read before using whoearns.com.',
  alternates: { canonical: 'https://whoearns.com/terms' },
}

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="April 2026">
      <p>Welcome to WhoEarns. By accessing or using whoearns.com you agree to be bound by these Terms of Service. Please read them carefully before using the site.</p>
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using the site in any way, you represent that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use the site.</p>
      <h2>2. Description of Service</h2>
      <p>WhoEarns is an information and research platform that aggregates and presents publicly available data about individuals, companies and businesses, including estimated net worth figures, career statistics, revenue data and business intelligence. The site also provides AI-generated analysis and opportunity assessments based on this data.</p>
      <h2>3. Data Accuracy and Disclaimers</h2>
      <p>All data marked <strong>Est.</strong> (estimated) represents our best estimates based on publicly available information including media reports, public filings, and industry databases. These figures are not verified financial statements and should not be treated as such.</p>
      <p>Data marked <strong>Verified</strong> has been sourced directly from official filings, regulatory databases (such as SEC EDGAR or Warsaw Stock Exchange filings), verified APIs, or on-chain blockchain data.</p>
      <p>WhoEarns makes no warranty, express or implied, about the accuracy, completeness or reliability of any information on the site. We are not financial advisors. Nothing on this site constitutes financial, legal, investment, or professional advice of any kind.</p>
      <h2>4. AI-Generated Content</h2>
      <p>The AI Opportunity Analysis feature generates automated analysis based on publicly available market information. This content is provided for entertainment and research purposes only. It does not constitute business, financial, or investment advice. WhoEarns is not responsible for any decisions made based on AI-generated content.</p>
      <h2>5. Intellectual Property</h2>
      <p>All original content on this site, including the WhoEarns brand, design, layout, copy and proprietary data compilations, is the property of WhoEarns and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>
      <h2>6. Profile Claims</h2>
      <p>Businesses and individuals may claim their profile on WhoEarns for a monthly fee. By claiming a profile, you warrant that you are authorised to represent the entity in question. You may edit certain fields on your claimed profile but may not remove factual data that is verified from public sources. All edits are subject to review and approval by WhoEarns.</p>
      <h2>7. User Submissions</h2>
      <p>You may submit data corrections or profile suggestions to WhoEarns. By submitting data, you grant WhoEarns a non-exclusive, perpetual, royalty-free licence to use, publish and incorporate that data into the site. You warrant that any data you submit is accurate, lawfully obtained, and does not violate any third-party rights.</p>
      <h2>8. Prohibited Uses</h2>
      <p>You may not use the site to: scrape or systematically harvest data without written consent; attempt to reverse-engineer any part of the site; submit false or defamatory information; use the site for any unlawful purpose; or interfere with the security or integrity of the site.</p>
      <h2>9. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law, WhoEarns and its operators shall not be liable for any indirect, incidental, special, consequential or punitive damages arising from your use of the site or reliance on any information presented therein.</p>
      <h2>10. Governing Law</h2>
      <p>These Terms are governed by the laws of Malta and the European Union. Any disputes shall be subject to the exclusive jurisdiction of the courts of Malta.</p>
      <h2>11. Contact</h2>
      <p>For any questions regarding these Terms, contact us at <a href="mailto:hello@whoearns.com">hello@whoearns.com</a>.</p>
    </LegalLayout>
  )
}
