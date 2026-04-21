import Link from 'next/link'
import styles from './legal.module.css'

interface Props {
  title: string
  updated: string
  children: React.ReactNode
}

export default function LegalLayout({ title, updated, children }: Props) {
  return (
    <main className={styles.main}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">WhoEarns</Link>
        <span>›</span>
        <span>{title}</span>
      </nav>
      <h1 className={styles.h1}>{title}</h1>
      <div className={styles.date}>Last updated: {updated}</div>
      <div className={styles.body}>{children}</div>
    </main>
  )
}
