import { trackWhatsApp } from '@/lib/utils'

const WA_URL = 'https://wa.me/5511947195729?text=Ol%C3%A1!%20Vim%20do%20site%20e%20quero%20agendar!'

const trackWA = () => trackWhatsApp('hero')

const WppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* SVG desktop — fios fluidos + partículas douradas */}
      <svg
        className="hero-abstract"
        viewBox="0 0 1440 680"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c99aa4" stopOpacity="0.0" />
            <stop offset="40%" stopColor="#c99aa4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#c99aa4" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="sg2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b97f8c" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#b97f8c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#b97f8c" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="sg3" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#c99aa4" stopOpacity="0.0" />
            <stop offset="30%" stopColor="#c99aa4" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#c99aa4" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#c99aa4" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path className="strand" d="M 700 -20 C 820 120 650 280 780 420 C 900 550 750 620 820 700" stroke="url(#sg1)" strokeWidth="1.8" style={{ animationDelay: '0.2s' }} />
        <path className="strand" d="M 750 -20 C 880 100 700 260 840 400 C 960 520 800 600 870 700" stroke="url(#sg1)" strokeWidth="1.2" style={{ animationDelay: '0.5s' }} />
        <path className="strand" d="M 800 -20 C 940 80 760 240 900 390 C 1030 510 860 590 930 700" stroke="url(#sg2)" strokeWidth="2.0" style={{ animationDelay: '0.1s' }} />
        <path className="strand" d="M 840 -20 C 990 60 810 240 960 380 C 1090 490 920 580 1000 700" stroke="url(#sg1)" strokeWidth="1.0" style={{ animationDelay: '0.8s' }} />
        <path className="strand" d="M 660 -20 C 790 140 610 300 730 450 C 840 570 690 640 760 700" stroke="url(#sg2)" strokeWidth="1.5" style={{ animationDelay: '0.3s' }} />
        <path className="strand" d="M 610 -20 C 730 160 560 320 670 470 C 780 590 630 650 700 700" stroke="url(#sg1)" strokeWidth="1.1" style={{ animationDelay: '0.9s' }} />
        <path className="strand" d="M 880 -20 C 1040 70 860 260 1010 400 C 1140 510 980 590 1060 700" stroke="url(#sg2)" strokeWidth="1.4" style={{ animationDelay: '0.6s' }} />
        <path className="strand" d="M 920 -20 C 1090 50 910 260 1070 410 C 1200 530 1040 600 1120 700" stroke="url(#sg1)" strokeWidth="0.9" style={{ animationDelay: '1.1s' }} />
        <path className="strand" d="M 560 -20 C 680 180 500 340 610 490 C 720 600 580 655 650 700" stroke="url(#sg1)" strokeWidth="1.0" style={{ animationDelay: '1.3s' }} />
        <path className="strand" d="M 960 -20 C 1130 45 960 255 1120 405 C 1240 510 1100 600 1170 700" stroke="url(#sg2)" strokeWidth="1.1" style={{ animationDelay: '0.4s' }} />
        <line className="strand" x1="0" y1="340" x2="580" y2="340" stroke="url(#sg3)" strokeWidth="0.9" style={{ animationDelay: '1.5s' }} />
        <line className="strand" x1="860" y1="340" x2="1440" y2="340" stroke="url(#sg3)" strokeWidth="0.9" style={{ animationDelay: '1.5s' }} />
        <circle className="particle" cx="720" cy="80" r="2" fill="#c99aa4" style={{ animationDelay: '0s' }} />
        <circle className="particle" cx="830" cy="160" r="1.5" fill="#b97f8c" style={{ animationDelay: '0.7s' }} />
        <circle className="particle" cx="680" cy="240" r="2.5" fill="#c99aa4" style={{ animationDelay: '1.2s' }} />
        <circle className="particle" cx="900" cy="300" r="1.5" fill="#b97f8c" style={{ animationDelay: '0.3s' }} />
        <circle className="particle" cx="760" cy="390" r="2" fill="#c99aa4" style={{ animationDelay: '1.8s' }} />
        <circle className="particle" cx="840" cy="460" r="1" fill="#b97f8c" style={{ animationDelay: '0.9s' }} />
        <circle className="particle" cx="700" cy="520" r="2" fill="#c99aa4" style={{ animationDelay: '0.5s' }} />
        <circle className="particle" cx="950" cy="200" r="1.5" fill="#b97f8c" style={{ animationDelay: '2.1s' }} />
        <circle className="particle" cx="620" cy="350" r="1.5" fill="#c99aa4" style={{ animationDelay: '1.5s' }} />
        <circle className="particle" cx="1020" cy="420" r="1" fill="#b97f8c" style={{ animationDelay: '0.6s' }} />
        <polygon className="strand" points="1100,200 1140,260 1100,320 1060,260"
          stroke="#c99aa4" strokeOpacity="0.32" strokeWidth="1.8" fill="none"
          style={{ animationDelay: '2s' }} />
        <polygon className="strand" points="1100,210 1130,260 1100,310 1070,260"
          stroke="#c99aa4" strokeOpacity="0.2" strokeWidth="1.4" fill="none"
          style={{ animationDelay: '2.2s' }} />
      </svg>

      {/* SVG mobile simplificado */}
      <svg
        className="hero-abstract-mobile"
        viewBox="0 0 390 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mgold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c99aa4" stopOpacity="0" />
            <stop offset="40%" stopColor="#c99aa4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c99aa4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M 200 -10 C 220 80 190 180 210 280 C 228 370 200 460 215 610" stroke="url(#mgold)" strokeWidth="1.5" fill="none" />
        <path d="M 230 -10 C 255 90 220 190 242 290 C 260 380 235 465 248 610" stroke="url(#mgold)" strokeWidth="1.1" fill="none" />
        <path d="M 260 -10 C 288 100 252 200 276 300 C 295 390 268 470 283 610" stroke="url(#mgold)" strokeWidth="0.9" fill="none" />
        <path d="M 170 -10 C 192 85 162 185 180 285 C 196 372 170 458 183 610" stroke="url(#mgold)" strokeWidth="1.2" fill="none" />
        <path d="M 300 -10 C 326 105 292 205 312 305 C 330 395 305 475 318 610" stroke="url(#mgold)" strokeWidth="0.8" fill="none" />
        <path d="M 320 -10 C 348 108 315 210 336 310 C 354 400 330 478 344 610" stroke="url(#mgold)" strokeWidth="0.7" fill="none" />
        <circle cx="215" cy="120" r="2.4" fill="#c99aa4" opacity="0.75" />
        <circle cx="245" cy="240" r="2.0" fill="#c99aa4" opacity="0.65" />
        <circle cx="280" cy="340" r="2.2" fill="#c99aa4" opacity="0.7" />
        <circle cx="195" cy="420" r="1.8" fill="#c99aa4" opacity="0.6" />
        <circle cx="315" cy="180" r="1.6" fill="#c99aa4" opacity="0.55" />
      </svg>

      <div className="hero-content">
        <h1 className="hero-h1">
          <span className="str">Arte</span>que nasce<em>do cuidado.</em>
        </h1>
        <p className="hero-sub">
          Thaisa Carolina transforma cabelos com técnica apurada,
          escuta genuína e um olhar artístico único.
        </p>

        {/* CTAs */}
        <div className="hero-actions">
          <a
            href={WA_URL}
            className="btn-gold"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar horário pelo WhatsApp"
            onClick={trackWA}
          >
            <WppIcon />
            <span>Agendar pelo WhatsApp</span>
          </a>
          <a href="#servicos" className="hero-sec-link">
            Ver serviços
          </a>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <div className="scroll-bar" />
      </div>
    </section>
  )
}
