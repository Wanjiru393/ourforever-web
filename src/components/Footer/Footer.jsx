import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer(){
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href="/#hero" className={styles.brand}>Our Forever</a>
        <div className={styles.links}>
          <a href="#invitations">Themes</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
          <Link to="/blog">Blog</Link>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  )
}
