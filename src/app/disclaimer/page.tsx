import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Data Disclaimer',
  description: 'WhoEarns Data Disclaimer — how our data is sourced, labelled and maintained.',
  alternates: { canonical: 'https://whoearns.com/disclaimer' },
}

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Data Disclaimer" updated="April 2026">
      <p>WhoEarns aggregates publicly available financial and career data for informational and research purposes. This disclaimer explains how our data is sourced, labelled and maintained.</p>
      <h2>Data Labels</h2>
      <p>Every figure on WhoEarns is clearly labelled as one of two types:</p>
      <p><strong>Verified</strong> — Data sourced from: SEC EDGAR annual filings, Warsaw Stock Exchange (GPW) filings, official UEFA and FIFA statistics, Stripe-verified MRR data, or publicly verifiable on-chain blockchain data.</p>
      <p><strong>Estimated</strong> — Data estimated from reputable secondary sources including Forbes, Bloomberg, The Sunday Times Rich List, reported contract values, property records and industry analysis. Net worth estimates for individuals are inherently approximate.</p>
      <h2>Net Worth Estimates</h2>
      <p>Net worth figures for athletes, entertainers and creators are estimates. Real personal wealth is not publicly disclosed. Our estimates are based on: reported salaries and contracts, publicly known business interests, property records, published endorsement deals, and credible media reporting. Actual figures may differ materially.</p>
      <h2>Not Financial Advice</h2>
      <p>Nothing on WhoEarns constitutes financial, investment, tax, or legal advice. Data is provided for informational and entertainment purposes only. Do not make financial or business decisions based solely on information from this site.</p>
      <h2>Data Currency</h2>
      <p>All profiles display a last-reviewed date. We review our top 100 profiles monthly. Figures may be outdated between review cycles. We recommend verifying important figures through primary sources.</p>
      <h2>Disputing Data</h2>
      <p>If you believe any data on WhoEarns is inaccurate, email <a href="mailto:hello@whoearns.com">hello@whoearns.com</a> with the profile in question, the specific figure you believe is incorrect, your suggested correction, and a credible source. We review and respond within 48 hours.</p>
      <h2>Public Figures</h2>
      <p>WhoEarns covers public figures whose financial and professional activities are a matter of legitimate public interest. We present factual information from public sources and clearly distinguish between verified data and estimates. If you are a public figure and believe your profile contains materially inaccurate information, contact us at <a href="mailto:hello@whoearns.com">hello@whoearns.com</a>.</p>
    </LegalLayout>
  )
}
