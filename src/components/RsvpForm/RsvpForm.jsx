import { useState } from 'react'
import styles from './RsvpForm.module.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const INITIAL = { guestName: '', email: '', attending: '', plusOne: false, dietary: '', message: '' }

export default function RsvpForm({ invitationId, coupleName }) {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.attending) return setErrorMsg('Please let the couple know if you can attend.')
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch(`${API_URL}/api/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invitationId,
          guestName: form.guestName,
          email: form.email,
          attending: form.attending === 'yes',
          plusOne: form.plusOne,
          dietary: form.dietary,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setErrorMsg(data.error || 'Something went wrong.'); setStatus('error'); return }
      setStatus('success')
    } catch {
      setErrorMsg('Could not reach the server. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') return (
    <div className={styles.success} role="alert">
      <div className={styles.successIcon}>✦</div>
      <h3>{form.attending === 'yes' ? `We'll see you there!` : `We'll miss you.`}</h3>
      <p>Your RSVP has been sent to {coupleName}.</p>
    </div>
  )

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.heading}>RSVP</h2>

      <div className={styles.field}>
        <label htmlFor="guestName">Your name *</label>
        <input id="guestName" name="guestName" type="text" value={form.guestName}
          onChange={handleChange} required placeholder="Jane Smith" />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" value={form.email}
          onChange={handleChange} placeholder="jane@example.com" />
      </div>

      <div className={styles.field}>
        <label>Will you be attending? *</label>
        <div className={styles.radioGroup}>
          <label className={`${styles.radio} ${form.attending === 'yes' ? styles.radioSelected : ''}`}>
            <input type="radio" name="attending" value="yes" onChange={handleChange} />
            Joyfully accepts
          </label>
          <label className={`${styles.radio} ${form.attending === 'no' ? styles.radioSelected : ''}`}>
            <input type="radio" name="attending" value="no" onChange={handleChange} />
            Regretfully declines
          </label>
        </div>
      </div>

      {form.attending === 'yes' && (
        <>
          <label className={styles.checkboxRow}>
            <input type="checkbox" name="plusOne" checked={form.plusOne} onChange={handleChange} />
            I'll be bringing a plus one
          </label>

          <div className={styles.field}>
            <label htmlFor="dietary">Dietary requirements</label>
            <input id="dietary" name="dietary" type="text" value={form.dietary}
              onChange={handleChange} placeholder="e.g. vegetarian, gluten free" />
          </div>
        </>
      )}

      <div className={styles.field}>
        <label htmlFor="message">Message to the couple</label>
        <textarea id="message" name="message" rows={3} value={form.message}
          onChange={handleChange} placeholder="Share your well wishes…" />
      </div>

      {(status === 'error' || errorMsg) && (
        <p className={styles.errorMsg} role="alert">{errorMsg}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send RSVP'}
      </button>
    </form>
  )
}
