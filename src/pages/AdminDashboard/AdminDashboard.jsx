import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import styles from './AdminDashboard.module.css'

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}

function InvitationRow({ invitation }) {
  const [open, setOpen] = useState(false)
  const [rsvps, setRsvps] = useState(null)

  const load = async () => {
    if (rsvps !== null) return
    const { data } = await supabase
      .from('rsvps')
      .select('*')
      .eq('invitation_id', invitation.id)
      .order('created_at', { ascending: false })
    setRsvps(data || [])
  }

  const toggle = () => {
    setOpen(o => !o)
    if (!open) load()
  }

  const attending = rsvps ? rsvps.filter(r => r.attending).length : invitation.rsvp_count ?? '…'

  return (
    <div className={styles.invitationCard}>
      <div className={styles.invitationHeader} onClick={toggle}>
        <div>
          <p className={styles.invitationName}>{invitation.couple_name}</p>
          <p className={styles.invitationMeta}>{formatDate(invitation.wedding_date)} · {invitation.venue || 'No venue'}</p>
        </div>
        <div className={styles.badge}>
          <span className={styles.pill}>{typeof attending === 'number' ? `${attending} attending` : attending}</span>
          <span className={styles.chevron}>{open ? '▲' : '▼'}</span>
        </div>
      </div>

      {open && (
        rsvps === null ? (
          <p className={styles.empty}>Loading…</p>
        ) : rsvps.length === 0 ? (
          <p className={styles.empty}>No RSVPs yet.</p>
        ) : (
          <table className={styles.rsvpTable}>
            <thead>
              <tr>
                <th>Guest</th>
                <th>Email</th>
                <th>Attending</th>
                <th>Plus one</th>
                <th>Dietary</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map(r => (
                <tr key={r.id}>
                  <td>{r.guest_name}</td>
                  <td>{r.email || '—'}</td>
                  <td className={r.attending ? styles.attending : styles.declining}>
                    {r.attending ? 'Yes' : 'No'}
                  </td>
                  <td>{r.plus_one ? 'Yes' : 'No'}</td>
                  <td>{r.dietary || '—'}</td>
                  <td>{r.message || '—'}</td>
                  <td>{formatDate(r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  )
}

export default function AdminDashboard() {
  const [invitations, setInvitations] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase
      .from('invitations')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => setInvitations(data || []))
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <span className={styles.brand}>Our Forever</span>
        <button className={styles.signout} onClick={signOut}>Sign out</button>
      </div>
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>Invitations</h1>
        {invitations === null ? (
          <p className={styles.loading}>Loading…</p>
        ) : invitations.length === 0 ? (
          <p className={styles.loading}>No invitations yet.</p>
        ) : (
          invitations.map(inv => <InvitationRow key={inv.id} invitation={inv} />)
        )}
      </div>
    </div>
  )
}
