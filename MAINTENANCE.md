# Guia de Manutenção — Tha Carolina Hair Studio

## Deploy automático

**Fluxo:** edite os arquivos → `git add` → `git commit` → `git push origin v2`

O GitHub Actions detecta o push no branch `v2`, faz o build (`npm run build`) e publica no GitHub Pages automaticamente em ~2-3 minutos.

**URL do site:** https://thacarolina.com.br

---

## Estrutura de arquivos

```
src/
  components/
    layout/
      Navbar.tsx          — menu hambúrguer mobile
      ServiceStrip.tsx    — faixa de navegação por serviço
      Footer.tsx          — rodapé
    sections/
      Hero.tsx            — tela inicial
      Services.tsx        — cards de serviços (imagens + lightbox)
      Professional.tsx    — seção da Thaisa Carolina
      Testimonials.tsx    — carrossel de depoimentos
      CTABand.tsx         — faixa de agendamento
      About.tsx           — sobre o salão
      Products.tsx        — logos de marcas parceiras
      Instagram.tsx       — link do Instagram
      Location.tsx        — endereço, horários, mapa
  index.css               — todos os estilos (design system)
public/
  assets/images/
    gallery/              — fotos dos serviços (.webp)
    logos/                — logos de marcas (.png)
  favicon.svg             — ícone do browser
  sitemap.xml             — sitemap para o Google
  CNAME                   — domínio customizado
index.html                — Analytics GA4, Meta Pixel e Schema.org ficam aqui
```

---

## Tarefas comuns

### Adicionar foto a um card de serviço

1. Converta a imagem para `.webp` (ferramenta online: squoosh.app)
2. Coloque o arquivo em `public/assets/images/gallery/`
3. Abra `src/components/sections/Services.tsx`
4. Localize o serviço pelo `id` (ex: `svc-progressiva`)
5. Adicione um objeto no array `images`:

```tsx
{ src: img('gallery/nome-da-foto.webp'), alt: 'Descrição da foto' }
```

Cards com mais de 1 imagem ganham slider automático (setas + dots).

---

### Alterar texto de um serviço

Em `src/components/sections/Services.tsx`, localize o serviço e edite `name` ou `description`.

---

### Alterar textos da seção Hero

Edite `src/components/sections/Hero.tsx` — o `<h1>` e o `<p className="hero-sub">`.

---

### Alterar endereço / horários / telefone

Edite `src/components/sections/Location.tsx`. Os dados estão no JSX diretamente.

---

### Alterar informações de contato no menu mobile

Edite `src/components/layout/Navbar.tsx` — link do WhatsApp na âncora `mn-cta`.

---

### Adicionar depoimento

Edite `src/components/sections/Testimonials.tsx`. Localize o array de depoimentos e adicione um objeto com os campos `name`, `text`, `rating`, `service`.

---

### Alterar cor ou fonte do design system

Edite as variáveis CSS em `src/index.css`, bloco `:root`:

| Variável | Valor atual | Uso |
|---|---|---|
| `--ink` | `#0b0906` | Fundo principal |
| `--gold` | `#c4a35a` | Dourado (destaques) |
| `--gold2` | `#e2cea0` | Dourado claro |
| `--cream` | `#f7f1e8` | Texto principal |
| `--serif` | Cormorant Garamond | Títulos |
| `--sans` | Montserrat | Corpo |

---

### Alterar o favicon

Edite ou substitua `public/favicon.svg`. O arquivo é um SVG com a letra "T" em dourado sobre fundo escuro.

---

## Integrações ativas

| Integração | Onde gerenciar |
|---|---|
| Google Analytics GA4 (`G-7TCXQC8QRW`) | analytics.google.com |
| Meta Pixel (`1771468644208602`) | business.facebook.com → Gerenciador de Eventos |
| Google Search Console | search.google.com/search-console |
| Schema.org HairSalon | Validar em search.google.com/test/rich-results |

Para atualizar IDs ou remover uma integração, edite o bloco correspondente em `index.html`.

---

## Deploy manual (se GitHub Actions falhar)

```bash
cd E:\ClaudeCode\SalaoThaisaLandingPage
npm run build
npm run deploy
```

---

## Informações de contato (hard-coded)

Para atualizar qualquer um desses dados, faça busca global por texto nos arquivos `src/`:

| Campo | Valor atual |
|---|---|
| WhatsApp | `5511947195729` |
| Endereço | R. Cachoeira do Campo, 278, Sala 3, Jardim Imperador, São Paulo, SP |
| Horário | Ter–Sex 09h–18h · Sáb 09h–17h |
| Instagram | `_thaisacarolina` |
| Google Reviews | `https://g.page/r/CcQSU1AR5IWJEAE/review` |
