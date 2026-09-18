# DESIGN.md — Sistema Visual e Direção Estética (Validado Pós-Grill-Me)

> **Status:** Documento Definitivo de Arquitetura Visual (Etapa 2 — Pós-Sabatina)  
> **Conformidade:** Alinhado com as decisões **DEC-013**, **DEC-017** e **DEC-019** do projeto.

---

## 1. Princípios Visuais Inegociáveis

1. **A Interface Real é a Identidade Visual Primária:**
   - O maior ativo estético do Dendrix é o seu próprio software. A beleza da landing page emerge da clareza da tipografia, da precisão dos cards de processo, da linha do tempo dos autos e da elegância do editor de redação.
2. **Gravidade Institucional sem Peso Burocrático:**
   - O advogado precisa sentir que o Dendrix tem a solidez e o prestígio de uma grande banca jurídica tradicional (Mattos Filho, Pinheiro Neto), combinada com a precisão, velocidade e inteligência de software moderno (Linear, Harvey).
3. **Anti-Slop Radical:**
   - Rejeição absoluta a gradientes neon roxo/ciano de IA, bento grids decorativos sem hierarquia, ícones flutuantes soltos no espaço e ilustrações 3D infantis estilo startup de rede social.
4. **Calma Óptica e Foco em Leitura Documental:**
   - Advogados leem centenas de páginas por dia. O site deve proporcionar conforto visual absoluto, com contraste calibrado (WCAG 2.1 AA mínimo 4.5:1), respiração generosa de margens e ritmo tipográfico impecável.
5. **Motion com Propósito Funcional Estrito:**
   - Todo movimento no site comunica uma transformação de estado do produto: a página do PDF sendo processada, a citação vinculando-se à minuta, o texto sendo digitado em streaming no editor. Zero animações circenses.

---

## 2. Sistema Tipográfico: "Híbrido Editorial de Prestígio"

A tipografia reflete a dualidade do produto: **autoridade jurídica** nos títulos e **precisão cirúrgica** na interface e leitura.

### Títulos e Concepção de Marca: Serifa Contemporânea de Autoridade
- **Família:** `Newsreader` ou `Playfair Display` (serifa moderna de proporções generosas, elegantes e de alta sobriedade).
- **Uso:** H1 do Hero, H2 das seções principais, frases de posicionamento e manifestos.
- **Sensação:** Editorial, prestígio institucional, livro jurídico de referência, The Economist.

### Corpo de Texto, Interface e Dados: Sans-Serif Técnica e Precisa
- **Família:** `Inter` ou `Plus Jakarta Sans` (geométrica humanista, nítida em qualquer densidade).
- **Uso:** Subheadlines, parágrafos explicativos, botões, cards de processo, menus e formulários.
- **Sensação:** Software de alta engenharia, legibilidade imediata, transparência operacional.

### Metadados, Citações de Folhas e Números: Monospaçada Discreta
- **Família:** `Geist Mono` ou `JetBrains Mono`.
- **Uso:** Número de processo CNJ (`0012345-67.2024.8.26.0100`), tags de citação (`[Fls. 47 - Contestação]`), contadores de prazo (`48h 12m`).

---

## 3. Paleta de Cores Oficial (Tema Claro Dominante)

O meio jurídico brasileiro responde com alta confiança a ambientes claros, limpos e sóbrios que remetem a papel nobre e ambientes corporativos de alto padrão.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SISTEMA DE CORES DENDRIX                        │
├──────────────────┬──────────────────────┬──────────────────────────────┤
│ Nome da Cor      │ Hex / Token          │ Aplicação                    │
├──────────────────┼──────────────────────┼──────────────────────────────┤
│ Papel Alvo       │ #FFFFFF              │ Fundo de cards e modais      │
│ Marfim Suave     │ #FBFBFA / #F8F9FA    │ Fundo principal do site      │
│ Borda Neutra     │ #E5E7EB / #E2E8F0    │ Linhas divisórias e cards    │
│ Carvão Profundo  │ #0B0F17 / #0F172A    │ Títulos e textos de alto Ctr │
│ Grafite Neutro   │ #475569 / #64748B    │ Subheadlines e corpo         │
│ Azul Marinho Inst│ #0F2B48 / #1E3A8A    │ Acento primário, botões, badges│
│ Âmbar Alerta     │ #D97706 / #B45309    │ Prazos e urgências forenses  │
│ Verde Esmeralda  │ #059669 / #047857    │ Provas conferidas e status OK│
└──────────────────┴──────────────────────┴──────────────────────────────┘
```

---

## 4. O Hero Dominante: Split-Screen Dinâmico do "Fluxo Completo do Caso"

Conforme a decisão **DEC-013**, o Hero abandona abstrações e exibe o software em ação no primeiro viewport:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [BARRA SUPERIOR]: Logo Dendrix | Recursos | Calculadora | Segurança | Blog     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   TAG EDITORIAL: O CRM Jurídico com Inteligência Real de Caso                  │
│                                                                                 │
│   H1 (SERIFA): Antes da peça, existe um caso inteiro.                          │
│                O Dendrix organiza. A IA apoia. Você decide.                     │
│                                                                                 │
│   SUB (SANS):  Conecte seus autos em PDF, prazos e clientes ao mesmo            │
│                raciocínio. Veja a IA ler o processo e redigir a peça           │
│                fundamentada em minutos — com citação exata de página.          │
│                                                                                 │
│   [ CTA: Agendar Demonstração Prática (15 min) ]  [ Ver Como Funciona (Âncora) ]│
│   Microcopy: Demonstração ao vivo com um processo da sua banca • Sem compromisso│
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   PROVA VISUAL HERO: SPLIT-SCREEN DINÂMICO                                      │
│                                                                                 │
│   ┌───────────────────────────┐  CONEXÃO   ┌───────────────────────────────┐   │
│   │ AUTOS EM PDF (FLS. 47)    │ ─────────> │ REDATOR JURÍDICO EM STREAMING │   │
│   │                           │    CRM     │                               │   │
│   │ [Grifo em amarelo suave]: │  Contexto  │ "Em face dos fatos narrados às│   │
│   │ '...a ré não entregou o   │  Cliente:  │ fls. 47, resta incontroverso  │   │
│   │ laudo no prazo fixado...' │ João Silva │ o descumprimento contratual..."│   │
│   │                           │  Proc. CNJ │                               │   │
│   │ Tag: [Pág. 47 - Réplica]  │ 1002341-.. │ Badges: [Fls. 47] [Contrato]  │   │
│   └───────────────────────────┘            └───────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Diretrizes de Mobile

- **Empilhamento Fluido:** O Split-Screen do Hero se transforma em uma visualização sequencial intuitiva: primeiro o trecho do PDF dos autos com o grifo, seguido de um conector sutil e o trecho gerado pelo Redator.
- **Thumb Zone:** Botão de agendamento sempre visível ou acessível com um toque, com suporte nativo a abertura de conversa no WhatsApp como canal rápido.
- **Performance Mobile:** Zero layout shifts (CLS = 0), fontes carregadas com `display: swap`, imagens e mockups comprimidos em formato `.webp` e `.svg`.
