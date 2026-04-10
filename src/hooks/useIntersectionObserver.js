import { useEffect, useRef } from 'react'
export function useIntersectionObserver(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('visible')
        observer.disconnect()
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px', ...options })
    observer.observe(el)
    return () => observer.disconnect()
  }, [options])
  return ref
}