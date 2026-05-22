      // Status aberto/fechado — Ter-Sex e Sab 09h-18h (horário de Brasília)
      function updateStatus() {
        const pill = document.getElementById("status-pill");
        const dot = document.getElementById("status-dot");
        const txt = document.getElementById("status-text");
        if (!pill) return;
        // Horário de Brasília (UTC-3)
        const now = new Date(
          new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }),
        );
        const day = now.getDay(); // 0=Dom,1=Seg,2=Ter,3=Qua,4=Qui,5=Sex,6=Sab
        const h = now.getHours();
        const m = now.getMinutes();
        const mins = h * 60 + m;
        const open = 9 * 60,
          close = 18 * 60,
          closeSat = 17 * 60;
        // Aberto: Ter(2) a Sex(5) e Sab(6), das 9 às 18 (Sex)/17 (Sab)
        const closeToday = day === 6 ? closeSat : close;
        const isOpen =
          day >= 2 && day <= 6 && mins >= open && mins < closeToday;
        pill.style.display = "inline-flex";
        if (isOpen) {
          pill.classList.remove("fechado");
          dot.style.animation = "blink 2s infinite";
          txt.textContent = "Aberto agora";
        } else {
          pill.classList.add("fechado");
          dot.style.animation = "none";
          // Mostrar próximo horário
          const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
          if (day === 0 || day === 1) {
            txt.textContent = "Abre terça às 09h";
          } else if (mins >= closeToday) {
            const next = day === 6 ? "terça" : days[(day + 1) % 7];
            txt.textContent = "Abre " + next + " às 09h";
          } else {
            txt.textContent = "Abre hoje às 09h";
          }
        }
      }
      updateStatus();
      setInterval(updateStatus, 60000);

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

