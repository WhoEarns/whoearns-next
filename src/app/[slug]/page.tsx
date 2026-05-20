import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProfileBySlug, getAllSlugs } from '@/lib/supabase'
import type { Profile } from '@/types'
import Avatar from '@/components/Avatar'
import ProfileInteractive from '@/components/ProfileInteractive'
import SimilarProfiles from '@/components/SimilarProfiles'
import styles from './profile.module.css'

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug: string) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const profile = await getProfileBySlug(slug)
  if (!profile) return { title: 'Profile Not Found · WhoEarns' }
  const mainStat = profile.stats?.[0]
  const statSummary = mainStat ? `${mainStat.value} ${mainStat.label}` : ''
  const title = profile.seo_title ||
    `${profile.name} Net Worth ${new Date().getFullYear()} — Career Stats and Earnings`
  const description = profile.seo_description ||
    `${profile.name} net worth and career earnings. ${statSummary}. Full career stats, salary breakdown and earnings analysis on WhoEarns.`
  return {
    title, description,
    alternates: { canonical: `https://whoearns.com/${slug}` },
    openGraph: {
      title, description,
      url: `https://whoearns.com/${slug}`,
      type: 'profile', siteName: 'WhoEarns',
      images: [{ url: `/og/${slug}.jpg`, width: 1200, height: 630, alt: `${profile.name} — Net Worth and Career Stats` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`/og/${slug}.jpg`] },
  }
}

