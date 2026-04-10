import React from 'react'
import styles from './FinalCta.module.css'

export default function FinalCta(){
  return (
    <section id="final-cta" className={styles.finalCta} aria-label="Final CTA">
      <div className={styles.container}>
        <div className={styles.sparkle}>✦ ✦ ✦</div>
        <h2 className={styles.title}>Ready to create something beautiful?</h2>
        <p className={styles.subtitle}>Start with a template or let us do it all for you. Either way, your guests will feel something when they open it.</p>
        <div className={styles.ctaRow}>
          <a className="btn btn-primary" href="#invitations">View Invitations</a>
          <a className="btn btn-outline" href="#contact">Get in Touch</a>
        </div>
        <p className={styles.contact}>hello@ourforever.com</p>
      </div>
    </section>
  )
}
