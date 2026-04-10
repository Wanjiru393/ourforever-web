import React, { useState } from 'react'
import styles from './Faq.module.css'

const FAQ_ITEMS = [
  { question: 'How long does it take to receive my invitation?', answer: 'Standard digital invitations are delivered within 3–5 business days. Custom venue artwork takes 1–2 weeks from when we receive your photos. We\'ll keep you updated throughout.' },
  { question: 'What is the Canva template option?', answer: 'Our Canva templates are editable video invitation files you download and personalise yourself. Prices range from $47 to $102 depending on the design.' },
  { question: 'What does the $50 RSVP website include?', answer: 'We build you a custom invitation webpage that matches your invitation design. Includes RSVP form, event details, and registry.' },
  { question: 'What is the venue artwork add-on?', answer: 'For $190, our watercolor artist paints your wedding venue. This is then animated and incorporated into your digital invitation.' }
]

export default function Faq(){
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)
  return (
    <section id="faq" className={styles.section} aria-label="FAQ">
      <div className={styles.container}>
        <div className={styles.sectionLabel}>Common Questions</div>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        <div className={styles.list}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={`${styles.item} ${openIndex === i ? styles.open : ''}`}>
              <button className={styles.q} onClick={() => toggle(i)} aria-expanded={openIndex===i}>
                {item.question}
                <span className={styles.icon}>{openIndex === i ? '×' : '+'}</span>
              </button>
              <div className={styles.a} hidden={openIndex !== i}>{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
