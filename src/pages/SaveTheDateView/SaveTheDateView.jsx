import { useEffect, useRef, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import confetti from 'canvas-confetti'
import Navbar from '../../components/Navbar/Navbar'
import styles from './SaveTheDateView.module.css'

export default function SaveTheDateView() {
  const [params] = useSearchParams()
  const names = params.get('names') || 'Emma & Luca'
  const dateStr = params.get('date') || ''
  const message = params.get('msg') || 'Join us to celebrate our big day'

  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)
  const isDrawing = useRef(false)

  const formattedDate = dateStr
    ? new Date(dateStr + 'T00:00:00').toLocaleDateString('en-AU', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : ''

  const calDate = dateStr.replace(/-/g, '')
  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(names + ' Wedding')}&dates=${calDate}/${calDate}&details=${encodeURIComponent(message)}`

  const drawOverlay = useCallback((w, h) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, '#0b1d3a')
    grad.addColorStop(0.4, '#163565')
    grad.addColorStop(0.6, '#1a3d78')
    grad.addColorStop(1, '#0b1d3a')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    for (let i = 0; i < 80; i++) {
      ctx.beginPath()
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.5 + 0.3, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(122,178,232,${Math.random() * 0.5 + 0.1})`
      ctx.fill()
    }

    const cx = w / 2, cy = h / 2 - 20, size = 38
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(cx, cy + size * 0.3)
    ctx.bezierCurveTo(cx, cy, cx - size, cy, cx - size, cy - size * 0.4)
    ctx.bezierCurveTo(cx - size, cy - size * 1.1, cx, cy - size * 0.9, cx, cy - size * 0.4)
    ctx.bezierCurveTo(cx, cy - size * 0.9, cx + size, cy - size * 1.1, cx + size, cy - size * 0.4)
    ctx.bezierCurveTo(cx + size, cy, cx, cy, cx, cy + size * 0.3)
    ctx.fillStyle = 'rgba(122,178,232,0.18)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(122,178,232,0.5)'
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.restore()

    ctx.fillStyle = 'rgba(122,178,232,0.85)'
    ctx.font = '500 13px Jost, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('✦  scratch to reveal  ✦', w / 2, cy + size * 0.3 + 36)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return
    const w = wrapper.offsetWidth
    const h = wrapper.offsetHeight
    canvas.width = w
    canvas.height = h
    drawOverlay(w, h)
  }, [drawOverlay])

  const getXY = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const sx = canvas.width / rect.width
    const sy = canvas.height / rect.height
    const src = e.touches ? e.touches[0] : e
    return { x: (src.clientX - rect.left) * sx, y: (src.clientY - rect.top) * sy }
  }

  const scratch = useCallback((e) => {
    if (!isDrawing.current || revealed) return
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const { x, y } = getXY(e)

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 30, 0, Math.PI * 2)
    ctx.fill()

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let clear = 0
    for (let i = 3; i < data.length; i += 4) if (data[i] < 128) clear++
    if (clear / (data.length / 4) > 0.52) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      setRevealed(true)
      const rect = canvas.getBoundingClientRect()
      const ox = (rect.left + rect.width / 2) / window.innerWidth
      const oy = (rect.top + rect.height / 2) / window.innerHeight
      confetti({ particleCount: 80, spread: 70, origin: { x: ox, y: oy }, colors: ['#7ab2e8', '#ffffff', '#c8e0f7', '#3a7fc1', '#eef1f7'] })
      setTimeout(() => confetti({ particleCount: 40, spread: 100, origin: { x: ox, y: oy }, colors: ['#7ab2e8', '#ffffff', '#3a7fc1'] }), 300)
    }
  }, [revealed])

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.page}>
      <Navbar />
      {!revealed && <p className={styles.hint}>Scratch the card to reveal</p>}
      {revealed && <p className={styles.hintRevealed}>🎉 Congratulations!</p>}

      <div className={styles.wrapper} ref={wrapperRef}>
        <div className={styles.content}>
          <p className={styles.saveLabel}>Save the Date</p>
          <div className={styles.divider} />
          <h1 className={styles.names}>{names}</h1>
          <p className={styles.message}>{message}</p>
          <div className={styles.divider} />
          <p className={styles.date}>{formattedDate}</p>
        </div>

        {/* Canvas is pointer-events:none once revealed so content is clickable */}
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          style={{ pointerEvents: revealed ? 'none' : 'auto' }}
          onMouseDown={() => { isDrawing.current = true }}
          onMouseUp={() => { isDrawing.current = false }}
          onMouseLeave={() => { isDrawing.current = false }}
          onMouseMove={scratch}
          onTouchStart={() => { isDrawing.current = true }}
          onTouchEnd={() => { isDrawing.current = false }}
          onTouchMove={scratch}
        />
      </div>

      {/* Calendar + share — always BELOW the card, never blocked */}
      <div className={styles.actions}>
        {revealed && calDate && (
          <a href={calUrl} target="_blank" rel="noreferrer" className={styles.calBtn}>
            📅 Add to Calendar
          </a>
        )}
        <div className={styles.shareRow}>
          <span className={styles.shareLabel}>Share this card:</span>
          <button className={styles.copyBtn} onClick={copyLink}>
            {copied ? '✓ Copied!' : 'Copy link'}
          </button>
        </div>
      </div>
    </div>
  )
}
