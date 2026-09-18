# HOME_WIREFRAME_SPEC.md — Especificação Estrutural e Wireframes das 11 Seções

> **Status:** Especificação Oficial de Wireframe e Composição (Etapa 4)  
> **Conformidade:** Conteúdo integralmente baseado em `HOME_COPY_V2.md`, respeitando `COMPOSITION_SYSTEM.md` e as regras anti-slop.  
> **Diretriz de Design:** A copy define o conteúdo; o design define a melhor composição. É proibido empilhar 3 cards iguais repetidamente.

---

## 1. Visão Geral da Sequência Narrativa da Home

```
[01. HERO PRINCIPAL]        ── Split-Screen: Autos (Fls. 47) ──> Contexto ──> Minuta
        ↓
[02. DIAGNÓSTICO DO CAOS]   ── Composição Editorial Assimétrica (Fim do Ruído de Abas)
        ↓
[03. O LOOP DO CASO]        ── Fluxo Contínuo Conectado (Gestão ──> Leitura ──> Peça)
        ↓
[04. PILAR 1: MESA JURÍDICA]── Macro-Recorte: Raio-X de PDF + Citação Transparente
        ↓
[05. PILAR 2: REDATOR OURO] ── Macro-Recorte: Editor Tiptap em Ação com Badges de Origem
        ↓
[06. PILAR 3: PRAZOS & FORO]── Linha do Tempo Operacional + Alerta de Publicação com IA
        ↓
[07. CASO REAL ANONIMIZADO] ── Matriz Comparativa Sóbria (Entrada em PDF vs. Saída)
        ↓
[08. CALCULADORA DE TEMPO]  ── Componente Interativo com Sliders e Estimativa Transparente
        ↓
[09. GOVERNANÇA E SEGURANÇA]── Grade Sólida Institucional: Servidores SP + Zero Retenção IA
        ↓
[10. FAQ DE TRANSPARÊNCIA]  ── Acordeão Ágil com Respostas Técnicas Diretas (Schema JSON-LD)
        ↓
[11. CHAMADA FINAL (CTA)]   ── Fechamento de Alto Contraste: Agendamento Cal.com + WhatsApp
```

---

## SEÇÃO 01: Hero Principal
* **Objetivo Visual:** Provar o mecanismo do produto em 3 segundos sem exigir rolagem.
* **Layout Desktop:** 2 colunas assimétricas (44% copy à esquerda / 56% Split-Screen de produto à direita, estendendo-se até `1360px`).
* **Layout Mobile:** Coluna única empilhada. Copy completa no topo; card de produto condensado e simplificado logo abaixo.
* **Hierarquia:** 1. H1 com Newsreader Serifa (52px); 2. Eyebrow institucional; 3. Subheadline; 4. Botão Primário de Agendamento; 5. Split-Screen.
* **Produto Necessário:** PDF de processo judicial na folha 47 com grifo + Editor rico com réplica e badge `[Fls. 47]`.
* **Motion:** Storyboard de 6 estados (tempo total 3.2s) demonstrando o fluxo da esquerda para a direita.
* **Transição:** Início da página; fundo marfim suave (`#FBFBFA`). Transição para a Seção 02 por respiro vertical de `96px`.
* **CTA:** `Agendar demonstração prática` (abre modal Cal.com) e `Ver o produto em ação` (scroll suave para Seção 03).
* **Performance:** Renderização inicial em HTML/CSS estruturado; zero bloqueio de renderização por scripts externos.

---

## SEÇÃO 02: O Custo do Caos (Diagnóstico da Dor)
* **Objetivo Visual:** Criar identificação imediata com a sobrecarga de ferramentas sem recorrer a 3 cards retangulares idênticos.
* **Layout Desktop:** **Composição Editorial Assimétrica:**
  - Lado esquerdo (coluna fixa de 38%): Eyebrow, H2 expressivo (*"Você não perde tempo porque trabalha pouco..."*) e subheadline com leitura confortável.
  - Lado direito (62%): Em vez de cards fechados, uma **pilha editorial de 3 blocos abertos**, separados por linhas finas (`--border-hairline`), onde cada bloco destaca o título em negrito, o corpo da dor e uma tag funcional de impacto.
