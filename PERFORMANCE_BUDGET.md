# PERFORMANCE_BUDGET.md — Orçamento de Performance e Metas de Core Web Vitals

> **Status:** Especificação Oficial de Performance (Etapa 4)  
> **Conformidade:** Alinhado com as diretrizes do Next.js 16 (App Router), Turbopack e Vercel Deployment.  
> **Objetivo:** Garantir pontuação 95+ no Google PageSpeed Insights (Mobile e Desktop) e carregamento quase instantâneo mesmo em redes móveis 4G do interior do país.

---

## 1. Metas Estritas de Core Web Vitals (Google CWV)

```
┌───────────────────────────────────────┬───────────────────────────┬──────────────────────────────────────────────┐
│ Métrica                               │ Meta do Dendrix           │ Limite Crítico do Google                     │
├───────────────────────────────────────┼───────────────────────────┼──────────────────────────────────────────────┤
│ LCP (Largest Contentful Paint)        │ < 1.8 segundos            │ 2.5 segundos (Bom)                           │
│ CLS (Cumulative Layout Shift)         │ < 0.02 (Praticamente zero)│ 0.10 (Bom)                                   │
│ INP (Interaction to Next Paint)       │ < 100 milissegundos       │ 200 milissegundos (Bom)                      │
│ TTFB (Time to First Byte)             │ < 200 milissegundos       │ 800 milissegundos (Bom)                      │
│ FCP (First Contentful Paint)          │ < 1.0 segundo             │ 1.8 segundos (Bom)                           │
└───────────────────────────────────────┴───────────────────────────┴──────────────────────────────────────────────┘
```

---

## 2. Orçamento Máximo de Carga de Rede (Network Payloads)

```css
/* Limites Máximos em Gzip / Brotli */
--budget-initial-html:        20 kB;  /* HTML inicial gerado pelo App Router */
--budget-total-javascript:   140 kB;  /* Total de JS carregado no carregamento da página */
--budget-initial-css:         20 kB;  /* CSS compilado via Tailwind v4 */
--budget-webfonts-total:      55 kB;  /* Newsreader + Plus Jakarta Sans em woff2 subset */
--budget-hero-visual:         25 kB;  /* Representação programática do Split-Screen */
--budget-total-images:       250 kB;  /* Todas as imagens da página somadas (WebP/AVIF) */
```

---

## 3. Decisões Arquiteturais para Alta Performance

1. **Split-Screen do Hero 100% Programático:**
   - Em vez de um vídeo pesado em `.mp4` (que pesaria entre 3 MB e 8 MB e travaria em conexões móveis), o Hero é renderizado diretamente em **código HTML e Tailwind CSS**. Custo de rede: **menos de 15 kB**. Impacto no LCP: **zero atraso**.
2. **Otimização de WebFonts com `next/font`:**
   - As fontes `Newsreader` e `Plus Jakarta Sans` são carregadas localmente via `@next/font/google`, com `display: swap`, subconjunto exclusivo para caracteres latinos (`subsets: ['latin']`) e pré-carregamento automático no cabeçalho do HTML, eliminando qualquer flash de texto invisível (FOIT).
3. **Imagens Otimizadas com `next/image`:**
   - Todas as capturas dos pilares utilizam formatos modernos `webp` e `avif`, com dimensões explícitas (`width` e `height`) para prevenir qualquer desvio de layout (CLS = 0) e carregamento preguiçoso (`loading="lazy"`) para tudo abaixo da primeira dobra.
4. **Carregamento Assíncrono de Scripts Externos:**
   - O widget do Cal.com e eventuais rastreadores analíticos são carregados exclusivamente com a estratégia `lazyOnload` do Next.js, impedindo que bloqueiem a thread principal durante a renderização do Hero.
