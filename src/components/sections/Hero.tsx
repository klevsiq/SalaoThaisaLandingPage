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
            <stop offset="0%" stopColor="#c6a96a" stopOpacity="0.0" />
            <stop offset="40%" stopColor="#c6a96a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c6a96a" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="sg2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e8d5a3" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#e8d5a3" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#e8d5a3" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="sg3" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#c6a96a" stopOpacity="0.0" />
            <stop offset="30%" stopColor="#c6a96a" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#c6a96a" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#c6a96a" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path className="strand" d="M 700 -20 C 820 120 650 280 780 420 C 900 550 750 620 820 700" stroke="url(#sg1)" strokeWidth="1.2" style={{ animationDelay: '0.2s' }} />
        <path className="strand" d="M 750 -20 C 880 100 700 260 840 400 C 960 520 800 600 870 700" stroke="url(#sg1)" strokeWidth="0.8" style={{ animationDelay: '0.5s' }} />
        <path className="strand" d="M 800 -20 C 940 80 760 240 900 390 C 1030 510 860 590 930 700" stroke="url(#sg2)" strokeWidth="1.4" style={{ animationDelay: '0.1s' }} />
        <path className="strand" d="M 840 -20 C 990 60 810 240 960 380 C 1090 490 920 580 1000 700" stroke="url(#sg1)" strokeWidth="0.6" style={{ animationDelay: '0.8s' }} />
        <path className="strand" d="M 660 -20 C 790 140 610 300 730 450 C 840 570 690 640 760 700" stroke="url(#sg2)" strokeWidth="1.0" style={{ animationDelay: '0.3s' }} />
        <path className="strand" d="M 610 -20 C 730 160 560 320 670 470 C 780 590 630 650 700 700" stroke="url(#sg1)" strokeWidth="0.7" style={{ animationDelay: '0.9s' }} />
        <path className="strand" d="M 880 -20 C 1040 70 860 260 1010 400 C 1140 510 980 590 1060 700" stroke="url(#sg2)" strokeWidth="0.9" style={{ animationDelay: '0.6s' }} />
        <path className="strand" d="M 920 -20 C 1090 50 910 260 1070 410 C 1200 530 1040 600 1120 700" stroke="url(#sg1)" strokeWidth="0.5" style={{ animationDelay: '1.1s' }} />
        <path className="strand" d="M 560 -20 C 680 180 500 340 610 490 C 720 600 580 655 650 700" stroke="url(#sg1)" strokeWidth="0.6" style={{ animationDelay: '1.3s' }} />
        <path className="strand" d="M 960 -20 C 1130 45 960 255 1120 405 C 1240 510 1100 600 1170 700" stroke="url(#sg2)" strokeWidth="0.7" style={{ animationDelay: '0.4s' }} />
        <line className="strand" x1="0" y1="340" x2="580" y2="340" stroke="url(#sg3)" strokeWidth="0.5" style={{ animationDelay: '1.5s' }} />
        <line className="strand" x1="860" y1="340" x2="1440" y2="340" stroke="url(#sg3)" strokeWidth="0.5" style={{ animationDelay: '1.5s' }} />
        <circle className="particle" cx="720" cy="80" r="2" fill="#c6a96a" style={{ animationDelay: '0s' }} />
        <circle className="particle" cx="830" cy="160" r="1.5" fill="#e8d5a3" style={{ animationDelay: '0.7s' }} />
        <circle className="particle" cx="680" cy="240" r="2.5" fill="#c6a96a" style={{ animationDelay: '1.2s' }} />
        <circle className="particle" cx="900" cy="300" r="1.5" fill="#e8d5a3" style={{ animationDelay: '0.3s' }} />
        <circle className="particle" cx="760" cy="390" r="2" fill="#c6a96a" style={{ animationDelay: '1.8s' }} />
        <circle className="particle" cx="840" cy="460" r="1" fill="#e8d5a3" style={{ animationDelay: '0.9s' }} />
        <circle className="particle" cx="700" cy="520" r="2" fill="#c6a96a" style={{ animationDelay: '0.5s' }} />
        <circle className="particle" cx="950" cy="200" r="1.5" fill="#e8d5a3" style={{ animationDelay: '2.1s' }} />
        <circle className="particle" cx="620" cy="350" r="1.5" fill="#c6a96a" style={{ animationDelay: '1.5s' }} />
        <circle className="particle" cx="1020" cy="420" r="1" fill="#e8d5a3" style={{ animationDelay: '0.6s' }} />
        <polygon className="strand" points="1100,200 1140,260 1100,320 1060,260"
          stroke="#c6a96a" strokeOpacity="0.12" strokeWidth="0.8" fill="none"
          style={{ animationDelay: '2s' }} />
        <polygon className="strand" points="1100,210 1130,260 1100,310 1070,260"
          stroke="#c6a96a" strokeOpacity="0.07" strokeWidth="0.5" fill="none"
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
            <stop offset="0%" stopColor="#c4a35a" stopOpacity="0" />
            <stop offset="40%" stopColor="#c4a35a" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#c4a35a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M 200 -10 C 220 80 190 180 210 280 C 228 370 200 460 215 610" stroke="url(#mgold)" strokeWidth="1.0" fill="none" />
        <path d="M 230 -10 C 255 90 220 190 242 290 C 260 380 235 465 248 610" stroke="url(#mgold)" strokeWidth="0.7" fill="none" />
        <path d="M 260 -10 C 288 100 252 200 276 300 C 295 390 268 470 283 610" stroke="url(#mgold)" strokeWidth="0.5" fill="none" />
        <path d="M 170 -10 C 192 85 162 185 180 285 C 196 372 170 458 183 610" stroke="url(#mgold)" strokeWidth="0.8" fill="none" />
        <path d="M 300 -10 C 326 105 292 205 312 305 C 330 395 305 475 318 610" stroke="url(#mgold)" strokeWidth="0.4" fill="none" />
        <path d="M 320 -10 C 348 108 315 210 336 310 C 354 400 330 478 344 610" stroke="url(#mgold)" strokeWidth="0.3" fill="none" />
        <circle cx="215" cy="120" r="1.8" fill="#c4a35a" opacity="0.4" />
        <circle cx="245" cy="240" r="1.4" fill="#c4a35a" opacity="0.3" />
        <circle cx="280" cy="340" r="1.6" fill="#c4a35a" opacity="0.35" />
        <circle cx="195" cy="420" r="1.2" fill="#c4a35a" opacity="0.25" />
        <circle cx="315" cy="180" r="1.0" fill="#c4a35a" opacity="0.2" />
      </svg>

      <div className="hero-content">
        <h1 className="hero-h1">
          <span className="str">Arte</span>que nasce<em>do cuidado.</em>
        </h1>
        <p className="hero-sub">
          Thaisa Carolina transforma cabelos com técnica apurada,
          escuta genuína e um olhar artístico único.
        </p>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <div className="scroll-bar" />
      </div>
    </section>
  )
}