* **Layout Mobile:** Empilhamento linear com divisórias sutis entre cada uma das 3 dores.
* **Hierarquia:** H2 lidera com peso editorial; os 3 blocos funcionam como leitura em cascata.
* **Produto Necessário:** Não usa screenshots de software aqui; o foco é 100% no reconhecimento da dor humana.
* **Motion:** Cada um dos 3 blocos entra com fade-in e subida sutil de 8px no scroll (stagger de 40ms).
* **Transição:** Conexão direta com o Loop do Caso através de um conector visual vertical fino.

---

## SEÇÃO 03: O Loop do Caso (A Solução Integrada)
* **Objetivo Visual:** Demonstrar a tese de produto sem parecer um organograma corporativo de PowerPoint.
* **Layout Desktop:** **Trilha Contínua de 3 Estágios Conectados:**
  - Barra superior de introdução centralizada (Eyebrow, H2 e Subheadline).
  - Trilha horizontal unificada com 3 marcos numerados (`01`, `02`, `03`). Cada marco é encimado por um elemento real da interface do Dendrix:
    1. Card de Ficha do Processo (Partes, Comarca, Prazos).
    2. Mini-trecho do PDF com a lupa e a indicação de folha.
    3. Mini-editor de texto gerando o parágrafo.
* **Layout Mobile:** Linha do tempo vertical com linha guia à esquerda e os 3 passos encadeados.
* **Hierarquia:** A numeração sóbria (`01`, `02`, `03`) guia o olhar e transmite método e ordem.
* **Produto Necessário:** Três micro-recortes vetorizados/componentizados dos módulos reais.
* **Motion:** Ao rolar, uma linha guia sutil acende progressivamente do passo 01 ao 03.

---

## SEÇÃO 04: Pilar 1 — A Mesa Jurídica (Leitura de Autos)
* **Objetivo Visual:** Gerar o momento de constatação técnica: a IA lê o PDF e indica a página exata da prova.
* **Layout Desktop:** 2 colunas (45% copy com lista de capacidades técnicas à esquerda / 55% macro-recorte da interface à direita).
* **Layout Mobile:** Copy seguida da interface do leitor de autos em largura total.
* **Hierarquia:** H2 enfático (*"Transforme autos volumosos em um mapa claro..."*); recorte da tela em destaque.
* **Produto Necessário:** Macro-recorte da Mesa Jurídica mostrando a tela de leitura de PDF com o painel lateral de extrações fáticas e badges de páginas.
* **Motion:** Micro-interação no hover sobre a tag `[Fls. 47]` que acende a linha correspondente no PDF.

---

## SEÇÃO 05: Pilar 2 — O Redator Jurídico (Em 2 Cliques)
* **Objetivo Visual:** Demonstrar a redação assistida contextualizada, invertendo a posição dos elementos em relação ao Pilar 1.
* **Layout Desktop:** 2 colunas invertidas (55% macro-recorte do editor à esquerda / 45% copy à direita). Essa alternância quebra a monotonia da página.
* **Layout Mobile:** Copy no topo, seguida do macro-recorte do editor rico.
* **Hierarquia:** H2 focado na ausência de folha em branco; o editor aberto exibe uma peça em redação fluida.
* **Produto Necessário:** Macro-recorte do editor Tiptap do Dendrix exibindo os blocos de Fatos e Fundamentação com tags contextuais de CRM.
* **Motion:** Cursor de digitação suave piscando no final do parágrafo da minuta.

---

## SEÇÃO 06: Pilar 3 — Prazos, Fórum & Publicações
* **Objetivo Visual:** Transmitir sensação de controle absoluto sobre a retaguarda do escritório.
* **Layout Desktop:** 2 colunas (45% copy com módulos operacionais à esquerda / 55% painel de publicações e prazos à direita).
* **Layout Mobile:** Copy e painel de prazos empilhados.
* **Hierarquia:** Destaque para o card de publicação com a badge da IA sugerindo a providência processual.
* **Produto Necessário:** Captura em alta resolução do card de publicação oficial com o botão de ação rápida (*"Sugerido: Elaborar Réplica"*).
* **Motion:** Contador regressivo de prazo operando com dados vivos estáticos elegantes.

