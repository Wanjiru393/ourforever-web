import { useRef } from 'react'
import { useParticles } from '../../hooks/useParticles'
import styles from './Hero.module.css'

const VIDEO_URL = import.meta.env.VITE_HERO_VIDEO_URL

export default function Hero() {
  const canvasRef = useRef(null)
  useParticles(canvasRef)

  return (
    <section id="home" className={styles.hero} aria-label="Hero">

      {/* Background video */}
      {VIDEO_URL && (
        <video
          className={styles.video}
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}

      {/* Dark overlay so text stays readable over the video */}
      <div className={styles.overlay} />

      {/* Subtle particle layer on top */}
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.eyebrow}>✦ DIGITAL WEDDING INVITATIONS</div>
        <h1 className={styles.title}>Beautiful Invitations, <em>Crafted</em><br /><em>for Your Story.</em></h1>
        <p className={styles.subtitle}>We design animated digital wedding invitations that bring couples and guests together. Watercolor art, elegant motion, and your love story — all in one beautiful link.</p>
        <div className={styles.ctaRow}>
          <a className="btn btn-primary" href="#invitations">View Our Invitations</a>
          <a className="btn btn-outline" href="/save-the-date/create">✦ Create my Save the Date</a>
        </div>
        <div className={styles.marquee} aria-label="Style marquee">
          Heritage Garden Botanical Romantic Dramatic Coastal Rustic Modern Classic Timeless
        </div>
        <div className={styles.downIndicator}>↓</div>
      </div>

    </section>
  )
}
