import { useState } from 'react'
import RsvpForm from '../../../components/RsvpForm/RsvpForm'
import { useCountdown } from '../InvitationPage'
import sl from './SweetLoveLayout.module.css'

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-AU', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

/* ── Typographic countdown ── */
function SweetCountdown({ date }) {
  const { days, hours, minutes, seconds } = useCountdown(date)
  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ]
  return (
    <div className={sl.countdown}>
      <p className={sl.countdownLabel}>Counting down to forever</p>
      <div className={sl.countdownRow}>
        {units.map(u => (
          <div key={u.label} className={sl.countdownUnit}>
            <span className={sl.countdownNum}>{String(u.value).padStart(2, '0')}</span>
            <span className={sl.countdownUnitLabel}>{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Single-column love story ── */
function SweetLoveStory({ items }) {
  if (!items?.length) return null
  return (
    <section className={sl.storySection}>
      <p className={sl.sectionLabel}>Our Journey</p>
      <h2 className={sl.sectionTitle}>How It Began</h2>
      <div className={sl.sectionDivider}><span>✿</span></div>
      <div className={sl.storyList}>
        {items.map((item, i) => (
          <div key={i} className={sl.storyItem}>
            <p className={sl.storyYear}>{item.year}</p>
            <p className={sl.storyTitle}>{item.title}</p>
            <p className={sl.storyDesc}>{item.description}</p>
            {i < items.length - 1 && <div className={sl.storyRose}>✿</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Vertical two-column day program ── */
function SweetDayProgram({ items }) {
  if (!items?.length) return null
  return (
    <section className={sl.programSection}>
      <div className={sl.programInner}>
        <p className={sl.sectionLabel}>The Day Ahead</p>
        <h2 className={sl.sectionTitle}>Day Program</h2>
        <div className={sl.sectionDivider}><span>✦</span></div>
        <div className={sl.programList}>
          {items.map((step, i) => (
            <div key={i} className={sl.programRow}>
              <span className={sl.programTime}>{step.time}</span>
              <div className={sl.programSep} />
              <div className={sl.programBody}>
                <div className={sl.programIcon}>{step.icon}</div>
                <p className={sl.programTitle}>{step.title}</p>
                <p className={sl.programDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Event details ── */
function SweetEventDetails({ invite }) {
  if (!invite.ceremony_time && !invite.ceremony_address && !invite.venue) return null
  const address = invite.ceremony_address || invite.venue
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  const calDate = invite.wedding_date?.replace(/-/g, '') || ''
  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(invite.couple_name + ' Wedding')}&dates=${calDate}/${calDate}&location=${encodeURIComponent(address)}`

  return (
    <section className={sl.detailsSection}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p className={sl.sectionLabel}>Join Us</p>
        <h2 className={sl.sectionTitle}>Venue & Details</h2>
        <div className={sl.sectionDivider}><span>✦</span></div>
      </div>
      <div className={sl.detailsGrid}>
        <div className={sl.detailCard}>
          <div className={sl.detailIcon}>💍</div>
          <p className={sl.detailName}>Ceremony</p>
          {invite.ceremony_time && <p className={sl.detailMeta}>{invite.ceremony_time}</p>}
          <p className={sl.detailAddress}>{address}</p>
          <div className={sl.detailActions}>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className={sl.mapBtn}>📍 Maps</a>
            {calDate && <a href={calUrl} target="_blank" rel="noreferrer" className={sl.mapBtn}>📅 Calendar</a>}
          </div>
        </div>
        {invite.dress_code && (
          <div className={sl.detailCard} style={{ background: 'var(--sl-accent)', borderColor: 'transparent' }}>
            <div className={sl.detailIcon} style={{ color: 'rgba(255,255,255,.7)' }}>👗</div>
            <p className={sl.detailName} style={{ color: '#fff' }}>Dress Code</p>
            <p className={sl.detailMeta} style={{ color: 'rgba(255,255,255,.75)', fontSize: '1.05rem' }}>{invite.dress_code}</p>
            <p className={sl.detailMeta} style={{ color: 'rgba(255,255,255,.6)' }}>Please dress elegantly</p>
          </div>
        )}
      </div>
    </section>
  )
}

/* ── Gifts — always open ── */
function SweetGifts({ message, iban }) {
  const [showIban, setShowIban] = useState(false)
  if (!message) return null
  return (
    <section className={sl.giftsSection}>
      <p className={sl.sectionLabel}>Gifts</p>
      <h2 className={sl.sectionTitle}>A Loving Gesture</h2>
      <div className={sl.sectionDivider}><span>✿</span></div>
      <div className={sl.giftsCard}>
        <p className={sl.giftsMsg}>{message}</p>
        {iban && (
          !showIban
            ? <button className={sl.ibanBtn} onClick={() => setShowIban(true)}>Show Bank Details</button>
            : <p className={sl.ibanCode}>{iban}</p>
        )}
      </div>
    </section>
  )
}

/* ── Main Layout ── */
export default function SweetLoveLayout({ invite, music }) {
  return (
    <div className={sl.page}>

      {/* Hero — formal invitation card */}
      <div className={sl.hero}>
        <div className={sl.petal} />
        <div className={sl.petal} />
        <div className={sl.petal} />

        <div className={sl.card}>
          <div className={sl.cardInner}>
            <p className={sl.cardTop}>Together with their families</p>
            <div className={sl.floral}>✿</div>
            <h1 className={sl.names}>{invite.couple_name}</h1>
            <div className={sl.divLine} />
            <p className={sl.cardRequest}>request the pleasure of your company</p>
            {invite.wedding_date && <p className={sl.cardDate}>{formatDate(invite.wedding_date)}</p>}
            {invite.venue && <p className={sl.cardVenue}>{invite.venue}</p>}
            {invite.message && <p className={sl.cardMsg}>{invite.message}</p>}
          </div>
        </div>

        <div className={sl.heroBottom}>
          {invite.music_url && (
            <button className={sl.heroMusicBtn} onClick={music.toggle}>
              <span className={music.playing ? sl.notePlay : sl.notePause}>♪</span>
              {music.playing ? 'Tap to pause' : 'Tap to play'}
            </button>
          )}
          <button
            className={sl.scrollArrow}
            onClick={() => document.getElementById('sl-countdown')?.scrollIntoView({ behavior: 'smooth' })}
          >↓</button>
        </div>
      </div>

      {/* Quote strip */}
      <div className={sl.quoteStrip}>
        <p className={sl.quote}>"To love and be loved is to feel the sun from both sides."</p>
        <p className={sl.quoteAuthor}>— David Viscott</p>
      </div>

      {/* Countdown */}
      {invite.wedding_date && <div id="sl-countdown"><SweetCountdown date={invite.wedding_date} /></div>}

      {/* Love Story */}
      <SweetLoveStory items={invite.love_story} />

      {/* Day Program */}
      <SweetDayProgram items={invite.day_program} />

      {/* Event Details + Dress Code */}
      <SweetEventDetails invite={invite} />

      {/* Gifts */}
      <SweetGifts message={invite.gifts_message} iban={invite.gifts_iban} />

      {/* RSVP */}
      <div className={sl.rsvpSection}>
        <p className={sl.sectionLabel} style={{ textAlign: 'center' }}>Be Our Guest</p>
        <h2 className={sl.sectionTitle} style={{ textAlign: 'center', marginBottom: '.5rem' }}>RSVP</h2>
        <div className={sl.sectionDivider}><span>✿</span></div>
        <RsvpForm invitationId={invite.id} coupleName={invite.couple_name} />
      </div>

      {/* Floating music button */}
      {invite.music_url && (
        <button className={sl.musicBtn} onClick={music.toggle} title={music.playing ? 'Pause' : 'Play'}>
          {music.playing ? '🔊' : '🔇'}
        </button>
      )}
    </div>
  )
}
