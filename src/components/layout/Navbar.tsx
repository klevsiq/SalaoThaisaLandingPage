import { useEffect, useRef, useState } from 'react'

declare const gtag: (...args: unknown[]) => void
const trackWA = () => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'whatsapp_click', { event_category: 'engagement', event_label: 'navbar' })
  }
}

interface NavbarProps {
  onHeightChange: (h: number) => void
}

export default function Navbar({ onHeightChange }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const measure = () => {
      if (navRef.current) {
        onHeightChange(navRef.current.offsetHeight)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [onHeightChange])

  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav id="nav" ref={navRef}>
        <a href="#" className="nb">
          <div className="nb-name">Tha Carolina Hair Studio</div>
          <div className="nb-sub">Atendimento Personalizado</div>
        </a>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          id="hamburger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span />
          <span />
          <span />
        </button>

      </nav>

      <div
        className={`mobile-nav${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <a href="#sobre" className="mn-link" onClick={closeMenu}>Sobre</a>
        <div className="mn-sep" />
        <a href="#servicos" className="mn-link" onClick={closeMenu}>Serviços</a>
        <a href="#profissional" className="mn-link" onClick={closeMenu}>Profissional</a>
        <a href="#produtos" className="mn-link" onClick={closeMenu}>Produtos</a>
        <div className="mn-sep" />
        <a href="#depoimentos" className="mn-link" onClick={closeMenu}>Avaliações</a>
        <a href="#contato" className="mn-link" onClick={closeMenu}>Contato</a>
        <a
          href="https://wa.me/5511947195729?text=Ol%C3%A1!%20Gostaria%20de%20agendar."
          className="mn-cta"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { closeMenu(); trackWA() }}
        >
          Agendar
        </a>
      </div>
    </>
  )
}
