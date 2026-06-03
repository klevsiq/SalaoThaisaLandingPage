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

## Arquitetura

```
index.html                    — entrada do Vite (referencia favicon e fontes)
src/
  App.tsx                     — raiz: monta seções, gerencia --nav-h / --strip-h / --header-h
  index.css                   — design system global (Tailwind base + CSS vars + estilos)
  main.tsx                    — entry point React
  lib/utils.ts                — função img() para URLs de imagens
  hooks/useInView.ts          — IntersectionObserver para animações reveal
  components/
    layout/  Navbar · ServiceStrip · Footer
    sections/ Hero · Services · Professional · Testimonials · CTABand
              About · Products · Instagram · Location
    WhatsAppFloat.tsx
public/
  assets/images/gallery/      — fotos dos serviços (.jpg / .jpeg)
  assets/images/logos/        — logos de marcas (Mirra, Wella, Truss)
  favicon.svg                 — ícone "T" dourado
```

### Seções (ordem em App.tsx)

| Componente | id | Descrição |
|---|---|---|
| Navbar | `#nav` | Menu hambúrguer mobile |
| ServiceStrip | — | Faixa de nav por serviço |
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

| Variável | Valor | Uso |
|---|---|---|
| `--ink` | `#0b0906` | Fundo principal |
| `--gold` | `#c4a35a` | Dourado (destaques, bordas) |
| `--gold2` | `#e2cea0` | Dourado claro |
| `--cream` | `#f7f1e8` | Texto principal |
| `--serif` | Cormorant Garamond | Títulos editoriais |
| `--sans` | Montserrat | Corpo de texto |

### Adicionando imagens a cards de serviço

1. Copie a imagem para `public/assets/images/gallery/`
2. Em `Services.tsx`, localize o serviço e adicione ao array `images`:
   ```tsx
   { src: img('gallery/nome.jpg'), alt: 'Descrição' }
   ```

## Informações de contato (hard-coded)

- WhatsApp: `5511947195729`
- Endereço: R. Cachoeira do Campo, 278 — Sala 3, Jardim Imperador, São Paulo, SP
- Horário: Ter–Sex 09h–18h · Sáb 09h–17h
- Instagram: `_thaisacarolina`
- Google Reviews: `https://g.page/r/CcQSU1AR5IWJEAE/review`
