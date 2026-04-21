'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './Nav.module.css'

export default function Nav() {
  const [light, setLight] = useState(false)
  const [proOpen, setProOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('we-theme')
    if (saved === 'light') { setLight(true); document.body.classList.add('light') }
  }, [])

  const toggleMode = () => {
    const next = !light
    setLight(next)
    document.body.classList.toggle('light', next)
    localStorage.setItem('we-theme', next ? 'light' : 'dark')
  }

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Who<em>Earns</em>
        </Link>
        <div className={styles.right}>
          <button className={styles.mode} onClick={toggleMode} aria-label="Toggle theme">
            {light ? '🌙' : '☀'}
          </button>
          <button className={styles.pro} onClick={() => setProOpen(true)}>
            Go Pro
          </button>
        </div>
      </nav>

      {proOpen && (
        <div className={styles.overlay} onClick={() => setProOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.handle} />
            <button className={styles.close} onClick={() => setProOpen(false)}>✕</button>
            <div className={styles.modalTitle}>Upgrade to Pro</div>
            <div className={styles.modalSub}>Unlimited AI analyses, export profiles and claim your listing.</div>
            <div className={styles.plans}>
              <div className={styles.plan}>
                <div className={styles.tier}>Free</div>
                <div className={styles.price}>€0</div>
                <div className={styles.period}>forever</div>
                <ul className={styles.features}>
                  <li>All leaderboards</li>
                  <li>All profile data</li>
                  <li>3 AI analyses/day</li>
                  <li className={styles.no}>Unlimited AI analyses</li>
                  <li className={styles.no}>Export profiles</li>
                  <li className={styles.no}>Claim profile</li>
                </ul>
                <button className={styles.planBtn} onClick={() => setProOpen(false)}>
                  Continue Free
                </button>
              </div>
              <div className={`${styles.plan} ${styles.featured}`}>
                <div className={styles.tier}>Pro</div>
                <div className={`${styles.price} ${styles.gold}`}>€9</div>
                <div className={styles.period}>per month · cancel anytime</div>
                <ul className={styles.features}>
                  <li>Everything free</li>
                  <li>Unlimited AI analyses</li>
                  <li>Export any profile</li>
                  <li>Email alerts on updates</li>
                  <li>Early access features</li>
                  <li>Claim and edit your profile</li>
                </ul>
                <button className={`${styles.planBtn} ${styles.planBtnGold}`}>
                  Start Free Trial
                </button>
              </div>
            </div>
            <div className={styles.also}>
              <strong>Also available:</strong> Claim Profile €49/mo · Featured Placement €99–299/mo · API Access €99/mo
            </div>
            <div className={styles.stripe}>Secured by Stripe · No card needed for trial</div>
          </div>
        </div>
      )}
    </>
  )
}
