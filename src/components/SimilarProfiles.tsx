import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types'
import Avatar from '@/components/Avatar'
import styles from './SimilarProfiles.module.css'

interface Props {
  currentSlug: string
  category: string
  currentName: string
}

export default async function SimilarProfiles({ currentSlug, category, currentName }: Props) {
  const { data } = await supabase
    .from('profiles')
    .select('slug, name, category, stats, meta, tags, growth, avatar_skin, avatar_hair, avatar_style, avatar_jersey, avatar_number, avatar_bg, avatar_accessory, seo_description')
    .eq('category', category)
    .neq('slug', currentSlug)
    .order('rank_order', { ascending: true })
    .limit(4)

  const profiles: Partial<Profile>[] = data || []
  if (profiles.length === 0) return null

  const catLabel = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return (
    <section className={styles.wrap}>
      <div className={styles.head}>
        <div className={styles.headLeft}>
          <div className={styles.eyebrow}>You might also like</div>
          <h2 className={styles.title}>Similar profiles</h2>
        </div>
        <Link href={`/category/${category}`} className={styles.seeAll}>
          All {catLabel} →
        </Link>
      </div>

      <div className={styles.grid}>
        {profiles.map((p, i) => (
          <Link key={p.slug} href={`/${p.slug}`} className={styles.card}>
            {/* Rank badge */}
            <div className={styles.rankBadge}>{i + 1}</div>

            {/* Avatar */}
            <div className={styles.avaWrap}>
              <Avatar
                skin={p.avatar_skin!} hair={p.avatar_hair!}
                style={p.avatar_style!} jersey={p.avatar_jersey!}
                number={p.avatar_number!} bg={p.avatar_bg!}
                accessory={p.avatar_accessory!} size={56}
              />
            </div>

            {/* Info */}
            <div className={styles.info}>
              <div className={styles.name}>{p.name}</div>
              <div className={styles.meta}>{(p.meta as string[])?.[0]}</div>

              {/* Tags */}
              <div className={styles.tags}>
                {(p.tags as any[])?.slice(0, 2).map((t: any, j: number) => (
                  <span key={j} className={styles.tag}>{t.label}</span>
                ))}
              </div>
            </div>

            {/* Net worth */}
            <div className={styles.val}>
              <div className={styles.valNum}>{(p.stats as any[])?.[0]?.value}</div>
              <div className={styles.valLabel}>{(p.stats as any[])?.[0]?.label}</div>
              {p.growth && (
                <div className={`${styles.growth} ${p.growth.startsWith('-') ? styles.growthDn : styles.growthUp}`}>
                  {p.growth}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