---

## SEÇÃO 07: Estudo de Caso Desidentificado
* **Objetivo Visual:** Provar o resultado prático de forma incontestável, sem dados falsos.
* **Layout Desktop:** Contêiner delimitado de alta autoridade com tabela comparativa de 2 colunas em fundo neutro nobre (`#FFFFFF` com borda fina):
  - Coluna da Esquerda: *Entrada (Autos Judiciais)* com os placeholders de entrada.
  - Coluna da Direita: *Saída (Análise do Dendrix)* com os achados reais e a referência da folha.
* **Layout Mobile:** Entrada no topo e Saída logo abaixo em blocos de leitura contrastantes.
* **Hierarquia:** Título sóbrio; estrutura limpa focada em dados probatórios.
* **Produto Necessário:** Nenhuma imagem fictícia. Estrutura pronta para receber o caso paradigma quando homologado.

---

## SEÇÃO 08: Calculadora Interativa de Tempo Operacional
* **Objetivo Visual:** Engajar o visitante através de interação tátil, transformando a conversa de custo em ganho de tempo.
* **Layout Desktop:** Bloco centralizado em contêiner com fundo suave (`--bg-surface-subtle`):
  - Lado esquerdo da calculadora: Sliders de processos ativos e número de profissionais.
  - Lado direito: Mostrador reativo em tempo real destacando a estimativa de horas recuperadas + botão de agendamento.
* **Layout Mobile:** Sliders empilhados sobre o mostrador de resultado.
* **Hierarquia:** O número de horas estimadas é a maior tipografia da seção (Display 44px).
* **Produto Necessário:** Componente programático em React com sliders reativos e transições numéricas suaves.
* **CTA Integrado:** `Agendar demonstração para avaliar a sua banca`.

---

## SEÇÃO 09: Governança, Segurança e Privacidade
* **Objetivo Visual:** Eliminar qualquer dúvida de compliance, LGPD ou sigilo da OAB com rigor institucional.
* **Layout Desktop:** Grade sólida de 2x2 colunas em superfície branca com bordas neutras sutis. Cada quadrante traz o título e a descrição técnica de um pilar (Servidores SP, Não-treinamento de IA, Criptografia, Autonomia do Advogado).
* **Layout Mobile:** 4 blocos empilhados com ícones funcionais discretos.
* **Hierarquia:** Títulos de cada pilar em negrito claro com descrição objetiva.
* **Produto Necessário:** Ícones vetoriais técnicos discretos (sem círculos coloridos chamativos).

---

## SEÇÃO 10: FAQ de Transparência Radical
* **Objetivo Visual:** Responder com agilidade às 6 dúvidas mais difíceis sem exigir que o usuário leia blocos gigantes de texto.
* **Layout Desktop:** Contêiner estreito centralizado (`max-w-3xl`) com acordeão de expansão limpa e rápida.
* **Layout Mobile:** Idêntico ao desktop, adaptado para toque suave com área de clique ampla (mínimo 48px de altura por item).
* **Hierarquia:** Perguntas em destaque preto; respostas em grafite neutro com expansão suave (250ms).
* **Markup Técnico:** Integrado com marcação estruturada Schema.org `FAQPage` para indexação rica no Google.

---

## SEÇÃO 11: Chamada Final para Ação (Closing CTA)
* **Objetivo Visual:** Fechamento memorável com contraste profundo, conduzindo o visitante ao agendamento prático de 15 minutos.
* **Layout Desktop:** Caixa imersiva de fundo carvão profundo (`--bg-surface-dark` / `#0B0F17`) com texto em branco marfim:
  - Título editorial em serifa Newsreader.
  - Subheadline convidativa para trazer um processo real da banca.
  - Botão principal destacado em branco com texto preto + botão secundário para WhatsApp.
  - Assinatura oficial gravada na base: *"Antes da peça, existe um caso inteiro..."*.
* **Layout Mobile:** Bloco escuro com botões verticais em largura total fáceis de tocar com o polegar.
* **CTA:** `Agendar demonstração prática (15 min)` + link direto para WhatsApp com mensagem pré-formatada.
