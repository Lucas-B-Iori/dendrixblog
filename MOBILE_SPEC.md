# MOBILE_SPEC.md — Especificação de Arquitetura Responsiva e Mobile-First

> **Status:** Especificação Oficial Mobile (Etapa 4)  
> **Conformidade:** Alinhado com `DESIGN_SYSTEM_SPEC.md` e a skill `impeccable`.  
> **Regra Fundamental:** O mobile **não é um desktop esmagado**. O advogado frequentemente acessa o site pelo smartphone no intervalo de uma audiência ou entre reuniões com clientes. A experiência deve ser ágil, legível e com toques ergonômicos de alta precisão.

---

## 1. O Hero Mobile Dedicado (Solução do Split-Screen em Smartphone)

Em telas estreitas (360px a 428px), um split-screen lado a lado é inviável e torna os textos ilegíveis. O Hero mobile adota um **empilhamento vertical em cascata**:

```
┌──────────────────────────────────────────────────┐
│ [BARRA SUPERIOR]: Logo Dendrix | [Entrar] [Menu] │
├──────────────────────────────────────────────────┤
│                                                  │
│  EYEBROW: CRM JURÍDICO COM INTELIGÊNCIA...       │
│                                                  │
│  H1 (32px Serifa):                               │
│  Dos autos à minuta, com a origem                │
│  das informações sempre visível.                 │
│                                                  │
│  SUBHEADLINE (16px Sans):                        │
│  O Dendrix conecta o contexto do processo à      │
│  leitura dos autos em PDF...                     │
│                                                  │
│  [ BOTÃO PRIMÁRIO: Agendar demonstração (15m) ]  │
│  Microcopy: 15 min • Traga um processo ou use... │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  CARD DE PRODUTO MOBILE (MOCKUP CONDENSADO):     │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │ AUTOS: Processo_1002341.pdf                │  │
│  │ [Grifo]: "...não entregou o laudo no..."   │  │
│  │ Tag: [Fls. 47 - Contestação]               │  │
│  └────────────────────────────────────────────┘  │
│                       ↓                          │
│               [Conexão CRM Dendrix]              │
│                       ↓                          │
│  ┌────────────────────────────────────────────┐  │
│  │ MINUTA GERADA NO EDITOR:                   │  │
│  │ "...conforme comprovado às [Fls. 47],      │  │
│  │ resta demonstrada a mora..."               │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 2. Adaptação Seção por Seção no Mobile

| Seção | O que muda no Mobile | O que é simplificado ou priorizado |
| :--- | :--- | :--- |
| **01. Hero** | Split-screen vira cascata vertical unificada. | Tipografia H1 reduz para `32px` com line-height `1.2`. Botão em largura total (`w-full`). |
| **02. Caos** | A pilha editorial de 3 blocos fica vertical linear. | Divisórias sutis entre os blocos; foco no contraste entre o problema e o estresse do advogado. |
| **03. Loop** | O trilho horizontal vira uma linha do tempo vertical conectada. | A numeração `01`, `02`, `03` atua como âncora lateral esquerda com linha contínua. |
| **04. Mesa Jurídica** | Copy acima e interface recortada em largura total abaixo. | O mockup foca exclusivamente no trecho do PDF e na tag de citação (elimina barras secundárias). |
| **05. Redator** | Copy acima e editor com a minuta abaixo. | O editor exibe apenas 2 parágrafos nítidos com o badge em verde esmeralda. |
| **06. Prazos** | Card de publicação oficial ocupa 100% da largura. | O botão de providência processual (*"Sugerido: Réplica"*) fica destacado em botão tátil. |
| **07. Caso Real** | Tabela comparativa vira dois blocos verticais: Entrada em cima, Saída embaixo. | Leitura sequencial clara sem necessidade de rolagem horizontal (*zero horizontal scroll*). |
| **08. Calculadora** | Sliders no topo e card de resultado destacado logo abaixo. | Áreas de toque dos controles de arrasto com altura mínima de `44px` para precisão do polegar. |
| **09. Segurança** | Grade 2x2 vira 4 cartões empilhados com ícones discretos. | Foco nos títulos rápidos: Servidores no Brasil, Zero treino de IA, Criptografia e Autonomia. |
| **10. FAQ** | Acordeão em largura total com expansão vertical nativa. | Área de toque de cada pergunta com altura mínima de `48px` para evitar toques acidentais. |
| **11. CTA Final** | Bloco escuro com botões verticais empilhados. | Botão de agendamento em destaque e botão de WhatsApp como ação rápida secundária. |

---

## 3. Ergonomia do Polegar e Barra Fixa Inferior (Sticky Bottom Bar)

- **Sticky Action Bar:** Em dispositivos móveis, após o usuário rolar além da primeira dobra do Hero, surge discretamente na base da tela uma **barra de ação fixa**:
  - Altura: `60px`, fundo translúcido com desfoque suave (`bg-white/95 backdrop-blur-md`).
  - Conteúdo: Botão compacto `Agendar Demonstração` à esquerda + ícone direto do WhatsApp à direita.
  - Comportamento inteligente: Recolhe suavemente ao rolar para baixo em alta velocidade e reaparece ao rolar para cima.
- **Zona Segura (Safe Area Insets):** Padding inferior automático `env(safe-area-inset-bottom)` respeitado em iPhones com barra de navegação virtual.
