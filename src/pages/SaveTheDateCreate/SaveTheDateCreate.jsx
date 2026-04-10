import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import styles from './SaveTheDateCreate.module.css'

export default function SaveTheDateCreate() {
  const [form, setForm] = useState({ name1: '', name2: '', date: '', message: '' })
  const navigate = useNavigate()

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({
      names: `${form.name1} & ${form.name2}`,
      date: form.date,
      msg: form.message || 'Join us to celebrate our big day',
    })
    navigate(`/save-the-date/view?${params.toString()}`)
  }

  return (
    <div className={styles.page}>
      <Navbar />
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.heading}>Create your Save the Date</h1>
        <p className={styles.sub}>Fill in your details and share the scratch card with your guests.</p>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="name1">Partner 1 *</label>
            <input id="name1" name="name1" type="text" value={form.name1}
              onChange={handleChange} required placeholder="Emma" />
          </div>
          <div className={styles.field}>
            <label htmlFor="name2">Partner 2 *</label>
            <input id="name2" name="name2" type="text" value={form.name2}
              onChange={handleChange} required placeholder="Luca" />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="date">Wedding date *</label>
          <input id="date" name="date" type="date" value={form.date}
            onChange={handleChange} required />
        </div>

        <div className={styles.field}>
          <label htmlFor="message">Message (optional)</label>
          <textarea id="message" name="message" value={form.message}
            onChange={handleChange} placeholder="Join us to celebrate our big day" />
        </div>

        <button type="submit" className="btn btn-primary">Create Save the Date →</button>
      </form>
    </div>
  )
}
