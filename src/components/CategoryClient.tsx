'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import type { Profile, Category, ActivityFeedItem } from '@/types'
import Avatar from '@/components/Avatar'
import styles from '@/components/HomepageClient.module.css'

interface Props {
  profiles: Profile[]
  feed: ActivityFeedItem[]
  categories: Category[]
}

// Maps category tab key → profile.category values in Supabase
const CATEGORY_MAP: Record<string, string[]> = {
  footballers:    ['footballers', 'footballer'],
  basketball:     ['basketball'],
  singers:        ['singers', 'musician'],
  actors:         ['actors', 'actor'],
  creators:       ['creators', 'creator'],
  'tech-founders':['tech-founders', 'founder'],
  politicians:    ['politicians', 'politician'],
  athletes:       ['athletes', 'athlete'],
  'ai-startups':  ['ai-startups', 'ai'],
  'tech-giants':  ['tech-giants', 'tech'],
  'startup-mrr':  ['startup-mrr', 'startup'],
  'indie-founders':['indie-founders', 'indie-founder', 'founder'],
  'media-companies':['media-companies', 'media'],
  'sports-teams': ['sports-teams', 'sports-team'],
  poland:         ['pl'],   // filtered by country
}

const PEOPLE_CATS  = ['footballers','basketball','singers','actors','creators','tech-founders','politicians','athletes']
const COMPANY_CATS = ['ai-startups','tech-giants','startup-mrr','indie-founders','media-companies','sports-teams']

