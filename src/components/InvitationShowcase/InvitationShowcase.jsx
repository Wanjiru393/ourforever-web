import { Link } from 'react-router-dom'
import styles from './InvitationShowcase.module.css'

const THEMES = [
  {
    slug: 'maverick-and-quin',
    name: 'Heritage',
    description: 'Classic elegance with timeless charm and intimate warmth.',
    badge: 'Live demo',
    gradient: 'linear-gradient(135deg, #1a2a1a 0%, #2d4a2d 50%, #1a3a2a 100%)',
    accent: '#a8c5a0',
    live: true,
  },
  {
    slug: 'sweet-love-demo',
    name: 'Sweet Love',
    description: 'Luxurious design with delicate floral illustration.',
    badge: 'Live demo',
    gradient: 'linear-gradient(135deg, #1a0d2e 0%, #3d1a5e 50%, #2b0a42 100%)',
    accent: '#d4a0e8',
    live: true,
  },
  {
    slug: null,
    name: 'Wonderlust',
    description: 'Perfect for travelling couples and destination weddings.',
    gradient: 'linear-gradient(135deg, #0a1a2a 0%, #1a3a5a 50%, #0a2a3a 100%)',
    accent: '#80b0d0',
    live: false,
  },
  {
    slug: null,
    name: 'Bloom',
    description: 'Delicate florals with timeless charm and soft romance.',
    gradient: 'linear-gradient(135deg, #2a1a10 0%, #4a2a18 50%, #3a2010 100%)',
    accent: '#d4a878',
    live: false,
  },
  {
    slug: null,
    name: 'Pure',
    description: 'Minimal, modern and effortlessly elegant.',
    gradient: 'linear-gradient(135deg, #1a1a2a 0%, #2a2a4a 50%, #1a1a3a 100%)',
    accent: '#a0a8d0',
    live: false,
  },
]

export default function InvitationShowcase() {
  return (
    <section id="invitations" className={styles.section} aria-label="Invitation Themes">
      <div className={styles.label}># Exclusive Designs</div>
      <h2 className={styles.title}>Choose your style,<br /><em>make it unique</em></h2>
      <p className={styles.sub}>Each theme is designed to tell your love story</p>

      <div className={styles.track}>
        {THEMES.map((theme, i) => (
          <div
            key={i}
            className={`${styles.card} ${theme.soon ? styles.soon : ''}`}
            style={{ background: theme.gradient }}
          >
            {theme.badge && <span className={styles.badge}>{theme.badge}</span>}
            {theme.soon && <span className={styles.soonIcon}>🕐</span>}

            <div className={styles.cardBody}>
              <h3 className={styles.cardName} style={{ color: theme.accent }}>{theme.name}</h3>
              <p className={styles.cardDesc}>{theme.description}</p>
              {theme.live ? (
                <Link to={`/invite/${theme.slug}`} className={styles.demoBtn}>
                  View demo
                </Link>
              ) : theme.soon ? null : (
                <span className={styles.demoBtnDisabled}>Coming soon</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
