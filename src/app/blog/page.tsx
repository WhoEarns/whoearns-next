import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog'
import styles from './blog.module.css'

export const metadata: Metadata = {
  title: 'Blog — Net Worth Rankings, Earnings Analysis and Financial Insights',
  description: 'In-depth net worth rankings, earnings analysis and financial data for athletes, entertainers and tech billionaires. NBA, football, music and more.',
  alternates: { canonical: 'https://whoearns.com/blog' },
}

export default function BlogIndex() {
  const posts = Object.values(BLOG_POSTS).sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <main className={styles.main}>
      <nav className={styles.breadcrumb}>
        <Link href="/">WhoEarns</Link>
        <span>›</span>
        <span>Blog</span>
      </nav>

      <header className={styles.header}>
        <div className={styles.eyebrow}>Analysis · Rankings · Deep Dives</div>
        <h1 className={styles.h1}>WhoEarns Blog</h1>
        <p className={styles.sub}>
          Net worth rankings, earnings analysis and financial deep dives for the world&apos;s highest earners.
          Updated around major sports events, financial reports and industry shifts.
        </p>
      </header>

      <div className={styles.grid}>
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
            <div className={styles.cardMeta}>
              <span className={styles.cardCat}>{post.category}</span>
              <span className={styles.cardDate}>{post.date}</span>
            </div>
            <h2 className={styles.cardTitle}>{post.title}</h2>
            <p className={styles.cardExcerpt}>{post.excerpt}</p>
            <div className={styles.cardFooter}>
              <span className={styles.cardRead}>{post.readTime} min read</span>
              <span className={styles.cardArrow}>Read →</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
