import { useState } from 'react'
import styles from './Pricing.module.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const TIERS = [
  {
    key: 'canva',
    name: 'Canva Template',
    price: 'From $5',
    features: [
      'Editable Canva video template',
      'Personalise text, colors & fonts',
      'Download & share immediately',
      'No design wait time',
      'Up to $102 depending on design',
      '✗ No RSVP website included',
      '✗ No custom illustration',
    ],
  },
  {
    key: 'digital',
    name: 'Digital Invitation',
    price: 'From $10',
    features: [
      'Professionally designed invitation',
      'Custom to your wedding details',
      'Animated video delivered as link',
      'Custom invitation website page',
      'RSVP integration — $50 add-on',
    ],
  },
  {
    key: 'venue',
    name: 'Venue Artwork Package',
    price: 'From $15',
    features: [
      'Everything in Digital Invitation',
      'Watercolor artist paints your venue',
      'Custom animated venue portrait',
    ],
  },
]

export default function Pricing() {
  const [loading, setLoading] = useState(null)

  const handleCheckout = async (plan) => {
    setLoading(plan)
    try {
      const res = await fetch(`${API_URL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
        setLoading(null)
      }
    } catch {
      alert('Could not connect to server. Please try again.')
      setLoading(null)
    }
  }

  return (
    <section id="pricing" className={styles.section} aria-label="Pricing">
      <div className={styles.container}>
        <div className={styles.sectionLabel}>Investment</div>
        <h2 className={styles.title}>Simple, transparent pricing.</h2>
        <div className={styles.grid}>
          {TIERS.map((t, idx) => (
            <div key={t.key} className={`${styles.card} ${idx === 1 ? styles.popular : ''}`}>
              {idx === 1 && <span className={styles.badge}>Most Popular</span>}
              <div className={styles.name}>{t.name}</div>
              <div className={styles.price}>{t.price}</div>
              <ul className={styles.features}>
                {t.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <button
                className="btn btn-primary"
                aria-label={`Get ${t.name}`}
                disabled={loading === t.key}
                onClick={() => handleCheckout(t.key)}
              >
                {loading === t.key ? 'Redirecting…' : `Get ${t.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
