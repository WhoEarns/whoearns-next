'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Profile } from '@/types'
import Avatar from '@/components/Avatar'
import styles from './CategoryClient.module.css'

interface Props {
  profiles: Profile[]
  categoryLabel: string
}

export default function CategoryClient({ profiles, categoryLabel }: Props) {
  const [sortBy, setSortBy] = useState<'rank' | 'name' | 'growth'>('rank')
  const [view, setView] = useState<'chart' | 'table'>('chart')

  const sorted = [...profiles].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'growth') {
      const ga = parseFloat(a.growth?.replace(/[^0-9.-]/g, '') || '0')
      const gb = parseFloat(b.growth?.replace(/[^0-9.-]/g, '') || '0')
      return gb - ga
    }
    return a.rank_order - b.rank_order
  })

  // Get numeric value from string like "$1.1B", "$200M", "$3.7B ARR"
  const getNumericValue = (str: string): number => {
    if (!str) return 0
    const cleaned = str.replace(/[^0-9.BMKTbmkt]/g, '')
    const num = parseFloat(cleaned)
    if (isNaN(num)) return 0
    if (str.includes('T')) return num * 1000
    if (str.includes('B') || str.includes('b')) return num
    if (str.includes('M') || str.includes('m')) return num / 1000
    if (str.includes('K') || str.includes('k')) return num / 1000000
    return num
  }

  const maxVal = Math.max(...profiles.map(p => getNumericValue(p.stats?.[0]?.value || '0')))
  const top10 = profiles.slice(0, 10)

  return (
    <div className={styles.wrap}>

      {/* VIEW TOGGLE */}
      <div className={styles.controls}>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewBtn} ${view === 'chart' ? styles.viewActive : ''}`}
            onClick={() => setView('chart')}>
            Bar Chart
          </button>
          <button
            className={`${styles.viewBtn} ${view === 'table' ? styles.viewActive : ''}`}
            onClick={() => setView('table')}>
            Data Table
          </button>
        </div>
        <div className={styles.sortRow}>
          <span className={styles.sortLabel}>Sort:</span>
          {(['rank', 'name', 'growth'] as const).map(s => (
            <button key={s} className={`${styles.sortBtn} ${sortBy === s ? styles.sortActive : ''}`}
              onClick={() => setSortBy(s)}>
              {s === 'rank' ? 'Highest' : s === 'name' ? 'A-Z' : 'Trending'}
            </button>
          ))}
        </div>
      </div>

      {view === 'chart' ? (
        /* BAR CHART */
        <div className={styles.chart}>
          <div className={styles.chartTitle}>
            Top 10 {categoryLabel} — {top10[0]?.stats?.[0]?.label || 'Net Worth'}
          </div>
          <div className={styles.bars}>
            {top10.map((p, i) => {
              const val = getNumericValue(p.stats?.[0]?.value || '0')
              const pct = maxVal > 0 ? (val / maxVal) * 100 : 0
              return (
                <Link key={p.slug} href={`/${p.slug}`} className={styles.barRow}>
                  <div className={styles.barName}>
                    <div className={styles.barAva}>
                      <Avatar skin={p.avatar_skin} hair={p.avatar_hair}
                        style={p.avatar_style} jersey={p.avatar_jersey}
                        number={p.avatar_number} bg={p.avatar_bg}
                        accessory={p.avatar_accessory} size={28} />
                    </div>
                    <span className={styles.barNameText}>{p.name}</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${pct}%`,
                        background: i === 0 ? 'var(--gold)' :
                                    i === 1 ? '#9ca3af' :
                                    i === 2 ? '#b45309' :
                                    'var(--blue)',
                        opacity: Math.max(0.4, 1 - i * 0.07),
                      }}
                    />
                  </div>
                  <div className={styles.barVal}>{p.stats?.[0]?.value}</div>
                </Link>
              )
            })}
          </div>
          <div className={styles.chartNote}>
            Click any bar to view full profile · Figures are estimates unless marked verified
          </div>
        </div>
      ) : (
        /* DATA TABLE */
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>{sorted[0]?.stats?.[0]?.label || 'Net Worth'}</th>
                <th>{sorted[0]?.stats?.[1]?.label || 'Stat 2'}</th>
                <th>{sorted[0]?.stats?.[2]?.label || 'Stat 3'}</th>
                <th>Country</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, i) => (
                <tr key={p.slug}>
                  <td className={styles.tdRank}>{i + 1}</td>
                  <td>
                    <Link href={`/${p.slug}`} className={styles.tdName}>
                      <div className={styles.tdAva}>
                        <Avatar skin={p.avatar_skin} hair={p.avatar_hair}
                          style={p.avatar_style} jersey={p.avatar_jersey}
                          number={p.avatar_number} bg={p.avatar_bg}
                          accessory={p.avatar_accessory} size={28} />
                      </div>
                      {p.name}
                    </Link>
                  </td>
                  <td className={styles.tdGold}>{p.stats?.[0]?.value || '—'}</td>
                  <td>{p.stats?.[1]?.value || '—'}</td>
                  <td>{p.stats?.[2]?.value || '—'}</td>
                  <td className={styles.tdFlag}>{p.flag}</td>
                  <td>
                    {p.growth ? (
                      <span className={`${styles.growth} ${p.growth.startsWith('-') ? styles.growthDn : styles.growthUp}`}>
                        {p.growth}
                      </span>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* QUICK FACTS */}
      <div className={styles.quickFacts}>
        <div className={styles.factTitle}>Quick facts</div>
        <div className={styles.factGrid}>
          <div className={styles.fact}>
            <div className={styles.factLabel}>Profiles tracked</div>
            <div className={styles.factVal}>{profiles.length}</div>
          </div>
          <div className={styles.fact}>
            <div className={styles.factLabel}>Highest {profiles[0]?.stats?.[0]?.label}</div>
            <div className={styles.factVal}>{profiles[0]?.stats?.[0]?.value || '—'}</div>
          </div>
          <div className={styles.fact}>
            <div className={styles.factLabel}>Countries represented</div>
            <div className={styles.factVal}>{new Set(profiles.map(p => p.country)).size}</div>
          </div>
          <div className={styles.fact}>
            <div className={styles.factLabel}>With AI analysis</div>
            <div className={styles.factVal}>{profiles.filter(p => p.ai_enabled).length}</div>
          </div>
        </div>
      </div>

    </div>
  )
}
