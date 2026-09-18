# DESIGN_SYSTEM_SPEC.md — Especificação de Design Tokens e Primitivas

> **Status:** Especificação Oficial de Engenharia Visual (Etapa 4)  
> **Conformidade:** Alinhado rigorosamente com `DESIGN.md`, `DECISIONS.md`, `HOME_COPY_V2.md` e os princípios da skill `impeccable`.  
> **Objetivo:** Estabelecer tokens semânticos, escalas proporcionais e diretrizes de primitivas para que a implementação no Tailwind CSS v4 e Next.js seja totalmente mecânica e determinística.

---

## 1. Sistema Tipográfico: "Híbrido Editorial de Prestígio"

O sistema tipográfico expressa a essência do Dendrix: **autoridade institucional forense** nos títulos conceituais combinada à **precisão técnica de software de alta performance** no corpo, dados e interface.

### 1.1. Famílias Tipográficas

| Papel | Família Primária | Fallback Stack | Racional e Adequação |
| :--- | :--- | :--- | :--- |
| **Display & Headings** | `Newsreader` (Google Fonts / Variable) | `Charter`, `Georgia`, `Cambria`, `Times New Roman`, `serif` | Serifa contemporânea de proporções generosas, inspirada na tipografia editorial jurídica e de imprensa de referência (The Economist, publicações dos Tribunais Superiores). Excelente legibilidade em títulos médios e longos no português brasileiro com diacríticos e acentuações. |
| **Body & Interface** | `Plus Jakarta Sans` ou `Inter` (Variable) | `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `Helvetica Neue`, `sans-serif` | Geométrica humanista com abertura ampla de caracteres, x-height equilibrado e alta densidade legível. Perfeita para cards de processos, termos forenses densos e editores de texto sem fadiga visual. |
| **Data & Forensic Monospace** | `JetBrains Mono` ou `Geist Mono` | `ui-monospace`, `SFMono-Regular`, `Menlo`, `Monaco`, `Consolas`, `monospace` | Monospaçada neutra e calibrada. Utilizada para numeração CNJ de processos, marcações de folhas (`[Fls. 47]`), contagens regressivas de prazos e tags de auditoria documental. |

---

### 1.2. Escala Tipográfica Proporcional (Type Scale)

A escala utiliza razão de escala harmônica adaptada para telas de alta e média densidade:

```css
/* Tokens de Tamanho, Altura de Linha e Tracking */
--text-display-xl: 3.5rem;    /* 56px */ line-height: 1.10; letter-spacing: -0.025em; font-weight: 500; /* Hero H1 Desktop */
--text-display-lg: 2.75rem;   /* 44px */ line-height: 1.15; letter-spacing: -0.020em; font-weight: 500; /* H2 Seções Principais */
--text-display-md: 2.25rem;   /* 36px */ line-height: 1.20; letter-spacing: -0.015em; font-weight: 500; /* H2 Secundários / Destaques */
--text-h3:         1.75rem;   /* 28px */ line-height: 1.25; letter-spacing: -0.010em; font-weight: 600; /* Títulos de Módulos */
--text-h4:         1.25rem;   /* 20px */ line-height: 1.35; letter-spacing: -0.005em; font-weight: 600; /* Cards / Pilares */
--text-body-lg:    1.125rem;  /* 18px */ line-height: 1.55; letter-spacing: 0.000em;  font-weight: 400; /* Subheadlines / Intros */
--text-body:       1.000rem;  /* 16px */ line-height: 1.60; letter-spacing: 0.000em;  font-weight: 400; /* Parágrafos Corridos */
--text-small:      0.875rem;  /* 14px */ line-height: 1.50; letter-spacing: 0.005em;  font-weight: 400; /* Microcopy / Apoio */
--text-caption:    0.750rem;  /* 12px */ line-height: 1.40; letter-spacing: 0.010em;  font-weight: 500; /* Badges / Metadados */
--text-eyebrow:    0.8125rem; /* 13px */ line-height: 1.20; letter-spacing: 0.080em;  font-weight: 600; text-transform: uppercase; /* Eyebrows */
--text-mono-data:  0.8125rem; /* 13px */ line-height: 1.40; letter-spacing: -0.010em; font-weight: 500; /* Dados de Processo / Fls */
```

### 1.3. Regras de Acentuação e Tipografia em Língua Portuguesa
- **Prevenção de Orfãos:** Títulos H1 e H2 nunca quebram palavras monossilábicas para a última linha isolada (uso de `text-wrap: balance`).
- **Pontuação:** Aspas tipográficas curvas (`“”`), travessões en-dash (`–`) para intervalos e traço em-dash (`—`) apenas para pausas de pensamento, nunca dois hífens seguidos (`--`).
- **Acentos e Kerning:** Fontes carregadas com subconjunto latino completo (`latin-ext`) para renderização impecável de `ç`, `ã`, `õ`, `é`, `í`, `ú`.

---

## 2. Paleta de Cores e Tokens Semânticos

A paleta prioriza o **tema claro dominante** (*Light Theme* executivo). É proibido o uso de preto absoluto (`#000000`) ou fundo branco cru não calibrado em áreas de texto denso.

