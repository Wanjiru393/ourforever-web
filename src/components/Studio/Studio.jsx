import React from 'react'
import styles from './Studio.module.css'

export default function Studio(){
  return (
    <section id="studio" className={styles.section} aria-label="Studio">
      <div className={styles.container}>
        <div className={styles.sectionLabel}>Our Studio</div>
        <h2 className={styles.title}>A watercolor artist and animator — behind every invitation.</h2>
        <p className={styles.muted}>Our Forever isn't a template factory. Every invitation is touched by human hands — a real watercolor artist who paints your venue, and a professional animator who brings it to life frame by frame. The result is something your guests will remember long after the wedding.</p>
        <p className={styles.muted}>Based in [Location], we work with couples all over the world. From heritage estates to beachside ceremonies — if it matters to you, it matters to us.</p>
      </div>
    </section>
  )
}
