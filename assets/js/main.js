      // Altura real do nav + svc-strip para o hero não ficar cortado
      function setHeaderH() {
        const n = document.getElementById("nav");
        const s = document.getElementById("svc-strip-top");
        const h = (n ? n.offsetHeight : 0) + (s ? s.offsetHeight : 0);
        document.documentElement.style.setProperty("--header-h", h + "px");
      }
      setHeaderH();
      window.addEventListener("resize", setHeaderH);


      // Reveal on scroll
      const obs = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("on");
              obs.unobserve(e.target);
            }
          }),
        { threshold: 0.1 },
      );
      document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

      // Smooth scroll with offset
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          const id = a.getAttribute("href");
          if (id === "#") return;
          const t = document.querySelector(id);
          if (t) {
            e.preventDefault();
            window.scrollTo({
              top: t.getBoundingClientRect().top + scrollY - 72,
              behavior: "smooth",
            });
          }
        });
      });

      // Active strip item on scroll
      const sections = document.querySelectorAll('[id^="svc-"]');
      const ssItems = document.querySelectorAll(".ss-item");
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              ssItems.forEach((s) => s.classList.remove("active"));
              const match = document.querySelector(
                '.ss-item[href="#' + e.target.id + '"]',
              );
              if (match) match.classList.add("active");
            }
          }),
        { threshold: 0.5 },
      );
      sections.forEach((s) => io.observe(s));

      // Sliders manuais para cards com multiplas fotos
      document.querySelectorAll(".svc-img.dual").forEach((slider) => {
        const imgs = slider.querySelectorAll("img");
        if (imgs.length < 2) return;
        const card = slider.closest(".svc-card");
        let idx = Array.from(imgs).findIndex((i) => i.classList.contains("on"));
        if (idx < 0) {
          idx = 0;
          imgs[0].classList.add("on");
        }
        // Cria dots
        const dots = document.createElement("div");
        dots.className = "svc-dots";
        imgs.forEach((_, i) => {
          const d = document.createElement("span");
          if (i === idx) d.classList.add("on");
          dots.appendChild(d);
        });
        card.appendChild(dots);
        // Cria botoes
        const mkBtn = (cls, svgPath, label) => {
          const b = document.createElement("button");
          b.type = "button";
          b.className = "svc-nav " + cls;
          b.setAttribute("aria-label", label);
          b.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="' +
            svgPath +
            '"/></svg>';
          return b;
        };
        const prev = mkBtn("prev", "M15 18l-6-6 6-6", "Foto anterior");
        const next = mkBtn("next", "M9 18l6-6-6-6", "Proxima foto");
        card.appendChild(prev);
        card.appendChild(next);
        const go = (n) => {
          imgs[idx].classList.remove("on");
          dots.children[idx].classList.remove("on");
          idx = (n + imgs.length) % imgs.length;
          imgs[idx].classList.add("on");
          dots.children[idx].classList.add("on");
        };
        const stop = (e) => {
          e.preventDefault();
          e.stopPropagation();
        };
        prev.addEventListener("click", (e) => {
          stop(e);
          go(idx - 1);
        });
        next.addEventListener("click", (e) => {
          stop(e);
          go(idx + 1);
        });
        // Evita que dots disparem o link tambem
        dots.addEventListener("click", stop);
      });

    // ── CAROUSEL ──
    (function() {
      var track = document.getElementById('tCarousel');
      var dotsEl = document.getElementById('tDots');
      if (!track) return;
      var cards = Array.from(track.querySelectorAll('.t-card'));
      var total = cards.length;
      var cur = 0;

      function pp() { return window.innerWidth < 700 ? 1 : window.innerWidth < 1100 ? 2 : 3; }

      function buildDots() {
        dotsEl.innerHTML = '';
        var pages = Math.ceil(total / pp());
        for (var i = 0; i < pages; i++) {
          (function(idx) {
            var d = document.createElement('button');
            d.className = 't-dot';
            d.addEventListener('click', function() { goTo(idx * pp()); });
            dotsEl.appendChild(d);
          })(i);
        }
      }

      function goTo(idx) {
        var p = pp();
        var max = Math.max(0, total - p);
        cur = Math.max(0, Math.min(idx, max));
        var gap = 20;
        var cardW = cards[0].getBoundingClientRect().width + gap;
        track.style.transform = 'translateX(-' + (cur * cardW) + 'px)';
        var page = Math.floor(cur / p);
        var dots = dotsEl.querySelectorAll('.t-dot');
        dots.forEach(function(d, i) { d.classList.toggle('on', i === page); });
        document.getElementById('tPrev').disabled = cur === 0;
        document.getElementById('tNext').disabled = cur >= max;
      }

      document.getElementById('tPrev').addEventListener('click', function() { goTo(cur - pp()); });
      document.getElementById('tNext').addEventListener('click', function() { goTo(cur + pp()); });
      window.addEventListener('resize', function() { buildDots(); goTo(0); });
      buildDots();
      goTo(0);
    })();


    
    
    // ── HAMBURGER MENU ──
    (function() {
      var btn = document.getElementById('hamburger');
      var nav = document.getElementById('mobileNav');
      if (!btn || !nav) return;
      function toggleMenu() {
        btn.classList.toggle('open');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
      }
      btn.addEventListener('click', toggleMenu);
      nav.querySelectorAll('.mn-link, .mn-cta').forEach(function(a) {
        a.addEventListener('click', function() {
          btn.classList.remove('open');
          nav.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
      document.addEventListener('click', function(e) {
        if (nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) {
          btn.classList.remove('open');
          nav.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    })();
    
    // ── MOBILE TOUCH: mostrar setas ao toque nos cards
    if ('ontouchstart' in window) {
      document.querySelectorAll('.svc-card').forEach(function(card) {
        card.addEventListener('touchstart', function() {
          document.querySelectorAll('.svc-card').forEach(function(c) { c.classList.remove('touched'); });
          card.classList.add('touched');
        }, { passive: true });
      });
      document.addEventListener('touchstart', function(e) {
        if (!e.target.closest('.svc-card')) {
          document.querySelectorAll('.svc-card').forEach(function(c) { c.classList.remove('touched'); });
        }
      }, { passive: true });
    }

    // ── LIGHTBOX para ampliar fotos dos cards de serviço ──
    (function() {
      var lb = document.getElementById('lightbox');
      if (!lb) return;
      var lbImg = document.getElementById('lbImg');
      var lbDots = document.getElementById('lbDots');
      var lbClose = document.getElementById('lbClose');
      var lbPrev = document.getElementById('lbPrev');
      var lbNext = document.getElementById('lbNext');
      var imgs = [];
      var idx = 0;

      function render() {
        if (!imgs.length) return;
        lbImg.src = imgs[idx].src;
        lbImg.alt = imgs[idx].alt || '';
        lbDots.innerHTML = '';
        if (imgs.length > 1) {
          imgs.forEach(function(_, i) {
            var d = document.createElement('span');
            if (i === idx) d.classList.add('on');
            lbDots.appendChild(d);
          });
          lbPrev.style.display = '';
          lbNext.style.display = '';
        } else {
          lbPrev.style.display = 'none';
          lbNext.style.display = 'none';
        }
      }
      function open(card) {
        var cardImgs = Array.from(card.querySelectorAll('.svc-img img'));
        if (!cardImgs.length) return;
        imgs = cardImgs;
        var active = imgs.findIndex(function(i) { return i.classList.contains('on'); });
        idx = active >= 0 ? active : 0;
        render();
        lb.classList.add('open');
        lb.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
      function close() {
        lb.classList.remove('open');
        lb.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
      function go(n) {
        if (!imgs.length) return;
        idx = (n + imgs.length) % imgs.length;
        render();
      }

      document.querySelectorAll('.svc-card').forEach(function(card) {
        card.addEventListener('click', function(e) {
          if (e.target.closest('.svc-nav') || e.target.closest('.svc-dots')) return;
          open(card);
        });
      });
      lbClose.addEventListener('click', close);
      lbPrev.addEventListener('click', function() { go(idx - 1); });
      lbNext.addEventListener('click', function() { go(idx + 1); });
      lb.addEventListener('click', function(e) {
        if (e.target === lb) close();
      });
      document.addEventListener('keydown', function(e) {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft') go(idx - 1);
        else if (e.key === 'ArrowRight') go(idx + 1);
      });
    })();