```css
/* ==========================================================================
   TOKENS SEMÂNTICOS DE COR (LIGHT THEME OFICIAL)
   ========================================================================== */

/* Superfícies e Fundos */
--bg-page:                #FBFBFA;  /* Marfim suave / papel nobre. Fundo primário da página */
--bg-surface-elevated:    #FFFFFF;  /* Branco puro calibrado para cards de processo e modais */
--bg-surface-subtle:      #F4F4F2;  /* Fundo de seções de suporte e contrastes leves */
--bg-surface-dark:        #0B0F17;  /* Carvão institucional para fechamento e contrastes pontuais */

/* Texto e Tipografia */
--text-primary:           #0F172A;  /* Carvão profundo (Slate 900). Contraste > 12:1 com o fundo */
--text-secondary:         #334155;  /* Grafite neutro (Slate 700) para corpo de texto explicativo */
--text-muted:             #64748B;  /* Cinza neutro (Slate 500) para legendas, metadados e microcopy */
--text-on-dark:           #F8FAFC;  /* Branco marfim para texto sobre fundos escuros */

/* Acento Institucional e Ação */
--brand-primary:          #0F2B48;  /* Azul Marinho Institucional Profundo (Autoridade Forense) */
--brand-primary-hover:    #0A1C30;  /* Azul Marinho fechado para estado hover */
--brand-primary-subtle:   #EDF2F7;  /* Azul suave desbotado para fundo de badges neutros */

/* Estados Funcionais (Alertas Forenses e Grounding) */
--status-attention:       #B45309;  /* Âmbar Forense para prazos e contagens regressivas */
--status-attention-bg:    #FEF3C7;  /* Âmbar suave para fundo de tags de prazo */
--status-success:         #047857;  /* Verde Esmeralda Sóbrio para prova conferida e status OK */
--status-success-bg:      #D1FAE5;  /* Verde suave para fundo de citações validadas */
--status-danger:          #B91C1C;  /* Vermelho sóbrio para prazo fatal ou incongruência grave */
--status-danger-bg:       #FEE2E2;  /* Vermelho suave para alertas de erro */

/* Linhas, Bordas e Divisórias */
--border-hairline:        #E2E8F0;  /* Borda neutra 1px sutil para delimitação de cards */
--border-strong:          #CBD5E1;  /* Borda de campos de input e caixas ativas */
--border-brand:           #93C5FD;  /* Borda indicativa de seleção no produto */

/* Foco e Acessibilidade */
--focus-ring:             #0F2B48;  /* Anel de foco com espessura de 2px e offset de 2px */
```

---

## 3. Escala de Espaçamento e Ritmo Vertical

Baseado no grid de 8pt (com subunidade de 4pt para ajustes micro).

