import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useScrolled as useScrolledHook } from '../../hooks/useScrolled'
import styles from './Navbar.module.css'

export default function Navbar() {
  const scrolled = useScrolledHook(50)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const a = (hash) => isHome ? hash : `/${hash}`

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} id="navBar">
      <Link to="/" className={styles.logo} aria-label="Our Forever logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Our Forever</Link>

      <nav className={styles.links} aria-label="Main Navigation">
        <a href={a('#invitations')}>Themes</a>
        <a href={a('#how-it-works')}>How It Works</a>
        <a href={a('#pricing')}>Pricing</a>
        <Link to="/blog">Blog</Link>
        <a href={a('#contact')}>Contact</a>
      </nav>

      <button className={styles.hamburger} aria-label="Open menu" onClick={() => setMenuOpen(true)}>☰</button>
      <Link to="/admin" className={styles.adminLink}>Admin</Link>
      <a className={`btn btn-primary ${styles.cta}`} href={a('#pricing')} aria-label="Get Started">Get Started</a>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`} aria-hidden={!menuOpen}>
        <button className={styles.close} aria-label="Close menu" onClick={close}>✕</button>
        <nav className={styles.mobileNav}>
          <a href={a('#invitations')} onClick={close}>Themes</a>
          <a href={a('#how-it-works')} onClick={close}>How It Works</a>
          <a href={a('#pricing')} onClick={close}>Pricing</a>
          <Link to="/blog" onClick={close}>Blog</Link>
          <a href={a('#contact')} onClick={close}>Contact</a>
        </nav>
      </div>
    </header>
  )
}
