import { useEffect, useState } from 'react'
import styles from './Gallery.module.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function Gallery() {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    fetch(`${API_URL}/api/gallery`)
      .then(r => r.json())
      .then(data => {
        setItems(data.items ?? [])
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section id="gallery" className={styles.section} aria-label="Invitation Gallery">
      <div className={styles.container}>
        <div className={styles.sectionLabel}>Our Work</div>
        <h2 className={styles.title}>Choose your style, <em>make it yours.</em></h2>

        {status === 'loading' && (
          <div className={styles.placeholder}>Loading gallery…</div>
        )}

        {status === 'error' && (
          <div className={styles.placeholder}>Gallery unavailable right now.</div>
        )}

        {status === 'ready' && items.length === 0 && (
          <div className={styles.empty}>
            <p>Gallery coming soon — check back shortly.</p>
          </div>
        )}

        {status === 'ready' && items.length > 0 && (
          <div className={styles.track}>
            {items.map(item => (
              <div
                key={item.key}
                className={styles.cardItem}
                style={{ backgroundImage: `url(${item.url})` }}
              >
                <div className={styles.overlay}>
                  <span className={styles.overlayTitle}>
                    {item.label ?? item.key.split('/').pop().replace(/\.[^.]+$/, '')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
