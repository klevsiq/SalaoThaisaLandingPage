# Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminar os principais gargalos de performance apontados pelo PageSpeed Insights sem alterar o design visual em nenhum dos três viewports (desktop, tablet, mobile).

**Architecture:** Três mudanças independentes e seguras: (1) tornar o Google Fonts assíncrono em `index.html` para desbloquear a renderização inicial; (2) remover a animação `reveal` do header da seção Services para reduzir o LCP em ~3.2s; (3) redimensionar as imagens da galeria com um script Node.js usando `sharp` para reduzir ~3.9MB de transferência.

**Tech Stack:** React 18 + TypeScript + Vite, Node.js ESM (script), sharp (devDependency)

---

## Mapa de arquivos

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `index.html` | Modificar | Preconnect gstatic + fontes assíncronas |
| `src/components/sections/Services.tsx` | Modificar | Remover `reveal` do `svc-header` |
| `scripts/optimize-images.mjs` | Criar | Script de redimensionamento em lote |
| `package.json` | Modificar | Adicionar `sharp` como devDependency |
| `public/assets/images/gallery/*.webp` | Sobrescrever | Imagens redimensionadas para max 800px |

---

## Task 1: Fontes assíncronas + preconnect fonts.gstatic.com

**Files:**
- Modify: `index.html` (linhas 101–105)

- [ ] **Step 1: Localizar o bloco de fontes atual em `index.html`**

Linhas 101–105 atuais:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Montserrat:wght@300;400;500;600&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 2: Substituir pelo bloco assíncrono**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="preload"
  as="style"
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Montserrat:wght@300;400;500;600&display=swap"
  onload="this.rel='stylesheet'"
/>
<noscript>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Montserrat:wght@300;400;500;600&display=swap"
  />
</noscript>
```

O que cada linha faz:
- `preconnect` para `fonts.gstatic.com` com `crossorigin` — abre handshake TCP/TLS para o servidor que serve os arquivos `.woff2` antes da requisição chegar
- `rel="preload" as="style"` + `onload="this.rel='stylesheet'"` — carrega o CSS das fontes em paralelo sem bloquear o render; quando termina, `onload` troca o rel para `stylesheet` e ativa as fontes
- `<noscript>` — fallback para navegadores sem JS (garante que as fontes carregam de qualquer forma)

- [ ] **Step 3: Verificar o build**

```bash
npm run build
```
Esperado: build finaliza sem erros ou warnings sobre o atributo `onload`.

- [ ] **Step 4: Verificar visualmente no dev server**

```bash
npm run dev
```
Abrir http://localhost:5173. Os textos devem aparecer normalmente — podem exibir brevemente Georgia/sans-serif (fallbacks definidos no CSS) antes de trocar para Cormorant Garamond/Montserrat. Verificar que não há erros no console do browser.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "perf: carregar Google Fonts de forma assíncrona, adicionar preconnect gstatic"
```

---

## Task 2: Remover `reveal` do header da seção Services

**Files:**
- Modify: `src/components/sections/Services.tsx` (linhas 275–291)

Contexto: a classe `reveal` inicia com `opacity: 0; transform: translateY(32px)` e só remove esses estilos quando o `IntersectionObserver` dispara. O Lighthouse detecta o `<h2 class="sh">` dentro do `svc-header` como candidato ao LCP mas ele permanece invisível por ~3.2s. A solução é deixar o header visível desde o paint inicial. Os 6 `ServiceCard`s mantêm `reveal` normalmente.

O `useInView` **não** deve ser removido do import — ele continua sendo usado pelos `ServiceCard`s (linha 171: `const { ref: cardRef, inView } = useInView<HTMLDivElement>()`).

- [ ] **Step 1: Localizar o componente `Services` em `Services.tsx`**

Trecho atual (linhas 275–291):
```tsx
export default function Services() {
  const { ref: headerRef, inView: headerIn } = useInView<HTMLDivElement>()
  const [lightbox, setLightbox] = useState<{ images: ServiceImage[]; idx: number } | null>(null)

  return (
    <section className="services" id="servicos">
      <div className="services-inner">
        <div
          className={`svc-header reveal${headerIn ? ' on' : ''}`}
          ref={headerRef}
        >
```

