import React from 'react'
import styles from './HowItWorks.module.css'

export default function HowItWorks(){
  const STEPS = [
    { title: 'Choose Your Style', desc: 'Browse our invitation collection or share your vision. We guide you to the perfect design.' },
    { title: 'We Design It For You', desc: 'Our watercolor artist and animator bring your invitation to life. You review and we refine.' },
    { title: 'Share With Guests', desc: 'Receive your private invitation link to share via WhatsApp, SMS, email, or social.' }
  ]
  return (
    <section id="how-it-works" className={styles.section} aria-label="How It Works">
      <div className={styles.container}>
        <div className={styles.sectionLabel}>Our Process</div>
        <h2 className={styles.title}>From idea to your guests' hands — in 3 simple steps.</h2>
        <div className={styles.grid}>
          {STEPS.map((s, idx) => (
            <div key={idx} className={styles.step}>
              <div className={styles.stepNum}>{idx + 1}</div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
