import React from 'react'
import styles from './RsvpFeature.module.css'

export default function RsvpFeature(){
  return (
    <section id="rsvp-feature" className={styles.section} aria-label="RSVP Feature">
      <div className={styles.gridWrap}>
        <div className={styles.left}>
          <div className={styles.sectionLabel}>Add-On Feature</div>
          <h2 className={styles.title}>Your invitation — with RSVP built in.</h2>
          <p className={styles.muted}>Add a custom invitation website for $50. Guests open a single link and find everything: ceremony details, venue map, registry, RSVP, and more.</p>
          <ul className={styles.features}>
            <li>Online RSVP form — responses tracked in real time</li>
            <li>Interactive Google Maps integration</li>
            <li>Gift registry link</li>
            <li>Accommodation & travel info</li>
            <li>Mobile-optimised</li>
          </ul>
          <button className="btn btn-primary" aria-label="Add RSVP Website">Add RSVP Website — $50</button>
        </div>
        <div className={styles.phone} aria-label="Phone mockup">
          <div className={styles.screen}>
            <div className={styles.screenTitle}>Our Forever</div>
            <div className={styles.date}>June 22, 2026</div>
            <button className={styles.cta}>RSVP</button>
            <div className={styles.map} />
          </div>
        </div>
      </div>
    </section>
  )
}
