import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './EnvelopePage.module.css'

export default function EnvelopePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [phase, setPhase] = useState('idle') // idle | opening

  const open = () => {
    if (phase !== 'idle') return
    setPhase('opening')
    setTimeout(() => navigate(`/invite/${slug}`), 1600)
  }

  return (
    <div className={styles.page} onClick={open}>
      <p className={styles.occasion}>You have been invited</p>

      <div className={`${styles.scene} ${phase === 'opening' ? styles.opening : ''}`}>

        {/* Letter that rises from inside */}
        <div className={styles.letter}>
          <p className={styles.letterText}>With love ♡</p>
        </div>

        {/* Envelope body */}
        <div className={styles.envelope}>
          {/* Decorative fold triangles */}
          <div className={styles.foldLeft} />
          <div className={styles.foldRight} />
          <div className={styles.foldBottom} />

          {/* Flap perspective wrapper */}
          <div className={styles.flapPerspective}>
            <div className={styles.flap}>
              {/* Diagonal crease lines on the flap */}
              <div className={styles.creaseLeft} />
              <div className={styles.creaseRight} />
            </div>
          </div>

          {/* Wax seal sits at the flap/body junction */}
          <div className={styles.seal}>✿</div>
        </div>
      </div>

      <p className={styles.hint}>
        {phase === 'idle' ? 'Tap to open your invitation' : ''}
      </p>
    </div>
  )
}
