# HERO_SPEC.md — Especificação Técnica e Storyboard do Hero

> **Status:** Especificação Oficial do Hero (Etapa 4)  
> **Conformidade:** Copy travada de `HOME_COPY_V2.md`, alinhada a `DEC-013`, `DEC-017` e `DEC-020`.  
> **Objetivo:** Definir com precisão matemática o layout responsivo, a anatomia do Split-Screen de produto real e o storyboard funcional de 6 estados da dobra principal.

---

## 1. Copywriting Oficial Travado (LOCKED)

```markdown
EYEBROW:
CRM JURÍDICO COM INTELIGÊNCIA CONTEXTUAL

H1:
Dos autos à minuta, com a origem das informações sempre visível.

SUBHEADLINE:
O Dendrix conecta o contexto do processo à leitura dos autos em PDF, identifica 
fatos e contradições com referência às páginas e auxilia na redação da peça 
no mesmo ambiente.

CTA PRINCIPAL:
[ Agendar demonstração prática ]

CTA SECUNDÁRIO:
[ Ver o produto em ação ]

MICROCOPY DO CTA:
15 minutos • Traga um processo da sua banca ou use nosso caso modelo.

ASSINATURA DE FECHAMENTO:
Antes da peça, existe um caso inteiro.
O Dendrix organiza. A IA apoia. O advogado decide.
```

---

