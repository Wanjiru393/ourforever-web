import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import styles from './AdminLogin.module.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) { setError(err.message); setLoading(false); return }
    navigate('/admin')
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.logo}>Our Forever</h1>
        <p className={styles.sub}>Admin Portal</p>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email}
            onChange={e => setEmail(e.target.value)} required autoComplete="email" />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password}
            onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
