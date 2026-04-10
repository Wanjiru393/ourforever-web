import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import confetti from 'canvas-confetti'
import RsvpForm from '../../components/RsvpForm/RsvpForm'
import SweetLoveLayout from './layouts/SweetLoveLayout'
import styles from './InvitationPage.module.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-AU', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

/* ── Countdown ── */
export function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate + 'T00:00:00') - new Date()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [targetDate])
  return time
}

function Ring({ value, max }) {
  const r = 38, circ = 2 * Math.PI * r
  const offset = circ - (value / max) * circ
  return (
    <svg width="88" height="88" viewBox="0 0 88 88">
      <circle className={styles.ringBg} cx="44" cy="44" r={r} strokeDasharray={circ} strokeDashoffset="0" />
      <circle className={styles.ringFg} cx="44" cy="44" r={r} strokeDasharray={circ} strokeDashoffset={offset} />
    </svg>
  )
}

function Countdown({ date }) {
  const { days, hours, minutes, seconds } = useCountdown(date)
  const units = [
    { label: 'Days', value: days, max: 365 },
    { label: 'Hours', value: hours, max: 24 },
    { label: 'Minutes', value: minutes, max: 60 },
    { label: 'Seconds', value: seconds, max: 60 },
  ]
  return (
    <div className={styles.countdown}>
      <p className={styles.countdownLabel}>Counting down</p>
      <h2 className={styles.countdownTitle}>Until we say "I do"</h2>
      <div className={styles.countdownGrid}>
        {units.map(u => (
          <div key={u.label} className={styles.countdownUnit}>
            <div className={styles.countdownRing}>
              <Ring value={u.value} max={u.max} />
              <span className={styles.countdownNum}>{String(u.value).padStart(2, '0')}</span>
            </div>
            <span className={styles.countdownUnitLabel}>{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Love Story Timeline ── */
function LoveStory({ items }) {
  if (!items?.length) return null
  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Our Journey</p>
      <h2 className={styles.sectionTitle}>Our Love Story</h2>
      <div className={styles.sectionDivider}><span>♡</span></div>
      <div className={styles.timeline}>
        {items.map((item, i) => (
          <div key={i} className={styles.timelineItem} style={{ textAlign: i % 2 === 0 ? 'right' : 'left' }}>
            {i % 2 === 0 ? (
              <>
                <div className={styles.timelineText} style={{ textAlign: 'right' }}>
                  <p className={styles.timelineYear}>{item.year}</p>
                  <p className={styles.timelineTitle}>{item.title}</p>
                  <p className={styles.timelineDesc}>{item.description}</p>
                </div>
                <div className={styles.timelineDot} />
                <div />
              </>
            ) : (
              <>
                <div />
                <div className={styles.timelineDot} />
                <div className={styles.timelineText} style={{ textAlign: 'left' }}>
                  <p className={styles.timelineYear}>{item.year}</p>
                  <p className={styles.timelineTitle}>{item.title}</p>
                  <p className={styles.timelineDesc}>{item.description}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Day Program ── */
function DayProgram({ items }) {
  if (!items?.length) return null
  return (
    <section className={styles.programSection}>
      <p className={styles.sectionLabel}>What We Have Prepared</p>
      <h2 className={styles.sectionTitle}>Day Program</h2>
      <div className={styles.sectionDivider}><span>✦</span></div>
      <div className={styles.programScroll}>
        <div className={styles.programTrack}>
          {items.map((step, i) => (
            <div key={i} className={styles.programStep}>
              <span className={styles.programTime}>{step.time}</span>
              <div className={styles.programIcon}>{step.icon}</div>
              <p className={styles.programTitle}>{step.title}</p>
              <p className={styles.programDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Event Details ── */
function EventDetails({ invite }) {
  if (!invite.ceremony_time && !invite.ceremony_address && !invite.venue) return null
  const address = invite.ceremony_address || invite.venue
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  const calDate = invite.wedding_date?.replace(/-/g, '') || ''
  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(invite.couple_name + ' Wedding')}&dates=${calDate}/${calDate}&location=${encodeURIComponent(address)}`

  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Join Us</p>
      <h2 className={styles.sectionTitle}>Event Details</h2>
      <div className={styles.sectionDivider}><span>✦</span></div>
      <div className={styles.eventCard}>
        <div className={styles.eventIconWrap}>✦</div>
        <h3 className={styles.eventName}>Wedding Ceremony</h3>
        {invite.ceremony_time && (
          <p className={styles.eventMeta}>🕐 {invite.ceremony_time}</p>
        )}
        <p className={styles.eventAddress}>{address}</p>
        <div className={styles.eventActions}>
          <a href={mapsUrl} target="_blank" rel="noreferrer" className={styles.mapBtn}>
            📍 Open in Maps
          </a>
          {calDate && (
            <a href={calUrl} target="_blank" rel="noreferrer" className={styles.mapBtn}>
              📅 Add to Calendar
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

/* ── Dress Code ── */
function DressCode({ code }) {
  if (!code) return null
  return (
    <section style={{ padding: '0 1.5rem 5rem', maxWidth: 600, margin: '0 auto' }}>
      <div className={styles.dressCard}>
        <p className={styles.sectionLabel} style={{ marginBottom: '.5rem' }}>Dress Code</p>
        <p className={styles.dressTitle}>{code}</p>
        <p className={styles.dressSub}>We kindly ask guests to dress elegantly for our celebration.</p>
      </div>
    </section>
  )
}

/* ── Gifts ── */
function Gifts({ message, iban }) {
  if (!message) return null
  const [open, setOpen] = useState(false)
  const [showIban, setShowIban] = useState(false)

  const toggle = () => {
    if (!open) {
      confetti({
        particleCount: 60, spread: 80,
        origin: { y: 0.6 },
        colors: ['#6b8f6b', '#ffffff', '#4e7050', '#a8c5a0', '#f0e6d2'],
      })
    }
    setOpen(o => !o)
  }

  return (
    <section className={styles.section} style={{ paddingTop: 0 }}>
      <p className={styles.sectionLabel}>Gifts</p>
      <h2 className={styles.sectionTitle}>Gifts</h2>
      <div className={styles.sectionDivider}><span>✦</span></div>
      <div className={styles.giftsAccordion}>
        <button className={styles.giftsHeader} onClick={toggle}>
          <span>Contribution</span>
          <span className={`${styles.giftsChevron} ${open ? styles.giftsChevronOpen : ''}`}>▼</span>
        </button>
        {open && (
          <div className={styles.giftsBody}>
            <p className={styles.giftsMsg}>{message}</p>
            {iban && (
              <div className={styles.ibanReveal}>
                {!showIban ? (
                  <button className={styles.ibanBtn} onClick={() => setShowIban(true)}>
                    Show Bank Details
                  </button>
                ) : (
                  <p className={styles.ibanCode}>{iban}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

/* ── Floating Music Button ── */
function getYouTubeId(url) {
  if (!url) return null
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}

/* ── Music hook (shared state for hero + floating button) ── */
function useMusicPlayer(src) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const ytId = getYouTubeId(src)

  useEffect(() => {
    if (!src) return
    if (ytId) { setPlaying(true); return }
    const audio = audioRef.current
    if (!audio) return
    audio.play().then(() => setPlaying(true)).catch(() => {
      const resume = () => {
        audio.play().then(() => setPlaying(true)).catch(() => {})
        document.removeEventListener('click', resume)
      }
      document.addEventListener('click', resume, { once: true })
    })
  }, [src, ytId])

  const toggle = () => {
    if (ytId) {
      const iframe = document.getElementById('yt-music-frame')
      if (!iframe) return
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: playing ? 'pauseVideo' : 'playVideo' }), '*'
      )
      setPlaying(p => !p)
    } else {
      const audio = audioRef.current
      if (!audio) return
      if (playing) { audio.pause(); setPlaying(false) }
      else { audio.play().catch(() => {}); setPlaying(true) }
    }
  }

  return { playing, toggle, audioRef, ytId }
}

/* Renders only the media element (no UI) */
function MusicMedia({ src, audioRef, ytId }) {
  if (!src) return null
  if (ytId) return (
    <iframe
      id="yt-music-frame"
      style={{ display: 'none' }}
      src={`https://www.youtube.com/embed/${ytId}?enablejsapi=1&autoplay=1&loop=1&playlist=${ytId}`}
      allow="autoplay"
      title="background music"
    />
  )
  return <audio ref={audioRef} src={src} loop />
}

/* ── Main Page ── */
export default function InvitationPage() {
  const { slug } = useParams()
  const [invite, setInvite] = useState(null)
  const [status, setStatus] = useState('loading')
  const music = useMusicPlayer(invite?.music_url)

  useEffect(() => {
    fetch(`${API_URL}/api/invitations/${slug}`)
      .then(r => {
        if (r.status === 404) { setStatus('notfound'); return null }
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then(data => { if (data) { setInvite(data); setStatus('ready') } })
      .catch(() => setStatus('error'))
  }, [slug])

  if (status === 'loading') return (
    <div className={styles.center}><div className={styles.spinner} /></div>
  )
  if (status === 'notfound') return (
    <div className={styles.center}>
      <h2>Invitation not found</h2>
      <p>This link may be incorrect or expired.</p>
      <a href="/" className="btn btn-outline">Go Home</a>
    </div>
  )
  if (status === 'error') return (
    <div className={styles.center}>
      <h2>Something went wrong</h2>
      <p>Please try again or contact the couple directly.</p>
    </div>
  )

  if (slug?.startsWith('sweet-love')) {
    return (
      <>
        <MusicMedia src={invite.music_url} audioRef={music.audioRef} ytId={music.ytId} />
        <SweetLoveLayout invite={invite} music={music} />
      </>
    )
  }

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        {invite.video_url
          ? <video className={styles.heroVideo} src={invite.video_url} autoPlay muted loop playsInline onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block' }} />
          : null
        }
        <div className={styles.heroBg} style={invite.video_url ? { display: 'none' } : {}} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroBrand}>Our Forever</p>
          <p className={styles.heroSub}>We're getting married</p>
          <h1 className={styles.heroNames}>{invite.couple_name}</h1>
          {invite.wedding_date && <p className={styles.heroDate}>{formatDate(invite.wedding_date)}</p>}
          {invite.venue && <p className={styles.heroVenue}>{invite.venue}</p>}
          {invite.message && <p className={styles.heroMessage}>{invite.message}</p>}
        </div>
        {/* Music button above scroll arrow */}
        {invite.music_url && (
          <button className={styles.heroMusicBtn} onClick={music.toggle}>
            <span className={music.playing ? styles.notePlay : styles.notePause}>♪</span>
            {music.playing ? 'Tap to pause' : 'Tap to play'}
          </button>
        )}
        <button className={styles.scrollDown} aria-label="Scroll down"
          onClick={() => document.getElementById('inv-countdown')?.scrollIntoView({ behavior: 'smooth' })}>
          ↓
        </button>
      </div>

      {/* ── Countdown ── */}
      {invite.wedding_date && (
        <div id="inv-countdown">
          <Countdown date={invite.wedding_date} />
        </div>
      )}

      {/* ── Love Story ── */}
      <LoveStory items={invite.love_story} />

      {/* ── Day Program ── */}
      <DayProgram items={invite.day_program} />

      {/* ── Event Details ── */}
      <EventDetails invite={invite} />

      {/* ── Dress Code ── */}
      <DressCode code={invite.dress_code} />

      {/* ── Gifts ── */}
      <Gifts message={invite.gifts_message} iban={invite.gifts_iban} />

      {/* ── RSVP ── */}
      <div className={styles.rsvpSection}>
        <p className={styles.sectionLabel} style={{ textAlign: 'center' }}>Be Our Guest</p>
        <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '.5rem' }}>RSVP</h2>
        <div className={styles.sectionDivider}><span>♡</span></div>
        <RsvpForm invitationId={invite.id} coupleName={invite.couple_name} />
      </div>

      {/* ── Media element (hidden) ── */}
      <MusicMedia src={invite.music_url} audioRef={music.audioRef} ytId={music.ytId} />

      {/* ── Floating music toggle ── */}
      {invite.music_url && (
        <button className={styles.musicBtn} onClick={music.toggle} title={music.playing ? 'Pause music' : 'Play music'}>
          {music.playing ? '🔊' : '🔇'}
        </button>
      )}

    </div>
  )
}
