# Como usar o Claude Code no projeto

## Para fazer alterações no site

### Opção 1 — Você mesmo edita

1. Abra o PowerShell e rode:
   ```
   cd E:\ClaudeCode\SalaoThaisaLandingPage
   npm run dev
   ```
2. Acesse `http://localhost:5173` no browser para ver o site local
3. Edite os arquivos — as alterações aparecem em tempo real
4. Quando terminar, publique:
   ```
   git add -A
   git commit -m "descrição do que foi alterado"
   git push origin v2
   ```
5. Aguarde ~3 minutos e o site em `thacarolina.com.br` estará atualizado

---

### Opção 2 — Claude faz por você

1. Abra o **Claude Code** na pasta `E:\ClaudeCode\SalaoThaisaLandingPage`
2. Descreva o que quer mudar em português simples:
   - *"Quero mudar o texto do Hero"*
   - *"Adiciona essa foto no card de progressiva"*
   - *"Muda o horário de sábado para 09h–16h"*
3. O Claude já conhece o projeto completo e faz as alterações e o deploy automaticamente

---

## O que o Claude já sabe sobre o projeto

- Nome: **Tha Carolina Hair Studio**
- URL: `thacarolina.com.br`
- Pasta local: `E:\ClaudeCode\SalaoThaisaLandingPage`
- Onde ficam as fotos, textos, cores e componentes
- Como fazer o deploy
- Todas as integrações ativas (Analytics, Pixel, Schema.org)

Não precisa explicar nada — é só pedir.

---

## Lembretes rápidos

| O que mudar | Onde fica |
|---|---|
| Textos dos serviços | `src/components/sections/Services.tsx` |
| Fotos dos serviços | `public/assets/images/gallery/` (formato `.webp`) |
| Texto da tela inicial | `src/components/sections/Hero.tsx` |
| Endereço e horários | `src/components/sections/Location.tsx` |
| Depoimentos | `src/components/sections/Testimonials.tsx` |
| Cores e fontes | `src/index.css` bloco `:root` |
