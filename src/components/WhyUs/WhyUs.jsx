import React from 'react'
import styles from './WhyUs.module.css'

export default function WhyUs(){
  const FEATURES = [
    { icon: '🎨', title: 'Watercolor Artist on Staff', desc: 'We have a professional watercolor artist who can transform your venue into a hand-painted illustration.' },
    { icon: '🎬', title: 'Professional Animator', desc: 'Our animator turns still designs into cinematic, moving invitations.' },
    { icon: '🔗', title: 'Custom Invitation Website', desc: 'Every invitation gets its own elegant web page with maps, registry, RSVP, and more.' },
    { icon: '✎', title: 'DIY Canva Option', desc: 'Editable templates let you personalize quickly if you prefer a faster turnaround.' }
  ]
  return (
    <section id="why-us" className={styles.section} aria-label="Why Us">
      <div className={styles.container}>
        <div className={styles.sectionLabel}>Why Choose Us</div>
        <h2 className={styles.title}>Everything you need for a beautiful, stress-free invitation.</h2>
        <div className={styles.grid}>
        {FEATURES.map((f, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.icon}>{f.icon}</div>
            <div className={styles.cardTitle}>{f.title}</div>
            <p className={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
        </div>
      </div>
    </section>
  )
}
