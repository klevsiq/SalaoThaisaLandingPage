import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useInView } from '@/hooks/useInView'

const GoogleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
)

interface Testimonial {
  name: string
  initial: string
  meta: string
  service: string
  text: string
  featured?: boolean
}

const testimonials: Testimonial[] = [
  {
    name: 'Jennifer Souza',
    initial: 'J',
    meta: 'Cliente há mais de 7 anos',
    service: 'Escova · Corte · Penteados',
    text: '"Conheço o trabalho da Thaisa há mais de 7 anos e posso dizer, com toda sinceridade, que é uma profissional em quem confio de olhos fechados. Não é só sobre cabelo, é sobre cuidado, escuta e entrega em cada detalhe."',
    featured: true,
  },
  {
    name: 'Yasmim Souza',
    initial: 'Y',
    meta: 'Primeira visita',
    service: 'Coloração · Corte',
    text: '"Foi a primeira vez que pintei meu cabelo em salão e simplesmente amei. Ficou melhor do que eu esperava. Super simpática e atenciosa."',
  },
  {
    name: 'Ariane Santana',
    initial: 'A',
    meta: 'Cliente recorrente',
    service: 'Nutrição & Brilho',
    text: '"Atendimento incrível, profissional super cuidadosa e um espaço que dá vontade de voltar sempre."',
  },
  {
    name: 'Tadia Marçal',
    initial: 'T',
    meta: 'Cliente satisfeita',
    service: 'Escova · Cabelo',
    text: '"Excelente atendimento, recebi mais que um cabelo incrível! O ambiente é super acolhedor, limpo e profissional. Simplesmente amei!"',
  },
  {
    name: 'Myla Lopes',
    initial: 'M',
    meta: 'Cliente nova',
    service: 'Corte · Correção de Cor · Luzes',
    text: '"Conheci o Studio pelo Instagram, fui super bem atendida, a Thaisa tirou todas as minhas dúvidas e me passou muita confiança. Estou completamente apaixonada pelo resultado!"',
  },
  {
    name: 'Nat Xavier',
    initial: 'N',
    meta: 'Cliente nova',
    service: 'Liso Perfeito',
    text: '"A melhor progressiva que já fiz, deixou meu cabelo bem solto, não ficou artificial. Uma excelente profissional, super atenciosa, vale muito a pena."',
  },
  {
    name: 'Lorena Vieira',
    initial: 'L',
    meta: 'Cliente nova',
    service: 'Cabelo',
    text: '"Experiência incrível! A Thaisa super gentil e simpática, me tratou muito bem do começo ao fim. Salão com ambiente lindo e acolhedor. Amei cada detalhe, super recomendo!"',
  },
  {
    name: 'Edivania Nogueira',
    initial: 'E',
    meta: 'Cliente satisfeita',
    service: 'Coloração · Corte',
    text: '"Excelente profissional, mostrei o que eu queria e ela me entregou exatamente o resultado esperado. Depois levei minha filha para cortar e ficou lindo. Com certeza voltarei!"',
  },
  {
    name: 'Danielly Salles',
    initial: 'D',
    meta: 'Cliente fiel',
    service: 'Cabelo',
    text: '"Espaço lindo e aconchegante. Eu adoro ir lá, e adoro a Tha! Fazer os cabelos pra mim, agora é terapêutico haha."',
  },
]

const REVIEW_URL = 'https://g.page/r/CcQSU1AR5IWJEAE/review'

export default function Testimonials() {
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>()

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: false,
  })

  const [selectedIdx, setSelectedIdx] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIdx(emblaApi.selectedScrollSnap())
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi) return
    if (!window.matchMedia('(max-width: 768px)').matches) return

    let timer: ReturnType<typeof setInterval>
    const play = () => { timer = setInterval(() => emblaApi.scrollNext(), 5000) }
    const stop = () => clearInterval(timer)

    play()
    emblaApi.on('pointerDown', stop)
    emblaApi.on('pointerUp', () => { stop(); play() })

    return () => { stop() }
  }, [emblaApi])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()
  const scrollTo = (i: number) => emblaApi?.scrollTo(i)

  return (
    <section className="testi" id="depoimentos">
      <div className="testi-inner">
        <div
          className={`testi-head reveal${headIn ? ' on' : ''}`}
          ref={headRef}
        >
          <div>
            <div className="eyebrow"><span>Avaliações</span></div>
            <h2 className="sh">
              Resultados que falam<br />
              <em>mais alto que qualquer promessa.</em>
            </h2>
          </div>
          <div className="testi-score">
            <div className="ts-num">5.0</div>
            <div className="ts-lbl">Google Reviews</div>
            <div className="ts-stars">★★★★★</div>
          </div>
        </div>

        <div className="t-carousel-wrap">
          <div className="t-embla-viewport" ref={emblaRef}>
            <div className="t-grid">
              {testimonials.map((t, i) => (
                <a
                  key={i}
                  className={`t-card${t.featured ? ' feat' : ''}`}
                  href={REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Avaliação de ${t.name}`}
                >
                  <div className="t-top">
                    <div className="t-stars">★★★★★</div>
                    <div className="t-gbadge">
                      <GoogleIcon />
                      <span>Google</span>
                    </div>
                  </div>
                  <p className="t-text">{t.text}</p>
                  <div className="t-author">
                    <div className="t-avatar">{t.initial}</div>
                    <div>
                      <div className="t-name">{t.name}</div>
                      <div className="t-meta">{t.meta}</div>
                      <div className="t-svc">{t.service}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="t-nav">
          <button
            className="t-nav-btn"
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label="Anterior"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="t-nav-btn"
            onClick={scrollNext}
            disabled={!canNext}
            aria-label="Próximo"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="t-dots" role="tablist" aria-label="Navegar entre avaliações">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                className={`t-dot${i === selectedIdx ? ' on' : ''}`}
                onClick={() => scrollTo(i)}
                role="tab"
                aria-selected={i === selectedIdx}
                aria-label={`Grupo ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="testi-foot">
          <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer" className="sf-google">
            <GoogleIcon />
            Ver todas as avaliações
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <p>Sua avaliação no Google ajuda outras clientes a nos conhecer. Leva menos de um minuto.</p>
        </div>
      </div>
    </section>
  )
}
