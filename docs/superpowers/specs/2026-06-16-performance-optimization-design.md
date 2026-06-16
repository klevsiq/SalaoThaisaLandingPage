# Performance Optimization — Design Spec
**Data:** 2026-06-16  
**Branch:** v2  
**Origem:** Análise PageSpeed Insights — thacarolina.com.br

---

## Contexto

O PageSpeed Insights apontou os seguintes problemas prioritários:

| Problema | Impacto medido |
|---|---|
| Google Fonts bloqueando renderização | 750ms de atraso no LCP/FCP |
| Falta de preconnect para fonts.gstatic.com | ~100-200ms adicionais na cadeia de rede |
| `h2.sh` invisível 3.2s por animação `reveal` | 3.200ms de render delay no LCP |
| Imagens da galeria oversized | ~3.9MB de transferência desnecessária |
| Cache TTL 10min nas imagens | Fora de controle (GitHub Pages) |
| JS legado do Facebook Pixel | Fora de controle (terceiro) |

**Constraint:** Não quebrar nada, não mudar o design visual, manter compatibilidade com os 3 viewports (desktop, tablet 701–960px, mobile ≤600px).

---

## Escopo aprovado (Abordagem 2)

### 1. Fontes assíncronas + preconnect (`index.html`)

**Problema:** `<link rel="stylesheet" href="fonts.googleapis.com/...">` é síncrono no `<head>`, criando cadeia bloqueante:  
`HTML → googleapis.com CSS (750ms) → gstatic.com woff2 (444ms)`

**Solução:**
- Adicionar `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` imediatamente após o preconnect existente do googleapis
- Substituir o `<link rel="stylesheet">` pelo padrão de carregamento assíncrono:
  ```html
  <link rel="preload" as="style"
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Montserrat:wght@300;400;500;600&display=swap"
    onload="this.rel='stylesheet'">
  <noscript>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Montserrat:wght@300;400;500;600&display=swap">
  </noscript>
  ```
- O `&display=swap` instrui o browser a exibir a fonte fallback imediatamente (Georgia/sans-serif já definidas no CSS) e trocar quando a fonte carregar

**Arquivos:** `index.html`

---

### 2. LCP fix — remover `reveal` do `svc-header` (`Services.tsx`)

**Problema:** O `div.svc-header` (que contém `<h2 class="sh">Transformações que duram</h2>`) tem classe `reveal`, que inicia com `opacity: 0; transform: translateY(32px)`. O Lighthouse detecta o `h2` como candidato LCP mas ele permanece invisível por ~3.2s até o IntersectionObserver disparar.

**Solução:**
- Remover a classe `reveal` e o `ref={headerRef}` do `div.svc-header` em `Services.tsx`
- Remover as variáveis `headerRef` e `headerIn` (ficam unused)
- O `h2.sh` passa a ser visível no paint inicial em todos os viewports

**Impacto em viewports:**
- Desktop (>960px): título visível imediatamente, grid 2 colunas inalterado
- Tablet (701–960px): grid single-column pelo CSS responsivo, inalterado
- Mobile (≤600px): texto centralizado pelo CSS responsivo, inalterado
- Os 6 `ServiceCard` mantêm a animação `reveal` normalmente

**Arquivos:** `src/components/sections/Services.tsx`

---

### 3. Otimização de imagens em lote (`scripts/optimize-images.mjs`)

**Problema:** Imagens servidas com dimensões muito maiores que o exibido:
- `progressiva_2.webp`: 960×1280px → exibida em ~346×461px (~3× oversized)
- Estimativa PageSpeed: ~3.9MB de economia

**Solução:**
- Criar `scripts/optimize-images.mjs` usando `sharp` (devDependency)
- Adicionar `sharp` ao `package.json` como `devDependency`
- Regras de redimensionamento:
  - Largura máxima: **800px** (cobre telas 2x para cards de 346px)
  - Mantém aspect ratio original (sem crop)
  - Qualidade WebP: **82**
  - Imagens já menores que 800px: só recompressão
- Sobrescreve os arquivos em `public/assets/images/gallery/`
- Nomes de arquivo inalterados → nenhuma mudança nos `src` do código

**Como rodar (uma vez):**
```bash
npm install sharp --save-dev
node scripts/optimize-images.mjs
```

**Segurança visual:** `object-fit: cover` + `object-position: center center` nos cards funciona identicamente com imagens menores. Sem crop nos arquivos, só redução de dimensão. Compatível com os 3 viewports.

**Arquivos:** `scripts/optimize-images.mjs`, `package.json`

---

## O que fica fora do escopo

| Item | Motivo |
|---|---|
| Cache TTL das imagens | GitHub Pages não permite configurar headers de cache |
| JS legado do Facebook Pixel | Script de terceiro, sem controle |
| Reflow forçado no Navbar | Leitura de `offsetHeight` necessária para calcular `--nav-h`; impacto baixo |
| Self-hosting de fontes | Usuário escolheu carregamento assíncrono (Opção B) |

---

## Arquivos que serão modificados

| Arquivo | Mudança |
|---|---|
| `index.html` | Preconnect gstatic + fontes assíncronas |
| `src/components/sections/Services.tsx` | Remover `reveal` do `svc-header` |
| `scripts/optimize-images.mjs` | Novo — script de otimização |
| `package.json` | Adicionar `sharp` como devDependency |
| `public/assets/images/gallery/*.webp` | Redimensionamento das imagens |
