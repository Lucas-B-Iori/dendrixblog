# COMPONENT_MAP.md — Mapeamento Conceitual de Componentes

> **Status:** Especificação Oficial de Arquitetura de Componentes (Etapa 4)  
> **Conformidade:** Alinhado com o Next.js 16 App Router (React Server Components + Client Components seletivos).  
> **Regra de Ouro:** Não escrever código aqui. Apenas mapear responsabilidades, variantes e limites arquiteturais para evitar componentização desnecessária ou acoplamento excessivo.

---

## 1. Princípio de Separação Server vs. Client Components

Para manter o pacote de JavaScript mínimo e maximizar a pontuação de performance:
* **Server Components (Padrão por omissão):** Todas as seções estáticas de texto, cabeçalhos, grades de segurança e rodapé rodam 100% no servidor (HTML estático puro, zero JS enviado ao cliente).
* **Client Components (`'use client'` - Uso Seletivo e Delimitado):** Restritos estritamente aos componentes com estado interativo do usuário:
  1. O Storyboard animado do Hero (`HeroSplitScreen.tsx`).
  2. Os sliders da Calculadora de Tempo (`RoiCalculator.tsx`).
  3. O Acordeão expansível do FAQ (`FaqAccordion.tsx`).
  4. A Modal de Agendamento com Cal.com (`DemoModal.tsx`).
  5. O menu mobile e a barra de ação fixa inferior (`MobileNav.tsx`, `StickyMobileBar.tsx`).

---

## 2. Mapa Conceitual por Camada

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 CAMADA 1: LAYOUT & SHELL                               │
├──────────────────────┬────────────────────────────────────────┬────────────────────────┤
│ Componente           │ Responsabilidade                       │ Variantes / Comportamento│
├──────────────────────┼────────────────────────────────────────┼────────────────────────┤
│ `Navbar`             │ Navegação global, âncoras, link externo│ Fixo com vidro sutil no│
│                      │ "Entrar" para dendrix.app.br e CTA     │ scroll; menu mobile.   │
├──────────────────────┼────────────────────────────────────────┼────────────────────────┤
│ `Footer`             │ Links institucionais, segurança, LGPD, │ Fundo escuro carvão;   │
│                      │ redes e copyright forense.             │ versão desktop e mobile│
├──────────────────────┼────────────────────────────────────────┼────────────────────────┤
│ `SectionWrapper`     │ Contêiner estrutural com margens,      │ Largura padrão (1280px)│
│                      │ paddings verticais e âncoras de rota.  │ e estendida (1360px).  │
├──────────────────────┼────────────────────────────────────────┼────────────────────────┤
│ `StickyMobileBar`    │ Barra de ação fixa inferior no celular │ Surge pós-hero; recolhe│
│                      │ com agendamento e WhatsApp em 1 toque. │ em scroll rápido.      │
└──────────────────────┴────────────────────────────────────────┴────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CAMADA 2: HERO & DEMONSTRAÇÃO DE PRODUTO                        │
├──────────────────────┬────────────────────────────────────────┬────────────────────────┤
│ Componente           │ Responsabilidade                       │ Variantes / Comportamento│
├──────────────────────┼────────────────────────────────────────┼────────────────────────┤
│ `HeroSection`        │ Agrupa copy oficial travada e o        │ Layout lado a lado     │
│                      │ Split-Screen de produto.               │ (desktop) / cascata.   │
├──────────────────────┼────────────────────────────────────────┼────────────────────────┤
│ `SplitScreenMockup`  │ Renderiza o leitor de PDF (esq.), o    │ Animação dos 6 estados;│
│                      │ conector CRM (centro) e o editor (dir.)│ modo estático reduzido.│
├──────────────────────┼────────────────────────────────────────┼────────────────────────┤
│ `ProductWindow`      │ Moldura minimalista de software com    │ Variantes: 'pdf-reader'│
│                      │ barra de título e bordas ultrafinas.   │ e 'editor-rich'.       │
├──────────────────────┼────────────────────────────────────────┼────────────────────────┤
│ `SourceBadge`        │ Etiqueta indicativa de página de autos │ Estados: normal e      │
│                      │ com lastro documental ([Fls. 47]).     │ destacado (pulsar).    │
└──────────────────────┴────────────────────────────────────────┴────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CAMADA 3: NARRATIVA & PILARES FORENSES                          │
├──────────────────────┬────────────────────────────────────────┬────────────────────────┤
│ Componente           │ Responsabilidade                       │ Variantes / Comportamento│
├──────────────────────┼────────────────────────────────────────┼────────────────────────┤
│ `SectionHeader`      │ Renderiza o Eyebrow em caixa alta,     │ Alinhamento à esquerda │
│                      │ H2 em Newsreader e subheadline.        │ (padrão) ou centralizado│
├──────────────────────┼────────────────────────────────────────┼────────────────────────┤
│ `CaosBlock`          │ Apresenta as 3 dores em formato        │ Pilha editorial aberta │
│                      │ editorial com divisórias finas.        │ com tags de impacto.   │
├──────────────────────┼────────────────────────────────────────┼────────────────────────┤
│ `LoopTrack`          │ Trilha contínua do fluxo do caso       │ Trilha horizontal com  │
│                      │ conectando Gestão, Leitura e Redação.  │ marcos numerados 01-03.│
├──────────────────────┼────────────────────────────────────────┼────────────────────────┤
│ `FeatureSpotlight`   │ Apresentação dos pilares com alternância│ 'text-left' (Mesa) e   │
│                      │ de lado (copy à esq. ou dir.).         │ 'text-right' (Redator).│
└──────────────────────┴────────────────────────────────────────┴────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      CAMADA 4: WIDGETS INTERATIVOS & CONVERSÃO                         │
├──────────────────────┬────────────────────────────────────────┬────────────────────────┤
│ Componente           │ Responsabilidade                       │ Variantes / Comportamento│
├──────────────────────┼────────────────────────────────────────┼────────────────────────┤
│ `RoiCalculator`      │ Sliders de entrada, lógica de cálculo  │ Card elevado com       │
│                      │ e exibição reativa de horas salvas.    │ mostrador em destaque. │
├──────────────────────┼────────────────────────────────────────┼────────────────────────┤
│ `FaqAccordion`       │ Acordeão acessível de perguntas e      │ Expansão suave 250ms   │
│                      │ respostas com Schema.org JSON-LD.      │ com suporte a teclado. │
├──────────────────────┼────────────────────────────────────────┼────────────────────────┤
│ `DemoModal`          │ Modal de 2 passos: Mini-form de        │ Modal suspensa com foco│
│                      │ qualificação -> Cal.com embed.         │ preso e tecla Esc.     │
└──────────────────────┴────────────────────────────────────────┴────────────────────────┘
```
