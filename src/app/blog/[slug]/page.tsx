import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog'
import styles from '../blog.module.css'

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map(slug => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS[slug]
  if (!post) return { title: 'Post Not Found · WhoEarns' }
  return {
    title: `${post.title} · WhoEarns`,
    description: post.excerpt,
    alternates: { canonical: `https://whoearns.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      siteName: 'WhoEarns',
    },
  }
}

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = BLOG_POSTS[slug]
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'WhoEarns' },
    publisher: { '@type': 'Organization', name: 'WhoEarns', url: 'https://whoearns.com' },
    mainEntityOfPage: `https://whoearns.com/blog/${slug}`,
  }

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className={styles.postMain}>
        <nav className={styles.breadcrumb}>
          <Link href="/">WhoEarns</Link>
          <span>›</span>
          <Link href="/blog">Blog</Link>
          <span>›</span>
          <span>{post.category}</span>
        </nav>

        <header className={styles.postHeader}>
          <div className={styles.postMeta}>
            <span className={styles.cardCat}>{post.category}</span>
            <span className={styles.cardDate}>{post.date}</span>
            <span className={styles.cardRead}>{post.readTime} min read</span>
          </div>
          <h1 className={styles.postH1}>{post.title}</h1>
          <p className={styles.postExcerpt}>{post.excerpt}</p>
        </header>

        <article
          className={styles.postBody}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className={styles.postFooter}>
          <div className={styles.postDisclaimer}>
            All net worth figures are estimates from Forbes, Bloomberg and public records unless stated as verified.
            Data accurate as of {post.date}. <Link href="/disclaimer">Full disclaimer →</Link>
          </div>
          <Link href="/blog" className={styles.backLink}>← Back to Blog</Link>
        </footer>
      </main>
    </>
  )
}