- [ ] **Step 2: Aplicar a mudança**

Substituir o trecho acima por:
```tsx
export default function Services() {
  const [lightbox, setLightbox] = useState<{ images: ServiceImage[]; idx: number } | null>(null)

  return (
    <section className="services" id="servicos">
      <div className="services-inner">
        <div className="svc-header">
```

As três mudanças:
1. Remover `const { ref: headerRef, inView: headerIn } = useInView<HTMLDivElement>()`
2. Trocar `className={\`svc-header reveal${headerIn ? ' on' : ''}\`}` por `className="svc-header"`
3. Remover `ref={headerRef}` do div

- [ ] **Step 3: Verificar TypeScript sem erros**

```bash
npx tsc --noEmit
```
Esperado: zero erros. O import `useInView` no topo permanece (ainda usado em `ServiceCard`).

- [ ] **Step 4: Verificar visualmente — desktop**

```bash
npm run dev
```
Abrir http://localhost:5173 → rolar até a seção "Serviços":
- O título "Transformações que duram" deve aparecer **imediatamente** ao carregar, sem fade-in de entrada
- Os 6 cards devem continuar com animação de reveal ao entrar no viewport
- Layout grid 2 colunas inalterado no desktop

- [ ] **Step 5: Verificar visualmente — tablet**

No DevTools do browser, ativar emulação iPad Air (820×1180px):
- Recarregar página
- Título "Transformações que duram" visível imediatamente
- Grid de 2 colunas (breakpoint `max-width: 1100px`) com cards normais
- Header em single-column (`grid-template-columns: 1fr`)

- [ ] **Step 6: Verificar visualmente — mobile**

