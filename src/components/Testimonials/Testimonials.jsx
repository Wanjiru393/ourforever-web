import React from 'react'
import styles from './Testimonials.module.css'

export default function Testimonials(){
  const ITEMS = [
    { person: 'Sophie & Tom, 2024', quote: 'The watercolor ... blew our guests away. It looked like art.' , stars: 5 },
    { person: 'Priya & James, 2025', quote: 'The experience was seamless. Our link was live in 4 days.' , stars: 5 },
    { person: 'Emma & Luca, 2024', quote: 'RSVPs came in real-time. Worth it.' , stars: 5 },
  ]
  return (
    <section id="testimonials" className={styles.section} aria-label="Testimonials">
      <div className={styles.container}>
        <div className={styles.sectionLabel}>What Couples Say</div>
        <h2 className={styles.title}>Couples who trusted us with their big day</h2>
        <div className={styles.track}>
          {ITEMS.map((t, idx) => (
            <div key={idx} className={styles.card} aria-label={t.person}>
              <div className={styles.stars}>{'★'.repeat(t.stars)}</div>
              <p className={styles.quote}>&quot;{t.quote}&quot;</p>
              <div className={styles.person}>— {t.person}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
