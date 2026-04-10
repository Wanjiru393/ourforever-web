import { useEffect } from 'react'
export function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef?.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const N = 40
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      a: Math.random() * 0.4 + 0.05,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6
    }))

    function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)

    let raf
    function draw(){
      ctx.clearRect(0, 0, w, h)
      for (const p of particles){
        p.x += p.vx; p.y += p.vy
        if (p.x < -p.r) p.x = w + p.r
        if (p.y < -p.r) p.y = h + p.r
        if (p.x > w + p.r) p.x = -p.r
        if (p.y > h + p.r) p.y = -p.r
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef])
}