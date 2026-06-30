# CLAUDE.md

## Stack

React 18 + TypeScript + Vite + Tailwind CSS v3. Embla Carousel para depoimentos. Deploy via GitHub Actions (push ao `v2` → build → GitHub Pages).

## Desenvolvimento local

```bash
cd E:\ClaudeCode\SalaoThaisaLandingPage
npm install       # primeira vez
npm run dev       # servidor local em http://localhost:5173
```

## Deploy

**Fluxo automático:** `git push origin v2` → GitHub Actions faz build e publica.

**Manual (emergência):** `npm run build && npm run deploy`

URL: https://thacarolina.com.br
Repositório: https://github.com/klevsiq/SalaoThaisaLandingPage (branch de produção: `v2`)

**Backup / reverter:** o branch `backup-prod-2026-06-30` guarda a versão anterior (tema escuro). Para reverter produção:
```bash
git checkout v2 && git reset --hard origin/backup-prod-2026-06-30 && git push --force origin v2
```

## Integrações ativas

| Integração | ID / detalhe |
|---|---|
| Google Analytics GA4 | `G-7TCXQC8QRW` — em `index.html` |
| Google Ads | `AW-18210895048` — em `index.html` |
| Meta Pixel | `1771468644208602` — em `index.html` |
| Schema.org | `HairSalon` — em `index.html` (validado no Rich Results Test) |
| Google Search Console | Verificado via DNS TXT no Cloudflare |
| Sitemap | `https://thacarolina.com.br/sitemap.xml` — enviado ao Search Console |

## Arquitetura

```
index.html                    — entrada do Vite (Analytics, Pixel, Schema.org, favicon, fontes)
public/
  assets/images/gallery/      — fotos dos serviços (.webp)
  assets/images/logos/        — logos de marcas (Mirra, Wella, Truss) (.png)
  favicon.svg                 — ícone "T" rosa (paleta Rosé Cream)
  sitemap.xml                 — sitemap para indexação do Google
  CNAME                       — domínio customizado thacarolina.com.br
src/
  App.tsx                     — raiz: monta seções, gerencia --nav-h / --header-h
  index.css                   — design system global (Tailwind base + CSS vars + estilos)
  main.tsx                    — entry point React
  lib/utils.ts                — função img() para URLs de imagens
  hooks/useInView.ts          — IntersectionObserver para animações reveal
  components/
    layout/  Navbar · Footer
    sections/ Hero · Services · Professional · Testimonials · CTABand
              About · Products · Instagram · Location
    WhatsAppFloat.tsx
```

### Seções (ordem em App.tsx)

| Componente | id | Descrição |
|---|---|---|
| Navbar | `#nav` | Menu hambúrguer mobile |
| Hero | `#hero` | Tela inicial + SVG animado |
| Services | `#servicos` | Cards com slider de fotos e lightbox |
| Professional | `#profissional` | Seção da Thaisa Carolina |
| Testimonials | `#depoimentos` | Carrossel paginado |
| CTABand | `#agendar` | Faixa de agendamento |
| About | `#sobre` | Sobre o salão |
| Products | `#produtos` | Logos de marcas |
| Instagram | — | Link Instagram |
| Location | `#contato` | Endereço, horários, mapa |

### Design tokens (`:root` em `index.css`)

**Tema atual: Rosé Cream** (paleta clara, v2) — creme/bege claro + rosa empoeirado + marrom quente, inspirada no logo. Tipografia editorial Cormorant Garamond + Montserrat.

> ⚠️ Os nomes das variáveis foram mantidos do tema anterior (Noir Doré, escuro). Por isso os nomes **não correspondem mais** aos valores: `--ink` agora é fundo claro, `--cream` agora é texto escuro e `--gold` agora é rosa.
>
> 🎨 **Regra de uso do rosa:** `--gold` (#c99aa4, rosa claro) só como **preenchimento** (fundo de botão, bordas, dots) e em texto sobre fundo escuro (cards de serviço). Para **texto/ícones sobre fundo claro**, use sempre `--accent-deep` (#8c4555) — tem contraste WCAG AA. Rosa claro como texto no creme reprova no contraste.

| Variável | Valor | Uso |
|---|---|---|
| `--ink` | `#f6f0ea` | Fundo principal (claro) |
| `--ink2` | `#ede3dc` | Seções alternadas |
| `--ink3` | `#e4d7cc` | Cards / superfícies elevadas |
| `--gold` | `#c99aa4` | Rosa claro — **preenchimento** (botões, bordas, dots) |
| `--gold2` | `#e5c6cc` | Rosa suave (hover de botões) |
| `--gold-dim` | `rgba(201,154,164,0.16)` | Rosa translúcido (fundos sutis) |
| `--accent-deep` | `#8c4555` | Rosa escuro — **texto/ícones** rosa (contraste WCAG AA) |
| `--rose` | `#8a6a52` | Segundo accent — marrom quente do logo |
| `--cream` | `#2d231f` | Texto principal — marrom bem escuro |
| `--off` | `#5d4f47` | Texto secundário / muted |
| `--serif` | Cormorant Garamond | Títulos editoriais |
| `--sans` | Montserrat | Corpo de texto |

### Acessibilidade (WCAG AA)

- **Contraste:** textos rosa usam `--accent-deep` (#8c4555 ≈ 6:1 no creme). Botão WhatsApp em verde escuro `#15803d` (texto branco ≈ 5:1).
- **`prefers-reduced-motion`:** bloco no fim do `index.css` desliga/encurta animações e garante conteúdo visível.
- **Foco de teclado:** `:focus-visible` com outline rosa em links, botões, cards.
- **Alvos de toque:** mínimo 44×44px no mobile (setas dos cards, navegação dos depoimentos, lightbox).

### Adicionando imagens a cards de serviço

1. Converta a imagem para `.webp` (ferramenta online ou similar)
2. Copie para `public/assets/images/gallery/`
3. Rode `npm run optimize:images` — o script `scripts/optimize-images.mjs` redimensiona as `.webp` da galeria para máx. 800px e otimiza
4. Em `Services.tsx`, localize o serviço e adicione ao array `images`:
   ```tsx
   { src: img('gallery/nome.webp'), alt: 'Descrição' }
   ```

## Informações de contato (hard-coded)

- WhatsApp: `5511947195729`
- Endereço: R. Cachoeira do Campo, 278 — Sala 3, Jardim Imperador, São Paulo, SP
- Horário: Ter–Sex 09h–18h · Sáb 09h–17h
- Instagram: `_thaisacarolina`
- Google Reviews: `https://g.page/r/CcQSU1AR5IWJEAE/review`