export default function HomepageClient({ profiles, feed, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState('footballers')
  const [showCompanies, setShowCompanies] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Profile[]>([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [compareA, setCompareA] = useState('')
  const [compareB, setCompareB] = useState('')
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!searchRef.current?.contains(e.target as Node)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (searchQuery.length < 2) { setSearchResults([]); setSearchOpen(false); return }
    const q = searchQuery.toLowerCase()
    const results = profiles.filter(p =>
      p.name.toLowerCase().includes(q) || p.slug.includes(q)
    ).slice(0, 6)
    setSearchResults(results)
    setSearchOpen(results.length > 0)
  }, [searchQuery, profiles])

  const leaderboard = profiles
    .filter(p => {
      if (activeCategory === 'poland') return p.country === 'pl'
      const cats = CATEGORY_MAP[activeCategory] || [activeCategory]
      return cats.some(c => p.category === c)
    })
    .sort((a, b) => a.rank_order - b.rank_order)
    .slice(0, 10)

  const trending = [...profiles]
    .filter(p => p.growth && p.growth.startsWith('+'))
    .sort((a, b) => {
      const ga = parseFloat((a.growth || '0').replace(/[^0-9.]/g, ''))
      const gb = parseFloat((b.growth || '0').replace(/[^0-9.]/g, ''))
      return gb - ga
    })
    .slice(0, 9)

  const getCat = (key: string) => categories.find(c => c.key === key)
  const activecat = getCat(activeCategory)

  const peopleCats  = categories.filter(c => PEOPLE_CATS.includes(c.key))
  const companyCats = categories.filter(c => COMPANY_CATS.includes(c.key))

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroOrb} />
        <div className={styles.eyebrow}>Revenue · Net Worth · Career Stats</div>
        <h1 className={styles.h1}>
          Who&apos;s making<br />
          <span className={styles.gold}>what.</span>{' '}
          <span className={styles.italic}>Right now.</span>
        </h1>
        <p className={styles.sub}>
          Net worth, monthly revenue and career earnings for{' '}
          <strong>footballers, creators, tech billionaires</strong> and AI startups.
          The numbers people actually want to see.
        </p>

        <div className={styles.searchOuter} ref={searchRef}>
          <div className={styles.searchBox}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search Lewandowski, Taylor Swift, OpenAI…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setSearchOpen(true)}
              autoComplete="off" autoCorrect="off" spellCheck={false}
              aria-label="Search profiles"
            />
            <button className={styles.searchBtn} aria-label="Search">Search</button>
          </div>

          {searchOpen && searchResults.length > 0 && (
            <div className={styles.searchDrop} role="listbox">
              {searchResults.map(p => (
                <Link key={p.slug} href={`/${p.slug}`} className={styles.searchItem}
                  role="option" onClick={() => { setSearchOpen(false); setSearchQuery('') }}>
                  <div className={styles.searchAva}>
                    <Avatar skin={p.avatar_skin} hair={p.avatar_hair} style={p.avatar_style}
                      jersey={p.avatar_jersey} number={p.avatar_number} bg={p.avatar_bg}
                      accessory={p.avatar_accessory} size={34} />
                  </div>
                  <div>
                    <div className={styles.searchName}>{p.name}</div>
                    <div className={styles.searchDet}>{p.meta?.[0]} · {p.tags?.[0]?.label}</div>
                  </div>
                  <div className={styles.searchVal}>{p.stats?.[0]?.value}</div>
                </Link>
              ))}
            </div>
          )}

          <div className={styles.quickBtns}>
            {/* Show top profile from each main category for discovery */}
            {['cristiano-ronaldo','taylor-swift','lebron-james','elon-musk',
              'mrbeast','openai','robert-lewandowski','dwayne-johnson']
              .map(slug => profiles.find(p => p.slug === slug))
              .filter(Boolean)
              .map(p => (
                <Link key={p!.slug} href={`/${p!.slug}`} className={styles.qb}>
                  {p!.name.split(' ')[0]}
                </Link>
              ))
            }
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {[...profiles, ...profiles].map((p, i) => (
            <span key={i} className={styles.tickerItem}>
              <span className={styles.tickerName}>{p.name}</span>
              <span className={styles.tickerVal}>{p.stats?.[0]?.value} {p.stats?.[0]?.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* COUNTERS */}
      <div className={styles.counters}>
        <div className={styles.counter}><div className={styles.counterNum}>{profiles.length.toLocaleString()}</div><div className={styles.counterLabel}>Profiles</div></div>
        <div className={styles.counter}><div className={styles.counterNum}>{new Set(profiles.map(p => p.country)).size}</div><div className={styles.counterLabel}>Countries</div></div>
        <div className={styles.counter}><div className={styles.counterNum}>$47T+</div><div className={styles.counterLabel}>Wealth tracked</div></div>
        <div className={styles.counter}><div className={styles.counterNum}>{profiles.filter((p: any) => p.ai_enabled).length}</div><div className={styles.counterLabel}>AI analyses</div></div>
      </div>

      {/* ACTIVITY FEED — only show if there's data */}
      {feed && feed.length > 0 && (
      <section className={styles.section}>
        <div className={styles.feedHead}>
          <h2 className={styles.sectionTitle}>What&apos;s happening</h2>
          <div className={styles.liveTag}><span className={styles.liveDot} />Live updates</div>
        </div>
        <div className={styles.feedList}>
          {feed.map(item => (
            <div key={item.id} className={styles.feedItem}
              onClick={() => item.profile_slug && (window.location.href = `/${item.profile_slug}`)}
              style={{ cursor: item.profile_slug ? 'pointer' : 'default' }}>
              <div className={styles.feedIco}>—</div>
              <div className={styles.feedText} dangerouslySetInnerHTML={{ __html: item.text_html }} />
              <span className={`${styles.feedType} ${styles[`feedType_${item.feed_type}`]}`}>{item.feed_type}</span>
              <span className={styles.feedTime}>{item.display_time}</span>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* CATEGORIES + LEADERBOARD */}
      <section className={styles.section} id="leaderboard">

        {/* ── PEOPLE CATEGORIES ─────────────────────── */}
        <div className={styles.secEy}>People</div>
        <h2 className={styles.sectionTitle}>Athletes, Artists and Icons</h2>
        <p className={styles.secSub}>Net worth and career stats for the world&apos;s most famous people</p>
        <div className={styles.catGrid}>
          {peopleCats.map(cat => (
            <button key={cat.key}
              className={`${styles.cat} ${activeCategory === cat.key ? styles.catActive : ''}`}
              onClick={() => { setActiveCategory(cat.key); setShowCompanies(false) }}>
              <div className={styles.catName}>{cat.label}</div>
              <div className={styles.catHint}>{cat.hint}</div>
            </button>
          ))}
        </div>

        {/* ── COMPANY CATEGORIES ────────────────────── */}
        <div className={styles.companyToggle}>
          <button className={styles.toggleBtn} onClick={() => setShowCompanies(v => !v)}>
            {showCompanies ? '▲' : '▼'} Companies and Startups
          </button>
          <span className={styles.toggleSub}>Tech giants, AI startups, verified MRR</span>
        </div>

        {showCompanies && (
          <div className={`${styles.catGrid} ${styles.catGridCompany}`}>
            {companyCats.map(cat => (
              <button key={cat.key}
                className={`${styles.cat} ${activeCategory === cat.key ? styles.catActive : ''}`}
                onClick={() => setActiveCategory(cat.key)}>
                <div className={styles.catName}>{cat.label}</div>
                <div className={styles.catHint}>{cat.hint}</div>
              </button>
            ))}
          </div>
        )}

        {/* ── REGIONAL LINK ─────────────────────────── */}
        <div className={styles.regionalRow}>
          <span className={styles.regionalLabel}>Regional profiles:</span>
          <button className={`${styles.regionalBtn} ${activeCategory === 'poland' ? styles.regionalBtnActive : ''}`}
            onClick={() => { setActiveCategory('poland'); setShowCompanies(false) }}>
            Poland
          </button>
        </div>

        {/* ── LEADERBOARD ───────────────────────────── */}
        <div className={styles.lbHead}>
          <div>
            <div className={styles.lbTitle}>{activecat?.title || 'Leaderboard'}</div>
            <div className={styles.lbSub}>{activecat?.subtitle}</div>
          </div>
          <Link href={`/category/${activeCategory}`} className={styles.lbSeeAll}>
            See all →
          </Link>
        </div>

        <div className={styles.rankList} role="list">
          {leaderboard.length === 0 ? (
            <div className={styles.empty}>
              No profiles in this category yet.{' '}
              <a href="mailto:hello@whoearns.com">Suggest a profile →</a>
            </div>
          ) : leaderboard.map((p, i) => (
            <Link key={p.slug} href={`/${p.slug}`}
              className={`${styles.rankCard} ${i===0?styles.p1:i===1?styles.p2:i===2?styles.p3:''}`}
              role="listitem">
              <div className={`${styles.rankPos} ${i<3?styles.rankTop:''}`}>{i+1}</div>
              <div className={styles.rankAva}>
                <Avatar skin={p.avatar_skin} hair={p.avatar_hair} style={p.avatar_style}
                  jersey={p.avatar_jersey} number={p.avatar_number} bg={p.avatar_bg}
                  accessory={p.avatar_accessory} size={38} />
              </div>
              <div className={styles.rankInfo}>
                <div className={styles.rankName}>{p.name}</div>
                <div className={styles.rankDet}>{p.meta?.[0]} · {p.tags?.[0]?.label}</div>
              </div>
              <div className={styles.rankVal}>
                <div className={`${styles.rankMain} ${p.stats?.[0]?.color ? styles[`val_${p.stats[0].color}`] : ''}`}>
                  {p.stats?.[0]?.value}
                  {p.growth && (
                    <span className={`${styles.growth} ${p.growth.startsWith('-')?styles.growthDn:styles.growthUp}`}>
                      {p.growth}
                    </span>
                  )}
                </div>
                <div className={styles.rankSub}>{p.stats?.[0]?.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* COMPARE */}
      <section className={styles.section} id="compare">
        <div className={styles.secEy}>Compare</div>
        <h2 className={styles.sectionTitle} style={{ marginBottom: '5px' }}>Compare Any Two</h2>
        <p className={styles.secSub} style={{ marginBottom: '18px' }}>Pick any two profiles and compare them side by side</p>
        <div className={styles.compareSelects}>
          <select className={styles.compareSelect} value={compareA}
            onChange={e => setCompareA(e.target.value)} aria-label="Select first profile">
            <option value="">Select first profile...</option>
            {profiles.map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}
          </select>
          <div className={styles.vsMid}>vs</div>
          <select className={styles.compareSelect} value={compareB}
            onChange={e => setCompareB(e.target.value)} aria-label="Select second profile">
            <option value="">Select second profile...</option>
            {profiles.map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}
          </select>
        </div>
        {compareA && compareB && (() => {
          const pA = profiles.find(p => p.slug === compareA)
          const pB = profiles.find(p => p.slug === compareB)
          if (!pA || !pB) return null
          const allLabels = [...new Set([
            ...(pA.stats||[]).map((s:any)=>s.label),
            ...(pB.stats||[]).map((s:any)=>s.label),
          ])]
          const getVal = (p:any, label:string) => p.stats?.find((s:any)=>s.label===label)?.value||'—'
          return (
            <div className={styles.compareCards}>
              {[pA,pB].map(p => (
                <div key={p.slug} className={styles.compareCard}>
                  <div className={styles.compareCardHead}>
                    <div className={styles.compareAva}>
                      <Avatar skin={p.avatar_skin} hair={p.avatar_hair} style={p.avatar_style}
                        jersey={p.avatar_jersey} number={p.avatar_number} bg={p.avatar_bg}
                        accessory={p.avatar_accessory} size={42} />
                    </div>
                    <div>
                      <div className={styles.compareName}>{p.name}</div>
                      <div className={styles.compareSub}>{p.meta?.[0]}</div>
                    </div>
                  </div>
                  {allLabels.map(label=>(
                    <div key={label} className={styles.compareRow}>
                      <span className={styles.compareKey}>{label}</span>
                      <span className={styles.compareVal}>{getVal(p,label)}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )
        })()}
      </section>

      {/* TRENDING */}
      <section className={styles.section}>
        <div className={styles.secEy}>Trending</div>
        <h2 className={styles.sectionTitle} style={{ marginBottom: '18px' }}>Most Searched</h2>
        <div className={styles.trendGrid}>
          {trending.map(p => (
            <Link key={p.slug} href={`/${p.slug}`} className={styles.trendCard}>
              <div className={styles.trendAva}>
                <Avatar skin={p.avatar_skin} hair={p.avatar_hair} style={p.avatar_style}
                  jersey={p.avatar_jersey} number={p.avatar_number} bg={p.avatar_bg}
                  accessory={p.avatar_accessory} size={36} />
              </div>
              <div>
                <div className={styles.trendName}>{p.name}</div>
                <div className={styles.trendFact}>{p.stats?.[0]?.value} {p.stats?.[0]?.label}</div>
              </div>
              <span className={styles.trendArr}>›</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO CONTENT BLOCK */}
      <section className={styles.section} style={{ paddingBottom: '48px' }}>
        <div className={styles.seoBlock}>
          <div className={styles.seoMain}>
            <div className={styles.secEy}>About WhoEarns</div>
            <h2 className={styles.sectionTitle} style={{ marginBottom: '14px' }}>
              The numbers people actually want to see
            </h2>
            <p className={styles.seoP}>
              WhoEarns is a revenue intelligence and net worth tracking platform covering the world&apos;s most famous athletes, entertainers, tech founders and AI companies. We track verified revenue data from SEC EDGAR filings, Stripe-connected APIs and official financial reports — alongside clearly labelled estimates from Forbes, Bloomberg and public records for individuals whose wealth isn&apos;t publicly disclosed.
            </p>
            <p className={styles.seoP}>
              Our football player net worth rankings cover everyone from Cristiano Ronaldo ($1.1 billion) to emerging stars, with full career stats, contract values and endorsement breakdowns. Our tech founder wealth tracker covers the billionaires behind the AI era — Jensen Huang, Elon Musk, Mark Zuckerberg — with NVIDIA, Tesla and Meta revenue data verified from official filings.
            </p>
            <p className={styles.seoP}>
              For AI companies, WhoEarns tracks annual recurring revenue, valuation and growth rates for OpenAI, Anthropic, Midjourney, Cursor and dozens of the fastest-growing startups. For musicians and entertainers, we cover touring income, catalog values, streaming royalties and brand deals — the full picture behind the headlines.
            </p>
            <p className={styles.seoP}>
              Every figure on WhoEarns is labelled{' '}
              <span className="badge verified">verified</span> (from official sources) or{' '}
              <span className="badge estimated">est</span> (estimated from public data).
              We dispute no figure takes more than 48 hours — email{' '}
              <a href="mailto:hello@whoearns.com" style={{color:'var(--gold)'}}>hello@whoearns.com</a>.{' '}
              <Link href="/disclaimer" style={{color:'var(--t2)'}}>Full data disclaimer →</Link>
            </p>
          </div>
          <div className={styles.seoSide}>
            <div className={styles.seoCard}>
              <div className={styles.seoCardTitle}>Data sources</div>
              {[
                ['SEC EDGAR', 'US public company filings'],
                ['Forbes', 'Celebrity net worth estimates'],
                ['Bloomberg', 'Billionaire index tracking'],
                ['Stripe API', 'Startup MRR verification'],
                ['UEFA / FIFA', 'Football career statistics'],
                ['Blockchain', 'Crypto holdings on-chain'],
              ].map(([src, desc]) => (
                <div key={src} className={styles.srcRow}>
                  <span className={styles.srcName}>{src}</span>
                  <span className={styles.srcDesc}>{desc}</span>
                </div>
              ))}
              <Link href="/disclaimer" className={styles.srcMore}>Full data methodology →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.legend}>
            <span><span className="badge verified">verified</span> confirmed via official filings, APIs or on-chain data</span>
            <span><span className="badge estimated">est</span> estimated from Forbes, Bloomberg and public records</span>
            <span>Dispute: <a href="mailto:hello@whoearns.com" style={{color:'var(--gold)',textDecoration:'none'}}>hello@whoearns.com</a></span>
          </div>
          <div className={styles.footerGrid}>
            <div>
              <div className={styles.footerBrand}>Who<em style={{color:'var(--gold)',fontStyle:'normal'}}>Earns</em></div>
              <p className={styles.footerTag}>Revenue intelligence for every business — tech giants, footballers, creators, AI startups and local businesses.</p>
              <div className={styles.footerSoc}>
                <a href="https://x.com/WhoEarnsCom" target="_blank" rel="noopener noreferrer" className={styles.footerSocLink}>X — @WhoEarnsCom</a>
                <a href="https://instagram.com/whoearns" target="_blank" rel="noopener noreferrer" className={styles.footerSocLink}>Instagram</a>
                <a href="https://tiktok.com/@whoearns" target="_blank" rel="noopener noreferrer" className={styles.footerSocLink}>TikTok</a>
              </div>
            </div>
            <div>
              <div className={styles.footerColTitle}>People</div>
              <ul className={styles.footerLinks}>
                {peopleCats.map(c=>(
                  <li key={c.key}><button className={styles.footerLink} onClick={()=>{ setActiveCategory(c.key); document.getElementById('leaderboard')?.scrollIntoView({behavior:'smooth'}) }}>{c.label}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <div className={styles.footerColTitle}>Companies</div>
              <ul className={styles.footerLinks}>
                {companyCats.map(c=>(
                  <li key={c.key}><button className={styles.footerLink} onClick={()=>{ setActiveCategory(c.key); setShowCompanies(true); document.getElementById('leaderboard')?.scrollIntoView({behavior:'smooth'}) }}>{c.label}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <div className={styles.footerColTitle}>Legal</div>
              <ul className={styles.footerLinks}>
                <li><Link href="/blog" className={styles.footerLink}>Blog</Link></li>
                <li><Link href="/terms" className={styles.footerLink}>Terms of Service</Link></li>
                <li><Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link></li>
                <li><Link href="/cookies" className={styles.footerLink}>Cookie Policy</Link></li>
                <li><Link href="/disclaimer" className={styles.footerLink}>Data Disclaimer</Link></li>
                <li><a href="mailto:hello@whoearns.com" className={styles.footerLink}>GDPR Request</a></li>
                <li><a href="mailto:hello@whoearns.com" className={styles.footerLink}>Submit a Profile</a></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerLegal}>
              © 2026 WhoEarns. All net worth figures marked <span className="badge estimated" style={{fontSize:'7px'}}>est</span> are estimates from publicly available information. Nothing on this site constitutes financial, legal or investment advice.{' '}
              <Link href="/disclaimer">Data Disclaimer</Link> · <Link href="/privacy">Privacy Policy</Link> · <a href="mailto:hello@whoearns.com">hello@whoearns.com</a>
            </p>
            <div className={styles.footerBadges}><span className={styles.badge}>GDPR</span><span className={styles.badge}>Apr 2026</span></div>
          </div>
        </div>
      </footer>
    </>
  )
}