No DevTools, ativar emulação iPhone SE (375×667px):
- Recarregar página
- Título centralizado (CSS `text-align: center` no breakpoint `max-width: 700px`)
- Cards em coluna única
- Título visível sem animação de entrada

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/Services.tsx
git commit -m "perf: remover animacao reveal do svc-header para reduzir LCP"
```

---

## Task 3: Script de otimização de imagens em lote

**Files:**
- Create: `scripts/optimize-images.mjs`
- Modify: `package.json` (devDependencies)
- Outputs: `public/assets/images/gallery/*.webp` (todos sobrescritos)

Contexto: as imagens são usadas com `object-fit: cover` + `object-position: center center` nos cards (aspect-ratio 3/4). O script apenas **redimensiona** (reduz largura para máx 800px mantendo o aspect ratio original) e **recomprime** com quality 82. Não faz crop. O comportamento visual nos cards é idêntico — apenas o arquivo fica menor.

- [ ] **Step 1: Instalar `sharp`**

```bash
npm install sharp --save-dev
```
Esperado: `sharp` aparece em `devDependencies` no `package.json`. Em Windows, o npm baixa binários pré-compilados automaticamente — o processo pode levar ~30s.

- [ ] **Step 2: Criar `scripts/optimize-images.mjs`**

```js
import sharp from 'sharp'
import { readdir, stat, rename } from 'fs/promises'
import { join } from 'path'

const GALLERY_DIR = 'public/assets/images/gallery'
const MAX_WIDTH = 800
const QUALITY = 82

const files = await readdir(GALLERY_DIR)
const webpFiles = files.filter(f => f.endsWith('.webp'))

console.log(`Otimizando ${webpFiles.length} imagens em ${GALLERY_DIR}...\n`)

let totalBefore = 0
let totalAfter = 0

for (const file of webpFiles) {
  const filePath = join(GALLERY_DIR, file)
  const tmpPath = filePath + '.tmp'

  const before = (await stat(filePath)).size
  const meta = await sharp(filePath).metadata()
  const needsResize = (meta.width ?? 0) > MAX_WIDTH

  await sharp(filePath)
    .resize(needsResize ? { width: MAX_WIDTH, withoutEnlargement: true } : undefined)
    .webp({ quality: QUALITY })
    .toFile(tmpPath)

  await rename(tmpPath, filePath)

  const after = (await stat(filePath)).size
  totalBefore += before
  totalAfter += after

  const saving = (((before - after) / before) * 100).toFixed(1)
  const arrow = needsResize ? `${meta.width}px→800px` : 'sem resize'
  console.log(`${file}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (-${saving}%) [${arrow}]`)
}

const totalSaving = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)
console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB (-${totalSaving}%)`)
console.log('Concluído.')
```

Notas técnicas:
- `.toFile(tmpPath)` → `rename(tmpPath, filePath)`: `sharp` não pode ler e escrever no mesmo arquivo simultaneamente; o rename é atômico e garante que o arquivo original não fica corrompido se algo der errado
- `withoutEnlargement: true`: imagens já menores que 800px não são ampliadas, só recomprimidas

- [ ] **Step 3: Rodar o script**

```bash
node scripts/optimize-images.mjs
```

Saída esperada (valores aproximados):
```
Otimizando 28 imagens em public/assets/images/gallery...

Escova_Tratamentos_2.webp: 348KB → 70KB (-79.9%) [960px→800px]
foto_pofission_salao.webp: ...KB → ...KB (-xx.x%) [...]
image_12.webp: 313KB → 63KB (-79.9%) [960px→800px]
image_13.webp: 313KB → 63KB (-79.8%) [960px→800px]
progressiva_2.webp: 409KB → 82KB (-79.9%) [960px→800px]
progressiva_3.webp: 405KB → 81KB (-80.0%) [960px→800px]
...

Total: 4.4MB → 1.0MB (-77.0%)
Concluído.
```

- [ ] **Step 4: Verificar visualmente — cards de serviços**

```bash
npm run dev
```
Abrir http://localhost:5173 → seção "Serviços":
- Todos os 6 cards devem exibir imagens normalmente, sem corte no topo ou rodapé
- Navegar entre imagens com as setas nos cards com múltiplas fotos (Loiros, Liso Perfeito, Escova)
- Clicar em cada card para abrir o lightbox — verificar qualidade visual aceitável

- [ ] **Step 5: Verificar em mobile e tablet**

No DevTools, testar em iPhone SE (375px) e iPad Air (820px):
- Cards exibem imagens sem distorção
- Lightbox funciona normalmente

- [ ] **Step 6: Verificar o build de produção**

```bash
npm run build
```
Esperado: build finaliza sem erros.

- [ ] **Step 7: Commit**

```bash
git add scripts/optimize-images.mjs package.json public/assets/images/gallery/
git commit -m "perf: redimensionar imagens da galeria para max 800px com sharp"
```

---

## Task 4: Deploy e validação

- [ ] **Step 1: Push para deploy**

```bash
git push origin v2
```
Aguardar o GitHub Actions publicar (verificar aba "Actions" no repositório GitHub). O build leva ~2–3 minutos.

- [ ] **Step 2: Validar no PageSpeed Insights**

Acessar https://pagespeed.web.dev/ e rodar análise em `https://thacarolina.com.br` (aguardar 5 min após o deploy para o CDN propagar).

Melhorias esperadas:
- "Solicitações bloqueando renderização" → Google Fonts não deve mais aparecer na lista
- "LCP - Atraso na renderização do elemento" → deve reduzir de 3.200ms
- "Melhorar a entrega de imagens" → economia estimada deve cair de ~3.9MB para próximo de zero
- Score de Performance deve subir

---

## Notas finais

- O script `scripts/optimize-images.mjs` deve ser rodado **uma vez** localmente antes do commit. Não precisa rodar no CI.
- As imagens comprimidas vão para o git — o repositório vai ter ~3MB a menos a partir deste commit.
- Se alguma imagem ficar com qualidade visual insatisfatória no lightbox, ajustar `QUALITY` de 82 para 85 no script e rodar novamente antes de commitar.
