import { useEffect, useRef, useState } from 'react'

interface StripProps {
  onHeightChange: (h: number) => void
}

const items = [
  { href: '#svc-corte', label: 'Corte' },
  { href: '#svc-mechas', label: 'Loiros & Iluminados' },
  { href: '#svc-liso-perfeito', label: 'Liso Perfeito' },
  { href: '#svc-selagem', label: 'Nutrição & Brilho' },
  { href: '#svc-coloracao', label: 'Coloração & Correção de Cor' },
  { href: '#svc-escova', label: 'Escova & Hidratação' },
]

export default function ServiceStrip({ onHeightChange }: StripProps) {
  const stripRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('')

  useEffect(() => {
    const measure = () => {
      if (stripRef.current) onHeightChange(stripRef.current.offsetHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [onHeightChange])

  useEffect(() => {
    const ids = items.map(i => i.href.slice(1))
    const observers: IntersectionObserver[] = []

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive('#' + id)
        },
        { threshold: 0.5 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <div className="svc-strip" id="svc-strip-top" ref={stripRef}>
      <div className="svc-strip-inner">
        {items.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={`ss-item${active === href ? ' active' : ''}`}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}
