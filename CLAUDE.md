# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Site estático puro: HTML + CSS + JS vanilla. Sem frameworks, sem bundler, sem dependências npm.

## Desenvolvimento local

Abra `index.html` com Live Server (VS Code) ou diretamente no navegador. Não há etapa de build.

## Deploy

Push para `main` → GitHub Pages publica automaticamente em `https://klevsiq.github.io/SalaoThaisaLandingPage`.

## Arquitetura

```
index.html              — toda a estrutura HTML (978 linhas)
assets/css/style.css    — todos os estilos (2.283 linhas)
assets/js/main.js       — todos os scripts (267 linhas)
assets/images/gallery/  — fotos dos serviços (image_01 … image_20.jpg)
assets/images/logos/    — logos de marcas parceiras (Mirra, Wella, Truss)
```

### Seções do HTML (por `id`)

| id | Seção |
|---|---|
| `#hero` | Hero com slider de 2 slides e SVG animado |
| `#sobre` | Sobre o salão com galeria de 2 fotos |
| `#servicos` | Cards de serviços (corte, mechas, progressiva, botox, coloração, escova) |
| `#profissional` | Seção da profissional Thaisa Carolina |
| `#produtos` | Marcas parceiras (logos) |
| `#depoimentos` | Carrossel de depoimentos (Google Reviews) |
| `#agendar` | Faixa CTA de agendamento |
| `#contato` | Localização e horários com status aberto/fechado |

### CSS — design tokens (`:root` em `style.css`)

| Variável | Valor | Uso |
|---|---|---|
| `--ink` | `#0b0906` | Fundo principal |
| `--gold` | `#c4a35a` | Dourado principal (destaques, bordas) |
| `--gold2` | `#e2ceA0` | Dourado claro |
| `--cream` | `#f7f1e8` | Texto principal |
| `--serif` | Cormorant Garamond | Títulos editoriais |
| `--sans` | Jost | Corpo de texto |

### JS — funções em `main.js`

- `updateStatus()` — calcula se o salão está aberto/fechado (fuso América/São_Paulo) e atualiza o pill `#status-pill`
- `setHeaderH()` — mede altura do nav + svc-strip e seta `--header-h` no CSS para o hero não ficar cortado
- Hero slider — controla `.slide` / `.dot` com autoplay de 5s
- Reveal on scroll — `IntersectionObserver` adiciona classe `.on` em elementos `.reveal`
- Sliders de serviços — cards com classe `.svc-img.dual` ganham botões prev/next e dots dinamicamente
- Carrossel de depoimentos — paginação responsiva (1/2/3 cards por página conforme viewport)

## Informações de contato (hard-coded no HTML)

- WhatsApp: `5511947195729`
- Endereço: R. Cachoeira do Campo, 278 — Sala 3, Jardim Imperador, São Paulo, SP
- Horário: Ter–Sex 09h–18h · Sáb 09h–17h
- Instagram: `_thaisacarolina`
- Google Reviews: `https://g.page/r/CcQSU1AR5IWJEAE/review`
