import React from 'react'
import styles from './Footer.module.css'

export default function Footer(){
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>Our Forever</div>
        <div className={styles.links}>
          <a href="#invitations">Invitations</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#gallery">Gallery</a>
        </div>
      </div>
    </footer>
  )
}
