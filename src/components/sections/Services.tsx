import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useInView } from '@/hooks/useInView'
import { img } from '@/lib/utils'

interface ServiceImage { src: string; alt: string }
interface ServiceData {
  id: string
  name: string
  description: string
  images: ServiceImage[]
  delay?: string
}

const services: ServiceData[] = [
  {
    id: 'svc-corte',
    name: 'Corte',
    description: 'Um bom corte muda tudo. Diagnóstico de rosto, técnica precisa e acabamento impecável para revelar o melhor de você.',
    images: [
      { src: img('gallery/image_07.jpg'), alt: 'Corte cacheado' },
      { src: img('gallery/image_08.jpg'), alt: 'Corte midi liso' },
      { src: img('gallery/image_09.jpg'), alt: 'Corte chanel ondulado' },
    ],
  },
  {
    id: 'svc-mechas',
    name: 'Loiros & Iluminados',
    description: 'Mechas abertas, iluminados ou loiros naturais. A colorimetria define o tom certo para o seu fio e o seu tom de pele, preservando a saúde capilar.',
    images: [
      { src: img('gallery/image_10.jpg'), alt: 'Mechas iluminadas - tom acobreado' },
      { src: img('gallery/image_11.jpg'), alt: 'Mechas iluminadas - loiro' },
      { src: img('gallery/image_12.jpg'), alt: 'Cabelo cacheado loiro iluminado' },
      { src: img('gallery/image_13.jpg'), alt: 'Mechas loiras estilo bali' },
    ],
    delay: 'd2',
  },
  {
    id: 'svc-progressiva',
    name: 'Progressiva',
    description: 'Liso duradouro, sem frizz e sem agredir os fios. Progressiva que respeita seu cabelo e entrega resultado que dura meses.',
    images: [
      { src: img('gallery/image_14.jpg'), alt: 'Progressiva - cabelo liso e brilhante' },
      { src: img('gallery/progressiva_2.jpeg'), alt: 'Progressiva - resultado liso' },
      { src: img('gallery/progressiva_3.jpeg'), alt: 'Progressiva - fios lisos e brilhantes' },
    ],
    delay: 'd3',
  },
  {
    id: 'svc-botox',
    name: 'Botox Capilar',
    description: 'Cabelo danificado tem solução. Recuperação intensa, hidratação profunda e resultado visível desde a primeira sessão.',
    images: [
      { src: img('gallery/image_15.jpg'), alt: 'Botox capilar - corte chanel preto brilhante' },
      { src: img('gallery/image_16.jpg'), alt: 'Botox capilar - cabelo castanho liso e brilhante' },
      { src: img('gallery/Botox_2.jpeg'), alt: 'Botox capilar - resultado' },
    ],
    delay: 'd1',
  },
  {
    id: 'svc-coloracao',
    name: 'Coloração & Correção de Cor',
    description: 'Cor vibrante, duradoura e segura. Correções feitas com precisão técnica para você finalmente amar a cor do seu cabelo.',
    images: [
      { src: img('gallery/image_17.jpg'), alt: 'Coloração vermelha' },
      { src: img('gallery/image_18.jpg'), alt: 'Correção de cor castanho acobreado' },
    ],
    delay: 'd2',
  },
  {
    id: 'svc-escova',
    name: 'Escova & Tratamentos',
    description: 'Escova perfeita e tratamentos que reconstroem de dentro para fora. Para quem quer fios saudáveis, macios e com brilho real.',
    images: [
      { src: img('gallery/image_19.jpg'), alt: 'Escova & Tratamentos' },
      { src: img('gallery/image_20.jpg'), alt: 'Escova - cabelo morena iluminada' },
      { src: img('gallery/Escova_Tratamentos_2.jpeg'), alt: 'Escova & Tratamentos - resultado' },
    ],
    delay: 'd3',
  },
]

/* ── Lightbox ── */
interface LightboxProps {
  images: ServiceImage[]
  startIndex: number
  onClose: () => void
}