## 2. Anatomia e Layout por Breakpoint

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       DESKTOP HERO LAYOUT (> 1200px)                                 │
├───────────────────────────────────────────────────────┬──────────────────────────────────────────────┤
│ REGIÃO DE COPY (Esquerda: 44% / ~540px)               │ REGIÃO DE PRODUTO: SPLIT-SCREEN (Direita: 56%)      │
│                                                       │                                              │
│ • Eyebrow em pílula sutil                             │ ┌──────────────────────┐ ┌─────────────────┐ │
│ • H1 em Newsreader (Serifa 52px)                      │ │ AUTOS EM PDF         │ │ REDATOR TIPTAP  │ │
│ • Subheadline em Plus Jakarta Sans (18px)             │ │                      │ │                 │ │
│ • Botões: Agendar (Primary) + Ver Produto (Ghost)     │ │ [Fls. 47 - Réplica]  │ │ "Em face dos    │ │
│ • Microcopy com bullet discreto                       │ │ Grifo em amarelo:    │ │ fatos de fls.47,│ │
│ • Assinatura de autoridade com linha fina             │ │ '...não entregou...' │ │ resta incontro- │ │
│                                                       │ └──────────────────────┘ └─────────────────┘ │
└───────────────────────────────────────────────────────┴──────────────────────────────────────────────┘
```

### 2.1. Comportamento Responsivo por Breakpoint
* **Desktop Amplo (≥ 1280px):** Disposição lado a lado em 2 colunas. A copy ocupa 44% e o Split-Screen ocupa 56% com largura estendida até `1360px`. Altura da dobra calibrada para caber em viewports verticais padrão (mínimo de 750px de altura útil).
* **Laptop Menor (1024px a 1279px):** Mantém duas colunas, reduzindo o H1 para `42px` e a área do Split-Screen para `520px` de altura, garantindo que o botão primário e a primeira linha da interface fiquem visíveis acima da linha de dobra (*above the fold*).
* **Tablet (768px a 1023px):** Transição para empilhamento vertical com respiro. A copy ocupa a largura total centralizada ou alinhada à esquerda com margem generosa, e o Split-Screen logo abaixo com visualização em tabs simuladas ou painel condensado.
* **Mobile (< 768px):** Detalhado exaustivamente em `MOBILE_SPEC.md`. A copy lidera, seguida por uma visualização vertical simplificada (trecho do PDF em cima, conector sutil, trecho minutado embaixo).

---

## 3. Especificação do Split-Screen de Produto Real

O mockup não utiliza molduras artificiais de MacBook. Ele é desenhado como a **própria janela da aplicação web do Dendrix**.

### 3.1. Painel Esquerdo: O Leitor de Autos em PDF
* **Barra de Documento:** Indicador do arquivo judicial: `Processo_1002341_89_Autos.pdf` • `Página 47 de 214`.
* **Conteúdo do PDF:** Texto de processo judicial real descaracterizado (fonte serifada padrão judicial com paginação de tribunal no canto superior direito).
* **O Grifo:** Tarja em amarelo suave translúcido (`rgba(253, 230, 138, 0.45)`) destacando o parágrafo da petição:
  > *"O réu não apresentou o comprovante de quitação do contrato no prazo legal estipulado pelo juízo..."*
* **Tag de Ancoragem:** `[Fls. 47 - Contestação]` fixada na margem direita do PDF.

### 3.2. A Ponte Central: Conector de Contexto do CRM
* Linha de sincronia óptica conectando o grifo do PDF ao card de metadados do processo:
  - `Processo: 1002341-89.2024.8.26.0100`
  - `Parte Autora: João Silva`
  - `Vara: 2ª Vara Cível da Comarca de Campinas`

### 3.3. Painel Direito: O Redator em Streaming
* **Barra de Ferramentas:** Editor rico compacto (ícones discretos de negrito, itálico, citação de jurisprudência e botão de exportar).
* **Área de Texto da Minuta:**
  > *"Em atenção à contestação apresentada, cumpre destacar que, conforme comprovado às **[Fls. 47]**, a parte requerida incorreu em mora injustificada..."*
* **Badges de Origem:** Tag clicável `[Fls. 47]` destacada em verde esmeralda suave (`--status-success-bg`), provando o lastro documental da afirmação.

---

## 4. Storyboard Funcional do Hero (Estados 0 a 6)

O Hero possui uma sequência coreografada executada no carregamento inicial (tempo total: 3.2 segundos), demonstrando o mecanismo do produto sem exigir clique do visitante.

```
ESTADO 0 (0.0s)  ──>  ESTADO 1 (0.4s)  ──>  ESTADO 2 (1.0s)  ──>  ESTADO 3 (1.6s)  ──>  ESTADO 4 (2.2s)  ──>  ESTADO 5 (2.6s)  ──>  ESTADO 6 (3.2s)
Página Carrega        PDF Emerge           Grifo Amarelo        Tag [Fls. 47]        Conector CRM        Editor Acende        Minuta Completa
```

| Estado | Tempo | Elemento Alterado | Comportamento Óptico / Motion | Mensagem Transmitida ao Advogado |
| :--- | :--- | :--- | :--- | :--- |
| **Estado 0** | `0.0s` | Página inicial | A copy entra suavemente com fade-in e subida sutil de 8px. O container de produto está renderizado com esqueleto neutro. | Leitura imediata do H1 e do Eyebrow em menos de 1 segundo. |
| **Estado 1** | `0.4s` | Painel de Autos | O documento PDF do processo judicial se torna nítido na página 47. | O software processa e exibe autos judiciais em PDF de verdade. |
| **Estado 2** | `1.0s` | Trecho do PDF | A tarja amarela translúcida desliza sobre a frase crucial da contestação. | A inteligência localiza o fato relevante no meio de dezenas de páginas. |
| **Estado 3** | `1.6s` | Badge de Citação | A etiqueta `[Fls. 47]` acende com um pulso sutil na borda do documento. | Nada é inventado: a máquina vincula a informação à página física dos autos. |
| **Estado 4** | `2.2s` | Conector Central | Uma linha sutil de dados conecta o PDF ao card de metadados do CRM (dados do cliente). | O sistema junta a leitura do processo ao histórico da banca. |
| **Estado 5** | `2.6s` | Painel do Redator | O editor rico acende com foco ativo e cursor posicionado. | A redação começa no mesmo ambiente, sem trocar de janela. |
| **Estado 6** | `3.2s` | Minuta da Peça | O parágrafo da réplica surge digitado com fluidez e incorpora a tag `[Fls. 47]`. | Loop completo comprovado: a peça foi gerada com a origem da prova visível. |

* **Regra de Acessibilidade:** Se `prefers-reduced-motion` estiver ativo, o Hero entra **estático diretamente no Estado 6 final**, sem qualquer perda de informação ou quebra de layout.