export default async function ProfilePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const profile = await getProfileBySlug(slug)
  if (!profile) notFound()
  const jsonLd = buildJsonLd(profile, slug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <ol className={styles.breadcrumbList} itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/" itemProp="item"><span itemProp="name">WhoEarns</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className={styles.sep}>›</span>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href={`/category/${profile.category}`} itemProp="item">
              <span itemProp="name">{categoryLabel(profile.category)}</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <span className={styles.sep}>›</span>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name">{profile.name}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.avatarWrap}>
              <Avatar
                skin={profile.avatar_skin}
                hair={profile.avatar_hair}
                style={profile.avatar_style}
                jersey={profile.avatar_jersey}
                number={profile.avatar_number}
                bg={profile.avatar_bg}
                accessory={profile.avatar_accessory}
                size={80}
                name={profile.name}
              />
            </div>
            <div className={styles.headerText}>
              <h1 className={styles.h1}>{profile.name}</h1>
              <div className={styles.metaRow}>
                {profile.meta?.map((m, i) => (
                  <span key={i} className={styles.metaItem}>{m}</span>
                ))}
              </div>
              <div className={styles.tags}>
                {profile.tags?.map((t, i) => (
                  <span key={i} className={`${styles.tag} ${styles[`tag_${t.type}`]}`}>{t.label}</span>
                ))}
              </div>
            </div>
          </div>

          {profile.stats?.length > 0 && (
            <div className={styles.statsGrid}>
              {profile.stats.map((stat, i) => (
                <div key={i} className={styles.statBox}>
                  <div className={styles.statLabel}>
                    {stat.label}
                    {stat.verified && <span className="badge verified">verified</span>}
                    {stat.estimated && <span className="badge estimated">est</span>}
                  </div>
                  <div className={`${styles.statValue} ${stat.color ? styles[`val_${stat.color}`] : ''}`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SOCIAL LINKS */}
          {profile.social_links && profile.social_links.length > 0 && (
            <div className={styles.socialLinks}>
              {profile.social_links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <span className={styles.socialIcon}>{iconFor(link.icon)}</span>
                  <span className={styles.socialLabel}>{link.label}</span>
                </a>
              ))}
            </div>
          )}
        </header>

        {profile.seo_content && (
          <article className={styles.seoContent} itemScope itemType="https://schema.org/Article">
            <h2 className={styles.seoH2}>{profile.name} — Net Worth and Career Earnings</h2>
            <div className={styles.seoBody} dangerouslySetInnerHTML={{ __html: profile.seo_content }} />
          </article>
        )}

        {profile.career_table && profile.career_table.length > 0 && (
          <section className={styles.careerSection}>
            <h2 className={styles.sectionTitle}>{profile.name} — Club Career Statistics</h2>
            <div className={styles.tableWrap}>
              <table className={styles.careerTable}>
                <thead>
                  <tr><th>Club</th><th>Country</th><th>Years</th><th>Apps</th><th>Goals</th><th>Assists</th></tr>
                </thead>
                <tbody>
                  {profile.career_table.map((row, i) => (
                    <tr key={i}>
                      <td><strong>{row.club}</strong></td>
                      <td>{row.flag}</td>
                      <td>{row.years}</td>
                      <td>{row.apps}</td>
                      <td><strong>{row.goals}</strong></td>
                      <td>{row.assists}</td>
                    </tr>
                  ))}
                  <tr className={styles.totalRow}>
                    <td colSpan={3}><strong>Career Total</strong></td>
                    <td><strong>{profile.career_total_apps}</strong></td>
                    <td><strong className={styles.goldText}>{profile.career_total_goals}</strong></td>
                    <td><strong>{profile.career_total_assists}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {(profile.info_box_1 || profile.info_box_2) && (
          <div className={styles.infoGrid}>
            {[profile.info_box_1, profile.info_box_2].filter(Boolean).map((box, i) => (
              <section key={i} className={styles.infoBox}>
                <h3 className={styles.infoTitle}>{box!.title}</h3>
                <dl className={styles.infoList}>
                  {box!.rows.map((row, j) => (
                    <div key={j} className={styles.infoRow}>
                      <dt>{row.key}</dt>
                      <dd className={row.color ? styles[`val_${row.color}`] : ''}>
                        {row.value}
                        {row.verified && <span className="badge verified"> verified</span>}
                        {row.estimated && <span className="badge estimated"> est</span>}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        )}

        <ProfileInteractive profile={profile} />

        <footer className={styles.profileFooter}>
          <p>
            {profile.is_verified
              ? 'Data sourced from verified official filings and records.'
              : 'Figures marked est. are estimated from publicly available sources including Forbes, Bloomberg and reported deals.'}{' '}
            Last reviewed: {profile.last_reviewed}.{' '}
            <Link href="mailto:hello@whoearns.com">Dispute this data</Link>
          </p>
        </footer>
      </main>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 20px 32px' }}>
        <SimilarProfiles currentSlug={profile.slug} category={profile.category} currentName={profile.name} />
      </div>
    </>
  )
}

function iconFor(icon: string): string {
  const map: Record<string, string> = {
    Instagram: '📸',
    X: '𝕏',
    YouTube: '▶',
    TikTok: '♪',
    LinkedIn: 'in',
    Web: '🌐',
    Facebook: 'f',
    Twitch: '◈',
  }
  return map[icon] || '🔗'
}

function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    footballers: 'Football Players', basketball: 'Basketball Players',
    singers: 'Singers and Rappers', actors: 'Actors',
    creators: 'Social Media Creators', 'tech-founders': 'Tech Founders',
    politicians: 'Politicians', athletes: 'Athletes',
    'ai-startups': 'AI Startups', 'tech-giants': 'Tech Giants',
    'startup-mrr': 'Startup MRR', 'indie-founders': 'Indie Founders',
    'media-companies': 'Media Companies', 'sports-teams': 'Sports Teams',
    poland: 'Poland', onlyfans: 'OnlyFans Creators', footballer: 'Football Players', creator: 'Social Media Creators',
    tech: 'Tech Giants', ai: 'AI Startups', founder: 'Tech Founders',
    startup: 'Startup MRR', business: 'Business', athlete: 'Athletes',
    musician: 'Singers and Rappers',
  }
  return map[cat] || 'Profiles'
}

function buildJsonLd(profile: Profile, slug: string) {
  const isOrg = ['tech', 'ai', 'startup', 'business', 'ai-startups', 'tech-giants', 'startup-mrr'].includes(profile.category)
  const mainStat = profile.stats?.[0]
  const base = {
    '@context': 'https://schema.org',
    '@type': isOrg ? 'Organization' : 'Person',
    name: profile.name,
    url: `https://whoearns.com/${slug}`,
    description: profile.seo_description || `${profile.name} — ${mainStat?.label}: ${mainStat?.value}`,
    sameAs: profile.social_links?.map(s => s.url).filter(Boolean) || [],
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'WhoEarns', item: 'https://whoearns.com' },
      { '@type': 'ListItem', position: 2, name: categoryLabel(profile.category), item: `https://whoearns.com/category/${profile.category}` },
      { '@type': 'ListItem', position: 3, name: profile.name, item: `https://whoearns.com/${slug}` },
    ],
  }
  const webpage = {
    '@context': 'https://schema.org', '@type': 'WebPage',
    name: profile.seo_title || `${profile.name} Net Worth — WhoEarns`,
    description: profile.seo_description,
    url: `https://whoearns.com/${slug}`,
    dateModified: profile.updated_at,
    about: { '@type': isOrg ? 'Organization' : 'Person', name: profile.name },
  }
  return [base, breadcrumb, webpage]
}