```css
--space-1:   0.25rem;  /* 4px  - Micro padding interno de tags */
--space-2:   0.50rem;  /* 8px  - Espaçamento entre ícone e texto */
--space-3:   0.75rem;  /* 12px - Padding de botões pequenos e badges */
--space-4:   1.00rem;  /* 16px - Espaço padrão entre parágrafos curtos */
--space-5:   1.25rem;  /* 20px - Padding interno de cards compactos */
--space-6:   1.50rem;  /* 24px - Padding padrão de cards e modais */
--space-8:   2.00rem;  /* 32px - Margem entre blocos de conteúdo */
--space-10:  2.50rem;  /* 40px - Separação de subtópicos */
--space-12:  3.00rem;  /* 48px - Margem superior de CTAs */
--space-16:  4.00rem;  /* 64px - Espaço entre seções secundárias */
--space-20:  5.00rem;  /* 80px - Padding vertical padrão de seções desktop */
--space-24:  6.00rem;  /* 96px - Padding vertical de seções de alta respiração */
--space-32:  8.00rem;  /* 128px - Respiro do Hero e fechamento final */
```

---

## 4. Grid de Layout e Contêineres

```css
/* Larguras Máximas */
--container-max-width:    1280px; /* Largura máxima do conteúdo em desktops */
--container-narrow-width:  768px; /* Largura máxima de textos editoriais e FAQ */
--container-hero-width:   1360px; /* Largura estendida para o split-screen do Hero */

/* Margens Laterais (Gutters) */
--gutter-mobile:          1.25rem; /* 20px nas bordas de smartphones */
--gutter-tablet:          2.00rem; /* 32px em telas médias */
--gutter-desktop:         3.00rem; /* 48px em telas grandes */
```

---

## 5. Raios de Borda (Radius) e Elevações

Fica terminantemente proibido o uso de raios exagerados estilo "balão" (`32px` ou `full` em cards retangulares).

```css
--radius-sm:  4px;   /* Tags forenses, badges de folha [Fls. 47], checkboxes */
--radius-md:  8px;   /* Botões, inputs, cards internos e menus dropdown */
--radius-lg:  12px;  /* Contêiner do Hero, modais e superfícies principais */
--radius-full: 9999px; /* Apenas botões circulares de ícone isolado e pílulas de eyebrow */

/* Sombras (Elevação Óptica Suave sem Blur Excessivo) */
--shadow-subtle:   0 1px 2px 0 rgba(15, 23, 42, 0.05);
--shadow-card:     0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 2px 4px -2px rgba(15, 23, 42, 0.03);
--shadow-elevated: 0 10px 15px -3px rgba(15, 23, 42, 0.06), 0 4px 6px -4px rgba(15, 23, 42, 0.04);
--shadow-modal:    0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04);
```

---

## 6. Primitivas de Componentes Interativos

### 6.1. Botões (Button System)
1. **Primary Button:**
   - Background: `--brand-primary` (`#0F2B48`), Texto: `--text-on-dark` (`#FFFFFF`).
   - Hover: `--brand-primary-hover` (`#0A1C30`), transição suave `150ms`.
   - Altura: `48px` (desktop) / `48px` (mobile touch target).
   - Padding horizontal: `24px`.
   - Tipografia: Sans-serif `15px`, peso `600`, tracking neutro.
2. **Secondary Button (Outline / Surface):**
   - Background: `transparent`, Borda: `1px solid var(--border-strong)`.
   - Texto: `--text-primary` (`#0F172A`).
   - Hover: Background `--bg-surface-subtle`, Borda `--border-strong`.
3. **Ghost / Text Button:**
   - Background: `transparent`, Borda: `none`.
   - Texto: `--brand-primary`, sublinhado suave no hover.

### 6.2. Badges Forenses (Source & Status Tags)
- **Tag de Página dos Autos:**
  - Formato: `[Fls. 47 - Contestação]`
  - Estilo: Tipografia Mono `12px`, padding `2px 8px`, raio `4px`.
  - Cores: Fundo `#FEF3C7` (âmbar suave) com texto `#92400E` e borda `#FDE68A`.
- **Badge de Status de Prazo:**
  - Formato: `Prazo fatal em 48h`
  - Cores: Fundo `#FEE2E2` com texto `#991B1B` e ponto pulsar sutil.

### 6.3. Inputs e Controles de Formulário
- Altura: `44px`, raio `8px`, borda `1px solid var(--border-hairline)`.
- Foco: Borda `--brand-primary` com anel de foco externo de 2px translúcido.
- Placeholder: `--text-muted`, claro e inequívoco.
