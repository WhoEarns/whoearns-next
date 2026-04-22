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
    .select('slug, name, category, stats, meta, tags, growth, avatar_skin, avatar_hair, avatar_style, avatar_jersey, avatar_number, avatar_bg, avatar_accessory')
    .eq('category', category)
    .neq('slug', currentSlug)
    .order('rank_order', { ascending: true })
    .limit(4)

  const profiles: Partial<Profile>[] = data || []
  if (profiles.length === 0) return null

  return (
    <section className={styles.wrap}>
      <div className={styles.head}>
        <div className={styles.label}>Similar profiles</div>
        <Link href={`/category/${category}`} className={styles.seeAll}>
          View all →
        </Link>
      </div>
      <div className={styles.grid}>
        {profiles.map(p => (
          <Link key={p.slug} href={`/${p.slug}`} className={styles.card}>
            <div className={styles.ava}>
              <Avatar
                skin={p.avatar_skin!} hair={p.avatar_hair!}
                style={p.avatar_style!} jersey={p.avatar_jersey!}
                number={p.avatar_number!} bg={p.avatar_bg!}
                accessory={p.avatar_accessory!} size={40}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.name}>{p.name}</div>
              <div className={styles.detail}>{(p.meta as string[])?.[0]}</div>
            </div>
            <div className={styles.val}>
              <div className={styles.valMain}>{(p.stats as any[])?.[0]?.value}</div>
              <div className={styles.valLabel}>{(p.stats as any[])?.[0]?.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
