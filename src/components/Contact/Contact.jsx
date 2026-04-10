import React, { useState } from 'react'
import styles from './Contact.module.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const INITIAL = { name: '', email: '', partnerName: '', weddingDate: '', packageInterest: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong.')
        setStatus('error')
        return
      }

      setStatus('success')
      setForm(INITIAL)
    } catch {
      setErrorMsg('Could not reach the server. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className={styles.section} aria-label="Contact">
      <div className={styles.container}>
        <div className={styles.sectionLabel}>Get In Touch</div>
        <h2 className={styles.title}>Let's create something <em>beautiful</em> together.</h2>
        <p className={styles.sub}>Tell us about your wedding and we'll get back to you within 24 hours.</p>

        {status === 'success' ? (
          <div className={styles.successBox} role="alert">
            <div className={styles.successIcon}>✦</div>
            <h3>Message sent!</h3>
            <p>Thank you for reaching out. We'll be in touch within 24 hours.</p>
            <button className="btn btn-outline" onClick={() => setStatus('idle')}>Send another</button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="name">Your name *</label>
                <input id="name" name="name" type="text" value={form.name}
                  onChange={handleChange} required placeholder="Jane" />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email address *</label>
                <input id="email" name="email" type="email" value={form.email}
                  onChange={handleChange} required placeholder="jane@example.com" />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="partnerName">Partner's name</label>
                <input id="partnerName" name="partnerName" type="text" value={form.partnerName}
                  onChange={handleChange} placeholder="Tom" />
              </div>
              <div className={styles.field}>
                <label htmlFor="weddingDate">Wedding date</label>
                <input id="weddingDate" name="weddingDate" type="date" value={form.weddingDate}
                  onChange={handleChange} />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="packageInterest">Interested in</label>
              <select id="packageInterest" name="packageInterest" value={form.packageInterest}
                onChange={handleChange}>
                <option value="">Not sure yet</option>
                <option value="Canva Template">Canva Template (from $47)</option>
                <option value="Digital Invitation">Digital Invitation (from $97)</option>
                <option value="Venue Artwork Package">Venue Artwork Package (from $190)</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="message">Message *</label>
              <textarea id="message" name="message" rows={5} value={form.message}
                onChange={handleChange} required
                placeholder="Tell us a bit about your wedding — venue, style, vibe..." />
            </div>

            {status === 'error' && (
              <p className={styles.errorMsg} role="alert">{errorMsg}</p>
            )}

            <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending…' : 'Send Inquiry'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