function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [idx, setIdx] = useState(startIndex)

  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  return createPortal(
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Visualização ampliada"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <button className="lightbox-btn lb-close" onClick={onClose} aria-label="Fechar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {images.length > 1 && (
        <button className="lightbox-btn lb-prev" onClick={prev} aria-label="Foto anterior">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      <img
        className="lightbox-img"
        src={images[idx].src}
        alt={images[idx].alt}
      />

      {images.length > 1 && (
        <button className="lightbox-btn lb-next" onClick={next} aria-label="Próxima foto">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {images.length > 1 && (
        <div className="lb-dots" role="tablist" aria-label="Navegação de fotos">
          {images.map((_, i) => (
            <span
              key={i}
              className={i === idx ? 'on' : ''}
              onClick={() => setIdx(i)}
              role="tab"
              aria-selected={i === idx}
              aria-label={`Foto ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>,
    document.body
  )
}

/* ── Service Card ── */
interface CardProps {
  svc: ServiceData
  onOpen: (images: ServiceImage[], idx: number) => void
}

function ServiceCard({ svc, onOpen }: CardProps) {
  const { ref: cardRef, inView } = useInView<HTMLDivElement>()
  const [imgIdx, setImgIdx] = useState(0)
  const isDual = svc.images.length > 1
  const touchStart = useRef({ x: 0, y: 0 })

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImgIdx(i => (i - 1 + svc.images.length) % svc.images.length)
  }
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImgIdx(i => (i + 1) % svc.images.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('.svc-nav')) return
    touchStart.current = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('.svc-nav')) return
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (isDual) {
        if (dx < 0) setImgIdx(i => (i + 1) % svc.images.length)
        else setImgIdx(i => (i - 1 + svc.images.length) % svc.images.length)
      }
    } else if (Math.abs(dx) < 12 && Math.abs(dy) < 12) {
      onOpen(svc.images, imgIdx)
    }
    e.preventDefault()
  }

  return (
    <div
      ref={cardRef}
      className={`svc-card reveal${svc.delay ? ' ' + svc.delay : ''}${inView ? ' on' : ''}`}
      id={svc.id}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(svc.images, imgIdx)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onOpen(svc.images, imgIdx) }}
      aria-label={`Ver fotos de ${svc.name}`}
    >
      <div className={`svc-img${isDual ? ' dual' : ''}`}>
        {svc.images.map((image, i) => (
          <img
            key={i}
            src={image.src}
            alt={image.alt}
            className={i === imgIdx ? 'on' : ''}
            loading="lazy"
          />
        ))}
      </div>

      {isDual && (
        <div className="svc-dots" aria-hidden="true">
          {svc.images.map((_, i) => (
            <span key={i} className={i === imgIdx ? 'on' : ''} />
          ))}
        </div>
      )}

      <div className="svc-overlay" />
      <div className="svc-body">
        <h3 className="svc-name">{svc.name}</h3>
      </div>

      {isDual && (
        <>
          <button
            className="svc-nav prev"
            type="button"
            onClick={handlePrev}
            aria-label="Foto anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="svc-nav next"
            type="button"
            onClick={handleNext}
            aria-label="Próxima foto"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

    </div>
  )
}

/* ── Services Section ── */
export default function Services() {
  const { ref: headerRef, inView: headerIn } = useInView<HTMLDivElement>()
  const [lightbox, setLightbox] = useState<{ images: ServiceImage[]; idx: number } | null>(null)

  return (
    <section className="services" id="servicos">
      <div className="services-inner">
        <div
          className={`svc-header reveal${headerIn ? ' on' : ''}`}
          ref={headerRef}
        >
          <div>
            <div className="eyebrow"><span>Serviços</span></div>
            <h2 className="sh">Transformações que<em> duram</em></h2>
          </div>
          <p className="sp" style={{ maxWidth: '320px', textAlign: 'right' }}>
            Cada serviço é pensado para o seu cabelo, do diagnóstico
            ao resultado. Toque na foto para{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)', fontFamily: 'var(--serif)' }}>
              ampliar
            </em>.
          </p>
        </div>

        <div className="svc-grid">
          {services.map((svc) => (
            <ServiceCard
              key={svc.id}
              svc={svc}
              onOpen={(images, idx) => setLightbox({ images, idx })}
            />
          ))}
        </div>

        <p className="svc-microcopy">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
          </svg>
          <span className="smc-text">
            Orçamento gratuito.<br className="smc-br" />{' '}
            Resposta rápida pelo <em>WhatsApp</em>.
          </span>
        </p>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.idx}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  )
}
